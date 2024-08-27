"use client";

import {
  Tooltip as TooltipHelper,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface TooltipProps {
  children: React.ReactNode;
  content?: React.ReactNode | string;
}

const Tooltip: React.FC<TooltipProps> = ({ children, content }) => (
  <TooltipProvider>
    <TooltipHelper>
      <TooltipTrigger>{children}</TooltipTrigger>
      <TooltipContent>{content}</TooltipContent>
    </TooltipHelper>
  </TooltipProvider>
);

export default Tooltip;
