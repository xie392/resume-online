"use client";

import Quill, { type QuillOptions } from "quill";

import "quill/dist/quill.snow.css";
import "@/styles/quill-editor.css";

import { useEffect, useMemo, useRef, useState } from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Bold, Italic, Underline } from "lucide-react";

interface QuillEditorProps extends QuillOptions {
  defaultContent?: string;
  onTextChange?: (text: string) => void;
}

export enum ToolbarType {
  Select = "select",
  Button = "button",
}

const listFormat = (quill: Quill, value: "ordered" | "bullet") => {
  const format = quill.getFormat();
  if (format.list === value) {
    quill.format("list", false);
    return;
  }
  quill.format("list", value);
};

const QuillEditor: React.FC<QuillEditorProps> = ({
  defaultContent,
  onTextChange,
  ...props
}) => {
  const quillRef = useRef<HTMLDivElement | null>(null);
  const [quill, setQuill] = useState<Quill | null>(null);

  const toolbarOptions = useMemo(() => {
    if (!quill) return [];
    return [
      {
        title: "加粗",
        name: "bold",
        action: () => quill.format("bold", true),
        type: "button",
        icon: <Bold className="size-3.5" />,
      },
      {
        title: "斜体",
        name: "italic",
        action: () => quill.format("italic", true),
        type: "button",
        icon: <Bold className="size-3.5" />,
      },
      {
        title: "下划线",
        name: "underline",
        action: () => quill.format("underline", true),
        type: "button",
        icon: <Bold className="size-3.5" />,
      },
      {
        title: "无序列表",
        name: "ordered-list",
        action: () => listFormat(quill, "ordered"),
        type: "button",
        icon: <Bold className="size-3.5" />,
      },
      {
        title: "有序列表",
        name: "bullet-list",
        action: () => listFormat(quill, "bullet"),
        type: "button",
        icon: <Bold className="size-3.5" />,
      },
    ];
  }, [quill]);

  useEffect(() => {
    if (!quillRef.current) return;
    if (quill) return;

    const engine = new Quill(quillRef.current, {
      theme: "snow",
      ...props,
    });

    if (defaultContent) {
      engine.setText(defaultContent);
    }

    engine.on("text-change", () => {
      const text = engine
        .getContents()
        .ops.map((op) => op.insert)
        .join("");
      onTextChange && onTextChange(text);
    });

    !quill && setQuill(engine);
  }, [defaultContent, onTextChange, props, quill]);

  return (
    <div className="w-full border rounded border-gray-400 hover:border-gray-800">
      {/* <div className="w-full border-b border-gray-400 py-1 px-3">
        <ToggleGroup
          className="flex items-center justify-start"
          type="multiple"
        >
          {toolbarOptions.map((option) => (
            <ToggleGroupItem
              value={option.name}
              aria-label={option.title}
              size="sm"
              key={option.title}
              onClick={option.action}
            >
              {option.icon}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div> */}
      <div className="min-h-[150px]  p-3" ref={quillRef} />
    </div>
  );
};

export default QuillEditor;
