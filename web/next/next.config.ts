import type { NextConfig } from "next";

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
};

export default nextConfig;
