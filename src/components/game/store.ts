'use client';

import { create } from 'zustand';
import { GameState, Plot, CROPS } from './types';
import { v4 as uuidv4 } from 'uuid';

const INITIAL_PLOTS = 9; // 3x3 grid
const INITIAL_MONEY = 100;

interface GameStore extends GameState {
  plantCrop: (plotId: string, cropType: keyof typeof CROPS) => void;
  waterPlot: (plotId: string) => void;
  harvestCrop: (plotId: string) => void;
  updateGame: () => void;
}

export const useGameStore = create<GameStore>((set, get): GameStore => ({
  money: INITIAL_MONEY,
  plots: Array(INITIAL_PLOTS).fill(null).map(() => ({
    id: uuidv4(),
    isWatered: false,
  })),
  inventory: {
    seeds: {
      CARROT: 5,
      POTATO: 3,
      TOMATO: 2,
    },
    crops: {},
  },

  plantCrop: (plotId: string, cropType: keyof typeof CROPS) => {
    const state = get();
    if (state.inventory.seeds[cropType] <= 0) return;
    
    set((state: GameStore) => ({
      inventory: {
        ...state.inventory,
        seeds: {
          ...state.inventory.seeds,
          [cropType]: state.inventory.seeds[cropType] - 1,
        },
      },
      plots: state.plots.map((plot: Plot) => 
        plot.id === plotId
          ? {
              ...plot,
              crop: {
                id: uuidv4(),
                name: CROPS[cropType].name,
                growthStage: 0,
                maxGrowthStage: CROPS[cropType].maxGrowthStage,
                waterLevel: 0,
                maxWaterLevel: CROPS[cropType].maxWaterLevel,
                value: CROPS[cropType].value,
                seedPrice: CROPS[cropType].seedPrice,
              },
            }
          : plot
      ),
    }));
  },

  waterPlot: (plotId: string) => {
    set((state: GameStore) => ({
      plots: state.plots.map((plot: Plot) =>
        plot.id === plotId && plot.crop
          ? {
              ...plot,
              isWatered: true,
              crop: {
                ...plot.crop,
                waterLevel: Math.min(plot.crop.waterLevel + 1, plot.crop.maxWaterLevel),
              },
            }
          : plot
      ),
    }));
  },

  harvestCrop: (plotId: string) => {
    const state = get();
    const plot = state.plots.find((p: Plot) => p.id === plotId);
    if (!plot?.crop || plot.crop.growthStage < plot.crop.maxGrowthStage) return;

    set((state: GameStore) => ({
      money: state.money + plot.crop!.value,
      inventory: {
        ...state.inventory,
        crops: {
          ...state.inventory.crops,
          [plot.crop!.name]: (state.inventory.crops[plot.crop!.name] || 0) + 1,
        },
      },
      plots: state.plots.map((p: Plot) =>
        p.id === plotId
          ? { ...p, crop: undefined, isWatered: false }
          : p
      ),
    }));
  },

  updateGame: () => {
    set((state: GameStore) => ({
      plots: state.plots.map((plot: Plot) => {
        if (!plot.crop || !plot.isWatered) return plot;

        const newGrowthStage = Math.min(
          plot.crop.growthStage + 1,
          plot.crop.maxGrowthStage
        );

        return {
          ...plot,
          isWatered: false,
          crop: {
            ...plot.crop,
            growthStage: newGrowthStage,
            waterLevel: Math.max(0, plot.crop.waterLevel - 1),
          },
        };
      }),
    }));
  },
})); 