"use client";

import { useMemo, useSyncExternalStore } from "react";

const STORAGE_KEY = "sparkhub:curatorial-folio";
const CHANGE_EVENT = "sparkhub:folio-change";
let memorySnapshot = "[]";
let memoryOnly = false;

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

function parseIds(snapshot: string): string[] {
  try {
    const parsed: unknown = JSON.parse(snapshot);
    return Array.isArray(parsed)
      ? [...new Set(parsed.filter((id): id is string => typeof id === "string"))]
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
  memorySnapshot = JSON.stringify(ids);
  try {
    if (ids.length) window.localStorage.setItem(STORAGE_KEY, memorySnapshot);
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
  const likedIds = useMemo(() => parseIds(snapshot), [snapshot]);

  return {
    likedIds,
    toggleLike(id: string) {
      const current = parseIds(getSnapshot());
      save(current.includes(id) ? current.filter((value) => value !== id) : [...current, id]);
    },
    clearLikes() {
      save([]);
    },
  };
}
