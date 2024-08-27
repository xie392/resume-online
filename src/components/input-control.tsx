"use client";

import { useCallback } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { InputType } from "@/lib/constants";
import type { BaseInfoArray } from "@/interface/type";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface InputControlProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  direction?: "vertical" | "horizontal";
  className?: string;
  item: BaseInfoArray;
  updateValue: (value: string) => void;
}

const InputControl: React.FC<InputControlProps> = ({
  direction = "vertical",
  className,
  item,
  updateValue,
  ...props
}) => {
  const renderControl = useCallback(() => {
    switch (item.type) {
      case InputType.Select:
        return (
          <Select value={item.value as string} onValueChange={updateValue}>
            <SelectTrigger>
              <SelectValue
                className="placeholder:text-muted-foreground"
                {...props}
              />
            </SelectTrigger>
            <SelectContent>
              {item.options &&
                item.options.map((option, index) => (
                  <SelectItem key={index} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        );
      case InputType.Date:
        return (
          <Input
            className="select-none"
            type="date"
            onMouseDown={(e) => e.preventDefault()}
            value={item.value as string}
            onChange={(e) => updateValue(e.target.value)}
            {...props}
          />
        );
      case InputType.Image:
        return (
          <div>
            <Image
              className="size-16 object-cover"
              src={item.value as string}
              width={60}
              height={60}
              alt=""
            />
          </div>
        );
      case InputType.Editable:
        return (
          <textarea
            className="min-h-[150px] p-3 border border-gray-400 hover:border-gray-800 focus:outline-none"
            placeholder={item.placeholder}
            value={item.value as string}
            onChange={(e) => updateValue(e.target.value)}
          />
        );
      default:
        return (
          <Input
            type="text"
            value={item.value as string}
            onChange={(e) => updateValue(e.target.value)}
            {...props}
          />
        );
    }
  }, [
    item.options,
    item.placeholder,
    item.type,
    item.value,
    props,
    updateValue,
  ]);

  return (
    <div
      className={cn(
        "flex",
        {
          "flex-col gap-y-1.5": direction === "vertical",
          "flex-row gap-x-1.5 items-center": direction === "horizontal",
        },
        className
      )}
    >
      {item.label && item.type !== "image" && (
        <Label className="whitespace-nowrap text-gray-500">{item.label}</Label>
      )}

      {renderControl()}
    </div>
  );
};

export default InputControl;
