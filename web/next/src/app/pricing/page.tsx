import { bundles, getBusinessWhatsappLink, pricing } from "@wdsc/domain";
import { MessageCircle, ShieldCheck } from "lucide-react";
import { ActionButton } from "@/components/marketing/action-button";
import { BundleCard } from "@/components/marketing/bundle-card";
import { PageHero } from "@/components/marketing/page-hero";
import { PricingCard } from "@/components/marketing/pricing-card";
import { SectionHeading } from "@/components/marketing/section-heading";
import { ServiceCta } from "@/components/marketing/service-cta";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing — Clear Rates & Money-Saving Bundles",
  description:
    "Simple, transparent pricing for form filling, PDF and document work. Save with bundles like Form Combo (₹249) and Document Pack (₹99). Price confirmed before any work starts.",
  alternates: { canonical: "/pricing" },
};

export default function PricingPage() {
  return (
    <div>
      <PageHero
        eyebrow="Pricing"
        title="Simple pricing, confirmed after we check your"
        highlight="documents"
        description="Fixed services have direct prices. Forms, submissions, account support, and urgent work are quoted after checking complexity."
      >
        <ActionButton href={getBusinessWhatsappLink()} icon={MessageCircle} variant="whatsapp" external>
          Confirm Price on WhatsApp
        </ActionButton>
      </PageHero>

      <div className="page-shell py-10">
        <SectionHeading eyebrow="Best value" title="Bundles — save more, done together" description="Most people need more than one thing. These packages cost less than buying each task on its own." />
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {bundles.map((bundle) => (
            <BundleCard bundle={bundle} key={bundle.id} />
          ))}
        </div>
        <p className="mt-4 flex items-center gap-2 text-sm font-semibold text-[var(--whatsapp-dark)]">
          <ShieldCheck className="size-5" aria-hidden="true" />
          New here? No advance — pay only after we confirm we can do your task.
        </p>

        <div className="mt-12 grid gap-3 lg:grid-cols-3">
          {pricing.map((category) => (
            <PricingCard category={category} key={category.title} />
          ))}
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.5fr_1fr] lg:items-start">
          <section className="rounded-lg border border-[var(--line)] bg-white p-5 shadow-sm">
            <h2 className="text-lg font-bold">Payment workflow</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {["Client sends request", "Documents are checked", "Final price is confirmed", "Payment is marked pending, partial, or paid"].map((item, index) => (
                <div className="rounded-md border border-[var(--line)] bg-slate-50 p-4" key={item}>
                  <span className="text-sm font-bold text-[var(--trust-dark)]">Step {index + 1}</span>
                  <p className="mt-2 text-sm font-semibold">{item}</p>
                </div>
              ))}
            </div>
            <p className="mt-4 text-sm leading-6 text-[var(--muted)]">
              Urgent work may include extra charges. Payment instructions are shared through WhatsApp after checking documents.
            </p>
          </section>
          <ServiceCta />
        </div>
      </div>
    </div>
  );
}
