"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { useCuratorialFolio } from "@/lib/useCuratorialFolio";
import { BookmarkPillButton } from "./CuratorialPrimitives";

const CuratorialFolioModal = dynamic(
  () => import("@/components/CuratorialFolioModal")
);

interface ProductBookmarkButtonProps {
  productId: string;
  productTitle: string;
  variant?: "compact" | "hero";
}

export default function ProductBookmarkButton({
  productId,
  productTitle,
  variant = "compact",
}: ProductBookmarkButtonProps) {
  const { likedIds, toggleLike } = useCuratorialFolio();
  const isLiked = likedIds.includes(productId);

  if (variant === "hero") {
    return (
      <button
        type="button"
        onClick={() => toggleLike(productId)}
        aria-pressed={isLiked}
        aria-label={`收藏 ${productTitle}`}
        className={`inline-flex items-center gap-2 px-5 py-3.5 rounded-full border text-sm font-mono-meta uppercase tracking-wider transition-all cursor-pointer ${
          isLiked
            ? "bg-accent text-white border-accent font-semibold shadow-sm"
            : "bg-surface hover:bg-bg-card border-border hover:border-dark text-dark"
        }`}
      >
        <span>{isLiked ? "♥ 已收入策展画夹" : "♡ 收藏入画夹"}</span>
      </button>
    );
  }

  return (
    <BookmarkPillButton
      liked={isLiked}
      title={productTitle}
      onToggle={() => toggleLike(productId)}
      variant="detail"
    />
  );
}

export function DetailFolioButton() {
  const [folioOpen, setFolioOpen] = useState(false);
  const router = useRouter();
  const { likedIds, toggleLike, clearLikes } = useCuratorialFolio();
  const savedCount = likedIds.length;

  return (
    <>
      <button
        type="button"
        onClick={() => setFolioOpen(true)}
        title="打开我的策展画夹"
        className={`inline-flex items-center gap-1.5 h-10 px-3 sm:px-3.5 rounded-full border text-xs font-mono-meta transition-colors cursor-pointer ${
          savedCount > 0
            ? "border-accent/45 bg-accent-light/60 text-dark hover:border-accent"
            : "border-border bg-surface hover:border-dark text-dark"
        }`}
      >
        <span className={savedCount > 0 ? "text-accent" : "text-muted"}>♥</span>
        <span className="hidden sm:inline text-[11px] font-medium">我的收藏</span>
        <span
          className={`px-1.5 py-0.2 rounded-full text-[10px] ${
            savedCount > 0
              ? "bg-accent text-white font-semibold"
              : "bg-bg-card text-muted"
          }`}
        >
          {savedCount}
        </span>
      </button>

      {folioOpen && (
        <CuratorialFolioModal
          isOpen={folioOpen}
          onClose={() => setFolioOpen(false)}
          likedIds={likedIds}
          onToggleLike={toggleLike}
          onClearAll={clearLikes}
          onSelectTag={(tag) => router.push(`/?q=${encodeURIComponent(tag)}`)}
        />
      )}
    </>
  );
}
