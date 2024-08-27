import type {
  BaseInfo,
  Education,
  Experience,
  ResumeNavItems,
} from "@/interface/store/resume";
import { Nav } from "@/lib/constants";
import { createPersistStore } from "@/lib/store";

interface Resume {
  id: string;
  name: string;
  baseInfo: BaseInfo;
  educationExp: Education[];
  workExp: Experience[];
  navItems: ResumeNavItems[];
}

interface ResumeState {
  resumes: Resume[];
  lastResumeID: string;
  lastTemplateID: string;
}

export const defaultBaseInfo: BaseInfo = {
  name: "YuHong",
  email: "johndoe@example.com",
  phone: "123-456-7890",
  address: "中国",
  website: "https://www.xie392.cn",
  github: "https://github.com/xie392",
  avatar: "https://avatars.githubusercontent.com/u/61953437?v=4",
  gender: "1",
  education: "本科",
  weixin: "weixin",
  experience: "2",
  birthday: "2024-08-07",
  startWorkDate: "2024-08-07",
};

export const defaultEducationExp: Education = {
  school: "清华大学",
  major: "计算机科学与技术",
  degree: "本科",
  start: "2024-09-01",
  end: "2024-06-30",
  award: "博士学位",
  schoolExperience: "参加了ACM竞赛，获得了奖项\n参加清华计算机大赛",
};

export const defaultWorkExp: Experience = {
  company: "字节跳动",
  position: "算法工程师",
  start: "2024-01-01",
  end: "2024-06-30",
  description:
    "负责算法相关的研发工作，包括数据结构、算法、机器学习、深度学习等。",
  companyAddress: "北京市海淀区西二旗",
  industry: "互联网",
  department: "算法组",
};

export const defaultNavItems: ResumeNavItems[] = [
  { title: "个人信息", name: Nav.BaseInfo, order: 1 },
  { title: "教育经历", name: Nav.EducationExp, order: 2 },
  { title: "工作经历", name: Nav.WorkExp, order: 3 },
  { title: "项目经历", name: Nav.ProjectsExp, order: 4 },
  { title: "个人优势", name: Nav.SkillExp, order: 5 },
];

const initialState: ResumeState = {
  resumes: [
    {
      id: "1",
      name: "前端开发工程师",
      baseInfo: defaultBaseInfo,
      educationExp: [defaultEducationExp],
      workExp: [defaultWorkExp],
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
    updateBaseInfo(baseInfo: Partial<BaseInfo>) {
      const { resumes, lastResumeID } = get();
      const resume = resumes.find((item) => item.id === lastResumeID);
      if (!resume) return;

      resume.baseInfo = {
        ...resume.baseInfo,
        ...baseInfo,
      };
      set({ resumes: [...resumes] });
    },
    updateArrayValue<T extends keyof Resume>(
      key: T,
      options: {
        index: number;
        info: Partial<Resume[T] extends Array<infer U> ? U : never>;
      }
    ) {
      const { resumes, lastResumeID } = get();
      const resume = resumes.find((item) => item.id === lastResumeID);
      if (!resume) return;

      const { index, info } = options;
      const array = resume[key];

      if (Array.isArray(array)) {
        const item = array[index];
        if (item) {
          array[index] = {
            ...item,
            ...info,
          };
          // console.log("array[index]", array[index], resume);
          // set({ resumes });
        }
      }
    },
  }),
  {
    name: "store-resume",
    version: 1,
  }
);
