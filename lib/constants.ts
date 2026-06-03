import type { PlantType, RootedState } from "./types";

export const STORAGE_KEY = "rooted-app-v1";

export const PLANT_LABELS: Record<PlantType, string> = {
  monstera: "Monstera",
  pothos: "Pothos",
  succulent: "Succulent",
  cactus: "Cactus",
  calla: "Cala Lily",
  sunflower: "Sunflower",
  gladiolus: "Gladiolus",
};

export const PLANT_STATE_COPY: Record<
  import("./types").PlantState,
  { label: string; message: string }
> = {
  thriving: {
    label: "Thriving",
    message: "Your plant is thriving — steady, gentle care is showing.",
  },
  healthy: {
    label: "Healthy",
    message: "Your plant is healthy and growing at its own pace.",
  },
  resting: {
    label: "Resting",
    message: "Your plant is resting. Welcome back, no pressure.",
  },
  recovering: {
    label: "Recovering",
    message: "Your plant is recovering. Small steps still count.",
  },
};

export const DEFAULT_HABITS = [
  { id: "habit-read", name: "Read", completions: {} },
  { id: "habit-water", name: "Drink Water", completions: {} },
  { id: "habit-journal", name: "Journal", completions: {} },
];

export const MOOD_OPTIONS: {
  value: import("./types").MoodType;
  emoji: string;
  label: string;
}[] = [
  { value: "great", emoji: "😊", label: "Great" },
  { value: "good", emoji: "🙂", label: "Good" },
  { value: "okay", emoji: "😐", label: "Okay" },
  { value: "low", emoji: "😔", label: "Low" },
];

export function createDefaultState(): RootedState {
  return {
    plantType: "monstera",
    habits: DEFAULT_HABITS.map((h) => ({ ...h, completions: { ...h.completions } })),
    memories: [],
    moods: {},
    reading: {},
    startedAt: new Date().toISOString(),
  };
}

export const LANDING_FEATURES = [
  {
    icon: "leaf" as const,
    title: "A plant companion",
    description:
      "Grow a digital plant that reflects your care — never wilting, always encouraging.",
  },
  {
    icon: "sprout" as const,
    title: "Quiet habits",
    description:
      "Tend small rituals without streak pressure. Progress at the pace of a garden.",
  },
  {
    icon: "sparkles" as const,
    title: "Memorable moments",
    description:
      "Capture one meaningful memory each day — a gentle journal for your life.",
  },
  {
    icon: "calendar" as const,
    title: "Monthly reflection",
    description:
      "See your growth in soft green patterns. No red warnings, no judgment.",
  },
  {
    icon: "wrapped" as const,
    title: "Wrapped summaries",
    description:
      "Beautiful monthly cards celebrating your habits, memories, and plant.",
  },
  {
    icon: "users" as const,
    title: "Shared gardens",
    description:
      "Plant buddies and community challenges — growing together, coming soon.",
  },
];
