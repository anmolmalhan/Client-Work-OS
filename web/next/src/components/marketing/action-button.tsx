import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ArrowRight } from "lucide-react";

type ActionButtonProps = {
  href: string;
  children: React.ReactNode;
  icon?: LucideIcon;
  variant?: "primary" | "whatsapp" | "secondary" | "ghost" | "navy";
  external?: boolean;
};

const variants = {
  primary: "bg-[var(--trust)] text-white shadow-[0_12px_26px_rgba(37,99,235,0.22)] hover:bg-[var(--trust-dark)]",
  whatsapp: "bg-[var(--whatsapp)] text-white shadow-[0_12px_26px_rgba(34,197,94,0.22)] hover:bg-[var(--whatsapp-dark)]",
  secondary: "border border-[var(--line)] bg-white text-[var(--foreground)] shadow-sm hover:border-[var(--trust)] hover:bg-blue-50 hover:text-[var(--trust-dark)]",
  ghost: "text-[var(--trust-dark)] hover:bg-blue-50",
  navy: "bg-[var(--navy)] text-white shadow-[0_12px_26px_rgba(15,23,42,0.16)] hover:bg-slate-800",
};

export function ActionButton({ href, children, icon: Icon = ArrowRight, variant = "primary", external }: ActionButtonProps) {
  const className = `focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-4 py-2.5 text-sm font-semibold transition ${variants[variant]}`;

  if (external) {
    return (
      <a className={className} href={href} target="_blank" rel="noreferrer">
        <Icon aria-hidden="true" className="size-4" />
        <span>{children}</span>
      </a>
    );
  }

  return (
    <Link className={className} href={href}>
      <Icon aria-hidden="true" className="size-4" />
      <span>{children}</span>
    </Link>
  );
}
