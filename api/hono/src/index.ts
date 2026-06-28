import { auth } from "@wdsc/auth";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { apiEnv } from "../../../packages/env/src/api-hono";
import { healthRouter } from "./routers/health";
import { v1Router } from "./routers/v1";

export const app = new Hono();

const apiInfo = {
  ok: true,
  service: "whatsapp-digital-service-center-api",
  endpoints: {
    health: "/health",
    api: "/api/v1",
    business: "/api/v1/business",
    services: "/api/v1/services",
    pricing: "/api/v1/pricing",
    requests: "/api/v1/requests",
    track: "/api/v1/track",
  },
};

app.use(
  "*",
  cors({
    origin: apiEnv.HONO_TRUSTED_ORIGINS.split(",").map((origin) => origin.trim()),
    credentials: true,
  }),
);

app.on(["GET", "POST"], "/api/auth/*", (c) => auth.handler(c.req.raw));

app.get("/", (c) => c.json(apiInfo));
app.route("/health", healthRouter);
app.route("/api/v1", v1Router);

app.notFound((c) => c.json({ error: "Route not found." }, 404));
app.onError((error, c) => {
  void error;
  return c.json({ error: "Unexpected server error." }, 500);
});

export type AppType = typeof app;

// Typed surface for the Hono RPC client (end-to-end type safety on the web).
export { v1Router };
export type V1Type = typeof v1Router;

function getPort(appUrl: string) {
  const explicitPort = appUrl.match(/:(\d+)(?:\/|$)/)?.[1];
  return Number(explicitPort ?? 4100);
}

export default {
  port: getPort(apiEnv.HONO_APP_URL),
  fetch: app.fetch,
};
