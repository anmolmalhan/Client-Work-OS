import { type NextRequest, NextResponse } from "next/server";

// Server-side guard for admin data pages: bounce logged-out visitors to the
// /admin sign-in screen before the page renders, instead of relying only on the
// client-side gate. Real authorization is still enforced by the API (401 without
// a valid session); this is defense-in-depth plus a cleaner logged-out UX.
//
// We only check for the presence of the Better Auth session cookie here (its
// name is "better-auth.session_token", prefixed with "__Secure-" over HTTPS).
// An expired/forged cookie still passes this gate but is rejected by the API.
export function middleware(request: NextRequest) {
  const hasSession = request.cookies.getAll().some((cookie) => cookie.name.includes("better-auth.session_token"));

  if (!hasSession) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  // /admin itself is the sign-in screen, so it is intentionally not matched.
  matcher: ["/admin/jobs", "/admin/requests/:path*"],
};
