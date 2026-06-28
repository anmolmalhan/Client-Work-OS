import { db, schema } from "@wdsc/db";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

const trustedOrigins = (process.env.HONO_TRUSTED_ORIGINS ?? "http://localhost:3100")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

// Centralized auth server (zerostarter.dev pattern). Email/password admin login
// backed by the shared Postgres database via the Drizzle adapter.
export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL ?? "http://localhost:4100",
  secret: process.env.BETTER_AUTH_SECRET ?? "dev-only-insecure-secret-change-me",
  trustedOrigins,
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      user: schema.user,
      session: schema.session,
      account: schema.account,
      verification: schema.verification,
    },
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
  },
  user: {
    additionalFields: {
      role: { type: "string", required: false, defaultValue: "admin", input: false },
    },
  },
});

export type Auth = typeof auth;
