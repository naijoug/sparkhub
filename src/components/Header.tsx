"use client";

import { useState } from "react";

const navItems = [
  { no: "01", label: "策展序厅", en: "INDEX", href: "#top", active: true },
  { no: "02", label: "每日漫游", en: "RADAR", href: "#daily-curations" },
  { no: "03", label: "常设画廊", en: "ARCHIVE", href: "#featured" },
  { no: "04", label: "极客造物", en: "HACKATHON", href: "#hackathons" },
  { no: "05", label: "算法美学", en: "SYNTHESIS", href: "#ai-contests" },
];

interface HeaderProps {
  searchQuery?: string;
  onSearchChange?: (value: string) => void;
}

export default function Header({
  searchQuery = "",
  onSearchChange,
}: HeaderProps) {
  const [searchFocused, setSearchFocused] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-bg-light/92 backdrop-blur-md border-b border-border">
      {/* Top Archival Colophon Ribbon */}
      <div className="hidden sm:flex items-center justify-between px-6 lg:px-12 h-8 border-b border-border/75 text-[10px] font-mono-meta text-muted bg-bg-card/65">
        <div className="flex items-center gap-4">
          <span className="text-dark font-semibold">VOL. IV · № 2026.10</span>
          <span className="text-border">|</span>
          <span>DIGITAL ART, DESIGN &amp; POETIC COMPUTING ANTHOLOGY</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden md:inline text-muted/80">
            37.7749° N, 122.4194° W · OPEN ACCESS
          </span>
          <span className="text-border hidden md:inline">|</span>
          <span className="flex items-center gap-2 text-dark">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <span>CURATORIAL RADAR · 每日灵感巡航中</span>
          </span>
        </div>
      </div>

      {/* Main Exhibition Masthead */}
      <div className="flex items-center justify-between h-[70px] px-6 lg:px-12 max-w-[1440px] mx-auto">
        {/* Left: Monograph Title + Numbered Wing Navigation */}
        <div className="flex items-center gap-10">
          <a
            href="#top"
            className="group flex items-center gap-3 select-none"
          >
            <span className="w-7 h-7 rounded-full border border-dark/80 flex items-center justify-center text-[11px] font-editorial italic text-dark group-hover:bg-accent group-hover:border-accent group-hover:text-white transition-colors">
              S
            </span>
            <div className="flex items-baseline gap-2">
              <span className="font-editorial text-2xl sm:text-[26px] font-bold tracking-tight text-dark group-hover:text-accent transition-colors">
                SparkHub
              </span>
              <span className="font-editorial italic text-sm text-secondary border-l border-border pl-2">
                Atelier
              </span>
            </div>
          </a>

          <nav className="hidden xl:flex items-center gap-7" aria-label="主导航">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`group relative flex flex-col py-1 transition-colors ${
                  item.active
                    ? "text-dark"
                    : "text-secondary hover:text-dark"
                }`}
              >
                <span className="text-[9px] font-mono-meta text-muted group-hover:text-accent transition-colors">
                  {item.no} / {item.en}
                </span>
                <span className="text-[13px] font-medium tracking-wide mt-0.5">
                  {item.label}
                </span>
                <span
                  className={`mt-0.5 h-[1.5px] bg-accent transition-all duration-300 ${
                    item.active ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </a>
            ))}
          </nav>
        </div>

        {/* Right: Archival Index Search + Monograph Action */}
        <div className="flex items-center gap-3">
          <div
            className={`flex items-center gap-2.5 w-[210px] sm:w-[275px] h-10 px-3.5 rounded-full border transition-all ${
              searchFocused
                ? "bg-surface border-dark shadow-[0_4px_18px_rgba(20,19,18,0.08)]"
                : "bg-bg-card/75 border-border hover:border-dark/35"
            }`}
          >
            <SearchIcon />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange?.(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Escape" && searchQuery) {
                  onSearchChange?.("");
                }
              }}
              placeholder="检索展品、产品、赛事或标签..."
              aria-label="全馆检索"
              className="flex-1 bg-transparent text-[13px] text-dark placeholder:text-muted outline-none"
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchChange?.("")}
                className="text-[10px] font-mono-meta px-1.5 py-0.5 rounded border border-border bg-bg-light text-muted hover:text-dark hover:border-dark/40 cursor-pointer"
                aria-label="清空搜索"
              >
                ESC
              </button>
            )}
          </div>
          <a
            href="#daily-curations"
            className="hidden sm:inline-flex items-center gap-2 h-10 px-4.5 bg-dark hover:bg-accent text-surface text-[12px] font-mono-meta uppercase rounded-full transition-colors"
          >
            <span>今日特刊</span>
            <span className="text-xs">↗</span>
          </a>
        </div>
      </div>
    </header>
  );
}

function SearchIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 18 18"
      fill="none"
      className="shrink-0"
    >
      <circle
        cx="8"
        cy="8"
        r="5.5"
        stroke="currentColor"
        strokeWidth="1.4"
        className="text-muted"
      />
      <path
        d="M12 12L16 16"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        className="text-muted"
      />
    </svg>
  );
}
