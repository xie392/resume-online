"use client";

import { cn } from "@/lib/utils";

interface BaseGridProps {
  children: React.ReactNode;
  className?: string;
}

const CardGrid: React.FC<BaseGridProps> = ({ children, className }) => {
  return (
    <div className={cn("flex w-full", className)}>
      <div className="w-full">
        <div className="w-full grid grid-cols-2 gap-4">{children}</div>
      </div>
    </div>
  );
};

export default CardGrid;
