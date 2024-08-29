import type { BaseInfo, Resume } from "@/interface/store/resume";
import {
  defaultAdvantage,
  defaultBaseInfo,
  defaultEducationExp,
  defaultNavItems,
  defaultProjectsExp,
  defaultWorkExp,
} from "@/lib/default";
import { createPersistStore } from "@/lib/store";

interface ResumeState {
  resumes: Resume[];
  lastResumeID: string;
  lastTemplateID: string;
}

const initialState: ResumeState = {
  resumes: [
    {
      id: "1",
      name: "前端开发工程师",
      baseInfo: defaultBaseInfo,
      educationExp: [defaultEducationExp],
      workExp: [defaultWorkExp],
      projectExp: [defaultProjectsExp],
      advantage: defaultAdvantage,
      navItems: defaultNavItems,
    },
  ],
  lastResumeID: "1",
  lastTemplateID: "1",
};

export const useResumeStore = createPersistStore(
  initialState,
  (set, get) => ({
    find(id: string) {
      return get().resumes.find((item) => item.id === id);
    },
    // updateBaseInfo(baseInfo: Partial<BaseInfo>) {
    //   const { resumes, lastResumeID } = get();
    //   const resume = resumes.find((item) => item.id === lastResumeID);
    //   if (!resume) return;

    //   resume.baseInfo = {
    //     ...resume.baseInfo,
    //     ...baseInfo,
    //   };
    //   set({ resumes: [...resumes] });
    // },
    // updateArrayValue<T extends keyof Resume>(
    //   key: T,
    //   options: {
    //     index: number;
    //     info: Partial<Resume[T] extends Array<infer U> ? U : never>;
    //   }
    // ) {
    //   const { resumes, lastResumeID } = get();
    //   const resume = resumes.find((item) => item.id === lastResumeID);
    //   if (!resume) return;

    //   const { index, info } = options;
    //   const array = resume[key];

    //   if (Array.isArray(array)) {
    //     const item = array[index];
    //     if (item) {
    //       array[index] = {
    //         ...item,
    //         ...info,
    //       };
    //       console.log("array[index]", array[index], resume);
    //       set({ resumes });
    //     }
    //   }
    // },
    updateObject<T extends object>(object: Partial<T>) {},
    updateArray<T extends keyof Resume>(
      key: T,
      options: {
        index: number;
        info: Partial<Resume[T] extends Array<infer U> ? U : never>;
      }
    ) {},
  }),
  {
    name: "store-resume",
    version: 1,
  }
);
