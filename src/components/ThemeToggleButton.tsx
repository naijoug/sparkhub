"use client";

import { useTheme } from "@/lib/useTheme";

export default function ThemeToggleButton() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="切换深色或浅色模式"
      title={isDark ? "切换为浅色纸本模式" : "切换为深色暗房模式"}
      className="inline-flex items-center gap-1.5 h-10 px-3 rounded-full border border-border bg-surface hover:border-dark text-xs font-mono-meta text-dark transition-colors cursor-pointer"
    >
      <span aria-hidden="true">{isDark ? "☀️" : "🌙"}</span>
      <span className="hidden md:inline text-[11px]">
        {isDark ? "浅色" : "深色"}
      </span>
    </button>
  );
}
