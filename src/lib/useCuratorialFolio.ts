"use client";

import { useMemo, useSyncExternalStore } from "react";

const STORAGE_KEY = "sparkhub:curatorial-folio";
const CHANGE_EVENT = "sparkhub:folio-change";
let memorySnapshot = "[]";
let memoryOnly = false;

export const VALID_FOLIO_IDS: ReadonlySet<string> = new Set([
  // Featured cards (Wing II)
  "1", "2", "3", "4", "5", "6", "7", "8",
  "9", "10", "11", "12", "13", "14", "15", "16",
  // Daily curations (Wing I)
  "c13", "c14", "c15", "c16", "c17", "c18",
  "c9", "c10", "c11", "c12",
  "c1", "c2", "c3", "c4", "c5", "c6", "c7", "c8",
  // Hackathon products (Wing III)
  "jayu-ai-assistant",
  "gaze-link-als",
  "viddyscribe-web",
  "daogenie-governance",
  "ethpark-qr-mobile",
  "minidao-telegram",
  "ore-fair-mining",
  "banger-lol-creator",
  "meshmap-city-champ",
  "good-samaritan-vision",
  "skysplat-gaussian-drones",
  "coderepair-autonomous",
  "signal-seal-agent-audit",
  "scribemind-canvas",
  "pocketchef-ai-mobile",
  "subtlenote-offline-journal",
  "pianoverse-spatial-piano",
  "cellsculpt-spatial-bio",
  "artifacts-flow-builder",
  "legaleagle-contract-arena",
  // AI contest cards (Wing IV)
  "a1", "a2", "a3", "a4", "a5", "a6",
  // Inspiration sources (Wing V)
  "mobbin", "page-flows", "refero", "60fps", "pttrns", "appshots",
  "collect-ui", "checklist-design", "design-spells", "figma-community",
  "dribbble", "nicelydone", "saasframe", "saas-interface", "mobbin-web",
  "landingfolio", "navbar-gallery", "footer-design", "supahero", "bento-grids",
  "siteinspire", "landbook", "lapa-ninja", "one-page-love", "minimal-gallery",
  "httpster", "dark-design", "recent", "awwwards", "cssda", "the-fwa",
  "behance", "component-gallery", "design-system-gallery",
  "design-systems-repo", "designsystems-one", "apple-hig", "material-3",
  "fluent-2", "ibm-carbon", "shopify-polaris", "atlassian", "ant-design",
  "adobe-spectrum", "github-primer", "uswds", "brand-new",
  "the-brand-identity", "bpando", "mindsparkle", "its-nice-that",
  "typographic-posters", "pinterest", "fonts-in-use", "typewolf",
  "google-fonts", "fontshare", "font-in-logo", "adobe-color", "coolors",
  "color-hunt", "realtime-colors", "happy-hues", "colorspace", "lottiefiles",
  "codrops", "motionographer", "lucide", "phosphor", "iconoir", "heroicons",
  "unsplash", "pexels", "nappy", "noun-project", "undraw", "open-doodles",
  "blush", "shots", "mockup-world", "ls-graphics", "uisdc", "zcool", "gtn9",
  "digitaling", "ui-cn",
]);

function getSnapshot() {
  if (memoryOnly) return memorySnapshot;
  try {
    return window.localStorage.getItem(STORAGE_KEY) ?? "[]";
  } catch {
    return memorySnapshot;
  }
}

function getServerSnapshot() {
  return "[]";
}

export function parseFolioIds(snapshot: string): string[] {
  try {
    const parsed: unknown = JSON.parse(snapshot);
    return Array.isArray(parsed)
      ? [
          ...new Set(
            parsed.filter(
              (id): id is string =>
                typeof id === "string" && VALID_FOLIO_IDS.has(id)
            )
          ),
        ]
      : [];
  } catch {
    return [];
  }
}

function subscribe(onChange: () => void) {
  const onStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY || event.key === null) onChange();
  };
  window.addEventListener("storage", onStorage);
  window.addEventListener(CHANGE_EVENT, onChange);
  return () => {
    window.removeEventListener("storage", onStorage);
    window.removeEventListener(CHANGE_EVENT, onChange);
  };
}

function save(ids: string[]) {
  const validIds = ids.filter((id) => VALID_FOLIO_IDS.has(id));
  memorySnapshot = JSON.stringify(validIds);
  try {
    if (validIds.length) window.localStorage.setItem(STORAGE_KEY, memorySnapshot);
    else window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Keep the current session usable when browser storage is unavailable.
    memoryOnly = true;
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

export function useCuratorialFolio() {
  // The server and initial hydration render both start empty. React reads the
  // browser snapshot after hydration, without replacing the server-rendered tree.
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const likedIds = useMemo(() => parseFolioIds(snapshot), [snapshot]);

  return {
    likedIds,
    toggleLike(id: string) {
      if (!VALID_FOLIO_IDS.has(id)) return;
      const current = parseFolioIds(getSnapshot());
      save(
        current.includes(id)
          ? current.filter((value) => value !== id)
          : [...current, id]
      );
    },
    clearLikes() {
      save([]);
    },
  };
}
