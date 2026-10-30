import { CurationCategory, dailyCurations } from "./data";
import { inspirationSources, matchesSourceQuery, SourceSectionId } from "./sources";

export type SourceFilter = SourceSectionId | "all" | "core";

export function filterDailyCurations(query: string, category: CurationCategory) {
  const normalized = query.trim().toLowerCase();
  return dailyCurations.filter((item) =>
    (category === "all" || item.category === category) &&
    (!normalized || [item.title, item.summary, item.curatorNote, item.sourceName, ...item.tags]
      .some((value) => value.toLowerCase().includes(normalized)))
  );
}

export function filterSources(query: string, section: SourceFilter) {
  const normalized = query.trim().toLowerCase();
  return inspirationSources.filter((source) =>
    (section === "all" || (section === "core" ? source.core : source.sections.includes(section))) &&
    matchesSourceQuery(source, normalized)
  );
}
