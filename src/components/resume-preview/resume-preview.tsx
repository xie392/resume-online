"use client";

import Panzoom from "@panzoom/panzoom";
import { useElementSize } from "@reactuses/core";
import { useContext, useEffect, useRef, useState } from "react";
import Template from "./template";
// import html2pdf from "html2pdf.js";
import { Button } from "@/components/ui/button";
import { cn, downloadFile } from "@/lib/utils";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { toJpeg } from "html-to-image";
import NextImage from "next/image";
import { ResumeContext } from "@/context/resume-context";
import { Options } from "html-to-image/lib/types";
import { useConfigStore } from "@/stores/config";
import { toImage } from "@/lib/html-to-image";

const A4_WIDTH = 595.28;
const A4_HEIGHT = 841.89;

const ResumePreview = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const templateRef = useRef<HTMLDivElement>(null);

  const { name } = useContext(ResumeContext);
  const padding = useConfigStore((state) => state.padding);

  useEffect(() => {
    if (!previewRef.current) return;
    const parent = previewRef.current.parentElement;
    if (!parent) return;

    const panzoom = Panzoom(previewRef.current, {
      canvas: true,
    });

    const handleWheel = (event: WheelEvent) => {
      if (!event.ctrlKey) return;
      panzoom.zoomWithWheel(event);
    };

    parent.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      parent.removeEventListener("wheel", handleWheel);
    };
  }, []);

  const exportAsPDF = async () => {
    const element = templateRef.current;
    if (!element) return;

    const pdf = new jsPDF("p", "pt", "a4");

    // const url = await toJpeg(element, {
    //   quality: 1,
    //   pixelRatio: 3,
    //   backgroundColor: "#fff",
    //   skipAutoScale: false,
    // });
    const pageNum = Math.ceil(element.clientHeight / A4_HEIGHT);

    // console.log("pageNum", pageNum);

    const height = A4_HEIGHT - padding;
    // Add each page to the PDF
    for (let i = 0; i < pageNum; i++) {
      // const image = await toJpeg(element, {
      //   quality: 1,
      //   pixelRatio: 3,
      //   backgroundColor: "#fff",
      //   skipAutoScale: false,
      //   width: A4_WIDTH,
      //   height: height,
      // });
      const image = await toImage(element);
      if (i >= 1) pdf.addPage();
      pdf.addImage(image, "JPEG", 0, 0, A4_WIDTH, height);
    }

    const fileName = name ? `${name}.pdf` : "resume.pdf";
    pdf.save(`${fileName}.pdf`);
  };

  return (
    <>
      <div
        className="w-1/2 bg-secondary min-h-[calc(100vh-64px)] fixed top-16 right-0"
        ref={containerRef}
      >
        <Button onClick={exportAsPDF}>Download as PDF</Button>
        <div
          className="bg-white rounded-lg m-aut"
          style={{
            width: A4_WIDTH,
            minHeight: A4_HEIGHT,
          }}
          ref={previewRef}
        >
          <Template ref={templateRef} />
        </div>
      </div>
    </>
  );
};

export default ResumePreview;
