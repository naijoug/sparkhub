"use client";

import { SearchTelemetryStats } from "@/lib/useExhibitionFilters";

interface SearchTelemetryBarProps {
  searchQuery: string;
  stats: SearchTelemetryStats;
  onNavigateSection: (sectionId: string) => void;
  onResetSearch: () => void;
}

export default function SearchTelemetryBar({
  searchQuery,
  stats,
  onNavigateSection,
  onResetSearch,
}: SearchTelemetryBarProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="bg-[#181615] text-[#F6F2E9] border-b border-border px-6 lg:px-12 py-3"
    >
      <div className="max-w-[1440px] mx-auto flex flex-wrap items-center justify-between gap-3 text-xs font-mono-meta">
        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-1.5 text-[#F9EAE6]">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <span>ARCHIVE FILTER ACTIVE</span>
          </span>
          <span className="text-white/40">|</span>
          <span>
            关键词 “<strong className="text-white">{searchQuery}</strong>” 共命中{" "}
            <strong className="text-[#F9EAE6]">{stats.total}</strong> 项馆藏：
          </span>
          <a
            href="#daily-curations"
            onClick={() => onNavigateSection("daily-curations")}
            className="hover:text-[#F9EAE6] transition-colors underline underline-offset-4"
          >
            漫游志 [{stats.dailyCount}]
          </a>
          <a
            href="#featured"
            onClick={() => onNavigateSection("featured")}
            className="hover:text-[#F9EAE6] transition-colors underline underline-offset-4"
          >
            常设展 [{stats.featuredCount}]
          </a>
          <a
            href="#hackathons"
            onClick={() => onNavigateSection("hackathons")}
            className="hover:text-[#F9EAE6] transition-colors underline underline-offset-4"
          >
            黑客松 [{stats.hackathonCount}]
          </a>
          <a
            href="#ai-contests"
            onClick={() => onNavigateSection("ai-contests")}
            className="hover:text-[#F9EAE6] transition-colors underline underline-offset-4"
          >
            AI 特展 [{stats.aiCount}]
          </a>
          <a
            href="#sources"
            onClick={() => onNavigateSection("sources")}
            className="hover:text-[#F9EAE6] transition-colors underline underline-offset-4"
          >
            信源图谱 [{stats.sourceCount}]
          </a>
        </div>

        <button
          type="button"
          onClick={onResetSearch}
          className="px-2.5 py-1 rounded-full border border-white/25 hover:border-white text-[10px] text-white/85 hover:text-white cursor-pointer transition-colors"
        >
          RESET FILTER · 重置检索 ✕
        </button>
      </div>
    </div>
  );
}
