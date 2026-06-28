import { Slot } from "@radix-ui/react-slot";
import { type VariantProps, cva } from "class-variance-authority";
import * as React from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-semibold transition-all disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:-translate-y-0.5",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-[0_12px_26px_rgba(37,99,235,0.22)] hover:bg-[var(--trust-dark)]",
        whatsapp: "bg-[var(--whatsapp)] text-white shadow-[0_12px_26px_rgba(34,197,94,0.22)] hover:bg-[var(--whatsapp-dark)]",
        navy: "bg-[var(--navy)] text-white shadow-[0_12px_26px_rgba(15,23,42,0.16)] hover:bg-slate-800",
        secondary: "border border-border bg-card text-foreground shadow-sm hover:border-primary hover:bg-secondary hover:text-secondary-foreground",
        outline: "border border-border bg-card text-foreground hover:bg-secondary hover:text-secondary-foreground",
        ghost: "text-secondary-foreground hover:bg-secondary",
        destructive: "bg-destructive text-destructive-foreground hover:opacity-90",
      },
      size: {
        default: "min-h-11 px-4 py-2.5",
        sm: "min-h-9 px-3",
        lg: "min-h-12 px-6",
        icon: "size-11",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> & VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button";
  return <Comp data-slot="button" className={cn(buttonVariants({ variant, size, className }))} {...props} />;
}

export { Button, buttonVariants };
