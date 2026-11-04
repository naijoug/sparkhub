import {
  aiContestCards,
  AIContestCard,
  categories,
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
  sourceSections,
  SourceSectionId,
} from "./sources";

export type SourceFilter = SourceSectionId | "all" | "core";

export type WingId =
  | "all"
  | "daily-curations"
  | "featured"
  | "hackathons"
  | "ai-contests"
  | "sources";

export type ViewDensityMode = "comfort" | "compact";

export interface ExhibitionFilterState {
  searchQuery: string;
  activeWing: WingId;
  favoritesOnly: boolean;
  viewMode: ViewDensityMode;
  dailyCategory: CurationCategory;
  activeCategory: string;
  hackathonPlatform: PlatformCategory;
  sourceSection: SourceFilter;
}

export const VALID_WINGS: ReadonlySet<WingId> = new Set<WingId>([
  "all",
  "daily-curations",
  "featured",
  "hackathons",
  "ai-contests",
  "sources",
]);

export const VALID_DAILY_CATEGORIES: ReadonlySet<CurationCategory> =
  new Set<CurationCategory>(["all", "product", "event", "website"]);

export const VALID_FEATURED_CATEGORIES: ReadonlySet<string> = new Set<string>(
  categories.map((c) => c.id)
);

export const VALID_HACKATHON_PLATFORMS: ReadonlySet<PlatformCategory> =
  new Set<PlatformCategory>(["all", "app", "web", "ai", "cross"]);

export const VALID_SOURCE_FILTERS: ReadonlySet<SourceFilter> =
  new Set<SourceFilter>(["all", "core", ...sourceSections.map((s) => s.id)]);

export function parseFilterSearchParams(
  search: string | URLSearchParams
): ExhibitionFilterState {
  const params =
    typeof search === "string" ? new URLSearchParams(search) : search;

  const qParam = params.get("q");
  const wingParam = params.get("wing") as WingId | null;
  const favParam = params.get("fav");
  const viewParam = params.get("view");
  const dailyParam = params.get("daily") as CurationCategory | null;
  const catParam = params.get("cat");
  const platformParam = params.get("platform") as PlatformCategory | null;
  const sourceParam = params.get("source") as SourceFilter | null;

  return {
    searchQuery: qParam ?? "",
    activeWing: wingParam && VALID_WINGS.has(wingParam) ? wingParam : "all",
    favoritesOnly: favParam === "1" || favParam === "true",
    viewMode: viewParam === "compact" ? "compact" : "comfort",
    dailyCategory:
      dailyParam && VALID_DAILY_CATEGORIES.has(dailyParam)
        ? dailyParam
        : "all",
    activeCategory:
      catParam && VALID_FEATURED_CATEGORIES.has(catParam) ? catParam : "all",
    hackathonPlatform:
      platformParam && VALID_HACKATHON_PLATFORMS.has(platformParam)
        ? platformParam
        : "all",
    sourceSection:
      sourceParam && VALID_SOURCE_FILTERS.has(sourceParam)
        ? sourceParam
        : "all",
  };
}

export function serializeFilterSearchParams(
  state: ExhibitionFilterState
): string {
  const params = new URLSearchParams();
  if (state.searchQuery.trim()) params.set("q", state.searchQuery);
  if (state.activeWing !== "all") params.set("wing", state.activeWing);
  if (state.favoritesOnly) params.set("fav", "1");
  if (state.viewMode === "compact") params.set("view", "compact");
  if (state.dailyCategory !== "all") params.set("daily", state.dailyCategory);
  if (state.activeCategory !== "all") params.set("cat", state.activeCategory);
  if (state.hackathonPlatform !== "all") {
    params.set("platform", state.hackathonPlatform);
  }
  if (state.sourceSection !== "all") {
    params.set("source", state.sourceSection);
  }
  return params.toString();
}

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
