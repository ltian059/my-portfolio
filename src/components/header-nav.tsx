"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { headerNavItems } from "@/data/pages/layout/nav";

export default function HeaderNav() {
  const pathname = usePathname();
  const activeHref =
    headerNavItems.find((item) =>
      item.href === "/" ? pathname === "/" : pathname?.startsWith(item.href)
    )?.href ?? "/";

  return (
    <div className="flex flex-1 items-center justify-center">
      <nav className="hidden items-center justify-center gap-6 text-sm text-zinc-500 dark:text-zinc-300 sm:flex">
        {headerNavItems
          .filter((item) => item.href !== "/")
          .map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-full px-3 py-1 transition ${
                activeHref === item.href
                  ? "bg-emerald-100 text-emerald-900 dark:bg-emerald-400/15 dark:text-emerald-100"
                  : "hover:text-zinc-900 dark:hover:text-zinc-100"
              }`}
            >
              {item.label}
            </Link>
          ))}
      </nav>
    </div>
  );
}
