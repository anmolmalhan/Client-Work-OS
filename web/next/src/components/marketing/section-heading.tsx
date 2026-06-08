type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <div className="max-w-3xl">
      {eyebrow ? <p className="inline-flex rounded-full bg-[#dcfff3] px-3 py-1 text-sm font-bold uppercase text-[var(--action-dark)]">{eyebrow}</p> : null}
      <h2 className="mt-2 text-2xl font-bold leading-tight text-[var(--foreground)] sm:text-3xl">{title}</h2>
      {description ? <p className="mt-3 text-base leading-7 text-[var(--muted)]">{description}</p> : null}
    </div>
  );
}
