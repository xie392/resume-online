"use client";

import Tooltip from "@/components/tooltip";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface CardHeaderProps {
  title: string;
  showDelete?: boolean;
}

const CardHeader: React.FC<CardHeaderProps> = ({
  title,
  showDelete = true,
}) => {
  return (
    <div className="w-full flex justify-between items-center pb-3 mb-3 border-b border-gray-200">
      <h2 className="text-xl font-bold">{title}</h2>
      <div className="flex items-center">
        {showDelete && (
          <Tooltip content="删除">
            <Button size="sm" variant="ghost" asChild>
              <div>
                <Trash2 size={16} color="red" />
              </div>
            </Button>
          </Tooltip>
        )}
      </div>
    </div>
  );
};

export default CardHeader;
