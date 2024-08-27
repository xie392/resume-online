"use client";

import { useCallback, useMemo } from "react";
import BaseInfo from "./content/base-info";
import EducationList from "./content/education-list";
import WorkList from "./content/work-list";
import ProjectList from "./content/project-list";
import SkillList from "./content/skill-list";

import CardHeader from "./common/card-header";
import { useResumeStore } from "@/stores/resume";
import { Nav } from "@/lib/constants";

const map = new Map<Nav, () => JSX.Element>([
  [Nav.BaseInfo, BaseInfo],
  [Nav.EducationExp, EducationList],
  [Nav.WorkExp, WorkList],
  [Nav.ProjectsExp, ProjectList],
  [Nav.SkillExp, SkillList],
]);

const ResumeCard = () => {
  const items = useResumeStore((state) =>
    state.find("1")?.navItems?.sort((a, b) => a.order - b.order)
  );

  const renderContent = useCallback((key: Nav) => {
    const Component = map.get(key);
    if (Component) {
      return <Component />;
    }
    return null;
  }, []);

  return (
    <div className="flex flex-col w-full px-6">
      {items &&
        items.map((item) => (
          <div className="py-5" key={item.title}>
            <CardHeader
              title={item.title}
              showDelete={item.name !== Nav.BaseInfo}
            />
            <div className="py-3 w-full">{renderContent(item.name)}</div>
          </div>
        ))}
    </div>
  );
};

export default ResumeCard;
