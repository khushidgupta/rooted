import { BottomNav } from "@/components/layout/bottom-nav";
import { Footer } from "@/components/layout/footer";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-garden-glow flex flex-col pb-32 sm:pb-28">
      <div className="mx-auto w-full max-w-lg px-5 pt-8 sm:px-6 sm:pt-10 flex-1">
        {children}
      </div>
      <Footer />
      <BottomNav />
    </div>
  );
}
