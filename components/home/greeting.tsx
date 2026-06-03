"use client";

import { formatGreetingDate } from "@/lib/dates";
import { getCurrentStreak } from "@/lib/stats";
import { useRooted } from "@/context/rooted-context";
import { Flame } from "lucide-react";

export function Greeting() {
  const { state } = useRooted();
  const streak = getCurrentStreak(state.habits);

  return (
    <header className="flex items-start justify-between mb-8 sm:mb-10">
      <div>
        <p className="text-xs font-semibold tracking-[0.18em] text-leaf-500 mb-2">
          {formatGreetingDate()}
        </p>
        <h1 className="font-serif text-[2rem] sm:text-4xl text-forest-900 leading-[1.1]">
          Good to see you
        </h1>
        <p className="text-sm text-text-muted mt-2 hidden sm:block">
          Your garden is waiting.
        </p>
      </div>
      <div
        className="flex items-center gap-1.5 rounded-full border border-sage-200 bg-white px-3.5 py-2 text-sm text-forest-800 shadow-[var(--shadow-soft)]"
        title="Gentle streak — no pressure"
      >
        <Flame className="h-4 w-4 text-terracotta" strokeWidth={1.75} />
        <span className="tabular-nums font-medium">
          {streak} {streak === 1 ? "day" : "days"}
        </span>
      </div>
    </header>
  );
}
