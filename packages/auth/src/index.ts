import { db, schema } from "@wdsc/db";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

// Read env without depending on the Node `process` global type so this package
// type-checks under any bundler/runtime (e.g. the Vercel function compiler).
const env = (globalThis as { process?: { env?: Record<string, string | undefined> } }).process?.env ?? {};

const isProduction = env.NODE_ENV === "production";

const trustedOrigins = (env.HONO_TRUSTED_ORIGINS ?? "http://localhost:3100")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

// Secret hardening: never ship the insecure dev fallback to production.
const secret = env.BETTER_AUTH_SECRET;
if (isProduction && !secret) {
  throw new Error("BETTER_AUTH_SECRET is required in production. Set it in the deployment environment.");
}

// Centralized auth server (zerostarter.dev pattern). Email/password admin login
// backed by the shared Postgres database via the Drizzle adapter.
export const auth = betterAuth({
  baseURL: env.BETTER_AUTH_URL ?? "http://localhost:4100",
  secret: secret ?? "dev-only-insecure-secret-change-me",
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
  advanced: {
    // In production the web app and API may live on different domains, making
    // session requests cross-site. SameSite=None + Secure lets the session
    // cookie travel on those requests. Locally (http, same-site) we keep the
    // browser default (Lax) so cookies work without HTTPS.
    defaultCookieAttributes: isProduction ? { sameSite: "none", secure: true, partitioned: true } : undefined,
    // If web + API share a parent domain (e.g. app.example.com & api.example.com),
    // enable this with that domain so the cookie is shared across subdomains:
    // crossSubDomainCookies: { enabled: true, domain: ".example.com" },
  },
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
    // Admin accounts are provisioned, not self-registered. Flip to false (or
    // use the env override) only when you need to create another admin.
    disableSignUp: env.AUTH_ALLOW_SIGNUP !== "true",
  },
  user: {
    additionalFields: {
      role: { type: "string", required: false, defaultValue: "admin", input: false },
    },
  },
});

export type Auth = typeof auth;
