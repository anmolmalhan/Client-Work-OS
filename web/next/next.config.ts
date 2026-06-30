import type { NextConfig } from "next";

// Web + API are both connected to GitHub for auto-deploy on push to main.

// Proxy the Hono API through the web domain so the browser only ever talks to
// one origin. This keeps the Better Auth session cookie first-party (works in
// every browser, no third-party-cookie blocking) and avoids cross-origin CORS.
const apiOrigin = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4100";

const nextConfig: NextConfig = {
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
