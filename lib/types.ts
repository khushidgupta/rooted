export type PlantType =
  | "monstera"
  | "pothos"
  | "succulent"
  | "cactus"
  | "calla"
  | "sunflower"
  | "gladiolus";

export type PlantState = "thriving" | "healthy" | "resting" | "recovering";

export type MoodType = "great" | "good" | "okay" | "low";

export type Habit = {
  id: string;
  name: string;
  /** ISO date (YYYY-MM-DD) → completed that day */
  completions: Record<string, boolean>;
};

export type Memory = {
  date: string;
  text: string;
};

export type RootedState = {
  plantType: PlantType;
  habits: Habit[];
  memories: Memory[];
  /** ISO date → mood */
  moods: Record<string, MoodType>;
  /** ISO date → pages read */
  reading: Record<string, number>;
  startedAt: string;
};

export type NavTab = "home" | "dashboard" | "wrapped" | "buddies" | "community";
