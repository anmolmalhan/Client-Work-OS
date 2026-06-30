"use client";

import { formatMoney, type ClientRequest, type DashboardStats } from "@wdsc/domain";
import { useQuery } from "@tanstack/react-query";
import { RequestTable } from "@/components/admin/request-table";
import { StatCard } from "@/components/admin/stat-card";
import { rpc } from "@/lib/rpc";

async function fetchDashboard() {
  const response = await rpc.dashboard.$get();
  if (!response.ok) {
    throw new Error("Failed to load dashboard");
  }
  return (await response.json()).data as { stats: DashboardStats; requests: ClientRequest[] };
}

export function RequestsDashboard() {
  const { data, isLoading, isError } = useQuery({ queryKey: ["dashboard"], queryFn: fetchDashboard });
  const stats = data?.stats;

  return (
    <div>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total requests" value={stats?.totalRequests ?? "—"} helper="Generated request IDs" tone="mint" />
        <StatCard label="In progress" value={stats?.inProgress ?? "—"} helper="Currently being worked on" tone="sky" />
        <StatCard label="Revenue collected" value={stats ? formatMoney(stats.revenueCollected) : "—"} helper="Paid and partial payments" tone="sun" />
        <StatCard label="Balance pending" value={stats ? formatMoney(stats.balancePending) : "—"} helper="Pending from clients" tone="coral" />
      </div>
      <div className="mt-8">
        {isError ? (
          <p className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm font-semibold text-amber-900">
            Could not load requests right now. Please reload the page, or check your connection and sign in again.
          </p>
        ) : (
          <RequestTable requests={data?.requests} loading={isLoading} />
        )}
      </div>
    </div>
  );
}
