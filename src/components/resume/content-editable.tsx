"use client";

import { cn } from "@/lib/utils";
import { PencilLine } from "lucide-react";
import { useState } from "react";

interface ContentEditableProps {
  text: string;
}

const ContentEditable: React.FC<ContentEditableProps> = ({ text }) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="flex items-center space-x-1">
      <div
        className={cn("")}
        contentEditable={isEditing}
        suppressContentEditableWarning
      >
        {text}
      </div>
      <PencilLine
        className={cn("text-gray-400 hover:text-gray-600 cursor-pointer", {
          hidden: isEditing,
        })}
        size={16}
        onClick={() => setIsEditing(true)}
      />
    </div>
  );
};

export default ContentEditable;
