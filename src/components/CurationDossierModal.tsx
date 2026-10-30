"use client";

import Modal from "./Modal";
import { useEffect, useRef, useState } from "react";
import { AccentTone } from "@/lib/data";

export interface DossierInspectItem {
  id: string;
  catalogNo: string;
  categoryLabel: string;
  title: string;
  authorOrHost: string;
  summary: string;
  curatorNote?: string;
  tags: string[];
  accent: AccentTone;
  href?: string;
  sourceName?: string;
}

interface CurationDossierModalProps {
  item: DossierInspectItem | null;
  onClose: () => void;
  liked: boolean;
  onToggleLike: (id: string) => void;
  onSelectTag?: (tag: string) => void;
}

const accentBadgeStyles: Record<AccentTone, string> = {
  accent: "bg-accent-light text-accent border-accent/25",
  purple: "bg-purple-light text-purple border-purple/25",
  green: "bg-green-light text-green border-green/25",
  yellow: "bg-yellow-light text-yellow border-yellow/25",
};

const accentLineStyles: Record<AccentTone, string> = {
  accent: "bg-accent",
  purple: "bg-purple",
  green: "bg-green",
  yellow: "bg-yellow",
};

export default function CurationDossierModal({
  item,
  onClose,
  liked,
  onToggleLike,
  onSelectTag,
}: CurationDossierModalProps) {
  const [copyStatus, setCopyStatus] = useState<"idle" | "copying" | "copied" | "error">("idle");
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const mounted = useRef(false);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
      if (resetTimer.current) clearTimeout(resetTimer.current);
    };
  }, []);

  if (!item) return null;

  const citation = `[SparkHub 策展档案 ${item.catalogNo}] ${item.title} — ${item.authorOrHost}. 来源: ${
    item.href ?? "SparkHub Curatorial Archive"
  }`;

  const handleCopyCitation = async () => {
    if (resetTimer.current) clearTimeout(resetTimer.current);
    setCopyStatus("copying");
    try {
      if (!navigator.clipboard?.writeText) throw new Error("Clipboard unavailable");
      await navigator.clipboard.writeText(citation);
      if (!mounted.current) return;
      setCopyStatus("copied");
      resetTimer.current = setTimeout(() => setCopyStatus("idle"), 2200);
    } catch {
      if (mounted.current) setCopyStatus("error");
    }
  };

  return (
    <Modal open={Boolean(item)} onClose={onClose} labelledBy="dossier-modal-title">
      <div
        className="bg-surface border border-dark/30 rounded-3xl max-w-2xl w-full overflow-hidden shadow-[0_24px_70px_rgba(20,19,18,0.35)] art-frame flex flex-col max-h-full"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Accent Stripe */}
        <div className={`h-1.5 w-full ${accentLineStyles[item.accent]}`} />

        {/* Header Bar */}
        <div className="flex shrink-0 flex-wrap items-center justify-between gap-3 px-4 sm:px-6 py-4 border-b border-border bg-bg-light/85">
          <div className="flex items-center gap-2.5 text-xs font-mono-meta text-muted">
            <span className="text-accent">◆</span>
            <span className="text-dark font-semibold">{item.catalogNo}</span>
            <span>·</span>
            <span
              className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium border ${accentBadgeStyles[item.accent]}`}
            >
              {item.categoryLabel}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onToggleLike(item.id)}
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono-meta border transition-colors cursor-pointer ${
                liked
                  ? "bg-accent text-white border-accent"
                  : "bg-surface text-secondary border-border hover:border-dark"
              }`}
            >
              <span>{liked ? "♥ 已加入典藏" : "♡ 收藏入画夹"}</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-muted hover:text-dark hover:border-dark text-xs cursor-pointer transition-colors"
              aria-label="关闭灯箱"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6 min-h-0 overflow-y-auto overscroll-contain flex-1">
          {/* Title & Provenance */}
          <div className="space-y-2">
            <p className="text-[11px] font-mono-meta uppercase tracking-wider text-muted">
              PROVENANCE // {item.authorOrHost}
            </p>
            <h3
              id="dossier-modal-title"
              className="font-editorial text-2xl sm:text-3xl font-bold text-dark leading-snug"
            >
              {item.title}
            </h3>
          </div>

          {/* Curator Note Pullquote */}
          {item.curatorNote && (
            <div className="relative pl-4 border-l-2 border-accent bg-bg-light/95 py-3 pr-4 rounded-r-xl">
              <span className="font-mono-meta text-[10px] uppercase text-accent font-semibold block mb-1">
                CURATORIAL CRITIQUE // 策展评述
              </span>
              <p className="font-editorial italic text-base text-dark/95 leading-relaxed">
                “{item.curatorNote}”
              </p>
            </div>
          )}

          {/* Detailed Summary */}
          <div className="space-y-2">
            <h4 className="text-xs font-mono-meta uppercase text-muted tracking-wider">
              EXHIBIT OVERVIEW // 展品摘要与技术范式
            </h4>
            <p className="text-sm text-secondary leading-[1.8] bg-bg-card/35 p-4 rounded-xl border border-border/70">
              {item.summary}
            </p>
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <span className="text-xs font-mono-meta uppercase text-muted">
              ARCHIVE INDEX TAGS // 关联学术索引：
            </span>
            <div className="flex flex-wrap gap-2 pt-1">
              {item.tags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => {
                    onSelectTag?.(tag);
                    onClose();
                  }}
                  className="text-xs font-mono-meta px-2.5 py-1 rounded-full bg-bg-card text-secondary hover:bg-dark hover:text-surface transition-colors cursor-pointer border border-border"
                >
                  #{tag}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex shrink-0 flex-wrap items-center justify-between gap-3 px-4 sm:px-6 py-4 border-t border-border bg-bg-light/80">
          <button
            type="button"
            onClick={handleCopyCitation}
            disabled={copyStatus === "copying"}
            className="text-xs font-mono-meta text-muted hover:text-dark cursor-pointer transition-colors"
          >
            {copyStatus === "copying" ? "正在复制…" : "⎘ 复制学术引文"}
          </button>

          <span role="status" className="text-xs text-secondary">
            {copyStatus === "copied" && "✓ 引文已复制到剪贴板"}
            {copyStatus === "error" && "复制失败，请在下方手动复制，或重试。"}
          </span>
          {copyStatus === "error" && (
            <textarea
              aria-label="手动复制引文"
              readOnly
              value={citation}
              onFocus={(event) => event.currentTarget.select()}
              className="w-full rounded border border-border p-2 text-xs"
              rows={3}
            />
          )}

          <div className="flex items-center gap-3">
            {item.href && (
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-dark hover:bg-accent text-surface text-xs font-mono-meta uppercase transition-colors"
              >
                <span>前往原始站点</span>
                <span>↗</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
}
