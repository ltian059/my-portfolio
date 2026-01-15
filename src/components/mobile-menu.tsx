"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import ThemeToggle from "./theme-toggle";
import { headerLinks, headerNavItems } from "@/data/pages/layout/nav";

export default function MobileMenu() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const CLOSE_DURATION_MS = 300;
  const activeHref =
    headerNavItems.find((item) =>
      item.href === "/" ? pathname === "/" : pathname?.startsWith(item.href)
    )?.href ?? "/";

  const openMenu = useCallback(() => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    setIsVisible(true);
    requestAnimationFrame(() => setIsOpen(true));
  }, []);

  const closeMenu = useCallback(() => {
    setIsOpen(false);
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    closeTimerRef.current = setTimeout(() => {
      setIsVisible(false);
    }, CLOSE_DURATION_MS);
  }, []);

  useEffect(() => {
    closeMenu();
  }, [pathname, closeMenu]);

  useEffect(() => {
    if (!isVisible) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenu();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isVisible, closeMenu]);

  useEffect(() => {
    if (!isVisible) return;
    const html = document.documentElement;
    const previous = html.style.overflow;
    html.style.overflow = "hidden";
    return () => {
      html.style.overflow = previous;
    };
  }, [isVisible]);

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    };
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={() => {
          if (!isVisible) {
            openMenu();
            return;
          }
          if (isOpen) {
            closeMenu();
          } else {
            openMenu();
          }
        }}
        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-black/[.08] text-zinc-700 hover:bg-black/[.04] dark:border-white/[.145] dark:text-zinc-200 dark:hover:bg-white/[.06]"
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {isOpen ? (
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          >
            <path d="M6 6l12 12" />
            <path d="M18 6l-12 12" />
          </svg>
        ) : (
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          >
            <path d="M4 6h16" />
            <path d="M4 12h16" />
            <path d="M4 18h10" />
          </svg>
        )}
      </button>
      {isVisible && typeof document !== "undefined"
        ? createPortal(
            <div
              className={`fixed inset-x-0 bottom-0 top-[72px] z-30 bg-white text-zinc-900 transition-opacity duration-300 ease-out dark:bg-[#202126] dark:text-zinc-100 ${
                isOpen ? "opacity-100" : "pointer-events-none opacity-0"
              }`}
            >
              <div
                className={`flex h-full flex-col transition-transform duration-300 ease-out ${
                  isOpen ? "translate-y-0" : "-translate-y-2"
                }`}
              >
                <nav className="flex-1 w-full bg-white px-6 py-6 dark:bg-[#1b1b1f]">
                  <div className="space-y-4">
                    {headerNavItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={closeMenu}
                        className={`flex items-center justify-between border-b border-black/[.08] pb-3 text-base font-medium text-zinc-800 transition hover:text-emerald-600 dark:border-white/[.12] dark:text-zinc-100 dark:hover:text-emerald-300 ${
                          activeHref === item.href ? "text-emerald-700" : ""
                        }`}
                      >
                        {item.label}
                        <span className="text-xs text-zinc-400"></span>
                      </Link>
                    ))}
                  </div>
                </nav>
                <div className="border-t border-black/[.08] bg-white px-6 py-6 text-center dark:border-white/[.12] dark:bg-[#202126]">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
                    Appearance
                  </p>
                  <div className="mt-4 flex justify-center">
                    <ThemeToggle />
                  </div>
                </div>
                <div className="mt-auto bg-white px-6 pb-8 dark:bg-[#202126]">
                  <div className="flex items-center justify-center gap-4">
                    <a
                      href={headerLinks.githubHref}
                      target="blank"
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/[.08] text-zinc-700 hover:bg-black/[.04] dark:border-white/[.145] dark:text-zinc-200 dark:hover:bg-white/[.06]"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                        className="h-5 w-5 fill-current"
                      >
                        <path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.52 2.87 8.36 6.84 9.71.5.1.68-.22.68-.48 0-.24-.01-.88-.01-1.72-2.78.62-3.37-1.38-3.37-1.38-.45-1.18-1.11-1.49-1.11-1.49-.91-.64.07-.63.07-.63 1.01.07 1.54 1.07 1.54 1.07.9 1.6 2.36 1.14 2.94.87.09-.67.35-1.14.63-1.4-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.27 2.75 1.05a9.3 9.3 0 0 1 2.5-.35c.85 0 1.7.12 2.5.35 1.9-1.32 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.8-4.57 5.05.36.32.68.95.68 1.92 0 1.39-.01 2.5-.01 2.85 0 .27.18.59.69.48A10.12 10.12 0 0 0 22 12.26C22 6.58 17.52 2 12 2z" />
                      </svg>
                    </a>
                    <a
                      href={headerLinks.linkedinHref}
                      target="blank"
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/[.08] text-[#0a66c2] hover:bg-black/[.04] dark:border-white/[.145] dark:text-[#0a66c2] dark:hover:bg-white/[.06]"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                        className="h-5 w-5 fill-current"
                      >
                        <path d="M19 3A2 2 0 0 1 21 5v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14zm-9.5 7.5H7V18h2.5v-7.5zM8.25 6.5A1.5 1.5 0 1 0 8.25 9a1.5 1.5 0 0 0 0-3zm9.25 4.5c-1.2 0-2.1.5-2.5 1.2V10h-2.4v8h2.5v-4.2c0-1.2.7-2 1.8-2 1 0 1.5.7 1.5 2V18H20v-4.6c0-2.4-1.3-3.9-3.5-3.9z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>,
            document.body
          )
        : null}
    </>
  );
}
