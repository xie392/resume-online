"use client";

import ResumeHeader from "@/components/layout/resume-header";
import ResumeProvider from "@/components/provider/resume-provider";
import ResumeForm from "@/components/resume-form/resume-form";
import ResumePreview from "@/components/resume-preview/resume-preview";
import { useResumeStore } from "@/stores/resume";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const Resume = () => {
  const params = useSearchParams();
  const router = useRouter();

  const lastResumeID = useResumeStore((state) => state.lastResumeID);
  const updateLastResumeID = useResumeStore((state) => state.update);

  const [id, setId] = useState<string>(lastResumeID);

  useEffect(() => {
    const id = params.get("id");
    if (!id) {
      router.replace(`/resume?id=${lastResumeID}`);
      return;
    }
    setId(id);
    updateLastResumeID({ lastResumeID: id });
  }, [lastResumeID, params, router, updateLastResumeID]);

  return (
    <ResumeProvider id={id}>
      <div className="bg-background">
        <ResumeHeader />
        <div className="w-full flex">
          <div className="flex-1">
            <ResumeForm />
          </div>
          <div className="flex-1">
            <ResumePreview />
          </div>
        </div>
      </div>
    </ResumeProvider>
  );
};

export default Resume;
