import type { V1Type } from "@wdsc/api-hono";
import { hc } from "hono/client";

// End-to-end type-safe client for the Hono API (zerostarter.dev pattern).
// In the browser, use a relative path so requests go through the Next.js rewrite
// (same-origin, first-party cookies). On the server, hit the API directly.
const baseUrl = typeof window === "undefined" ? `${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4100"}/api/v1` : "/api/v1";

// `credentials: "include"` sends the Better Auth session cookie so admin write
// endpoints (protected by requireAdmin) accept authenticated calls.
export const rpc = hc<V1Type>(baseUrl, {
  init: { credentials: "include" },
});
