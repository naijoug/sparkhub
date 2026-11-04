"use client";

import { useMemo, useState } from "react";
import {
  coreSources,
  inspirationSources,
  sourceSections,
  SourceSectionId,
  dietMeta,
} from "@/lib/sources";
import { filterSources, SourceFilter } from "@/lib/filters";
import {
  BookmarkPillButton,
  EmptySectionState,
  SectionExpandToggle,
  TagChipButton,
} from "./CuratorialPrimitives";

const sectionSourceCounts: Record<SourceSectionId, number> = (() => {
  const counts = {} as Record<SourceSectionId, number>;
  sourceSections.forEach((sec) => {
    counts[sec.id] = 0;
  });
  inspirationSources.forEach((source) => {
    source.sections.forEach((secId) => {
      counts[secId] = (counts[secId] ?? 0) + 1;
    });
  });
  return counts;
})();

interface SourceAtlasSectionProps {
  selectedSection: SourceFilter;
  onSelectSection: (section: SourceFilter) => void;
  searchQuery?: string;
  onSelectTag?: (tag: string) => void;
  likedIds?: string[];
  onToggleLike?: (id: string) => void;
  viewMode?: "comfort" | "compact";
  favoritesOnly?: boolean;
  forceExpanded?: boolean;
}

const INITIAL_VISIBLE_COUNT = 12;

export default function SourceAtlasSection({
  selectedSection,
  onSelectSection,
  searchQuery = "",
  onSelectTag,
  likedIds = [],
  onToggleLike,
  viewMode = "comfort",
  favoritesOnly = false,
  forceExpanded = false,
}: SourceAtlasSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const filteredSources = useMemo(
    () => filterSources(searchQuery, selectedSection, favoritesOnly, likedIds),
    [searchQuery, selectedSection, favoritesOnly, likedIds]
  );

  const canCollapse =
    !forceExpanded &&
    selectedSection === "all" &&
    !searchQuery.trim() &&
    !favoritesOnly &&
    filteredSources.length > INITIAL_VISIBLE_COUNT;

  const visibleSources =
    canCollapse && !isExpanded
      ? filteredSources.slice(0, INITIAL_VISIBLE_COUNT)
      : filteredSources;

  const isCompact = viewMode === "compact";

  const activeSectionMeta = useMemo(() => {
    if (selectedSection === "all" || selectedSection === "core") return null;
    return sourceSections.find((s) => s.id === selectedSection);
  }, [selectedSection]);

  return (
    <section
      id="sources"
      className="border-b border-border bg-bg-light/60 px-6 lg:px-12 py-16"
    >
      <div className="max-w-[1440px] mx-auto space-y-8">
        {/* Section Masthead Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-border">
          <div className="space-y-2.5">
            <div className="flex items-center gap-3 text-[11px] font-mono-meta uppercase text-muted">
              <span className="px-2 py-0.5 rounded bg-surface border border-border text-dark font-semibold">
                WING V · 展馆五
              </span>
              <span>INSPIRATION SOURCE ATLAS · 全球信源巡航图谱</span>
              <span>·</span>
              <span className="text-accent font-semibold">
                TOTAL: {inspirationSources.length} VERIFIED SITES
              </span>
            </div>
            <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-dark">
              灵感信源图谱 ·{" "}
              <span className="italic font-normal text-secondary">
                Curatorial Radar Atlas
              </span>
            </h2>
            <p className="text-sm text-secondary max-w-[760px] leading-relaxed">
              严格贯彻「真实产品 70% · 视觉案例 20% · 跨界实验 10%」审美配比，涵盖上线 App 流程、SaaS 复杂后台、官方设计系统与高质量设计资产的完整巡航罗盘。
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <span className="text-xs font-mono-meta text-muted">
              RADAR RATIO · 巡航配比
            </span>
            <div className="inline-flex items-center gap-2 p-1.5 rounded-full bg-surface border border-border text-[11px] font-mono-meta text-secondary">
              <span className="px-2 py-0.5 rounded-full bg-accent-light text-accent font-semibold">
                70% 产品落地
              </span>
              <span>·</span>
              <span className="px-2 py-0.5 rounded-full bg-purple-light text-purple">
                20% 视觉美学
              </span>
              <span>·</span>
              <span className="px-2 py-0.5 rounded-full bg-green-light text-green">
                10% 跨界实验
              </span>
            </div>
          </div>
        </div>

        {/* Section Tabs */}
        <div className="flex flex-wrap items-center gap-2 pt-2">
          <button
            type="button"
            aria-pressed={selectedSection === "all"}
            onClick={() => onSelectSection("all")}
            className={`inline-flex items-center gap-1.5 h-8 px-3.5 rounded-full text-xs font-medium border transition-colors cursor-pointer ${
              selectedSection === "all"
                ? "bg-dark text-surface border-dark shadow-sm"
                : "bg-surface text-secondary border-border hover:border-dark/40"
            }`}
          >
            <span>全部信源</span>
            <span className="text-[10px] font-mono-meta opacity-70">
              [{inspirationSources.length}]
            </span>
          </button>

          <button
            type="button"
            aria-pressed={selectedSection === "core"}
            onClick={() => onSelectSection("core")}
            className={`inline-flex items-center gap-1.5 h-8 px-3.5 rounded-full text-xs font-medium border transition-colors cursor-pointer ${
              selectedSection === "core"
                ? "bg-accent text-white border-accent shadow-sm"
                : "bg-accent-light text-accent border-accent/25 hover:bg-accent hover:text-white"
            }`}
          >
            <span>★ 核心 {coreSources.length} 站</span>
            <span className="text-[10px] font-mono-meta opacity-80">
              [{coreSources.length}]
            </span>
          </button>

          {sourceSections.map((sec) => {
            const active = selectedSection === sec.id;
            const count = sectionSourceCounts[sec.id] ?? 0;

            return (
              <button
                key={sec.id}
                type="button"
                aria-pressed={active}
                onClick={() => onSelectSection(sec.id)}
                className={`inline-flex items-center gap-1.5 h-8 px-3 rounded-full text-xs font-medium border transition-colors cursor-pointer ${
                  active
                    ? "bg-dark text-surface border-dark shadow-sm"
                    : "bg-surface text-secondary border-border hover:border-dark/40"
                }`}
              >
                <span>{sec.label}</span>
                <span className="text-[10px] font-mono-meta opacity-70">
                  [{count}]
                </span>
              </button>
            );
          })}
        </div>

        {/* Section Annotation Banner if single section selected */}
        {activeSectionMeta && (
          <div className="p-4 rounded-2xl bg-bg-card/75 border border-border/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="space-y-1">
              <div className="font-mono-meta text-[10px] uppercase text-accent font-semibold">
                SECTION {activeSectionMeta.no} · {activeSectionMeta.en}
              </div>
              <p className="text-secondary leading-relaxed">
                {activeSectionMeta.intro}
              </p>
            </div>
            {activeSectionMeta.notes && (
              <div className="text-[11px] font-mono-meta text-muted bg-surface/80 p-2.5 rounded-xl border border-border shrink-0 max-w-md">
                <span className="text-dark font-medium mr-1.5">
                  {activeSectionMeta.noteTitle ?? "观察要点"}:
                </span>
                <span>{activeSectionMeta.notes.join("；")}</span>
              </div>
            )}
          </div>
        )}

        {/* Source Cards Grid */}
        {filteredSources.length === 0 ? (
          <EmptySectionState
            favoritesOnly={favoritesOnly}
            favoritesText="灵感信源图谱中暂无已收藏站点，点击站点卡片右上角的「♡ 收藏」即可加入。"
            emptyText={`暂无匹配“${searchQuery}”的灵感信源，请尝试切换上方类别或重置搜索词。`}
          />
        ) : (
          <>
            <div
              className={`grid grid-cols-1 md:grid-cols-2 ${
                isCompact ? "lg:grid-cols-4 gap-4" : "lg:grid-cols-3 gap-5"
              }`}
            >
              {visibleSources.map((source) => {
                const isLiked = likedIds.includes(source.id);
                const diet = dietMeta[source.diet];

                return (
                  <div
                    key={source.id}
                    className={`group relative flex flex-col justify-between bg-surface rounded-2xl border border-border ${
                      isCompact ? "p-4" : "p-5"
                    } hover:border-dark/40 hover:shadow-[0_8px_24px_rgba(20,19,18,0.06)] hover:-translate-y-0.5 transition-all text-left`}
                  >
                    <div className="space-y-3">
                      {/* Top Row: Name, Core Badge, Bookmark */}
                      <div className="flex items-start justify-between gap-3 pb-3 border-b border-border/60">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-editorial text-lg font-bold text-dark group-hover:text-accent transition-colors">
                              {source.name}
                            </h4>
                            {source.core && (
                              <span className="px-1.5 py-0.2 rounded bg-accent-light text-accent text-[9px] font-mono-meta border border-accent/25">
                                ★ 核心站
                              </span>
                            )}
                          </div>
                          {source.group && !isCompact && (
                            <span className="text-[10px] font-mono-meta text-muted">
                              GROUP · {source.group}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          <BookmarkPillButton
                            liked={isLiked}
                            title={source.name}
                            onToggle={() => onToggleLike?.(source.id)}
                            variant="light"
                          />
                          <a
                            href={source.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-bg-light border border-border text-[10px] font-mono-meta text-secondary hover:bg-dark hover:text-surface hover:border-dark transition-colors"
                            title="访问信源原站"
                          >
                            <span>访问</span>
                            <span>↗</span>
                          </a>
                        </div>
                      </div>

                      {/* Summary */}
                      <p
                        className={`text-xs text-secondary leading-[1.75] ${
                          isCompact ? "line-clamp-2" : ""
                        }`}
                      >
                        {source.summary}
                      </p>

                      {/* Caveat if any */}
                      {source.caveat && !isCompact && (
                        <p className="text-[10px] text-yellow bg-yellow-light px-2.5 py-1 rounded border border-yellow/30 font-mono-meta">
                          ⚠ {source.caveat}
                        </p>
                      )}

                      {/* Focus tags */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {source.focus.map((f) => (
                          <TagChipButton
                            key={f}
                            tag={f}
                            onSelectTag={onSelectTag}
                            variant="light"
                          />
                        ))}
                      </div>
                    </div>

                    {/* Card Bottom Meta Bar */}
                    <div className="mt-4 pt-3 border-t border-border/70 flex items-center justify-between text-[10px] font-mono-meta text-muted">
                      <span className="text-dark/80 font-medium">
                        {diet.label}
                      </span>
                      <div className="flex items-center gap-2">
                        {source.platforms && !isCompact && (
                          <span>{source.platforms.join(" / ")}</span>
                        )}
                        {!isCompact && <span>·</span>}
                        <span className="text-accent">{source.cadence}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {canCollapse && (
              <SectionExpandToggle
                expanded={isExpanded}
                onToggle={() => setIsExpanded((prev) => !prev)}
                collapseLabel="收起部分灵感信源 ↑"
                expandLabel={`展开全部 ${filteredSources.length} 个灵感信源 (还有 ${
                  filteredSources.length - INITIAL_VISIBLE_COUNT
                } 个) ↓`}
              />
            )}
          </>
        )}
      </div>
    </section>
  );
}
