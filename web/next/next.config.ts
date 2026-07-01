import type { NextConfig } from "next";

// Proxy the Hono API through the web domain so the browser only ever talks to
// one origin. This keeps the Better Auth session cookie first-party (works in
// every browser, no third-party-cookie blocking) and avoids cross-origin CORS.
const apiOrigin = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4100";

// Content-Security-Policy is shipped in report-only mode first: the browser
// reports violations (so the policy can be tuned against real traffic) without
// blocking anything. Once the reports are clean, switch the header key below
// from "Content-Security-Policy-Report-Only" to "Content-Security-Policy".
const contentSecurityPolicy = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  // 'unsafe-inline'/'unsafe-eval' are still needed by Next.js hydration and dev
  // tooling until we adopt nonces; acceptable while the policy is report-only.
  "style-src 'self' 'unsafe-inline'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
  "connect-src 'self'",
  "form-action 'self'",
].join("; ");

// HSTS is added automatically by Vercel for the custom domain; these cover the
// gaps flagged in the security review.
const securityHeaders = [
  { key: "Content-Security-Policy-Report-Only", value: contentSecurityPolicy },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
];

const nextConfig: NextConfig = {
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  async rewrites() {
    return [
      { source: "/api/v1/:path*", destination: `${apiOrigin}/api/v1/:path*` },
      { source: "/api/auth/:path*", destination: `${apiOrigin}/api/auth/:path*` },
    ];
  },
  async redirects() {
    // Common alternate URLs people type or link to -> canonical pages.
    return [
      { source: "/refunds", destination: "/refund", permanent: true },
      { source: "/refund-policy", destination: "/refund", permanent: true },
      { source: "/privacy-policy", destination: "/privacy", permanent: true },
      { source: "/terms-of-service", destination: "/terms", permanent: true },
      { source: "/sarkari-results", destination: "/sarkari-result", permanent: true },
    ];
  },
};

export default nextConfig;
