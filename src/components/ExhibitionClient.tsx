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
  hackathonCards,
  DailyCurationItem,
  HackathonCard,
  AIContestCard,
} from "@/lib/data";
import { inspirationSources, matchesSourceQuery } from "@/lib/sources";

const FOLIO_STORAGE_KEY = "sparkhub:curatorial-folio";

export default function ExhibitionClient({
  children,
}: {
  children?: React.ReactNode;
}) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [folioOpen, setFolioOpen] = useState(false);
  const [inspectingDossier, setInspectingDossier] =
    useState<DossierInspectItem | null>(null);

  // Persistent user curatorial folio bookmarks
  const [likedIds, setLikedIds] = useState<string[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const saved = window.localStorage.getItem(FOLIO_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      // Ignore storage read error
    }
    return [];
  });

  const handleToggleLike = (id: string) => {
    setLikedIds((prev) => {
      const next = prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id];
      try {
        window.localStorage.setItem(FOLIO_STORAGE_KEY, JSON.stringify(next));
      } catch {
        // Ignore storage write error
      }
      return next;
    });
  };

  const handleClearAllLikes = () => {
    setLikedIds([]);
    try {
      window.localStorage.removeItem(FOLIO_STORAGE_KEY);
    } catch {
      // Ignore storage write error
    }
  };

  const normalizedQuery = searchQuery.trim().toLowerCase();

  const searchStats = useMemo(() => {
    if (!normalizedQuery) return null;

    const dailyCount = dailyCurations.filter(
      (item) =>
        item.title.toLowerCase().includes(normalizedQuery) ||
        item.summary.toLowerCase().includes(normalizedQuery) ||
        item.curatorNote.toLowerCase().includes(normalizedQuery) ||
        item.sourceName.toLowerCase().includes(normalizedQuery) ||
        item.tags.some((t) => t.toLowerCase().includes(normalizedQuery))
    ).length;

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

    const hackathonCount = hackathonCards.filter(
      (card) =>
        card.title.toLowerCase().includes(normalizedQuery) ||
        card.summary.toLowerCase().includes(normalizedQuery) ||
        card.team.toLowerCase().includes(normalizedQuery) ||
        card.badge.toLowerCase().includes(normalizedQuery) ||
        (card.tags && card.tags.some((t) => t.toLowerCase().includes(normalizedQuery)))
    ).length;

    const aiCount = aiContestCards.filter(
      (card) =>
        card.title.toLowerCase().includes(normalizedQuery) ||
        card.curatorNote.toLowerCase().includes(normalizedQuery) ||
        card.meta.toLowerCase().includes(normalizedQuery) ||
        card.badge.toLowerCase().includes(normalizedQuery) ||
        (card.tags && card.tags.some((t) => t.toLowerCase().includes(normalizedQuery)))
    ).length;

    const sourceCount = inspirationSources.filter((s) =>
      matchesSourceQuery(s, normalizedQuery)
    ).length;

    return {
      total: dailyCount + featuredCount + hackathonCount + aiCount + sourceCount,
      dailyCount,
      featuredCount,
      hackathonCount,
      aiCount,
      sourceCount,
    };
  }, [normalizedQuery, activeCategory]);

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

  const handleInspectHackathon = (item: HackathonCard) => {
    setInspectingDossier({
      id: item.id,
      catalogNo: item.catalogNo,
      categoryLabel: `黑客松实验原型 · ${item.badge}`,
      title: item.title,
      authorOrHost: item.team,
      summary: item.summary,
      curatorNote: item.curatorNote,
      tags: item.tags ?? ["黑客松", "极客先锋"],
      accent: item.badgeColor,
      href: item.href,
      sourceName: "Global Hackathon",
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
    // Select a random masterpiece across all collections
    const collections = [
      ...dailyCurations.map((i) => ({ type: "daily" as const, item: i })),
      ...hackathonCards.map((i) => ({ type: "hackathon" as const, item: i })),
      ...aiContestCards.map((i) => ({ type: "ai" as const, item: i })),
    ];
    const randomIndex = Math.floor(Math.random() * collections.length);
    const chosen = collections[randomIndex];

    if (chosen.type === "daily") {
      handleInspectDaily(chosen.item as DailyCurationItem);
    } else if (chosen.type === "hackathon") {
      handleInspectHackathon(chosen.item as HackathonCard);
    } else {
      handleInspectAIContest(chosen.item as AIContestCard);
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
      />

      <main className="flex-1">
        <Hero searchQuery={searchQuery} onSearchChange={setSearchQuery} />

        {/* Live Curatorial Search Telemetry Bar */}
        {searchStats && (
          <div
            role="status"
            aria-live="polite"
            className="bg-dark text-surface border-b border-border px-6 lg:px-12 py-3"
          >
            <div className="max-w-[1440px] mx-auto flex flex-wrap items-center justify-between gap-3 text-xs font-mono-meta">
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-1.5 text-accent-light">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                  <span>ARCHIVE FILTER ACTIVE</span>
                </span>
                <span className="text-white/40">|</span>
                <span>
                  关键词 “<strong className="text-white">{searchQuery}</strong>” 共命中{" "}
                  <strong className="text-accent-light">{searchStats.total}</strong> 项馆藏：
                </span>
                <a
                  href="#daily-curations"
                  className="hover:text-accent-light transition-colors underline underline-offset-4"
                >
                  漫游志 [{searchStats.dailyCount}]
                </a>
                <a
                  href="#featured"
                  className="hover:text-accent-light transition-colors underline underline-offset-4"
                >
                  常设展 [{searchStats.featuredCount}]
                </a>
                <a
                  href="#hackathons"
                  className="hover:text-accent-light transition-colors underline underline-offset-4"
                >
                  黑客松 [{searchStats.hackathonCount}]
                </a>
                <a
                  href="#ai-contests"
                  className="hover:text-accent-light transition-colors underline underline-offset-4"
                >
                  AI 特展 [{searchStats.aiCount}]
                </a>
                <a
                  href="#sources"
                  className="hover:text-accent-light transition-colors underline underline-offset-4"
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

        <DailyCurationsSection
          searchQuery={searchQuery}
          onSelectTag={handleToggleTag}
          likedIds={likedIds}
          onToggleLike={handleToggleLike}
          onInspectDossier={handleInspectDaily}
        />

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
        />

        <HackathonSection
          searchQuery={searchQuery}
          onSelectTag={handleToggleTag}
          likedIds={likedIds}
          onToggleLike={handleToggleLike}
          onInspectDossier={handleInspectHackathon}
        />

        <AIContestSection
          searchQuery={searchQuery}
          onSelectTag={handleToggleTag}
          likedIds={likedIds}
          onToggleLike={handleToggleLike}
          onInspectDossier={handleInspectAIContest}
        />

        <SourceAtlasSection
          searchQuery={searchQuery}
          onSelectTag={handleToggleTag}
          likedIds={likedIds}
          onToggleLike={handleToggleLike}
        />
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
