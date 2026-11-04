"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import QuickViewToolbar from "@/components/QuickViewToolbar";
import SearchTelemetryBar from "@/components/SearchTelemetryBar";
import CategoryBar from "@/components/CategoryBar";
import DailyCurationsSection from "@/components/DailyCurationsSection";
import FeaturedSection from "@/components/FeaturedSection";
import HackathonSection from "@/components/HackathonSection";
import AIContestSection from "@/components/AIContestSection";
import SourceAtlasSection from "@/components/SourceAtlasSection";
import {
  aiContestToDossier,
  dailyToDossier,
  DossierInspectItem,
  hackathonProductToDossier,
  pickRandomDossier,
} from "@/lib/dossier";
import { ViewDensityMode, WingId } from "@/lib/filters";
import { useCuratorialFolio } from "@/lib/useCuratorialFolio";
import { useExhibitionFilters } from "@/lib/useExhibitionFilters";

const CuratorialFolioModal = dynamic(
  () => import("@/components/CuratorialFolioModal")
);
const CurationDossierModal = dynamic(
  () => import("@/components/CurationDossierModal")
);

export type { WingId, ViewDensityMode };

export default function ExhibitionClient({
  children,
}: {
  children?: React.ReactNode;
}) {
  const [folioOpen, setFolioOpen] = useState(false);
  const [inspectingDossier, setInspectingDossier] =
    useState<DossierInspectItem | null>(null);

  const {
    likedIds,
    toggleLike: handleToggleLike,
    clearLikes: handleClearAllLikes,
  } = useCuratorialFolio();

  const {
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
  } = useExhibitionFilters(likedIds);

  return (
    <>
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        savedCount={likedIds.length}
        onOpenFolio={() => setFolioOpen(true)}
        onRandomSerendipity={() => setInspectingDossier(pickRandomDossier())}
        onNavigateSection={handleHeaderNavigate}
        activeWing={activeWing}
      />

      <main className="flex-1">
        <Hero searchQuery={searchQuery} onSearchChange={setSearchQuery} />

        <QuickViewToolbar
          activeWing={activeWing}
          onSelectWing={setActiveWing}
          favoritesOnly={favoritesOnly}
          onToggleFavoritesOnly={() => setFavoritesOnly((prev) => !prev)}
          savedCount={likedIds.length}
          viewMode={viewMode}
          onChangeViewMode={setViewMode}
        />

        {searchStats && (
          <SearchTelemetryBar
            searchQuery={searchQuery}
            stats={searchStats}
            onNavigateSection={handleHeaderNavigate}
            onResetSearch={() => setSearchQuery("")}
          />
        )}

        {(activeWing === "all" || activeWing === "daily-curations") && (
          <DailyCurationsSection
            selectedTab={dailyCategory}
            onSelectTab={setDailyCategory}
            searchQuery={searchQuery}
            onSelectTag={handleToggleTag}
            likedIds={likedIds}
            onToggleLike={handleToggleLike}
            onInspectDossier={(item) =>
              setInspectingDossier(dailyToDossier(item))
            }
            viewMode={viewMode}
            favoritesOnly={favoritesOnly}
            forceExpanded={activeWing === "daily-curations"}
          />
        )}

        {(activeWing === "all" || activeWing === "featured") && (
          <>
            <CategoryBar
              activeCategory={activeCategory}
              onSelectCategory={setActiveCategory}
              searchQuery={searchQuery}
              favoritesOnly={favoritesOnly}
              likedIds={likedIds}
            />

            <FeaturedSection
              activeCategory={activeCategory}
              searchQuery={searchQuery}
              onSelectTag={handleToggleTag}
              likedIds={likedIds}
              onToggleLike={handleToggleLike}
              viewMode={viewMode}
              favoritesOnly={favoritesOnly}
              forceExpanded={activeWing === "featured"}
            />
          </>
        )}

        {(activeWing === "all" || activeWing === "hackathons") && (
          <HackathonSection
            selectedPlatform={hackathonPlatform}
            onSelectPlatform={setHackathonPlatform}
            searchQuery={searchQuery}
            onSelectTag={handleToggleTag}
            likedIds={likedIds}
            onToggleLike={handleToggleLike}
            onInspectProduct={(product) =>
              setInspectingDossier(hackathonProductToDossier(product))
            }
            viewMode={viewMode}
            favoritesOnly={favoritesOnly}
            forceExpanded={activeWing === "hackathons"}
          />
        )}

        {(activeWing === "all" || activeWing === "ai-contests") && (
          <AIContestSection
            searchQuery={searchQuery}
            onSelectTag={handleToggleTag}
            likedIds={likedIds}
            onToggleLike={handleToggleLike}
            onInspectDossier={(item) =>
              setInspectingDossier(aiContestToDossier(item))
            }
            viewMode={viewMode}
            favoritesOnly={favoritesOnly}
          />
        )}

        {(activeWing === "all" || activeWing === "sources") && (
          <SourceAtlasSection
            selectedSection={sourceSection}
            onSelectSection={setSourceSection}
            searchQuery={searchQuery}
            onSelectTag={handleToggleTag}
            likedIds={likedIds}
            onToggleLike={handleToggleLike}
            viewMode={viewMode}
            favoritesOnly={favoritesOnly}
            forceExpanded={activeWing === "sources"}
          />
        )}
      </main>

      {folioOpen && (
        <CuratorialFolioModal
          isOpen={folioOpen}
          onClose={() => setFolioOpen(false)}
          likedIds={likedIds}
          onToggleLike={handleToggleLike}
          onClearAll={handleClearAllLikes}
          onSelectTag={handleToggleTag}
        />
      )}

      {inspectingDossier && (
        <CurationDossierModal
          key={inspectingDossier.id}
          item={inspectingDossier}
          onClose={() => setInspectingDossier(null)}
          liked={likedIds.includes(inspectingDossier.id)}
          onToggleLike={(id) => handleToggleLike(id)}
          onSelectTag={handleToggleTag}
        />
      )}

      {children}
    </>
  );
}
