import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/layout/logo";

export function MarketingHeader() {
  return (
    <header className="mx-auto w-full max-w-6xl px-6 py-6 lg:px-10 lg:py-8">
      <div className="flex items-center justify-between gap-6 lg:gap-10">
        <Logo />

        <div className="flex items-center gap-8 lg:gap-12 min-w-0">
          <nav
            className="hidden md:flex items-center gap-10 lg:gap-12 text-sm text-text-muted"
            aria-label="Primary"
          >
            <a
              href="#features"
              className="whitespace-nowrap hover:text-moss-800 transition-colors"
            >
              Features
            </a>
            <Link
              href="/about"
              className="whitespace-nowrap hover:text-moss-800 transition-colors"
            >
              About
            </Link>
          </nav>

          <Button
            href="/home"
            variant="primary"
            className="shrink-0 text-sm py-2.5 px-5 md:ml-2 lg:ml-4"
          >
            Open app
          </Button>
        </div>
      </div>
    </header>
  );
}
