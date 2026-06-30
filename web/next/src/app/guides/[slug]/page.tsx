import { businessProfile, getGuideBySlug, guides } from "@wdsc/domain";
import { Clock3 } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/marketing/page-hero";
import { ServiceCta } from "@/components/marketing/service-cta";

export function generateStaticParams() {
  return guides.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) return {};
  return {
    title: guide.title,
    description: guide.description,
    alternates: { canonical: `/guides/${guide.slug}` },
    openGraph: { title: guide.title, description: guide.description, type: "article" },
  };
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) notFound();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.description,
    datePublished: guide.updatedAt,
    dateModified: guide.updatedAt,
    author: { "@type": "Organization", name: businessProfile.name },
    publisher: { "@type": "Organization", name: businessProfile.name },
  };
  const faqSchema = guide.faq?.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: guide.faq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      }
    : null;

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      {faqSchema ? <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} /> : null}

      <PageHero eyebrow={guide.category} title={guide.title} description={guide.intro} />

      <div className="page-shell py-10">
        <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr] lg:items-start">
          <article className="max-w-2xl">
            <p className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--muted)]">
              <Clock3 className="size-3.5" aria-hidden="true" />
              {guide.readMinutes} min read · Updated {guide.updatedAt}
            </p>

            <div className="mt-6 space-y-8">
              {guide.sections.map((section) => (
                <section key={section.heading}>
                  <h2 className="text-lg font-bold text-[var(--navy)]">{section.heading}</h2>
                  <div className="mt-2 space-y-2 text-sm leading-7 text-[var(--foreground)]">
                    {section.body.map((line) => (
                      <p key={line}>{line}</p>
                    ))}
                  </div>
                </section>
              ))}
            </div>

            {guide.faq?.length ? (
              <section className="mt-10">
                <h2 className="text-lg font-bold text-[var(--navy)]">Frequently asked</h2>
                <div className="mt-3 space-y-3">
                  {guide.faq.map((item) => (
                    <div className="rounded-xl border border-[var(--line)] bg-white p-4 shadow-sm" key={item.question}>
                      <p className="text-sm font-bold">{item.question}</p>
                      <p className="mt-1 text-sm leading-6 text-[var(--muted)]">{item.answer}</p>
                    </div>
                  ))}
                </div>
              </section>
            ) : null}

            <div className="mt-10 flex flex-wrap gap-3 border-t border-[var(--line)] pt-6 text-sm font-bold">
              <Link className="text-[var(--trust-dark)] hover:underline" href="/guides">← All guides</Link>
              <Link className="text-[var(--trust-dark)] hover:underline" href="/sarkari-result">Latest Sarkari forms →</Link>
            </div>
          </article>

          <aside className="lg:sticky lg:top-24">
            <ServiceCta task={guide.title} />
          </aside>
        </div>
      </div>
    </div>
  );
}
