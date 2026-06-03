"use client";

import { Card } from "@/components/ui/card";
import { MoodDotChart } from "@/components/ui/journal-chart";
import { JournalSection } from "@/components/dashboard/journal-section";
import { MOOD_OPTIONS } from "@/lib/constants";
import { getMoodTrend } from "@/lib/stats";
import { cn } from "@/lib/cn";
import { useRooted } from "@/context/rooted-context";
import type { MoodType } from "@/lib/types";

const moodBg: Record<MoodType, string> = {
  great: "bg-[var(--mood-great)]",
  good: "bg-[var(--mood-good)]",
  okay: "bg-[var(--mood-okay)]",
  low: "bg-[var(--mood-low)]",
};

export function MoodTracker() {
  const { setMood, getTodayMood, state } = useRooted();
  const todayMood = getTodayMood();
  const now = new Date();
  const trend = getMoodTrend(state.moods, now.getFullYear(), now.getMonth());
  const logged = trend.filter(Boolean).length;

  return (
    <JournalSection
      title="How you've been feeling"
      subtitle="A watercolor of your month — each dot a moment of noticing."
    >
      <Card className="mb-4 bg-gradient-to-br from-sage-50/90 to-white border-sage-200/70">
        <p className="text-xs text-text-soft mb-4">Today&apos;s check-in</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {MOOD_OPTIONS.map(({ value, emoji, label }) => (
            <button
              key={value}
              type="button"
              onClick={() => setMood(value)}
              className={cn(
                "flex flex-col items-center gap-1.5 rounded-2xl px-3 py-4 text-sm transition-all duration-300",
                todayMood === value
                  ? "bg-forest-800 text-white ring-2 ring-leaf-500/30 scale-[1.03] shadow-md"
                  : "bg-white/80 hover:bg-sage-100/90 text-text-muted hover:scale-[1.01] border border-sage-200/50",
              )}
            >
              <span className="text-2xl">{emoji}</span>
              <span className="text-xs">{label}</span>
            </button>
          ))}
        </div>
      </Card>
      <Card className="overflow-hidden">
        <div className="flex justify-between items-baseline mb-4">
          <p className="text-xs text-text-soft">Mood through the month</p>
          <p className="text-xs text-text-soft">{logged} days logged</p>
        </div>
        <div className="rounded-2xl bg-gradient-to-b from-cream/80 to-sage-50/30 p-4 mb-3">
          <MoodDotChart moods={trend} />
        </div>
        <div className="flex justify-between gap-2 px-1">
          {MOOD_OPTIONS.map(({ value, emoji, label }) => (
            <div key={value} className="flex items-center gap-1 text-[10px] text-text-soft">
              <span className={cn("h-2 w-2 rounded-full", moodBg[value])} />
              <span className="hidden sm:inline">{label}</span>
              <span className="sm:hidden">{emoji}</span>
            </div>
          ))}
        </div>
      </Card>
    </JournalSection>
  );
}
