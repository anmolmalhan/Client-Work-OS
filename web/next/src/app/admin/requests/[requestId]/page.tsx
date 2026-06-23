import { getRequestByRequestId, requests } from "@wdsc/domain";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AdminGate } from "@/components/admin/admin-gate";
import { RequestDetail } from "@/components/admin/request-detail";

export function generateStaticParams() {
  return requests.map((request) => ({
    requestId: request.requestId,
  }));
}

export default async function AdminRequestDetailsPage({ params }: { params: Promise<{ requestId: string }> }) {
  const { requestId } = await params;
  const request = getRequestByRequestId(decodeURIComponent(requestId));

  if (!request) {
    notFound();
  }

  return (
    <div className="page-shell py-10">
      <AdminGate>
        <Link className="focus-ring inline-flex rounded-md px-3 py-2 text-sm font-bold text-[var(--trust-dark)] hover:bg-blue-50" href="/admin">
          Back to dashboard
        </Link>
        <div className="mt-5">
          <RequestDetail request={request} />
        </div>
      </AdminGate>
    </div>
  );
}
