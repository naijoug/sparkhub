"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { CurationCategory } from "./data";
import { PlatformCategory } from "./hackathons";
import {
  filterAIContestCards,
  filterDailyCurations,
  filterFeaturedCards,
  filterHackathonProducts,
  filterSources,
  parseFilterSearchParams,
  serializeFilterSearchParams,
  SourceFilter,
  ViewDensityMode,
  WingId,
} from "./filters";

export interface SearchTelemetryStats {
  total: number;
  dailyCount: number;
  featuredCount: number;
  hackathonCount: number;
  aiCount: number;
  sourceCount: number;
}

export function useExhibitionFilters(likedIds: string[]) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [dailyCategory, setDailyCategory] = useState<CurationCategory>("all");
  const [hackathonPlatform, setHackathonPlatform] =
    useState<PlatformCategory>("all");
  const [sourceSection, setSourceSection] = useState<SourceFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeWing, setActiveWing] = useState<WingId>("all");
  const [viewMode, setViewMode] = useState<ViewDensityMode>("comfort");
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const urlReadyRef = useRef(false);

  useEffect(() => {
    const syncFromUrl = () => {
      const next = parseFilterSearchParams(window.location.search);
      setSearchQuery(next.searchQuery);
      setActiveWing(next.activeWing);
      setFavoritesOnly(next.favoritesOnly);
      setViewMode(next.viewMode);
      setDailyCategory(next.dailyCategory);
      setActiveCategory(next.activeCategory);
      setHackathonPlatform(next.hackathonPlatform);
      setSourceSection(next.sourceSection);
    };

    if (window.location.search) {
      syncFromUrl();
    }

    window.addEventListener("popstate", syncFromUrl);
    return () => window.removeEventListener("popstate", syncFromUrl);
  }, []);

  useEffect(() => {
    if (!urlReadyRef.current) {
      urlReadyRef.current = true;
      return;
    }

    const searchStr = serializeFilterSearchParams({
      searchQuery,
      activeWing,
      favoritesOnly,
      viewMode,
      dailyCategory,
      activeCategory,
      hackathonPlatform,
      sourceSection,
    });
    const nextUrl = `${window.location.pathname}${
      searchStr ? `?${searchStr}` : ""
    }${window.location.hash}`;
    const currentUrl = `${window.location.pathname}${window.location.search}${window.location.hash}`;

    if (nextUrl !== currentUrl) {
      window.history.replaceState(null, "", nextUrl);
    }
  }, [
    searchQuery,
    activeWing,
    favoritesOnly,
    viewMode,
    dailyCategory,
    activeCategory,
    hackathonPlatform,
    sourceSection,
  ]);

  const normalizedQuery = searchQuery.trim().toLowerCase();

  const searchStats = useMemo<SearchTelemetryStats | null>(() => {
    if (!normalizedQuery) return null;

    const dailyCount = filterDailyCurations(
      normalizedQuery,
      dailyCategory,
      favoritesOnly,
      likedIds
    ).length;

    const featuredCount = filterFeaturedCards(
      normalizedQuery,
      activeCategory,
      favoritesOnly,
      likedIds
    ).length;

    const hackathonCount = filterHackathonProducts(
      normalizedQuery,
      hackathonPlatform,
      favoritesOnly,
      likedIds
    ).length;

    const aiCount = filterAIContestCards(
      normalizedQuery,
      favoritesOnly,
      likedIds
    ).length;

    const sourceCount = filterSources(
      normalizedQuery,
      sourceSection,
      favoritesOnly,
      likedIds
    ).length;

    return {
      total: dailyCount + featuredCount + hackathonCount + aiCount + sourceCount,
      dailyCount,
      featuredCount,
      hackathonCount,
      aiCount,
      sourceCount,
    };
  }, [
    normalizedQuery,
    activeCategory,
    dailyCategory,
    hackathonPlatform,
    sourceSection,
    favoritesOnly,
    likedIds,
  ]);

  const handleToggleTag = useCallback((tag: string) => {
    setSearchQuery((prev) =>
      prev.trim().toLowerCase() === tag.trim().toLowerCase() ? "" : tag
    );
  }, []);

  const handleHeaderNavigate = useCallback(
    (sectionId: string) => {
      if (
        sectionId !== "top" &&
        activeWing !== "all" &&
        activeWing !== sectionId
      ) {
        setActiveWing("all");
        requestAnimationFrame(() => {
          document
            .getElementById(sectionId)
            ?.scrollIntoView({ behavior: "smooth" });
        });
      }
    },
    [activeWing]
  );

  return {
    activeCategory,
    setActiveCategory,
    dailyCategory,
    setDailyCategory,
    hackathonPlatform,
    setHackathonPlatform,
    sourceSection,
    setSourceSection,
    searchQuery,
    setSearchQuery,
    activeWing,
    setActiveWing,
    viewMode,
    setViewMode,
    favoritesOnly,
    setFavoritesOnly,
    searchStats,
    handleToggleTag,
    handleHeaderNavigate,
  };
}
