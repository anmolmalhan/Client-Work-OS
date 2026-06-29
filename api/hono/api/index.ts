import { handle } from "hono/vercel";
// `app` is pre-bundled at build time (see vercel.json buildCommand) with all
// workspace packages and relative modules inlined, so this Node function has no
// unresolved extensionless ESM imports at runtime. This file is excluded from
// the typecheck (see tsconfig "include") since dist/app.mjs only exists post-build.
import { app } from "../dist/app.mjs";

export default handle(app);
