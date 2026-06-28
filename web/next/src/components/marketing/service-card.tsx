import { getServiceWhatsappLink, serviceCategoryLabels, type ServiceItem } from "@wdsc/domain";
import { FileText, MessageCircle } from "lucide-react";
import { ActionButton } from "@/components/marketing/action-button";
import { priceText } from "@/lib/format";

export function ServiceCard({ service, index = 0 }: { service: ServiceItem; index?: number }) {
  return (
    <article className="color-strip glow-card stagger-card flex h-full flex-col rounded-2xl border border-[var(--line)] bg-white p-5 pt-6 shadow-sm" style={{ animationDelay: `${index * 70}ms` }}>
      <div className="flex items-start gap-3">
        <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-md bg-blue-50 text-[var(--trust)] ring-1 ring-blue-100">
          <FileText aria-hidden="true" className="size-5" />
        </span>
        <div>
          <p className="text-xs font-bold uppercase text-[var(--trust-dark)]">{serviceCategoryLabels[service.category]}</p>
          <h3 className="mt-1 text-lg font-bold">{service.name}</h3>
        </div>
      </div>
      <p className="mt-4 flex-1 text-sm leading-6 text-[var(--muted)]">{service.description}</p>
      <div className="mt-5 rounded-md border border-amber-100 bg-amber-50 p-3">
        <p className="text-sm font-bold text-amber-900">{priceText(service.estimatedPrice, service.priceNote)}</p>
        <p className="mt-2 text-xs font-semibold text-[var(--muted)]">Required: {service.requiredDocuments.join(", ")}</p>
      </div>
      <div className="mt-5">
        <ActionButton href={getServiceWhatsappLink(service)} icon={MessageCircle} variant="whatsapp" external>
          Request on WhatsApp
        </ActionButton>
      </div>
    </article>
  );
}
