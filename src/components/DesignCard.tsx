"use client";

import { DesignCard as DesignCardType } from "@/lib/data";

const tagColors: Record<string, string> = {
  accent: "bg-accent-light text-accent border-accent/25 hover:bg-accent hover:text-white",
  purple: "bg-purple-light text-purple border-purple/25 hover:bg-purple hover:text-white",
  green: "bg-green-light text-green border-green/25 hover:bg-green hover:text-white",
  yellow: "bg-yellow-light text-yellow border-yellow/25 hover:bg-yellow hover:text-white",
};

interface DesignCardProps {
  card: DesignCardType;
  liked?: boolean;
  onToggleLike?: (id: string) => void;
  onSelectCard?: (card: DesignCardType) => void;
  onSelectTag?: (tag: string) => void;
  activeSearchQuery?: string;
  compact?: boolean;
}

export default function DesignCard({
  card,
  liked = false,
  onToggleLike,
  onSelectCard,
  onSelectTag,
  activeSearchQuery = "",
  compact = false,
}: DesignCardProps) {
  const isWide = !compact && card.featuredSpan === "wide";
  const normalizedSearch = activeSearchQuery.trim().toLowerCase();

  return (
    <article
      role="button"
      tabIndex={0}
      aria-label={`查看展品 ${card.title} 详情`}
      onClick={() => onSelectCard?.(card)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelectCard?.(card);
        }
      }}
      className={`group flex flex-col bg-surface rounded-2xl border border-border overflow-hidden shadow-[0_4px_18px_rgba(20,19,18,0.04)] hover:shadow-[0_18px_42px_rgba(20,19,18,0.12)] hover:border-dark/40 transition-all duration-300 cursor-pointer focus-visible:outline-2 focus-visible:outline-accent ${
        isWide ? "lg:col-span-2" : ""
      }`}
    >
      {/* Top Archival Placard Header */}
      <div className="flex items-center justify-between px-5 py-2.5 border-b border-border bg-bg-light/75 text-[10px] font-mono-meta text-muted">
        <div className="flex items-center gap-2">
          <span className="text-accent font-semibold">◆</span>
          <span className="text-dark font-medium">{card.catalogNo}</span>
          {isWide && (
            <span className="px-2 py-0.5 rounded bg-accent-light text-accent border border-accent/25 text-[9px]">
              重点展品
            </span>
          )}
        </div>
        <span>
          {card.medium} · {card.year}
        </span>
      </div>

      {/* Artistic Generative Canvas */}
      <div
        className={`relative w-full ${
          compact
            ? "h-[150px]"
            : isWide
              ? "h-[260px] sm:h-[280px]"
              : "h-[230px]"
        } bg-gradient-to-br ${card.image} flex items-center justify-center overflow-hidden p-6`}
      >
        {/* Inner gallery mat border & corner crosshairs */}
        <div className="absolute inset-3.5 border border-white/20 rounded-xl pointer-events-none" />
        <span className="absolute top-4 left-4 text-[9px] font-mono-meta text-white/45 pointer-events-none">
          FIG. {card.id.padStart(2, "0")}
        </span>
        <span className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-mono-meta uppercase px-2.5 py-1 rounded-full bg-black/55 text-white border border-white/20 backdrop-blur-md">
          查看详情 ↗
        </span>

        <ArtMotifGraphic motif={card.artMotif} />

        <div className="absolute bottom-3.5 left-4 right-4 flex items-center justify-between text-[10px] font-mono-meta uppercase tracking-widest text-white/75 pointer-events-none">
          <span>{card.artMotif}</span>
          <span>{card.author}</span>
        </div>
      </div>

      {/* Editorial Plaque Content */}
      <div
        className={`flex flex-col gap-3 ${
          compact ? "p-4" : "p-6"
        } flex-1 justify-between`}
      >
        <div className="space-y-2">
          <div className="flex items-baseline justify-between gap-3">
            <h3
              className={`font-editorial ${
                compact ? "text-lg" : "text-xl sm:text-[22px]"
              } font-bold text-dark group-hover:text-accent transition-colors leading-snug`}
            >
              {card.title}
            </h3>
          </div>
          <p
            className={`text-xs sm:text-[13px] text-secondary leading-[1.7] ${
              compact ? "line-clamp-2" : ""
            }`}
          >
            {card.subtitle}
          </p>
        </div>

        <div className="pt-3.5 mt-2 border-t border-border/80 flex items-center justify-between gap-2">
          {/* Tags */}
          <div className="flex flex-wrap gap-1.5">
            {card.tags.map((tag) => {
              const isSelected = normalizedSearch === tag.label.toLowerCase();
              return (
                <button
                  key={tag.label}
                  type="button"
                  onClick={(e) => {
                    if (!onSelectTag) return;
                    e.stopPropagation();
                    onSelectTag(tag.label);
                  }}
                  className={`inline-flex items-center h-[23px] px-2.5 rounded-full text-[11px] font-medium border transition-colors cursor-pointer ${
                    isSelected
                      ? "bg-dark text-surface border-dark"
                      : tagColors[tag.color]
                  }`}
                >
                  #{tag.label}
                </button>
              );
            })}
          </div>

          {/* Stats & Bookmark */}
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onToggleLike?.(card.id);
              }}
              aria-pressed={liked}
              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full border text-[11px] font-mono-meta transition-colors cursor-pointer ${
                liked
                  ? "bg-accent text-white border-accent font-semibold"
                  : "bg-bg-light border-border text-secondary hover:text-dark hover:border-dark"
              }`}
              aria-label={`收藏 ${card.title}`}
            >
              <HeartIcon filled={liked} />
              <span>{liked ? "已收藏" : "收藏"}</span>
              <span className="opacity-80">
                {liked ? `${card.likes}+` : card.likes}
              </span>
            </button>
            {!compact && (
              <span className="inline-flex items-center gap-1 text-xs font-mono-meta text-muted">
                <EyeIcon />
                {card.views}
              </span>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

export function ArtMotifGraphic({
  motif,
}: {
  motif: DesignCardType["artMotif"];
}) {
  switch (motif) {
    case "bauhaus":
      return (
        <svg viewBox="0 0 220 140" className="w-52 h-36 group-hover:scale-105 transition-transform duration-700" fill="none">
          <line x1="10" y1="70" x2="210" y2="70" stroke="rgba(255,255,255,0.2)" strokeDasharray="3 3" />
          <circle cx="80" cy="70" r="46" stroke="rgba(255,255,255,0.88)" strokeWidth="1.5" />
          <circle cx="80" cy="70" r="22" stroke="rgba(255,255,255,0.45)" strokeWidth="1" />
          <rect x="96" y="32" width="72" height="72" stroke="rgba(255,255,255,0.72)" strokeWidth="1.5" />
          <line x1="30" y1="118" x2="188" y2="22" stroke="rgba(255,255,255,0.5)" strokeWidth="1.2" />
          <circle cx="132" cy="68" r="7" fill="rgba(255,255,255,0.92)" />
        </svg>
      );
    case "orbital":
      return (
        <svg viewBox="0 0 220 140" className="w-52 h-36 group-hover:scale-105 transition-transform duration-700" fill="none">
          <ellipse cx="110" cy="70" rx="80" ry="32" transform="rotate(-18 110 70)" stroke="rgba(255,255,255,0.85)" strokeWidth="1.5" />
          <ellipse cx="110" cy="70" rx="80" ry="32" transform="rotate(24 110 70)" stroke="rgba(255,255,255,0.45)" strokeWidth="1.2" />
          <circle cx="110" cy="70" r="38" stroke="rgba(255,255,255,0.25)" strokeDasharray="2 3" />
          <circle cx="110" cy="70" r="16" stroke="rgba(255,255,255,0.92)" strokeWidth="1.5" />
          <circle cx="162" cy="50" r="4.5" fill="white" />
          <circle cx="62" cy="88" r="3.5" fill="rgba(255,255,255,0.75)" />
        </svg>
      );
    case "editorial":
      return (
        <svg viewBox="0 0 220 140" className="w-52 h-36 group-hover:scale-105 transition-transform duration-700" fill="none">
          <rect x="38" y="20" width="144" height="100" rx="4" stroke="rgba(255,255,255,0.85)" strokeWidth="1.5" />
          <line x1="38" y1="46" x2="182" y2="46" stroke="rgba(255,255,255,0.55)" strokeWidth="1.2" />
          <line x1="90" y1="46" x2="90" y2="120" stroke="rgba(255,255,255,0.55)" strokeWidth="1.2" />
          <line x1="50" y1="64" x2="78" y2="64" stroke="rgba(255,255,255,0.5)" strokeWidth="1.2" />
          <line x1="50" y1="78" x2="74" y2="78" stroke="rgba(255,255,255,0.35)" strokeWidth="1.2" />
          <circle cx="136" cy="83" r="20" stroke="rgba(255,255,255,0.9)" strokeWidth="1.5" />
        </svg>
      );
    case "prism":
      return (
        <svg viewBox="0 0 220 140" className="w-52 h-36 group-hover:scale-105 transition-transform duration-700" fill="none">
          <circle cx="110" cy="74" r="52" stroke="rgba(255,255,255,0.22)" strokeDasharray="3 3" />
          <polygon points="110,18 170,116 50,116" stroke="rgba(255,255,255,0.88)" strokeWidth="1.5" />
          <polygon points="110,38 150,106 70,106" stroke="rgba(255,255,255,0.48)" strokeWidth="1.2" />
          <line x1="110" y1="18" x2="110" y2="116" stroke="rgba(255,255,255,0.45)" strokeDasharray="3 3" />
        </svg>
      );
    case "kinetic":
      return (
        <svg viewBox="0 0 220 140" className="w-52 h-36 group-hover:scale-105 transition-transform duration-700" fill="none">
          <path d="M20 88 Q 65 16, 110 68 T 200 46" stroke="rgba(255,255,255,0.92)" strokeWidth="2" />
          <path d="M20 104 Q 65 32, 110 84 T 200 62" stroke="rgba(255,255,255,0.5)" strokeWidth="1.3" />
          <path d="M20 118 Q 65 48, 110 98 T 200 78" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
          <circle cx="110" cy="68" r="5.5" fill="white" />
        </svg>
      );
    case "matrix":
      return (
        <svg viewBox="0 0 220 140" className="w-52 h-36 group-hover:scale-105 transition-transform duration-700" fill="none">
          <line x1="20" y1="35" x2="200" y2="35" stroke="rgba(255,255,255,0.25)" strokeWidth="0.8" strokeDasharray="3 3" />
          <line x1="20" y1="70" x2="200" y2="70" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
          <line x1="20" y1="105" x2="200" y2="105" stroke="rgba(255,255,255,0.25)" strokeWidth="0.8" strokeDasharray="3 3" />
          <line x1="65" y1="15" x2="65" y2="125" stroke="rgba(255,255,255,0.3)" strokeWidth="0.8" />
          <line x1="110" y1="15" x2="110" y2="125" stroke="rgba(255,255,255,0.6)" strokeWidth="1.2" />
          <line x1="155" y1="15" x2="155" y2="125" stroke="rgba(255,255,255,0.3)" strokeWidth="0.8" />
          <circle cx="110" cy="70" r="18" stroke="rgba(255,255,255,0.92)" strokeWidth="1.5" />
          <rect x="58" y="28" width="14" height="14" stroke="rgba(255,255,255,0.7)" strokeWidth="1" />
          <rect x="148" y="98" width="14" height="14" stroke="rgba(255,255,255,0.7)" strokeWidth="1" />
          <circle cx="110" cy="70" r="4" fill="white" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 220 140" className="w-52 h-36 group-hover:scale-105 transition-transform duration-700" fill="none">
          <circle cx="110" cy="70" r="52" stroke="rgba(255,255,255,0.3)" strokeWidth="1.2" />
          <circle cx="110" cy="70" r="36" stroke="rgba(255,255,255,0.6)" strokeWidth="1.2" />
          <circle cx="110" cy="70" r="20" stroke="rgba(255,255,255,0.9)" strokeWidth="1.5" />
          <line x1="40" y1="70" x2="180" y2="70" stroke="rgba(255,255,255,0.3)" strokeDasharray="2 2" />
        </svg>
      );
  }
}

function HeartIcon({ filled }: { filled?: boolean }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill={filled ? "currentColor" : "none"}>
      <path
        d="M7 12L1.5 6.5C0.5 5.5 0.5 3.5 1.5 2.5C2.5 1.5 4 1.5 5 2.5L7 4.5L9 2.5C10 1.5 11.5 1.5 12.5 2.5C13.5 3.5 13.5 5.5 12.5 6.5L7 12Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <circle cx="7" cy="7" r="2.5" stroke="currentColor" strokeWidth="1.2" />
      <path
        d="M1 7C2.5 3.5 5 1.5 7 1.5C9 1.5 11.5 3.5 13 7C11.5 10.5 9 12.5 7 12.5C5 12.5 2.5 10.5 1 7Z"
        stroke="currentColor"
        strokeWidth="1.2"
      />
    </svg>
  );
}
