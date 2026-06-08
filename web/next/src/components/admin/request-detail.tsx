import { getRequestWhatsappLink, paymentStatusLabels, requestStatusLabels, type ClientRequest } from "@wdsc/domain";
import { CalendarClock, FileCheck2, FileUp, IndianRupee, MessageCircle, Phone, ShieldCheck, StickyNote, UploadCloud } from "lucide-react";
import { ActionButton } from "@/components/marketing/action-button";
import { PaymentBadge, StatusBadge } from "@/components/marketing/status-badge";
import { formatDate, formatDateTime } from "@/lib/format";

export function RequestDetail({ request }: { request: ClientRequest }) {
  const paidPercent = request.payment.totalAmount > 0 ? Math.min(100, Math.round((request.payment.paidAmount / request.payment.totalAmount) * 100)) : 0;

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
      <section className="color-strip rounded-lg border border-[var(--line)] bg-white p-5 pt-6 shadow-sm">
        <div className="rounded-lg border border-[#b8f3df] bg-[#effff9] p-5">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-sm font-bold uppercase text-[var(--action-dark)]">{request.requestId}</p>
              <h1 className="mt-1 text-3xl font-bold leading-tight">{request.clientName}</h1>
              <p className="mt-2 flex items-center gap-2 text-sm font-semibold text-[var(--muted)]">
                <Phone className="size-4 text-[var(--action-dark)]" aria-hidden="true" />
                {request.whatsappNumber}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <StatusBadge status={request.status} />
              <PaymentBadge status={request.payment.status} />
            </div>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <MiniMetric icon={FileCheck2} label="Service" value={request.serviceName} />
            <MiniMetric icon={CalendarClock} label="Deadline" value={formatDate(request.deadline)} />
            <MiniMetric icon={IndianRupee} label="Balance" value={`Rs ${request.payment.balanceAmount}`} />
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <InfoBlock label="Current status" value={requestStatusLabels[request.status]} tone="sky" />
          <InfoBlock label="Payment status" value={paymentStatusLabels[request.payment.status]} tone="sun" />
          <InfoBlock label="Total price" value={`Rs ${request.payment.totalAmount}`} tone="mint" />
          <InfoBlock label="Paid amount" value={`Rs ${request.payment.paidAmount}`} tone="coral" />
        </div>

        <div className="mt-5 rounded-lg border border-[#eadfcd] bg-[#fffdf7] p-4">
          <div className="flex items-center justify-between gap-4">
            <p className="text-sm font-bold">Payment progress</p>
            <p className="text-sm font-bold text-[var(--action-dark)]">{paidPercent}% paid</p>
          </div>
          <div className="mt-3 h-3 overflow-hidden rounded-full bg-[#f0e5cf]">
            <div className="h-full rounded-full bg-[var(--action)]" style={{ width: `${paidPercent}%` }} />
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-lg font-bold">Work description</h2>
          <p className="mt-2 rounded-md border border-[var(--line)] bg-[#fffdf7] p-4 text-sm leading-6 text-[var(--muted)]">{request.description}</p>
        </div>

        <div className="mt-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-lg font-bold">Uploaded documents</h2>
            <span className="inline-flex items-center gap-2 rounded-full bg-[#dcfff3] px-3 py-1 text-xs font-bold text-[var(--action-dark)]">
              <ShieldCheck className="size-4" aria-hidden="true" />
              Sensitive files marked
            </span>
          </div>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {request.documents.map((document) => (
              <div className="rounded-md border border-[var(--line)] bg-white p-3 shadow-sm" key={document.id}>
                <p className="flex items-center gap-2 text-sm font-bold">
                  <FileUp className="size-4 text-[var(--action-dark)]" aria-hidden="true" />
                  {document.name}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <DocBadge>{document.type.toUpperCase()}</DocBadge>
                  <DocBadge>{document.isSensitive ? "Sensitive" : "Normal"}</DocBadge>
                  <DocBadge>{document.status.replaceAll("_", " ")}</DocBadge>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <aside className="space-y-5">
        <section className="color-strip rounded-lg border border-[var(--line)] bg-white p-5 pt-6 shadow-sm">
          <h2 className="text-lg font-bold">Admin actions</h2>
          <div className="mt-4 grid gap-3">
            <label className="grid gap-2 text-sm font-semibold">
              Update request status
              <select className="focus-ring min-h-11 rounded-md border border-[var(--line)] bg-[#fffdf7] px-3" defaultValue={request.status}>
                {Object.entries(requestStatusLabels).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </label>
            <label className="grid gap-2 text-sm font-semibold">
              Payment status
              <select className="focus-ring min-h-11 rounded-md border border-[var(--line)] bg-[#fffdf7] px-3" defaultValue={request.payment.status}>
                {Object.entries(paymentStatusLabels).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </label>
            <label className="grid gap-2 text-sm font-semibold">
              Add service price
              <input className="focus-ring min-h-11 rounded-md border border-[var(--line)] bg-[#fffdf7] px-3" defaultValue={request.payment.totalAmount} inputMode="numeric" />
            </label>
            <label className="grid gap-2 text-sm font-semibold">
              Upload final receipt or file
              <span className="flex min-h-11 items-center gap-2 rounded-md border border-dashed border-[#b8f3df] bg-[#effff9] px-3 text-sm text-[var(--muted)]">
                <UploadCloud className="size-5" aria-hidden="true" />
                <input className="w-full text-sm" type="file" />
              </span>
            </label>
            <ActionButton href={getRequestWhatsappLink(request)} icon={MessageCircle} external>
              Send WhatsApp Update
            </ActionButton>
          </div>
        </section>

        <section className="rounded-lg border border-[var(--line)] bg-white p-5 shadow-sm">
          <h2 className="flex items-center gap-2 text-lg font-bold">
            <StickyNote className="size-5" aria-hidden="true" />
            Admin notes
          </h2>
          <div className="mt-3 space-y-2">
            {request.adminNotes.map((note) => (
              <p className="rounded-md border border-[#eadfcd] bg-[#fffdf7] p-3 text-sm text-[var(--muted)]" key={note}>
                {note}
              </p>
            ))}
          </div>
          <textarea className="focus-ring mt-3 min-h-24 w-full rounded-md border border-[var(--line)] bg-[#fffdf7] px-3 py-3 text-sm" placeholder="Add internal note" />
        </section>

        <section className="rounded-lg border border-[#b8f3df] bg-[#effff9] p-5 shadow-sm">
          <h2 className="text-lg font-bold">Delivery</h2>
          <div className="mt-3 space-y-2 text-sm text-[var(--muted)]">
            <p>Final output: {request.finalOutputFile ?? "Not uploaded yet"}</p>
            <p>Confirmation: {request.deliveryConfirmation ?? "Pending"}</p>
            <p>Updated: {formatDateTime(request.updatedAt)}</p>
          </div>
        </section>
      </aside>
    </div>
  );
}

const infoTones = {
  mint: "border-[#b8f3df] bg-[#effff9]",
  sun: "border-[#f3df9b] bg-[#fff7dc]",
  sky: "border-[#bde8ff] bg-[#eef9ff]",
  coral: "border-[#ffc3b5] bg-[#fff0eb]",
};

function InfoBlock({ label, value, tone = "mint" }: { label: string; value: string; tone?: keyof typeof infoTones }) {
  return (
    <div className={`rounded-md border p-3 ${infoTones[tone]}`}>
      <p className="text-xs font-bold uppercase text-[var(--muted)]">{label}</p>
      <p className="mt-1 text-sm font-semibold">{value}</p>
    </div>
  );
}

function MiniMetric({ icon: Icon, label, value }: { icon: typeof FileCheck2; label: string; value: string }) {
  return (
    <div className="rounded-md bg-white p-3 shadow-sm">
      <p className="flex items-center gap-2 text-xs font-bold uppercase text-[var(--muted)]">
        <Icon className="size-4 text-[var(--action-dark)]" aria-hidden="true" />
        {label}
      </p>
      <p className="mt-1 text-sm font-bold">{value}</p>
    </div>
  );
}

function DocBadge({ children }: { children: React.ReactNode }) {
  return <span className="rounded-full bg-[#dcfff3] px-2.5 py-1 text-xs font-bold capitalize text-[var(--action-dark)]">{children}</span>;
}
