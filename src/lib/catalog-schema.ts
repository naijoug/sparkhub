import {
  AccentTone,
  aiContestCards,
  categories,
  dailyCurations,
  DesignCard,
  featuredCards,
} from "./data";
import {
  allHackathonProducts,
  hackathonEditions,
  platformCategories,
} from "./hackathons";
import { hackathonProductNarratives } from "./hackathon-details";
import { VALID_CURATORIAL_GRADIENTS } from "./palettes";
import {
  inspirationSources,
  SOURCES_LAST_VERIFIED,
  sourceSections,
} from "./sources";
import { VALID_FOLIO_IDS } from "./useCuratorialFolio";

const VALID_ACCENTS: ReadonlySet<AccentTone> = new Set([
  "accent",
  "purple",
  "green",
  "yellow",
]);

const VALID_ART_MOTIFS: ReadonlySet<DesignCard["artMotif"]> = new Set([
  "bauhaus",
  "kinetic",
  "topography",
  "prism",
  "orbital",
  "editorial",
  "matrix",
]);

const ISO_DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

function isValidHttpsUrl(value: string): boolean {
  try {
    const parsed = new URL(value);
    return parsed.protocol === "https:";
  } catch {
    return false;
  }
}

export function validateCuratorialCatalog(): string[] {
  const errors: string[] = [];

  // 1. Global ID uniqueness and VALID_FOLIO_IDS parity
  const allCatalogIds = [
    ...featuredCards.map((c) => c.id),
    ...dailyCurations.map((d) => d.id),
    ...allHackathonProducts.map((p) => p.id),
    ...aiContestCards.map((a) => a.id),
    ...inspirationSources.map((s) => s.id),
  ];

  const seenIds = new Set<string>();
  for (const id of allCatalogIds) {
    if (!id.trim()) {
      errors.push("Catalog contains an empty item ID");
    } else if (seenIds.has(id)) {
      errors.push(`Duplicate catalog item ID: "${id}"`);
    }
    seenIds.add(id);
  }

  for (const id of seenIds) {
    if (!VALID_FOLIO_IDS.has(id)) {
      errors.push(`Catalog ID "${id}" is missing from VALID_FOLIO_IDS`);
    }
  }
  for (const id of VALID_FOLIO_IDS) {
    if (!seenIds.has(id)) {
      errors.push(`VALID_FOLIO_IDS contains stale ID "${id}" not in catalog`);
    }
  }

  // 2. Wing I: Daily Curations
  for (const item of dailyCurations) {
    if (!item.title.trim() || !item.summary.trim() || !item.curatorNote.trim()) {
      errors.push(`Daily curation "${item.id}" has empty text fields`);
    }
    if (!ISO_DATE_RE.test(item.dateAdded)) {
      errors.push(
        `Daily curation "${item.id}" has invalid dateAdded "${item.dateAdded}"`
      );
    }
    if (!VALID_ACCENTS.has(item.accent)) {
      errors.push(`Daily curation "${item.id}" has invalid accent`);
    }
    if (!isValidHttpsUrl(item.href)) {
      errors.push(`Daily curation "${item.id}" has invalid href "${item.href}"`);
    }
    if (item.tags.length === 0 || item.tags.some((t) => !t.trim())) {
      errors.push(`Daily curation "${item.id}" has invalid tags`);
    }
  }

  // 3. Wing II: Categories & Featured Cards
  const validCategoryIds = new Set(
    categories.filter((c) => c.id !== "all").map((c) => c.id)
  );
  for (const card of featuredCards) {
    if (!validCategoryIds.has(card.categoryId)) {
      errors.push(
        `Featured card "${card.id}" references unknown categoryId "${card.categoryId}"`
      );
    }
    if (!VALID_CURATORIAL_GRADIENTS.has(card.image)) {
      errors.push(
        `Featured card "${card.id}" uses unlisted gradient "${card.image}"`
      );
    }
    if (!VALID_ART_MOTIFS.has(card.artMotif)) {
      errors.push(`Featured card "${card.id}" has invalid artMotif`);
    }
    if (card.href && !isValidHttpsUrl(card.href)) {
      errors.push(`Featured card "${card.id}" has invalid href "${card.href}"`);
    }
    if (
      card.tags.length === 0 ||
      card.tags.some((t) => !t.label.trim() || !VALID_ACCENTS.has(t.color))
    ) {
      errors.push(`Featured card "${card.id}" has invalid tags`);
    }
  }

  // 4. Wing III: Hackathon Editions, Products & Detail Narratives
  const editionIds = new Set<string>();
  for (const edition of hackathonEditions) {
    if (editionIds.has(edition.id)) {
      errors.push(`Duplicate hackathon edition ID "${edition.id}"`);
    }
    editionIds.add(edition.id);

    if (!ISO_DATE_RE.test(edition.startDate) || !ISO_DATE_RE.test(edition.endDate)) {
      errors.push(`Hackathon edition "${edition.id}" has invalid dates`);
    }
    if (!isValidHttpsUrl(edition.officialUrl)) {
      errors.push(
        `Hackathon edition "${edition.id}" has invalid officialUrl "${edition.officialUrl}"`
      );
    }
    if (edition.products.length === 0) {
      errors.push(`Hackathon edition "${edition.id}" has no products`);
    }

    for (const product of edition.products) {
      if (product.hackathonId !== edition.id) {
        errors.push(
          `Product "${product.id}" hackathonId "${product.hackathonId}" does not match edition "${edition.id}"`
        );
      }
      if (product.hackathonName !== edition.name) {
        errors.push(
          `Product "${product.id}" hackathonName "${product.hackathonName}" does not match edition "${edition.name}"`
        );
      }
      if (!VALID_CURATORIAL_GRADIENTS.has(product.coverGradient)) {
        errors.push(
          `Product "${product.id}" uses unlisted coverGradient "${product.coverGradient}"`
        );
      }
      if (!isValidHttpsUrl(product.officialUrl)) {
        errors.push(
          `Product "${product.id}" has invalid officialUrl "${product.officialUrl}"`
        );
      }
      if (product.githubUrl && !isValidHttpsUrl(product.githubUrl)) {
        errors.push(
          `Product "${product.id}" has invalid githubUrl "${product.githubUrl}"`
        );
      }
      const narrative = hackathonProductNarratives[product.id];
      if (!narrative) {
        errors.push(
          `Product "${product.id}" is missing detail narrative in hackathonProductNarratives`
        );
      } else if (
        !narrative.problemSolved.trim() ||
        narrative.coreFeatures.length === 0
      ) {
        errors.push(
          `Product "${product.id}" has incomplete narrative in hackathonProductNarratives`
        );
      }
    }
  }

  const productIdSet = new Set(allHackathonProducts.map((p) => p.id));
  for (const narrativeId of Object.keys(hackathonProductNarratives)) {
    if (!productIdSet.has(narrativeId)) {
      errors.push(
        `Orphan narrative key "${narrativeId}" in hackathonProductNarratives`
      );
    }
  }

  for (const cat of platformCategories) {
    const expectedCount =
      cat.id === "all"
        ? allHackathonProducts.length
        : allHackathonProducts.filter((p) => p.platformCategory === cat.id)
            .length;
    if (cat.count !== expectedCount) {
      errors.push(
        `Platform category "${cat.id}" count (${cat.count}) does not match actual (${expectedCount})`
      );
    }
  }

  // 5. Wing IV: AI Contest Cards
  for (const card of aiContestCards) {
    if (!VALID_CURATORIAL_GRADIENTS.has(card.image)) {
      errors.push(`AI card "${card.id}" uses unlisted gradient "${card.image}"`);
    }
    if (!VALID_ACCENTS.has(card.badgeColor)) {
      errors.push(`AI card "${card.id}" has invalid badgeColor`);
    }
    if (card.href && !isValidHttpsUrl(card.href)) {
      errors.push(`AI card "${card.id}" has invalid href "${card.href}"`);
    }
  }

  // 6. Wing V: Inspiration Sources
  if (!ISO_DATE_RE.test(SOURCES_LAST_VERIFIED)) {
    errors.push(`Invalid SOURCES_LAST_VERIFIED "${SOURCES_LAST_VERIFIED}"`);
  }
  const validSectionIds = new Set(sourceSections.map((s) => s.id));
  for (const source of inspirationSources) {
    if (!isValidHttpsUrl(source.url)) {
      errors.push(`Source "${source.id}" has invalid url "${source.url}"`);
    }
    if (
      source.sections.length === 0 ||
      source.sections.some((secId) => !validSectionIds.has(secId))
    ) {
      errors.push(`Source "${source.id}" has invalid sections`);
    }
    if (source.focus.length === 0 || source.focus.some((f) => !f.trim())) {
      errors.push(`Source "${source.id}" has invalid focus tags`);
    }
  }

  return errors;
}
