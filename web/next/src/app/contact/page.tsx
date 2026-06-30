import { businessProfile, faqs, getBusinessWhatsappLink } from "@wdsc/domain";
import { Mail, MessageCircle, Phone, Timer } from "lucide-react";
import type { Metadata } from "next";
import { ActionButton } from "@/components/marketing/action-button";
import { FaqList } from "@/components/marketing/faq-list";
import { PageHero } from "@/components/marketing/page-hero";

export const metadata: Metadata = {
  title: "Contact — WhatsApp Support for Forms & Documents",
  description:
    "Reach Swift Digital Seva on WhatsApp for online form filling, document and PDF help. Fast replies, Mon–Sat 9 AM–8 PM, remote service across India.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div>
      <PageHero
        eyebrow="Contact"
        title="WhatsApp is the main support"
        highlight="channel"
        description="Send details, documents, payment confirmations, and delivery questions through WhatsApp for the fastest response."
      >
        <ActionButton href={getBusinessWhatsappLink()} icon={MessageCircle} variant="whatsapp" external>
          Open WhatsApp
        </ActionButton>
      </PageHero>

      <div className="page-shell py-10">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <section className="rounded-lg border border-[var(--line)] bg-white p-5 shadow-sm">
          <h2 className="text-lg font-bold">Business details</h2>
          <div className="mt-4 grid gap-3 text-sm">
            <a className="flex items-center gap-3 rounded-md border border-[var(--line)] bg-slate-50 p-3 font-semibold hover:text-[var(--whatsapp-dark)]" href={getBusinessWhatsappLink()} target="_blank" rel="noreferrer">
              <MessageCircle className="size-5 text-[var(--whatsapp)]" aria-hidden="true" />
              WhatsApp: {businessProfile.phone}
            </a>
            <a className="flex items-center gap-3 rounded-md border border-[var(--line)] bg-slate-50 p-3 font-semibold hover:text-[var(--trust-dark)]" href={`tel:${businessProfile.phone}`}>
              <Phone className="size-5 text-[var(--trust)]" aria-hidden="true" />
              Phone: {businessProfile.phone}
            </a>
            <a className="flex items-center gap-3 rounded-md border border-[var(--line)] bg-slate-50 p-3 font-semibold hover:text-[var(--trust-dark)]" href={`mailto:${businessProfile.email}`}>
              <Mail className="size-5 text-[var(--trust)]" aria-hidden="true" />
              Email: {businessProfile.email}
            </a>
            <p className="flex items-center gap-3 rounded-md border border-[var(--line)] bg-slate-50 p-3 font-semibold">
              <Timer className="size-5 text-[var(--trust)]" aria-hidden="true" />
              {businessProfile.workingHours}
            </p>
          </div>
          <p className="mt-4 rounded-md border border-blue-100 bg-blue-50 p-3 text-sm font-semibold text-[var(--trust-dark)]">{businessProfile.serviceArea}</p>
        </section>
        <section>
          <h2 className="mb-4 text-lg font-bold">FAQ</h2>
          <FaqList items={faqs.slice(0, 5)} />
        </section>
        </div>
      </div>
    </div>
  );
}
