"use client";

import { LockKeyhole } from "lucide-react";
import { useState } from "react";

export function AdminGate({ children }: { children: React.ReactNode }) {
  const [allowed, setAllowed] = useState(false);
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  if (allowed) {
    return <>{children}</>;
  }

  return (
    <div className="mx-auto max-w-xl rounded-lg border border-[var(--line)] bg-white p-6 shadow-sm">
      <span className="inline-flex size-11 items-center justify-center rounded-md bg-blue-50 text-[var(--trust)]">
        <LockKeyhole className="size-5" aria-hidden="true" />
      </span>
      <h1 className="mt-4 text-2xl font-bold">Admin access</h1>
      <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
        This area is for staff only. Use demo access while the real login system is being connected.
      </p>
      <form
        className="mt-5 grid gap-3"
        onSubmit={(event) => {
          event.preventDefault();
          if (code.trim().toLowerCase() === "demo123") {
            setAllowed(true);
            setError("");
          } else {
            setError("Use demo123 for demo access.");
          }
        }}
      >
        <label className="grid gap-2 text-sm font-semibold">
          Demo access code
          <input className="focus-ring min-h-11 rounded-md border border-[var(--line)] px-3" onChange={(event) => setCode(event.target.value)} placeholder="demo123" value={code} />
        </label>
        <button className="focus-ring inline-flex min-h-11 items-center justify-center rounded-md bg-[var(--navy)] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800" type="submit">
          Open Dashboard
        </button>
        {error ? <p className="rounded-md bg-amber-50 p-3 text-sm font-semibold text-amber-900">{error}</p> : null}
      </form>
    </div>
  );
}
