"use client";

import {
  aiContestCards,
  dailyCurations,
  featuredCards,
} from "@/lib/data";
import { allHackathonProducts } from "@/lib/hackathons";
import { inspirationSources } from "@/lib/sources";
import { ViewDensityMode, WingId } from "@/lib/filters";

const wingTabs: { id: WingId; label: string; count: number }[] = [
  {
    id: "all",
    label: "全部展区",
    count:
      dailyCurations.length +
      featuredCards.length +
      allHackathonProducts.length +
      aiContestCards.length +
      inspirationSources.length,
  },
  { id: "daily-curations", label: "01 每日漫游", count: dailyCurations.length },
  { id: "featured", label: "02 常设画廊", count: featuredCards.length },
  { id: "hackathons", label: "03 极客造物", count: allHackathonProducts.length },
  { id: "ai-contests", label: "04 算法美学", count: aiContestCards.length },
  { id: "sources", label: "05 信源图谱", count: inspirationSources.length },
];

interface QuickViewToolbarProps {
  activeWing: WingId;
  onSelectWing: (wing: WingId) => void;
  favoritesOnly: boolean;
  onToggleFavoritesOnly: () => void;
  savedCount: number;
  viewMode: ViewDensityMode;
  onChangeViewMode: (mode: ViewDensityMode) => void;
}

export default function QuickViewToolbar({
  activeWing,
  onSelectWing,
  favoritesOnly,
  onToggleFavoritesOnly,
  savedCount,
  viewMode,
  onChangeViewMode,
}: QuickViewToolbarProps) {
  return (
    <section
      aria-label="快捷浏览与视图控制栏"
      className="sticky top-[114px] sm:top-[146px] xl:top-[102px] z-30 bg-surface/95 backdrop-blur-md border-b border-border px-6 lg:px-12 py-3 shadow-[0_4px_20px_rgba(20,19,18,0.04)]"
    >
      <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        {/* Wing Focus Switcher */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0">
          <span className="text-[11px] font-mono-meta text-muted mr-1.5 shrink-0 hidden sm:inline">
            展区聚焦：
          </span>
          {wingTabs.map((tab) => {
            const active = activeWing === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                aria-pressed={active}
                onClick={() => onSelectWing(tab.id)}
                className={`shrink-0 inline-flex items-center gap-1.5 h-8 px-3 rounded-full text-xs font-medium border transition-all cursor-pointer ${
                  active
                    ? "bg-dark text-surface border-dark shadow-xs"
                    : "bg-bg-light text-secondary border-border hover:border-dark/40 hover:text-dark"
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] font-mono-meta ${
                    active ? "opacity-80" : "text-muted"
                  }`}
                >
                  ({tab.count})
                </span>
              </button>
            );
          })}
        </div>

        {/* Right Controls: Favorites-Only Filter + View Density Toggle */}
        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <button
            type="button"
            aria-pressed={favoritesOnly}
            onClick={onToggleFavoritesOnly}
            className={`inline-flex items-center gap-1.5 h-8 px-3.5 rounded-full text-xs font-medium border transition-all cursor-pointer ${
              favoritesOnly
                ? "bg-accent text-white border-accent shadow-xs font-semibold"
                : "bg-bg-light text-secondary border-border hover:border-accent hover:text-accent"
            }`}
          >
            <span>{favoritesOnly ? "♥ 只看已收藏" : "♡ 只看已收藏"}</span>
            <span
              className={`text-[10px] font-mono-meta px-1.5 rounded-full ${
                favoritesOnly
                  ? "bg-white/20 text-white"
                  : "bg-bg-card text-muted"
              }`}
            >
              {savedCount}
            </span>
          </button>

          <div
            role="group"
            aria-label="视图密度切换"
            className="inline-flex items-center p-0.5 rounded-full bg-bg-card border border-border"
          >
            <button
              type="button"
              aria-pressed={viewMode === "comfort"}
              onClick={() => onChangeViewMode("comfort")}
              className={`h-7 px-3 rounded-full text-xs font-medium transition-colors cursor-pointer ${
                viewMode === "comfort"
                  ? "bg-surface text-dark shadow-2xs"
                  : "text-muted hover:text-dark"
              }`}
            >
              舒适视图
            </button>
            <button
              type="button"
              aria-pressed={viewMode === "compact"}
              onClick={() => onChangeViewMode("compact")}
              className={`h-7 px-3 rounded-full text-xs font-medium transition-colors cursor-pointer ${
                viewMode === "compact"
                  ? "bg-surface text-dark shadow-2xs"
                  : "text-muted hover:text-dark"
              }`}
            >
              紧凑列表
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
