"use client";

import { PLANT_LABELS } from "@/lib/constants";
import { cn } from "@/lib/cn";
import type { PlantType } from "@/lib/types";

const PLANT_TYPES: PlantType[] = [
  "monstera",
  "pothos",
  "succulent",
  "cactus",
  "calla",
  "sunflower",
  "gladiolus",
];

type PlantSelectorProps = {
  value: PlantType;
  onChange: (type: PlantType) => void;
};

export function PlantSelector({ value, onChange }: PlantSelectorProps) {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {PLANT_TYPES.map((type) => (
        <button
          key={type}
          type="button"
          onClick={() => onChange(type)}
          className={cn(
            "rounded-full px-4 py-2.5 text-sm font-medium transition-all duration-300",
            value === type
              ? "bg-forest-800 text-white shadow-[0_2px_10px_-2px_rgba(30,56,34,0.4)] scale-[1.02]"
              : "bg-sage-100/80 text-text-muted hover:bg-sage-200/80 hover:text-forest-800"
          )}
        >
          {PLANT_LABELS[type]}
        </button>
      ))}
    </div>
  );
}
