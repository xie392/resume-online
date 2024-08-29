"use client";
import { ResumeContext, ResumeContextData } from "@/context/resume-context";
import { Advantage, BaseInfo, Resume } from "@/interface/store/resume";
import { useResumeStore } from "@/stores/resume";
import { useCallback, useState } from "react";

interface ResumeProviderProps {
  children: React.ReactNode;
  id: string;
}

const ResumeProvider: React.FC<ResumeProviderProps> = ({ children, id }) => {
  const resume = useResumeStore((state) =>
    state.resumes.find((resume) => resume.id === id)
  );

  const [resumeData, setResumeData] = useState<Resume>(resume!);

  const updateObject: ResumeContextData["updateObject"] = useCallback(
    (key, updatedFields) => {
      const target = resumeData[key];
      if (typeof target !== "object" || target === null) return;

      const updatedObject = {
        ...target,
        ...updatedFields,
      };

      setResumeData((prevResume) => ({
        ...prevResume,
        [key]: updatedObject,
      }));
    },
    [resumeData]
  );

  const updateArray: ResumeContextData["updateArray"] = useCallback(
    (key, { index, info }) => {
      const target = resumeData[key];
      if (!Array.isArray(target) || index >= target.length) return;

      const updatedArray = [...target];
      updatedArray[index] = {
        ...updatedArray[index],
        ...info,
      };

      setResumeData((prevResume) => ({
        ...prevResume,
        [key]: updatedArray,
      }));
    },
    [resumeData]
  );

  return (
    <ResumeContext.Provider
      value={{ ...resumeData, updateObject, updateArray }}
    >
      {children}
    </ResumeContext.Provider>
  );
};

export default ResumeProvider;
