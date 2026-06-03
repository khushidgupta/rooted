import type { PlantState, PlantType } from "@/lib/types";
import { getPlantPalette, getPlantScale } from "@/lib/plant-styles";
import { cn } from "@/lib/cn";

type PlantIllustrationProps = {
  type: PlantType;
  state?: PlantState;
  size?: "sm" | "md" | "lg" | "xl" | "hero";
  className?: string;
  animated?: boolean;
};

type PlantPartProps = {
  state: PlantState;
  animated?: boolean;
  palette: ReturnType<typeof getPlantPalette>;
};

function Face({ state, animated, palette }: PlantPartProps) {
  const blinkClass = animated ? "plant-eye plant-eye-blink" : "plant-eye";
  const blinkClassR = animated
    ? "plant-eye plant-eye-blink-delay"
    : "plant-eye";
  const stroke = palette.leafDark;

  if (state === "resting") {
    return (
      <g>
        <path
          d="M 42 50 Q 46 47 50 50"
          stroke={stroke}
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          opacity="0.45"
        />
        <path
          d="M 50 50 Q 54 47 58 50"
          stroke={stroke}
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          opacity="0.45"
        />
        <path
          d="M 47 58 Q 50 59.5 53 58"
          stroke={stroke}
          strokeWidth="1.2"
          fill="none"
          strokeLinecap="round"
          opacity="0.4"
        />
      </g>
    );
  }

  const eyeY = state === "recovering" ? 51 : state === "thriving" ? 47 : 49;
  const eyeR =
    state === "thriving" ? 2.4 : state === "recovering" ? 1.9 : 2.2;

  const mouth =
    state === "thriving" ? (
      <path
        d="M 45 56 Q 50 64 55 56"
        stroke={stroke}
        strokeWidth="1.7"
        fill="none"
        strokeLinecap="round"
      />
    ) : state === "healthy" ? (
      <path
        d="M 46 57 Q 50 62 54 57"
        stroke={stroke}
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
      />
    ) : (
      <path
        d="M 46 58 Q 50 55 54 58"
        stroke={stroke}
        strokeWidth="1.4"
        fill="none"
        strokeLinecap="round"
        opacity="0.6"
      />
    );

  return (
    <g>
      <ellipse
        cx="45"
        cy={eyeY}
        rx={eyeR}
        ry={state === "thriving" ? eyeR * 0.75 : eyeR}
        fill={stroke}
        className={blinkClass}
        opacity={state === "recovering" ? 0.5 : 0.85}
      />
      <ellipse
        cx="55"
        cy={eyeY}
        rx={eyeR}
        ry={state === "thriving" ? eyeR * 0.75 : eyeR}
        fill={stroke}
        className={blinkClassR}
        opacity={state === "recovering" ? 0.5 : 0.85}
      />
      {state === "thriving" && (
        <>
          <circle cx="43" cy={eyeY - 2} r="1" fill="#faf8f4" opacity="0.8" />
          <circle cx="57" cy={eyeY - 2} r="1" fill="#faf8f4" opacity="0.8" />
          <path
            d="M 38 44 Q 50 38 62 44"
            stroke={palette.leafLight}
            strokeWidth="1"
            fill="none"
            opacity="0.35"
          />
        </>
      )}
      {mouth}
    </g>
  );
}

function Pot({ palette }: { palette: ReturnType<typeof getPlantPalette> }) {
  return (
    <>
      <ellipse cx="50" cy="91" rx="26" ry="5" fill={palette.shadow} />
      <path d="M 26 74 L 30 90 L 70 90 L 74 74 Z" fill="#c8825a" />
      <path d="M 24 74 L 76 74 L 74 69 L 26 69 Z" fill="#b87452" />
      <path
        d="M 28 74 Q 50 78 72 74"
        stroke="#a66648"
        strokeWidth="0.6"
        fill="none"
        opacity="0.5"
      />
    </>
  );
}

function Monstera({ state, animated, palette }: PlantPartProps) {
  return (
    <g>
      <path
        d="M 50 22 C 32 28 26 48 36 64 C 40 70 46 72 50 74 C 54 72 60 70 64 64 C 74 48 68 28 50 22 Z"
        fill={palette.leaf}
      />
      <path
        d="M 50 28 L 44 42 L 50 52 L 56 42 Z"
        fill={palette.leafLight}
        opacity="0.5"
      />
      <ellipse
        cx="32"
        cy="52"
        rx="12"
        ry="16"
        fill={palette.leafLight}
        transform="rotate(-28 32 52)"
      />
      <ellipse
        cx="68"
        cy="52"
        rx="12"
        ry="16"
        fill={palette.accent}
        transform="rotate(28 68 52)"
      />
      <ellipse
        cx="28"
        cy="62"
        rx="8"
        ry="11"
        fill={palette.leafDark}
        opacity="0.35"
        transform="rotate(-35 28 62)"
      />
      <Face state={state} animated={animated} palette={palette} />
    </g>
  );
}

function Pothos({ state, animated, palette }: PlantPartProps) {
  return (
    <g>
      <path
        d="M 50 76 Q 48 60 50 42"
        stroke={palette.leafDark}
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M 50 55 Q 30 48 22 58 Q 18 64 24 68"
        stroke={palette.leafDark}
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
      <ellipse
        cx="22"
        cy="60"
        rx="11"
        ry="7"
        fill={palette.leaf}
        transform="rotate(-50 22 60)"
      />
      <ellipse
        cx="38"
        cy="44"
        rx="13"
        ry="8"
        fill={palette.leafLight}
        transform="rotate(-35 38 44)"
      />
      <ellipse
        cx="62"
        cy="38"
        rx="13"
        ry="8"
        fill={palette.accent}
        transform="rotate(40 62 38)"
      />
      <ellipse
        cx="70"
        cy="52"
        rx="10"
        ry="7"
        fill={palette.leaf}
        transform="rotate(55 70 52)"
      />
      <Face state={state} animated={animated} palette={palette} />
    </g>
  );
}

function Succulent({ state, animated, palette }: PlantPartProps) {
  return (
    <g>
      {[0, 60, 120, 180, 240, 300].map((rot, i) => (
        <ellipse
          key={rot}
          cx="50"
          cy="38"
          rx="9"
          ry="16"
          fill={i % 2 === 0 ? palette.leaf : palette.leafLight}
          transform={`rotate(${rot} 50 48)`}
        />
      ))}
      <circle cx="50" cy="46" r="11" fill={palette.accent} />
      <circle cx="50" cy="46" r="6" fill={palette.leafLight} opacity="0.5" />
      <Face state={state} animated={animated} palette={palette} />
    </g>
  );
}

function Cactus({ state, animated, palette }: PlantPartProps) {
  return (
    <g>
      <rect x="43" y="30" width="14" height="42" rx="7" fill={palette.leaf} />
      <rect x="28" y="46" width="10" height="20" rx="5" fill={palette.leafLight} />
      <rect x="62" y="40" width="10" height="26" rx="5" fill={palette.accent} />
      {[
        [49, 36],
        [51, 46],
        [47, 56],
        [53, 64],
      ].map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="1.2" fill="#faf8f4" opacity="0.7" />
      ))}
      <Face state={state} animated={animated} palette={palette} />
    </g>
  );
}

function Calla({ state, animated, palette }: PlantPartProps) {
  return (
    <g>
      <path
        d="M 50 76 L 50 48"
        stroke={palette.leafDark}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M 50 20 C 38 28 36 48 50 58 C 64 48 62 28 50 20 Z"
        fill="#f5f7f2"
        stroke={palette.leaf}
        strokeWidth="1.2"
      />
      <path
        d="M 50 58 Q 50 68 50 76"
        stroke={palette.leafDark}
        strokeWidth="2"
        fill="none"
      />
      <ellipse cx="50" cy="24" rx="5" ry="9" fill={palette.leafLight} opacity="0.6" />
      <Face state={state} animated={animated} palette={palette} />
    </g>
  );
}

function Sunflower({ state, animated, palette }: PlantPartProps) {
  return (
    <g>
      <path
        d="M 50 76 L 50 46"
        stroke={palette.leafDark}
        strokeWidth="3"
        strokeLinecap="round"
      />
      {Array.from({ length: 12 }).map((_, i) => (
        <ellipse
          key={i}
          cx="50"
          cy="28"
          rx="4.5"
          ry="13"
          fill="#e8b49a"
          transform={`rotate(${i * 30} 50 34)`}
        />
      ))}
      <circle cx="50" cy="34" r="11" fill="#d2906d" />
      <circle cx="50" cy="34" r="7" fill="#c4825f" opacity="0.5" />
      <Face state={state} animated={animated} palette={palette} />
    </g>
  );
}

function Gladiolus({ state, animated, palette }: PlantPartProps) {
  return (
    <g>
      <path
        d="M 50 76 L 50 32"
        stroke={palette.leafDark}
        strokeWidth="2"
        strokeLinecap="round"
      />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <ellipse
          key={i}
          cx={50 + (i % 2 === 0 ? -7 : 7)}
          cy={34 + i * 7}
          rx="6"
          ry="11"
          fill={i % 3 === 0 ? palette.leafLight : i % 3 === 1 ? "#c5a8d4" : palette.leaf}
          opacity={0.92}
          transform={`rotate(${i % 2 === 0 ? -8 : 8} ${50 + (i % 2 === 0 ? -7 : 7)} ${34 + i * 7})`}
        />
      ))}
      <Face state={state} animated={animated} palette={palette} />
    </g>
  );
}

const PLANTS: Record<
  PlantType,
  (props: PlantPartProps) => React.ReactNode
> = {
  monstera: Monstera,
  pothos: Pothos,
  succulent: Succulent,
  cactus: Cactus,
  calla: Calla,
  sunflower: Sunflower,
  gladiolus: Gladiolus,
};

const sizes = {
  sm: "w-36 h-36",
  md: "w-52 h-52 sm:w-56",
  lg: "w-72 h-72 sm:w-80",
  xl: "w-80 h-80 sm:w-[22rem] sm:h-[22rem]",
  hero: "w-[19rem] h-[19rem] sm:w-[26rem] sm:h-[26rem]",
};

export function PlantIllustration({
  type,
  state = "resting",
  size = "md",
  className,
  animated = false,
}: PlantIllustrationProps) {
  const Plant = PLANTS[type];
  const palette = getPlantPalette(state);
  const scale = getPlantScale(state);

  return (
    <svg
      viewBox="0 0 100 100"
      className={cn(
        sizes[size],
        "transition-all duration-700 ease-out",
        className
      )}
      aria-hidden
    >
      <defs>
        <radialGradient id="leafGlow" cx="50%" cy="30%" r="60%">
          <stop offset="0%" stopColor={palette.leafBright} stopOpacity="0.9" />
          <stop offset="100%" stopColor={palette.leaf} stopOpacity="1" />
        </radialGradient>
      </defs>
      <g
        style={{
          transform: `scale(${scale})`,
          transformOrigin: "50px 70px",
        }}
      >
        <Plant state={state} animated={animated} palette={palette} />
        <Pot palette={palette} />
      </g>
    </svg>
  );
}
