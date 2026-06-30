"use client";

import { useEffect } from "react";

// Root error boundary — catches errors thrown in the root layout itself.
// Must render its own <html>/<body> because it replaces the whole document.
export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body style={{ fontFamily: "system-ui, sans-serif", margin: 0, padding: "4rem 1.5rem", background: "#f8fafc", color: "#0f172a" }}>
        <div style={{ maxWidth: 420, margin: "0 auto", textAlign: "center", background: "#fff", border: "1px solid #e2e8f0", borderRadius: 16, padding: 24 }}>
          <h1 style={{ fontSize: 20, fontWeight: 700, margin: 0 }}>Something went wrong</h1>
          <p style={{ marginTop: 8, fontSize: 14, lineHeight: 1.6, color: "#64748b" }}>
            The page hit an unexpected error. Reloading usually fixes it.
          </p>
          <button
            type="button"
            onClick={() => reset()}
            style={{ marginTop: 20, minHeight: 44, padding: "0 16px", borderRadius: 8, border: "none", background: "#2563eb", color: "#fff", fontWeight: 600, cursor: "pointer" }}
          >
            Reload page
          </button>
        </div>
      </body>
    </html>
  );
}
