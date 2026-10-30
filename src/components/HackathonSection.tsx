"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  hackathonEditions,
  platformCategories,
  PlatformCategory,
  HackathonProduct,
} from "@/lib/hackathons";

interface HackathonSectionProps {
  searchQuery?: string;
  onSelectTag?: (tag: string) => void;
  likedIds?: string[];
  onToggleLike?: (id: string) => void;
  onInspectProduct?: (product: HackathonProduct) => void;
  viewMode?: "comfort" | "compact";
  favoritesOnly?: boolean;
  forceExpanded?: boolean;
}

const INITIAL_VISIBLE_EDITIONS = 2;

export default function HackathonSection({
  searchQuery = "",
  onSelectTag,
  likedIds = [],
  onToggleLike,
  onInspectProduct,
  viewMode = "comfort",
  favoritesOnly = false,
  forceExpanded = false,
}: HackathonSectionProps) {
  const [selectedPlatform, setSelectedPlatform] =
    useState<PlatformCategory>("all");
  const [isExpanded, setIsExpanded] = useState(false);

  const normalizedQuery = searchQuery.trim().toLowerCase();

  // Filter hackathon editions and their top products based on platform, favorites & search query
  const filteredEditions = useMemo(() => {
    return hackathonEditions
      .map((edition) => {
        const matchingProducts = edition.products.filter((p) => {
          const matchesPlatform =
            selectedPlatform === "all" ||
            p.platformCategory === selectedPlatform;

          const matchesFavorite =
            !favoritesOnly || likedIds.includes(p.id);

          const matchesSearch =
            !normalizedQuery ||
            p.title.toLowerCase().includes(normalizedQuery) ||
            p.tagline.toLowerCase().includes(normalizedQuery) ||
            p.summary.toLowerCase().includes(normalizedQuery) ||
            p.targetPlatform.toLowerCase().includes(normalizedQuery) ||
            p.award.toLowerCase().includes(normalizedQuery) ||
            p.team.name.toLowerCase().includes(normalizedQuery) ||
            p.techStack.some((t) => t.toLowerCase().includes(normalizedQuery));

          return matchesPlatform && matchesFavorite && matchesSearch;
        });

        if (favoritesOnly) {
          if (matchingProducts.length === 0) return null;
          return {
            ...edition,
            displayProducts: matchingProducts,
          };
        }

        // Also check if the edition itself matches the search
        const editionMatchesSearch =
          !normalizedQuery ||
          edition.name.toLowerCase().includes(normalizedQuery) ||
          edition.englishName.toLowerCase().includes(normalizedQuery) ||
          edition.organizer.toLowerCase().includes(normalizedQuery) ||
          edition.dateDisplay.toLowerCase().includes(normalizedQuery) ||
          edition.description.toLowerCase().includes(normalizedQuery) ||
          edition.location.toLowerCase().includes(normalizedQuery);

        const editionMatchesPlatform =
          selectedPlatform === "all" ||
          edition.platformCategories.includes(
            selectedPlatform as Exclude<PlatformCategory, "all">
          );

        if (
          (editionMatchesPlatform || matchingProducts.length > 0) &&
          (editionMatchesSearch || matchingProducts.length > 0)
        ) {
          return {
            ...edition,
            displayProducts:
              matchingProducts.length > 0
                ? matchingProducts
                : selectedPlatform === "all"
                  ? edition.products
                  : edition.products.filter(
                      (p) => p.platformCategory === selectedPlatform
                    ),
          };
        }
        return null;
      })
      .filter((e): e is NonNullable<typeof e> => e !== null);
  }, [selectedPlatform, normalizedQuery, favoritesOnly, likedIds]);

  const totalMatchingProductsCount = useMemo(() => {
    return filteredEditions.reduce(
      (acc, e) => acc + e.displayProducts.length,
      0
    );
  }, [filteredEditions]);

  const canCollapse =
    !forceExpanded &&
    selectedPlatform === "all" &&
    !normalizedQuery &&
    !favoritesOnly &&
    filteredEditions.length > INITIAL_VISIBLE_EDITIONS;

  const visibleEditions =
    canCollapse && !isExpanded
      ? filteredEditions.slice(0, INITIAL_VISIBLE_EDITIONS)
      : filteredEditions;

  const isCompact = viewMode === "compact";

  return (
    <section
      id="hackathons"
      className="bg-bg-card/65 border-b border-border px-6 lg:px-12 py-16"
    >
      <div className="max-w-[1440px] mx-auto space-y-10">
        {/* Section Masthead Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-border">
          <div className="space-y-2.5">
            <div className="flex items-center gap-3 text-[11px] font-mono-meta uppercase text-muted">
              <span className="px-2 py-0.5 rounded bg-surface border border-border text-dark font-semibold">
                WING III · 展馆三
              </span>
              <span>GLOBAL HACKATHONS &amp; WINNING SPECIMENS · 赛事与高票造物</span>
              <span>·</span>
              <span className="text-accent font-semibold">
                {hackathonEditions.length} 大旗舰赛事 · 20 款高票产品
              </span>
            </div>
            <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-dark">
              黑客松排期与高票产品榜 ·{" "}
              <span className="italic font-normal text-secondary">
                Curated Hackathon Archive
              </span>
            </h2>
            <p className="text-sm text-secondary max-w-[760px] leading-relaxed">
              汇集全球知名平台（Google、ETHGlobal、Solana Colosseum、Stanford TreeHacks、Cerebral Valley 等）的往期与进行中黑客松。
              详细标注<strong>几月几号办、哪一期、所属平台与总奖金</strong>，并陈列各赛事中<strong>社区投票最高、获大奖的先锋产品</strong>。
            </p>
          </div>

          <a
            href="https://devpost.com/hackathons"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-border bg-surface hover:bg-dark hover:text-surface text-xs font-mono-meta uppercase text-dark transition-colors shrink-0 cursor-pointer"
          >
            <span>全球黑客松雷达 (Devpost)</span>
            <span>↗</span>
          </a>
        </div>

        {/* Platform Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          {platformCategories.map((cat) => {
            const active = selectedPlatform === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedPlatform(cat.id)}
                className={`inline-flex items-center gap-2 h-9 px-4 rounded-full text-xs font-medium border transition-all cursor-pointer ${
                  active
                    ? "bg-dark text-surface border-dark shadow-sm"
                    : "bg-surface text-secondary border-border hover:border-dark/40 hover:text-dark"
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] font-mono-meta ${
                    active ? "text-accent-light" : "text-muted"
                  }`}
                >
                  {cat.en} [{cat.count}]
                </span>
              </button>
            );
          })}
        </div>

        {/* Summary Counter Bar */}
        <div className="flex items-center justify-between text-xs font-mono-meta text-muted py-2 border-b border-border/60">
          <div>
            共筛选出{" "}
            <strong className="text-dark">{filteredEditions.length}</strong>{" "}
            期黑客松赛事，包含{" "}
            <strong className="text-accent">
              {totalMatchingProductsCount}
            </strong>{" "}
            款顶部高票/获奖参赛造物
          </div>
          <div className="hidden sm:block">
            FORMAT: 卡片式展列 · 点击可进入独立详情页或直接跳转产品主站
          </div>
        </div>

        {/* Hackathon Editions List */}
        {filteredEditions.length === 0 ? (
          <div className="py-14 text-center text-sm text-muted bg-surface rounded-3xl border border-border">
            {favoritesOnly
              ? "极客造物展区中暂无已收藏作品，点击黑客松产品卡片右上角的「♡ 收藏」即可加入。"
              : `暂无匹配“${searchQuery}”或当前平台的黑客松赛事，请尝试重置检索词或选择“全部平台”。`}
          </div>
        ) : (
          <>
            <div className={isCompact ? "space-y-6" : "space-y-10"}>
              {visibleEditions.map((edition) => (
                <article
                  key={edition.id}
                  className="bg-surface rounded-3xl border border-border overflow-hidden shadow-[0_4px_24px_rgba(20,19,18,0.04)] hover:shadow-[0_12px_36px_rgba(20,19,18,0.08)] transition-all"
                >
                  {/* Hackathon Edition Masthead Plate */}
                  <div
                    className={`${
                      isCompact ? "p-5" : "p-6 sm:p-8"
                    } bg-bg-light/80 border-b border-border/80 flex flex-col lg:flex-row lg:items-center justify-between gap-4`}
                  >
                    <div className="space-y-2.5 max-w-3xl">
                      <div className="flex flex-wrap items-center gap-2 text-xs font-mono-meta">
                        <span className="px-2.5 py-0.5 rounded bg-dark text-surface font-semibold">
                          {edition.catalogNo}
                        </span>
                        <span className="px-3 py-0.5 rounded-full bg-accent-light text-accent border border-accent/25 font-semibold">
                          📅 {edition.dateDisplay}
                        </span>
                        <span className="px-3 py-0.5 rounded-full bg-surface border border-border text-secondary">
                          🏢 {edition.organizer}
                        </span>
                        <span className="px-3 py-0.5 rounded-full bg-surface border border-border text-dark font-medium">
                          📍 {edition.location}
                        </span>
                        <span className="px-3 py-0.5 rounded-full bg-surface border border-border text-yellow font-semibold">
                          💰 {edition.prizePool}
                        </span>
                      </div>

                      <div>
                        <div className="flex items-baseline gap-3">
                          <h3
                            className={`font-editorial ${
                              isCompact
                                ? "text-xl sm:text-2xl"
                                : "text-2xl sm:text-3xl"
                            } font-bold text-dark`}
                          >
                            {edition.name}
                          </h3>
                          <span className="text-xs font-mono-meta text-muted hidden sm:inline">
                            {edition.edition}
                          </span>
                        </div>
                        {!isCompact && (
                          <p className="text-xs sm:text-sm text-secondary mt-1.5 leading-relaxed">
                            {edition.description}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Actions for Hackathon */}
                    <div className="flex flex-row lg:flex-col items-center lg:items-end gap-3 shrink-0">
                      <Link
                        href={`/hackathons/${edition.id}`}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-dark hover:bg-accent text-surface hover:text-white text-xs font-mono-meta uppercase transition-colors shadow-sm"
                      >
                        <span>查看本期所有产品</span>
                        <span>→</span>
                      </Link>

                      <a
                        href={edition.officialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-mono-meta text-muted hover:text-dark transition-colors inline-flex items-center gap-1"
                      >
                        <span>赛事官方网站 ↗</span>
                      </a>
                    </div>
                  </div>

                  {/* Top-Voted Products Showcase Cards */}
                  <div className={isCompact ? "p-5 space-y-3" : "p-6 sm:p-8 space-y-4"}>
                    <div className="flex items-center justify-between text-xs font-mono-meta text-muted">
                      <span className="uppercase tracking-wider">
                        本期高票 / 获奖造物展示
                      </span>
                      <span>
                        共 {edition.displayProducts.length} 款
                      </span>
                    </div>

                    <div
                      className={`grid grid-cols-1 md:grid-cols-2 ${
                        isCompact ? "lg:grid-cols-3 gap-4" : "lg:grid-cols-3 gap-6"
                      }`}
                    >
                      {edition.displayProducts.map((prd) => {
                        const isLiked = likedIds.includes(prd.id);

                        return (
                          <div
                            key={prd.id}
                            role="button"
                            tabIndex={0}
                            onClick={() => onInspectProduct?.(prd)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter" || e.key === " ") {
                                e.preventDefault();
                                onInspectProduct?.(prd);
                              }
                            }}
                            className="group relative flex flex-col justify-between bg-bg-light/60 rounded-2xl border border-border/80 p-5 hover:bg-surface hover:border-dark/50 hover:shadow-md transition-all duration-300 cursor-pointer text-left"
                          >
                            <div className="space-y-3">
                              {/* Card Header: Catalog, Award, Votes, Bookmark */}
                              <div className="flex items-start justify-between gap-2 pb-2 border-b border-border/60">
                                <div className="space-y-1">
                                  <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono-meta bg-accent-light text-accent border border-accent/20 font-semibold">
                                    {prd.award.split(" (")[0]}
                                  </span>
                                  <div className="text-[11px] font-mono-meta text-muted">
                                    🎯 {prd.targetPlatform}
                                  </div>
                                </div>

                                <div className="flex items-center gap-2 shrink-0">
                                  <span className="text-xs font-mono-meta font-semibold text-dark">
                                    🔥 {prd.votes.toLocaleString()}
                                  </span>
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      onToggleLike?.(prd.id);
                                    }}
                                    aria-pressed={isLiked}
                                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full border text-[11px] font-mono-meta transition-colors cursor-pointer ${
                                      isLiked
                                        ? "bg-accent text-white border-accent font-semibold"
                                        : "bg-surface border-border text-secondary hover:text-dark hover:border-dark"
                                    }`}
                                    aria-label={`收藏 ${prd.title}`}
                                  >
                                    <span>{isLiked ? "♥ 已收藏" : "♡ 收藏"}</span>
                                  </button>
                                </div>
                              </div>

                              {/* Title & What it does */}
                              <div>
                                <Link
                                  href={`/products/${prd.id}`}
                                  onClick={(e) => e.stopPropagation()}
                                  className="group-hover:text-accent transition-colors"
                                >
                                  <h4 className="font-editorial text-xl font-bold text-dark leading-snug">
                                    {prd.title}
                                  </h4>
                                </Link>
                                <p className="text-xs font-editorial italic text-secondary mt-1 line-clamp-2">
                                  “{prd.tagline}”
                                </p>
                              </div>

                              {/* Detailed description of what the product does */}
                              {!isCompact && (
                                <p className="text-xs text-secondary leading-relaxed line-clamp-3">
                                  {prd.summary}
                                </p>
                              )}

                              {/* Tech Stack Chips */}
                              <div className="flex flex-wrap gap-1 pt-1">
                                {prd.techStack.slice(0, 3).map((tech) => (
                                  <button
                                    key={tech}
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      onSelectTag?.(tech);
                                    }}
                                    className="text-[10px] font-mono-meta px-2 py-0.5 rounded bg-surface text-muted hover:bg-dark hover:text-surface transition-colors cursor-pointer border border-border/60"
                                  >
                                    #{tech}
                                  </button>
                                ))}
                              </div>
                            </div>

                            {/* Action Buttons: To Detail Page & To Official Website */}
                            <div className="mt-4 pt-3 border-t border-border/60 flex items-center justify-between text-xs font-mono-meta">
                              <Link
                                href={`/products/${prd.id}`}
                                onClick={(e) => e.stopPropagation()}
                                className="inline-flex items-center gap-1 font-semibold text-dark hover:text-accent transition-colors py-1"
                              >
                                <span>详情页</span>
                                <span>→</span>
                              </Link>

                              <a
                                href={prd.officialUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-surface border border-border text-secondary hover:text-dark hover:border-dark transition-colors"
                              >
                                <span>直达主站</span>
                                <span className="text-[10px]">↗</span>
                              </a>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </article>
              ))}
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
                      ? "收起部分黑客松赛事 ↑"
                      : `展开全部 ${filteredEditions.length} 期黑客松赛事 (共 ${totalMatchingProductsCount} 款高票产品) ↓`}
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
