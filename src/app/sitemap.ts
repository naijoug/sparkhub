import type { MetadataRoute } from "next";
import { allHackathonProducts, hackathonEditions } from "@/lib/hackathons";
import { buildCanonicalUrl } from "@/lib/seo";

export const dynamic = "force-static";

const ARCHIVE_LAST_MODIFIED = new Date("2026-03-01T00:00:00.000Z");

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: MetadataRoute.Sitemap = [
    {
      url: buildCanonicalUrl("/"),
      lastModified: ARCHIVE_LAST_MODIFIED,
      changeFrequency: "daily",
      priority: 1,
    },
    ...hackathonEditions.map((edition) => ({
      url: buildCanonicalUrl(`/hackathons/${edition.id}`),
      lastModified: ARCHIVE_LAST_MODIFIED,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...allHackathonProducts.map((product) => ({
      url: buildCanonicalUrl(`/products/${product.id}`),
      lastModified: ARCHIVE_LAST_MODIFIED,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
  ];

  return routes;
}
