"use client";

import {
  Calendar,
  Leaf,
  Sparkles,
  Sprout,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MarketingHeader } from "@/components/layout/marketing-header";
import { FooterWide } from "@/components/layout/footer";
import { PlantIllustration } from "@/components/plants/plant-illustration";
import { BotanicalAccent } from "@/components/decorations/botanical";
import { LANDING_FEATURES } from "@/lib/constants";

const featureIcons = {
  leaf: Leaf,
  sprout: Sprout,
  sparkles: Sparkles,
  calendar: Calendar,
  wrapped: Sparkles,
  users: Users,
};

export function LandingPage() {
  return (
    <div className="min-h-screen bg-cream flex flex-col page-enter relative overflow-hidden">
      <BotanicalAccent variant="corner-tl" className="absolute top-24 -left-12 w-48 h-48 opacity-50 pointer-events-none" />
      <BotanicalAccent variant="corner-br" className="absolute bottom-32 -right-8 w-40 h-40 opacity-40 pointer-events-none hidden lg:block" />
      <MarketingHeader />

      <section className="mx-auto max-w-6xl px-6 pb-24 pt-4 lg:px-10 lg:pt-12 lg:pb-32">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-sage-100/90 px-4 py-2.5 text-sm text-forest-800 mb-8 border border-sage-200/60">
              <Sparkles className="h-4 w-4 text-leaf-500" />
              A gentle space for personal growth
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-[3.25rem] leading-[1.12] text-forest-900 mb-6">
              Grow habits.
              <br />
              Capture memories.
              <br />
              <span className="italic font-normal text-leaf-500">
                Reflect on your life.
              </span>
            </h1>
            <p className="text-text-muted text-lg leading-relaxed max-w-lg mb-10">
              A digital garden for personal growth. Tend a plant companion as you
              build small, meaningful habits one quiet day at a time.
            </p>
            <div className="flex flex-wrap gap-4 mb-10">
              <Button href="/home" variant="primary">
                <Sprout className="h-4 w-4" />
                Start Growing
              </Button>
              <Button href="#features" variant="ghost">
                How it works
              </Button>
            </div>
            <div className="flex flex-wrap gap-6 text-sm text-text-soft">
              <span className="flex items-center gap-2">
                <span className="text-terracotta">☀</span> No streaks to lose
              </span>
              <span className="flex items-center gap-2">
                <span className="text-sage-500">🌱</span> Plants never wilt
              </span>
            </div>
          </div>

          <Card
            variant="featured"
            className="flex flex-col items-center text-center py-12 px-8 lg:py-16 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-leaf-400/5 to-transparent pointer-events-none" />
            <div className="relative plant-float plant-sway">
              <div className="absolute inset-0 m-auto w-40 h-40 bg-leaf-400/15 rounded-full blur-2xl plant-glow" />
              <PlantIllustration type="cactus" state="thriving" size="hero" animated />
            </div>
            <p className="font-serif text-2xl text-forest-900 mt-8 mb-1 relative">
              Your plant is thriving
            </p>
            <p className="text-text-muted text-sm relative">
              A 4-day streak of gentle care
            </p>
          </Card>
        </div>
      </section>

      <section
        id="features"
        className="mx-auto max-w-6xl px-6 pb-28 lg:px-10"
      >
        <div className="text-center mb-14 max-w-2xl mx-auto">
          <p
            id="garden"
            className="text-xs font-medium tracking-[0.2em] text-text-soft uppercase mb-3"
          >
            The garden
          </p>
          <h2 className="font-serif text-3xl text-moss-900">
            Everything grows in its own time
          </h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {LANDING_FEATURES.map((f) => {
            const Icon = featureIcons[f.icon];
            return (
              <Card
                key={f.title}
                className="bg-cream-card/70 border-sage-100/50 h-full flex flex-col"
              >
                <Icon
                  className="h-5 w-5 text-sage-500 mb-5"
                  strokeWidth={1.75}
                />
                <h3 className="font-serif text-xl text-moss-900 mb-2">
                  {f.title}
                </h3>
                <p className="text-sm text-text-muted leading-relaxed flex-1">
                  {f.description}
                </p>
              </Card>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-28 lg:px-10">
        <Card variant="dark" className="overflow-hidden">
          <div className="grid gap-12 lg:grid-cols-2 items-center p-2 lg:p-4">
            <div className="px-4 py-6 lg:px-8 lg:py-10">
              <h2 className="font-serif text-3xl sm:text-4xl leading-tight mb-4">
                Slow, kind progress.
                <br />
                <span className="italic font-normal opacity-90">
                  Like a garden in spring.
                </span>
              </h2>
              <p className="text-white/80 leading-relaxed mb-8 max-w-md">
                Rooted is not about doing more. It is about noticing what matters,
                tending small rituals, and watching something beautiful grow
                alongside you.
              </p>
              <Button href="/home" variant="secondary">
                Start your garden
              </Button>
            </div>
            <div className="flex justify-center gap-5 pb-8 lg:pb-0 lg:justify-end lg:pr-8">
              <PlantIllustration type="cactus" state="thriving" size="md" animated />
              <PlantIllustration
                type="succulent"
                state="healthy"
                size="md"
                className="-mt-4"
                animated
              />
              <PlantIllustration type="pothos" state="thriving" size="md" animated />
            </div>
          </div>
        </Card>
      </section>

      <FooterWide />
    </div>
  );
}
