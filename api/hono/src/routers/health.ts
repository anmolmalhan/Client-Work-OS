import { Hono } from "hono";

export const healthRouter = new Hono().get("/", (c) =>
  c.json({
    ok: true,
    service: "whatsapp-digital-service-center-api",
    timestamp: new Date().toISOString(),
  }),
);
