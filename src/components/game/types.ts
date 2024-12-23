export interface Crop {
  id: string;
  name: string;
  growthStage: number;
  maxGrowthStage: number;
  waterLevel: number;
  maxWaterLevel: number;
  value: number;
  seedPrice: number;
}

export interface Plot {
  id: string;
  crop?: Crop;
  isWatered: boolean;
}

export interface GameState {
  money: number;
  plots: Plot[];
  inventory: {
    seeds: { [key: string]: number };
    crops: { [key: string]: number };
  };
}

export const CROPS = {
  CARROT: {
    name: 'Carrot',
    maxGrowthStage: 4,
    maxWaterLevel: 3,
    value: 10,
    seedPrice: 5,
  },
  POTATO: {
    name: 'Potato',
    maxGrowthStage: 5,
    maxWaterLevel: 4,
    value: 15,
    seedPrice: 8,
  },
  TOMATO: {
    name: 'Tomato',
    maxGrowthStage: 6,
    maxWaterLevel: 5,
    value: 20,
    seedPrice: 10,
  },
} as const; 