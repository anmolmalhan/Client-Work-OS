import { AdminGate } from "@/components/admin/admin-gate";
import { JobsManager } from "@/components/admin/jobs-manager";
import { SectionHeading } from "@/components/marketing/section-heading";

export const dynamic = "force-dynamic";

export default function AdminJobsPage() {
  return (
    <div className="page-shell py-10">
      <AdminGate>
        <SectionHeading
          eyebrow="Admin · Sarkari Result"
          title="Manage government job & form listings"
          description="Add latest jobs, results, admit cards and answer keys. Published listings appear on the public Sarkari Result pages and drive organic traffic."
        />
        <JobsManager />
      </AdminGate>
    </div>
  );
}
