import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const apiEnv = createEnv({
  server: {
    NODE_ENV: z.enum(["local", "development", "test", "production"]).default("local"),
    HONO_APP_URL: z.string().url().default("http://localhost:4100"),
    HONO_TRUSTED_ORIGINS: z.string().default("http://localhost:3100"),
    POSTGRES_URL: z.string().url().default("postgres://postgres:postgres@localhost:5432/whatsapp_digital_service_center"),
  },
  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
});
