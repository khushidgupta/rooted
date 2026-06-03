"use client";

import { cn } from "@/lib/cn";

type JournalChartProps = {
  data: number[];
  max?: number;
  height?: number;
  className?: string;
  barClassName?: string;
  type?: "bars" | "line";
};

export function JournalChart({
  data,
  max = 100,
  height = 64,
  className,
  barClassName = "fill-sage-200/80",
  type = "bars",
}: JournalChartProps) {
  if (data.length === 0) return null;
  const width = 100;
  const step = width / data.length;

  if (type === "line") {
    const points = data
      .map((v, i) => {
        const x = i * step + step / 2;
        const y = height - (Math.min(v, max) / max) * (height - 8) - 4;
        return `${x},${y}`;
      })
      .join(" ");
    return (
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className={cn("w-full h-16", className)}
        preserveAspectRatio="none"
        aria-hidden
      >
        <polyline
          points={points}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-sage-400/70"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={cn("w-full h-16", className)}
      preserveAspectRatio="none"
      aria-hidden
    >
      {data.map((v, i) => {
        const barH = (Math.min(v, max) / max) * (height - 6);
        const x = i * step + step * 0.2;
        const w = step * 0.6;
        return (
          <rect
            key={i}
            x={x}
            y={height - barH}
            width={w}
            height={Math.max(barH, 2)}
            rx={2}
            className={barClassName}
          />
        );
      })}
    </svg>
  );
}

type MoodDotChartProps = {
  moods: (import("@/lib/types").MoodType | null)[];
  className?: string;
};

const moodColors: Record<string, string> = {
  great: "var(--mood-great)",
  good: "var(--mood-good)",
  okay: "var(--mood-okay)",
  low: "var(--mood-low)",
};

export function MoodDotChart({ moods, className }: MoodDotChartProps) {
  const width = 100;
  const height = 48;
  const step = width / moods.length;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={cn("w-full h-12", className)}
      preserveAspectRatio="none"
      aria-hidden
    >
      {moods.map((mood, i) => {
        if (!mood) return null;
        const cx = i * step + step / 2;
        return (
          <circle
            key={i}
            cx={cx}
            cy={height / 2}
            r={3}
            fill={moodColors[mood]}
            stroke="rgba(62, 86, 65, 0.08)"
            strokeWidth={0.5}
          />
        );
      })}
      {/* Connect with soft line for days with mood */}
      <polyline
        points={moods
          .map((m, i) => {
            if (!m) return null;
            const cx = i * step + step / 2;
            const values = { great: 12, good: 20, okay: 28, low: 36 };
            return `${cx},${values[m]}`;
          })
          .filter(Boolean)
          .join(" ")}
        fill="none"
        stroke="rgba(139, 168, 136, 0.35)"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
