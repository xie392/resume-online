"use client";
import { Advantage, BaseInfo, Resume } from "@/interface/store/resume";
import {
  defaultAdvantage,
  defaultBaseInfo,
  defaultEducationExp,
  defaultNavItems,
  defaultProjectsExp,
  defaultWorkExp,
} from "@/lib/default";
import { createContext } from "react";

export interface ResumeContextData extends Resume {
  updateObject: <T extends keyof Resume>(
    key: T,
    object: Partial<Resume[T]>
  ) => void;
  updateArray: <T extends keyof Resume>(
    key: T,
    options: {
      index: number;
      info: Partial<Resume[T] extends Array<infer U> ? U : never>;
    }
  ) => void;
}

export const resumeState = {
  id: "1",
  name: "前端开发工程师",
  baseInfo: defaultBaseInfo,
  educationExp: [defaultEducationExp],
  workExp: [defaultWorkExp],
  projectExp: [defaultProjectsExp],
  advantage: defaultAdvantage,
  navItems: defaultNavItems,
};

export const resumeReducer = {
  updateObject: () => {},
  updateArray: () => {},
};

export const ResumeContext = createContext<ResumeContextData>({
  ...resumeState,
  ...resumeReducer,
});
