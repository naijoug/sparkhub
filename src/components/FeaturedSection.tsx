"use client";

import { useMemo, useState } from "react";
import { DesignCard as DesignCardType } from "@/lib/data";
import { filterFeaturedCards } from "@/lib/filters";
import DesignCard from "./DesignCard";
import FeaturedArtworkModal from "./FeaturedArtworkModal";
import { EmptySectionState, SectionExpandToggle } from "./CuratorialPrimitives";

interface FeaturedSectionProps {
  activeCategory?: string;
  searchQuery?: string;
  onSelectTag?: (tag: string) => void;
  likedIds?: string[];
  onToggleLike?: (id: string) => void;
  viewMode?: "comfort" | "compact";
  favoritesOnly?: boolean;
  forceExpanded?: boolean;
}

const INITIAL_VISIBLE_COUNT = 6;

export default function FeaturedSection({
  activeCategory = "all",
  searchQuery = "",
  onSelectTag,
  likedIds = [],
  onToggleLike,
  viewMode = "comfort",
  favoritesOnly = false,
  forceExpanded = false,
}: FeaturedSectionProps) {
  const [selectedCard, setSelectedCard] = useState<DesignCardType | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const normalizedQuery = searchQuery.trim().toLowerCase();

  const filteredCards = useMemo(
    () =>
      filterFeaturedCards(searchQuery, activeCategory, favoritesOnly, likedIds),
    [searchQuery, activeCategory, favoritesOnly, likedIds]
  );

  const canCollapse =
    !forceExpanded &&
    activeCategory === "all" &&
    !normalizedQuery &&
    !favoritesOnly &&
    filteredCards.length > INITIAL_VISIBLE_COUNT;

  const visibleCards =
    canCollapse && !isExpanded
      ? filteredCards.slice(0, INITIAL_VISIBLE_COUNT)
      : filteredCards;

  const isCompact = viewMode === "compact";

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
          <EmptySectionState
            favoritesOnly={favoritesOnly}
            favoritesText="常设馆藏中暂无已收藏作品，点击展品卡片右下角的「♡ 收藏」即可加入。"
            emptyText="当前筛选条件下暂无常设馆藏作品，请尝试切换上方展馆分类或清空检索词。"
          />
        ) : (
          <>
            <div
              className={`grid grid-cols-1 md:grid-cols-2 ${
                isCompact ? "lg:grid-cols-4 gap-4" : "lg:grid-cols-3 gap-7"
              }`}
            >
              {visibleCards.map((card) => (
                <DesignCard
                  key={card.id}
                  card={card}
                  liked={likedIds.includes(card.id)}
                  onToggleLike={onToggleLike}
                  onSelectCard={(item) => setSelectedCard(item)}
                  onSelectTag={onSelectTag}
                  activeSearchQuery={searchQuery}
                  compact={isCompact}
                />
              ))}
            </div>

            {canCollapse && (
              <SectionExpandToggle
                expanded={isExpanded}
                onToggle={() => setIsExpanded((prev) => !prev)}
                collapseLabel="收起部分常设馆藏 ↑"
                expandLabel={`展开全部 ${filteredCards.length} 件常设馆藏 (还有 ${
                  filteredCards.length - INITIAL_VISIBLE_COUNT
                } 件) ↓`}
              />
            )}
          </>
        )}
      </div>

      <FeaturedArtworkModal
        card={selectedCard}
        cards={filteredCards}
        liked={Boolean(selectedCard && likedIds.includes(selectedCard.id))}
        onClose={() => setSelectedCard(null)}
        onSelectCard={setSelectedCard}
        onToggleLike={onToggleLike}
        onSelectTag={onSelectTag}
      />
    </section>
  );
}
