"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Notes", href: "/notes" },
  { label: "Experience", href: "/experience" },
];

export default function HeaderNav() {
  const pathname = usePathname();
  const router = useRouter();
  // Resolve the current top-level route for highlights and mobile select.
  const activeHref =
    NAV_ITEMS.find((item) =>
      item.href === "/" ? pathname === "/" : pathname?.startsWith(item.href)
    )?.href ?? "/";

  // Mobile dropdown state for custom-styled menu.
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Close dropdown when the route changes.
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Close dropdown on outside click or Escape key.
  useEffect(() => {
    const onPointerDown = (event: PointerEvent) => {
      if (!dropdownRef.current) return;
      if (dropdownRef.current.contains(event.target as Node)) return;
      setIsOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return (
    <div className="flex flex-1 items-center justify-center">
      {/* Desktop navigation links. */}
      <nav className="hidden items-center justify-center gap-6 text-sm text-zinc-500 dark:text-zinc-300 sm:flex">
        {NAV_ITEMS.filter((item) => item.href !== "/").map((item) => (
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

      {/* Mobile dropdown for quick page switching. */}
      <div
        ref={dropdownRef}
        className="relative w-full max-w-[12rem] sm:hidden"
      >
        <button
          type="button"
          onClick={() => setIsOpen((open) => !open)}
          className="w-full rounded-full border border-emerald-300/80 bg-white/95 px-4 py-2 pr-10 text-left text-sm font-semibold text-zinc-900 shadow-[0_6px_18px_rgba(16,185,129,0.18)] backdrop-blur transition hover:border-emerald-400 hover:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-300/70 dark:border-emerald-400/50 dark:bg-white/[.08] dark:text-zinc-100 dark:hover:bg-white/[.12] dark:hover:border-emerald-300/80 dark:focus:ring-emerald-400/50"
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        >
          {NAV_ITEMS.find((item) => item.href === activeHref)?.label ?? "Home"}
        </button>
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-emerald-500 dark:text-emerald-300">
          ▼
        </span>
        {isOpen ? (
          <div className="absolute left-0 right-0 mt-2 rounded-2xl border border-emerald-200/70 bg-white/95 p-2 text-sm text-zinc-800 shadow-xl backdrop-blur dark:border-emerald-400/40 dark:bg-[#1b1b1f] dark:text-zinc-100">
            <ul className="space-y-1" role="listbox">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <button
                    type="button"
                    onClick={() => {
                      // Navigate and close the dropdown immediately.
                      router.push(item.href);
                      setIsOpen(false);
                    }}
                    className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left transition hover:bg-emerald-50 hover:text-emerald-700 dark:hover:bg-emerald-400/10 dark:hover:text-emerald-200 ${
                      activeHref === item.href
                        ? "bg-emerald-100 text-emerald-900 dark:bg-emerald-400/15 dark:text-emerald-100"
                        : ""
                    }`}
                  >
                    <span className="truncate">{item.label}</span>
                    {activeHref === item.href ? (
                      <span className="text-xs">●</span>
                    ) : null}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </div>
  );
}
