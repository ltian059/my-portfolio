"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import SideNav from "./side-nav";
import type { SideNavConfig } from "../data/sidenav/side-nav";

type SideDrawerProps = {
  sideNavByPath: Record<string, SideNavConfig>;
};

export default function SideDrawer({ sideNavByPath }: SideDrawerProps) {
  const pathname = usePathname();
  const config = pathname ? sideNavByPath[pathname] : undefined;
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isEntering, setIsEntering] = useState(false);
  const [activeHref, setActiveHref] = useState<string | undefined>(undefined);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pendingHrefRef = useRef<string | null>(null);
  const CLOSE_DURATION_MS = 300;

  useEffect(() => {
    if (!isOpen) return;
    const html = document.documentElement;
    html.style.overflow = "hidden";
    return () => {
      html.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    };
  }, []);

  useEffect(() => {
    if (!config) return;
    const hashItems = config.items.filter((item) => item.href.startsWith("#"));
    if (hashItems.length === 0) return;

    const elements = hashItems
      .map((item) => ({
        href: item.href,
        el: document.querySelector(item.href),
      }))
      .filter((entry) => entry.el);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) {
          const id = (visible[0].target as HTMLElement).id;
          setActiveHref(`#${id}`);
        }
      },
      {
        rootMargin: "-20% 0px -60% 0px",
        threshold: [0.1, 0.25, 0.5, 0.75],
      }
    );

    elements.forEach((entry) => observer.observe(entry.el as Element));

    return () => observer.disconnect();
  }, [config]);

  useEffect(() => {
    if (isOpen) return;
    const pendingHref = pendingHrefRef.current;
    if (!pendingHref) return;
    pendingHrefRef.current = null;
    if (pendingHref.startsWith("#")) {
      const target = document.querySelector(pendingHref);
      if (target instanceof HTMLElement) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      return;
    }
    window.location.href = pendingHref;
  }, [isOpen]);

  if (!config || config.items.length === 0) return null;

  const handleItemClick = (href: string) => {
    pendingHrefRef.current = href;
    handleClose();
  };

  const handleOpen = () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    setIsClosing(false);
    setIsEntering(true);
    setIsOpen(true);
  };

  const handleClose = () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    setIsClosing(true);
    closeTimerRef.current = setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
    }, CLOSE_DURATION_MS);
  };

  useEffect(() => {
    if (!isOpen || !isEntering) return;
    const id = requestAnimationFrame(() => setIsEntering(false));
    return () => cancelAnimationFrame(id);
  }, [isOpen, isEntering]);

  const drawer = isOpen ? (
    <div className="fixed inset-0 z-30 pt-16">
      <button
        type="button"
        onClick={handleClose}
        className={`absolute inset-0 bg-[#d1d1d2]/60 transition-opacity duration-300 ease-out dark:bg-[#17171a]/70 ${
          isClosing || isEntering ? "opacity-0" : "opacity-100"
        }`}
        aria-label="Close navigation"
      />
      <div
        className={`relative h-full w-[78vw] max-w-sm overflow-y-auto bg-[#fafafa] p-6 text-zinc-700 shadow-xl transition-transform duration-300 ease-out dark:bg-[#1b1b1f] dark:text-zinc-200 dark:[color-scheme:dark] ${
          isClosing || isEntering ? "-translate-x-full" : "translate-x-0"
        }`}
      >
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">
            {config.title ?? "On this page"}
          </p>
          <button
            type="button"
            onClick={handleClose}
            className="rounded-md px-2 py-1 text-xs text-zinc-500 hover:bg-black/[.04] dark:text-zinc-400 dark:hover:bg-white/[.06]"
            aria-label="Close navigation"
          >
            ✕
          </button>
        </div>
        <div className="mt-4">
          <SideNav
            title={config.title}
            items={config.items}
            className="!border-none !bg-transparent dark:!bg-transparent px-0 py-0"
            headerClassName="hidden"
            onItemClick={handleItemClick}
            activeHref={activeHref}
          />
        </div>
      </div>
    </div>
  ) : null;

  return (
    <>
      <button
        type="button"
        onClick={() => (isOpen ? handleClose() : handleOpen())}
        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/[.08] text-zinc-700 hover:bg-black/[.04] dark:border-white/[.145] dark:text-zinc-200 dark:hover:bg-white/[.06]"
        aria-label={isOpen ? "Close navigation" : "Open navigation"}
      >
        {isOpen ? "✕" : "☰"}
      </button>

      {typeof document !== "undefined" ? createPortal(drawer, document.body) : null}
    </>
  );
}
