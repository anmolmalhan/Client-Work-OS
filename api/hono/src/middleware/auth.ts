import { auth } from "@wdsc/auth";
import type { MiddlewareHandler } from "hono";

// Gate admin-only endpoints behind a valid Better Auth session. The session
// cookie is sent cross-site from the web app (SameSite=None in production).
export const requireAdmin: MiddlewareHandler = async (c, next) => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers });

  if (!session) {
    return c.json({ error: "Unauthorized. Please sign in as an admin." }, 401);
  }

  return next();
};
