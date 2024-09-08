"use client";

import { useCallback, useContext, useMemo } from "react";
import BaseInfo from "./content/base-info";
import EducationList from "./content/education-list";
import WorkList from "./content/work-list";
import ProjectList from "./content/project-list";
import AdvantageList from "./content/advantage-list";

import { Nav } from "@/lib/constants";
import { ResumeContext } from "@/context/resume-context";

const map = new Map<Nav, () => JSX.Element>([
  [Nav.BaseInfo, BaseInfo],
  [Nav.EducationExp, EducationList],
  [Nav.WorkExp, WorkList],
  [Nav.ProjectExp, ProjectList],
  [Nav.Advantage, AdvantageList],
]);

const ResumeCard = () => {
  const { navItems } = useContext(ResumeContext);

  const items = useMemo(
    () => navItems?.sort((a, b) => a.order - b.order),
    [navItems]
  );

  const renderContent = useCallback((key: Nav) => {
    const Component = map.get(key);
    if (Component) {
      return <Component />;
    }
    return null;
  }, []);

  return (
    <form
      className="flex-1 flex flex-col w-full px-6"
      onSubmit={(e) => e.preventDefault()}
    >
      {items &&
        items.map((item) => (
          <div className="py-5 w-full" key={item.title}>
            {renderContent(item.name)}
          </div>
        ))}
    </form>
  );
};

export default ResumeCard;
