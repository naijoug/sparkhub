"use client";

import { hotTags } from "@/lib/data";

const tagColors: Record<string, string> = {
  accent: "bg-accent-light/90 text-accent border-accent/25 hover:bg-accent hover:text-white",
  purple: "bg-purple-light/90 text-purple border-purple/25 hover:bg-purple hover:text-white",
  green: "bg-green-light/90 text-green border-green/25 hover:bg-green hover:text-white",
  yellow: "bg-yellow-light/90 text-yellow border-yellow/25 hover:bg-yellow hover:text-white",
};

interface HeroProps {
  searchQuery?: string;
  onSearchChange?: (value: string) => void;
}

export default function Hero({
  searchQuery = "",
  onSearchChange,
}: HeroProps) {
  return (
    <section
      id="top"
      className="relative overflow-hidden border-b border-border px-6 lg:px-12 py-12 lg:py-20"
    >
      <div className="max-w-[1440px] mx-auto">
        {/* Top Architectural Frame Bar */}
        <div className="flex items-center justify-between pb-5 mb-8 border-b border-border/80 text-[11px] font-mono-meta text-muted">
          <div className="flex items-center gap-3">
            <span className="text-accent font-semibold">+</span>
            <span>EXHIBITION PROLOGUE · 序厅宣言</span>
            <span className="hidden sm:inline text-border">/</span>
            <span className="hidden sm:inline">CATALOGUE RAISONNÉ 2026</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden md:inline">CURATED BY SPARKHUB ATELIER</span>
            <span className="px-2 py-0.5 rounded border border-border bg-surface text-dark">
              FOLIO I — IV
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          {/* Left Column: Editorial Manifesto & Archival Search */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-7 lg:pr-4">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-3 self-start px-3.5 py-1.5 rounded-full bg-surface border border-border shadow-[0_2px_8px_rgba(20,19,18,0.03)]">
                <span className="w-2 h-2 rounded-full bg-accent" />
                <span className="text-[10px] font-mono-meta uppercase text-accent font-semibold">
                  MONOGRAPH EDITION
                </span>
                <span className="text-border">|</span>
                <span className="text-xs text-secondary font-editorial italic">
                  当数字界面成为可凝视的当代印刷与空间艺术
                </span>
              </div>

              <div className="space-y-4">
                <p className="font-mono-meta text-[11px] uppercase tracking-[0.2em] text-muted">
                  AESTHETIC, INTERACTION &amp; GENERATIVE ANTHOLOGY
                </p>
                <h1 className="font-editorial text-4xl sm:text-6xl lg:text-[64px] font-bold text-dark leading-[1.06] tracking-tight">
                  发现灵感，
                  <span className="italic font-normal text-accent">创造不凡</span>
                  <span className="block text-2xl sm:text-[32px] font-normal text-secondary mt-4 leading-[1.25]">
                    在算法与秩序的褶皱里，收藏有温度的数字造物。
                  </span>
                </h1>
              </div>

              <p className="text-[15px] sm:text-base text-secondary leading-[1.8] max-w-[600px] border-l-2 border-accent/60 pl-4 bg-bg-card/35 py-2 pr-3 rounded-r-lg">
                这里是一座永不落幕的数字设计文献馆：既陈列全球极具秩序美学的界面、黑客松先锋原型与生成式艺术佳作，亦于每日清晨漫游互联网，为你打捞新锐产品、跨界赛事、实验网站与深度宣言。
              </p>
            </div>

            {/* Archival Search Console & Tag Index */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-3 w-full max-w-[610px] h-[56px] px-5 bg-surface rounded-2xl border border-dark/25 shadow-[0_8px_30px_rgba(20,19,18,0.06)] focus-within:border-dark focus-within:shadow-[0_12px_36px_rgba(200,67,43,0.1)] transition-all">
                <svg
                  width="19"
                  height="19"
                  viewBox="0 0 20 20"
                  fill="none"
                  className="shrink-0 text-accent"
                >
                  <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.5" />
                  <path
                    d="M13.5 13.5L18 18"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => onSearchChange?.(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Escape" && searchQuery) {
                      onSearchChange?.("");
                    }
                  }}
                  placeholder="输入关键词检索全馆：如 仪表盘、WebGL、AI、Awwwards..."
                  aria-label="检索全馆灵感与作品"
                  className="flex-1 bg-transparent text-[15px] text-dark placeholder:text-muted outline-none"
                />
                {searchQuery ? (
                  <button
                    type="button"
                    onClick={() => onSearchChange?.("")}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-accent text-white text-[10px] font-mono-meta uppercase cursor-pointer hover:bg-dark transition-colors"
                  >
                    <span>CLEAR</span>
                    <span>✕</span>
                  </button>
                ) : (
                  <span className="hidden sm:inline-flex items-center px-2.5 py-1 rounded-md bg-bg-card border border-border text-[10px] font-mono-meta text-secondary">
                    INDEX FILTER
                  </span>
                )}
              </div>

              {/* Hot Tags Curatorial Index */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-mono-meta uppercase text-muted mr-1">
                  CURATED INDEX / 策展索引：
                </span>
                {hotTags.map((tag) => {
                  const isSelected = searchQuery === tag.label;
                  return (
                    <button
                      key={tag.label}
                      type="button"
                      onClick={() =>
                        onSearchChange?.(isSelected ? "" : tag.label)
                      }
                      className={`inline-flex items-center gap-1 h-7 px-3 rounded-full text-xs font-medium border transition-all cursor-pointer ${
                        isSelected
                          ? "bg-dark text-surface border-dark shadow-sm"
                          : tagColors[tag.color]
                      }`}
                    >
                      <span className="opacity-60 font-mono-meta">#</span>
                      <span>{tag.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Framed Museum Plate & Kinetic Geometry */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="group relative flex-1 flex flex-col justify-between bg-surface rounded-3xl border border-dark/20 p-6 sm:p-7 shadow-[0_16px_48px_rgba(20,19,18,0.08)] art-frame">
              {/* Plate Header */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-border text-[10px] font-mono-meta text-muted">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full border border-dark inline-block" />
                  <span>EXHIBITION PLATE № 00</span>
                </span>
                <span>BAUHAUS &amp; ASTROLABE STUDY · 2026</span>
              </div>

              {/* Dark Obsidian Art Canvas */}
              <div className="relative h-[280px] sm:h-[300px] rounded-2xl overflow-hidden bg-[#121110] flex items-center justify-center p-6 border border-dark">
                {/* Ambient museum spotlight glows */}
                <div className="absolute -top-12 -left-10 w-52 h-52 rounded-full bg-[#C8432B]/75 mix-blend-screen blur-2xl group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute -bottom-16 right-2 w-60 h-60 rounded-full bg-[#4A3BC2]/70 mix-blend-screen blur-2xl group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute top-1/4 right-1/4 w-36 h-36 rounded-full bg-[#B87B18]/65 mix-blend-screen blur-xl" />

                {/* Corner registration crosshairs */}
                <span className="absolute top-3 left-3.5 text-[10px] font-mono-meta text-white/40">+</span>
                <span className="absolute top-3 right-3.5 text-[10px] font-mono-meta text-white/40">+</span>
                <span className="absolute bottom-9 left-3.5 text-[10px] font-mono-meta text-white/40">+</span>
                <span className="absolute bottom-9 right-3.5 text-[10px] font-mono-meta text-white/40">+</span>

                <svg
                  viewBox="0 0 380 240"
                  className="relative z-10 w-full h-full group-hover:scale-[1.03] transition-transform duration-700"
                  fill="none"
                  aria-label="包豪斯几何星盘构成艺术"
                >
                  {/* Golden ratio & architectural construction lines */}
                  <line x1="0" y1="60" x2="380" y2="60" stroke="rgba(246,242,233,0.13)" strokeDasharray="3 3" />
                  <line x1="0" y1="180" x2="380" y2="180" stroke="rgba(246,242,233,0.13)" strokeDasharray="3 3" />
                  <line x1="115" y1="0" x2="115" y2="240" stroke="rgba(246,242,233,0.13)" strokeDasharray="3 3" />
                  <line x1="265" y1="0" x2="265" y2="240" stroke="rgba(246,242,233,0.13)" strokeDasharray="3 3" />
                  <line x1="65" y1="195" x2="315" y2="45" stroke="rgba(246,242,233,0.18)" strokeWidth="1" />

                  {/* Outer celestial ring & tilted orbital */}
                  <circle cx="190" cy="120" r="78" stroke="#F6F2E9" strokeWidth="1.1" strokeOpacity="0.75" />
                  <ellipse
                    cx="190"
                    cy="120"
                    rx="96"
                    ry="38"
                    transform="rotate(-22 190 120)"
                    stroke="#F6F2E9"
                    strokeWidth="1"
                    strokeOpacity="0.45"
                  />
                  <circle cx="190" cy="120" r="50" stroke="#C8432B" strokeWidth="1.6" />
                  <circle cx="190" cy="120" r="24" stroke="#B87B18" strokeWidth="1" strokeDasharray="2 2" />

                  {/* Poetic sine wave & rotated Bauhaus frame */}
                  <path
                    d="M96 120 C138 40, 242 200, 284 120"
                    stroke="#B87B18"
                    strokeWidth="2"
                    fill="none"
                  />
                  <rect
                    x="158"
                    y="88"
                    width="64"
                    height="64"
                    transform="rotate(18 190 120)"
                    stroke="#F6F2E9"
                    strokeWidth="1"
                    strokeOpacity="0.65"
                  />
                  <circle cx="190" cy="120" r="5.5" fill="#F6F2E9" />
                  <circle cx="236" cy="96" r="4" fill="#C8432B" />
                  <circle cx="142" cy="144" r="3.5" fill="#B87B18" />
                </svg>

                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[10px] font-mono-meta text-white/75 border-t border-white/10 pt-2">
                  <span>FIG. 00 — FORM FOLLOWS POETICS</span>
                  <span>RATIO 1 : 1.618</span>
                </div>
              </div>

              {/* Museum Placard Caption & Live Archive Metrics */}
              <div className="pt-4 mt-4 border-t border-border space-y-4">
                <div className="flex items-baseline justify-between gap-2">
                  <p className="font-editorial italic text-sm text-secondary">
                    “秩序是骨骼，直觉与诗意则是赋予数字界面呼吸的灵魂。”
                  </p>
                  <span className="text-[10px] font-mono-meta text-muted shrink-0">
                    — 策展手记
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-3 pt-3 border-t border-border/80 text-center">
                  <div className="bg-bg-light/70 rounded-xl py-2.5 px-2 border border-border/60">
                    <div className="font-editorial text-xl font-bold text-dark">08</div>
                    <div className="text-[10px] font-mono-meta text-muted mt-0.5">
                      RADAR · 今日漫游
                    </div>
                  </div>
                  <div className="bg-bg-light/70 rounded-xl py-2.5 px-2 border border-border/60">
                    <div className="font-editorial text-xl font-bold text-dark">16</div>
                    <div className="text-[10px] font-mono-meta text-muted mt-0.5">
                      ARCHIVE · 馆藏与赛作
                    </div>
                  </div>
                  <div className="bg-accent-light/50 rounded-xl py-2.5 px-2 border border-accent/25">
                    <div className="font-editorial text-xl font-bold text-accent">IV</div>
                    <div className="text-[10px] font-mono-meta text-accent mt-0.5">
                      WINGS · 四大主题展馆
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
