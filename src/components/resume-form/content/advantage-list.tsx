"use client";

import { useContext, useMemo } from "react";
import CardContent from "../common/card-content";
import CardGrid from "../common/card-grid";
import { ResumeContext } from "@/context/resume-context";
import { BaseInfoArray } from "@/interface/type";
import { InputType, Nav } from "@/lib/constants";
import InputControl from "../common/input-control";
import { cn } from "@/lib/utils";

const AdvantageList = () => {
  const { advantage, updateObject } = useContext(ResumeContext);

  const list = useMemo<BaseInfoArray[]>(() => {
    if (!advantage) return [];
    return [
      {
        label: "个人优势",
        name: "description",
        type: InputType.Editable,
        placeholder: "请输入个人优势",
        required: true,
        value: advantage.description,
      },
    ];
  }, [advantage]);
  return (
    <CardContent title="个人优势">
      <CardGrid>
        {list.map((item) => (
          <InputControl
            className={cn({ "col-span-2": item.type === InputType.Editable })}
            key={item.name}
            item={item}
            placeholder={item.placeholder}
            updateValue={(value) =>
              updateObject(Nav.Advantage, { [item.name]: value })
            }
          />
        ))}
      </CardGrid>
    </CardContent>
  );
};

export default AdvantageList;
