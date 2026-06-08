"use client";

import { requestStatusLabels, requestStatuses, requests } from "@wdsc/domain";
import type { ClientRequest, RequestStatus } from "@wdsc/domain";
import { Search } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { PaymentBadge, StatusBadge } from "@/components/marketing/status-badge";
import { formatDate } from "@/lib/format";

function matchesStatus(request: ClientRequest, status: "all" | RequestStatus) {
  return status === "all" || request.status === status;
}

function matchesSearch(request: ClientRequest, query: string) {
  const value = query.trim().toLowerCase();
  if (!value) {
    return true;
  }

  return [request.clientName, request.whatsappNumber, request.requestId, request.serviceName].some((item) =>
    item.toLowerCase().includes(value),
  );
}

export function RequestTable() {
  const [status, setStatus] = useState<"all" | RequestStatus>("all");
  const [query, setQuery] = useState("");

  const filteredRequests = useMemo(
    () => requests.filter((request) => matchesStatus(request, status) && matchesSearch(request, query)),
    [query, status],
  );

  return (
    <section className="color-strip rounded-lg border border-[var(--line)] bg-white p-4 pt-6 shadow-sm">
      <div className="grid gap-3 lg:grid-cols-[1fr_240px]">
        <label className="relative">
          <span className="sr-only">Search requests</span>
          <Search className="pointer-events-none absolute left-3 top-3 size-5 text-[var(--muted)]" aria-hidden="true" />
          <input
            className="focus-ring min-h-11 w-full rounded-md border border-[var(--line)] bg-[#fffdf7] px-3 pl-10 text-sm"
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by client, phone, request ID"
            value={query}
          />
        </label>
        <label>
          <span className="sr-only">Filter by status</span>
          <select
            className="focus-ring min-h-11 w-full rounded-md border border-[var(--line)] bg-[#fffdf7] px-3 text-sm font-semibold"
            onChange={(event) => setStatus(event.target.value as "all" | RequestStatus)}
            value={status}
          >
            <option value="all">All statuses</option>
            {requestStatuses.map((item) => (
              <option key={item} value={item}>
                {requestStatusLabels[item]}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[860px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-y border-[var(--line)] bg-[#eafff6] text-xs uppercase text-[var(--action-dark)]">
              <th className="px-3 py-3">Request</th>
              <th className="px-3 py-3">Client</th>
              <th className="px-3 py-3">Service</th>
              <th className="px-3 py-3">Deadline</th>
              <th className="px-3 py-3">Status</th>
              <th className="px-3 py-3">Payment</th>
              <th className="px-3 py-3">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--line)]">
            {filteredRequests.map((request) => (
              <tr className="transition hover:bg-[#fff8e5]" key={request.id}>
                <td className="px-3 py-4 font-bold">{request.requestId}</td>
                <td className="px-3 py-4">
                  <p className="font-semibold">{request.clientName}</p>
                  <p className="text-xs text-[var(--muted)]">{request.whatsappNumber}</p>
                </td>
                <td className="px-3 py-4">{request.serviceName}</td>
                <td className="px-3 py-4">{formatDate(request.deadline)}</td>
                <td className="px-3 py-4">
                  <StatusBadge status={request.status} />
                </td>
                <td className="px-3 py-4">
                  <PaymentBadge status={request.payment.status} />
                </td>
                <td className="px-3 py-4">
                  <Link className="focus-ring rounded-md bg-[#dcfff3] px-3 py-2 text-sm font-bold text-[var(--action-dark)] hover:bg-[#c6f7e7]" href={`/admin/requests/${request.requestId}`}>
                    Open
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
