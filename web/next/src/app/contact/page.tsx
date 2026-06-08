import { businessProfile, faqs, getBusinessWhatsappLink } from "@wdsc/domain";
import { Mail, MessageCircle, Phone, Timer } from "lucide-react";
import { ActionButton } from "@/components/marketing/action-button";
import { FaqList } from "@/components/marketing/faq-list";
import { SectionHeading } from "@/components/marketing/section-heading";

export default function ContactPage() {
  return (
    <div className="page-shell py-10">
      <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
        <SectionHeading
          eyebrow="Contact"
          title="WhatsApp is the main support channel"
          description="Send details, documents, payment confirmations, and delivery questions through WhatsApp for the fastest response."
        />
        <ActionButton href={getBusinessWhatsappLink()} icon={MessageCircle} external>
          WhatsApp Button
        </ActionButton>
      </div>
      <div className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <section className="rounded-lg border border-[var(--line)] bg-white p-5 shadow-sm">
          <h2 className="text-lg font-bold">Business details</h2>
          <div className="mt-4 grid gap-3 text-sm">
            <a className="flex items-center gap-3 rounded-md bg-[#f5f8f6] p-3 font-semibold hover:text-[var(--action-dark)]" href={getBusinessWhatsappLink()} target="_blank" rel="noreferrer">
              <MessageCircle className="size-5 text-[var(--action)]" aria-hidden="true" />
              WhatsApp: {businessProfile.whatsappNumber}
            </a>
            <a className="flex items-center gap-3 rounded-md bg-[#f5f8f6] p-3 font-semibold hover:text-[var(--action-dark)]" href={`tel:${businessProfile.phone}`}>
              <Phone className="size-5 text-[var(--action)]" aria-hidden="true" />
              Phone: {businessProfile.phone}
            </a>
            <a className="flex items-center gap-3 rounded-md bg-[#f5f8f6] p-3 font-semibold hover:text-[var(--action-dark)]" href={`mailto:${businessProfile.email}`}>
              <Mail className="size-5 text-[var(--action)]" aria-hidden="true" />
              Email: {businessProfile.email}
            </a>
            <p className="flex items-center gap-3 rounded-md bg-[#f5f8f6] p-3 font-semibold">
              <Timer className="size-5 text-[var(--action)]" aria-hidden="true" />
              {businessProfile.workingHours}
            </p>
          </div>
          <p className="mt-4 rounded-md bg-emerald-50 p-3 text-sm font-semibold text-emerald-900">{businessProfile.serviceArea}</p>
        </section>
        <section>
          <h2 className="mb-4 text-lg font-bold">FAQ</h2>
          <FaqList items={faqs.slice(0, 5)} />
        </section>
      </div>
    </div>
  );
}
