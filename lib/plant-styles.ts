import type { PlantState } from "./types";

export type PlantPalette = {
  leaf: string;
  leafLight: string;
  leafDark: string;
  leafBright: string;
  accent: string;
  shadow: string;
};

export function getPlantPalette(state: PlantState): PlantPalette {
  const palettes: Record<PlantState, PlantPalette> = {
    thriving: {
      leaf: "#3d6b45",
      leafLight: "#6b9e72",
      leafDark: "#2a4a30",
      leafBright: "#7cb883",
      accent: "#4d8054",
      shadow: "rgba(42, 74, 48, 0.25)",
    },
    healthy: {
      leaf: "#4a7350",
      leafLight: "#7a9f7f",
      leafDark: "#345a3a",
      leafBright: "#6aab72",
      accent: "#5a8560",
      shadow: "rgba(52, 90, 58, 0.2)",
    },
    resting: {
      leaf: "#7a9f80",
      leafLight: "#a8c4ab",
      leafDark: "#5a7d60",
      leafBright: "#94b899",
      accent: "#8fb396",
      shadow: "rgba(90, 125, 96, 0.15)",
    },
    recovering: {
      leaf: "#5a8560",
      leafLight: "#94b899",
      leafDark: "#456848",
      leafBright: "#78a87e",
      accent: "#6d9474",
      shadow: "rgba(69, 104, 72, 0.18)",
    },
  };
  return palettes[state];
}

export function getPlantScale(state: PlantState): number {
  const scales: Record<PlantState, number> = {
    thriving: 1.12,
    healthy: 1.04,
    resting: 0.96,
    recovering: 0.99,
  };
  return scales[state];
}
