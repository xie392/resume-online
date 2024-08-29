"use client";

import CardContent from "../common/card-content";
import { useResumeStore } from "@/stores/resume";
import { useMemo, useState } from "react";
import { BaseInfoArray } from "@/interface/type";
import { InputType } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import CardGrid from "../common/card-grid";
import InputControl from "@/components/input-control";
import { Education } from "@/interface/store/resume";
import { cn } from "@/lib/utils";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { defaultEducationExp } from "@/lib/default";

const EducationExpCard: React.FC<{
  items: BaseInfoArray[];
  updateValue: (info: Partial<Education>) => void;
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

const EducationList = () => {
  // TODO: 从数据库中获取
  const lastResumeID = useResumeStore((state) => state.lastResumeID);
  const educationExp = useResumeStore(
    (state) => state.find(lastResumeID)?.educationExp
  );

  const [info, setInfo] = useState<Education[]>(educationExp!);
  const educationExpList = useMemo<BaseInfoArray[][]>(() => {
    if (!info) return [];
    return info.map((item) => {
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
          options: [
            { label: "小学", value: "小学" },
            { label: "初中", value: "初中" },
            { label: "高中", value: "高中" },
            { label: "大专", value: "大专" },
            { label: "本科", value: "本科" },
            { label: "硕士", value: "硕士" },
            { label: "博士", value: "博士" },
          ],
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
  }, [info]);

  const updateInfo = (index: number, info: Partial<Education>) => {
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
      title="教育经历"
      showAdd
      handlerAdd={() => setInfo((prev) => [defaultEducationExp, ...prev])}
      defaultValue={info.map((_, index) => `${index}`)}
    >
      {educationExpList.map((item, index) => (
        <AccordionItem
          className="flex-1 w-full border-b-transparent"
          value={`${index}`}
          key={index}
        >
          <AccordionTrigger>
            <h2 className="font-bold">{info[index]?.school}</h2>
          </AccordionTrigger>
          <AccordionContent>
            <EducationExpCard
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

export default EducationList;
