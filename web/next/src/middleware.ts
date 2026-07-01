import { type NextRequest, NextResponse } from "next/server";

// Server-side guard for the admin area. Logged-out visitors are redirected to
// /admin/login before any admin markup is rendered, instead of relying only on
// the client-side gate (which still ships the dashboard shell in the payload).
// Real authorization is enforced by the API (401 without a valid session); this
// is defense-in-depth plus a cleaner logged-out UX.
//
// We only check for the presence of the Better Auth session cookie here (its
// name is "better-auth.session_token", prefixed with "__Secure-" over HTTPS).
// An expired/forged cookie still passes this gate but is rejected by the API,
// and the client-side AdminGate bounces it back to /admin/login.
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasSession = request.cookies.getAll().some((cookie) => cookie.name.includes("better-auth.session_token"));
  const isLoginRoute = pathname === "/admin/login";

  // The sign-in screen is the only public admin route. Keep signed-in staff out
  // of it so they land straight on the dashboard.
  if (isLoginRoute) {
    if (hasSession) {
      const url = request.nextUrl.clone();
      url.pathname = "/admin";
      url.search = "";
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  // Every other /admin route requires a session. Preserve where they were headed
  // so login can send them back there.
  if (!hasSession) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin/login";
    url.search = `?redirect=${encodeURIComponent(pathname)}`;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
