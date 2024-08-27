"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { X } from "lucide-react";

import { DefaultResume } from "./default";
import { useMemo } from "react";
import ContentEditable from "./content-editable";
import { Button } from "../ui/button";
import BaseInfo from "./content/base-info";
import EducationList from "./content/education-list";
import CardHeader from "./common/card-header";

const resumeItems = [
  { title: "个人信息", component: BaseInfo, order: 1 },
  { title: "教育经历", component: EducationList, order: 2 },
  // { title: "工作经历", component: WorkList, order: 3 },
  // { title: "项目经历", component: ProjectList, order: 4 },
  // { title: "个人优势", component: PersonalAdvantage, order: 5 },
  // { title: "技能清单", component: SkillList, order: 6 }
];

const ResumeCard = () => {
  const resumes = useMemo(
    () => DefaultResume.sort((a, b) => a.order - b.order),
    []
  );
  return (
    <div className="flex flex-col w-full px-6">
      {resumeItems.map((item) => (
        <div className="border-b border-b-gray-200 py-5" key={item.title}>
          <CardHeader title={item.title} />
        </div>
      ))}
    </div>
    // <Card className="bg-background flex-1 max-w-[1000px]">
    //   <CardHeader>
    //     <CardTitle>个人简历</CardTitle>
    //     <CardDescription>
    //       在此处填写个人简历，包括个人信息、工作经历、教育经历、项目经历等。
    //     </CardDescription>
    //   </CardHeader>
    //   <CardContent>
    //     <Accordion type="single" collapsible className="w-full">
    //       {resumes.map((resume) => (
    //         <div
    //           className="group flex w-full relative items-center"
    //           key={resume.title}
    //         >
    //           <AccordionItem
    //             className="flex-1"
    //             value={resume.title}
    //             key={resume.title}
    //           >
    //             <AccordionTrigger>
    //               <h2 className="font-bold">{resume.title}</h2>
    //             </AccordionTrigger>
    //             <AccordionContent>内容</AccordionContent>
    //           </AccordionItem>

    //           <div className="w-[80px]">
    //             <Button
    //               className="absolute top-0 right-0 mr-2"
    //               variant="ghost"
    //               size="sm"
    //             >
    //               <X size={16} />
    //             </Button>
    //           </div>
    //         </div>
    //       ))}
    //     </Accordion>
    //   </CardContent>
    // </Card>
  );
};

export default ResumeCard;
