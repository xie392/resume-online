"use client";
import { Resume } from "@/interface/store/resume";
import { Nav } from "@/lib/constants";
import {
  defaultAdvantage,
  defaultBaseInfo,
  defaultEducationExp,
  defaultNavItems,
  defaultProjectsExp,
  defaultWorkExp,
} from "@/config/default";
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
  deleteArrayItem: <T extends keyof Resume>(key: T, index: number) => void;
  addArrayItem: <T extends keyof Resume>(
    key: T,
    info: Partial<Resume[T] extends Array<infer U> ? U : never>
  ) => void;
}

export const resumeState = {
  id: "1",
  name: "前端开发工程师",
  navItems: defaultNavItems,
  [Nav.BaseInfo]: defaultBaseInfo,
  [Nav.EducationExp]: [defaultEducationExp],
  [Nav.WorkExp]: [defaultWorkExp],
  [Nav.ProjectExp]: [defaultProjectsExp],
  [Nav.Advantage]: defaultAdvantage,
};

export const resumeReducer = {
  updateObject: () => {},
  updateArray: () => {},
  deleteArrayItem: () => {},
  addArrayItem: () => {},
};

export const ResumeContext = createContext<ResumeContextData>({
  ...resumeState,
  ...resumeReducer,
});
