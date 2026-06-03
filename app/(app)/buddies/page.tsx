import { ComingSoon } from "@/components/coming-soon";

export default function BuddiesPage() {
  return (
    <ComingSoon
      eyebrow="Plant Buddies"
      title="Coming Soon 🌱"
      description="Grow alongside friends, share progress, and encourage one another through shared gardens."
      ctaLabel="Notify me when it sprouts"
      plants={["cactus", "succulent", "pothos"]}
    />
  );
}
