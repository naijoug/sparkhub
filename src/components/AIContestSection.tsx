"use client";

import { useMemo } from "react";
import { AIContestCard } from "@/lib/data";
import { filterAIContestCards } from "@/lib/filters";
import {
  BookmarkPillButton,
  EmptySectionState,
  TagChipButton,
} from "./CuratorialPrimitives";

const badgeColors: Record<string, string> = {
  purple: "bg-purple text-white border-white/25",
  yellow: "bg-yellow text-white border-white/25",
  green: "bg-green text-white border-white/25",
  accent: "bg-accent text-white border-white/25",
};

interface AIContestSectionProps {
  searchQuery?: string;
  onSelectTag?: (tag: string) => void;
  likedIds?: string[];
  onToggleLike?: (id: string) => void;
  onInspectDossier?: (item: AIContestCard) => void;
  viewMode?: "comfort" | "compact";
  favoritesOnly?: boolean;
}

export default function AIContestSection({
  searchQuery = "",
  onSelectTag,
  likedIds = [],
  onToggleLike,
  onInspectDossier,
  viewMode = "comfort",
  favoritesOnly = false,
}: AIContestSectionProps) {
  const filteredCards = useMemo(
    () => filterAIContestCards(searchQuery, favoritesOnly, likedIds),
    [searchQuery, favoritesOnly, likedIds]
  );

  const isCompact = viewMode === "compact";

  return (
    <section
      id="ai-contests"
      className="relative overflow-hidden bg-[#141312] text-[#F6F2E9] px-6 lg:px-12 py-20 border-b border-white/10"
    >
      {/* Subtle museum dark-room ambient light */}
      <div className="pointer-events-none absolute -top-24 left-1/4 w-96 h-96 rounded-full bg-accent/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 right-1/4 w-96 h-96 rounded-full bg-purple/15 blur-3xl" />

      <div className="relative z-10 max-w-[1440px] mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-8 mb-10 border-b border-white/15">
          <div className="space-y-2.5">
            <div className="flex items-center gap-3 text-[11px] font-mono-meta uppercase text-white/60">
              <span className="px-2.5 py-0.5 rounded bg-white/10 border border-white/20 text-[#F6F2E9] font-semibold">
                WING IV · 暗房特展
              </span>
              <span>GENERATIVE SYMPOSIUM · 算法与合成美学</span>
            </div>
            <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-[#F6F2E9]">
              AI 大赛佳作 ·{" "}
              <span className="italic font-normal text-white/65">
                Latent Space Synthesis
              </span>
            </h2>
          </div>
          <a
            href="https://www.producthunt.com/categories/ai-designer"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-mono-meta uppercase text-[#F9EAE6] hover:text-white transition-colors"
          >
            <span>EXPLORE GENERATIVE ATELIER · 探索更多生成式工具</span>
            <span>↗</span>
          </a>
        </div>

        {filteredCards.length === 0 ? (
          <EmptySectionState
            favoritesOnly={favoritesOnly}
            favoritesText="算法美学展区中暂无已收藏作品，点击展品卡片右上角的「♡ 收藏」即可加入。"
            emptyText={`暂无匹配“${searchQuery}”的生成式艺术佳作。`}
            className="py-12 text-center text-sm text-white/60 bg-white/5 rounded-2xl border border-white/10"
          />
        ) : (
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 ${
              isCompact ? "lg:grid-cols-3 gap-4" : "lg:grid-cols-3 gap-6"
            }`}
          >
            {filteredCards.map((card, idx) => {
              const isLiked = likedIds.includes(card.id);

              return (
                <article
                  key={card.id}
                  className="group relative flex flex-col bg-[#1E1C1A] rounded-2xl overflow-hidden border border-white/12 hover:border-white/35 shadow-[0_8px_28px_rgba(0,0,0,0.35)] hover:-translate-y-1 transition-all duration-300 text-left"
                >
                  {/* Luminous Latent-Space Plate */}
                  <div
                    className={`relative w-full ${
                      isCompact ? "h-[140px]" : "h-[190px]"
                    } bg-gradient-to-br ${card.image} flex flex-col justify-between p-5 overflow-hidden`}
                  >
                    <div className="absolute inset-3 border border-white/20 rounded-xl pointer-events-none" />

                    {/* Generative wave / mesh overlay */}
                    <svg
                      viewBox="0 0 180 120"
                      className="absolute inset-0 w-full h-full opacity-40 group-hover:scale-110 transition-transform duration-700 pointer-events-none"
                      fill="none"
                    >
                      <ellipse
                        cx="90"
                        cy="60"
                        rx="65"
                        ry="24"
                        transform={`rotate(${20 - idx * 12} 90 60)`}
                        stroke="white"
                        strokeWidth="1.1"
                      />
                      <ellipse
                        cx="90"
                        cy="60"
                        rx="65"
                        ry="24"
                        transform={`rotate(${-25 + idx * 10} 90 60)`}
                        stroke="white"
                        strokeWidth="0.8"
                        strokeDasharray="2 3"
                      />
                      <circle
                        cx="90"
                        cy="60"
                        r="14"
                        stroke="white"
                        strokeWidth="1.2"
                      />
                    </svg>

                    <div className="relative z-10 flex items-center justify-between text-[10px] font-mono-meta text-white/80">
                      <span>{card.catalogNo}</span>
                      <div className="flex items-center gap-1.5">
                        <BookmarkPillButton
                          liked={isLiked}
                          title={card.title}
                          onToggle={() => onToggleLike?.(card.id)}
                          variant="dark"
                        />
                      </div>
                    </div>

                    <span
                      className={`relative z-10 self-start inline-flex items-center h-6 px-3 rounded-full text-[11px] font-semibold border ${badgeColors[card.badgeColor]}`}
                    >
                      ◈ {card.badge}
                    </span>
                  </div>

                  {/* Dark Gallery Placard Content */}
                  <div className="flex flex-col gap-2.5 p-5 flex-1">
                    <h3 className="font-editorial text-lg font-bold text-[#F6F2E9] group-hover:text-[#F9EAE6] transition-colors leading-snug">
                      <button
                        type="button"
                        onClick={() => onInspectDossier?.(card)}
                        className="text-left cursor-pointer after:absolute after:inset-0 after:z-0 focus-visible:outline-2 focus-visible:outline-accent rounded-sm"
                      >
                        {card.title}
                      </button>
                    </h3>
                    <p
                      className={`text-xs text-white/70 leading-[1.7] ${
                        isCompact ? "line-clamp-2" : ""
                      }`}
                    >
                      {card.curatorNote}
                    </p>

                    {card.tags && (
                      <div className="relative z-10 flex flex-wrap gap-1.5 pt-1">
                        {card.tags.map((tag) => (
                          <TagChipButton
                            key={tag}
                            tag={tag}
                            onSelectTag={onSelectTag}
                            variant="dark"
                          />
                        ))}
                      </div>
                    )}

                    <p className="text-[10px] font-mono-meta text-white/45 mt-auto pt-3 border-t border-white/10">
                      {card.meta}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
