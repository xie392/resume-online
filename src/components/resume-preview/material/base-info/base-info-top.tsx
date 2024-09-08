"use client";

import { ResumeContext } from "@/context/resume-context";
import { Align } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useContext } from "react";
import Avatar from "../avatar";
import { useConfigStore } from "@/stores/config";

interface BaseInfoTopProps {}

const BaseInfoTop: React.FC<BaseInfoTopProps> = () => {
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
      <div className="w-40">
        <Avatar src={baseInfo.avatar || ""} alt="avatar" />
      </div>
    </div>
  );
};

export default BaseInfoTop;
