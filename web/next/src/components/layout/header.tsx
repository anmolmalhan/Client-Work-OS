import { businessProfile, getBusinessWhatsappLink } from "@wdsc/domain";
import { ClipboardList, MessageCircle, Search } from "lucide-react";
import Link from "next/link";
import { MobileNav } from "@/components/layout/mobile-nav";
import { ActionButton } from "@/components/marketing/action-button";

const navItems = [
  { href: "/sarkari-result", label: "Sarkari Result" },
  { href: "/services", label: "Services" },
  { href: "/guides", label: "Guides" },
  { href: "/pricing", label: "Pricing" },
  { href: "/submit-request", label: "Submit" },
  { href: "/track-request", label: "Track" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--line)] bg-white/95 backdrop-blur">
      <div className="page-shell flex min-h-16 items-center justify-between gap-4 py-3">
        <Link href="/" className="focus-ring rounded-md">
          <span className="block text-base font-bold text-[var(--foreground)]">{businessProfile.name}</span>
          <span className="block text-xs font-medium text-[var(--muted)]">Remote digital service center</span>
        </Link>
        <nav aria-label="Main navigation" className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <Link
              className="focus-ring rounded-md px-3 py-2 text-sm font-semibold text-[var(--muted)] transition hover:bg-[#edf5f1] hover:text-[var(--foreground)]"
              href={item.href}
              key={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <ActionButton href={getBusinessWhatsappLink()} icon={MessageCircle} variant="whatsapp" external>
              WhatsApp
            </ActionButton>
          </div>
          <Link
            aria-label="Open WhatsApp request"
            className="focus-ring inline-flex size-11 items-center justify-center rounded-md bg-[var(--whatsapp)] text-white sm:hidden"
            href={getBusinessWhatsappLink()}
            target="_blank"
            rel="noreferrer"
          >
            <MessageCircle aria-hidden="true" className="size-5" />
          </Link>
          <MobileNav items={navItems} />
        </div>
      </div>
    </header>
  );
}

export function MobileBottomBar() {
  return (
    <nav aria-label="Quick actions" className="fixed inset-x-0 bottom-0 z-50 border-t border-[var(--line)] bg-white/95 px-3 py-2 shadow-[0_-12px_34px_rgba(15,23,42,0.12)] backdrop-blur md:hidden">
      <div className="mx-auto grid max-w-md grid-cols-3 gap-2">
        <Link
          className="focus-ring inline-flex min-h-12 flex-col items-center justify-center gap-0.5 rounded-md bg-[var(--whatsapp)] px-2 text-xs font-bold text-white"
          href={getBusinessWhatsappLink()}
          target="_blank"
          rel="noreferrer"
        >
          <MessageCircle className="size-4" aria-hidden="true" />
          WhatsApp
        </Link>
        <Link
          className="focus-ring inline-flex min-h-12 flex-col items-center justify-center gap-0.5 rounded-md border border-[var(--line)] bg-white px-2 text-xs font-bold text-[var(--foreground)]"
          href="/submit-request"
        >
          <ClipboardList className="size-4 text-[var(--trust)]" aria-hidden="true" />
          Submit
        </Link>
        <Link
          className="focus-ring inline-flex min-h-12 flex-col items-center justify-center gap-0.5 rounded-md border border-[var(--line)] bg-white px-2 text-xs font-bold text-[var(--foreground)]"
          href="/track-request"
        >
          <Search className="size-4 text-[var(--trust)]" aria-hidden="true" />
          Track
        </Link>
      </div>
    </nav>
  );
}
