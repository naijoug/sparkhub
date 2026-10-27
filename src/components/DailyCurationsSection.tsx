"use client";

import { useState } from "react";
import {
  dailyCurations,
  CurationCategory,
  DailyCurationItem,
} from "@/lib/data";

const filterTabs: { id: CurationCategory; label: string; en: string }[] = [
  { id: "all", label: "全部漫游", en: "ALL DISPATCHES" },
  { id: "product", label: "新锐器物", en: "PRODUCTS" },
  { id: "event", label: "创意聚落", en: "EVENTS & HACKS" },
  { id: "website", label: "独立站点与文献", en: "WEBSITES & ESSAYS" },
];

const accentBadgeStyles: Record<DailyCurationItem["accent"], string> = {
  accent: "bg-accent-light text-accent border-accent/25",
  purple: "bg-purple-light text-purple border-purple/25",
  green: "bg-green-light text-green border-green/25",
  yellow: "bg-yellow-light text-yellow border-yellow/25",
};

const accentBorderHover: Record<DailyCurationItem["accent"], string> = {
  accent: "hover:border-accent/65",
  purple: "hover:border-purple/65",
  green: "hover:border-green/65",
  yellow: "hover:border-yellow/65",
};

const accentStripe: Record<DailyCurationItem["accent"], string> = {
  accent: "bg-accent",
  purple: "bg-purple",
  green: "bg-green",
  yellow: "bg-yellow",
};

interface DailyCurationsSectionProps {
  searchQuery?: string;
}

export default function DailyCurationsSection({
  searchQuery = "",
}: DailyCurationsSectionProps) {
  const [selectedTab, setSelectedTab] = useState<CurationCategory>("all");

  const normalizedQuery = searchQuery.trim().toLowerCase();

  const filteredItems = dailyCurations.filter((item) => {
    const matchesTab =
      selectedTab === "all" || item.category === selectedTab;
    const matchesQuery =
      !normalizedQuery ||
      item.title.toLowerCase().includes(normalizedQuery) ||
      item.summary.toLowerCase().includes(normalizedQuery) ||
      item.curatorNote.toLowerCase().includes(normalizedQuery) ||
      item.sourceName.toLowerCase().includes(normalizedQuery) ||
      item.tags.some((t) => t.toLowerCase().includes(normalizedQuery));
    return matchesTab && matchesQuery;
  });

  return (
    <section
      id="daily-curations"
      className="border-b border-border bg-bg-card/50 px-6 lg:px-12 py-16"
    >
      <div className="max-w-[1440px] mx-auto">
        {/* Broadsheet Masthead Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-border">
          <div className="space-y-2.5">
            <div className="flex items-center gap-3 text-[11px] font-mono-meta uppercase text-accent">
              <span className="px-2 py-0.5 rounded bg-accent-light border border-accent/25 font-semibold">
                WING I · 展馆一
              </span>
              <span>DAILY CURATORIAL BROADSHEET</span>
              <span>·</span>
              <span className="text-muted">ISSUE 2026-10-27</span>
            </div>
            <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-dark tracking-tight">
              每日灵感漫游志 ·{" "}
              <span className="italic font-normal text-secondary">
                Dispatches from the Web
              </span>
            </h2>
            <p className="text-sm text-secondary max-w-[680px] leading-relaxed">
              每日从 Product Hunt、Awwwards、Luma、ETHGlobal 与 Cosmos 采撷具有审美张力的实验器物、跨界聚落、独立网站与思想手记。
            </p>
          </div>

          {/* Category filter pills */}
          <div className="flex flex-wrap items-center gap-2">
            {filterTabs.map((tab) => {
              const active = selectedTab === tab.id;
              const count =
                tab.id === "all"
                  ? dailyCurations.length
                  : dailyCurations.filter((i) => i.category === tab.id).length;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setSelectedTab(tab.id)}
                  className={`inline-flex items-center gap-2 h-9 px-4 rounded-full text-xs font-medium border transition-all cursor-pointer ${
                    active
                      ? "bg-dark text-surface border-dark shadow-sm"
                      : "bg-surface text-secondary border-border hover:border-dark/40 hover:text-dark"
                  }`}
                >
                  <span>{tab.label}</span>
                  <span
                    className={`text-[10px] font-mono-meta ${
                      active ? "text-accent-light" : "text-muted"
                    }`}
                  >
                    {tab.en} [{count}]
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Broadsheet Folio Grid */}
        {filteredItems.length === 0 ? (
          <div className="py-14 text-center text-sm text-muted bg-surface rounded-2xl border border-border mt-8">
            暂无匹配“{searchQuery}”的每日漫游文献，请尝试切换上方分栏或清空检索词。
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8">
            {filteredItems.map((item, idx) => {
              const folioNumber = String(idx + 1).padStart(2, "0");
              return (
                <a
                  key={item.id}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group relative flex flex-col justify-between bg-surface rounded-2xl border border-border overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_36px_rgba(20,19,18,0.08)] ${accentBorderHover[item.accent]}`}
                >
                  {/* Top pigment accent hairline */}
                  <div className={`h-1 w-full ${accentStripe[item.accent]} opacity-75 group-hover:opacity-100 transition-opacity`} />

                  <div className="p-6 sm:p-7 space-y-4 flex-1 flex flex-col justify-between">
                    <div className="space-y-4">
                      {/* Top Folio Metadata Row */}
                      <div className="flex items-start justify-between gap-3 pb-3 border-b border-border/70">
                        <div className="flex items-center gap-3">
                          <span className="font-editorial italic text-3xl font-bold text-dark/25 group-hover:text-accent transition-colors leading-none select-none">
                            {folioNumber}
                          </span>
                          <div className="flex flex-col">
                            <span className="text-[10px] font-mono-meta text-muted">
                              {item.issueNo} · {item.dateAdded}
                            </span>
                            <span
                              className={`mt-1 self-start inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium border ${accentBadgeStyles[item.accent]}`}
                            >
                              {item.categoryLabel}
                            </span>
                          </div>
                        </div>

                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-bg-light border border-border text-[10px] font-mono-meta text-secondary group-hover:bg-dark group-hover:text-surface group-hover:border-dark transition-colors">
                          <span>{item.sourceName}</span>
                          <span>↗</span>
                        </span>
                      </div>

                      {/* Title & Provenance */}
                      <div>
                        <h3 className="font-editorial text-xl sm:text-[22px] font-bold text-dark group-hover:text-accent transition-colors leading-snug">
                          {item.title}
                        </h3>
                        <p className="text-[11px] font-mono-meta text-muted mt-1.5">
                          PROVENANCE: {item.creatorOrHost}
                        </p>
                      </div>

                      {/* Editorial Summary */}
                      <p className="text-sm text-secondary leading-[1.75]">
                        {item.summary}
                      </p>

                      {/* Curator's Critique Pull-Quote */}
                      <div className="relative pl-4 border-l-2 border-accent/60 bg-bg-light/90 py-2.5 pr-3.5 rounded-r-xl">
                        <p className="font-editorial italic text-[13px] text-dark/90 leading-relaxed">
                          <span className="font-mono-meta not-italic text-[10px] uppercase text-accent font-semibold mr-2">
                            CURATOR&apos;S NOTE //
                          </span>
                          “{item.curatorNote}”
                        </p>
                      </div>
                    </div>

                    {/* Tags & Archival Link Footer */}
                    <div className="flex items-center justify-between pt-4 mt-4 border-t border-border/75">
                      <div className="flex flex-wrap gap-1.5">
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[11px] font-mono-meta px-2 py-0.5 rounded bg-bg-card/85 text-secondary"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                      <span className="text-[11px] font-mono-meta uppercase text-dark group-hover:text-accent transition-colors shrink-0 ml-2">
                        READ DOSSIER →
                      </span>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
