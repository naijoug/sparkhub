"use client";

interface BookmarkPillButtonProps {
  liked: boolean;
  title: string;
  onToggle: () => void;
  variant?: "light" | "surface" | "dark" | "detail";
}

export function BookmarkPillButton({
  liked,
  title,
  onToggle,
  variant = "light",
}: BookmarkPillButtonProps) {
  if (variant === "dark") {
    return (
      <button
        type="button"
        onClick={onToggle}
        aria-pressed={liked}
        aria-label={`收藏 ${title}`}
        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-mono-meta transition-colors cursor-pointer ${
          liked
            ? "bg-accent text-white font-semibold"
            : "bg-black/55 text-white/90 hover:bg-black/80 hover:text-white border border-white/20"
        }`}
      >
        <span>{liked ? "♥ 已收藏" : "♡ 收藏"}</span>
      </button>
    );
  }

  if (variant === "detail") {
    return (
      <button
        type="button"
        onClick={onToggle}
        aria-pressed={liked}
        aria-label={`收藏 ${title}`}
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-mono-meta transition-colors cursor-pointer ${
          liked
            ? "bg-accent text-white border-accent font-semibold"
            : "bg-surface border-border text-secondary hover:text-dark hover:border-dark"
        }`}
      >
        <span>{liked ? "♥ 已收藏" : "♡ 收藏"}</span>
      </button>
    );
  }

  const idleBg = variant === "surface" ? "bg-surface" : "bg-bg-light";

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={liked}
      aria-label={`收藏 ${title}`}
      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full border text-[11px] font-mono-meta transition-colors cursor-pointer ${
        liked
          ? "bg-accent text-white border-accent font-semibold"
          : `${idleBg} border-border text-secondary hover:text-dark hover:border-dark`
      }`}
    >
      <span>{liked ? "♥ 已收藏" : "♡ 收藏"}</span>
    </button>
  );
}

interface TagChipButtonProps {
  tag: string;
  onSelectTag?: (tag: string) => void;
  selected?: boolean;
  variant?: "card" | "surface" | "light" | "dark" | "pill";
}

export function TagChipButton({
  tag,
  onSelectTag,
  selected = false,
  variant = "card",
}: TagChipButtonProps) {
  const handleClick = () => {
    onSelectTag?.(tag);
  };

  if (variant === "dark") {
    return (
      <button
        type="button"
        onClick={handleClick}
        className="text-[10px] font-mono-meta px-2 py-0.5 rounded bg-white/10 text-white/75 hover:bg-white hover:text-[#141312] transition-colors cursor-pointer"
      >
        #{tag}
      </button>
    );
  }

  if (variant === "surface") {
    return (
      <button
        type="button"
        onClick={handleClick}
        className="text-[10px] font-mono-meta px-2 py-0.5 rounded bg-surface text-muted hover:bg-dark hover:text-surface transition-colors cursor-pointer border border-border/60"
      >
        #{tag}
      </button>
    );
  }

  if (variant === "light") {
    return (
      <button
        type="button"
        onClick={handleClick}
        className="text-[10px] font-mono-meta px-2 py-0.5 rounded bg-bg-light text-secondary hover:bg-dark hover:text-surface transition-colors cursor-pointer"
      >
        #{tag}
      </button>
    );
  }

  if (variant === "pill") {
    return (
      <button
        type="button"
        onClick={handleClick}
        className="text-xs font-mono-meta px-2.5 py-1 rounded-full bg-bg-card text-secondary hover:bg-dark hover:text-surface transition-colors cursor-pointer border border-border"
      >
        #{tag}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`text-[11px] font-mono-meta px-2 py-0.5 rounded transition-colors cursor-pointer ${
        selected
          ? "bg-dark text-surface"
          : "bg-bg-card/85 text-secondary hover:bg-dark/15 hover:text-dark"
      }`}
    >
      #{tag}
    </button>
  );
}

interface SectionExpandToggleProps {
  expanded: boolean;
  onToggle: () => void;
  expandLabel: string;
  collapseLabel: string;
}

export function SectionExpandToggle({
  expanded,
  onToggle,
  expandLabel,
  collapseLabel,
}: SectionExpandToggleProps) {
  return (
    <div className="mt-8 flex justify-center">
      <button
        type="button"
        onClick={onToggle}
        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-border bg-surface hover:border-dark hover:bg-dark hover:text-surface text-xs font-mono-meta text-dark transition-all cursor-pointer shadow-xs"
      >
        <span>{expanded ? collapseLabel : expandLabel}</span>
      </button>
    </div>
  );
}

interface EmptySectionStateProps {
  favoritesOnly: boolean;
  favoritesText: string;
  emptyText: string;
  className?: string;
}

export function EmptySectionState({
  favoritesOnly,
  favoritesText,
  emptyText,
  className = "py-14 text-center text-sm text-muted bg-surface rounded-2xl border border-border",
}: EmptySectionStateProps) {
  return (
    <div className={className}>
      {favoritesOnly ? favoritesText : emptyText}
    </div>
  );
}
