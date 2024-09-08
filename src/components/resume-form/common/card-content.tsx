"use client";

import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Tooltip } from "@/components/ui/tooltip";
import { Plus, Trash2 } from "lucide-react";

interface CardContentProps {
  children: React.ReactNode;
  title: string;
  showDelete?: boolean;
  showAdd?: boolean;
  handlerDelete?: () => void;
  handlerAdd?: () => void;
  defaultValue?: string[];
}

const CardContent: React.FC<CardContentProps> = ({
  children,
  title,
  showDelete = true,
  showAdd = false,
  handlerDelete,
  handlerAdd,
  defaultValue = [],
}) => {
  return (
    <div className="w-full">
      <div className="w-full flex justify-between items-center pb-3 mb-3 border-b border-gray-200">
        <h2 className="text-xl font-bold">{title}</h2>
        <div className="flex items-center">
          {showDelete && (
            <Tooltip content="删除">
              <Button size="sm" variant="ghost" asChild onClick={handlerDelete}>
                <div>
                  <Trash2 size={16} color="red" />
                </div>
              </Button>
            </Tooltip>
          )}
          {showAdd && (
            <Tooltip content="添加">
              <Button size="sm" variant="ghost" asChild onClick={handlerAdd}>
                <div>
                  <Plus size={16} />
                </div>
              </Button>
            </Tooltip>
          )}
        </div>
      </div>
      <Accordion
        className="w-full pr-3.5"
        type="multiple"
        defaultValue={defaultValue}
      >
        {children}
      </Accordion>
    </div>
  );
};

export default CardContent;
