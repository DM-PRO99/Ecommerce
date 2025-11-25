"use client";

import { Input as HeroUIInput, type InputProps as HeroUIInputProps } from "@heroui/react";
import { cn } from "@/lib/utils";

export type InputProps = HeroUIInputProps;

export function Input({ className, ...props }: InputProps) {
  return (
    <HeroUIInput
      radius="lg"
      classNames={{
        inputWrapper:
          "h-11 bg-white/80 border border-zinc-200 hover:border-zinc-300 data-[focus=true]:border-indigo-500 data-[focus=true]:ring-2 data-[focus=true]:ring-indigo-500/40 ring-offset-2",
        input: "text-sm text-zinc-900 placeholder:text-zinc-400",
      }}
      className={cn(className)}
      {...props}
    />
  );
}
