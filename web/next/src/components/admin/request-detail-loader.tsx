"use client";

import type { ClientRequest } from "@wdsc/domain";
import { useQuery } from "@tanstack/react-query";
import { RequestDetail } from "@/components/admin/request-detail";
import { rpc } from "@/lib/rpc";

export function RequestDetailLoader({ requestId }: { requestId: string }) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["request", requestId],
    queryFn: async () => {
      const response = await rpc.requests[":requestId"].$get({ param: { requestId } });
      if (response.status === 404) {
        return null;
      }
      if (!response.ok) {
        throw new Error("Failed to load request");
      }
      return (await response.json()).data as ClientRequest;
    },
  });

  if (isLoading) {
    return <p className="rounded-lg border border-[var(--line)] bg-white p-6 text-sm text-[var(--muted)] shadow-sm">Loading request…</p>;
  }
  if (isError) {
    return <p className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm font-semibold text-amber-900">Could not load this request.</p>;
  }
  if (!data) {
    return <p className="rounded-lg border border-[var(--line)] bg-white p-6 text-sm text-[var(--muted)] shadow-sm">Request not found.</p>;
  }
  return <RequestDetail request={data} />;
}
