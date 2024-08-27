"use client";

import { Focus, Minus, Plus } from "lucide-react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

import { Button } from "@/components/ui/button";

const FooterToolbar = () => {
  return (
    <div className="bg-frosted fixed z-50 bottom-0 w-full px-4 h-10 border-t border-gray-200 flex items-center justify-between">
      <div className="text-xs text-gray-500">字数：10000</div>
      <div className="flex space-x-2 items-center">
        <Button
          variant="ghost"
          size="sm"
          data-tooltip-id="tooltip"
          data-tooltip-html="<span class='text-xs'>恢复比例</span>"
        >
          <Focus size={16} />
        </Button>

        <Button
          variant="ghost"
          size="sm"
          data-tooltip-id="tooltip"
          data-tooltip-html="<span class='text-xs'>缩小</span>"
        >
          <Minus size={16} />
        </Button>

        <div className="w-[150px] flex items-center h-full pt-0.5">
          <Slider
            defaultValue={100}
            max={200}
            styles={{
              rail: {
                backgroundColor: "rgba(0,0,0,0.3)",
                height: 2,
              },
              track: {
                backgroundColor: "#333",
                height: 2,
              },
            }}
          />
        </div>

        <Button
          variant="ghost"
          size="sm"
          data-tooltip-id="tooltip"
          data-tooltip-html="<span class='text-xs'>放大</span>"
        >
          <Plus size={16} />
        </Button>
      </div>
    </div>
  );
};

export default FooterToolbar;
