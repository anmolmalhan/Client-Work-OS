import { guides } from "@wdsc/domain";
import { ArrowRight, BookOpen, Clock3 } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/marketing/page-hero";
import { ServiceCta } from "@/components/marketing/service-cta";

export const metadata: Metadata = {
  title: "Guides — How to fill forms & handle documents",
  description: "Simple step-by-step guides for filling government forms, resizing photos and signatures, and getting your documents ready.",
  alternates: { canonical: "/guides" },
};

export default function GuidesPage() {
  return (
    <div>
      <PageHero
        eyebrow="Guides"
        title="Step-by-step help for forms &"
        highlight="documents"
        description="Free, simple guides for filling government forms and getting your documents right. Stuck? We'll do it for you on WhatsApp."
      />

      <div className="page-shell py-10">
        <div className="grid gap-4 md:grid-cols-2">
          {guides.map((guide) => (
            <Link
              key={guide.slug}
              href={`/guides/${guide.slug}`}
              className="glow-card focus-ring group flex h-full flex-col rounded-2xl border border-[var(--line)] bg-white p-5 shadow-sm transition hover:-translate-y-0.5"
            >
              <span className="inline-flex w-fit items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-[var(--trust-dark)]">
                <BookOpen className="size-3.5" aria-hidden="true" />
                {guide.category}
              </span>
              <h2 className="mt-3 text-lg font-bold text-[var(--navy)]">{guide.title}</h2>
              <p className="mt-2 flex-1 text-sm leading-6 text-[var(--muted)]">{guide.description}</p>
              <span className="mt-4 flex items-center justify-between text-sm font-bold text-[var(--trust-dark)]">
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--muted)]">
                  <Clock3 className="size-3.5" aria-hidden="true" />
                  {guide.readMinutes} min read
                </span>
                <span className="inline-flex items-center gap-1 group-hover:gap-2">
                  Read guide
                  <ArrowRight className="size-4 transition-all" aria-hidden="true" />
                </span>
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-10 max-w-xl">
          <ServiceCta />
        </div>
      </div>
    </div>
  );
}
