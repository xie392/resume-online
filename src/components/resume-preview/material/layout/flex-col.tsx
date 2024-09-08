"use client";

import { useContext } from "react";
import Avatar from "../avatar";
import { ResumeContext } from "@/context/resume-context";
import { cn } from "@/lib/utils";
import { Align } from "@/lib/constants";
import { useConfigStore } from "@/stores/config";

interface FlexCol2Props {
  children: React.ReactNode;
}

const FlexCol: React.FC<FlexCol2Props> = ({ children }) => {
  const { baseInfo } = useContext(ResumeContext);
  const align = useConfigStore((state) => state.align);

  return (
    <div className="flex items-center">
      <div
        className={cn("flex-1 flex flex-col items-center", {
          "justify-start": align === Align.Left,
          "justify-center": align === Align.Center,
          "justify-end": align === Align.Right,
        })}
      >
        {children}
      </div>
      <div className="w-40">
        <Avatar src={baseInfo.avatar || ""} alt="avatar" />
      </div>
    </div>
  );
};

export default FlexCol;
