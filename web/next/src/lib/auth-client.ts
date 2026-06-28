import { createAuthClient } from "better-auth/react";

// Points at the Hono API's Better Auth handler. localhost:3100 and :4100 are
// same-site (cross-port), so session cookies flow with credentials.
export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4100",
});

export const { signIn, signUp, signOut, useSession } = authClient;
