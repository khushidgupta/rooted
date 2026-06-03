"use client";

import { Download, Share2 } from "lucide-react";
import { AnimatedPlant } from "@/components/plants/animated-plant";
import { Button } from "@/components/ui/button";
import { PLANT_STATE_COPY } from "@/lib/constants";
import {
  getBestWeekLabel,
  getDaysCheckedIn,
  getHabitsTendedCount,
  getMemoriesForMonth,
  getMostConsistentHabit,
  getPositiveWrappedSummary,
  getReadingMonthTotal,
} from "@/lib/stats";
import { formatMonthWrapped } from "@/lib/dates";
import { useRooted } from "@/context/rooted-context";

export function WrappedCard() {
  const { state, plantState } = useRooted();
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const monthLabel = formatMonthWrapped(now);
  const memories = getMemoriesForMonth(state.memories, year, month).length;
  const pages = getReadingMonthTotal(state.reading, year, month);
  const tended = getHabitsTendedCount(state.habits, year, month);
  const checkIns = getDaysCheckedIn(state, year, month);
  const bestHabit = getMostConsistentHabit(state.habits, year, month);
  const bestWeek = getBestWeekLabel(state.habits, year, month);
  const plantCopy = PLANT_STATE_COPY[plantState];

  const heroValue = memories > 0 ? memories : pages > 0 ? pages : tended > 0 ? tended : checkIns;
  const heroLabel =
    memories > 0
      ? memories === 1
        ? "Memory kept"
        : "Memories kept"
      : pages > 0
        ? "Pages read"
        : tended > 0
          ? "Habits tended"
          : "Days you showed up";

  const stats = [
    { label: "Memories", value: String(memories) },
    { label: "Pages read", value: String(pages) },
    { label: "Habits tended", value: String(tended) },
    { label: "Days checked in", value: String(checkIns) },
    { label: "Best companion", value: bestHabit?.name ?? "—" },
    { label: "Best week", value: bestWeek },
  ];

  return (
    <div className="space-y-6 wrapped-enter">
      <div className="relative overflow-hidden rounded-[2rem] bg-wrapped-gradient p-7 sm:p-10 text-white shadow-[var(--shadow-card)] ring-1 ring-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.1),transparent_55%)] pointer-events-none" />
        <div className="absolute -top-20 -right-20 w-48 h-48 rounded-full bg-white/[0.04] blur-2xl pointer-events-none" />

        <div className="relative flex justify-between items-start text-[10px] uppercase tracking-[0.22em] text-white/65 mb-10">
          <span className="font-medium">Rooted</span>
          <span>
            {monthLabel} {year}
          </span>
        </div>

        <div className="relative flex items-end justify-between gap-4 mb-10">
          <div className="flex-1 min-w-0">
            <p className="text-[11px] uppercase tracking-[0.2em] text-white/55 mb-2">
              {heroLabel}
            </p>
            <p className="font-serif text-6xl sm:text-8xl leading-none tracking-tight">
              {heroValue}
            </p>
          </div>
          <AnimatedPlant
            type={state.plantType}
            state={plantState}
            size="lg"
            className="opacity-95 shrink-0 -mr-2"
          />
        </div>

        <div className="relative grid grid-cols-2 sm:grid-cols-3 gap-2.5 mb-10">
          {stats.map(({ label, value }) => (
            <div
              key={label}
              className="rounded-2xl bg-white/[0.07] px-3.5 py-3 backdrop-blur-sm border border-white/[0.05]"
            >
              <p className="text-[8px] sm:text-[9px] uppercase tracking-[0.12em] text-white/45 mb-1">
                {label}
              </p>
              <p className="font-serif text-base sm:text-lg leading-snug truncate">
                {value}
              </p>
            </div>
          ))}
        </div>

        <p className="relative font-serif text-lg sm:text-xl italic text-white/92 leading-relaxed mb-10 border-l-2 border-white/15 pl-5">
          {getPositiveWrappedSummary(state, year, month)}
        </p>

        <div className="relative flex justify-between items-center text-[9px] uppercase tracking-[0.18em] text-white/40 pt-6 border-t border-white/10">
          <span>Plant · {plantCopy.label}</span>
          <span>rooted.app</span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-center px-2">
        <Button
          variant="ghost"
          className="gap-2 text-sm transition-transform hover:scale-[1.02]"
          onClick={() => {}}
          aria-label="Share (coming soon)"
        >
          <Share2 className="h-4 w-4" />
          Share your garden
        </Button>
        <Button
          variant="outline"
          className="gap-2 text-sm transition-transform hover:scale-[1.02]"
          onClick={() => {}}
          aria-label="Download as image (coming soon)"
        >
          <Download className="h-4 w-4" />
          Save as image
        </Button>
      </div>
      <p className="text-center text-[11px] text-text-soft px-4">
        Share what you celebrated — export coming soon.
      </p>
    </div>
  );
}
