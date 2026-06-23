import type { PricingCategory } from "@wdsc/domain";
import { CheckCircle2 } from "lucide-react";

export function PricingCard({ category }: { category: PricingCategory }) {
  return (
    <article className="color-strip soft-card rounded-lg border border-[var(--line)] bg-white p-5 pt-6 shadow-sm">
      <h3 className="text-lg font-bold">{category.title}</h3>
      <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{category.description}</p>
      <div className="mt-5 divide-y divide-[var(--line)] rounded-md border border-[var(--line)] bg-slate-50">
        {category.items.map((item) => (
          <div className="flex items-center justify-between gap-4 p-3" key={item.label}>
            <span className="flex items-center gap-2 text-sm font-semibold">
              <CheckCircle2 className="size-4 shrink-0 text-[var(--trust)]" aria-hidden="true" />
              {item.label}
            </span>
            <span className="rounded-full bg-blue-50 px-2.5 py-1 text-right text-xs font-bold text-[var(--trust-dark)]">{item.price}</span>
          </div>
        ))}
      </div>
    </article>
  );
}
