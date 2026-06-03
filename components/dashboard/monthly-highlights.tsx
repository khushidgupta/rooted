"use client";

import { Card } from "@/components/ui/card";
import { JournalSection } from "@/components/dashboard/journal-section";
import {
  getBestWeekLabel,
  getMemoriesForMonth,
  getMostConsistentHabit,
  getMonthCompletionPercent,
} from "@/lib/stats";
import { useRooted } from "@/context/rooted-context";

export function MonthlyHighlights() {
  const { state } = useRooted();
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const percent = getMonthCompletionPercent(state.habits, year, month);
  const bestHabit = getMostConsistentHabit(state.habits, year, month);
  const bestWeek = getBestWeekLabel(state.habits, year, month);
  const memories = getMemoriesForMonth(state.memories, year, month).length;

  const items = [
    { label: "Days tended", value: `${percent}%` },
    { label: "Most consistent", value: bestHabit?.name ?? "—" },
    { label: "Best week", value: bestWeek },
    { label: "Memories kept", value: String(memories) },
  ];

  return (
    <JournalSection title="Month at a glance">
      <Card>
        <ul className="divide-y divide-sage-50">
          {items.map(({ label, value }) => (
            <li
              key={label}
              className="flex justify-between items-baseline py-4 first:pt-0 last:pb-0"
            >
              <span className="text-sm text-text-muted">{label}</span>
              <span className="font-serif text-xl text-moss-900">{value}</span>
            </li>
          ))}
        </ul>
      </Card>
    </JournalSection>
  );
}
