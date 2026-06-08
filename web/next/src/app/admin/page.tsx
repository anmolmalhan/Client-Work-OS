import { getDashboardStats, requests } from "@wdsc/domain";
import { formatMoney } from "@wdsc/domain";
import { RequestTable } from "@/components/admin/request-table";
import { StatCard } from "@/components/admin/stat-card";
import { SectionHeading } from "@/components/marketing/section-heading";

export default function AdminDashboardPage() {
  const stats = getDashboardStats(requests);

  return (
    <div className="page-shell py-10">
      <SectionHeading
        eyebrow="Admin dashboard"
        title="Manage client requests, payments, documents, and delivery"
        description="This MVP dashboard uses demo data but mirrors the workflow for real client operations."
      />
      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total requests" value={stats.totalRequests} helper="Generated request IDs" tone="mint" />
        <StatCard label="In progress" value={stats.inProgress} helper="Currently being worked on" tone="sky" />
        <StatCard label="Revenue collected" value={formatMoney(stats.revenueCollected)} helper="Paid and partial payments" tone="sun" />
        <StatCard label="Balance pending" value={formatMoney(stats.balancePending)} helper="Pending from clients" tone="coral" />
      </div>
      <div className="mt-8">
        <RequestTable />
      </div>
    </div>
  );
}
