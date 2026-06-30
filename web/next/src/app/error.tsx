"use client";

import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // Surface the error for debugging without crashing the whole app.
    console.error(error);
  }, [error]);

  return (
    <div className="page-shell py-16">
      <div className="mx-auto max-w-md rounded-2xl border border-[var(--line)] bg-white p-6 text-center shadow-sm">
        <h1 className="text-xl font-bold text-[var(--navy)]">Something went wrong</h1>
        <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
          This page hit an unexpected error. Reloading usually fixes it — if you recently used the site, your browser may
          be holding an old version.
        </p>
        <div className="mt-5 flex flex-col justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => reset()}
            className="focus-ring inline-flex min-h-11 items-center justify-center rounded-md bg-[var(--trust)] px-4 text-sm font-semibold text-white transition hover:bg-[var(--trust-dark)]"
          >
            Try again
          </button>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="focus-ring inline-flex min-h-11 items-center justify-center rounded-md border border-[var(--line)] bg-white px-4 text-sm font-semibold transition hover:bg-slate-50"
          >
            Reload page
          </button>
        </div>
      </div>
    </div>
  );
}
