import type { BaseInfo, Education, Experience, Project } from "./store/resume";

export interface BaseInfoTable extends BaseInfo {
  uid: string;
}

export interface EducationExpTable extends Education {
  uid: string;
}

export interface WorkExpTable extends Experience {
  uid: string;
}
