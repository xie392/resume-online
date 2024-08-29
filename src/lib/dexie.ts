import {
  BaseInfoTable,
  EducationExpTable,
  WorkExpTable,
} from "@/interface/storage";
import Dexie, { Table } from "dexie";

export class Storage extends Dexie {
  baseInfo!: Table<BaseInfoTable>;
  educationExp!: Table<EducationExpTable>;
  workExp!: Table<WorkExpTable>;

  constructor(name: string, version: number = 1) {
    super(name);
    this.version(version).stores({
      base_info: `
        ++id, 
        uid,
        name, 
        email, 
        phone, 
        address, 
        birthday,
        website,
        github,
        avatar,
        gender,
        education,
        weixin,
        experience,
        startWorkDate,
        politicalStatus
      `,
      education_exp: `
        ++id,
        uid,
        school,
        major,
        degree,
        start,
        end,
        award,
        schoolExperience
      `,
      work_exp: `
        ++id,
        uid,
        company,
        position,
        start,
        end,
        description,
        companyAddress,
        industry,
        department
      `,
    });
  }
}
