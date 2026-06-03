import { cn } from "@/lib/cn";

type BotanicalProps = {
  className?: string;
  variant?: "corner-tl" | "corner-br" | "corner-tr" | "side" | "cluster";
  opacity?: number;
};

/** Watercolor-style botanical SVG accents */
export function BotanicalAccent({
  className,
  variant = "corner-tl",
  opacity = 0.45,
}: BotanicalProps) {
  if (variant === "cluster") {
    return (
      <svg
        viewBox="0 0 120 120"
        className={cn("pointer-events-none select-none", className)}
        aria-hidden
      >
        <ellipse cx="30" cy="70" rx="28" ry="18" fill="#6b9e72" opacity={opacity * 0.5} transform="rotate(-35 30 70)" />
        <ellipse cx="55" cy="45" rx="22" ry="14" fill="#4d8054" opacity={opacity * 0.6} transform="rotate(-15 55 45)" />
        <ellipse cx="80" cy="65" rx="26" ry="16" fill="#7cb883" opacity={opacity * 0.45} transform="rotate(25 80 65)" />
        <path d="M 20 90 Q 60 50 100 85" stroke="#5a8560" strokeWidth="1.5" fill="none" opacity={opacity * 0.4} />
      </svg>
    );
  }

  if (variant === "side") {
    return (
      <svg
        viewBox="0 0 80 200"
        className={cn("pointer-events-none select-none", className)}
        aria-hidden
      >
        <ellipse cx="40" cy="60" rx="35" ry="20" fill="#6b9e72" opacity={opacity * 0.35} transform="rotate(-20 40 60)" />
        <ellipse cx="25" cy="120" rx="28" ry="16" fill="#4d8054" opacity={opacity * 0.3} transform="rotate(-40 25 120)" />
        <ellipse cx="55" cy="160" rx="30" ry="18" fill="#7cb883" opacity={opacity * 0.25} transform="rotate(10 55 160)" />
      </svg>
    );
  }

  const flip = variant === "corner-br" || variant === "corner-tr";
  const top = variant === "corner-tl" || variant === "corner-tr";

  return (
    <svg
      viewBox="0 0 140 140"
      className={cn(
        "pointer-events-none select-none",
        flip && "scale-x-[-1]",
        top && variant === "corner-tr" && "scale-y-[-1]",
        !top && variant === "corner-br" && "",
        className
      )}
      aria-hidden
    >
      <ellipse cx="35" cy="85" rx="40" ry="24" fill="#6b9e72" opacity={opacity * 0.55} transform="rotate(-30 35 85)" />
      <ellipse cx="70" cy="55" rx="32" ry="20" fill="#4d8054" opacity={opacity * 0.5} transform="rotate(-10 70 55)" />
      <ellipse cx="95" cy="90" rx="28" ry="18" fill="#7cb883" opacity={opacity * 0.4} transform="rotate(20 95 90)" />
      <path
        d="M 10 110 Q 50 40 120 100"
        stroke="#3d6b45"
        strokeWidth="2"
        fill="none"
        opacity={opacity * 0.35}
        strokeLinecap="round"
      />
      <ellipse cx="50" cy="100" rx="12" ry="8" fill="#5a8560" opacity={opacity * 0.45} transform="rotate(-50 50 100)" />
    </svg>
  );
}

type GardenGlowProps = {
  children: React.ReactNode;
  className?: string;
};

/** Layered garden background wrapper */
export function GardenCanvas({ children, className }: GardenGlowProps) {
  return (
    <div className={cn("relative", className)}>
      <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]">
        <div className="absolute -top-20 -right-16 w-56 h-56 rounded-full bg-leaf-400/10 blur-3xl" />
        <div className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full bg-forest-600/8 blur-3xl" />
      </div>
      <div className="relative">{children}</div>
    </div>
  );
}
