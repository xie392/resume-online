"use client";

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
          "flex w-full rounded-sm border outline-none bg-background/60 text-sm p-2 backdrop-opacity-50 placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
          {
            "border-gray-400 hover:border-gray-800 focus:border-primary":
              variant === "default",
            "border-red-400  hover:border-red-800 focus:border-primary":
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
