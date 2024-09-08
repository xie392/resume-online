"use client";

import { useElementSize, useWindowSize } from "@reactuses/core";
import { useEffect, useRef, useState } from "react";
import Panzoom, { PanzoomObject } from "@panzoom/panzoom";
import { useDesignerStore } from "@/stores/designer";

// A4 纸张尺寸比
const A4_RATIO = 210 / 297;

interface ResumePreviewProps {
  children?: React.ReactNode;
}

const ResumePreview: React.FC<ResumePreviewProps> = ({ children }) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const ref = useRef<HTMLDivElement>(null);
  const [width, height] = useElementSize(ref);

  useEffect(() => {
    // 计算基于屏幕尺寸的宽度和高度
    let newWidth = width * 0.9;
    let newHeight = newWidth / A4_RATIO;

    // 如果高度超过屏幕高度，则基于高度重新计算宽度
    if (newHeight > height * 0.9) {
      newHeight = height * 0.9;
      newWidth = newHeight * A4_RATIO;
    }

    setDimensions({ width: newWidth, height: newHeight });
  }, [height, width]);

  const updateScale = useDesignerStore((state) => state.update);
  useEffect(() => {
    if (!ref.current) return;
    const parent = ref.current.parentElement;
    if (!parent) return;

    const panzoom = Panzoom(ref.current, {
      canvas: true,
      disableXAxis: true,
    });
    const handleWheel = (event: WheelEvent) => {
      if (!event.ctrlKey) return;
      panzoom.zoomWithWheel(event);
      const zoom = panzoom.getScale();
      updateScale({ scale: zoom });
    };

    parent.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      parent.removeEventListener("wheel", handleWheel);
    };
  }, [updateScale]);

  return (
    <div
      className="bg-white p-4 rounded-lg shadow-lg mx-auto"
      style={{
        width: `${dimensions.width}px`,
        height: `${dimensions.height}px`,
      }}
      ref={ref}
    >
      {children}
    </div>
  );
};

export default ResumePreview;
