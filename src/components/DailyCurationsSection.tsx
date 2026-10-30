"use client";

import { useState } from "react";
import { filterDailyCurations } from "@/lib/filters";
import {
  dailyCurations,
  CurationCategory,
  DailyCurationItem,
} from "@/lib/data";

const filterTabs: { id: CurationCategory; label: string; en: string }[] = [
  { id: "all", label: "全部漫游", en: "ALL DISPATCHES" },
  { id: "product", label: "新锐器物", en: "PRODUCTS" },
  { id: "event", label: "创意聚落", en: "EVENTS & HACKS" },
  { id: "website", label: "独立站点与文献", en: "WEBSITES & ESSAYS" },
];

const accentBadgeStyles: Record<DailyCurationItem["accent"], string> = {
  accent: "bg-accent-light text-accent border-accent/25",
  purple: "bg-purple-light text-purple border-purple/25",
  green: "bg-green-light text-green border-green/25",
  yellow: "bg-yellow-light text-yellow border-yellow/25",
};

const accentBorderHover: Record<DailyCurationItem["accent"], string> = {
  accent: "hover:border-accent/65",
  purple: "hover:border-purple/65",
  green: "hover:border-green/65",
  yellow: "hover:border-yellow/65",
};

const accentStripe: Record<DailyCurationItem["accent"], string> = {
  accent: "bg-accent",
  purple: "bg-purple",
  green: "bg-green",
  yellow: "bg-yellow",
};

interface DailyCurationsSectionProps {
  selectedTab: CurationCategory;
  onSelectTab: (tab: CurationCategory) => void;
  searchQuery?: string;
  onSelectTag?: (tag: string) => void;
  likedIds?: string[];
  onToggleLike?: (id: string) => void;
  onInspectDossier?: (item: DailyCurationItem) => void;
  viewMode?: "comfort" | "compact";
  favoritesOnly?: boolean;
  forceExpanded?: boolean;
}

const INITIAL_VISIBLE_COUNT = 6;

export default function DailyCurationsSection({
  selectedTab,
  onSelectTab,
  searchQuery = "",
  onSelectTag,
  likedIds = [],
  onToggleLike,
  onInspectDossier,
  viewMode = "comfort",
  favoritesOnly = false,
  forceExpanded = false,
}: DailyCurationsSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const baseItems = filterDailyCurations(searchQuery, selectedTab);
  const filteredItems = favoritesOnly
    ? baseItems.filter((item) => likedIds.includes(item.id))
    : baseItems;

  const canCollapse =
    !forceExpanded &&
    selectedTab === "all" &&
    !searchQuery.trim() &&
    !favoritesOnly &&
    filteredItems.length > INITIAL_VISIBLE_COUNT;

  const visibleItems =
    canCollapse && !isExpanded
      ? filteredItems.slice(0, INITIAL_VISIBLE_COUNT)
      : filteredItems;

  const isCompact = viewMode === "compact";

  return (
    <section
      id="daily-curations"
      className="border-b border-border bg-bg-card/50 px-6 lg:px-12 py-16"
    >
      <div className="max-w-[1440px] mx-auto">
        {/* Broadsheet Masthead Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-border">
          <div className="space-y-2.5">
            <div className="flex items-center gap-3 text-[11px] font-mono-meta uppercase text-accent">
              <span className="px-2 py-0.5 rounded bg-accent-light border border-accent/25 font-semibold">
                WING I · 展馆一
              </span>
              <span>DAILY CURATORIAL BROADSHEET</span>
              <span>·</span>
              <span className="text-muted">ISSUE 2026-10-27</span>
            </div>
            <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-dark tracking-tight">
              每日灵感漫游志 ·{" "}
              <span className="italic font-normal text-secondary">
                Dispatches from the Web
              </span>
            </h2>
            <p className="text-sm text-secondary max-w-[720px] leading-relaxed">
              每日从 Product Hunt、Awwwards、Luma、ETHGlobal、21st.dev 与 Cosmos 采撷具有审美张力的实验器物、设计工程范本、跨界聚落与微交互手记。
            </p>
          </div>

          {/* Category filter pills */}
          <div className="flex flex-wrap items-center gap-2">
            {filterTabs.map((tab) => {
              const active = selectedTab === tab.id;
              const count =
                tab.id === "all"
                  ? dailyCurations.length
                  : dailyCurations.filter((i) => i.category === tab.id).length;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => onSelectTab(tab.id)}
                  className={`inline-flex items-center gap-2 h-9 px-4 rounded-full text-xs font-medium border transition-all cursor-pointer ${
                    active
                      ? "bg-dark text-surface border-dark shadow-sm"
                      : "bg-surface text-secondary border-border hover:border-dark/40 hover:text-dark"
                  }`}
                >
                  <span>{tab.label}</span>
                  <span
                    className={`text-[10px] font-mono-meta ${
                      active ? "text-accent-light" : "text-muted"
                    }`}
                  >
                    {tab.en} [{count}]
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Broadsheet Folio Grid */}
        {filteredItems.length === 0 ? (
          <div className="py-14 text-center text-sm text-muted bg-surface rounded-2xl border border-border mt-8">
            {favoritesOnly
              ? "当前漫游志分栏中暂无已收藏的展品，点击卡片右上角「♡ 收藏」即可加入。"
              : `暂无匹配“${searchQuery}”的每日漫游文献，请尝试切换上方分栏或清空检索词。`}
          </div>
        ) : (
          <>
            <div
              className={`grid grid-cols-1 ${
                isCompact
                  ? "md:grid-cols-2 lg:grid-cols-3 gap-4"
                  : "md:grid-cols-2 gap-6"
              } pt-8`}
            >
              {visibleItems.map((item, idx) => {
                const folioNumber = String(idx + 1).padStart(2, "0");
                const isLiked = likedIds.includes(item.id);

                return (
                  <div
                    key={item.id}
                    role="button"
                    tabIndex={0}
                    onClick={() => onInspectDossier?.(item)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        onInspectDossier?.(item);
                      }
                    }}
                    className={`group relative flex flex-col justify-between bg-surface rounded-2xl border border-border overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_36px_rgba(20,19,18,0.08)] cursor-pointer text-left ${accentBorderHover[item.accent]}`}
                  >
                    {/* Top pigment accent hairline */}
                    <div
                      className={`h-1 w-full ${accentStripe[item.accent]} opacity-75 group-hover:opacity-100 transition-opacity`}
                    />

                    <div
                      className={`${
                        isCompact ? "p-5 space-y-3" : "p-6 sm:p-7 space-y-4"
                      } flex-1 flex flex-col justify-between`}
                    >
                      <div className={isCompact ? "space-y-2.5" : "space-y-4"}>
                        {/* Top Folio Metadata Row */}
                        <div className="flex items-start justify-between gap-3 pb-3 border-b border-border/70">
                          <div className="flex items-center gap-3">
                            <span
                              className={`font-editorial italic ${
                                isCompact ? "text-2xl" : "text-3xl"
                              } font-bold text-dark/25 group-hover:text-accent transition-colors leading-none select-none`}
                            >
                              {folioNumber}
                            </span>
                            <div className="flex flex-col">
                              <span className="text-[10px] font-mono-meta text-muted">
                                {item.issueNo} · {item.dateAdded}
                              </span>
                              <span
                                className={`mt-1 self-start inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium border ${accentBadgeStyles[item.accent]}`}
                              >
                                {item.categoryLabel}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                onToggleLike?.(item.id);
                              }}
                              aria-pressed={isLiked}
                              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full border text-[11px] font-mono-meta transition-colors cursor-pointer ${
                                isLiked
                                  ? "bg-accent text-white border-accent font-semibold"
                                  : "bg-bg-light border-border text-secondary hover:text-dark hover:border-dark"
                              }`}
                              aria-label={`收藏 ${item.title}`}
                            >
                              <span>{isLiked ? "♥ 已收藏" : "♡ 收藏"}</span>
                            </button>
                            <a
                              href={item.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-bg-light border border-border text-[10px] font-mono-meta text-secondary group-hover:bg-dark group-hover:text-surface group-hover:border-dark transition-colors"
                            >
                              <span>{item.sourceName}</span>
                              <span>↗</span>
                            </a>
                          </div>
                        </div>

                        {/* Title & Provenance */}
                        <div>
                          <h3
                            className={`font-editorial ${
                              isCompact
                                ? "text-lg"
                                : "text-xl sm:text-[22px]"
                            } font-bold text-dark group-hover:text-accent transition-colors leading-snug`}
                          >
                            {item.title}
                          </h3>
                          <p className="text-[11px] font-mono-meta text-muted mt-1">
                            {item.creatorOrHost}
                          </p>
                        </div>

                        {/* Editorial Summary */}
                        <p
                          className={`text-sm text-secondary leading-[1.75] ${
                            isCompact ? "line-clamp-2 text-xs" : ""
                          }`}
                        >
                          {item.summary}
                        </p>

                        {/* Curator's Critique Pull-Quote (Comfort mode only) */}
                        {!isCompact && (
                          <div className="relative pl-4 border-l-2 border-accent/60 bg-bg-light/90 py-2.5 pr-3.5 rounded-r-xl">
                            <p className="font-editorial italic text-[13px] text-dark/90 leading-relaxed">
                              <span className="font-mono-meta not-italic text-[10px] uppercase text-accent font-semibold mr-2">
                                策展手记
                              </span>
                              “{item.curatorNote}”
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Tags & Archival Link Footer */}
                      <div className="flex items-center justify-between pt-3.5 mt-3 border-t border-border/75">
                        <div className="flex flex-wrap gap-1.5">
                          {item.tags.map((tag) => {
                            const isTagSelected =
                              searchQuery.trim().toLowerCase() ===
                              tag.toLowerCase();
                            return (
                              <button
                                key={tag}
                                type="button"
                                onClick={(e) => {
                                  if (!onSelectTag) return;
                                  e.preventDefault();
                                  e.stopPropagation();
                                  onSelectTag(tag);
                                }}
                                className={`text-[11px] font-mono-meta px-2 py-0.5 rounded transition-colors cursor-pointer ${
                                  isTagSelected
                                    ? "bg-dark text-surface"
                                    : "bg-bg-card/85 text-secondary hover:bg-dark/15 hover:text-dark"
                                }`}
                              >
                                #{tag}
                              </button>
                            );
                          })}
                        </div>
                        <span className="text-[11px] font-mono-meta text-dark group-hover:text-accent transition-colors shrink-0 ml-2">
                          详情 →
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {canCollapse && (
              <div className="mt-8 flex justify-center">
                <button
                  type="button"
                  onClick={() => setIsExpanded((prev) => !prev)}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-border bg-surface hover:border-dark hover:bg-dark hover:text-surface text-xs font-mono-meta text-dark transition-all cursor-pointer shadow-xs"
                >
                  <span>
                    {isExpanded
                      ? "收起部分漫游志 ↑"
                      : `展开全部 ${filteredItems.length} 期漫游志 (还有 ${
                          filteredItems.length - INITIAL_VISIBLE_COUNT
                        } 期) ↓`}
                  </span>
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
