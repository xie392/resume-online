"use client";

import { useMemo, useState } from "react";
import CardContent from "../common/card-content";
import { Experience, Project } from "@/interface/store/resume";
import { BaseInfoArray } from "@/interface/type";
import { InputType } from "@/lib/constants";
import CardGrid from "../common/card-grid";
import InputControl from "@/components/input-control";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { defaultProjectsExp } from "@/lib/default";

const ProjectExpCard: React.FC<{
  items: BaseInfoArray[];
  updateValue: (info: Partial<Experience>) => void;
  remove: () => void;
}> = ({ items, updateValue, remove }) => {
  return (
    <CardGrid>
      {items.map((item) => (
        <InputControl
          className={cn({ "col-span-2": item.type === InputType.Editable })}
          key={item.name}
          item={item}
          placeholder={item.placeholder}
          updateValue={(value) => updateValue({ [item.name]: value })}
        />
      ))}
      <div className="flex justify-end gap-x-1 col-span-2">
        <Button variant="destructive" size="sm" onClick={remove}>
          删除
        </Button>
      </div>
    </CardGrid>
  );
};

const ProjectList = () => {
  const [info, setInfo] = useState<Project[]>([defaultProjectsExp]);

  const projectExpList = useMemo<BaseInfoArray[][]>(() => {
    return info.map((item) => {
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
  }, [info]);

  const updateInfo = (index: number, info: Partial<Project>) => {
    setInfo((prev) => {
      const newInfo = [...prev];
      newInfo[index] = {
        ...newInfo[index],
        ...info,
      };
      return newInfo;
    });
  };

  return (
    <CardContent
      title="项目经历"
      showAdd
      handlerAdd={() => setInfo((prev) => [defaultProjectsExp, ...prev])}
      defaultValue={info.map((_, index) => `${index}`)}
    >
      {projectExpList.map((item, index) => (
        <AccordionItem
          className="flex-1 w-full border-b-transparent"
          value={`${index}`}
          key={index}
        >
          <AccordionTrigger>
            <h2 className="font-bold">{info[index]?.name}</h2>
          </AccordionTrigger>
          <AccordionContent>
            <ProjectExpCard
              key={index}
              items={item}
              updateValue={(info) => updateInfo(index, info)}
              remove={() =>
                setInfo((prev) => prev.filter((_, i) => i !== index))
              }
            />
          </AccordionContent>
        </AccordionItem>
      ))}
    </CardContent>
  );
};

export default ProjectList;
