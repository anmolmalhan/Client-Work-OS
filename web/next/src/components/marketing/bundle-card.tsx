import { businessProfile, buildWhatsappLink, formatMoney, type ServiceBundle } from "@wdsc/domain";
import { Check, MessageCircle } from "lucide-react";

export function BundleCard({ bundle }: { bundle: ServiceBundle }) {
  const message = [
    `Hello ${businessProfile.name},`,
    `I want the "${bundle.name}" bundle (${formatMoney(bundle.price)}).`,
    "Please confirm and share the next steps.",
  ].join("\n");
  const link = buildWhatsappLink(businessProfile.whatsappNumber, message);

  return (
    <article
      className={`glow-card relative flex h-full flex-col rounded-2xl border bg-white p-5 pt-6 shadow-sm ${
        bundle.featured ? "border-[var(--trust)] ring-2 ring-blue-100" : "border-[var(--line)]"
      }`}
    >
      {bundle.featured ? (
        <span className="absolute -top-3 left-5 rounded-full bg-[var(--trust)] px-3 py-1 text-xs font-bold text-white shadow-sm">Most popular</span>
      ) : null}
      <p className="text-xs font-bold uppercase text-[var(--trust-dark)]">{bundle.tagline}</p>
      <h3 className="mt-1 text-lg font-bold">{bundle.name}</h3>
      <div className="mt-3 flex items-end gap-2">
        <span className="text-3xl font-black text-[var(--navy)]">{formatMoney(bundle.price)}</span>
        {bundle.originalPrice ? (
          <span className="pb-1 text-sm font-semibold text-[var(--muted)] line-through">{formatMoney(bundle.originalPrice)}</span>
        ) : null}
      </div>
      <ul className="mt-4 flex-1 space-y-2 text-sm">
        {bundle.includes.map((item) => (
          <li className="flex items-start gap-2" key={item}>
            <Check className="mt-0.5 size-4 shrink-0 text-[var(--whatsapp-dark)]" aria-hidden="true" />
            {item}
          </li>
        ))}
      </ul>
      <a
        href={link}
        target="_blank"
        rel="noreferrer"
        className="focus-ring mt-5 inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-[var(--whatsapp)] px-4 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[var(--whatsapp-dark)]"
      >
        <MessageCircle className="size-4" aria-hidden="true" />
        Get this bundle
      </a>
    </article>
  );
}
