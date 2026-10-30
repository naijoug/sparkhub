"use client";

import { useEffect, useState } from "react";
import { useTheme } from "@/lib/useTheme";

const navItems = [
  { no: "01", label: "策展序厅", en: "INDEX", href: "#top", sectionId: "top" },
  {
    no: "02",
    label: "每日漫游",
    en: "RADAR",
    href: "#daily-curations",
    sectionId: "daily-curations",
  },
  {
    no: "03",
    label: "常设画廊",
    en: "ARCHIVE",
    href: "#featured",
    sectionId: "featured",
  },
  {
    no: "04",
    label: "极客造物",
    en: "HACKATHON",
    href: "#hackathons",
    sectionId: "hackathons",
  },
  {
    no: "05",
    label: "算法美学",
    en: "SYNTHESIS",
    href: "#ai-contests",
    sectionId: "ai-contests",
  },
  {
    no: "06",
    label: "信源图谱",
    en: "ATLAS",
    href: "#sources",
    sectionId: "sources",
  },
];

interface HeaderProps {
  searchQuery?: string;
  onSearchChange?: (value: string) => void;
  savedCount?: number;
  onOpenFolio?: () => void;
  onRandomSerendipity?: () => void;
  onNavigateSection?: (sectionId: string) => void;
}

export default function Header({
  searchQuery = "",
  onSearchChange,
  savedCount = 0,
  onOpenFolio,
  onRandomSerendipity,
  onNavigateSection,
}: HeaderProps) {
  const [searchFocused, setSearchFocused] = useState(false);
  const [activeSection, setActiveSection] = useState("top");
  const { isDark, toggleTheme } = useTheme();

  useEffect(() => {
    const elements = navItems
      .map((item) => document.getElementById(item.sectionId))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length > 0) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        rootMargin: "-20% 0px -55% 0px",
        threshold: [0.1, 0.3, 0.6],
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-bg-light/92 backdrop-blur-md border-b border-border">
      {/* Top Archival Colophon Ribbon */}
      <div className="hidden sm:flex items-center justify-between px-6 lg:px-12 h-8 border-b border-border/75 text-[10px] font-mono-meta text-muted bg-bg-card/65">
        <div className="flex items-center gap-4">
          <span className="text-dark font-semibold">VOL. IV · № 2026.10</span>
          <span className="text-border">|</span>
          <span>DIGITAL ART, DESIGN ENGINEERING &amp; POETIC COMPUTING ANTHOLOGY</span>
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
      <div className="flex items-center justify-between h-[70px] px-6 lg:px-12 max-w-[1440px] mx-auto gap-4">
        {/* Left: Monograph Title + Numbered Wing Navigation */}
        <div className="flex items-center gap-8 lg:gap-10">
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
            {navItems.map((item) => {
              const isActive = activeSection === item.sectionId;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => onNavigateSection?.(item.sectionId)}
                  aria-current={isActive ? "location" : undefined}
                  className={`group relative flex flex-col py-1 transition-colors ${
                    isActive
                      ? "text-dark"
                      : "text-secondary hover:text-dark"
                  }`}
                >
                  <span
                    className={`text-[9px] font-mono-meta transition-colors ${
                      isActive
                        ? "text-accent font-semibold"
                        : "text-muted group-hover:text-accent"
                    }`}
                  >
                    {item.no} / {item.en}
                  </span>
                  <span className="text-[13px] font-medium tracking-wide mt-0.5">
                    {item.label}
                  </span>
                  <span
                    className={`mt-0.5 h-[1.5px] bg-accent transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </a>
              );
            })}
          </nav>
        </div>

        {/* Right: Archival Index Search + Folio + Theme + Actions */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Search Bar */}
          <div
            className={`flex items-center gap-2 w-[150px] sm:w-[210px] md:w-[250px] h-10 px-3.5 rounded-full border transition-all ${
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
              placeholder="检索展品、产品、赛事..."
              aria-label="全馆检索"
              className="flex-1 min-w-0 bg-transparent text-[13px] text-dark placeholder:text-muted outline-none"
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

          {/* Random Serendipity Button */}
          {onRandomSerendipity && (
            <button
              type="button"
              onClick={onRandomSerendipity}
              title="灵感漫步 · 随机抽选馆藏"
              className="inline-flex items-center gap-1.5 h-10 px-3 rounded-full border border-border bg-bg-card/65 hover:bg-surface hover:border-dark text-xs font-mono-meta text-dark transition-colors cursor-pointer"
            >
              <span>🎲</span>
              <span className="hidden lg:inline text-[11px]">灵感漫步</span>
            </button>
          )}

          {/* Curatorial Folio / Favorites Modal Button */}
          {onOpenFolio && (
            <button
              type="button"
              onClick={onOpenFolio}
              title="打开我的策展画夹"
              className={`inline-flex items-center gap-1.5 h-10 px-3 sm:px-3.5 rounded-full border text-xs font-mono-meta transition-colors cursor-pointer ${
                savedCount > 0
                  ? "border-accent/45 bg-accent-light/60 text-dark hover:border-accent"
                  : "border-border bg-surface hover:border-dark text-dark"
              }`}
            >
              <span className={savedCount > 0 ? "text-accent" : "text-muted"}>♥</span>
              <span className="hidden sm:inline text-[11px] font-medium">我的收藏</span>
              <span
                className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                  savedCount > 0
                    ? "bg-accent text-white font-semibold"
                    : "bg-bg-card text-muted"
                }`}
              >
                {savedCount}
              </span>
            </button>
          )}

          {/* Theme Toggle (Light / Dark Mode) */}
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

          <a
            href="#daily-curations"
            onClick={() => onNavigateSection?.("daily-curations")}
            className="hidden sm:inline-flex items-center gap-1.5 h-10 px-4 bg-dark hover:bg-accent text-surface hover:text-white text-[12px] font-mono-meta uppercase rounded-full transition-colors"
          >
            <span>今日特刊</span>
            <span className="text-xs">↗</span>
          </a>
        </div>
      </div>

      {/* Responsive Mobile/Tablet Wing Navigation Strip */}
      <nav
        aria-label="移动端展馆导览"
        className="xl:hidden flex items-center gap-2 overflow-x-auto px-6 py-2 border-t border-border/70 bg-surface/60"
      >
        {navItems.map((item) => {
          const isActive = activeSection === item.sectionId;
          return (
            <a
              key={item.sectionId}
              href={item.href}
              onClick={() => onNavigateSection?.(item.sectionId)}
              className={`shrink-0 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs border transition-colors ${
                isActive
                  ? "bg-dark text-surface border-dark"
                  : "bg-bg-light text-secondary border-border"
              }`}
            >
              <span className="text-[10px] font-mono-meta opacity-70">
                {item.no}
              </span>
              <span>{item.label}</span>
            </a>
          );
        })}
      </nav>
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
