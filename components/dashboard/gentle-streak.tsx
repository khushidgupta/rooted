"use client";

import { Card } from "@/components/ui/card";
import { JournalSection } from "@/components/dashboard/journal-section";
import {
  getCompletionPercentForDate,
  getCurrentStreak,
  getLongestStreak,
} from "@/lib/stats";
import { toDateKey } from "@/lib/dates";
import { cn } from "@/lib/cn";
import { useRooted } from "@/context/rooted-context";

export function GentleStreak() {
  const { state } = useRooted();
  const current = getCurrentStreak(state.habits);
  const longest = getLongestStreak(state.habits);

  const last14 = Array.from({ length: 14 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (13 - i));
    return toDateKey(d);
  });

  return (
    <JournalSection
      title="Gentle consistency"
      subtitle="Small circles for recent days — no pressure to be perfect."
    >
      <Card>
        <div className="flex gap-8 mb-6">
          <div>
            <p className="text-[10px] uppercase tracking-wider text-text-soft">
              Current
            </p>
            <p className="font-serif text-2xl text-moss-900">
              {current} <span className="text-base font-sans text-text-muted">days</span>
            </p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wider text-text-soft">
              Longest
            </p>
            <p className="font-serif text-2xl text-moss-900">
              {longest} <span className="text-base font-sans text-text-muted">days</span>
            </p>
          </div>
        </div>
        <div className="flex justify-between gap-1">
          {last14.map((key) => {
            const pct = getCompletionPercentForDate(state.habits, key);
            const isToday = key === toDateKey();
            return (
              <div
                key={key}
                className="flex flex-col items-center gap-1.5 flex-1"
                title={`${key}: ${pct}% tended`}
              >
                <div
                  className={cn(
                    "h-2 w-full max-w-[18px] rounded-full transition-colors",
                    pct >= 100
                      ? "bg-sage-300/60"
                      : pct > 0
                        ? "bg-sage-100"
                        : "bg-sage-50",
                    isToday && "ring-1 ring-sage-300/50"
                  )}
                />
              </div>
            );
          })}
        </div>
      </Card>
    </JournalSection>
  );
}
