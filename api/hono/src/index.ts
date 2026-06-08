import { Hono } from "hono";
import { cors } from "hono/cors";
import { apiEnv } from "@wdsc/env/api-hono";
import { healthRouter } from "./routers/health";
import { v1Router } from "./routers/v1";

const app = new Hono();

app.use(
  "*",
  cors({
    origin: apiEnv.HONO_TRUSTED_ORIGINS.split(",").map((origin) => origin.trim()),
    credentials: true,
  }),
);

app.route("/health", healthRouter);
app.route("/api/v1", v1Router);

app.notFound((c) => c.json({ error: "Route not found." }, 404));
app.onError((error, c) => {
  console.error(error);
  return c.json({ error: "Unexpected server error." }, 500);
});

export type AppType = typeof app;

export default {
  port: Number(new URL(apiEnv.HONO_APP_URL).port || 4100),
  fetch: app.fetch,
};
