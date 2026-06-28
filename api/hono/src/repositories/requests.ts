import { and, desc, eq, ilike, or, sql } from "drizzle-orm";
import { db, schema } from "@wdsc/db";
import {
  getDashboardStats,
  getPaymentStatus,
  getRequestWhatsappLink,
  requests as demoRequests,
  services as demoServices,
  type ClientRequest,
  type PaymentStatus,
  type RequestStatus,
  type ServiceItem,
  type SubmitRequestInput,
  type UpdateRequestStatusInput,
  type UploadedDocument,
} from "@wdsc/domain";

type RequestRow = typeof schema.requests.$inferSelect;
type ClientRow = typeof schema.clients.$inferSelect;
type ServiceRow = typeof schema.services.$inferSelect;
type DocumentRow = typeof schema.documents.$inferSelect;

type RequestWithRelations = RequestRow & {
  client: ClientRow;
  service: ServiceRow;
  documents: DocumentRow[];
};

const serviceBySlug = new Map(demoServices.map((service) => [service.id, service]));

function amount(value: string | number | null | undefined) {
  return Number(value ?? 0);
}

function toIso(value: Date | string) {
  return value instanceof Date ? value.toISOString() : new Date(value).toISOString();
}

function documentType(value: string): UploadedDocument["type"] {
  return value === "pdf" || value === "image" ? value : "other";
}

function documentStatus(value: string): UploadedDocument["status"] {
  return value === "missing" || value === "needs_review" ? value : "received";
}

export function toServiceItem(service: ServiceRow): ServiceItem {
  const demoService = serviceBySlug.get(service.slug);

  return {
    id: service.slug,
    name: service.name,
    category: service.category,
    description: service.description,
    priceType: demoService?.priceType ?? (service.startingPrice ? "starting_at" : "variable"),
    estimatedPrice: service.startingPrice ? amount(service.startingPrice) : undefined,
    priceNote: demoService?.priceNote,
    requiredDocuments: service.requiredDocuments,
  };
}

export function toClientRequest(request: RequestWithRelations): ClientRequest {
  const service = toServiceItem(request.service);

  return {
    id: request.id,
    requestId: request.requestId,
    clientName: request.client.fullName,
    whatsappNumber: request.client.whatsappNumber,
    email: request.client.email ?? undefined,
    serviceId: service.id,
    serviceName: service.name,
    description: request.description,
    deadline: request.deadline ?? "Not fixed",
    urgency: request.urgency,
    status: request.status,
    payment: {
      totalAmount: amount(request.totalAmount),
      paidAmount: amount(request.paidAmount),
      balanceAmount: amount(request.balanceAmount),
      status: request.paymentStatus as PaymentStatus,
    },
    documents: request.documents.map((document) => ({
      id: document.id,
      name: document.fileName,
      type: documentType(document.fileType),
      isSensitive: document.isSensitive,
      status: documentStatus(document.status),
    })),
    adminNotes: request.adminNotes,
    finalOutputFile: request.finalOutputFile ?? undefined,
    deliveryConfirmation: request.deliveryConfirmation ?? undefined,
    latestUpdate: request.latestUpdate,
    createdAt: toIso(request.createdAt),
    updatedAt: toIso(request.updatedAt),
  };
}

export async function seedServicesIfEmpty() {
  const existing = await db.select({ count: sql<number>`count(*)` }).from(schema.services);

  if (Number(existing[0]?.count ?? 0) > 0) {
    return;
  }

  await db.insert(schema.services).values(
    demoServices.map((service) => ({
      slug: service.id,
      name: service.name,
      category: service.category,
      description: service.description,
      startingPrice: service.estimatedPrice ? String(service.estimatedPrice) : null,
      requiredDocuments: service.requiredDocuments,
    })),
  ).onConflictDoNothing();
}

// Seeds the bundled sample requests (clients + documents) once, so the admin
// dashboard and Track page work out of the box on an empty database — the same
// way services are seeded.
export async function seedRequestsIfEmpty() {
  await seedServicesIfEmpty();
  const existing = await db.select({ count: sql<number>`count(*)` }).from(schema.requests);

  if (Number(existing[0]?.count ?? 0) > 0) {
    return;
  }

  const serviceRows = await db.select({ id: schema.services.id, slug: schema.services.slug }).from(schema.services);
  const serviceIdBySlug = new Map(serviceRows.map((row) => [row.slug, row.id]));

  // One-time seed: each row finds/creates its client before inserting the
  // request and documents, so the awaits are intentionally sequential.
  /* eslint-disable no-await-in-loop */
  for (const demo of demoRequests) {
    const serviceId = serviceIdBySlug.get(demo.serviceId);
    if (!serviceId) {
      continue;
    }

    const existingClient = await db.query.clients.findFirst({
      where: eq(schema.clients.whatsappNumber, demo.whatsappNumber),
    });
    const client =
      existingClient ??
      (
        await db
          .insert(schema.clients)
          .values({
            fullName: demo.clientName,
            whatsappNumber: demo.whatsappNumber,
            email: demo.email ?? null,
            consentGiven: true,
          })
          .onConflictDoNothing()
          .returning()
      )[0];

    if (!client) {
      continue;
    }

    const [request] = await db
      .insert(schema.requests)
      .values({
        requestId: demo.requestId,
        clientId: client.id,
        serviceId,
        description: demo.description,
        deadline: demo.deadline && demo.deadline !== "Not fixed" ? demo.deadline : null,
        urgency: demo.urgency,
        status: demo.status,
        totalAmount: String(demo.payment.totalAmount),
        paidAmount: String(demo.payment.paidAmount),
        balanceAmount: String(demo.payment.balanceAmount),
        paymentStatus: demo.payment.status,
        adminNotes: demo.adminNotes,
        finalOutputFile: demo.finalOutputFile ?? null,
        deliveryConfirmation: demo.deliveryConfirmation ?? null,
        latestUpdate: demo.latestUpdate,
        createdAt: new Date(demo.createdAt),
        updatedAt: new Date(demo.updatedAt),
      })
      .onConflictDoNothing()
      .returning();

    if (!request) {
      continue;
    }

    if (demo.documents.length > 0) {
      await db.insert(schema.documents).values(
        demo.documents.map((document) => ({
          requestId: request.id,
          fileName: document.name,
          fileType: document.type,
          isSensitive: document.isSensitive,
          status: document.status,
        })),
      );
    }
  }
  /* eslint-enable no-await-in-loop */
}

export async function listServices() {
  await seedServicesIfEmpty();
  const rows = await db.select().from(schema.services).where(eq(schema.services.isActive, true)).orderBy(schema.services.name);
  return rows.map(toServiceItem);
}

export async function getService(slug: string) {
  await seedServicesIfEmpty();
  const service = await db.query.services.findFirst({
    where: eq(schema.services.slug, slug),
  });

  return service ? toServiceItem(service) : undefined;
}

async function getServiceRow(slug: string) {
  await seedServicesIfEmpty();
  return db.query.services.findFirst({
    where: and(eq(schema.services.slug, slug), eq(schema.services.isActive, true)),
  });
}

export async function listRequests(filters: { status?: string; query?: string } = {}) {
  await seedRequestsIfEmpty();
  const conditions = [];

  if (filters.status && filters.status !== "all") {
    conditions.push(eq(schema.requests.status, filters.status as RequestStatus));
  }

  if (filters.query) {
    const pattern = `%${filters.query}%`;
    conditions.push(
      or(
        ilike(schema.requests.requestId, pattern),
        ilike(schema.clients.fullName, pattern),
        ilike(schema.clients.whatsappNumber, pattern),
        ilike(schema.services.name, pattern),
      ),
    );
  }

  const rows = await db
    .select()
    .from(schema.requests)
    .innerJoin(schema.clients, eq(schema.requests.clientId, schema.clients.id))
    .innerJoin(schema.services, eq(schema.requests.serviceId, schema.services.id))
    .where(conditions.length > 0 ? and(...conditions) : undefined)
    .orderBy(desc(schema.requests.createdAt));

  const mapped = await Promise.all(rows.map((row) => getRequest(row.requests.requestId)));
  return mapped.filter((request): request is ClientRequest => Boolean(request));
}

export async function getDashboard() {
  const requests = await listRequests();

  return {
    stats: getDashboardStats(requests),
    requests,
  };
}

export async function getRequest(requestId: string) {
  const request = await db.query.requests.findFirst({
    where: eq(schema.requests.requestId, requestId),
    with: {
      client: true,
      service: true,
      documents: true,
    },
  });

  return request ? toClientRequest(request) : undefined;
}

export async function trackStoredRequest(requestId: string, whatsappNumber: string) {
  await seedRequestsIfEmpty();
  const digits = whatsappNumber.replace(/\D/g, "");
  // Request ids are generated upper-case; match case-insensitively so a client
  // typing "sds-2026-0001" still finds their request.
  const request = await getRequest(requestId.trim().toUpperCase());

  if (!request || !request.whatsappNumber.endsWith(digits.slice(-10))) {
    return undefined;
  }

  return request;
}

function isUniqueViolation(error: unknown) {
  const candidate = error as { code?: string; cause?: { code?: string } } | null;
  return candidate?.code === "23505" || candidate?.cause?.code === "23505";
}

async function generateRequestId() {
  // Derive the next id from the highest existing one rather than count(*),
  // which collides after any row is deleted. Zero-padded ids sort lexically.
  const [latest] = await db
    .select({ requestId: schema.requests.requestId })
    .from(schema.requests)
    .orderBy(desc(schema.requests.requestId))
    .limit(1);
  const lastNumber = latest ? Number(latest.requestId.split("-").pop()) || 0 : 0;
  return `SDS-2026-${String(lastNumber + 1).padStart(4, "0")}`;
}

async function findOrCreateClient(input: SubmitRequestInput) {
  const existingClient = await db.query.clients.findFirst({
    where: eq(schema.clients.whatsappNumber, input.whatsappNumber),
  });

  if (existingClient) {
    const [client] = await db
      .update(schema.clients)
      .set({
        fullName: input.fullName,
        email: input.email || null,
        consentGiven: input.consentGiven,
      })
      .where(eq(schema.clients.id, existingClient.id))
      .returning();

    if (!client) {
      throw new Error("Unable to update client.");
    }

    return client;
  }

  const [client] = await db
    .insert(schema.clients)
    .values({
      fullName: input.fullName,
      whatsappNumber: input.whatsappNumber,
      email: input.email || null,
      consentGiven: input.consentGiven,
    })
    .returning();

  if (!client) {
    throw new Error("Unable to create client.");
  }

  return client;
}

export async function createRequest(input: SubmitRequestInput) {
  const service = await getServiceRow(input.serviceId);

  if (!service) {
    return undefined;
  }

  const client = await findOrCreateClient(input);
  const totalAmount = amount(service.startingPrice);
  const baseValues = {
    clientId: client.id,
    serviceId: service.id,
    description: input.description,
    deadline: input.deadline ?? null,
    urgency: input.urgency,
    totalAmount: String(totalAmount),
    paidAmount: "0",
    balanceAmount: String(totalAmount),
    paymentStatus: getPaymentStatus(totalAmount, 0),
    adminNotes: ["Website request received."],
    latestUpdate: "Request received. We will check details and confirm price.",
  };

  // Two near-simultaneous submissions can compute the same id; the unique
  // index rejects the loser, so retry with a fresh id instead of 500-ing the
  // user whose valid submission would otherwise be lost. Each attempt depends
  // on the previous one failing, so the awaits are intentionally sequential.
  /* eslint-disable no-await-in-loop */
  for (let attempt = 0; attempt < 5; attempt += 1) {
    const requestId = await generateRequestId();
    try {
      const [request] = await db
        .insert(schema.requests)
        .values({ requestId, ...baseValues })
        .returning();

      if (!request) {
        throw new Error("Unable to create request.");
      }

      return getRequest(request.requestId);
    } catch (error) {
      if (isUniqueViolation(error) && attempt < 4) {
        continue;
      }
      throw error;
    }
  }
  /* eslint-enable no-await-in-loop */

  throw new Error("Unable to create request after multiple attempts.");
}

export async function updateRequestStatus(requestId: string, input: UpdateRequestStatusInput) {
  const current = await db.query.requests.findFirst({
    where: eq(schema.requests.requestId, requestId),
  });

  if (!current) {
    return undefined;
  }

  const latestUpdate = input.note ?? `Status updated to ${input.status.replaceAll("_", " ")}.`;
  const adminNotes = input.note ? [input.note, ...current.adminNotes] : current.adminNotes;

  await db
    .update(schema.requests)
    .set({
      status: input.status,
      latestUpdate,
      adminNotes,
    })
    .where(eq(schema.requests.id, current.id));

  return getRequest(requestId);
}

export async function requestWhatsappLink(requestId: string) {
  const request = await getRequest(requestId);

  return request ? getRequestWhatsappLink(request) : undefined;
}
