import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ArrowRight } from "lucide-react";

type ActionButtonProps = {
  href: string;
  children: React.ReactNode;
  icon?: LucideIcon;
  variant?: "primary" | "secondary" | "ghost";
  external?: boolean;
};

const variants = {
  primary: "bg-[var(--action)] text-white shadow-[0_12px_26px_rgba(16,163,127,0.24)] hover:bg-[var(--action-dark)]",
  secondary: "border border-[var(--line)] bg-white text-[var(--foreground)] shadow-sm hover:border-[var(--action)] hover:bg-[#f1fff9] hover:text-[var(--action-dark)]",
  ghost: "text-[var(--action-dark)] hover:bg-[#dcfff3]",
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
