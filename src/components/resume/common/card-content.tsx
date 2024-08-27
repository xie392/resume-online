"use client";

import { Accordion } from "@/components/ui/accordion";

interface CardContentProps {
  children: React.ReactNode;
}

const CardContent: React.FC<CardContentProps> = ({ children }) => {
  return (
    <Accordion type="multiple" className="w-full pr-3.5">
      {children}
    </Accordion>
  );
};

export default CardContent;
