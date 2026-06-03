import { ComingSoon } from "@/components/coming-soon";

export default function CommunityPage() {
  return (
    <ComingSoon
      eyebrow="Community Challenges"
      title="Coming Soon 🌿"
      description="Join community challenges and unlock seasonal rewards for your garden."
      ctaLabel="Notify me when it blooms"
      plants={["cactus"]}
    />
  );
}
