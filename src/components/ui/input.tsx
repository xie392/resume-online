import { forwardRef } from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: "default" | "error";
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant = "default", ...props }, ref) => {
    return (
      <input
        className={cn(
          "rs-flex rs-w-full rs-rounded-sm rs-border rs-outline-none rs-bg-background/60 rs-text-sm rs-p-2 rs-backdrop-opacity-50 placeholder:rs-text-muted-foreground disabled:rs-cursor-not-allowed disabled:rs-opacity-50",
          {
            "rs-border-gray-400 hover:rs-border-gray-800 focus:rs-border-primary":
              variant === "default",
            "rs-border-red-400  hover:rs-border-red-800 focus:rs-border-primary":
              variant === "error",
          }
        )}
        autoComplete="off"
        aria-autocomplete="none"
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export { Input };
