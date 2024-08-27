"use client";

import Tooltip from "@/components/tooltip";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface CardHeaderProps {
  title: string;
}

const CardHeader: React.FC<CardHeaderProps> = ({ title }) => {
  return (
    <div className="w-full flex justify-between items-center">
      <h2 className="text-base font-bold">{title}</h2>
      <div className="flex items-center">
        <Tooltip content="删除">
          <Button size="sm" variant="ghost">
            <Trash2 size={16} color="red" />
          </Button>
        </Tooltip>
      </div>
    </div>
  );
};

export default CardHeader;
