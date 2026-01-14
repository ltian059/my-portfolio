"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "theme";

type Theme = "light" | "dark";

function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "light";
  const stored = window.localStorage.getItem(STORAGE_KEY) as Theme | null;
  if (stored === "light" || stored === "dark") return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const initialTheme = getInitialTheme();
    setTheme(initialTheme);
    document.documentElement.classList.toggle("dark", initialTheme === "dark");
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    window.localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const nextTheme: Theme = theme === "dark" ? "light" : "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(nextTheme)}
      className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-black/[.08] text-zinc-700 hover:bg-black/[.04] dark:border-white/[.145] dark:text-zinc-200 dark:hover:bg-white/[.08]"
      aria-label={`Switch to ${nextTheme} mode`}
    >
      {theme === "dark" ? (
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 3v2" />
          <path d="M12 19v2" />
          <path d="M5 5l1.5 1.5" />
          <path d="M17.5 17.5L19 19" />
          <path d="M3 12h2" />
          <path d="M19 12h2" />
          <path d="M5 19l1.5-1.5" />
          <path d="M17.5 6.5L19 5" />
        </svg>
      ) : (
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 3a7.5 7.5 0 1 0 9 9 8.5 8.5 0 0 1-9-9Z" />
        </svg>
      )}
    </button>
  );
}
