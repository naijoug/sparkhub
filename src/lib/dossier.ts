import {
  AccentTone,
  AIContestCard,
  aiContestCards,
  dailyCurations,
  DailyCurationItem,
} from "./data";
import {
  allHackathonProducts,
  HackathonProduct,
} from "./hackathons";

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

export function dailyToDossier(item: DailyCurationItem): DossierInspectItem {
  return {
    id: item.id,
    catalogNo: item.issueNo,
    categoryLabel: item.categoryLabel,
    title: item.title,
    authorOrHost: item.creatorOrHost,
    summary: item.summary,
    curatorNote: item.curatorNote,
    tags: item.tags,
    accent: item.accent,
    href: item.href,
    sourceName: item.sourceName,
  };
}

export function hackathonProductToDossier(
  product: HackathonProduct
): DossierInspectItem {
  return {
    id: product.id,
    catalogNo: product.catalogNo,
    categoryLabel: `${product.hackathonName} · ${product.award.split(" (")[0]}`,
    title: product.title,
    authorOrHost: `${product.team.name} · ${product.hackathonName}`,
    summary: product.summary,
    curatorNote: product.curatorCritique,
    tags: [product.targetPlatform, ...product.techStack],
    accent: "accent",
    href: product.officialUrl,
    sourceName: product.hackathonName,
  };
}

export function aiContestToDossier(item: AIContestCard): DossierInspectItem {
  return {
    id: item.id,
    catalogNo: item.catalogNo,
    categoryLabel: `算法美学暗房 · ${item.badge}`,
    title: item.title,
    authorOrHost: item.meta,
    summary: `收录于 SparkHub 暗房特展（Wing IV）：${item.meta}。探索高维隐空间、多模态意图与参数化生成艺术的美学临界点。`,
    curatorNote: item.curatorNote,
    tags: item.tags ?? ["生成式艺术", "算法美学"],
    accent: item.badgeColor,
    href: item.href,
    sourceName: "Generative Atelier",
  };
}

export function pickRandomDossier(
  randomFn: () => number = Math.random
): DossierInspectItem {
  const totalCount =
    dailyCurations.length +
    allHackathonProducts.length +
    aiContestCards.length;
  const index = Math.min(
    totalCount - 1,
    Math.max(0, Math.floor(randomFn() * totalCount))
  );

  if (index < dailyCurations.length) {
    return dailyToDossier(dailyCurations[index]);
  }
  const hackathonOffset = index - dailyCurations.length;
  if (hackathonOffset < allHackathonProducts.length) {
    return hackathonProductToDossier(allHackathonProducts[hackathonOffset]);
  }
  const aiOffset = hackathonOffset - allHackathonProducts.length;
  return aiContestToDossier(aiContestCards[aiOffset]);
}
