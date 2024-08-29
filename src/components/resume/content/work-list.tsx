"use client";

import { useMemo, useState } from "react";
import CardContent from "../common/card-content";
import { Experience } from "@/interface/store/resume";
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
import { defaultWorkExp } from "@/lib/default";

const WorkExpCard: React.FC<{
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

const WorkList = () => {
  const [info, setInfo] = useState<Experience[]>([defaultWorkExp]);

  const workExpList = useMemo<BaseInfoArray[][]>(() => {
    return info.map((item) => {
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
  }, [info]);

  const updateInfo = (index: number, info: Partial<Experience>) => {
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
      title="工作经历"
      showAdd
      handlerAdd={() => setInfo((prev) => [defaultWorkExp, ...prev])}
      defaultValue={info.map((_, index) => `${index}`)}
    >
      {workExpList.map((item, index) => (
        <AccordionItem
          className="flex-1 w-full border-b-transparent"
          value={`${index}`}
          key={index}
        >
          <AccordionTrigger>
            <h2 className="font-bold">{info[index]?.company}</h2>
          </AccordionTrigger>
          <AccordionContent>
            <WorkExpCard
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

export default WorkList;
