"use client";

import { requestStatusLabels, requests } from "@wdsc/domain";
import type { ClientRequest } from "@wdsc/domain";
import { Search } from "lucide-react";
import { useState } from "react";
import { StatusBadge, PaymentBadge } from "@/components/marketing/status-badge";
import { formatDate } from "@/lib/format";

function findRequest(requestId: string, phone: string): ClientRequest | undefined {
  const digits = phone.replace(/\D/g, "");
  return requests.find(
    (request) =>
      request.requestId.toLowerCase() === requestId.trim().toLowerCase() &&
      request.whatsappNumber.replace(/\D/g, "").endsWith(digits.slice(-10)),
  );
}

export function TrackRequestForm() {
  const [requestId, setRequestId] = useState("SDS-2026-0001");
  const [phone, setPhone] = useState("9876500001");
  const [result, setResult] = useState<ClientRequest | null | undefined>(requests[0]);

  return (
    <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
      <form
        className="rounded-lg border border-[var(--line)] bg-white p-5 shadow-sm"
        onSubmit={(event) => {
          event.preventDefault();
          setResult(findRequest(requestId, phone) ?? null);
        }}
      >
        <label className="grid gap-2 text-sm font-semibold">
          Request ID
          <input
            className="focus-ring min-h-11 rounded-md border border-[var(--line)] px-3"
            onChange={(event) => setRequestId(event.target.value)}
            required
            value={requestId}
          />
        </label>
        <label className="mt-4 grid gap-2 text-sm font-semibold">
          WhatsApp number
          <input
            className="focus-ring min-h-11 rounded-md border border-[var(--line)] px-3"
            inputMode="tel"
            onChange={(event) => setPhone(event.target.value)}
            required
            value={phone}
          />
        </label>
        <button className="focus-ring mt-5 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-md bg-[var(--action)] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[var(--action-dark)]" type="submit">
          <Search className="size-4" aria-hidden="true" />
          Check Status
        </button>
      </form>
      <section className="rounded-lg border border-[var(--line)] bg-white p-5 shadow-sm">
        {result === undefined ? (
          <p className="text-sm text-[var(--muted)]">Enter a request ID and WhatsApp number to view status.</p>
        ) : result === null ? (
          <p className="rounded-md bg-orange-50 p-3 text-sm font-semibold text-orange-900">
            No request found. Please check the Request ID or contact on WhatsApp.
          </p>
        ) : (
          <div>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-[var(--muted)]">{result.requestId}</p>
                <h2 className="mt-1 text-2xl font-bold">{result.serviceName}</h2>
              </div>
              <StatusBadge status={result.status} />
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <div className="rounded-md bg-[#f5f8f6] p-3">
                <p className="text-xs font-bold uppercase text-[var(--muted)]">Current update</p>
                <p className="mt-1 text-sm font-semibold">{result.latestUpdate}</p>
              </div>
              <div className="rounded-md bg-[#f5f8f6] p-3">
                <p className="text-xs font-bold uppercase text-[var(--muted)]">Payment</p>
                <div className="mt-1">
                  <PaymentBadge status={result.payment.status} />
                </div>
              </div>
              <div className="rounded-md bg-[#f5f8f6] p-3">
                <p className="text-xs font-bold uppercase text-[var(--muted)]">Deadline</p>
                <p className="mt-1 text-sm font-semibold">{formatDate(result.deadline)}</p>
              </div>
              <div className="rounded-md bg-[#f5f8f6] p-3">
                <p className="text-xs font-bold uppercase text-[var(--muted)]">Next status examples</p>
                <p className="mt-1 text-sm font-semibold">{Object.values(requestStatusLabels).join(" -> ")}</p>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
