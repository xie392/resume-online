"use client";

import { useContext, useMemo } from "react";
import CardContent from "../common/card-content";
import { BaseInfoArray } from "@/interface/type";
import { InputType, Nav } from "@/lib/constants";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { defaultWorkExp } from "@/config/default";
import CardItem from "../common/card-item";
import { ResumeContext } from "@/context/resume-context";

const WorkList = () => {
  const { workExp, updateArray, addArrayItem, deleteArrayItem } =
    useContext(ResumeContext);

  const list = useMemo<BaseInfoArray[][]>(() => {
    if (!workExp.length) return [];
    return workExp.map((item) => {
      return [
        {
          label: "公司名称",
          name: "company",
          type: InputType.Text,
          placeholder: "请输入公司名称",
          required: true,
          value: item.company,
        },
        {
          label: "职位",
          name: "position",
          type: InputType.Text,
          placeholder: "请输入职业",
          required: true,
          value: item.position,
        },
        {
          label: "开始时间",
          name: "start",
          type: InputType.Date,
          placeholder: "请输入开始时间",
          required: true,
          value: item.start,
        },
        {
          label: "结束时间",
          name: "end",
          type: InputType.Date,
          placeholder: "请输入开始时间",
          required: true,
          value: item.end,
        },
        {
          label: "地址（选填）",
          name: "companyAddress",
          type: InputType.Text,
          placeholder: "请输入地址",
          required: true,
          value: item.companyAddress,
        },
        {
          label: "所属行业（选填）",
          name: "industry",
          type: InputType.Text,
          placeholder: "请输入所属行业",
          required: false,
          value: item.industry,
        },
        {
          label: "所属部门（选填）",
          name: "department",
          type: InputType.Text,
          placeholder: "请输入所属部门",
          required: false,
          value: item.department,
        },
        {
          label: "工作职责",
          name: "description",
          type: InputType.Editable,
          placeholder: "请输入工作职责",
          required: false,
          value: item.description,
        },
      ];
    });
  }, [workExp]);

  return (
    <CardContent
      title="工作经历"
      showAdd
      handlerAdd={() => addArrayItem(Nav.WorkExp, defaultWorkExp)}
      defaultValue={list.map((_, index) => `${index}`)}
    >
      {list.map((item, index) => (
        <AccordionItem
          className="flex-1 w-full border-b-transparent"
          value={`${index}`}
          key={index}
        >
          <AccordionTrigger>
            <h2 className="font-bold">{workExp[index]?.company}</h2>
          </AccordionTrigger>
          <AccordionContent>
            <CardItem
              key={index}
              items={item}
              updateValue={(info) =>
                updateArray(Nav.WorkExp, {
                  index,
                  info,
                })
              }
              remove={() => deleteArrayItem(Nav.WorkExp, index)}
            />
          </AccordionContent>
        </AccordionItem>
      ))}
    </CardContent>
  );
};

export default WorkList;
