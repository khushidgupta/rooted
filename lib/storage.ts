import { createDefaultState, STORAGE_KEY } from "./constants";
import type { RootedState } from "./types";

export function loadState(): RootedState {
  if (typeof window === "undefined") return createDefaultState();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return createDefaultState();
    const parsed = JSON.parse(raw) as RootedState;
    return {
      ...createDefaultState(),
      ...parsed,
      habits: parsed.habits?.length ? parsed.habits : createDefaultState().habits,
      moods: parsed.moods ?? {},
      reading: parsed.reading ?? {},
    };
  } catch {
    return createDefaultState();
  }
}

export function saveState(state: RootedState): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}
