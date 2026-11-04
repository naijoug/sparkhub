"use client";

import { useEffect } from "react";
import { DesignCard as DesignCardType } from "@/lib/data";
import Modal from "./Modal";
import { ArtMotifGraphic } from "./DesignCard";

interface FeaturedArtworkModalProps {
  card: DesignCardType | null;
  cards: DesignCardType[];
  liked: boolean;
  onClose: () => void;
  onSelectCard: (card: DesignCardType) => void;
  onToggleLike?: (id: string) => void;
  onSelectTag?: (tag: string) => void;
}

export default function FeaturedArtworkModal({
  card,
  cards,
  liked,
  onClose,
  onSelectCard,
  onToggleLike,
  onSelectTag,
}: FeaturedArtworkModalProps) {
  const selectedIndex = card ? cards.findIndex((c) => c.id === card.id) : -1;

  useEffect(() => {
    if (!card) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" && cards.length > 1) {
        const idx = cards.findIndex((c) => c.id === card.id);
        if (idx !== -1) {
          onSelectCard(cards[(idx + 1) % cards.length]);
        }
      } else if (e.key === "ArrowLeft" && cards.length > 1) {
        const idx = cards.findIndex((c) => c.id === card.id);
        if (idx !== -1) {
          onSelectCard(cards[(idx - 1 + cards.length) % cards.length]);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [card, cards, onSelectCard]);

  if (!card) return null;

  return (
    <Modal open={Boolean(card)} onClose={onClose} labelledBy="lightbox-title">
      <div
        className="bg-surface border border-dark/30 rounded-3xl max-w-3xl w-full max-h-full flex flex-col overflow-hidden shadow-[0_24px_70px_rgba(20,19,18,0.35)] art-frame"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Dossier Bar */}
        <div className="flex shrink-0 flex-wrap items-center justify-between gap-3 px-4 sm:px-6 py-4 border-b border-border bg-bg-light">
          <div className="flex min-w-0 flex-wrap items-center gap-2.5 text-xs font-mono-meta text-muted">
            <span className="text-accent">◆</span>
            <span className="text-dark font-semibold">{card.catalogNo}</span>
            <span>·</span>
            <span>{card.medium}</span>
          </div>
          <div className="flex min-w-0 flex-wrap items-center gap-2">
            {cards.length > 1 && selectedIndex !== -1 && (
              <div className="flex items-center gap-1 mr-1">
                <button
                  type="button"
                  onClick={() =>
                    onSelectCard(
                      cards[(selectedIndex - 1 + cards.length) % cards.length]
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
                    onSelectCard(cards[(selectedIndex + 1) % cards.length])
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
              onClick={onClose}
              className="text-[11px] font-mono-meta px-3 py-1 rounded-full border border-border hover:border-dark bg-surface text-secondary hover:text-dark cursor-pointer transition-colors"
            >
              ESC / CLOSE ✕
            </button>
          </div>
        </div>

        <div className="grid min-h-0 overflow-y-auto overscroll-contain grid-cols-1 md:grid-cols-12">
          {/* Left: Generative Plate View */}
          <div
            className={`md:col-span-6 min-h-[260px] bg-gradient-to-br ${card.image} relative flex flex-col items-center justify-center p-8 text-white`}
          >
            <div className="absolute inset-4 border border-white/20 rounded-2xl pointer-events-none" />
            <ArtMotifGraphic motif={card.artMotif} />
            <div className="absolute bottom-5 left-6 right-6 flex items-center justify-between text-[10px] font-mono-meta uppercase opacity-80">
              <span>MOTIF // {card.artMotif}</span>
              <span>YEAR // {card.year}</span>
            </div>
          </div>

          {/* Right: Curatorial Critique & Provenance */}
          <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between gap-6">
            <div className="space-y-4">
              <div>
                <span className="text-[11px] font-mono-meta uppercase text-accent font-semibold">
                  {card.author}
                </span>
                <h3
                  id="lightbox-title"
                  className="font-editorial text-2xl sm:text-[26px] font-bold text-dark mt-1 leading-snug"
                >
                  {card.title}
                </h3>
              </div>

              <p className="text-sm text-secondary leading-[1.8]">
                {card.subtitle}。
              </p>

              {card.curatorCritique && (
                <div className="relative pl-3.5 border-l-2 border-accent bg-bg-light/95 py-2.5 pr-3 rounded-r-lg">
                  <span className="font-mono-meta text-[10px] uppercase text-accent font-semibold block mb-0.5">
                    CURATORIAL CRITIQUE //
                  </span>
                  <p className="font-editorial italic text-xs text-dark/95 leading-relaxed">
                    “{card.curatorCritique}”
                  </p>
                </div>
              )}

              <div className="p-3.5 rounded-xl bg-bg-light border border-border space-y-1.5">
                <div className="text-[10px] font-mono-meta uppercase text-muted">
                  ARCHIVAL PROVENANCE / 馆藏著录
                </div>
                <div className="text-xs text-dark font-mono-meta">
                  MEDIUM: {card.medium} ({card.year})
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {card.tags.map((t) => (
                  <button
                    key={t.label}
                    type="button"
                    onClick={() => {
                      onSelectTag?.(t.label);
                      onClose();
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
                onClick={() => onToggleLike?.(card.id)}
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border transition-colors cursor-pointer ${
                  liked
                    ? "bg-accent-light text-accent border-accent/30 font-semibold"
                    : "bg-bg-light text-secondary border-border hover:border-dark"
                }`}
              >
                <span>
                  {liked ? "♥ SAVED · 已收藏" : "♡ APPRECIATE · 收藏"}
                </span>
                <span>({liked ? `${card.likes}+` : card.likes})</span>
              </button>

              {card.href && (
                <a
                  href={card.href}
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
    </Modal>
  );
}
