import {
  aiContestCards,
  AIContestCard,
  CurationCategory,
  dailyCurations,
  DailyCurationItem,
  DesignCard,
  featuredCards,
} from "./data";
import {
  hackathonEditions,
  HackathonEdition,
  HackathonProduct,
  PlatformCategory,
} from "./hackathons";
import {
  InspirationSource,
  inspirationSources,
  matchesSourceQuery,
  SourceSectionId,
} from "./sources";

export type SourceFilter = SourceSectionId | "all" | "core";

export interface FilteredHackathonEdition extends HackathonEdition {
  displayProducts: HackathonProduct[];
}

export function filterDailyCurations(
  query: string,
  category: CurationCategory,
  favoritesOnly = false,
  likedIds: string[] = []
): DailyCurationItem[] {
  const normalized = query.trim().toLowerCase();
  return dailyCurations.filter(
    (item) =>
      (category === "all" || item.category === category) &&
      (!favoritesOnly || likedIds.includes(item.id)) &&
      (!normalized ||
        [
          item.title,
          item.summary,
          item.curatorNote,
          item.sourceName,
          ...item.tags,
        ].some((value) => value.toLowerCase().includes(normalized)))
  );
}

export function filterFeaturedCards(
  query: string,
  categoryId: string = "all",
  favoritesOnly = false,
  likedIds: string[] = []
): DesignCard[] {
  const normalized = query.trim().toLowerCase();
  return featuredCards.filter(
    (card) =>
      (categoryId === "all" || card.categoryId === categoryId) &&
      (!favoritesOnly || likedIds.includes(card.id)) &&
      (!normalized ||
        card.title.toLowerCase().includes(normalized) ||
        card.subtitle.toLowerCase().includes(normalized) ||
        card.author.toLowerCase().includes(normalized) ||
        card.medium.toLowerCase().includes(normalized) ||
        card.tags.some((t) => t.label.toLowerCase().includes(normalized)))
  );
}

export function filterHackathonEditions(
  query: string,
  selectedPlatform: PlatformCategory = "all",
  favoritesOnly = false,
  likedIds: string[] = []
): FilteredHackathonEdition[] {
  const normalized = query.trim().toLowerCase();

  return hackathonEditions
    .map((edition) => {
      const matchingProducts = edition.products.filter((p) => {
        const matchesPlatform =
          selectedPlatform === "all" || p.platformCategory === selectedPlatform;
        const matchesFavorite = !favoritesOnly || likedIds.includes(p.id);
        const matchesSearch =
          !normalized ||
          p.title.toLowerCase().includes(normalized) ||
          p.tagline.toLowerCase().includes(normalized) ||
          p.summary.toLowerCase().includes(normalized) ||
          p.targetPlatform.toLowerCase().includes(normalized) ||
          p.award.toLowerCase().includes(normalized) ||
          p.team.name.toLowerCase().includes(normalized) ||
          p.techStack.some((t) => t.toLowerCase().includes(normalized));

        return matchesPlatform && matchesFavorite && matchesSearch;
      });

      if (matchingProducts.length > 0) {
        return {
          ...edition,
          displayProducts: matchingProducts,
        };
      }

      if (favoritesOnly) {
        return null;
      }

      const editionMatchesSearch =
        !normalized ||
        edition.name.toLowerCase().includes(normalized) ||
        edition.englishName.toLowerCase().includes(normalized) ||
        edition.organizer.toLowerCase().includes(normalized) ||
        edition.dateDisplay.toLowerCase().includes(normalized) ||
        edition.description.toLowerCase().includes(normalized) ||
        edition.location.toLowerCase().includes(normalized);

      if (!editionMatchesSearch) {
        return null;
      }

      const platformProducts =
        selectedPlatform === "all"
          ? edition.products
          : edition.products.filter(
              (p) => p.platformCategory === selectedPlatform
            );

      if (platformProducts.length === 0) {
        return null;
      }

      return {
        ...edition,
        displayProducts: platformProducts,
      };
    })
    .filter((e): e is FilteredHackathonEdition => e !== null);
}

export function filterHackathonProducts(
  query: string,
  selectedPlatform: PlatformCategory = "all",
  favoritesOnly = false,
  likedIds: string[] = []
): HackathonProduct[] {
  return filterHackathonEditions(
    query,
    selectedPlatform,
    favoritesOnly,
    likedIds
  ).flatMap((edition) => edition.displayProducts);
}

export function filterAIContestCards(
  query: string,
  favoritesOnly = false,
  likedIds: string[] = []
): AIContestCard[] {
  const normalized = query.trim().toLowerCase();
  return aiContestCards.filter(
    (card) =>
      (!favoritesOnly || likedIds.includes(card.id)) &&
      (!normalized ||
        card.title.toLowerCase().includes(normalized) ||
        card.curatorNote.toLowerCase().includes(normalized) ||
        card.meta.toLowerCase().includes(normalized) ||
        card.badge.toLowerCase().includes(normalized) ||
        (card.tags?.some((t) => t.toLowerCase().includes(normalized)) ?? false))
  );
}

export function filterSources(
  query: string,
  section: SourceFilter,
  favoritesOnly = false,
  likedIds: string[] = []
): InspirationSource[] {
  const normalized = query.trim().toLowerCase();
  return inspirationSources.filter(
    (source) =>
      (section === "all" ||
        (section === "core"
          ? source.core
          : source.sections.includes(section))) &&
      (!favoritesOnly || likedIds.includes(source.id)) &&
      matchesSourceQuery(source, normalized)
  );
}
