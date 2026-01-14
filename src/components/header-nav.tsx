"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function HeaderNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-1 items-center justify-center gap-6 text-sm text-zinc-500 dark:text-zinc-300">
      <Link
        href="/notes"
        className={`rounded-full px-3 py-1 transition ${
          pathname?.startsWith("/notes")
            ? "bg-emerald-100 text-emerald-900 dark:bg-emerald-400/15 dark:text-emerald-100"
            : "hover:text-zinc-900 dark:hover:text-zinc-100"
        }`}
      >
        Notes
      </Link>
      <Link
        href="/experience"
        className={`rounded-full px-3 py-1 transition ${
          pathname?.startsWith("/experience")
            ? "bg-emerald-100 text-emerald-900 dark:bg-emerald-400/15 dark:text-emerald-100"
            : "hover:text-zinc-900 dark:hover:text-zinc-100"
        }`}
      >
        Experience
      </Link>
    </nav>
  );
}
