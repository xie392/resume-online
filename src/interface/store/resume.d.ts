import { Nav } from "@/lib/constants";

/** 基本信息 */
export interface BaseInfo {
  /** 姓名 */
  name: string;
  /** 邮箱 */
  email: string;
  /** 手机号 */
  phone: string;
  /** 地址 */
  address?: string;
  /** 个人网站地址 */
  website?: string;
  /** Github 地址 */
  github?: string;
  /** 头像地址 */
  avatar?: string;
  /** 性别 */
  gender?: string;
  /** 学历 */
  education?: string;
  /** 微信号 */
  weixin?: string;
  /** 工作经验 */
  experience?: string;
  /** 生日 */
  birthday?: string;
  /** 开始工作时间 */
  startWorkDate?: string;
  /** 政治面貌 */
  politicalStatus?: string;
}

/** 教育经历 */
export interface EducationExp {
  /** 学校名称 */
  school: string;
  /** 学历 */
  degree: string;
  /** 开始时间 */
  start: string;
  /** 结束时间 */
  end: string;
  /** 专业 */
  major: string;
  /** 学位 */
  award?: string;
  /** 校园经历 */
  schoolExperience?: string;
}

/** 工作经历 */
export interface WorkExp {
  /** 公司名称 */
  company: string;
  /** 职位 */
  position: string;
  /** 开始时间 */
  start: string;
  /** 结束时间 */
  end: string;
  /** 工作描述 */
  description: string;
  /** 公司地址 */
  companyAddress?: string;
  /** 公司行业 */
  industry?: string;
  /** 部门 */
  department: string;
}

/** 项目经历 */
export interface ProjectExp {
  /** 项目名称 */
  name: string;
  /** 项目描述 */
  description: string;
  /** 项目地址 */
  address?: string;
  /** 项目开始时间 */
  start: string;
  /** 项目结束时间 */
  end: string;
  /** 项目成果 */
  achievements?: string;
  /**担任角色 */
  roleName: string;
}

/** 个人优势 */
export interface Advantage {
  /** 优势描述 */
  description: string;
}

/**
 * Resume interface
 */

/** 教育经历 */
export interface Education {
  /** 学校名称 */
  school: string;
  /** 学历 */
  degree: string;
  /** 开始时间 */
  start: string;
  /** 结束时间 */
  end: string;
  /** 专业 */
  major: string;
  /** 学位 */
  award?: string;
  /** 校园经历 */
  schoolExperience?: string;
}

/** 工作经历 */
export interface Experience {
  /** 公司名称 */
  company: string;
  /** 职位 */
  position: string;
  /** 开始时间 */
  start: string;
  /** 结束时间 */
  end: string;
  /** 工作描述 */
  description: string;
  /** 公司地址 */
  companyAddress?: string;
  /** 公司行业 */
  industry?: string;
  /** 部门 */
  department: string;
}

/** 项目经历 */
export interface Project {
  /** 项目名称 */
  name: string;
  /** 项目描述 */
  description: string;
  /** 项目地址 */
  address?: string;
  /** 项目开始时间 */
  start: string;
  /** 项目结束时间 */
  end: string;
  /** 项目成果 */
  achievements?: string;
  /**担任角色 */
  roleName: string;
}

/** 语言技能 */
export interface Language {
  /** 语言名称 */
  name: string;
  /** 熟练程度 */
  level: string;
}

/** 证书 */
export interface Certificate {
  /** 证书名称 */
  name: string;
  /** 颁发机构 */
  organization: string;
  /** 颁发时间 */
  issueDate: Date;
}

/** 期望职位 */
export interface Expectation {
  /** 职位名称 */
  position: string;
  /** 职位描述 */
  description?: string;
  /** 薪资范围 */
  salary?: string;
  /** 工作地点 */
  location?: string;
  /** 职位类型 */
  type?: string;
}

export interface ResumeNavItems {
  title: string;
  name: Nav;
  order: number;
}

export interface Resume {
  id: string;
  name: string;
  baseInfo: BaseInfo;
  educationExp: EducationExp[];
  workExp: WorkExp[];
  projectExp: ProjectExp[];
  advantage: Advantage;
  navItems: ResumeNavItems[];
}
