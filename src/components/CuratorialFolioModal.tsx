"use client";

import Modal from "./Modal";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  aiContestCards,
  dailyCurations,
  featuredCards,
  hackathonCards,
} from "@/lib/data";
import { inspirationSources } from "@/lib/sources";

interface FolioItem {
  id: string;
  type: "featured" | "daily" | "hackathon" | "ai" | "source";
  typeLabel: string;
  catalogNo: string;
  title: string;
  authorOrHost: string;
  summary: string;
  tags: string[];
  href?: string;
  accent: "accent" | "purple" | "green" | "yellow";
}

interface CuratorialFolioModalProps {
  isOpen: boolean;
  onClose: () => void;
  likedIds: string[];
  onToggleLike: (id: string) => void;
  onClearAll: () => void;
  onSelectTag?: (tag: string) => void;
}

export default function CuratorialFolioModal({
  isOpen,
  onClose,
  likedIds,
  onToggleLike,
  onClearAll,
  onSelectTag,
}: CuratorialFolioModalProps) {
  const [filterType, setFilterType] = useState<string>("all");
  const [copiedExport, setCopiedExport] = useState(false);
  const [exportError, setExportError] = useState(false);
  const exportTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (exportTimer.current) clearTimeout(exportTimer.current);
  }, []);

  // Aggregate all bookmarked items across wings
  const allSavedItems: FolioItem[] = useMemo(() => {
    const list: FolioItem[] = [];

    // Featured cards
    featuredCards.forEach((c) => {
      if (likedIds.includes(c.id)) {
        list.push({
          id: c.id,
          type: "featured",
          typeLabel: "常设馆藏",
          catalogNo: c.catalogNo,
          title: c.title,
          authorOrHost: c.author,
          summary: c.subtitle,
          tags: c.tags.map((t) => t.label),
          href: c.href,
          accent: "accent",
        });
      }
    });

    // Daily curations
    dailyCurations.forEach((d) => {
      if (likedIds.includes(d.id)) {
        list.push({
          id: d.id,
          type: "daily",
          typeLabel: "每日漫游",
          catalogNo: d.issueNo,
          title: d.title,
          authorOrHost: d.creatorOrHost,
          summary: d.summary,
          tags: d.tags,
          href: d.href,
          accent: d.accent,
        });
      }
    });

    // Hackathons
    hackathonCards.forEach((h) => {
      if (likedIds.includes(h.id)) {
        list.push({
          id: h.id,
          type: "hackathon",
          typeLabel: "黑客松造物",
          catalogNo: h.catalogNo,
          title: h.title,
          authorOrHost: h.team,
          summary: h.summary,
          tags: h.tags ?? ["黑客松"],
          href: h.href,
          accent: h.badgeColor,
        });
      }
    });

    // AI Contests
    aiContestCards.forEach((a) => {
      if (likedIds.includes(a.id)) {
        list.push({
          id: a.id,
          type: "ai",
          typeLabel: "AI 算法特展",
          catalogNo: a.catalogNo,
          title: a.title,
          authorOrHost: a.meta,
          summary: a.curatorNote,
          tags: a.tags ?? ["AI生成"],
          href: a.href,
          accent: a.badgeColor,
        });
      }
    });

    // Inspiration Sources
    inspirationSources.forEach((s) => {
      if (likedIds.includes(s.id)) {
        list.push({
          id: s.id,
          type: "source",
          typeLabel: "灵感信源",
          catalogNo: s.group ? `RADAR · ${s.group}` : "RADAR",
          title: s.name,
          authorOrHost: s.url,
          summary: s.summary,
          tags: s.focus,
          href: s.url,
          accent: "yellow",
        });
      }
    });

    return list;
  }, [likedIds]);

  const displayedItems = useMemo(() => {
    if (filterType === "all") return allSavedItems;
    return allSavedItems.filter((item) => item.type === filterType);
  }, [allSavedItems, filterType]);

  const handleExportMarkdown = () => {
    if (allSavedItems.length === 0) return;

    const now = new Date();
    const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
    let md = `# SparkHub 个人策展档案 · Curatorial Folio\n\n`;
    md += `> 导出日期：${today} | 典藏总量：${allSavedItems.length} 件灵感馆藏\n`;
    md += `> 来源：SparkHub 数字艺术与灵感策展志 (https://sparkhub.art)\n\n---\n\n`;

    allSavedItems.forEach((item, index) => {
      md += `### ${index + 1}. [${item.catalogNo}] ${item.title}\n`;
      md += `- **类别**：${item.typeLabel}\n`;
      md += `- **作者 / 出处**：${item.authorOrHost}\n`;
      md += `- **文献摘要**：${item.summary}\n`;
      if (item.tags.length > 0) {
        md += `- **标签**：${item.tags.map((t) => `#${t}`).join(" ")}\n`;
      }
      if (item.href) {
        md += `- **直达链接**：${item.href}\n`;
      }
      md += `\n`;
    });

    setExportError(false);
    setCopiedExport(false);
    if (exportTimer.current) clearTimeout(exportTimer.current);
    let url: string | undefined;
    const link = document.createElement("a");
    try {
      const blob = new Blob([md], { type: "text/markdown;charset=utf-8" });
      url = URL.createObjectURL(blob);
      link.href = url;
      link.download = `sparkhub-curatorial-folio-${today}.md`;
      document.body.appendChild(link);
      link.click();
      setCopiedExport(true);
      exportTimer.current = setTimeout(() => setCopiedExport(false), 2400);
    } catch {
      setExportError(true);
    } finally {
      link.remove();
      // Allow the browser to begin consuming the download before releasing it.
      if (url) {
        const downloadUrl = url;
        setTimeout(() => URL.revokeObjectURL(downloadUrl), 1000);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <Modal open={isOpen} onClose={onClose} labelledBy="folio-title">
      <div
        className="bg-surface border border-dark/30 rounded-3xl max-w-4xl w-full max-h-full flex flex-col overflow-hidden shadow-[0_24px_70px_rgba(20,19,18,0.35)] art-frame"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Folio Modal Header */}
        <div className="flex shrink-0 flex-wrap items-center justify-between gap-3 px-4 sm:px-6 py-5 border-b border-border bg-bg-light/90">
          <div className="space-y-1">
            <div className="flex items-center gap-2.5 text-xs font-mono-meta text-muted">
              <span className="w-2 h-2 rounded-full bg-accent" />
              <span className="text-dark font-semibold">
                PERSONAL CURATORIAL FOLIO
              </span>
              <span>·</span>
              <span>我的典藏画夹 [{allSavedItems.length}]</span>
            </div>
            <h3
              id="folio-title"
              className="font-editorial text-2xl font-bold text-dark"
            >
              已收藏的灵感与造物
            </h3>
          </div>

          <div className="flex items-center gap-2">
            {allSavedItems.length > 0 && (
              <button
                type="button"
                onClick={handleExportMarkdown}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-dark hover:bg-accent text-surface text-xs font-mono-meta uppercase transition-colors cursor-pointer"
              >
                <span>{copiedExport ? "✓ 已导出 MARKDOWN" : "↓ 导出策展笔记"}</span>
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-muted hover:text-dark hover:border-dark text-xs cursor-pointer transition-colors"
              aria-label="关闭画夹"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Filter Tabs Bar */}
        {exportError && (
          <p role="alert" className="px-6 py-2 text-sm text-accent">
            导出失败，请重试。
          </p>
        )}
        <div className="flex shrink-0 items-center justify-between px-4 sm:px-6 py-3 border-b border-border/80 bg-surface text-xs">
          <div className="flex items-center gap-2 overflow-x-auto">
            {[
              { id: "all", label: "全部", count: allSavedItems.length },
              {
                id: "featured",
                label: "常设馆藏",
                count: allSavedItems.filter((i) => i.type === "featured").length,
              },
              {
                id: "daily",
                label: "每日漫游",
                count: allSavedItems.filter((i) => i.type === "daily").length,
              },
              {
                id: "hackathon",
                label: "极客黑客松",
                count: allSavedItems.filter((i) => i.type === "hackathon").length,
              },
              {
                id: "ai",
                label: "AI 特展",
                count: allSavedItems.filter((i) => i.type === "ai").length,
              },
              {
                id: "source",
                label: "灵感信源",
                count: allSavedItems.filter((i) => i.type === "source").length,
              },
            ].map((tab) => {
              const active = filterType === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setFilterType(tab.id)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border transition-colors cursor-pointer ${
                    active
                      ? "bg-dark text-surface border-dark"
                      : "bg-bg-light text-secondary border-border hover:border-dark/30"
                  }`}
                >
                  <span>{tab.label}</span>
                  <span className="text-[10px] font-mono-meta opacity-70">
                    [{tab.count}]
                  </span>
                </button>
              );
            })}
          </div>

          {allSavedItems.length > 0 && (
            <button
              type="button"
              onClick={() => {
                if (window.confirm("确定要清空全部收藏的馆藏展品吗？")) {
                  onClearAll();
                }
              }}
              className="text-[11px] font-mono-meta text-muted hover:text-accent cursor-pointer transition-colors shrink-0 ml-2"
            >
              清空典藏
            </button>
          )}
        </div>

        {/* Items List */}
        <div className="p-6 min-h-0 overflow-y-auto overscroll-contain flex-1 space-y-4">
          {displayedItems.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <div className="w-12 h-12 rounded-full border border-dashed border-border mx-auto flex items-center justify-center text-muted font-editorial italic text-lg">
                ❦
              </div>
              <p className="text-sm text-secondary font-medium">
                策展夹内暂无已收藏的展品或文献
              </p>
              <p className="text-xs text-muted max-w-sm mx-auto">
                点击展品卡片右下角的爱心图标或在详情灯箱中收藏，即可在此随时回顾并打包导出属于你的灵感笔记。
              </p>
            </div>
          ) : (
            displayedItems.map((item) => (
              <div
                key={item.id}
                className="group relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl border border-border bg-bg-light/60 hover:bg-surface hover:border-dark/40 hover:shadow-sm transition-all"
              >
                <div className="space-y-1.5 flex-1 pr-2">
                  <div className="flex flex-wrap items-center gap-2 text-[10px] font-mono-meta text-muted">
                    <span className="px-2 py-0.5 rounded bg-bg-card text-dark font-medium border border-border/80">
                      {item.typeLabel}
                    </span>
                    <span>{item.catalogNo}</span>
                    <span>·</span>
                    <span className="text-secondary">{item.authorOrHost}</span>
                  </div>
                  <h4 className="font-editorial text-lg font-bold text-dark group-hover:text-accent transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-xs text-secondary leading-relaxed line-clamp-2">
                    {item.summary}
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {item.tags.map((tag) => (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => {
                          onSelectTag?.(tag);
                          onClose();
                        }}
                        className="text-[10px] font-mono-meta px-2 py-0.5 rounded bg-bg-card/75 text-secondary hover:bg-dark hover:text-white transition-colors cursor-pointer"
                      >
                        #{tag}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                  {item.href && (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full border border-border bg-surface hover:bg-dark hover:text-white text-xs font-mono-meta text-dark transition-colors"
                    >
                      <span>访问原站</span>
                      <span>↗</span>
                    </a>
                  )}
                  <button
                    type="button"
                    onClick={() => onToggleLike(item.id)}
                    className="px-2.5 py-1.5 rounded-full text-xs font-mono-meta text-muted hover:text-accent hover:bg-accent-light transition-colors cursor-pointer"
                    aria-label="从画夹移除"
                  >
                    移除 ✕
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-4 sm:px-6 py-4 border-t border-border bg-bg-light/80 flex shrink-0 flex-wrap gap-2 items-center justify-between text-xs font-mono-meta text-muted">
          <span>SPARKHUB DIGITAL ATELIER · LOCAL CURATION CACHE</span>
          <button
            type="button"
            onClick={onClose}
            className="text-dark hover:text-accent underline underline-offset-4 cursor-pointer"
          >
            返回展馆浏览 →
          </button>
        </div>
      </div>
    </Modal>
  );
}
