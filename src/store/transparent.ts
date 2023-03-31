import { create } from "zustand";
import { persist } from "zustand/middleware";

export type GradientCombination = {
  gradientType: string;
  direction: string;
  color: string;
  percentage: string;
  hidden: boolean;
};

type TransparentStorageType = {
  transparent: GradientCombination[];
  settings: Record<string, unknown>;
  addCombination: (combination: GradientCombination) => void;
  removeCombination: (type: "transparent", index: number) => void;
  updateCombination: (
    type: "transparent",
    index: number,
    combination: GradientCombination
  ) => void;
  updateSettings: (newSettings: Record<string, unknown>) => void;
};

export const useTransparentStorage = create(
  persist<TransparentStorageType>(
    (set) => ({
      transparent: [],
      settings: {},
      addCombination: (combination) => {
        set((state) => ({
          ...state,
          transparent: [...state.transparent, { ...combination }],
        }));
      },
      removeCombination: (type, index) => {
        set((state) => ({
          ...state,
          [type]: state.transparent.filter((_, i) => i !== index),
        }));
      },
      updateCombination: (type, index, combination) => {
        set((state) => {
          const newCombination = combination as GradientCombination;

          const newState = { ...state };
          newState[type][index] = newCombination;

          return newState;
        });
      },
      updateSettings: (newSettings) => {
        set((state) => ({
          ...state,
          settings: { ...state.settings, ...newSettings },
        }));
      },
    }),
    {
      name: "transparent-storage",
    }
  )
);
