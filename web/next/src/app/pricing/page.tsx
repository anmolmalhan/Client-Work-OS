import { getBusinessWhatsappLink, pricing } from "@wdsc/domain";
import { MessageCircle } from "lucide-react";
import { ActionButton } from "@/components/marketing/action-button";
import { PricingCard } from "@/components/marketing/pricing-card";
import { SectionHeading } from "@/components/marketing/section-heading";

export default function PricingPage() {
  return (
    <div className="page-shell py-10">
      <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
        <SectionHeading
          eyebrow="Pricing"
          title="Simple pricing with final confirmation after checking documents"
          description="Fixed services have direct prices. Forms, submissions, account support, and urgent work are quoted after checking complexity."
        />
        <ActionButton href={getBusinessWhatsappLink()} icon={MessageCircle} external>
          Confirm Price on WhatsApp
        </ActionButton>
      </div>
      <div className="mt-8 grid gap-4 lg:grid-cols-3">
        {pricing.map((category) => (
          <PricingCard category={category} key={category.title} />
        ))}
      </div>
      <section className="mt-8 rounded-lg border border-[var(--line)] bg-white p-5 shadow-sm">
        <h2 className="text-lg font-bold">Payment workflow</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-4">
          {["Client sends request", "Documents are checked", "Final price is confirmed", "Payment is marked pending, partial, or paid"].map((item, index) => (
            <div className="rounded-md bg-[#f5f8f6] p-4" key={item}>
              <span className="text-sm font-bold text-[var(--action-dark)]">Step {index + 1}</span>
              <p className="mt-2 text-sm font-semibold">{item}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm leading-6 text-[var(--muted)]">
          Urgent work may include extra charges. Payment instructions are shared through WhatsApp after checking documents.
        </p>
      </section>
    </div>
  );
}
