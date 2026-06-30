import { PageHero } from "@/components/marketing/page-hero";

export function LegalPage({
  eyebrow,
  title,
  highlight,
  description,
  updated,
  children,
}: {
  eyebrow: string;
  title: string;
  highlight?: string;
  description?: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <PageHero eyebrow={eyebrow} title={title} highlight={highlight} description={description} />
      <div className="page-shell py-10">
        <article className="mx-auto max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-wide text-[var(--muted)]">Last updated: {updated}</p>
          <div className="mt-6 space-y-8">{children}</div>
        </article>
      </div>
    </div>
  );
}

export function LegalSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-lg font-bold text-[var(--navy)]">{title}</h2>
      <div className="mt-2 space-y-3 text-sm leading-7 text-[var(--foreground)]">{children}</div>
    </section>
  );
}
