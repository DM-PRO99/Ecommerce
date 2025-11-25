"use client";

import { Button as HeroUIButton } from "@heroui/react";
import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

export type ButtonProps = Omit<ComponentProps<typeof HeroUIButton>, 'variant'> & {
  variant?: "primary" | "secondary" | "ghost";
};

export function Button({ className, variant = "primary", ...props }: ButtonProps) {
  const variantClasses = {
    primary:
      "bg-indigo-600 text-white shadow-sm hover:shadow-xl hover:bg-indigo-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 disabled:opacity-60",
    secondary:
      "bg-zinc-900 text-white hover:bg-zinc-800 shadow-sm hover:shadow-xl disabled:opacity-60",
    ghost:
      "bg-white text-zinc-900 border border-zinc-200 hover:bg-zinc-50 hover:shadow-md disabled:opacity-60",
  } as const;

  return (
    <HeroUIButton
      radius="lg"
      className={cn(
        "h-11 px-5 text-sm font-medium tracking-tight transition-all",
        variantClasses[variant],
        className,
      )}
      {...props}
    />
  );
}
