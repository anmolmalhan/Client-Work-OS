import type { LucideIcon } from "lucide-react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type ActionButtonProps = {
  href: string;
  children: React.ReactNode;
  icon?: LucideIcon;
  variant?: "primary" | "whatsapp" | "secondary" | "ghost" | "navy";
  external?: boolean;
};

// Maps the marketing variant names onto the shadcn Button variants.
const variantMap = {
  primary: "default",
  whatsapp: "whatsapp",
  secondary: "secondary",
  ghost: "ghost",
  navy: "navy",
} as const;

export function ActionButton({ href, children, icon: Icon = ArrowRight, variant = "primary", external }: ActionButtonProps) {
  const content = (
    <>
      <Icon aria-hidden="true" className="size-4" />
      <span>{children}</span>
    </>
  );

  return (
    <Button asChild variant={variantMap[variant]}>
      {external ? (
        <a href={href} target="_blank" rel="noreferrer">
          {content}
        </a>
      ) : (
        <Link href={href}>{content}</Link>
      )}
    </Button>
  );
}
