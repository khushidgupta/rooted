import Link from "next/link";
import { cn } from "@/lib/cn";

type ButtonProps = {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "ghost" | "outline";
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
};

const variants = {
  primary:
    "bg-forest-800 text-white hover:bg-forest-900 hover:scale-[1.02] active:scale-[0.98] shadow-[0_4px_14px_-2px_rgba(30,56,34,0.35)]",
  secondary:
    "bg-white text-forest-800 hover:bg-sage-50 border border-sage-300 hover:scale-[1.02] active:scale-[0.98] shadow-sm",
  ghost:
    "bg-white/70 text-forest-800 hover:bg-sage-50 border border-sage-300 hover:border-leaf-500/40 hover:scale-[1.01]",
  outline:
    "bg-transparent text-text-muted border border-sage-300 hover:border-leaf-500/50 hover:bg-sage-50/80",
};

export function Button({
  children,
  className,
  variant = "primary",
  href,
  onClick,
  type = "button",
  disabled,
}: ButtonProps) {
  const base = cn(
    "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-all duration-300",
    variants[variant],
    disabled && "opacity-50 pointer-events-none",
    className
  );

  if (href) {
    return (
      <Link href={href} className={base}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={base}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
