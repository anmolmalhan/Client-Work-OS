"use client";

import { requestStatusLabels } from "@wdsc/domain";
import type { ClientRequest, RequestStatus } from "@wdsc/domain";
import { useMutation } from "@tanstack/react-query";
import { CalendarClock, CheckCircle2, Clock3, IndianRupee, MessageSquareText, Search, ShieldCheck } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useState } from "react";
import { StatusBadge, PaymentBadge } from "@/components/marketing/status-badge";
import { formatDate, formatDateTime } from "@/lib/format";
import { rpc } from "@/lib/rpc";

const visibleStatuses: RequestStatus[] = ["request_received", "details_pending", "payment_pending", "in_progress", "completed", "delivered"];

function nextStepFor(request: ClientRequest) {
  if (request.status === "details_pending") {
    return "Send missing detail or document on WhatsApp.";
  }
  if (request.status === "payment_pending") {
    return "Complete payment after price confirmation.";
  }
  if (request.status === "in_progress") {
    return "Wait for final check and delivery proof.";
  }
  if (request.status === "completed") {
    return "Check the delivered file or confirmation.";
  }
  if (request.status === "delivered") {
    return "Work delivered. Save your proof safely.";
  }
  return "We will check details and confirm price.";
}

export function TrackRequestForm() {
  const [requestId, setRequestId] = useState("");
  const [phone, setPhone] = useState("");

  const mutation = useMutation({
    mutationFn: async () => {
      const response = await rpc.track.$post({ json: { requestId: requestId.trim(), whatsappNumber: phone.trim() } });
      if (response.status === 404) {
        return null;
      }
      if (!response.ok) {
        throw new Error("Could not check status right now. Please try again.");
      }
      return (await response.json()).data as ClientRequest;
    },
  });

  return (
    <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
      <form
        className="rounded-lg border border-[var(--line)] bg-white p-5 shadow-sm"
        onSubmit={(event) => {
          event.preventDefault();
          mutation.mutate();
        }}
      >
        <label className="grid gap-2 text-sm font-semibold">
          Request ID
          <input className="focus-ring min-h-11 rounded-md border border-[var(--line)] px-3" onChange={(event) => setRequestId(event.target.value)} placeholder="SDS-2026-0001" required value={requestId} />
        </label>
        <label className="mt-4 grid gap-2 text-sm font-semibold">
          WhatsApp number
          <input className="focus-ring min-h-11 rounded-md border border-[var(--line)] px-3" inputMode="tel" onChange={(event) => setPhone(event.target.value)} placeholder="Registered WhatsApp number" required value={phone} />
        </label>
        <button className="focus-ring mt-5 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-md bg-[var(--trust)] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[var(--trust-dark)] disabled:opacity-60" type="submit" disabled={mutation.isPending}>
          <Search className="size-4" aria-hidden="true" />
          {mutation.isPending ? "Checking…" : "Check Status"}
        </button>
        <div className="mt-5 rounded-md border border-[var(--line)] bg-slate-50 p-4 text-sm leading-6 text-[var(--muted)]">
          <ShieldCheck className="mb-2 size-5 text-[var(--trust)]" aria-hidden="true" />
          Only request ID and WhatsApp number are needed. Sensitive document details are not shown publicly.
        </div>
      </form>
      <section className="rounded-lg border border-[var(--line)] bg-white p-5 shadow-sm">
        {mutation.isPending ? (
          <p className="text-sm text-[var(--muted)]">Checking your request status…</p>
        ) : mutation.isError ? (
          <p className="rounded-md bg-amber-50 p-3 text-sm font-semibold text-amber-900">{mutation.error instanceof Error ? mutation.error.message : "Could not check status right now."}</p>
        ) : mutation.data === null ? (
          <p className="rounded-md bg-amber-50 p-3 text-sm font-semibold text-amber-900">
            No request found. Please check the Request ID and WhatsApp number, or contact us on WhatsApp.
          </p>
        ) : mutation.data ? (
          <TrackResult request={mutation.data} />
        ) : (
          <p className="text-sm text-[var(--muted)]">Enter a request ID and WhatsApp number to view status.</p>
        )}
      </section>
    </div>
  );
}

function TrackResult({ request }: { request: ClientRequest }) {
  const activeIndex = Math.max(0, visibleStatuses.indexOf(request.status));
  const progressWidth = request.status === "cancelled" ? 100 : Math.round(((activeIndex + 1) / visibleStatuses.length) * 100);

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-[var(--muted)]">{request.requestId}</p>
          <h2 className="mt-1 text-2xl font-bold">{request.serviceName}</h2>
        </div>
        <StatusBadge status={request.status} />
      </div>

      <div className="mt-6 rounded-lg border border-[var(--line)] bg-slate-50 p-4">
        <div className="h-2 overflow-hidden rounded-full bg-white">
          <div className="status-fill h-full rounded-full bg-[var(--trust)]" style={{ width: `${progressWidth}%` }} />
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2 text-xs font-bold text-[var(--muted)] sm:grid-cols-6">
          {visibleStatuses.map((status, index) => (
            <span className={index <= activeIndex ? "text-[var(--trust-dark)]" : ""} key={status}>
              {requestStatusLabels[status]}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <VisualInfo icon={MessageSquareText} label="Current update" value={request.latestUpdate} />
        <div className="rounded-md border border-[var(--line)] bg-white p-3 shadow-sm">
          <p className="flex items-center gap-2 text-xs font-bold uppercase text-[var(--muted)]">
            <IndianRupee className="size-4 text-[var(--trust)]" aria-hidden="true" />
            Payment
          </p>
          <div className="mt-2">
            <PaymentBadge status={request.payment.status} />
          </div>
        </div>
        <VisualInfo icon={CalendarClock} label="Deadline" value={formatDate(request.deadline)} />
        <VisualInfo icon={Clock3} label="Last updated" value={formatDateTime(request.updatedAt)} />
        <VisualInfo icon={CheckCircle2} label="Next step" value={nextStepFor(request)} />
      </div>
    </div>
  );
}

function VisualInfo({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string }) {
  return (
    <div className="rounded-md border border-[var(--line)] bg-white p-3 shadow-sm">
      <p className="flex items-center gap-2 text-xs font-bold uppercase text-[var(--muted)]">
        <Icon className="size-4 text-[var(--trust)]" aria-hidden="true" />
        {label}
      </p>
      <p className="mt-2 text-sm font-semibold leading-6">{value}</p>
    </div>
  );
}
