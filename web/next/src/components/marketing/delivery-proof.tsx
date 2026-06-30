import { BadgeCheck, FileText, IndianRupee, MessageCircle } from "lucide-react";

// A sample "proof of delivery" card so new users can see what they'll receive
// after a task is completed. Illustrative content — not a real customer record.
export function ApplyDeliveryProof() {
  return (
    <div className="color-strip rounded-2xl border border-[var(--line)] bg-white p-5 pt-6 shadow-[0_18px_42px_rgba(15,23,42,0.1)]">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-sm font-bold text-[var(--whatsapp-dark)]">
          <MessageCircle className="size-5" aria-hidden="true" />
          Delivered on WhatsApp
        </div>
        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700 ring-1 ring-emerald-200">
          <BadgeCheck className="size-3.5" aria-hidden="true" />
          Completed
        </span>
      </div>

      <div className="mt-4 space-y-3 text-sm">
        <ProofRow label="Request ID" value="SDS-2026-0148" />
        <ProofRow label="Service" value="Online form filling" />
        <ProofRow label="Application no." value="HSSC-9F23K7" />
        <div className="rounded-xl border border-[var(--line)] bg-slate-50 p-3">
          <p className="flex items-center gap-2 text-xs font-bold uppercase text-[var(--muted)]">
            <FileText className="size-4 text-[var(--trust)]" aria-hidden="true" />
            Proof attached
          </p>
          <p className="mt-1 font-semibold">Submission-confirmation.pdf</p>
        </div>
        <div className="flex items-center justify-between rounded-xl border border-amber-100 bg-amber-50 p-3">
          <span className="flex items-center gap-2 text-xs font-bold uppercase text-amber-900">
            <IndianRupee className="size-4" aria-hidden="true" />
            Paid
          </span>
          <span className="text-sm font-bold text-amber-900">₹149 · UPI</span>
        </div>
      </div>

      <p className="mt-3 text-[11px] text-[var(--muted)]">Sample proof for illustration. Your real proof is shared privately on WhatsApp.</p>
    </div>
  );
}

function ProofRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-[var(--line)] pb-2">
      <span className="text-xs font-bold uppercase text-[var(--muted)]">{label}</span>
      <span className="font-semibold text-[var(--foreground)]">{value}</span>
    </div>
  );
}
