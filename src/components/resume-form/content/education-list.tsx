"use client";

import CardContent from "../common/card-content";
import { useContext, useMemo } from "react";
import { BaseInfoArray } from "@/interface/type";
import { InputType, Nav } from "@/lib/constants";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { defaultEducationExp } from "@/config/default";
import { ResumeContext } from "@/context/resume-context";
import CardItem from "../common/card-item";
import { educationOptions } from "@/config/config";

const EducationList = () => {
  const { educationExp, updateArray, addArrayItem, deleteArrayItem } =
    useContext(ResumeContext);

  const list = useMemo<BaseInfoArray[][]>(() => {
    if (!educationExp.length) return [];
    return educationExp.map((item) => {
      return [
        {
          label: "学校",
          name: "school",
          type: InputType.Text,
          placeholder: "请输入学校名称",
          required: true,
          value: item.school,
        },
        {
          label: "专业",
          name: "major",
          type: InputType.Text,
          placeholder: "请输入专业名称",
          required: true,
          value: item.major,
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
          label: "学历",
          name: "degree",
          type: InputType.Select,
          placeholder: "请输入学历",
          required: true,
          value: item.degree,
          options: educationOptions,
        },
        {
          label: "校园经历（选填）",
          name: "schoolExperience",
          type: InputType.Editable,
          placeholder: "请输入校园经历",
          required: false,
          value: item.schoolExperience,
        },
      ];
    });
  }, [educationExp]);

  return (
    <CardContent
      title="教育经历"
      showAdd
      handlerAdd={() => addArrayItem(Nav.EducationExp, defaultEducationExp)}
      defaultValue={list.map((_, index) => `${index}`)}
    >
      {list.map((item, index) => (
        <AccordionItem
          className="flex-1 w-full border-b-transparent"
          value={`${index}`}
          key={index}
        >
          <AccordionTrigger>
            <h2 className="font-bold">{educationExp[index]?.school}</h2>
          </AccordionTrigger>
          <AccordionContent>
            <CardItem
              key={index}
              items={item}
              updateValue={(info) =>
                updateArray(Nav.EducationExp, {
                  index,
                  info,
                })
              }
              remove={() => deleteArrayItem(Nav.EducationExp, index)}
            />
          </AccordionContent>
        </AccordionItem>
      ))}
    </CardContent>
  );
};

export default EducationList;
