import { relations } from "drizzle-orm";
import { boolean, date, index, numeric, pgEnum, pgTable, text, timestamp, uniqueIndex, uuid } from "drizzle-orm/pg-core";
import { paymentStatuses, requestStatuses, serviceCategories, urgencyLevels } from "@wdsc/domain";

export const requestStatus = pgEnum("request_status", requestStatuses);
export const paymentStatus = pgEnum("payment_status", paymentStatuses);
export const serviceCategory = pgEnum("service_category", serviceCategories);
export const urgencyLevel = pgEnum("urgency_level", urgencyLevels);

const timestamps = {
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
};

export const clients = pgTable(
  "clients",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    fullName: text("full_name").notNull(),
    whatsappNumber: text("whatsapp_number").notNull(),
    email: text("email"),
    consentGiven: boolean("consent_given").default(false).notNull(),
    ...timestamps,
  },
  (table) => ({
    phoneIdx: uniqueIndex("clients_whatsapp_number_idx").on(table.whatsappNumber),
  }),
);

export const services = pgTable(
  "services",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    slug: text("slug").notNull(),
    name: text("name").notNull(),
    category: serviceCategory("category").notNull(),
    description: text("description").notNull(),
    startingPrice: numeric("starting_price", { precision: 10, scale: 2 }),
    requiredDocuments: text("required_documents").array().notNull(),
    isActive: boolean("is_active").default(true).notNull(),
    ...timestamps,
  },
  (table) => ({
    slugIdx: uniqueIndex("services_slug_idx").on(table.slug),
  }),
);

export const requests = pgTable(
  "requests",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    requestId: text("request_id").notNull(),
    clientId: uuid("client_id").references(() => clients.id, { onDelete: "restrict" }).notNull(),
    serviceId: uuid("service_id").references(() => services.id, { onDelete: "restrict" }).notNull(),
    description: text("description").notNull(),
    deadline: date("deadline"),
    urgency: urgencyLevel("urgency").default("normal").notNull(),
    status: requestStatus("status").default("request_received").notNull(),
    totalAmount: numeric("total_amount", { precision: 10, scale: 2 }).default("0").notNull(),
    paidAmount: numeric("paid_amount", { precision: 10, scale: 2 }).default("0").notNull(),
    balanceAmount: numeric("balance_amount", { precision: 10, scale: 2 }).default("0").notNull(),
    paymentStatus: paymentStatus("payment_status").default("unpaid").notNull(),
    adminNotes: text("admin_notes").array().default([]).notNull(),
    finalOutputFile: text("final_output_file"),
    deliveryConfirmation: text("delivery_confirmation"),
    latestUpdate: text("latest_update").default("Request received.").notNull(),
    ...timestamps,
  },
  (table) => ({
    requestIdIdx: uniqueIndex("requests_request_id_idx").on(table.requestId),
    statusIdx: index("requests_status_idx").on(table.status),
    paymentIdx: index("requests_payment_status_idx").on(table.paymentStatus),
    clientIdx: index("requests_client_id_idx").on(table.clientId),
  }),
);

export const documents = pgTable(
  "documents",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    requestId: uuid("request_id").references(() => requests.id, { onDelete: "cascade" }).notNull(),
    fileName: text("file_name").notNull(),
    fileType: text("file_type").notNull(),
    fileUrl: text("file_url"),
    isSensitive: boolean("is_sensitive").default(true).notNull(),
    status: text("status").default("received").notNull(),
    uploadedAt: timestamp("uploaded_at", { withTimezone: true }).defaultNow().notNull(),
    deletedAt: timestamp("deleted_at", { withTimezone: true }),
  },
  (table) => ({
    requestIdx: index("documents_request_id_idx").on(table.requestId),
  }),
);

export const payments = pgTable(
  "payments",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    requestId: uuid("request_id").references(() => requests.id, { onDelete: "cascade" }).notNull(),
    amount: numeric("amount", { precision: 10, scale: 2 }).notNull(),
    paymentMode: text("payment_mode").default("upi").notNull(),
    reference: text("reference"),
    paidAt: timestamp("paid_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => ({
    requestIdx: index("payments_request_id_idx").on(table.requestId),
  }),
);

export const clientsRelations = relations(clients, ({ many }) => ({
  requests: many(requests),
}));

export const servicesRelations = relations(services, ({ many }) => ({
  requests: many(requests),
}));

export const requestsRelations = relations(requests, ({ one, many }) => ({
  client: one(clients, { fields: [requests.clientId], references: [clients.id] }),
  service: one(services, { fields: [requests.serviceId], references: [services.id] }),
  documents: many(documents),
  payments: many(payments),
}));

export const documentsRelations = relations(documents, ({ one }) => ({
  request: one(requests, { fields: [documents.requestId], references: [requests.id] }),
}));

export const paymentsRelations = relations(payments, ({ one }) => ({
  request: one(requests, { fields: [payments.requestId], references: [requests.id] }),
}));
