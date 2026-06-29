import { handle } from "hono/vercel";
// `app` is pre-bundled at build time (see vercel.json buildCommand) with all
// workspace packages and relative modules inlined, so this Node function has no
// unresolved extensionless ESM imports at runtime.
// @ts-expect-error generated at build time
import { app } from "../dist/app.mjs";

export default handle(app);
