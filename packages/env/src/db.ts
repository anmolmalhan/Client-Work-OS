import { z } from "zod";

const dbEnvSchema = z.object({
  POSTGRES_URL: z.string().url(),
});

// Read env without depending on the Node `process` global type, so the package
// type-checks in any bundler/runtime (mirrors packages/env/src/api-hono.ts).
const runtimeEnv =
  (globalThis as { process?: { env?: Record<string, string | undefined> } }).process?.env ?? {};

export const dbEnv = dbEnvSchema.parse(runtimeEnv);
