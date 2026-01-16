"use client";

import { useEffect, useRef, useState } from "react";

const STORAGE_KEY = "theme";
const THEME_CHANGE_EVENT = "theme-change";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

type Theme = "light" | "dark";

function parseTheme(value: string | null): Theme | null {
  if (value === "light" || value === "dark") return value;
  return null;
}

function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "light";
  const stored = parseTheme(window.localStorage.getItem(STORAGE_KEY));
  if (stored) return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function setThemeCookie(theme: Theme) {
  document.cookie = `theme=${theme}; Path=/; Max-Age=${COOKIE_MAX_AGE}; SameSite=Lax`;
}

type ThemeToggleProps = {
  initialTheme?: Theme;
};

export default function ThemeToggle({ initialTheme }: ThemeToggleProps) {
  const resolvedInitialTheme =
    initialTheme === "light" || initialTheme === "dark" ? initialTheme : undefined;
  const hasInitialTheme = resolvedInitialTheme !== undefined;
  const [theme, setTheme] = useState<Theme>(() => {
    if (resolvedInitialTheme) return resolvedInitialTheme;
    if (typeof document === "undefined") return "light";
    return document.documentElement.classList.contains("dark")
      ? "dark"
      : getInitialTheme();
  });
  const themeRef = useRef<Theme>(theme);
  const didInitRef = useRef(false);
  const didSyncRef = useRef(false);

  useEffect(() => {
    themeRef.current = theme;
    const root = document.documentElement;
    const rootTheme: Theme = root.classList.contains("dark") ? "dark" : "light";
    if (!didSyncRef.current) {
      didSyncRef.current = true;
      if (hasInitialTheme && rootTheme !== theme) {
        setTheme(rootTheme);
        return;
      }
    }
    const isDark = root.classList.contains("dark");
    if (isDark !== (theme === "dark")) {
      root.classList.toggle("dark", theme === "dark");
    }
    root.style.colorScheme = theme;
    window.localStorage.setItem(STORAGE_KEY, theme);
    setThemeCookie(theme);
    if (didInitRef.current) {
      window.dispatchEvent(
        new CustomEvent<Theme>(THEME_CHANGE_EVENT, { detail: theme })
      );
    } else {
      didInitRef.current = true;
    }
  }, [theme, hasInitialTheme]);

  useEffect(() => {
    const onStorage = (event: StorageEvent) => {
      if (event.key !== STORAGE_KEY) return;
      const nextTheme = parseTheme(event.newValue);
      if (!nextTheme || nextTheme === themeRef.current) return;
      setTheme(nextTheme);
    };

    const onThemeChange = (event: Event) => {
      const nextTheme = (event as CustomEvent<Theme>).detail;
      if (!nextTheme || nextTheme === themeRef.current) return;
      setTheme(nextTheme);
    };

    window.addEventListener("storage", onStorage);
    window.addEventListener(THEME_CHANGE_EVENT, onThemeChange);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener(THEME_CHANGE_EVENT, onThemeChange);
    };
  }, []);

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
