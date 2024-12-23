'use client';

import { useEffect, useState } from 'react';
import { Plot } from './Plot';
import { Inventory } from './Inventory';
import { useGameStore } from './store';
import { CROPS } from './types';
import { WalletButton } from '../solana/WalletButton';
import { useSolana } from '../solana/SolanaProvider';

export function Game() {
  const { connected } = useSolana();
  const { 
    money,
    plots,
    inventory,
    plantCrop,
    waterPlot,
    harvestCrop,
    updateGame
  } = useGameStore();

  const [selectedCropType, setSelectedCropType] = useState<keyof typeof CROPS | null>(null);

  // Update game state every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      updateGame();
    }, 2000);

    return () => clearInterval(interval);
  }, [updateGame]);

  const handlePlotClick = (plotId: string) => {
    if (selectedCropType) {
      plantCrop(plotId, selectedCropType);
      setSelectedCropType(null);
    }
  };

  if (!connected) {
    return (
      <div className="min-h-screen bg-green-50 flex flex-col items-center justify-center p-8">
        <h1 className="text-3xl font-bold text-center mb-8">My Farm</h1>
        <div className="text-center mb-8">
          <p className="text-lg mb-4">Connect your wallet to start farming!</p>
          <WalletButton />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-green-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">My Farm</h1>
          <WalletButton />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-[1fr_300px] gap-8">
          <div className="grid grid-cols-3 gap-4 place-items-center">
            {plots.map((plot) => (
              <Plot
                key={plot.id}
                plot={plot}
                onPlant={() => handlePlotClick(plot.id)}
                onWater={() => waterPlot(plot.id)}
                onHarvest={() => harvestCrop(plot.id)}
              />
            ))}
          </div>

          <Inventory
            money={money}
            seeds={inventory.seeds}
            crops={inventory.crops}
            onSelectSeed={setSelectedCropType}
          />
        </div>

        {selectedCropType && (
          <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-white p-4 rounded-lg shadow-lg">
            <p className="text-center">
              Selected seed: {CROPS[selectedCropType].name}
              <button
                onClick={() => setSelectedCropType(null)}
                className="ml-4 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Cancel
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
} 