import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import {
  businessProfile,
  faqs,
  getBusinessWhatsappLink,
  getDashboardStats,
  getRequestByRequestId,
  getRequestWhatsappLink,
  getServiceById,
  getServiceWhatsappLink,
  pricing,
  requests,
  services,
  submitRequestSchema,
  trackRequest,
  trackRequestSchema,
  updateRequestStatusSchema,
  type ClientRequest,
} from "../../../../packages/domain/src";

const requestStore: ClientRequest[] = requests.map((request) => ({
  ...request,
  documents: request.documents.map((document) => ({ ...document })),
  adminNotes: [...request.adminNotes],
}));

function generateRequestId() {
  return `SDS-2026-${String(requestStore.length + 1).padStart(4, "0")}`;
}

function trackStoredRequest(requestId: string, whatsappNumber: string) {
  const digits = whatsappNumber.replace(/\D/g, "");
  return requestStore.find(
    (request) => request.requestId.toLowerCase() === requestId.toLowerCase() && request.whatsappNumber.endsWith(digits.slice(-10)),
  );
}

export const v1Router = new Hono()
  .get("/business", (c) => c.json({ data: businessProfile }))
  .get("/services", (c) => c.json({ data: services }))
  .get("/services/:serviceId", (c) => {
    const service = getServiceById(c.req.param("serviceId"));
    return service ? c.json({ data: service }) : c.json({ error: "Service not found." }, 404);
  })
  .get("/pricing", (c) => c.json({ data: pricing }))
  .get("/faq", (c) => c.json({ data: faqs }))
  .get("/whatsapp", (c) => c.json({ data: { whatsappLink: getBusinessWhatsappLink() } }))
  .get("/dashboard", (c) =>
    c.json({
      data: {
        stats: getDashboardStats(requestStore),
        requests: requestStore,
      },
    }),
  )
  .get("/requests", (c) => {
    const status = c.req.query("status");
    const query = c.req.query("query")?.trim().toLowerCase();
    const filtered = requestStore.filter((request) => {
      const matchesStatus = !status || status === "all" || request.status === status;
      const matchesQuery =
        !query ||
        [request.requestId, request.clientName, request.whatsappNumber, request.serviceName].some((value) =>
          value.toLowerCase().includes(query),
        );

      return matchesStatus && matchesQuery;
    });

    return c.json({ data: filtered });
  })
  .get("/requests/:requestId", (c) => {
    const request = requestStore.find((item) => item.requestId === c.req.param("requestId")) ?? getRequestByRequestId(c.req.param("requestId"));
    return request ? c.json({ data: request }) : c.json({ error: "Request not found." }, 404);
  })
  .post("/requests", zValidator("json", submitRequestSchema), (c) => {
    const input = c.req.valid("json");
    const service = getServiceById(input.serviceId);

    if (!service) {
      return c.json({ error: "Service not found." }, 404);
    }

    const request: ClientRequest = {
      id: crypto.randomUUID(),
      requestId: generateRequestId(),
      clientName: input.fullName,
      whatsappNumber: input.whatsappNumber,
      email: input.email || undefined,
      serviceId: service.id,
      serviceName: service.name,
      description: input.description,
      deadline: input.deadline ?? "Not fixed",
      urgency: input.urgency,
      status: "request_received",
      payment: {
        totalAmount: service.estimatedPrice ?? 0,
        paidAmount: 0,
        balanceAmount: service.estimatedPrice ?? 0,
        status: "unpaid",
      },
      documents: [],
      adminNotes: ["Website request received."],
      latestUpdate: "Request received. We will check details and confirm price.",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    requestStore.unshift(request);

    return c.json(
      {
        data: {
          request,
          whatsappLink: getRequestWhatsappLink(request),
        },
      },
      201,
    );
  })
  .post("/track", zValidator("json", trackRequestSchema), (c) => {
    const input = c.req.valid("json");
    const request = trackStoredRequest(input.requestId, input.whatsappNumber) ?? trackRequest(input.requestId, input.whatsappNumber);
    return request ? c.json({ data: request }) : c.json({ error: "No matching request found." }, 404);
  })
  .patch("/requests/:requestId/status", zValidator("json", updateRequestStatusSchema), (c) => {
    const request = requestStore.find((item) => item.requestId === c.req.param("requestId"));

    if (!request) {
      return c.json({ error: "Request not found." }, 404);
    }

    const input = c.req.valid("json");
    request.status = input.status;
    request.latestUpdate = input.note ?? `Status updated to ${input.status.replaceAll("_", " ")}.`;
    request.updatedAt = new Date().toISOString();

    if (input.note) {
      request.adminNotes.unshift(input.note);
    }

    return c.json({
      data: {
        request,
        whatsappLink: getRequestWhatsappLink(request),
      },
    });
  })
  .get("/requests/:requestId/whatsapp", (c) => {
    const request = requestStore.find((item) => item.requestId === c.req.param("requestId"));
    return request ? c.json({ data: { whatsappLink: getRequestWhatsappLink(request) } }) : c.json({ error: "Request not found." }, 404);
  })
  .get("/services/:serviceId/whatsapp", (c) => {
    const service = getServiceById(c.req.param("serviceId"));
    return service ? c.json({ data: { whatsappLink: getServiceWhatsappLink(service) } }) : c.json({ error: "Service not found." }, 404);
  });
