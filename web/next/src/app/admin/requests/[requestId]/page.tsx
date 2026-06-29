import Link from "next/link";
import { AdminGate } from "@/components/admin/admin-gate";
import { RequestDetailLoader } from "@/components/admin/request-detail-loader";

export const dynamic = "force-dynamic";

export default async function AdminRequestDetailsPage({ params }: { params: Promise<{ requestId: string }> }) {
  const { requestId } = await params;

  return (
    <div className="page-shell py-10">
      <AdminGate>
        <Link className="focus-ring inline-flex rounded-md px-3 py-2 text-sm font-bold text-[var(--trust-dark)] hover:bg-blue-50" href="/admin">
          Back to dashboard
        </Link>
        <div className="mt-5">
          <RequestDetailLoader requestId={decodeURIComponent(requestId)} />
        </div>
      </AdminGate>
    </div>
  );
}
