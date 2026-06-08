import type { PricingCategory } from "@wdsc/domain";
import { CheckCircle2 } from "lucide-react";

export function PricingCard({ category }: { category: PricingCategory }) {
  return (
    <article className="color-strip rounded-lg border border-[var(--line)] bg-white p-5 pt-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-[0_18px_38px_rgba(255,191,63,0.18)]">
      <h3 className="text-lg font-bold">{category.title}</h3>
      <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{category.description}</p>
      <div className="mt-5 divide-y divide-[#eadfcd] rounded-md border border-[#eadfcd] bg-[#fffdf7]">
        {category.items.map((item) => (
          <div className="flex items-center justify-between gap-4 p-3" key={item.label}>
            <span className="flex items-center gap-2 text-sm font-semibold">
              <CheckCircle2 className="size-4 shrink-0 text-[var(--action)]" aria-hidden="true" />
              {item.label}
            </span>
            <span className="rounded-full bg-[#dcfff3] px-2.5 py-1 text-right text-xs font-bold text-[var(--action-dark)]">{item.price}</span>
          </div>
        ))}
      </div>
    </article>
  );
}
