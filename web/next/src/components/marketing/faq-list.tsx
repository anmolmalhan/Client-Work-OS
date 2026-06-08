import type { FaqItem } from "@wdsc/domain";

export function FaqList({ items }: { items: FaqItem[] }) {
  return (
    <div className="grid gap-3">
      {items.map((item) => (
        <details className="rounded-lg border border-[var(--line)] bg-white p-5 shadow-sm" key={item.question}>
          <summary className="cursor-pointer text-base font-bold text-[var(--foreground)]">{item.question}</summary>
          <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
