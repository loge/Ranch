'use client';

import { Plot as PlotType } from './types';
import { cn } from '@/lib/utils';

interface PlotProps {
  plot: PlotType;
  onPlant: () => void;
  onWater: () => void;
  onHarvest: () => void;
}

export function Plot({ plot, onPlant, onWater, onHarvest }: PlotProps) {
  const { crop, isWatered } = plot;

  return (
    <div 
      className={cn(
        'w-24 h-24 border-2 border-brown-600 bg-brown-200 rounded-lg p-2',
        'flex flex-col items-center justify-center gap-1 cursor-pointer',
        'transition-all duration-200 hover:bg-brown-300',
        isWatered && 'bg-brown-400'
      )}
    >
      {crop ? (
        <>
          <div className="text-sm font-semibold">{crop.name}</div>
          <div className="text-xs">
            Growth: {crop.growthStage}/{crop.maxGrowthStage}
          </div>
          <div className="text-xs">
            Water: {crop.waterLevel}/{crop.maxWaterLevel}
          </div>
          <div className="flex gap-1">
            <button
              onClick={onWater}
              className="px-2 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Water
            </button>
            {crop.growthStage === crop.maxGrowthStage && (
              <button
                onClick={onHarvest}
                className="px-2 py-1 text-xs bg-green-500 text-white rounded hover:bg-green-600"
              >
                Harvest
              </button>
            )}
          </div>
        </>
      ) : (
        <button
          onClick={onPlant}
          className="px-3 py-1.5 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Plant
        </button>
      )}
    </div>
  );
} 