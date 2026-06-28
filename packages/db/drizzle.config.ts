import { defineConfig } from "drizzle-kit";

const databaseUrl = process.env.POSTGRES_URL ?? "postgres://postgres:postgres@localhost:5432/whatsapp_digital_service_center";

export default defineConfig({
  schema: "./src/schema/index.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: databaseUrl,
  },
});
