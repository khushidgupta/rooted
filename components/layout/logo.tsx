import Link from "next/link";
import { Sprout } from "lucide-react";
import { cn } from "@/lib/cn";

type LogoProps = {
  className?: string;
  href?: string;
};

export function Logo({ className, href = "/" }: LogoProps) {
  return (
    <Link
      href={href}
      className={cn("inline-flex items-center gap-2.5 shrink-0 group", className)}
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sage-100 text-moss-800 transition-colors group-hover:bg-sage-200">
        <Sprout className="h-5 w-5" strokeWidth={2} />
      </span>
      <span className="font-serif text-xl font-semibold text-moss-900 tracking-tight whitespace-nowrap">
        Rooted
      </span>
    </Link>
  );
}
