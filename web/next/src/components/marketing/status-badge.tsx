import { paymentStatusLabels, requestStatusLabels, type PaymentStatus, type RequestStatus } from "@wdsc/domain";

const statusStyles: Record<RequestStatus, string> = {
  request_received: "bg-sky-50 text-sky-800 ring-sky-200",
  details_pending: "bg-amber-50 text-amber-800 ring-amber-200",
  payment_pending: "bg-orange-50 text-orange-800 ring-orange-200",
  in_progress: "bg-blue-50 text-blue-800 ring-blue-200",
  submitted: "bg-violet-50 text-violet-800 ring-violet-200",
  completed: "bg-emerald-50 text-emerald-800 ring-emerald-200",
  delivered: "bg-teal-50 text-teal-800 ring-teal-200",
  cancelled: "bg-slate-100 text-slate-700 ring-slate-200",
};

const paymentStyles: Record<PaymentStatus, string> = {
  unpaid: "bg-orange-50 text-orange-800 ring-orange-200",
  partial: "bg-yellow-50 text-yellow-800 ring-yellow-200",
  paid: "bg-emerald-50 text-emerald-800 ring-emerald-200",
  refunded: "bg-slate-100 text-slate-700 ring-slate-200",
};

export function StatusBadge({ status }: { status: RequestStatus }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${statusStyles[status]}`}>
      {requestStatusLabels[status]}
    </span>
  );
}

export function PaymentBadge({ status }: { status: PaymentStatus }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${paymentStyles[status]}`}>
      {paymentStatusLabels[status]}
    </span>
  );
}
