import { ResumeContext } from "@/context/resume-context";
import { useContext, useMemo } from "react";
import Avatar from "./material/avatar";
import { useConfigStore } from "@/stores/config";
import { calculateAge, cn, getYear, getYearMonth } from "@/lib/utils";
import { Align } from "@/lib/constants";
import "@wangeditor/editor/dist/css/style.css";
import "@/styles/rich-text.css";
import React from "react";

interface TemplateProps extends React.HTMLAttributes<HTMLDivElement> {}

const Template = React.forwardRef<HTMLDivElement, TemplateProps>(
  ({ className, ...props }, ref) => {
    const { baseInfo, educationExp, advantage, workExp, projectExp } =
      useContext(ResumeContext);
    const { align, fontSize, fontFamily, padding, rowGap } = useConfigStore();

    return (
      <div
        className={cn("text-inherit flex flex-col gap-y-8", className)}
        style={{ fontSize, fontFamily, padding, rowGap }}
        ref={ref}
        {...props}
      >
        {/* 基本信息 */}
        <div className="flex whitespace-nowrap">
          <div
            className={cn("flex-1 flex flex-col gap-y-2.5", {
              "justify-start": align === Align.Left,
              "justify-center": align === Align.Center,
              "justify-end": align === Align.Right,
            })}
          >
            <div className="flex gap-x-1 whitespace-nowrap">
              {baseInfo.name && (
                <span className="pr-1 border-r border-r-black/20 whitespace-nowrap">
                  {baseInfo.name}
                </span>
              )}

              {baseInfo.birthday && (
                <span className="pr-1 border-r border-r-black/20 whitespace-nowrap">
                  {calculateAge(baseInfo.birthday)}岁
                </span>
              )}

              {baseInfo.phone && (
                <span className="pr-1 border-r border-r-black/20 last:border-r-transparent whitespace-nowrap">
                  {baseInfo.phone}
                </span>
              )}

              {baseInfo.email && (
                <span className="pr-1 whitespace-nowrap">{baseInfo.email}</span>
              )}
            </div>

            <div className="flex gap-x-1">
              {baseInfo.education && (
                <span className="pr-1 border-r border-r-black/20">
                  学历：{baseInfo.education}
                </span>
              )}

              {baseInfo.experience && (
                <span className="pr-1 border-r border-r-black/20">
                  工作经验：{baseInfo.experience}年
                </span>
              )}

              {baseInfo.weixin && (
                <span className="pr-1">微信：{baseInfo.weixin}</span>
              )}
            </div>

            <div className="flex gap-x-1">
              {baseInfo.website && (
                <span className="pr-1">博客：{baseInfo.website}</span>
              )}
            </div>
          </div>
          <div className="flex items-center justify-center">
            <Avatar
              src={baseInfo.avatar || ""}
              size={70}
              type="square"
              alt={baseInfo.name}
            />
          </div>
        </div>

        {/* 教育经历 */}
        <div className="flex flex-col">
          <h2 className="text-base font-bold mb-3">教育经历</h2>
          {educationExp?.map((item) => (
            <div className="flex flex-col gap-y-2" key={item.school}>
              <div className="flex justify-between">
                <div className="font-semibold">{item.school}</div>
                <div>{item.major}</div>
                <div>
                  {getYear(item.start)} - {getYear(item.end)}
                </div>
              </div>

              <div
                className="rich-text"
                dangerouslySetInnerHTML={{
                  __html: item.schoolExperience ?? "",
                }}
              />
            </div>
          ))}
        </div>

        {/* 个人优势 */}
        <div className="flex flex-col">
          <h2 className="text-base font-bold mb-3">个人优势</h2>
          <div
            className="rich-text"
            dangerouslySetInnerHTML={{ __html: advantage.description }}
          />
        </div>

        {/* 工作经历 */}
        <div className="flex flex-col">
          <h2 className="text-base font-bold mb-3">工作经历</h2>
          {workExp?.map((item) => (
            <div className="flex flex-col gap-y-2" key={item.company}>
              <div className="flex justify-between">
                <div className="font-semibold">{item.company}</div>
                <div>{item.position}</div>
                <div>
                  {getYearMonth(item.start)} - {getYearMonth(item.end)}
                </div>
              </div>

              <div
                className="rich-text"
                dangerouslySetInnerHTML={{ __html: item.description }}
              />
            </div>
          ))}
        </div>

        {/* 项目经历 */}
        <div className="flex flex-col">
          <h2 className="text-base font-bold mb-3">项目经历</h2>
          {projectExp?.map((item) => (
            <div className="flex flex-col gap-y-2 mb-3" key={item.name}>
              <div className="flex justify-between">
                <div className="font-semibold">{item.name}</div>
                <div>{item.roleName}</div>
                <div>
                  {getYearMonth(item.start)} - {getYearMonth(item.end)}
                </div>
              </div>

              <div
                className="rich-text"
                dangerouslySetInnerHTML={{ __html: item.description }}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
);

Template.displayName = "Template";

export default Template;
