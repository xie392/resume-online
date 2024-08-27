"use client";

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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

const EducationExpCard: React.FC<{ items: BaseInfoArray[]; index: number }> = ({
  items,
  index,
}) => {
  const updateArrayValue = useResumeStore((state) => state.updateArrayValue);
  // const addEducationExp = useResumeStore((state) => state.addEducationExp)
  // const deleteEducationExp = useResumeStore((state) => state.deleteEducationExp)

  const update = useResumeStore((state) => state.update);

  const [data, setData] = useState<Education>();

  return (
    <CardGrid>
      {items.map((item) => (
        <InputControl
          className={cn({ "col-span-2": item.type === InputType.Editable })}
          key={item.name}
          item={item}
          placeholder={item.placeholder}
          updateValue={(value) => {
            updateArrayValue("educationExp", {
              index,
              info: {
                [item.name]: value,
              },
            });
          }}
        />
      ))}
      <div className="flex justify-end gap-x-1 col-span-2">
        <Button
          variant="destructive"
          size="sm"
          // onClick={() => deleteEducationExp(index)}
        >
          删除
        </Button>
        <Button
          size="sm"
          // onClick={() => addEducationExp(index)}
        >
          添加
        </Button>
      </div>
    </CardGrid>
  );
};

const EducationList = () => {
  const lastResumeID = useResumeStore((state) => state.lastResumeID);
  const educationExp = useResumeStore(
    (state) => state.find(lastResumeID)?.educationExp
  );

  const educationExpList = useMemo<BaseInfoArray[][]>(() => {
    if (!educationExp) return [];
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
  }, [educationExp]);

  return (
    <CardContent>
      {educationExpList.map((item, index) => (
        <AccordionItem
          className="flex-1 border-b-transparent w-full"
          value={item[index].name}
          key={index}
        >
          <AccordionTrigger>
            <h2 className="font-bold">{item[index].value}</h2>
          </AccordionTrigger>
          <AccordionContent>
            <EducationExpCard key={index} items={item} index={index} />
          </AccordionContent>
        </AccordionItem>
      ))}
    </CardContent>
  );
};

export default EducationList;
