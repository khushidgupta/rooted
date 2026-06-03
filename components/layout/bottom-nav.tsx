"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  LayoutGrid,
  Sparkles,
  Leaf,
  Users,
} from "lucide-react";
import { cn } from "@/lib/cn";

const tabs = [
  { href: "/home", label: "Home", icon: Home },
  { href: "/dashboard", label: "Dashboard", icon: LayoutGrid },
  { href: "/wrapped", label: "Wrapped", icon: Sparkles },
  { href: "/buddies", label: "Buddies", icon: Leaf },
  { href: "/community", label: "Community", icon: Users },
] as const;

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-5 sm:bottom-6 left-1/2 z-50 -translate-x-1/2 w-[calc(100%-2rem)] max-w-md sm:w-auto"
      aria-label="Main navigation"
    >
      <div className="flex items-center justify-between sm:justify-center gap-0.5 sm:gap-1 rounded-full border border-sage-200/90 bg-white/98 px-2 sm:px-3 py-2 shadow-[var(--shadow-lifted)]">
        {tabs.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex flex-col items-center gap-0.5 rounded-full px-3 py-2 min-w-[3.5rem] transition-all duration-300",
                active ? "text-forest-800" : "text-text-soft hover:text-leaf-500"
              )}
            >
              <span
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-full transition-all duration-300",
                  active && "bg-sage-200/80 shadow-sm"
                )}
              >
                <Icon
                  className={cn("h-5 w-5", active && "stroke-[2.25px] text-leaf-500")}
                  strokeWidth={active ? 2.25 : 1.75}
                />
              </span>
              <span className="text-[10px] font-medium tracking-wide">
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
