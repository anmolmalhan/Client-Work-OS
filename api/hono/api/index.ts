// Vercel's Node runtime treats a default export as a Node `(req, res)` handler
// and ignores returned Responses. Hono speaks the Web fetch API, so expose
// named HTTP-method handlers instead — each delegates to the Hono app router.
//
// `app` is pre-bundled at build time (see vercel.json buildCommand) with all
// workspace packages inlined, so this function has no unresolved ESM imports.
// This file is excluded from the typecheck (tsconfig "include") since
// dist/app.mjs only exists after the build.
import { app } from "../dist/app.mjs";

const handler = (request: Request) => app.fetch(request);

export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const PATCH = handler;
export const DELETE = handler;
export const OPTIONS = handler;
export const HEAD = handler;
