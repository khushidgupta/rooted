"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { JournalSection } from "@/components/dashboard/journal-section";
import { cn } from "@/lib/cn";
import { toDateKey } from "@/lib/dates";
import {
  getCompletionPercentForDate,
  getDayIntensity,
  getHabitCompletionForDate,
} from "@/lib/stats";
import { getDaysInMonth, parseDateKey } from "@/lib/dates";
import { useRooted } from "@/context/rooted-context";

const WEEKDAYS = ["S", "M", "T", "W", "T", "F", "S"];

export function HabitCalendar() {
  const { state } = useRooted();
  const [tooltip, setTooltip] = useState<string | null>(null);
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = new Date(year, month, 1).getDay();
  const todayKey = toDateKey();

  const cells: (string | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => {
      const d = i + 1;
      return `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
    }),
  ];

  function getTooltipText(key: string): string {
    const d = parseDateKey(key);
    const label = d.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
    const pct = getCompletionPercentForDate(state.habits, key);
    const { completed, total } = getHabitCompletionForDate(state.habits, key);
    if (total === 0) return `${label} — a quiet day`;
    return `${label} · ${pct}% · ${completed}/${total} tended`;
  }

  return (
    <JournalSection
      title="Habit calendar"
      subtitle="Watercolor washes for each day — lighter is quieter, and that is okay."
    >
      <Card className="overflow-visible bg-cream-card/20">
        <div className="grid grid-cols-7 gap-2.5 mb-3">
          {WEEKDAYS.map((d, i) => (
            <span
              key={`${d}-${i}`}
              className="text-center text-[10px] font-medium text-text-soft/80"
            >
              {d}
            </span>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-2.5">
          {cells.map((key, i) => {
            if (!key) {
              return <div key={`empty-${i}`} className="aspect-square min-h-[36px]" />;
            }
            const dayNum = parseDateKey(key).getDate();
            const intensity = getDayIntensity(state.habits, key);
            const isHovered = tooltip === key;
            const isToday = key === todayKey;

            return (
              <div
                key={key}
                className="relative aspect-square min-h-[36px]"
                onMouseEnter={() => setTooltip(key)}
                onMouseLeave={() => setTooltip(null)}
                onFocus={() => setTooltip(key)}
                onBlur={() => setTooltip(null)}
                tabIndex={0}
              >
                <div
                  className={cn(
                    "flex h-full w-full flex-col items-center justify-center rounded-xl border transition-all duration-300",
                    `heatmap-soft-${intensity}`,
                    isToday && !isHovered && "ring-1 ring-sage-200/50",
                    isHovered && "ring-1 ring-sage-200/40 bg-white/40"
                  )}
                >
                  <span className="text-[11px] font-medium tabular-nums text-text-soft/90">
                    {dayNum}
                  </span>
                </div>
                {isHovered && (
                  <div
                    role="tooltip"
                    className="absolute bottom-full left-1/2 z-20 mb-2 -translate-x-1/2 whitespace-nowrap rounded-xl bg-moss-900/85 px-3 py-2 text-[11px] text-white/95 shadow-lg pointer-events-none backdrop-blur-sm"
                  >
                    {getTooltipText(key)}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Card>
    </JournalSection>
  );
}
