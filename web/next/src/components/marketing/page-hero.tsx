import { Sparkles } from "lucide-react";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  highlight?: string;
  description?: string;
  children?: React.ReactNode;
};

// Full-bleed gradient hero used across the marketing pages for a consistent
// bold & modern look. Pass a CTA via children.
export function PageHero({ eyebrow, title, highlight, description, children }: PageHeroProps) {
  return (
    <section className="gradient-hero relative overflow-hidden">
      <Sparkles className="pointer-events-none absolute right-8 top-8 size-28 text-white/10" aria-hidden="true" />
      <div className="section-fade page-shell relative flex flex-col justify-between gap-6 py-12 sm:py-14 lg:flex-row lg:items-end">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm font-bold text-white backdrop-blur">
            <Sparkles className="size-4 text-[var(--amber)]" aria-hidden="true" />
            {eyebrow}
          </p>
          <h1 className="mt-4 max-w-3xl text-3xl font-black leading-[1.12] tracking-tight text-white sm:text-4xl">
            {title}
            {highlight ? (
              <>
                {" "}
                <span className="bg-gradient-to-r from-amber-300 to-amber-100 bg-clip-text text-transparent">{highlight}</span>
              </>
            ) : null}
          </h1>
          {description ? <p className="mt-4 max-w-2xl text-base leading-7 text-blue-100/90">{description}</p> : null}
        </div>
        {children ? <div className="shrink-0">{children}</div> : null}
      </div>
    </section>
  );
}
