import { DEFAULT_SITE_URL } from "./folio";
import type { HackathonEdition } from "./hackathons";
import type { HackathonProductDetail } from "./hackathon-details";

/**
 * Normalized base site URL without trailing slash (e.g. "https://naijoug.github.io/sparkhub").
 */
export const SITE_URL = DEFAULT_SITE_URL.replace(/\/+$/, "");

export const SITE_NAME = "SparkHub — 数字艺术与灵感策展志";
export const SITE_TITLE = "SparkHub — 数字艺术与灵感策展志 | 发现灵感，创造不凡";
export const SITE_DESCRIPTION =
  "汇集全球优秀设计、黑客松作品、AI 大赛佳作与每日新锐产品、创意活动及灵感网站的策展平台";

/**
 * Builds an absolute canonical URL for a given route path under SITE_URL.
 */
export function buildCanonicalUrl(path: string = "/"): string {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  if (normalizedPath === "/") {
    return `${SITE_URL}/`;
  }
  return `${SITE_URL}${normalizedPath}`;
}

/**
 * Builds JSON-LD structured data for the SparkHub main exhibition hall.
 */
export function buildWebsiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: buildCanonicalUrl("/"),
    description: SITE_DESCRIPTION,
    inLanguage: "zh-CN",
    potentialAction: {
      "@type": "SearchAction",
      target: `${buildCanonicalUrl("/")}?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

/**
 * Builds JSON-LD structured data for an individual hackathon product detail page.
 */
export function buildProductJsonLd(product: HackathonProductDetail) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: product.title,
    headline: product.tagline,
    description: product.summary,
    url: buildCanonicalUrl(`/products/${product.id}`),
    sameAs: product.githubUrl
      ? [product.officialUrl, product.githubUrl]
      : [product.officialUrl],
    applicationCategory: product.targetPlatform,
    operatingSystem: product.targetPlatform,
    award: product.award,
    keywords: product.techStack.join(", "),
    author: {
      "@type": "Organization",
      name: product.team.name,
    },
    isPartOf: {
      "@type": "Event",
      name: product.hackathonName,
      url: buildCanonicalUrl(`/hackathons/${product.hackathonId}`),
    },
  };
}

/**
 * Builds JSON-LD structured data for a hackathon edition archive page.
 */
export function buildHackathonJsonLd(hackathon: HackathonEdition) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${hackathon.name} (${hackathon.dateDisplay})`,
    alternateName: hackathon.englishName,
    description: hackathon.description,
    url: buildCanonicalUrl(`/hackathons/${hackathon.id}`),
    isPartOf: {
      "@type": "WebSite",
      name: SITE_NAME,
      url: buildCanonicalUrl("/"),
    },
    about: {
      "@type": "Event",
      name: hackathon.name,
      organizer: {
        "@type": "Organization",
        name: hackathon.organizer,
        url: hackathon.officialUrl,
      },
      location: {
        "@type": "Place",
        name: hackathon.location,
      },
    },
    hasPart: hackathon.products.map((product) => ({
      "@type": "SoftwareApplication",
      name: product.title,
      description: product.tagline,
      url: buildCanonicalUrl(`/products/${product.id}`),
    })),
  };
}
