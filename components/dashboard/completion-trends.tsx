"use client";

import { Card } from "@/components/ui/card";
import { JournalChart } from "@/components/ui/journal-chart";
import { JournalSection } from "@/components/dashboard/journal-section";
import {
  getDailyCompletionTrend,
  getHabitConsistencyTrend,
  getHabitMonthCount,
} from "@/lib/stats";
import { getDaysInMonth } from "@/lib/dates";
import { useRooted } from "@/context/rooted-context";

export function CompletionTrends() {
  const { state } = useRooted();
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const daily = getDailyCompletionTrend(state.habits, year, month);
  const habits = getHabitConsistencyTrend(state.habits, year, month);
  const daysInMonth = getDaysInMonth(year, month);

  return (
    <JournalSection
      title="Growth over time"
      subtitle="Soft washes of tending — not scores to chase."
    >
      <div className="space-y-4">
        <Card className="bg-sage-wash border-sage-200/60">
          <p className="text-xs text-text-soft mb-1">Daily rhythm</p>
          <p className="font-serif italic text-moss-800/80 text-sm mb-4">
            Each bar is a day you showed up, however briefly.
          </p>
          <div className="rounded-2xl bg-gradient-to-b from-white/60 to-transparent p-3">
            <JournalChart
              data={daily}
              max={100}
              barClassName="fill-sage-200/40"
            />
          </div>
        </Card>
        {habits.length > 0 && (
          <Card>
            <p className="text-xs text-text-soft mb-1">Habit reflections</p>
            <p className="font-serif italic text-moss-800/80 text-sm mb-5">
              How each ritual appeared across the month.
            </p>
            <ul className="space-y-5">
              {habits.map((h) => {
                const habit = state.habits.find((x) => x.name === h.name);
                const count = habit
                  ? getHabitMonthCount(habit, year, month)
                  : 0;
                return (
                  <li key={h.name}>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-serif text-moss-900">{h.name}</span>
                      <span className="text-text-soft text-xs">
                        {count} of {daysInMonth} days
                      </span>
                    </div>
                    <JournalChart
                      data={h.values}
                      max={100}
                      barClassName="fill-sage-100/70"
                    />
                  </li>
                );
              })}
            </ul>
          </Card>
        )}
      </div>
    </JournalSection>
  );
}
