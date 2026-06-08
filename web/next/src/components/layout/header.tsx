import { businessProfile, getBusinessWhatsappLink } from "@wdsc/domain";
import { MessageCircle } from "lucide-react";
import Link from "next/link";
import { ActionButton } from "@/components/marketing/action-button";

const navItems = [
  { href: "/services", label: "Services" },
  { href: "/pricing", label: "Pricing" },
  { href: "/submit-request", label: "Submit" },
  { href: "/track-request", label: "Track" },
  { href: "/contact", label: "Contact" },
  { href: "/admin", label: "Admin" },
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
        <div className="hidden sm:block">
          <ActionButton href={getBusinessWhatsappLink()} icon={MessageCircle} external>
            WhatsApp
          </ActionButton>
        </div>
        <Link
          aria-label="Open WhatsApp request"
          className="focus-ring inline-flex size-11 items-center justify-center rounded-md bg-[var(--action)] text-white sm:hidden"
          href={getBusinessWhatsappLink()}
          target="_blank"
          rel="noreferrer"
        >
          <MessageCircle aria-hidden="true" className="size-5" />
        </Link>
      </div>
      <nav aria-label="Mobile navigation" className="border-t border-[var(--line)] bg-white lg:hidden">
        <div className="page-shell flex gap-1 overflow-x-auto py-2">
          {navItems.map((item) => (
            <Link
              className="focus-ring whitespace-nowrap rounded-md px-3 py-2 text-sm font-semibold text-[var(--muted)]"
              href={item.href}
              key={item.href}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
