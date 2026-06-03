"use client";

import { Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import { parseDateKey } from "@/lib/dates";
import {
  getMonthMemoryHighlights,
  getRecentMemories,
} from "@/lib/stats";
import { useRooted } from "@/context/rooted-context";

function formatMemoryDate(key: string): string {
  const d = parseDateKey(key);
  return d.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

export function MemoryTimeline() {
  const { state } = useRooted();
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const recent = getRecentMemories(state.memories, 5);
  const highlights = getMonthMemoryHighlights(state.memories, year, month, 3);

  if (state.memories.length === 0) return null;

  return (
    <section className="mb-8 space-y-6">
      {highlights.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="h-4 w-4 text-terracotta/80" strokeWidth={1.75} />
            <h2 className="font-serif text-2xl text-moss-900">
              This month&apos;s highlights
            </h2>
          </div>
          <div className="space-y-3">
            {highlights.map((m) => (
              <Card
                key={m.date}
                className="card-hover bg-cream-card/50 border-sage-100/50 py-5"
              >
                <p className="text-[10px] uppercase tracking-[0.15em] text-text-soft mb-2">
                  {formatMemoryDate(m.date)}
                </p>
                <p className="font-serif text-lg text-moss-800 leading-relaxed italic">
                  &ldquo;{m.text}&rdquo;
                </p>
              </Card>
            ))}
          </div>
        </div>
      )}

      {recent.length > 0 && (
        <div>
          <h2 className="font-serif text-xl text-moss-900 mb-4">
            Memory timeline
          </h2>
          <div className="relative pl-6 border-l border-sage-200/80 space-y-6">
            {recent.map((m) => (
              <div key={m.date} className="relative">
                <span className="absolute -left-[1.65rem] top-1.5 h-2.5 w-2.5 rounded-full bg-sage-300/80 ring-4 ring-cream" />
                <p className="text-[10px] uppercase tracking-wider text-text-soft mb-1">
                  {formatMemoryDate(m.date)}
                </p>
                <p className="text-sm text-text-muted leading-relaxed">
                  {m.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
