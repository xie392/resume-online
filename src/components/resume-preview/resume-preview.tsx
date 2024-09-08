"use client";

import Panzoom from "@panzoom/panzoom";
import { useElementSize } from "@reactuses/core";
import { useEffect, useRef, useState } from "react";
import Template from "./template";

// A4 纸张尺寸比
const A4_RATIO = 210 / 297;

const ResumePreview = () => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  const [width, height] = useElementSize(containerRef);

  useEffect(() => {
    if (!width || !height) return;
    setDimensions({
      width: width - 100,
      height: height - 20,
    });
  }, [width, height]);

  useEffect(() => {
    if (!previewRef.current) return;
    const parent = previewRef.current.parentElement;
    if (!parent) return;

    const panzoom = Panzoom(previewRef.current, {
      canvas: true,
      // disableXAxis: true,
    });
    const handleWheel = (event: WheelEvent) => {
      if (!event.ctrlKey) return;
      panzoom.zoomWithWheel(event);
      // const zoom = panzoom.getScale();
      // updateScale({ scale: zoom });
    };

    parent.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      parent.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return (
    <div
      className="w-1/2 bg-secondary min-h-[calc(100vh-64px)] fixed top-16 right-0"
      ref={containerRef}
    >
      <div
        className="bg-white p-4 rounded-lg shadow-lg m-auto"
        style={{
          width: `${dimensions.width}px`,
        }}
        ref={previewRef}
      >
        <Template />
      </div>
    </div>
  );
};

export default ResumePreview;
