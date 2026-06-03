import { cn } from "@/lib/cn";

type CardProps = {
  children: React.ReactNode;
  className?: string;
  variant?:
    | "default"
    | "elevated"
    | "dark"
    | "sage"
    | "featured"
    | "journal"
    | "accent";
};

const variants = {
  default:
    "bg-white shadow-[var(--shadow-soft)] border border-sage-200/70 card-hover",
  elevated:
    "bg-white shadow-[var(--shadow-card)] border border-sage-100/80 card-hover",
  dark: "bg-forest-900 text-white shadow-[var(--shadow-lifted)]",
  sage: "bg-sage-wash border border-sage-200/60 shadow-[var(--shadow-soft)] card-hover",
  featured:
    "bg-gradient-to-br from-white via-sage-50/80 to-sage-100/40 border-2 border-sage-200/80 shadow-[var(--shadow-card)] card-hover",
  journal:
    "bg-cream-card/90 border border-sage-200/50 shadow-[var(--shadow-soft)] accent-border-left card-hover",
  accent:
    "bg-white border-2 border-leaf-500/30 shadow-[var(--shadow-soft)] card-hover ring-1 ring-sage-100/50",
};

export function Card({
  children,
  className,
  variant = "default",
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-[2rem] p-6 sm:p-8 transition-all duration-300",
        variants[variant],
        className
      )}
    >
      {children}
    </div>
  );
}
