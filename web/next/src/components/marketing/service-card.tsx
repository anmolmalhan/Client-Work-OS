import { getServiceWhatsappLink, serviceCategoryLabels, type ServiceItem } from "@wdsc/domain";
import { FileText, MessageCircle } from "lucide-react";
import { ActionButton } from "@/components/marketing/action-button";
import { priceText } from "@/lib/format";

export function ServiceCard({ service }: { service: ServiceItem }) {
  return (
    <article className="color-strip flex h-full flex-col rounded-lg border border-[var(--line)] bg-white p-5 pt-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-[0_18px_38px_rgba(8,116,99,0.14)]">
      <div className="flex items-start gap-3">
        <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-md bg-[#dcfff3] text-[var(--action-dark)] ring-1 ring-[#b8f3df]">
          <FileText aria-hidden="true" className="size-5" />
        </span>
        <div>
          <p className="text-xs font-bold uppercase text-[var(--action-dark)]">{serviceCategoryLabels[service.category]}</p>
          <h3 className="mt-1 text-lg font-bold">{service.name}</h3>
        </div>
      </div>
      <p className="mt-4 flex-1 text-sm leading-6 text-[var(--muted)]">{service.description}</p>
      <div className="mt-5 rounded-md border border-[#f3e1aa] bg-[var(--cream)] p-3">
        <p className="text-sm font-bold text-[#7a4a00]">{priceText(service.estimatedPrice, service.priceNote)}</p>
        <p className="mt-2 text-xs font-semibold text-[var(--muted)]">Required: {service.requiredDocuments.join(", ")}</p>
      </div>
      <div className="mt-5">
        <ActionButton href={getServiceWhatsappLink(service)} icon={MessageCircle} external>
          Request on WhatsApp
        </ActionButton>
      </div>
    </article>
  );
}
