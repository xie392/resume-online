const DefaultResume = [
  {
    title: "个人信息",
    items: [
      {
        label: "姓名",
        value: "张三",
      },
      {
        label: "手机号码",
        value: "13800138000",
      },
      {
        label: "邮箱",
        value: "zhangsan@qq.com",
      },
      {
        label: "Github",
        value: "https://github.com/zhangsan",
      },
    ],
    type: "info",
    order: 1,
  },
  {
    title: "教育经历",
    items: [
      {
        label: "时间",
        value: "2015.9 - 2019.6",
      },
      {
        label: "学校",
        value: "北京大学",
      },
      {
        label: "专业",
        value: "计算机科学与技术",
      },
      {
        label: "成绩",
        value: "95/100",
      },
    ],
    type: "education",
    order: 2,
  },
  {
    title: "工作经历",
    items: [
      {
        label: "时间",
        value: "2019.7 - 至今",
      },
      {
        label: "公司",
        value: "某公司",
      },
      {
        label: "职位",
        value: "前端工程师",
      },
      {
        label: "职责",
        value: "负责前端开发工作",
      },
    ],
    type: "work",
    order: 3,
  },
  {
    title: "项目经历",
    items: [
      {
        label: "项目名称",
        value: "某项目",
      },
      {
        label: "项目描述",
        value: "某项目是一款基于React的Web应用",
      },
      {
        label: "项目职责",
        value: "负责项目的前端开发工作",
      },
      {
        label: "项目时间",
        value: "2019.7 - 至今",
      },
    ],
    type: "project",
    order: 4,
  },
  {
    title: "技能",
    items: [
      {
        label: "编程语言",
        value: "JavaScript,TypeScript,HTML,CSS",
      },
      {
        label: "框架/库",
        value: "React,Vue,Angular,Node.js",
      },
      {
        label: "数据库",
        value: "MySQL,MongoDB",
      },
      {
        label: "其他",
        value: "Git,Webpack,Babel,ESLint,PostCSS",
      },
    ],
    type: "skill",
    order: 5,
  },
];

export { DefaultResume };
