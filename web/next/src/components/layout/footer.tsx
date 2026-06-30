import { businessProfile, excludedServices, getBusinessWhatsappLink } from "@wdsc/domain";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-[var(--line)] bg-white">
      <div className="page-shell grid gap-8 py-10 lg:grid-cols-[1.4fr_1fr_1fr]">
        <section>
          <h2 className="text-lg font-bold">{businessProfile.name}</h2>
          <p className="mt-2 max-w-xl text-sm leading-6 text-[var(--muted)]">
            WhatsApp-first digital work support for forms, file conversion, online submissions, and document handling.
          </p>
          <p className="mt-3 text-xs font-semibold text-[var(--muted)]">Excluded: {excludedServices.join(", ")}.</p>
        </section>
        <section className="space-y-3 text-sm text-[var(--muted)]">
          <h3 className="font-bold text-[var(--foreground)]">Contact</h3>
          <a className="flex items-center gap-2 font-semibold text-[var(--whatsapp-dark)] hover:text-[var(--whatsapp)]" href={getBusinessWhatsappLink()} target="_blank" rel="noreferrer">
            <MessageCircle className="size-4" aria-hidden="true" />
            WhatsApp support
          </a>
          <a className="flex items-center gap-2 hover:text-[var(--trust-dark)]" href={`tel:${businessProfile.phone}`}>
            <Phone className="size-4" aria-hidden="true" />
            {businessProfile.phone}
          </a>
          <a className="flex items-center gap-2 hover:text-[var(--trust-dark)]" href={`mailto:${businessProfile.email}`}>
            <Mail className="size-4" aria-hidden="true" />
            {businessProfile.email}
          </a>
        </section>
        <section className="space-y-3 text-sm text-[var(--muted)]">
          <h3 className="font-bold text-[var(--foreground)]">Company</h3>
          <p className="flex items-center gap-2">
            <MapPin className="size-4" aria-hidden="true" />
            {businessProfile.serviceArea}
          </p>
          <p>{businessProfile.workingHours}</p>
          <div className="grid gap-2 pt-1 font-semibold text-[var(--trust-dark)]">
            <Link className="hover:underline" href="/about">About us</Link>
            <Link className="hover:underline" href="/sarkari-result">Sarkari Result</Link>
            <Link className="hover:underline" href="/guides">Guides</Link>
            <Link className="hover:underline" href="/faq">FAQ</Link>
          </div>
        </section>
      </div>
      <div className="border-t border-[var(--line)]">
        <div className="page-shell flex flex-col items-center justify-between gap-3 py-5 text-xs text-[var(--muted)] sm:flex-row">
          <p>© {new Date().getFullYear()} {businessProfile.name}. A registered digital service business operating across India.</p>
          <nav aria-label="Legal" className="flex flex-wrap items-center gap-x-4 gap-y-2 font-semibold">
            <Link className="hover:text-[var(--trust-dark)]" href="/privacy">Privacy</Link>
            <Link className="hover:text-[var(--trust-dark)]" href="/refund">Refunds</Link>
            <Link className="hover:text-[var(--trust-dark)]" href="/terms">Terms</Link>
            <Link className="hover:text-[var(--trust-dark)]" href="/contact">Contact</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
