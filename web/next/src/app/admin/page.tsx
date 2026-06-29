import { AdminGate } from "@/components/admin/admin-gate";
import { AdminHero } from "@/components/admin/admin-hero";
import { RequestsDashboard } from "@/components/admin/requests-dashboard";

export const dynamic = "force-dynamic";

export default function AdminDashboardPage() {
  return (
    <div className="page-shell py-10">
      <AdminGate>
        <AdminHero
          eyebrow="Admin dashboard"
          title="Manage client requests, payments, documents, and delivery"
          description="Live request inbox with the fields needed for request priority, payment follow-up, document checks, notes, and delivery proof."
        />
        <RequestsDashboard />
      </AdminGate>
    </div>
  );
}
