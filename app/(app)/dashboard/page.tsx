import { formatMonthYear } from "@/lib/dates";
import { ReflectionSummary } from "@/components/dashboard/reflection-summary";
import { MoodTracker } from "@/components/dashboard/mood-tracker";
import { ReadingTracker } from "@/components/dashboard/reading-tracker";
import { GentleStreak } from "@/components/dashboard/gentle-streak";
import { CompletionTrends } from "@/components/dashboard/completion-trends";
import { HabitCalendar } from "@/components/dashboard/habit-calendar";
import { MonthlyHighlights } from "@/components/dashboard/monthly-highlights";
import { BotanicalAccent } from "@/components/decorations/botanical";

export default function DashboardPage() {
  return (
    <main className="pb-4 page-enter relative">
      <BotanicalAccent
        variant="corner-tl"
        className="fixed top-20 -left-8 w-28 h-28 opacity-40 pointer-events-none hidden sm:block"
      />
      <BotanicalAccent
        variant="corner-br"
        className="fixed bottom-40 -right-6 w-32 h-32 opacity-35 pointer-events-none hidden sm:block"
      />

      <header className="text-center mb-12 pt-2">
        <p className="text-xs font-semibold tracking-[0.25em] text-leaf-500 uppercase mb-3">
          Monthly journal
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl text-forest-900 leading-tight">
          {formatMonthYear()}
        </h1>
        <div className="w-12 h-0.5 bg-leaf-500/50 mx-auto mt-5 mb-4" />
        <p className="text-sm text-text-muted max-w-md mx-auto leading-relaxed">
          A spread for your month — how you felt, what you read, and what you
          tended along the way.
        </p>
      </header>

      <ReflectionSummary />

      <div className="space-y-2">
        <MoodTracker />
        <ReadingTracker />
        <GentleStreak />
        <CompletionTrends />
        <HabitCalendar />
        <MonthlyHighlights />
      </div>
    </main>
  );
}
