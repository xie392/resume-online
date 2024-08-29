"use client";

import { BaseInfoArray } from "@/interface/type";
import { useContext, useMemo } from "react";
import CardGrid from "../common/card-grid";
import InputControl from "@/components/input-control";
import CardContent from "../common/card-content";
import { ResumeContext } from "@/context/resume-context";

const BaseInfo = () => {
  const { baseInfo, updateObject } = useContext(ResumeContext);

  const baseInfoList = useMemo<BaseInfoArray[]>(() => {
    if (!baseInfo) return [];
    return [
      {
        label: "姓名",
        name: "name",
        type: "text",
        placeholder: "请输入姓名",
        required: true,
        value: baseInfo.name,
      },
      {
        label: "头像",
        name: "avatar",
        type: "image",
        placeholder: "请上传头像",
        required: true,
        value: baseInfo.avatar,
      },
      {
        label: "邮箱",
        name: "email",
        type: "email",
        placeholder: "请输入邮箱",
        required: true,
        value: baseInfo.email,
      },
      {
        label: "地址",
        name: "address",
        type: "text",
        placeholder: "请输入地址",
        required: true,
        value: baseInfo.address,
      },
      {
        label: "个人博客（选填）",
        name: "website",
        type: "url",
        placeholder: "请输入个人博客",
        required: false,
        value: baseInfo.website,
      },
      {
        label: "Github（选填）",
        name: "github",
        type: "url",
        placeholder: "请输入Github",
        required: false,
        value: baseInfo.github,
      },
      {
        label: "性别",
        name: "gender",
        type: "select",
        placeholder: "请选择性别",
        required: true,
        value: baseInfo.gender,
        options: [
          {
            value: "1",
            label: "男",
          },
          {
            value: "0",
            label: "女",
          },
        ],
      },
      {
        label: "学历",
        name: "education",
        type: "text",
        placeholder: "请输入学历",
        required: true,
        value: baseInfo.education,
      },
      {
        label: "微信（选填）",
        name: "weixin",
        type: "text",
        placeholder: "请输入微信",
        required: true,
        value: baseInfo.weixin,
      },
      {
        label: "工作经验（年）",
        name: "experience",
        type: "number",
        placeholder: "请输入工作经验",
        required: true,
        value: baseInfo.experience,
      },
      {
        label: "出生日期",
        name: "birthday",
        type: "date",
        placeholder: "请选择出生日期",
        required: true,
        value: baseInfo.birthday,
      },
      {
        label: "开始工作时间",
        name: "startWorkDate",
        type: "date",
        placeholder: "请选择开始工作时间",
        required: true,
        value: baseInfo.startWorkDate,
      },
    ];
  }, [baseInfo]);

  return (
    <CardContent title="基本信息" showDelete={false}>
      <CardGrid>
        {baseInfoList.map((item) => (
          <InputControl
            key={item.name}
            item={item}
            placeholder={item.placeholder}
            updateValue={(value) =>
              updateObject("baseInfo", { [item.name]: value })
            }
          />
        ))}
      </CardGrid>
    </CardContent>
  );
};

export default BaseInfo;
