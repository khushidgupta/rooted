"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { createDefaultState } from "@/lib/constants";
import { toDateKey } from "@/lib/dates";
import { derivePlantState } from "@/lib/stats";
import { loadState, saveState } from "@/lib/storage";
import type { Habit, Memory, MoodType, PlantType, RootedState } from "@/lib/types";

type RootedContextValue = {
  state: RootedState;
  hydrated: boolean;
  plantState: ReturnType<typeof derivePlantState>;
  todayKey: string;
  setPlantType: (type: PlantType) => void;
  toggleHabit: (habitId: string) => void;
  addHabit: (name: string) => void;
  removeHabit: (habitId: string) => void;
  saveMemory: (text: string) => void;
  getTodayMemory: () => Memory | undefined;
  setMood: (mood: MoodType) => void;
  getTodayMood: () => MoodType | undefined;
  setReadingPages: (pages: number) => void;
  getTodayReading: () => number;
};

const RootedContext = createContext<RootedContextValue | null>(null);

export function RootedProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<RootedState>(createDefaultState);
  const [hydrated, setHydrated] = useState(false);
  const todayKey = toDateKey();

  useEffect(() => {
    setState(loadState());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) saveState(state);
  }, [state, hydrated]);

  const update = useCallback((fn: (prev: RootedState) => RootedState) => {
    setState(fn);
  }, []);

  const setPlantType = useCallback((type: PlantType) => {
    update((s) => ({ ...s, plantType: type }));
  }, [update]);

  const toggleHabit = useCallback(
    (habitId: string) => {
      update((s) => ({
        ...s,
        habits: s.habits.map((h) => {
          if (h.id !== habitId) return h;
          const next = { ...h.completions };
          if (next[todayKey]) delete next[todayKey];
          else next[todayKey] = true;
          return { ...h, completions: next };
        }),
      }));
    },
    [update, todayKey]
  );

  const addHabit = useCallback(
    (name: string) => {
      const trimmed = name.trim();
      if (!trimmed) return;
      update((s) => ({
        ...s,
        habits: [
          ...s.habits,
          {
            id: `habit-${Date.now()}`,
            name: trimmed,
            completions: {},
          },
        ],
      }));
    },
    [update]
  );

  const removeHabit = useCallback(
    (habitId: string) => {
      update((s) => ({
        ...s,
        habits: s.habits.filter((h) => h.id !== habitId),
      }));
    },
    [update]
  );

  const saveMemory = useCallback(
    (text: string) => {
      const trimmed = text.trim();
      if (!trimmed) return;
      update((s) => {
        const withoutToday = s.memories.filter((m) => m.date !== todayKey);
        return {
          ...s,
          memories: [...withoutToday, { date: todayKey, text: trimmed }],
        };
      });
    },
    [update, todayKey]
  );

  const getTodayMemory = useCallback((): Memory | undefined => {
    return state.memories.find((m) => m.date === todayKey);
  }, [state.memories, todayKey]);

  const setMood = useCallback(
    (mood: MoodType) => {
      update((s) => ({
        ...s,
        moods: { ...s.moods, [todayKey]: mood },
      }));
    },
    [update, todayKey]
  );

  const getTodayMood = useCallback((): MoodType | undefined => {
    return state.moods[todayKey];
  }, [state.moods, todayKey]);

  const setReadingPages = useCallback(
    (pages: number) => {
      const value = Math.max(0, Math.round(pages));
      update((s) => ({
        ...s,
        reading: { ...s.reading, [todayKey]: value },
      }));
    },
    [update, todayKey]
  );

  const getTodayReading = useCallback((): number => {
    return state.reading[todayKey] ?? 0;
  }, [state.reading, todayKey]);

  const plantState = useMemo(
    () => derivePlantState(state.habits),
    [state.habits]
  );

  const value = useMemo(
    () => ({
      state,
      hydrated,
      plantState,
      todayKey,
      setPlantType,
      toggleHabit,
      addHabit,
      removeHabit,
      saveMemory,
      getTodayMemory,
      setMood,
      getTodayMood,
      setReadingPages,
      getTodayReading,
    }),
    [
      state,
      hydrated,
      plantState,
      todayKey,
      setPlantType,
      toggleHabit,
      addHabit,
      removeHabit,
      saveMemory,
      getTodayMemory,
      setMood,
      getTodayMood,
      setReadingPages,
      getTodayReading,
    ]
  );

  return (
    <RootedContext.Provider value={value}>{children}</RootedContext.Provider>
  );
}

export function useRooted() {
  const ctx = useContext(RootedContext);
  if (!ctx) throw new Error("useRooted must be used within RootedProvider");
  return ctx;
}
