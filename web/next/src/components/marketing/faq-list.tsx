import type { FaqItem } from "@wdsc/domain";

export function FaqList({ items }: { items: FaqItem[] }) {
  return (
    <div className="grid gap-3">
      {items.map((item) => (
        <details className="soft-card rounded-lg border border-[var(--line)] bg-white p-5 shadow-sm" key={item.question}>
          <summary className="cursor-pointer text-base font-bold text-[var(--foreground)] marker:text-[var(--trust)]">{item.question}</summary>
          <div className="faq-panel">
            <div>
              <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{item.answer}</p>
            </div>
          </div>
        </details>
      ))}
    </div>
  );
}
