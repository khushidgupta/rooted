"use client";

import { useEffect, useState } from "react";
import { PenLine } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatGreetingDate } from "@/lib/dates";
import { cn } from "@/lib/cn";
import { useRooted } from "@/context/rooted-context";

export function MemorableMoment() {
  const { saveMemory, getTodayMemory } = useRooted();
  const existing = getTodayMemory();
  const [text, setText] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (existing) {
      setText(existing.text);
      setSaved(true);
    }
  }, [existing]);

  function handleSave() {
    saveMemory(text);
    setSaved(true);
  }

  return (
      <Card variant="journal" className="mb-8 overflow-hidden">
      <div className="border-b border-sage-50 px-1 pb-5 mb-5">
        <div className="flex items-center gap-2 mb-2">
          <PenLine className="h-4 w-4 text-terracotta/80" strokeWidth={1.75} />
          <p className="text-[10px] uppercase tracking-[0.18em] text-text-soft">
            Evening reflection
          </p>
        </div>
        <h2 className="font-serif text-2xl text-moss-900">
          A moment worth remembering
        </h2>
        <p className="text-xs text-text-soft mt-2">
          {formatGreetingDate().toLowerCase()}
        </p>
      </div>

      <p className="font-serif italic text-text-muted text-[15px] mb-4 leading-relaxed">
        What was worth remembering today?
      </p>

      <div
        className={cn(
          "rounded-2xl border border-sage-100/80 bg-cream/30 journal-lines mb-5 transition-colors",
          saved && "border-sage-200/60 bg-sage-50/20"
        )}
      >
        <textarea
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            setSaved(false);
          }}
          placeholder="Had coffee with a friend after class. The light through the window was golden..."
          rows={5}
          className="w-full bg-transparent px-4 py-4 text-sm leading-[28px] placeholder:text-text-soft/70 placeholder:italic focus:outline-none resize-none font-serif text-moss-900/90"
        />
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <p className="text-xs text-text-soft leading-relaxed max-w-[200px]">
          One line in your journal. Kept for when you look back.
        </p>
        <Button
          variant="primary"
          onClick={handleSave}
          disabled={!text.trim()}
          className={cn(
            "py-2.5 px-6 text-sm shrink-0 transition-all",
            saved && "bg-sage-600"
          )}
        >
          {saved ? "Kept for later" : "Save to journal"}
        </Button>
      </div>
    </Card>
  );
}
