"use client";

import { useEffect, useState } from "react";
import { BookOpen } from "lucide-react";
import { Card } from "@/components/ui/card";
import { JournalChart } from "@/components/ui/journal-chart";
import { JournalSection } from "@/components/dashboard/journal-section";
import {
  getReadingMonthTotal,
  getReadingStreak,
  getReadingTrend,
} from "@/lib/stats";
import { useRooted } from "@/context/rooted-context";

export function ReadingTracker() {
  const { state, setReadingPages, getTodayReading } = useRooted();
  const [pages, setPages] = useState("");
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const monthTotal = getReadingMonthTotal(state.reading, year, month);
  const streak = getReadingStreak(state.reading);
  const trend = getReadingTrend(state.reading, year, month);
  const todayReading = getTodayReading();
  const maxPages = Math.max(...trend, 20, 1);
  const daysRead = trend.filter((p) => p > 0).length;

  useEffect(() => {
    setPages(todayReading > 0 ? String(todayReading) : "");
  }, [todayReading]);

  function handleBlur() {
    const n = parseInt(pages, 10);
    if (!isNaN(n)) setReadingPages(n);
  }

  return (
    <JournalSection
      title="Reading"
      subtitle="Pages as quiet companions — tracked with care, not competition."
    >
      <Card variant="accent" className="relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-leaf-400/10 rounded-full blur-xl pointer-events-none" />
        <div className="grid grid-cols-3 gap-4 mb-8 pb-6 border-b border-sage-50">
          <div className="text-center">
            <p className="font-serif text-3xl text-moss-900">{monthTotal}</p>
            <p className="text-[10px] uppercase tracking-wider text-text-soft mt-1">
              Pages this month
            </p>
          </div>
          <div className="text-center border-x border-sage-50">
            <p className="font-serif text-3xl text-moss-900">{streak}</p>
            <p className="text-[10px] uppercase tracking-wider text-text-soft mt-1">
              Day streak
            </p>
          </div>
          <div className="text-center">
            <p className="font-serif text-3xl text-moss-900">{daysRead}</p>
            <p className="text-[10px] uppercase tracking-wider text-text-soft mt-1">
              Reading days
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4 mb-6">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sage-50">
            <BookOpen className="h-5 w-5 text-sage-500" strokeWidth={1.75} />
          </div>
          <div className="flex-1">
            <label className="text-xs text-text-soft block mb-2">
              Pages read today
            </label>
            <input
              type="number"
              min={0}
              value={pages}
              onChange={(e) => setPages(e.target.value)}
              onBlur={handleBlur}
              placeholder="0"
              className="w-full max-w-[120px] rounded-xl border border-sage-100 bg-white/80 px-3 py-2 text-sm font-serif text-moss-900 focus:outline-none focus:ring-2 focus:ring-sage-200/80 transition-shadow"
            />
          </div>
        </div>

        <p className="text-xs text-text-soft mb-2">Reading rhythm</p>
        <div className="rounded-2xl bg-gradient-to-b from-white/50 to-sage-50/20 p-3">
          <JournalChart data={trend} max={maxPages} type="line" />
        </div>
      </Card>
    </JournalSection>
  );
}
