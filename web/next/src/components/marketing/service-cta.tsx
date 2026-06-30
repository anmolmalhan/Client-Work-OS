import { businessProfile, buildWhatsappLink } from "@wdsc/domain";
import { CheckCircle2, MessageCircle } from "lucide-react";

// The repeatable conversion box: drop it on any page/post to funnel visitors
// into the paid "we'll fill it for you" service.
export function ServiceCta({ task, price = "₹149" }: { task?: string; price?: string }) {
  const message = [
    `Hello ${businessProfile.name},`,
    task ? `I need help with: ${task}` : "I want help filling a form.",
    "Please confirm the price and next steps.",
  ].join("\n");
  const link = buildWhatsappLink(businessProfile.whatsappNumber, message);

  return (
    <aside className="rounded-2xl border-2 border-[var(--whatsapp)]/40 bg-emerald-50 p-5 shadow-sm sm:p-6">
      <h3 className="text-lg font-black text-[var(--navy)]">😰 Don&apos;t want to risk a mistake?</h3>
      <p className="mt-1 text-sm font-bold text-[var(--foreground)]">We&apos;ll fill it for you, correctly.</p>
      <ul className="mt-4 grid gap-2 text-sm font-semibold text-[var(--foreground)]">
        {[`Price confirmed first (${price})`, "Done same day", "Proof sent on WhatsApp"].map((line) => (
          <li className="flex items-center gap-2" key={line}>
            <CheckCircle2 className="size-5 shrink-0 text-[var(--whatsapp-dark)]" aria-hidden="true" />
            {line}
          </li>
        ))}
      </ul>
      <a
        href={link}
        target="_blank"
        rel="noreferrer"
        className="focus-ring mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[var(--whatsapp)] px-5 text-sm font-bold text-white shadow-[0_12px_26px_rgba(34,197,94,0.28)] transition hover:-translate-y-0.5 hover:bg-[var(--whatsapp-dark)]"
      >
        <MessageCircle className="size-4" aria-hidden="true" />
        Chat on WhatsApp →
      </a>
    </aside>
  );
}
