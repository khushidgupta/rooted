import { Sprout, Leaf, Heart, BookOpen, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Logo } from "@/components/layout/logo";
import { FooterWide } from "@/components/layout/footer";
import { AnimatedPlant } from "@/components/plants/animated-plant";

const sections = [
  {
    icon: Leaf,
    title: "Our Philosophy",
    body: "Rooted is built on the belief that personal growth should feel gentle — not gamified, not guilt-driven, not optimized. Like tending a real garden, progress happens in quiet moments, not loud milestones.",
  },
  {
    icon: Sprout,
    title: "Why Plants?",
    body: "Plants never punish you for being away. They rest, recover, and welcome you back. Your digital companion reflects your care without wilting, dying, or creating shame. It grows alongside you.",
  },
  {
    icon: Heart,
    title: "Memories Matter",
    body: "Inspired by reflective journaling — especially the thoughtful systems of Dominic Hartt — Rooted asks you to pause and notice one moment worth remembering each day. These become the story of your month.",
  },
  {
    icon: Sun,
    title: "Progress Without Pressure",
    body: "No red warnings. No broken streaks. No leaderboards. Rooted celebrates what you did — memories captured, pages read, habits tended — not what you missed.",
  },
  {
    icon: BookOpen,
    title: "A Digital Garden for Life",
    body: "Rooted is a calm space to grow habits, track mood, read more, and reflect on your life. It is a journal spread, not a dashboard. A companion, not a task manager.",
  },
];

export function AboutPage() {
  return (
    <div className="min-h-screen bg-cream flex flex-col">
      <header className="mx-auto w-full max-w-3xl px-6 py-6 sm:px-8">
        <div className="flex items-center justify-between gap-6">
          <Logo />
          <Button href="/home" variant="primary" className="shrink-0 text-sm py-2.5 px-5">
            Open app
          </Button>
        </div>
      </header>

      <main className="flex-1 mx-auto w-full max-w-3xl px-6 sm:px-8 pb-16 page-enter">
        <div className="text-center mb-14">
          <p className="text-xs font-medium tracking-[0.2em] text-text-soft uppercase mb-3">
            The story behind Rooted
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl text-moss-900 leading-tight mb-6">
            A digital garden for{" "}
            <span className="italic font-normal">gentle growth</span>
          </h1>
          <p className="text-text-muted text-lg leading-relaxed max-w-xl mx-auto">
            Rooted exists because life is not a productivity sprint. It is a
            garden — tended slowly, season by season, with patience and care.
          </p>
        </div>

        <div className="flex justify-center mb-16">
          <Card variant="elevated" className="py-10 px-8 text-center">
            <AnimatedPlant type="monstera" state="thriving" size="xl" />
            <p className="font-serif text-xl text-moss-900 mt-6 italic">
              You can always come back.
            </p>
          </Card>
        </div>

        <div className="space-y-10">
          {sections.map(({ icon: Icon, title, body }) => (
            <Card
              key={title}
              className="card-hover bg-cream-card/40 border-sage-100/50"
            >
              <Icon
                className="h-5 w-5 text-sage-500 mb-4"
                strokeWidth={1.75}
              />
              <h2 className="font-serif text-2xl text-moss-900 mb-3">{title}</h2>
              <p className="text-text-muted leading-relaxed">{body}</p>
            </Card>
          ))}
        </div>

        <div className="text-center mt-16">
          <p className="text-text-muted mb-6">
            Ready to tend your garden?
          </p>
          <Button href="/home" variant="primary">
            Start Growing
          </Button>
        </div>
      </main>

      <FooterWide />
    </div>
  );
}
