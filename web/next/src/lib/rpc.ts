import type { V1Type } from "@wdsc/api-hono";
import { hc } from "hono/client";

// End-to-end type-safe client for the Hono API (zerostarter.dev pattern).
// Route paths, params, query and response shapes are all inferred from the API.
const baseUrl = `${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4100"}/api/v1`;

export const rpc = hc<V1Type>(baseUrl);
