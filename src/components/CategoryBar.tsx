"use client";

import { categories, featuredCards } from "@/lib/data";

interface CategoryBarProps {
  activeCategory?: string;
  onSelectCategory?: (id: string) => void;
  searchQuery?: string;
}

export default function CategoryBar({
  activeCategory = "all",
  onSelectCategory,
  searchQuery = "",
}: CategoryBarProps) {
  const normalizedQuery = searchQuery.trim().toLowerCase();

  const matchesSearch = (card: (typeof featuredCards)[number]) =>
    !normalizedQuery ||
    card.title.toLowerCase().includes(normalizedQuery) ||
    card.subtitle.toLowerCase().includes(normalizedQuery) ||
    card.author.toLowerCase().includes(normalizedQuery) ||
    card.medium.toLowerCase().includes(normalizedQuery) ||
    card.tags.some((t) => t.label.toLowerCase().includes(normalizedQuery));

  return (
    <section
      id="categories"
      className="bg-surface/85 backdrop-blur-sm border-b border-border"
    >
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-dark" />
          <span className="text-[11px] font-mono-meta uppercase text-muted">
            CURATORIAL TAXONOMY / 常设展厅分馆导览
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2" role="tablist" aria-label="展品分类筛选">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            const liveCount = featuredCards.filter(
              (card) =>
                (cat.id === "all" || card.categoryId === cat.id) &&
                matchesSearch(card)
            ).length;

            return (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => onSelectCategory?.(cat.id)}
                className={`group inline-flex items-center gap-2 h-9 px-4 rounded-full text-xs sm:text-sm font-medium border transition-all cursor-pointer ${
                  isActive
                    ? "bg-dark text-surface border-dark shadow-[0_4px_12px_rgba(20,19,18,0.12)]"
                    : liveCount === 0
                      ? "bg-bg-light/50 text-muted/60 border-border/60 hover:border-dark/30"
                      : "bg-bg-light text-secondary border-border hover:border-dark/40 hover:text-dark"
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] font-mono-meta ${
                    isActive
                      ? "text-accent-light"
                      : "text-muted group-hover:text-secondary"
                  }`}
                >
                  {cat.enLabel}
                </span>
                <span
                  className={`text-[10px] font-mono-meta px-1.5 py-0.2 rounded-full ${
                    isActive
                      ? "bg-white/15 text-surface"
                      : "bg-bg-card text-muted"
                  }`}
                >
                  {String(liveCount).padStart(2, "0")}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
