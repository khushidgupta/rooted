"use client";

import { Card } from "@/components/ui/card";
import { AnimatedPlant } from "@/components/plants/animated-plant";
import { PlantSelector } from "@/components/plants/plant-selector";
import { BotanicalAccent, GardenCanvas } from "@/components/decorations/botanical";
import { PLANT_STATE_COPY } from "@/lib/constants";
import { cn } from "@/lib/cn";
import { useRooted } from "@/context/rooted-context";

type PlantCompanionCardProps = {
  celebrating?: boolean;
};

export function PlantCompanionCard({ celebrating = false }: PlantCompanionCardProps) {
  const { state, plantState, setPlantType } = useRooted();
  const copy = PLANT_STATE_COPY[plantState];

  return (
    <Card variant="featured" className="mb-8 text-center overflow-hidden relative py-0 px-0">
      <BotanicalAccent
        variant="corner-tl"
        className="absolute -top-4 -left-4 w-32 h-32 opacity-60"
      />
      <BotanicalAccent
        variant="corner-br"
        className="absolute -bottom-6 -right-6 w-36 h-36 opacity-50"
      />

      <GardenCanvas className="px-4 sm:px-8 pt-8 pb-4">
        <div
          className={cn(
            "relative flex justify-center items-center min-h-[300px] sm:min-h-[360px]",
            celebrating && "plant-celebrate"
          )}
        >
          {/* Glow behind plant */}
          <div
            className={cn(
              "absolute w-48 h-48 sm:w-56 sm:h-56 rounded-full bg-leaf-400/20 blur-2xl plant-glow",
              celebrating && "bg-leaf-400/35"
            )}
          />
          {celebrating && (
            <>
              <span className="sparkle-particle absolute top-8 left-1/4 text-leaf-500 text-lg">✦</span>
              <span className="sparkle-particle absolute top-12 right-1/4 text-sage-500 text-sm animation-delay-100">✦</span>
              <span className="sparkle-particle absolute top-16 left-1/3 text-leaf-400 text-xs">·</span>
            </>
          )}
          <AnimatedPlant
            type={state.plantType}
            state={plantState}
            size="hero"
            celebrating={celebrating}
            className="relative z-10"
          />
        </div>
      </GardenCanvas>

      <div className="px-6 sm:px-8 pb-8 pt-2">
        <h2
          className="font-serif text-3xl sm:text-[2.5rem] text-forest-900 mb-2 transition-all duration-500"
          key={plantState}
        >
          {copy.label}
        </h2>
        <p className="text-text-muted text-sm max-w-sm mx-auto mb-8 leading-relaxed">
          {copy.message}
        </p>
        <PlantSelector value={state.plantType} onChange={setPlantType} />
      </div>
    </Card>
  );
}
