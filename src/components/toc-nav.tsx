"use client";

import { useEffect, useState } from "react";

export type TocItem = {
  id: string;
  text: string;
  level: number;
};

type TocNavProps = {
  items: TocItem[];
};

const LEVEL_PADDING: Record<number, string> = {
  1: "pl-0",
  2: "pl-3",
  3: "pl-6",
  4: "pl-9",
  5: "pl-12",
  6: "pl-14",
};

export default function TocNav({ items }: TocNavProps) {
  // Track the currently visible heading to highlight it.
  const [activeId, setActiveId] = useState<string | null>(null);

  // Store resolved DOM targets after the page has rendered headings.
  const [targets, setTargets] = useState<
    { id: string; el: HTMLElement }[]
  >([]);

  useEffect(() => {
    // Resolve heading elements after mount so IDs are available.
    const resolved = items
      .map((item) => ({
        id: item.id,
        el: document.getElementById(item.id),
      }))
      .filter((entry): entry is { id: string; el: HTMLElement } => Boolean(entry.el));
    setTargets(resolved);
  }, [items]);

  // Sync active TOC item based on the heading closest to the top.
  useEffect(() => {
    if (targets.length === 0) return;

    let rafId = 0;
    const TOP_OFFSET = 120;

    const updateActive = () => {
      rafId = 0;
      let current = targets[0]?.id ?? null;
      for (const target of targets) {
        const top = target.el.getBoundingClientRect().top;
        if (top <= TOP_OFFSET) {
          current = target.id;
        } else {
          break;
        }
      }
      if (current) {
        setActiveId(current);
      }
    };

    const onScroll = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(updateActive);
    };

    updateActive();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, [targets]);

  return (
    <nav className="space-y-1 text-sm text-zinc-600 dark:text-zinc-300">
      {items.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          onClick={() => {
            // Immediately reflect the clicked item to avoid perceived lag.
            setActiveId(item.id);
          }}
          className={`block rounded-md px-3 py-1 transition hover:bg-black/[.04] dark:hover:bg-white/[.06] ${
            LEVEL_PADDING[item.level] ?? "pl-0"
          } ${
            activeId === item.id
              ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-200"
              : ""
          }`}
        >
          {item.text}
        </a>
      ))}
    </nav>
  );
}
