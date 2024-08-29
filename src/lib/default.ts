import {
  Advantage,
  BaseInfo,
  EducationExp,
  ProjectExp,
  ResumeNavItems,
  WorkExp,
} from "@/interface/store/resume";
import { Nav } from "./constants";

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

export const defaultEducationExp: EducationExp = {
  school: "清华大学",
  major: "计算机科学与技术",
  degree: "本科",
  start: "2024-09-01",
  end: "2024-06-30",
  award: "博士学位",
  schoolExperience: "参加了ACM竞赛，获得了奖项\n参加清华计算机大赛",
};

export const defaultWorkExp: WorkExp = {
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

export const defaultProjectsExp: ProjectExp = {
  name: "抖音",
  address: "https://www.douyin.com",
  start: "2024-01-01",
  end: "2024-06-30",
  description: `抖音是一个短视频平台，主要服务于短视频内容生产者和消费者。\n负责抖音相关的研发工作，包括数据结构、算法、机器学习、深度学习等。`,

  achievements: "获得了2021年度抖音年度产品奖",
  roleName: "算法工程师",
};

export const defaultAdvantage: Advantage = {
  description:
    "优秀的团队精神，良好的沟通能力，优秀的工作态度，能够快速的适应变化，有较强的责任心和团队意识。",
};

export const defaultNavItems: ResumeNavItems[] = [
  { title: "个人信息", name: Nav.BaseInfo, order: 1 },
  { title: "教育经历", name: Nav.EducationExp, order: 2 },
  { title: "工作经历", name: Nav.WorkExp, order: 3 },
  { title: "项目经历", name: Nav.ProjectsExp, order: 4 },
  { title: "个人优势", name: Nav.SkillExp, order: 5 },
];
