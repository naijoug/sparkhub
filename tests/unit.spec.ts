import { test, expect } from "@playwright/test";
import {
  aiContestCards,
  dailyCurations,
  featuredCards,
} from "@/lib/data";
import { allHackathonProducts, hackathonEditions } from "@/lib/hackathons";
import { getProductDetailById } from "@/lib/hackathon-details";
import { inspirationSources } from "@/lib/sources";
import {
  filterAIContestCards,
  filterDailyCurations,
  filterFeaturedCards,
  filterHackathonEditions,
  filterHackathonProducts,
  filterSources,
  parseFilterSearchParams,
  serializeFilterSearchParams,
} from "@/lib/filters";
import {
  buildFolioMarkdown,
  DEFAULT_SITE_URL,
  getFolioItems,
} from "@/lib/folio";
import {
  parseFolioIds,
  VALID_FOLIO_IDS,
} from "@/lib/useCuratorialFolio";
import {
  aiContestToDossier,
  dailyToDossier,
  hackathonProductToDossier,
  pickRandomDossier,
} from "@/lib/dossier";
import { validateCuratorialCatalog } from "@/lib/catalog-schema";
import {
  CURATORIAL_GRADIENTS,
  VALID_CURATORIAL_GRADIENTS,
} from "@/lib/palettes";
import {
  buildCanonicalUrl,
  buildHackathonJsonLd,
  buildProductJsonLd,
  buildWebsiteJsonLd,
  SITE_URL,
} from "@/lib/seo";
import sitemap from "@/app/sitemap";
import robots from "@/app/robots";

test.describe("Catalog & Folio unit tests", () => {
  test("validateCuratorialCatalog passes all schema, gradient, URL, and referential integrity checks", () => {
    expect(VALID_CURATORIAL_GRADIENTS.size).toBe(CURATORIAL_GRADIENTS.length);
    expect(validateCuratorialCatalog()).toEqual([]);
  });

  test("VALID_FOLIO_IDS matches the exact set of unique catalog IDs across all 5 wings", () => {
    const catalogIds = [
      ...featuredCards.map((c) => c.id),
      ...dailyCurations.map((d) => d.id),
      ...allHackathonProducts.map((p) => p.id),
      ...aiContestCards.map((a) => a.id),
      ...inspirationSources.map((s) => s.id),
    ];

    expect(new Set(catalogIds).size).toBe(catalogIds.length);
    expect([...VALID_FOLIO_IDS].sort()).toEqual([...catalogIds].sort());
  });

  test("parseFolioIds filters out unknown stale IDs, non-strings, and duplicates", () => {
    expect(parseFolioIds("not valid json")).toEqual([]);
    expect(parseFolioIds('{"not":"an array"}')).toEqual([]);

    const raw = JSON.stringify([
      "1",
      "stale-deleted-id-999",
      42,
      null,
      "c13",
      "1",
      "jayu-ai-assistant",
      "mobbin",
    ]);
    const parsed = parseFolioIds(raw);
    expect(parsed).toEqual(["1", "c13", "jayu-ai-assistant", "mobbin"]);
    expect(getFolioItems(parsed)).toHaveLength(parsed.length);
  });

  test("buildFolioMarkdown uses canonical site URL and formats all bookmarked items", () => {
    const items = getFolioItems(["1", "jayu-ai-assistant", "mobbin"]);
    expect(items).toHaveLength(3);

    const md = buildFolioMarkdown(items, "2026-11-03");
    expect(md).toContain(DEFAULT_SITE_URL);
    expect(md).not.toContain("https://sparkhub.art");
    expect(md).toContain("导出日期：2026-11-03 | 典藏总量：3 件灵感馆藏");
    expect(md).toContain(items[0].title);
    expect(md).toContain(items[1].title);
    expect(md).toContain(items[2].title);
  });
});

test.describe("URL filter state parser & serializer unit tests", () => {
  test("parseFilterSearchParams accepts valid parameters and rejects invalid cat/source/wing/platform/daily/view", () => {
    const valid = parseFilterSearchParams(
      "?q=WebGL&wing=featured&fav=1&view=compact&daily=product&cat=design-eng&platform=ai&source=core"
    );
    expect(valid).toEqual({
      searchQuery: "WebGL",
      activeWing: "featured",
      favoritesOnly: true,
      viewMode: "compact",
      dailyCategory: "product",
      activeCategory: "design-eng",
      hackathonPlatform: "ai",
      sourceSection: "core",
    });

    const invalid = parseFilterSearchParams(
      "?wing=unknown&fav=0&view=grid&daily=invalid&cat=nonexistent&platform=vr&source=bogus"
    );
    expect(invalid).toEqual({
      searchQuery: "",
      activeWing: "all",
      favoritesOnly: false,
      viewMode: "comfort",
      dailyCategory: "all",
      activeCategory: "all",
      hackathonPlatform: "all",
      sourceSection: "all",
    });
  });

  test("serializeFilterSearchParams omits default values and round-trips non-default state", () => {
    const defaults = parseFilterSearchParams("");
    expect(serializeFilterSearchParams(defaults)).toBe("");

    const custom = {
      ...defaults,
      searchQuery: "Rust",
      activeCategory: "design-eng",
      sourceSection: "design-systems" as const,
      favoritesOnly: true,
      viewMode: "compact" as const,
    };
    const serialized = serializeFilterSearchParams(custom);
    expect(parseFilterSearchParams(serialized)).toEqual(custom);
  });
});

test.describe("Filter functions unit tests", () => {
  test("filterDailyCurations handles query trimming, category, and favorites", () => {
    const all = filterDailyCurations("", "all");
    expect(all.length).toBe(dailyCurations.length);

    const byCat = filterDailyCurations("  ", "product");
    expect(byCat.every((item) => item.category === "product")).toBe(true);

    const favOnly = filterDailyCurations("", "all", true, ["c13"]);
    expect(favOnly.map((i) => i.id)).toEqual(["c13"]);
  });

  test("filterFeaturedCards and filterAIContestCards filter by category, query, and favorites", () => {
    const webCards = filterFeaturedCards("", "web");
    expect(webCards.length).toBeGreaterThan(0);
    expect(webCards.every((c) => c.categoryId === "web")).toBe(true);

    const aiFavs = filterAIContestCards("", true, ["a1"]);
    expect(aiFavs.map((a) => a.id)).toEqual(["a1"]);
  });

  test("filterHackathonEditions and filterHackathonProducts respect platform, query, and favoritesOnly", () => {
    const aiProducts = filterHackathonProducts("", "ai");
    expect(aiProducts.length).toBeGreaterThan(0);
    expect(aiProducts.every((p) => p.platformCategory === "ai")).toBe(true);

    const favEditions = filterHackathonEditions(
      "Stanford",
      "all",
      true,
      ["jayu-ai-assistant"]
    );
    expect(favEditions).toHaveLength(0);

    const editionMatch = filterHackathonEditions("Stanford", "all", false, []);
    expect(editionMatch.length).toBeGreaterThan(0);
  });

  test("filterSources supports all, core, section ID, query, and favoritesOnly", () => {
    const core = filterSources("", "core");
    expect(core.length).toBeGreaterThan(0);
    expect(core.every((s) => s.core)).toBe(true);

    const favSource = filterSources("mobbin", "all", true, ["mobbin"]);
    expect(favSource.map((s) => s.id)).toEqual(["mobbin"]);
  });
});

test.describe("Dossier adapter unit tests", () => {
  test("dailyToDossier, hackathonProductToDossier, and aiContestToDossier map fields accurately", () => {
    const daily = dailyToDossier(dailyCurations[0]);
    expect(daily.id).toBe(dailyCurations[0].id);
    expect(daily.catalogNo).toBe(dailyCurations[0].issueNo);

    const hackathon = hackathonProductToDossier(allHackathonProducts[0]);
    expect(hackathon.id).toBe(allHackathonProducts[0].id);
    expect(hackathon.href).toBe(allHackathonProducts[0].officialUrl);

    const ai = aiContestToDossier(aiContestCards[0]);
    expect(ai.id).toBe(aiContestCards[0].id);
    expect(ai.sourceName).toBe("Generative Atelier");
  });

  test("pickRandomDossier deterministically selects across daily, hackathon, and AI wings", () => {
    const first = pickRandomDossier(() => 0);
    expect(first.id).toBe(dailyCurations[0].id);

    const last = pickRandomDossier(() => 0.999999);
    expect(last.id).toBe(aiContestCards[aiContestCards.length - 1].id);
  });
});

test.describe("SEO, Sitemap, Robots & JSON-LD unit tests", () => {
  test("buildCanonicalUrl normalizes paths and preserves SITE_URL prefix", () => {
    expect(buildCanonicalUrl("/")).toBe(`${SITE_URL}/`);
    expect(buildCanonicalUrl("/products/jayu-ai-assistant")).toBe(
      `${SITE_URL}/products/jayu-ai-assistant`
    );
    expect(buildCanonicalUrl("hackathons/ethglobal-bangkok-2024")).toBe(
      `${SITE_URL}/hackathons/ethglobal-bangkok-2024`
    );
  });

  test("sitemap() and robots() include all static routes and canonical sitemap reference", () => {
    const entries = sitemap();
    expect(entries).toHaveLength(
      1 + hackathonEditions.length + allHackathonProducts.length
    );
    expect(entries[0].url).toBe(`${SITE_URL}/`);

    const r = robots();
    expect(r.sitemap).toBe(`${SITE_URL}/sitemap.xml`);
    expect(r.host).toBe(SITE_URL);
  });

  test("JSON-LD builders produce valid schema.org objects for home, product, and hackathon pages", () => {
    const webJsonLd = buildWebsiteJsonLd();
    expect(webJsonLd["@type"]).toBe("WebSite");
    expect(webJsonLd.url).toBe(`${SITE_URL}/`);

    const detail = getProductDetailById(allHackathonProducts[0].id);
    expect(detail).toBeDefined();
    const productJsonLd = buildProductJsonLd(detail!);
    expect(productJsonLd["@type"]).toBe("SoftwareApplication");
    expect(productJsonLd.url).toBe(
      `${SITE_URL}/products/${allHackathonProducts[0].id}`
    );

    const hackathonJsonLd = buildHackathonJsonLd(hackathonEditions[0]);
    expect(hackathonJsonLd["@type"]).toBe("CollectionPage");
    expect(hackathonJsonLd.hasPart).toHaveLength(
      hackathonEditions[0].products.length
    );
  });
});
