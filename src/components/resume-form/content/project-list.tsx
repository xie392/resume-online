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
import { defaultProjectsExp } from "@/config/default";
import { ResumeContext } from "@/context/resume-context";
import CardItem from "../common/card-item";

const ProjectList = () => {
  const { projectExp, updateArray, addArrayItem, deleteArrayItem } =
    useContext(ResumeContext);

  const list = useMemo<BaseInfoArray[][]>(() => {
    if (!projectExp.length) return [];
    return projectExp.map((item) => {
      return [
        {
          label: "项目名称",
          name: "name",
          type: InputType.Text,
          placeholder: "请输入项目名称",
          required: true,
          value: item.name,
        },
        {
          label: "项目地址（选题）",
          name: "address",
          type: InputType.Text,
          placeholder: "请输入项目地址",
          required: false,
          value: item.address,
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
          label: "项目角色",
          name: "roleName",
          type: InputType.Text,
          placeholder: "请输入开始时间",
          required: true,
          value: item.roleName,
        },
        {
          label: "项目描述",
          name: "description",
          type: InputType.Editable,
          placeholder: "请输入项目描述",
          required: true,
          value: item.description,
        },
        {
          label: "工作成果（选填）",
          name: "achievements",
          type: InputType.Editable,
          placeholder: "请输入工作成果",
          required: false,
          value: item.achievements,
        },
      ];
    });
  }, [projectExp]);

  return (
    <CardContent
      title="项目经历"
      showAdd
      handlerAdd={() => addArrayItem(Nav.ProjectExp, defaultProjectsExp)}
      defaultValue={list.map((_, index) => `${index}`)}
    >
      {list.map((item, index) => (
        <AccordionItem
          className="flex-1 w-full border-b-transparent"
          value={`${index}`}
          key={index}
        >
          <AccordionTrigger>
            <h2 className="font-bold">{projectExp[index]?.name}</h2>
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

export default ProjectList;
