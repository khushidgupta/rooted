"use client";

import { Card } from "@/components/ui/card";
import { BotanicalAccent } from "@/components/decorations/botanical";
import { getJournalReflectionSummary } from "@/lib/stats";
import { formatMonthYear } from "@/lib/dates";
import { useRooted } from "@/context/rooted-context";

export function ReflectionSummary() {
  const { state } = useRooted();
  const now = new Date();
  const summary = getJournalReflectionSummary(
    state,
    now.getFullYear(),
    now.getMonth()
  );

  const sentences = summary.match(/[^.!?]+[.!?]+/g) ?? [summary];
  const lead = sentences[0]?.trim() ?? summary;
  const rest = sentences.slice(1).join(" ").trim();

  return (
    <div className="relative mb-12">
      <BotanicalAccent
        variant="cluster"
        className="absolute -top-6 -right-4 w-24 h-24 opacity-70 hidden sm:block"
      />
      <Card variant="journal" className="py-12 sm:py-14 px-8 sm:px-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-leaf-400/10 rounded-full blur-2xl pointer-events-none" />
        <p className="text-[10px] uppercase tracking-[0.3em] text-leaf-500 font-medium mb-5">
          {formatMonthYear()} · Monthly note
        </p>
        <p className="font-serif text-3xl sm:text-[2.35rem] leading-[1.25] text-forest-900 italic mb-8 max-w-lg">
          &ldquo;{lead}&rdquo;
        </p>
        {rest && (
          <p className="text-text-muted leading-[1.75] text-base max-w-prose border-t border-sage-200/60 pt-6">
            {rest}
          </p>
        )}
      </Card>
    </div>
  );
}
