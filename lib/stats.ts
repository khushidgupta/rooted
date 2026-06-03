import type { Habit, Memory, MoodType, PlantState, RootedState } from "./types";
import { getDaysInMonth, getMonthDates, isSameMonth, toDateKey } from "./dates";

export function getHabitCompletionForDate(
  habits: Habit[],
  dateKey: string
): { completed: number; total: number } {
  const total = habits.length;
  const completed = habits.filter((h) => h.completions[dateKey]).length;
  return { completed, total };
}

export function getDayIntensity(
  habits: Habit[],
  dateKey: string
): 0 | 1 | 2 | 3 | 4 {
  const { completed, total } = getHabitCompletionForDate(habits, dateKey);
  if (total === 0 || completed === 0) return 0;
  const ratio = completed / total;
  if (ratio >= 1) return 4;
  if (ratio >= 0.66) return 3;
  if (ratio >= 0.33) return 2;
  return 1;
}

export function getCurrentStreak(habits: Habit[]): number {
  if (habits.length === 0) return 0;
  let streak = 0;
  const today = new Date();
  for (let i = 0; i < 365; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const key = toDateKey(d);
    const { completed, total } = getHabitCompletionForDate(habits, key);
    if (completed === total && total > 0) {
      streak++;
    } else if (i === 0) {
      continue;
    } else {
      break;
    }
  }
  return streak;
}

export function getLongestStreak(habits: Habit[]): number {
  if (habits.length === 0) return 0;
  const keys = new Set<string>();
  habits.forEach((h) =>
    Object.keys(h.completions).forEach((k) => {
      if (h.completions[k]) keys.add(k);
    })
  );
  const sorted = [...keys].sort();
  if (sorted.length === 0) return 0;

  let longest = 0;
  let current = 0;
  let prev: Date | null = null;

  for (const key of sorted) {
    const d = new Date(key);
    const { completed, total } = getHabitCompletionForDate(habits, key);
    if (completed !== total || total === 0) {
      current = 0;
      prev = null;
      continue;
    }
    if (prev) {
      const diff = (d.getTime() - prev.getTime()) / (1000 * 60 * 60 * 24);
      if (diff === 1) current++;
      else current = 1;
    } else {
      current = 1;
    }
    longest = Math.max(longest, current);
    prev = d;
  }
  return longest;
}

export function getMonthCompletionPercent(
  habits: Habit[],
  year: number,
  month: number
): number {
  const dates = getMonthDates(year, month);
  if (habits.length === 0 || dates.length === 0) return 0;
  let sum = 0;
  for (const key of dates) {
    const { completed, total } = getHabitCompletionForDate(habits, key);
    sum += total > 0 ? completed / total : 0;
  }
  return Math.round((sum / dates.length) * 100);
}

export function getHabitMonthCount(
  habit: Habit,
  year: number,
  month: number
): number {
  return Object.keys(habit.completions).filter(
    (k) => habit.completions[k] && isSameMonth(k, year, month)
  ).length;
}

export function getMemoriesForMonth(
  memories: Memory[],
  year: number,
  month: number
): Memory[] {
  return memories.filter((m) => isSameMonth(m.date, year, month));
}

export function getMostConsistentHabit(
  habits: Habit[],
  year: number,
  month: number
): Habit | null {
  if (habits.length === 0) return null;
  return habits.reduce((best, h) => {
    const count = getHabitMonthCount(h, year, month);
    const bestCount = best ? getHabitMonthCount(best, year, month) : -1;
    return count > bestCount ? h : best;
  }, habits[0]);
}

export function getBestWeekLabel(
  habits: Habit[],
  year: number,
  month: number
): string {
  const days = getDaysInMonth(year, month);
  let bestStart = 1;
  let bestScore = -1;

  for (let start = 1; start <= days - 6; start++) {
    let score = 0;
    for (let d = start; d < start + 7; d++) {
      const key = `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
      const { completed, total } = getHabitCompletionForDate(habits, key);
      score += total > 0 ? completed / total : 0;
    }
    if (score > bestScore) {
      bestScore = score;
      bestStart = start;
    }
  }

  const monthName = new Date(year, month, 1).toLocaleDateString("en-US", {
    month: "long",
  });
  const end = Math.min(bestStart + 6, days);
  return `${monthName} ${bestStart}–${end}`;
}

export function derivePlantState(habits: Habit[]): PlantState {
  const today = toDateKey();
  const { completed, total } = getHabitCompletionForDate(habits, today);
  const streak = getCurrentStreak(habits);

  let recentScore = 0;
  for (let i = 0; i < 7; i++) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const key = toDateKey(d);
    const day = getHabitCompletionForDate(habits, key);
    if (day.total > 0) recentScore += day.completed / day.total;
  }
  const recentAvg = recentScore / 7;

  if (streak >= 4 && recentAvg >= 0.7) return "thriving";
  if (completed === total && total > 0 && recentAvg >= 0.5) return "healthy";
  if (recentAvg < 0.2 && streak === 0) return "resting";
  if (recentAvg < 0.5) return "recovering";
  return "healthy";
}

export function getWrappedSummary(
  state: RootedState,
  year: number,
  month: number
): string {
  const percent = getMonthCompletionPercent(state.habits, year, month);
  const memories = getMemoriesForMonth(state.memories, year, month).length;
  const streak = getLongestStreak(state.habits);
  const best = getMostConsistentHabit(state.habits, year, month);
  const monthName = new Date(year, month, 1).toLocaleDateString("en-US", {
    month: "long",
  });

  const habitName = best?.name ?? "quiet rituals";
  return `${monthName} was a month of steady growth. You tended ${percent}% of your habits, captured ${memories} meaningful ${memories === 1 ? "moment" : "moments"}, and your gentle streak reached ${streak} ${streak === 1 ? "day" : "days"}. ${habitName} showed the most consistency — your plant flourished alongside your progress.`;
}

export function getCompletionPercentForDate(
  habits: Habit[],
  dateKey: string
): number {
  const { completed, total } = getHabitCompletionForDate(habits, dateKey);
  if (total === 0) return 0;
  return Math.round((completed / total) * 100);
}

export function getDailyCompletionTrend(
  habits: Habit[],
  year: number,
  month: number
): number[] {
  return getMonthDates(year, month).map((key) =>
    getCompletionPercentForDate(habits, key)
  );
}

export function getHabitConsistencyTrend(
  habits: Habit[],
  year: number,
  month: number
): { name: string; values: number[] }[] {
  const dates = getMonthDates(year, month);
  return habits.map((habit) => ({
    name: habit.name,
    values: dates.map((key) => (habit.completions[key] ? 100 : 0)),
  }));
}

export function getReadingMonthTotal(
  reading: Record<string, number>,
  year: number,
  month: number
): number {
  return Object.entries(reading).reduce((sum, [key, pages]) => {
    if (isSameMonth(key, year, month)) return sum + pages;
    return sum;
  }, 0);
}

export function getReadingTrend(
  reading: Record<string, number>,
  year: number,
  month: number
): number[] {
  return getMonthDates(year, month).map((key) => reading[key] ?? 0);
}

export function getMoodValue(mood: MoodType): number {
  const map: Record<MoodType, number> = {
    great: 4,
    good: 3,
    okay: 2,
    low: 1,
  };
  return map[mood];
}

export function getMoodTrend(
  moods: Record<string, MoodType>,
  year: number,
  month: number
): (MoodType | null)[] {
  return getMonthDates(year, month).map((key) => moods[key] ?? null);
}

export function getJournalReflectionSummary(
  state: RootedState,
  year: number,
  month: number
): string {
  const monthName = new Date(year, month, 1).toLocaleDateString("en-US", {
    month: "long",
  });
  const percent = getMonthCompletionPercent(state.habits, year, month);
  const memories = getMemoriesForMonth(state.memories, year, month).length;
  const pages = getReadingMonthTotal(state.reading, year, month);
  const moodDays = Object.keys(state.moods).filter((k) =>
    isSameMonth(k, year, month)
  ).length;

  const lines = [
    `This ${monthName}, you moved through your days with intention.`,
    percent > 0
      ? `You tended your habits on ${percent}% of mornings and evenings — not perfectly, but honestly.`
      : `Your garden is waiting — there is no rush to begin.`,
    memories > 0
      ? `You paused to remember ${memories} ${memories === 1 ? "moment" : "moments"} worth keeping.`
      : `There is still room to capture what mattered.`,
    pages > 0
      ? `You turned ${pages} pages — quiet company on the shelf.`
      : null,
    moodDays > 0
      ? `You checked in with yourself ${moodDays} times. That counts.`
      : null,
  ].filter(Boolean);

  return lines.join(" ");
}

export function getHabitsTendedCount(
  habits: Habit[],
  year: number,
  month: number
): number {
  return habits.reduce(
    (sum, h) => sum + getHabitMonthCount(h, year, month),
    0
  );
}

export function getDaysCheckedIn(
  state: RootedState,
  year: number,
  month: number
): number {
  const dates = new Set<string>();
  state.habits.forEach((h) =>
    Object.keys(h.completions).forEach((k) => {
      if (h.completions[k] && isSameMonth(k, year, month)) dates.add(k);
    })
  );
  Object.keys(state.moods).forEach((k) => {
    if (isSameMonth(k, year, month)) dates.add(k);
  });
  state.memories.forEach((m) => {
    if (isSameMonth(m.date, year, month)) dates.add(m.date);
  });
  Object.keys(state.reading).forEach((k) => {
    if ((state.reading[k] ?? 0) > 0 && isSameMonth(k, year, month))
      dates.add(k);
  });
  return dates.size;
}

export function getReadingStreak(reading: Record<string, number>): number {
  let streak = 0;
  const today = new Date();
  for (let i = 0; i < 365; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const key = toDateKey(d);
    if ((reading[key] ?? 0) > 0) streak++;
    else if (i > 0) break;
  }
  return streak;
}

export function getPositiveWrappedSummary(
  state: RootedState,
  year: number,
  month: number
): string {
  const monthName = new Date(year, month, 1).toLocaleDateString("en-US", {
    month: "long",
  });
  const memories = getMemoriesForMonth(state.memories, year, month).length;
  const pages = getReadingMonthTotal(state.reading, year, month);
  const tended = getHabitsTendedCount(state.habits, year, month);
  const checkIns = getDaysCheckedIn(state, year, month);
  const best = getMostConsistentHabit(state.habits, year, month);

  const parts: string[] = [
    `${monthName} held quiet moments worth celebrating.`,
  ];
  if (memories > 0)
    parts.push(
      `You kept ${memories} ${memories === 1 ? "memory" : "memories"} close to your heart.`
    );
  if (pages > 0)
    parts.push(`You read ${pages} pages — small windows into other worlds.`);
  if (tended > 0)
    parts.push(`You tended your garden ${tended} times, without needing to be perfect.`);
  if (checkIns > 0)
    parts.push(`You showed up ${checkIns} ${checkIns === 1 ? "day" : "days"} — that is enough.`);
  if (best)
    parts.push(`${best.name} was a gentle companion through it all.`);

  if (parts.length === 1)
    parts.push("Your garden is here whenever you are ready to return.");

  return parts.join(" ");
}

export function getRecentMemories(
  memories: Memory[],
  limit = 5
): Memory[] {
  return [...memories]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, limit);
}

export function getMonthMemoryHighlights(
  memories: Memory[],
  year: number,
  month: number,
  limit = 3
): Memory[] {
  return getMemoriesForMonth(memories, year, month)
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, limit);
}
