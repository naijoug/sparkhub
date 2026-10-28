"use client";

import { hackathonCards, HackathonCard } from "@/lib/data";

const badgeColors: Record<string, string> = {
  purple: "bg-purple text-white border-white/20",
  yellow: "bg-yellow text-white border-white/20",
  green: "bg-green text-white border-white/20",
  accent: "bg-accent text-white border-white/20",
};

interface HackathonSectionProps {
  searchQuery?: string;
  onSelectTag?: (tag: string) => void;
  likedIds?: string[];
  onToggleLike?: (id: string) => void;
  onInspectDossier?: (item: HackathonCard) => void;
}

export default function HackathonSection({
  searchQuery = "",
  onSelectTag,
  likedIds = [],
  onToggleLike,
  onInspectDossier,
}: HackathonSectionProps) {
  const normalizedQuery = searchQuery.trim().toLowerCase();

  const filteredCards = hackathonCards.filter(
    (card) =>
      !normalizedQuery ||
      card.title.toLowerCase().includes(normalizedQuery) ||
      card.summary.toLowerCase().includes(normalizedQuery) ||
      card.team.toLowerCase().includes(normalizedQuery) ||
      card.badge.toLowerCase().includes(normalizedQuery) ||
      (card.tags && card.tags.some((t) => t.toLowerCase().includes(normalizedQuery)))
  );

  return (
    <section
      id="hackathons"
      className="bg-bg-card/65 border-b border-border px-6 lg:px-12 py-16"
    >
      <div className="max-w-[1440px] mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-8 mb-8 border-b border-border">
          <div className="space-y-2.5">
            <div className="flex items-center gap-3 text-[11px] font-mono-meta uppercase text-muted">
              <span className="px-2 py-0.5 rounded bg-surface border border-border text-dark font-semibold">
                WING III · 展馆三
              </span>
              <span>EXPERIMENTAL PROTOTYPES · 极客先锋造物</span>
            </div>
            <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-dark">
              黑客松作品精选 ·{" "}
              <span className="italic font-normal text-secondary">
                Hackathon Specimens
              </span>
            </h2>
          </div>
          <a
            href="https://ethglobal.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-mono-meta uppercase text-accent hover:text-dark transition-colors"
          >
            <span>EXPLORE GLOBAL HACKATHONS · 探索全球赛事动态</span>
            <span>↗</span>
          </a>
        </div>

        {filteredCards.length === 0 ? (
          <div className="py-12 text-center text-sm text-muted bg-surface rounded-2xl border border-border">
            暂无匹配“{searchQuery}”的黑客松实验原型。
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCards.map((card, idx) => {
              const isLiked = likedIds.includes(card.id);

              return (
                <div
                  key={card.id}
                  role="button"
                  tabIndex={0}
                  onClick={() => onInspectDossier?.(card)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      onInspectDossier?.(card);
                    }
                  }}
                  className="group flex flex-col bg-surface rounded-2xl border border-border overflow-hidden shadow-[0_4px_16px_rgba(20,19,18,0.04)] hover:shadow-[0_16px_38px_rgba(20,19,18,0.11)] hover:border-dark/40 hover:-translate-y-1 transition-all duration-300 cursor-pointer text-left"
                >
                  {/* Blueprint Plate Image */}
                  <div
                    className={`relative w-full h-[200px] bg-gradient-to-br ${card.image} flex flex-col justify-between p-5 overflow-hidden`}
                  >
                    <div className="absolute inset-3 border border-white/15 rounded-xl pointer-events-none" />

                    {/* Subtle architectural blueprint overlay */}
                    <svg
                      viewBox="0 0 180 120"
                      className="absolute inset-0 w-full h-full opacity-35 group-hover:scale-105 transition-transform duration-700 pointer-events-none"
                      fill="none"
                    >
                      <circle
                        cx="90"
                        cy="60"
                        r={28 + idx * 4}
                        stroke="white"
                        strokeWidth="1"
                        strokeDasharray="3 3"
                      />
                      <line x1="20" y1="60" x2="160" y2="60" stroke="white" strokeWidth="0.7" />
                      <line x1="90" y1="15" x2="90" y2="105" stroke="white" strokeWidth="0.7" />
                      <rect
                        x="64"
                        y="34"
                        width="52"
                        height="52"
                        transform={`rotate(${idx * 15} 90 60)`}
                        stroke="white"
                        strokeWidth="1"
                      />
                    </svg>

                    <div className="relative z-10 flex items-center justify-between text-[10px] font-mono-meta text-white/80">
                      <span>{card.catalogNo}</span>
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onToggleLike?.(card.id);
                          }}
                          className={`p-1 rounded-full text-xs transition-colors cursor-pointer ${
                            isLiked
                              ? "bg-accent text-white"
                              : "bg-black/40 text-white/80 hover:bg-black/70 hover:text-white"
                          }`}
                          aria-label={`收藏 ${card.title}`}
                        >
                          {isLiked ? "♥" : "♡"}
                        </button>
                        <span>DOSSIER ↗</span>
                      </div>
                    </div>

                    <div className="relative z-10 flex items-center justify-between">
                      <span
                        className={`inline-flex items-center h-6 px-3 rounded-full text-[11px] font-semibold border shadow-sm ${badgeColors[card.badgeColor]}`}
                      >
                        ✦ {card.badge}
                      </span>
                      <span className="text-[10px] font-mono-meta text-white/70">
                        {String(idx + 1).padStart(2, "0")} / {String(hackathonCards.length).padStart(2, "0")}
                      </span>
                    </div>
                  </div>

                  {/* Plaque Content */}
                  <div className="flex flex-col gap-2.5 p-5 flex-1">
                    <h3 className="font-editorial text-lg font-bold text-dark group-hover:text-accent transition-colors leading-snug">
                      {card.title}
                    </h3>
                    <p className="text-xs text-secondary leading-[1.7]">
                      {card.summary}
                    </p>

                    {card.tags && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {card.tags.map((tag) => (
                          <button
                            key={tag}
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              onSelectTag?.(tag);
                            }}
                            className="text-[10px] font-mono-meta px-2 py-0.5 rounded bg-bg-light text-secondary hover:bg-dark hover:text-white transition-colors cursor-pointer"
                          >
                            #{tag}
                          </button>
                        ))}
                      </div>
                    )}

                    <div className="mt-auto pt-3 border-t border-border/75 flex items-center justify-between text-[10px] font-mono-meta text-muted">
                      <span>{card.team}</span>
                      <span className="text-dark group-hover:text-accent transition-colors">
                        INSPECT →
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
