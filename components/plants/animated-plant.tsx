"use client";

import { PlantIllustration } from "@/components/plants/plant-illustration";
import { cn } from "@/lib/cn";
import type { PlantState, PlantType } from "@/lib/types";

type AnimatedPlantProps = {
  type: PlantType;
  state: PlantState;
  size?: "sm" | "md" | "lg" | "xl" | "hero";
  className?: string;
  animate?: boolean;
  celebrating?: boolean;
};

export function AnimatedPlant({
  type,
  state,
  size = "lg",
  className,
  animate = true,
  celebrating = false,
}: AnimatedPlantProps) {
  return (
    <div
      className={cn(
        animate && "plant-float plant-sway",
        celebrating && "plant-celebrate",
        "plant-state-transition inline-flex",
        className
      )}
      key={`${type}-${state}-${celebrating}`}
    >
      <PlantIllustration type={type} state={state} size={size} animated />
    </div>
  );
}
