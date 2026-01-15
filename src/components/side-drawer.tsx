"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import SideNav from "./side-nav";
type SideNavConfig = {
  title?: string;
  items: { label: string; href: string }[];
};

type SideNavState = {
  sideNavByPath: Record<string, SideNavConfig>;
};

export default function SideDrawer() {
  const pathname = usePathname();
  // Hide the drawer toggle on large Notes pages where the TOC is always visible.
  const hideOnXl = pathname?.startsWith("/notes/");
  // Holds side nav config fetched from the API.
  const [sideNavState, setSideNavState] = useState<SideNavState | null>(null);
  const config = pathname ? sideNavState?.sideNavByPath[pathname] : undefined;
  // Drawer UI state.
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isEntering, setIsEntering] = useState(false);
  // Tracks which section is currently in view for highlight.
  const [activeHref, setActiveHref] = useState<string | undefined>(undefined);
  // Timer for close animation so we can remove the drawer after it finishes.
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Stores the clicked href so we can navigate after the drawer closes.
  const pendingHrefRef = useRef<string | null>(null);
  const CLOSE_DURATION_MS = 300;

  // Fetch side nav data on mount and when the route changes (client-side).
  useEffect(() => {
    const loadSideNav = async () => {
      const query = pathname ? `?path=${encodeURIComponent(pathname)}` : "";
      const res = await fetch(`/api/sidenav${query}`);
      const data = await res.json();
      setSideNavState(data);
    };
    loadSideNav();
  }, [pathname]);

  // Prevent background scroll when the drawer is open.
  useEffect(() => {
    if (!isOpen) return;
    const html = document.documentElement;
    html.style.overflow = "hidden";
    return () => {
      html.style.overflow = "";
    };
  }, [isOpen]);

  // Cleanup close timer on unmount.
  useEffect(() => {
    return () => {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    };
  }, []);

  // Observe headings to highlight the active section in the side nav.
  useEffect(() => {
    if (!config) return;
    const hashItems = config.items.filter((item) => item.href.startsWith("#"));
    if (hashItems.length === 0) return;

    const elements = hashItems
      .map((item) => {
        // Use getElementById to avoid invalid selector errors for numeric IDs.
        const id = item.href.slice(1);
        return {
          href: item.href,
          el: document.getElementById(id),
        };
      })
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

  // Navigate after closing so the scroll target is not blocked by the open drawer.
  useEffect(() => {
    if (isOpen) return;
    const pendingHref = pendingHrefRef.current;
    if (!pendingHref) return;
    pendingHrefRef.current = null;
    if (pendingHref.startsWith("#")) {
      // Prefer getElementById to avoid selector parsing issues.
      const target = document.getElementById(pendingHref.slice(1));
      if (target instanceof HTMLElement) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      return;
    }
    window.location.href = pendingHref;
  }, [isOpen]);

  // Clear the entering flag after the first animation frame.
  useEffect(() => {
    if (!isOpen || !isEntering) return;
    const id = requestAnimationFrame(() => setIsEntering(false));
    return () => cancelAnimationFrame(id);
  }, [isOpen, isEntering]);

  // Handle item clicks by storing the target and closing the drawer first.
  const handleItemClick = (href: string) => {
    pendingHrefRef.current = href;
    handleClose();
  };

  // Open drawer and start enter animation.
  const handleOpen = () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    setIsClosing(false);
    setIsEntering(true);
    setIsOpen(true);
  };

  // Close drawer and wait for exit animation to finish before unmounting.
  const handleClose = () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    setIsClosing(true);
    closeTimerRef.current = setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
    }, CLOSE_DURATION_MS);
  };


  if (!config || config.items.length === 0) return null;

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
        className={`inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/[.08] text-zinc-700 hover:bg-black/[.04] dark:border-white/[.145] dark:text-zinc-200 dark:hover:bg-white/[.06] ${
          hideOnXl ? "xl:hidden" : ""
        }`}
        aria-label={isOpen ? "Close navigation" : "Open navigation"}
      >
        {isOpen ? "✕" : "☰"}
      </button>

      {typeof document !== "undefined" ? createPortal(drawer, document.body) : null}
    </>
  );
}
