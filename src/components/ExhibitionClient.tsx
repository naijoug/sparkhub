"use client";

import { useMemo, useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import CategoryBar from "@/components/CategoryBar";
import DailyCurationsSection from "@/components/DailyCurationsSection";
import FeaturedSection from "@/components/FeaturedSection";
import HackathonSection from "@/components/HackathonSection";
import AIContestSection from "@/components/AIContestSection";
import SourceAtlasSection from "@/components/SourceAtlasSection";
import CuratorialFolioModal from "@/components/CuratorialFolioModal";
import CurationDossierModal, {
  DossierInspectItem,
} from "@/components/CurationDossierModal";
import {
  aiContestCards,
  dailyCurations,
  featuredCards,
  DailyCurationItem,
  AIContestCard,
  CurationCategory,
} from "@/lib/data";
import { allHackathonProducts, HackathonProduct } from "@/lib/hackathons";
import { inspirationSources } from "@/lib/sources";
import { filterDailyCurations, filterSources, SourceFilter } from "@/lib/filters";
import { useCuratorialFolio } from "@/lib/useCuratorialFolio";

export type WingId =
  | "all"
  | "daily-curations"
  | "featured"
  | "hackathons"
  | "ai-contests"
  | "sources";

export type ViewDensityMode = "comfort" | "compact";

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

export default function ExhibitionClient({
  children,
}: {
  children?: React.ReactNode;
}) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [dailyCategory, setDailyCategory] = useState<CurationCategory>("all");
  const [sourceSection, setSourceSection] = useState<SourceFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeWing, setActiveWing] = useState<WingId>("all");
  const [viewMode, setViewMode] = useState<ViewDensityMode>("comfort");
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [folioOpen, setFolioOpen] = useState(false);
  const [inspectingDossier, setInspectingDossier] =
    useState<DossierInspectItem | null>(null);

  const { likedIds, toggleLike: handleToggleLike, clearLikes: handleClearAllLikes } =
    useCuratorialFolio();

  const normalizedQuery = searchQuery.trim().toLowerCase();

  const searchStats = useMemo(() => {
    if (!normalizedQuery) return null;

    const dailyCount = filterDailyCurations(normalizedQuery, dailyCategory).length;

    const featuredCount = featuredCards.filter(
      (card) =>
        (activeCategory === "all" || card.categoryId === activeCategory) &&
        (card.title.toLowerCase().includes(normalizedQuery) ||
          card.subtitle.toLowerCase().includes(normalizedQuery) ||
          card.author.toLowerCase().includes(normalizedQuery) ||
          card.medium.toLowerCase().includes(normalizedQuery) ||
          card.tags.some((t) =>
            t.label.toLowerCase().includes(normalizedQuery)
          ))
    ).length;

    const hackathonCount = allHackathonProducts.filter(
      (p) =>
        p.title.toLowerCase().includes(normalizedQuery) ||
        p.tagline.toLowerCase().includes(normalizedQuery) ||
        p.summary.toLowerCase().includes(normalizedQuery) ||
        p.targetPlatform.toLowerCase().includes(normalizedQuery) ||
        p.award.toLowerCase().includes(normalizedQuery) ||
        p.team.name.toLowerCase().includes(normalizedQuery) ||
        p.techStack.some((t) => t.toLowerCase().includes(normalizedQuery))
    ).length;

    const aiCount = aiContestCards.filter(
      (card) =>
        card.title.toLowerCase().includes(normalizedQuery) ||
        card.curatorNote.toLowerCase().includes(normalizedQuery) ||
        card.meta.toLowerCase().includes(normalizedQuery) ||
        card.badge.toLowerCase().includes(normalizedQuery) ||
        (card.tags && card.tags.some((t) => t.toLowerCase().includes(normalizedQuery)))
    ).length;

    const sourceCount = filterSources(normalizedQuery, sourceSection).length;

    return {
      total: dailyCount + featuredCount + hackathonCount + aiCount + sourceCount,
      dailyCount,
      featuredCount,
      hackathonCount,
      aiCount,
      sourceCount,
    };
  }, [normalizedQuery, activeCategory, dailyCategory, sourceSection]);

  const handleToggleTag = (tag: string) => {
    setSearchQuery((prev) =>
      prev.trim().toLowerCase() === tag.trim().toLowerCase() ? "" : tag
    );
  };

  const handleInspectDaily = (item: DailyCurationItem) => {
    setInspectingDossier({
      id: item.id,
      catalogNo: item.issueNo,
      categoryLabel: item.categoryLabel,
      title: item.title,
      authorOrHost: item.creatorOrHost,
      summary: item.summary,
      curatorNote: item.curatorNote,
      tags: item.tags,
      accent: item.accent,
      href: item.href,
      sourceName: item.sourceName,
    });
  };

  const handleInspectHackathonProduct = (product: HackathonProduct) => {
    setInspectingDossier({
      id: product.id,
      catalogNo: product.catalogNo,
      categoryLabel: `${product.hackathonName} · ${product.award.split(" (")[0]}`,
      title: product.title,
      authorOrHost: `${product.team.name} · ${product.hackathonName}`,
      summary: product.summary,
      curatorNote: product.curatorCritique,
      tags: [product.targetPlatform, ...product.techStack],
      accent: "accent",
      href: product.officialUrl,
      sourceName: product.hackathonName,
    });
  };

  const handleInspectAIContest = (item: AIContestCard) => {
    setInspectingDossier({
      id: item.id,
      catalogNo: item.catalogNo,
      categoryLabel: `算法美学暗房 · ${item.badge}`,
      title: item.title,
      authorOrHost: item.meta,
      summary: `收录于 SparkHub 暗房特展（Wing IV）：${item.meta}。探索高维隐空间、多模态意图与参数化生成艺术的美学临界点。`,
      curatorNote: item.curatorNote,
      tags: item.tags ?? ["生成式艺术", "算法美学"],
      accent: item.badgeColor,
      href: item.href,
      sourceName: "Generative Atelier",
    });
  };

  const handleRandomSerendipity = () => {
    const collections = [
      ...dailyCurations.map((i) => ({ type: "daily" as const, item: i })),
      ...allHackathonProducts.map((i) => ({ type: "hackathon" as const, item: i })),
      ...aiContestCards.map((i) => ({ type: "ai" as const, item: i })),
    ];
    const randomIndex = Math.floor(Math.random() * collections.length);
    const chosen = collections[randomIndex];

    if (chosen.type === "daily") {
      handleInspectDaily(chosen.item as DailyCurationItem);
    } else if (chosen.type === "hackathon") {
      handleInspectHackathonProduct(chosen.item as HackathonProduct);
    } else {
      handleInspectAIContest(chosen.item as AIContestCard);
    }
  };

  const handleHeaderNavigate = (sectionId: string) => {
    if (
      sectionId !== "top" &&
      activeWing !== "all" &&
      activeWing !== sectionId
    ) {
      setActiveWing("all");
    }
  };

  return (
    <>
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        savedCount={likedIds.length}
        onOpenFolio={() => setFolioOpen(true)}
        onRandomSerendipity={handleRandomSerendipity}
        onNavigateSection={handleHeaderNavigate}
      />

      <main className="flex-1">
        <Hero searchQuery={searchQuery} onSearchChange={setSearchQuery} />

        {/* Quick View, Wing Focus & Favorites Toolbar */}
        <section
          aria-label="快捷浏览与视图控制栏"
          className="sticky top-[70px] sm:top-[102px] z-30 bg-surface/95 backdrop-blur-md border-b border-border px-6 lg:px-12 py-3 shadow-[0_4px_20px_rgba(20,19,18,0.04)]"
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
                    onClick={() => setActiveWing(tab.id)}
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
                onClick={() => setFavoritesOnly((prev) => !prev)}
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
                  {likedIds.length}
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
                  onClick={() => setViewMode("comfort")}
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
                  onClick={() => setViewMode("compact")}
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

        {/* Live Curatorial Search Telemetry Bar */}
        {searchStats && (
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
                  <strong className="text-[#F9EAE6]">{searchStats.total}</strong> 项馆藏：
                </span>
                <a
                  href="#daily-curations"
                  onClick={() => handleHeaderNavigate("daily-curations")}
                  className="hover:text-[#F9EAE6] transition-colors underline underline-offset-4"
                >
                  漫游志 [{searchStats.dailyCount}]
                </a>
                <a
                  href="#featured"
                  onClick={() => handleHeaderNavigate("featured")}
                  className="hover:text-[#F9EAE6] transition-colors underline underline-offset-4"
                >
                  常设展 [{searchStats.featuredCount}]
                </a>
                <a
                  href="#hackathons"
                  onClick={() => handleHeaderNavigate("hackathons")}
                  className="hover:text-[#F9EAE6] transition-colors underline underline-offset-4"
                >
                  黑客松 [{searchStats.hackathonCount}]
                </a>
                <a
                  href="#ai-contests"
                  onClick={() => handleHeaderNavigate("ai-contests")}
                  className="hover:text-[#F9EAE6] transition-colors underline underline-offset-4"
                >
                  AI 特展 [{searchStats.aiCount}]
                </a>
                <a
                  href="#sources"
                  onClick={() => handleHeaderNavigate("sources")}
                  className="hover:text-[#F9EAE6] transition-colors underline underline-offset-4"
                >
                  信源图谱 [{searchStats.sourceCount}]
                </a>
              </div>

              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="px-2.5 py-1 rounded-full border border-white/25 hover:border-white text-[10px] text-white/85 hover:text-white cursor-pointer transition-colors"
              >
                RESET FILTER · 重置检索 ✕
              </button>
            </div>
          </div>
        )}

        {(activeWing === "all" || activeWing === "daily-curations") && (
          <DailyCurationsSection
            selectedTab={dailyCategory}
            onSelectTab={setDailyCategory}
            searchQuery={searchQuery}
            onSelectTag={handleToggleTag}
            likedIds={likedIds}
            onToggleLike={handleToggleLike}
            onInspectDossier={handleInspectDaily}
            viewMode={viewMode}
            favoritesOnly={favoritesOnly}
            forceExpanded={activeWing === "daily-curations"}
          />
        )}

        {(activeWing === "all" || activeWing === "featured") && (
          <>
            <CategoryBar
              activeCategory={activeCategory}
              onSelectCategory={setActiveCategory}
              searchQuery={searchQuery}
            />

            <FeaturedSection
              activeCategory={activeCategory}
              searchQuery={searchQuery}
              onSelectTag={handleToggleTag}
              likedIds={likedIds}
              onToggleLike={handleToggleLike}
              viewMode={viewMode}
              favoritesOnly={favoritesOnly}
              forceExpanded={activeWing === "featured"}
            />
          </>
        )}

        {(activeWing === "all" || activeWing === "hackathons") && (
          <HackathonSection
            searchQuery={searchQuery}
            onSelectTag={handleToggleTag}
            likedIds={likedIds}
            onToggleLike={handleToggleLike}
            onInspectProduct={handleInspectHackathonProduct}
            viewMode={viewMode}
            favoritesOnly={favoritesOnly}
            forceExpanded={activeWing === "hackathons"}
          />
        )}

        {(activeWing === "all" || activeWing === "ai-contests") && (
          <AIContestSection
            searchQuery={searchQuery}
            onSelectTag={handleToggleTag}
            likedIds={likedIds}
            onToggleLike={handleToggleLike}
            onInspectDossier={handleInspectAIContest}
            viewMode={viewMode}
            favoritesOnly={favoritesOnly}
          />
        )}

        {(activeWing === "all" || activeWing === "sources") && (
          <SourceAtlasSection
            selectedSection={sourceSection}
            onSelectSection={setSourceSection}
            searchQuery={searchQuery}
            onSelectTag={handleToggleTag}
            likedIds={likedIds}
            onToggleLike={handleToggleLike}
            viewMode={viewMode}
            favoritesOnly={favoritesOnly}
            forceExpanded={activeWing === "sources"}
          />
        )}
      </main>

      {/* Curatorial Folio Modal */}
      <CuratorialFolioModal
        isOpen={folioOpen}
        onClose={() => setFolioOpen(false)}
        likedIds={likedIds}
        onToggleLike={handleToggleLike}
        onClearAll={handleClearAllLikes}
        onSelectTag={handleToggleTag}
      />

      {/* Unified Curation Inspection Lightbox Modal */}
      <CurationDossierModal
        key={inspectingDossier?.id ?? "closed"}
        item={inspectingDossier}
        onClose={() => setInspectingDossier(null)}
        liked={Boolean(inspectingDossier && likedIds.includes(inspectingDossier.id))}
        onToggleLike={(id) => handleToggleLike(id)}
        onSelectTag={handleToggleTag}
      />

      {children}
    </>
  );
}
