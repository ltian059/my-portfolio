"use client";

import { usePathname } from "next/navigation";
import SideNav from "./side-nav";
import { sideNavByPath } from "../data/side-nav";

export default function SideNavContainer() {
  const pathname = usePathname();
  const config = sideNavByPath[pathname];

  if (!config || config.items.length === 0) return null;

  return (
    <div className="pointer-events-none fixed left-6 top-24 z-40 hidden md:block">
      <div className="pointer-events-auto">
        <SideNav title={config.title} items={config.items} />
      </div>
    </div>
  );
}
