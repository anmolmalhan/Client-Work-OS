import { createAuthClient } from "better-auth/react";

// Use the web's own origin so auth requests go through the Next.js rewrite to
// the API. The session cookie is then set first-party on the web domain, which
// works in every browser (no third-party-cookie blocking).
const baseURL = typeof window === "undefined" ? (process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3100") : window.location.origin;

export const authClient = createAuthClient({ baseURL });

export const { signIn, signUp, signOut, useSession } = authClient;
