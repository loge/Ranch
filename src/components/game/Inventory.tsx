'use client';

import { CROPS } from './types';

interface InventoryProps {
  money: number;
  seeds: { [key: string]: number };
  crops: { [key: string]: number };
  onSelectSeed: (cropType: keyof typeof CROPS) => void;
}

export function Inventory({ money, seeds, crops, onSelectSeed }: InventoryProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Inventory</h2>
      
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-green-600">Money: ${money}</h3>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Seeds</h3>
        <div className="grid grid-cols-2 gap-2">
          {Object.entries(seeds).map(([cropType, count]) => (
            <button
              key={cropType}
              onClick={() => onSelectSeed(cropType as keyof typeof CROPS)}
              className="flex items-center justify-between p-2 bg-green-100 rounded hover:bg-green-200"
            >
              <span>{CROPS[cropType as keyof typeof CROPS].name}</span>
              <span className="font-semibold">{count}</span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Harvested Crops</h3>
        <div className="grid grid-cols-2 gap-2">
          {Object.entries(crops).map(([cropName, count]) => (
            <div
              key={cropName}
              className="flex items-center justify-between p-2 bg-yellow-100 rounded"
            >
              <span>{cropName}</span>
              <span className="font-semibold">{count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 