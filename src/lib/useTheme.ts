"use client";

import { useSyncExternalStore } from "react";

export type ThemeMode = "light" | "dark";

const THEME_STORAGE_KEY = "sparkhub:theme";
const THEME_CHANGE_EVENT = "sparkhub:theme-change";
let memoryTheme: ThemeMode | null = null;

function resolveBrowserTheme(): ThemeMode {
  if (typeof window === "undefined") return "light";
  const attr = document.documentElement.getAttribute("data-theme");
  if (attr === "dark" || attr === "light") return attr;
  if (memoryTheme) return memoryTheme;
  try {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === "dark" || stored === "light") return stored;
  } catch {
    // Ignore storage access errors
  }
  if (window.matchMedia?.("(prefers-color-scheme: dark)").matches) {
    return "dark";
  }
  return "light";
}

function applyDocumentTheme(theme: ThemeMode) {
  if (typeof document === "undefined") return;
  document.documentElement.setAttribute("data-theme", theme);
  document.documentElement.classList.toggle("dark", theme === "dark");
}

function getSnapshot(): ThemeMode {
  return resolveBrowserTheme();
}

function getServerSnapshot(): ThemeMode {
  return "light";
}

function subscribe(onChange: () => void) {
  if (typeof window === "undefined") return () => {};
  // Ensure DOM attribute matches resolved theme on mount
  applyDocumentTheme(resolveBrowserTheme());

  const onStorage = (event: StorageEvent) => {
    if (event.key === THEME_STORAGE_KEY || event.key === null) {
      applyDocumentTheme(resolveBrowserTheme());
      onChange();
    }
  };
  const media = window.matchMedia?.("(prefers-color-scheme: dark)");
  const onMediaChange = () => {
    try {
      const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
      if (stored !== "dark" && stored !== "light") {
        applyDocumentTheme(media.matches ? "dark" : "light");
        onChange();
      }
    } catch {
      // Ignore storage error
    }
  };

  window.addEventListener("storage", onStorage);
  window.addEventListener(THEME_CHANGE_EVENT, onChange);
  media?.addEventListener?.("change", onMediaChange);

  return () => {
    window.removeEventListener("storage", onStorage);
    window.removeEventListener(THEME_CHANGE_EVENT, onChange);
    media?.removeEventListener?.("change", onMediaChange);
  };
}

export function setThemeMode(next: ThemeMode) {
  memoryTheme = next;
  applyDocumentTheme(next);
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, next);
  } catch {
    // Keep session theme in memory if localStorage is blocked
  }
  window.dispatchEvent(new Event(THEME_CHANGE_EVENT));
}

export function useTheme() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return {
    theme,
    isDark: theme === "dark",
    setTheme: setThemeMode,
    toggleTheme() {
      const current = resolveBrowserTheme();
      setThemeMode(current === "dark" ? "light" : "dark");
    },
  };
}

