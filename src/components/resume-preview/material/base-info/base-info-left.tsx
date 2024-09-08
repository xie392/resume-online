"use client";

import { ResumeContext } from "@/context/resume-context";
import { Align } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useConfigStore } from "@/stores/config";
import { useContext } from "react";

interface BaseInfoTopProps {}

const BaseInfoLeft: React.FC<BaseInfoTopProps> = () => {
  const { baseInfo } = useContext(ResumeContext);
  const align = useConfigStore((state) => state.align);

  return (
    <div className="flex">
      <div
        className={cn("flex-1 flex", {
          "justify-start": align === Align.Left,
          "justify-center": align === Align.Center,
          "justify-end": align === Align.Right,
        })}
      >
        info
      </div>
      <div className="">头像</div>
    </div>
  );
};

export default BaseInfoLeft;
