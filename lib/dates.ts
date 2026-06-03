export function toDateKey(date: Date = new Date()): string {
  return date.toISOString().slice(0, 10);
}

export function formatGreetingDate(date: Date = new Date()): string {
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  }).toUpperCase();
}

export function formatMonthYear(date: Date = new Date()): string {
  return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

export function formatMonthWrapped(date: Date = new Date()): string {
  return date.toLocaleDateString("en-US", { month: "long" });
}

export function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

export function getMonthDates(year: number, month: number): string[] {
  const days = getDaysInMonth(year, month);
  return Array.from({ length: days }, (_, i) => {
    const d = new Date(year, month, i + 1);
    return toDateKey(d);
  });
}

export function parseDateKey(key: string): Date {
  const [y, m, d] = key.split("-").map(Number);
  return new Date(y, m - 1, d);
}

export function isSameMonth(key: string, year: number, month: number): boolean {
  const d = parseDateKey(key);
  return d.getFullYear() === year && d.getMonth() === month;
}
