import { formatMonthWrapped } from "@/lib/dates";
import { WrappedCard } from "@/components/wrapped/wrapped-card";

export default function WrappedPage() {
  const month = formatMonthWrapped();
  return (
    <main className="pb-4 page-enter">
      <header className="text-center mb-10">
        <p className="text-xs font-medium tracking-[0.2em] text-text-soft uppercase mb-2">
          Your month in the garden
        </p>
        <h1 className="font-serif text-3xl sm:text-4xl text-moss-900">
          {month} Wrapped
        </h1>
        <p className="text-sm text-text-muted mt-3 max-w-xs mx-auto">
          Celebrate what you noticed, remembered, and tended.
        </p>
      </header>
      <WrappedCard />
    </main>
  );
}
