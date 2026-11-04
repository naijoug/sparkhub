import {
  aiContestCards,
  dailyCurations,
  featuredCards,
} from "./data";
import { allHackathonProducts } from "./hackathons";
import { inspirationSources } from "./sources";

export interface FolioItem {
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

export const DEFAULT_SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://naijoug.github.io/sparkhub/";

export function getFolioItems(likedIds: readonly string[]): FolioItem[] {
  if (likedIds.length === 0) return [];
  const likedSet = new Set(likedIds);
  const list: FolioItem[] = [];

  featuredCards.forEach((c) => {
    if (likedSet.has(c.id)) {
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

  dailyCurations.forEach((d) => {
    if (likedSet.has(d.id)) {
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

  allHackathonProducts.forEach((p) => {
    if (likedSet.has(p.id)) {
      list.push({
        id: p.id,
        type: "hackathon",
        typeLabel: "黑客松造物",
        catalogNo: p.catalogNo,
        title: p.title,
        authorOrHost: `${p.team.name} · ${p.hackathonName}`,
        summary: p.summary,
        tags: [p.targetPlatform, ...p.techStack.slice(0, 2)],
        href: p.officialUrl,
        accent: "accent",
      });
    }
  });

  aiContestCards.forEach((a) => {
    if (likedSet.has(a.id)) {
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

  inspirationSources.forEach((s) => {
    if (likedSet.has(s.id)) {
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
}

export function buildFolioMarkdown(
  items: readonly FolioItem[],
  today: string,
  siteUrl: string = DEFAULT_SITE_URL
): string {
  let md = `# SparkHub 个人策展档案 · Curatorial Folio\n\n`;
  md += `> 导出日期：${today} | 典藏总量：${items.length} 件灵感馆藏\n`;
  md += `> 来源：SparkHub 数字艺术与灵感策展志 (${siteUrl})\n\n---\n\n`;

  items.forEach((item, index) => {
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

  return md;
}
