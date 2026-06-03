"use client";

import { Button } from "@/components/ui/button";
import { PlantIllustration } from "@/components/plants/plant-illustration";
import type { PlantType } from "@/lib/types";

type ComingSoonProps = {
  eyebrow: string;
  title: string;
  description: string;
  ctaLabel: string;
  plants?: PlantType[];
};

export function ComingSoon({
  eyebrow,
  title,
  description,
  ctaLabel,
  plants = ["cactus", "succulent", "pothos"],
}: ComingSoonProps) {
  return (
    <div className="flex flex-col items-center text-center px-6 py-12">
      <div className="flex items-end justify-center gap-4 mb-10">
        {plants.map((type, i) => (
          <PlantIllustration
            key={type}
            type={type}
            state="thriving"
            size={i === 1 ? "md" : "sm"}
            className={i !== 1 ? "opacity-90" : ""}
          />
        ))}
      </div>
      <p className="text-xs font-medium tracking-[0.2em] text-text-soft uppercase mb-3">
        {eyebrow}
      </p>
      <h1 className="font-serif text-3xl sm:text-4xl text-moss-900 mb-4">
        {title}
      </h1>
      <p className="text-text-muted max-w-md leading-relaxed mb-8">
        {description}
      </p>
      <Button variant="outline" onClick={() => {}}>
        {ctaLabel}
      </Button>
    </div>
  );
}
