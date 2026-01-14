"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import SideNav from "./side-nav";
import { sideNavByPath } from "../data/side-nav";

const STORAGE_KEY_WIDTH = "sideNavWidth";
const STORAGE_KEY_COLLAPSED = "sideNavCollapsed";
const MIN_WIDTH = 180;
const MAX_WIDTH_RATIO = 0.2;

export default function SideNavContainer() {
  const pathname = usePathname();
  const config = sideNavByPath[pathname];
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [width, setWidth] = useState(224);
  const [collapsed, setCollapsed] = useState(false);
  const [hasStoredCollapsed, setHasStoredCollapsed] = useState(false);
  const [viewportWidth, setViewportWidth] = useState(0);

  if (!config || config.items.length === 0) return null;

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleResize = () => setViewportWidth(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxWidth = useMemo(() => {
    if (!viewportWidth) return MIN_WIDTH;
    return Math.max(MIN_WIDTH, Math.floor(viewportWidth * MAX_WIDTH_RATIO));
  }, [viewportWidth]);

  useEffect(() => {
    if (!maxWidth) return;
    setWidth((prev) => Math.min(Math.max(prev, MIN_WIDTH), maxWidth));
  }, [maxWidth]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const savedWidth = window.localStorage.getItem(STORAGE_KEY_WIDTH);
    const savedCollapsed = window.localStorage.getItem(STORAGE_KEY_COLLAPSED);
    if (savedWidth) {
      const parsed = Number(savedWidth);
      if (!Number.isNaN(parsed)) setWidth(parsed);
    }
    if (savedCollapsed === "true" || savedCollapsed === "false") {
      setCollapsed(savedCollapsed === "true");
      setHasStoredCollapsed(true);
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(STORAGE_KEY_WIDTH, String(width));
  }, [width]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(STORAGE_KEY_COLLAPSED, String(collapsed));
  }, [collapsed]);

  useEffect(() => {
    if (hasStoredCollapsed || !viewportWidth) return;
    if (viewportWidth < 768) setCollapsed(true);
  }, [hasStoredCollapsed, viewportWidth]);

  const startResize = (event: React.MouseEvent<HTMLDivElement>) => {
    if (collapsed) return;
    event.preventDefault();
    const onMove = (moveEvent: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const nextWidth = Math.min(
        Math.max(moveEvent.clientX - rect.left, MIN_WIDTH),
        maxWidth
      );
      setWidth(nextWidth);
    };
    const onUp = () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  };

  const toggleCollapsed = () => {
    setCollapsed((prev) => !prev);
  };

  const openNav = () => setCollapsed(false);
  const closeNav = () => setCollapsed(true);

  return (
    <>
      <div
        ref={containerRef}
        className="pointer-events-none fixed left-6 top-24 z-40 hidden md:block"
        style={{ width: collapsed ? 0 : width }}
      >
        {!collapsed ? (
          <div className="pointer-events-auto relative">
            <SideNav
              title={config.title}
              items={config.items}
              showCollapse
              onCollapse={closeNav}
              collapseLabel="<<"
              className="h-full"
            />
            <div
              role="separator"
              aria-orientation="vertical"
              onMouseDown={startResize}
              className="absolute -right-2 top-0 h-full w-4 cursor-col-resize"
            />
          </div>
        ) : null}
      </div>

      {collapsed ? (
        <button
          type="button"
          onClick={openNav}
          className="fixed left-4 top-24 z-50 inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/[.08] bg-white/80 text-zinc-700 shadow-sm hover:bg-white dark:border-white/[.145] dark:bg-black/50 dark:text-zinc-200"
          aria-label="Open sidebar"
        >
          ☰
        </button>
      ) : null}

      {!collapsed ? (
        <div className="pointer-events-none fixed inset-0 z-50 md:hidden">
          <div className="pointer-events-auto h-full w-full bg-white/95 p-6 text-zinc-700 dark:bg-black/90 dark:text-zinc-200">
            <SideNav
              title={config.title}
              items={config.items}
              showCollapse
              onCollapse={closeNav}
              collapseLabel="<<"
              headerClassName="flex items-center gap-20"
              className="border-none bg-transparent px-0"
            />
          </div>
        </div>
      ) : null}
    </>
  );
}
