"use client";

import { baseNavRoutes } from "@/config/config";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

const NavHeader = () => {
  const path = usePathname();

  const isShowNav = useMemo<boolean>(
    () => baseNavRoutes.includes(path),
    [path]
  );

  return (
    <div className={cn("bg-frosted sticky top-0 z-50", { hidden: !isShowNav })}>
      <div className="h-16 max-container flex items-center justify-between px-6">
        111
      </div>
    </div>
  );
};

export default NavHeader;
