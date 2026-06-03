"use client";

import { useState } from "react";
import { Plus, Trash2, Leaf } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/cn";
import { getHabitCompletionForDate } from "@/lib/stats";
import { useRooted } from "@/context/rooted-context";

type HabitListProps = {
  onHabitTended?: () => void;
};

export function HabitList({ onHabitTended }: HabitListProps) {
  const { state, todayKey, toggleHabit, addHabit, removeHabit } = useRooted();
  const [newHabit, setNewHabit] = useState("");
  const [justTended, setJustTended] = useState<string | null>(null);
  const { completed, total } = getHabitCompletionForDate(state.habits, todayKey);

  function handleToggle(habitId: string) {
    const wasDone = !!state.habits.find((h) => h.id === habitId)?.completions[
      todayKey
    ];
    toggleHabit(habitId);
    if (!wasDone) {
      setJustTended(habitId);
      onHabitTended?.();
      setTimeout(() => setJustTended(null), 700);
    }
  }

  function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    addHabit(newHabit);
    setNewHabit("");
  }

  return (
    <Card variant="sage" className="mb-8">
      <div className="flex items-baseline justify-between mb-6">
        <h2 className="font-serif text-2xl text-forest-900">Today&apos;s habits</h2>
        <span className="text-sm font-medium text-leaf-500 tabular-nums">
          {completed}/{total} tended
        </span>
      </div>

      <ul className="space-y-3 mb-5">
        {state.habits.map((habit) => {
          const done = !!habit.completions[todayKey];
          const showFeedback = justTended === habit.id;
          return (
            <li
              key={habit.id}
              className={cn(
                "group flex items-center gap-3 rounded-2xl border px-4 py-4 transition-all duration-300",
                done
                  ? "border-sage-200/90 bg-white shadow-sm"
                  : "border-sage-200/70 bg-white/90 hover:border-leaf-500/40 hover:shadow-sm",
                showFeedback && "habit-tended-pop"
              )}
            >
              <button
                type="button"
                onClick={() => handleToggle(habit.id)}
                aria-label={`Mark ${habit.name} as tended`}
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-300",
                  done
                    ? "border-forest-800 bg-forest-800 habit-check-pop shadow-[0_2px_8px_-2px_rgba(30,56,34,0.5)]"
                    : "border-sage-300 hover:border-leaf-500 hover:scale-105"
                )}
              >
                {done && (
                  <svg
                    className="h-4 w-4 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </button>
              <span
                className={cn(
                  "flex-1 text-[15px] transition-colors duration-300",
                  done ? "text-text-muted" : "text-text-primary"
                )}
              >
                {habit.name}
              </span>
              {showFeedback && (
                <span className="flex items-center gap-1 text-xs text-sage-600 opacity-0 animate-[fadeIn_0.3s_ease-out_forwards]">
                  <Leaf className="h-3 w-3" />
                  tended
                </span>
              )}
              {state.habits.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeHabit(habit.id)}
                  className="opacity-0 group-hover:opacity-100 focus:opacity-100 text-text-soft hover:text-terracotta transition-opacity p-1"
                  aria-label={`Remove ${habit.name}`}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              )}
            </li>
          );
        })}
      </ul>

      <form onSubmit={handleAdd} className="flex gap-2">
        <input
          type="text"
          value={newHabit}
          onChange={(e) => setNewHabit(e.target.value)}
          placeholder="Plant a new habit..."
          className="flex-1 rounded-2xl border border-sage-100 bg-cream/80 px-4 py-3.5 text-sm placeholder:text-text-soft focus:outline-none focus:ring-2 focus:ring-sage-200/80 focus:bg-white transition-colors"
        />
        <button
          type="submit"
          disabled={!newHabit.trim()}
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-forest-800 text-white hover:bg-forest-900 disabled:opacity-40 transition-all hover:scale-105 active:scale-95 shadow-[0_4px_12px_-2px_rgba(30,56,34,0.35)]"
          aria-label="Add habit"
        >
          <Plus className="h-5 w-5" />
        </button>
      </form>
    </Card>
  );
}
