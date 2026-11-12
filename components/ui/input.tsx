import type { InputHTMLAttributes } from "react";
import { cn } from "@/src/lib/utils/cn";

export function Input({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "h-10 w-full rounded-md border border-border bg-surface px-3 text-sm text-foreground placeholder:text-muted/70 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary",
        className,
      )}
      {...props}
    />
  );
}
