"use client";

"use client";

import { useState } from "react";
import { Greeting } from "@/components/home/greeting";
import { PlantCompanionCard } from "@/components/home/plant-companion-card";
import { HabitList } from "@/components/home/habit-list";
import { MemorableMoment } from "@/components/home/memorable-moment";
import { MemoryTimeline } from "@/components/home/memory-timeline";

export default function HomePage() {
  const [celebrating, setCelebrating] = useState(false);

  function handleHabitTended() {
    setCelebrating(true);
    setTimeout(() => setCelebrating(false), 1200);
  }

  return (
    <main className="page-enter">
      <Greeting />
      <PlantCompanionCard celebrating={celebrating} />
      <HabitList onHabitTended={handleHabitTended} />
      <MemorableMoment />
      <MemoryTimeline />
    </main>
  );
}
