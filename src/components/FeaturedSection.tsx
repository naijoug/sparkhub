"use client";

import { useEffect, useState } from "react";
import { featuredCards, DesignCard as DesignCardType } from "@/lib/data";
import DesignCard, { ArtMotifGraphic } from "./DesignCard";

interface FeaturedSectionProps {
  activeCategory?: string;
  searchQuery?: string;
  onSelectTag?: (tag: string) => void;
  likedIds?: string[];
  onToggleLike?: (id: string) => void;
}

export default function FeaturedSection({
  activeCategory = "all",
  searchQuery = "",
  onSelectTag,
  likedIds = [],
  onToggleLike,
}: FeaturedSectionProps) {
  const [selectedCard, setSelectedCard] = useState<DesignCardType | null>(null);

  const normalizedQuery = searchQuery.trim().toLowerCase();

  const filteredCards = featuredCards.filter((card) => {
    const matchesCategory =
      activeCategory === "all" || card.categoryId === activeCategory;
    const matchesQuery =
      !normalizedQuery ||
      card.title.toLowerCase().includes(normalizedQuery) ||
      card.subtitle.toLowerCase().includes(normalizedQuery) ||
      card.author.toLowerCase().includes(normalizedQuery) ||
      card.medium.toLowerCase().includes(normalizedQuery) ||
      card.tags.some((t) => t.label.toLowerCase().includes(normalizedQuery));
    return matchesCategory && matchesQuery;
  });

  const selectedIndex = selectedCard
    ? filteredCards.findIndex((c) => c.id === selectedCard.id)
    : -1;

  useEffect(() => {
    if (!selectedCard) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedCard(null);
      } else if (e.key === "ArrowRight" && filteredCards.length > 1) {
        const idx = filteredCards.findIndex((c) => c.id === selectedCard.id);
        if (idx !== -1) {
          setSelectedCard(filteredCards[(idx + 1) % filteredCards.length]);
        }
      } else if (e.key === "ArrowLeft" && filteredCards.length > 1) {
        const idx = filteredCards.findIndex((c) => c.id === selectedCard.id);
        if (idx !== -1) {
          setSelectedCard(
            filteredCards[
              (idx - 1 + filteredCards.length) % filteredCards.length
            ]
          );
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedCard, filteredCards]);

  return (
    <section
      id="featured"
      className="border-b border-border px-6 lg:px-12 py-16"
    >
      <div className="max-w-[1440px] mx-auto">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-8 mb-8 border-b border-border">
          <div className="space-y-2.5">
            <div className="flex items-center gap-3 text-[11px] font-mono-meta uppercase text-muted">
              <span className="px-2 py-0.5 rounded bg-bg-card border border-border text-dark font-semibold">
                WING II · 展馆二
              </span>
              <span>PERMANENT COLLECTION · 常设数字设计馆藏</span>
              {likedIds.length > 0 && (
                <span className="px-2 py-0.5 rounded bg-accent-light text-accent border border-accent/25">
                  SAVED: {likedIds.length}
                </span>
              )}
            </div>
            <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-dark">
              精选视觉与交互作品 ·{" "}
              <span className="italic font-normal text-secondary">
                Selected Works
              </span>
            </h2>
          </div>
          <p className="text-xs font-mono-meta text-muted">
            CLICK ANY PLATE TO INSPECT CURATORIAL DOSSIER · 点击展板开启文献灯箱
          </p>
        </div>

        {/* Asymmetric Museum Wall Grid */}
        {filteredCards.length === 0 ? (
          <div className="py-14 text-center text-sm text-muted bg-surface rounded-2xl border border-border">
            当前筛选条件下暂无常设馆藏作品，请尝试切换上方展馆分类或清空检索词。
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {filteredCards.map((card) => (
              <DesignCard
                key={card.id}
                card={card}
                liked={likedIds.includes(card.id)}
                onToggleLike={onToggleLike}
                onSelectCard={(item) => setSelectedCard(item)}
                onSelectTag={onSelectTag}
                activeSearchQuery={searchQuery}
              />
            ))}
          </div>
        )}
      </div>

      {/* Museum Exhibition Dossier Lightbox Modal */}
      {selectedCard && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="lightbox-title"
          className="fixed inset-0 z-50 bg-dark/70 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={() => setSelectedCard(null)}
        >
          <div
            className="bg-surface border border-dark/30 rounded-3xl max-w-3xl w-full overflow-hidden shadow-[0_24px_70px_rgba(20,19,18,0.35)] art-frame"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Dossier Bar */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-bg-light">
              <div className="flex items-center gap-2.5 text-xs font-mono-meta text-muted">
                <span className="text-accent">◆</span>
                <span className="text-dark font-semibold">
                  {selectedCard.catalogNo}
                </span>
                <span>·</span>
                <span>{selectedCard.medium}</span>
              </div>
              <div className="flex items-center gap-2">
                {filteredCards.length > 1 && selectedIndex !== -1 && (
                  <div className="flex items-center gap-1 mr-1">
                    <button
                      type="button"
                      onClick={() =>
                        setSelectedCard(
                          filteredCards[
                            (selectedIndex - 1 + filteredCards.length) %
                              filteredCards.length
                          ]
                        )
                      }
                      aria-label="上一件展品"
                      className="text-[11px] font-mono-meta px-2.5 py-1 rounded-full border border-border hover:border-dark bg-surface text-secondary hover:text-dark cursor-pointer transition-colors"
                    >
                      ← PREV
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setSelectedCard(
                          filteredCards[
                            (selectedIndex + 1) % filteredCards.length
                          ]
                        )
                      }
                      aria-label="下一件展品"
                      className="text-[11px] font-mono-meta px-2.5 py-1 rounded-full border border-border hover:border-dark bg-surface text-secondary hover:text-dark cursor-pointer transition-colors"
                    >
                      NEXT →
                    </button>
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => setSelectedCard(null)}
                  className="text-[11px] font-mono-meta px-3 py-1 rounded-full border border-border hover:border-dark bg-surface text-secondary hover:text-dark cursor-pointer transition-colors"
                >
                  ESC / CLOSE ✕
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12">
              {/* Left: Generative Plate View */}
              <div
                className={`md:col-span-6 min-h-[260px] bg-gradient-to-br ${selectedCard.image} relative flex flex-col items-center justify-center p-8 text-white`}
              >
                <div className="absolute inset-4 border border-white/20 rounded-2xl pointer-events-none" />
                <ArtMotifGraphic motif={selectedCard.artMotif} />
                <div className="absolute bottom-5 left-6 right-6 flex items-center justify-between text-[10px] font-mono-meta uppercase opacity-80">
                  <span>MOTIF // {selectedCard.artMotif}</span>
                  <span>YEAR // {selectedCard.year}</span>
                </div>
              </div>

              {/* Right: Curatorial Critique & Provenance */}
              <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between gap-6">
                <div className="space-y-4">
                  <div>
                    <span className="text-[11px] font-mono-meta uppercase text-accent font-semibold">
                      {selectedCard.author}
                    </span>
                    <h3
                      id="lightbox-title"
                      className="font-editorial text-2xl sm:text-[26px] font-bold text-dark mt-1 leading-snug"
                    >
                      {selectedCard.title}
                    </h3>
                  </div>

                  <p className="text-sm text-secondary leading-[1.8]">
                    {selectedCard.subtitle}。
                  </p>

                  {selectedCard.curatorCritique && (
                    <div className="relative pl-3.5 border-l-2 border-accent bg-bg-light/95 py-2.5 pr-3 rounded-r-lg">
                      <span className="font-mono-meta text-[10px] uppercase text-accent font-semibold block mb-0.5">
                        CURATORIAL CRITIQUE //
                      </span>
                      <p className="font-editorial italic text-xs text-dark/95 leading-relaxed">
                        “{selectedCard.curatorCritique}”
                      </p>
                    </div>
                  )}

                  <div className="p-3.5 rounded-xl bg-bg-light border border-border space-y-1.5">
                    <div className="text-[10px] font-mono-meta uppercase text-muted">
                      ARCHIVAL PROVENANCE / 馆藏著录
                    </div>
                    <div className="text-xs text-dark font-mono-meta">
                      MEDIUM: {selectedCard.medium} ({selectedCard.year})
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {selectedCard.tags.map((t) => (
                      <button
                        key={t.label}
                        type="button"
                        onClick={() => {
                          onSelectTag?.(t.label);
                          setSelectedCard(null);
                        }}
                        className="text-[11px] font-mono-meta px-2.5 py-0.5 rounded-full bg-bg-card border border-border text-secondary hover:border-dark hover:text-dark cursor-pointer transition-colors"
                      >
                        #{t.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-border text-xs font-mono-meta text-muted">
                  <button
                    type="button"
                    onClick={() => onToggleLike?.(selectedCard.id)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border transition-colors cursor-pointer ${
                      likedIds.includes(selectedCard.id)
                        ? "bg-accent-light text-accent border-accent/30 font-semibold"
                        : "bg-bg-light text-secondary border-border hover:border-dark"
                    }`}
                  >
                    <span>{likedIds.includes(selectedCard.id) ? "♥ SAVED" : "♡ APPRECIATE"}</span>
                    <span>
                      ({likedIds.includes(selectedCard.id) ? `${selectedCard.likes}+` : selectedCard.likes})
                    </span>
                  </button>

                  {selectedCard.href && (
                    <a
                      href={selectedCard.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-dark hover:text-accent transition-colors"
                    >
                      <span>VISIT ↗</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
