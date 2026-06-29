"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export function MobileNav({ items }: { items: { href: string; label: string }[] }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        className="focus-ring inline-flex size-11 items-center justify-center rounded-md border border-[var(--line)] bg-white text-[var(--foreground)]"
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
      </button>

      {open ? (
        <>
          <button type="button" aria-label="Close menu" className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <nav aria-label="Mobile navigation" className="fixed inset-x-0 top-16 z-50 border-b border-[var(--line)] bg-white shadow-[0_20px_40px_rgba(15,23,42,0.18)]">
            <div className="page-shell grid gap-1 py-3">
              {items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="focus-ring rounded-md px-3 py-3 text-base font-bold text-[var(--foreground)] transition hover:bg-[#edf5f1] hover:text-[var(--trust-dark)]"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>
        </>
      ) : null}
    </div>
  );
}
