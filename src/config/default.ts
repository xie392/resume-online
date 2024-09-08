import {
  Advantage,
  BaseInfo,
  EducationExp,
  ProjectExp,
  ResumeNavItems,
  WorkExp,
} from "@/interface/store/resume";
import { Nav } from "../lib/constants";

export const defaultBaseInfo: BaseInfo = {
  name: "YuHong",
  email: "johndoe@example.com",
  phone: "158999942527",
  address: "中国",
  website: "https://www.myblog.cn",
  github: "https://github.com/yyy",
  avatar: "https://avatars.githubusercontent.com/u/61953437?v=4",
  gender: "1",
  education: "本科",
  weixin: "weixin",
  experience: "2",
  birthday: "2001-08-07",
  startWorkDate: "2022-08-07",
};

export const defaultEducationExp: EducationExp = {
  school: "清华大学",
  major: "计算机科学与技术",
  degree: "本科",
  start: "2020-09-01",
  end: "2024-06-30",
  award: "博士学位",
  schoolExperience: ` <ol><li>2023年4月参加第九届"互联网+"获得金奖</li><li>2023年6月参加全国大学生吹牛逼大赛一等奖</li><li>2024年3月参加全国大学生滑稽表演特等奖</li></ol>`,
};

export const defaultWorkExp: WorkExp = {
  company: "字节跳动",
  position: "算法工程师",
  start: "2024-01-01",
  end: "2024-06-30",
  description:
    "负责算法相关的研发工作，包括数据结构、算法、机器学习、深度学习等。以及负责算法相关的产品设计、研发、运营等工作。",
  companyAddress: "北京市海淀区西二旗",
  industry: "互联网",
  department: "算法组",
};

export const defaultProjectsExp: ProjectExp = {
  name: "抖音",
  address: "https://www.douyin.com",
  start: "2024-01-01",
  end: "2024-06-30",
  description: `<ul><li>采用GRPC实现微服务间的高效通信，推动系统的分布式架构设计。</li><li>领域驱动设计（DDD），运用DDD原则进行业务建模和代码组织，提高系统的可维护性和可扩展性。</li><li>集成RabbitMQ进行异步消息处理，确保消息的可靠传递和系统的可扩展性。</li><li>通过Apisix进行API网关管理，优化接口流量并提高安全性。</li><li>使用MinIO进行分布式文件存储，保障文件的高效读写和安全管理。</li><li>集成OpenPGP进行消息加密，确保用户数据的安全和隐私。</li><li>使用Consul进行服务注册与发现，保证系统的动态扩展能力。</li></ul>`,

  achievements: "<p>主要成果：获得了2021年度抖音年度产品奖</p>",
  roleName: "算法工程师",
};

export const defaultAdvantage: Advantage = {
  description: `<ol><li>熟悉 Go 语言的基本语法，能够熟练运用 Gin、Gorm、Grpc 等框架进行开发。</li><li>熟练掌握 MySQL、Sqlserver、MongoDB 等数据库的使用方法，能熟练编写 CURD 语句进行数据操作。</li><li>熟悉前端开发技术体系，涵盖 HTML、CSS、JavaScript，以及 React、Vue 等热门前端框架。</li><li>深刻理解微服务架构思想，在微服务开发方面积累了一定经验。</li><li>能够熟练使用 Docker 进行容器化部署，包括 MySQL、MinIO、Nginx、Redis 等服务。</li><li>熟练运用 Go Modules 进行高效的依赖管理。</li><li>对 Linux 系统常用命令运用自如。</li></ol>`,
};

export const defaultNavItems: ResumeNavItems[] = [
  { title: "个人信息", name: Nav.BaseInfo, order: 1 },
  { title: "教育经历", name: Nav.EducationExp, order: 2 },
  { title: "工作经历", name: Nav.WorkExp, order: 3 },
  { title: "项目经历", name: Nav.ProjectExp, order: 4 },
  { title: "个人优势", name: Nav.Advantage, order: 5 },
];
