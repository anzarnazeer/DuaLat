"use client";

import React, { useState, useEffect } from 'react';
import { Ruler, Scale, HelpCircle } from 'lucide-react';

interface SizeBoundary {
  size: string;
  minWeight: number;
  maxWeight: number;
  minHeight: number;
  maxHeight: number;
}

const SIZE_BOUNDARIES: SizeBoundary[] = [
  { size: 'Newborn', minWeight: 0, maxWeight: 8, minHeight: 0, maxHeight: 21 },
  { size: '0-3M', minWeight: 8, maxWeight: 12, minHeight: 21, maxHeight: 24 },
  { size: '3-6M', minWeight: 12, maxWeight: 16, minHeight: 24, maxHeight: 26 },
  { size: '6-12M', minWeight: 16, maxWeight: 20, minHeight: 26, maxHeight: 28 },
  { size: '1Y', minWeight: 20, maxWeight: 24, minHeight: 28, maxHeight: 30 },
  { size: '2Y', minWeight: 24, maxWeight: 28, minHeight: 30, maxHeight: 32 },
  { size: '3Y', minWeight: 28, maxWeight: 32, minHeight: 32, maxHeight: 35 },
  { size: '4Y', minWeight: 32, maxWeight: 37, minHeight: 35, maxHeight: 39 },
  { size: '5Y', minWeight: 37, maxWeight: 44, minHeight: 39, maxHeight: 43 },
];

export default function GrowWithMeGuide() {
  const [weight, setWeight] = useState<number>(14);
  const [height, setHeight] = useState<number>(25);
  const [recommendedSize, setRecommendedSize] = useState<string>('3-6M');
  const [isNearBoundary, setIsNearBoundary] = useState<boolean>(false);

  useEffect(() => {
    // Determine size by calculating distance or finding matching range
    // We prioritize weight first, then verify height.
    let matched = SIZE_BOUNDARIES[0];
    
    for (const boundary of SIZE_BOUNDARIES) {
      if (weight >= boundary.minWeight && weight <= boundary.maxWeight) {
        matched = boundary;
        break;
      }
    }

    // Check if close to sizing up (within 1.5 lbs of max weight OR 1 inch of max height)
    const weightBuffer = matched.maxWeight - weight;
    const heightBuffer = matched.maxHeight - height;
    
    const nearLimit = (weightBuffer <= 1.5) || (heightBuffer <= 1);
    
    setRecommendedSize(matched.size);
    setIsNearBoundary(nearLimit && matched.size !== '5Y');
  }, [weight, height]);

  return (
    <div className="bg-cream-100 rounded-3xl p-6 border border-cream-200 shadow-sm max-w-lg w-full">
      {/* Title */}
      <div className="flex items-center gap-2 mb-4">
        <span className="text-2xl">🌱</span>
        <div>
          <h3 className="font-nunito text-lg font-bold text-charcoal">"Grow-With-Me" Size Calculator</h3>
          <p className="text-xs text-gray-500">Find the perfect fit based on actual measurements</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Weight Slider */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-xs font-bold text-charcoal flex items-center gap-1.5">
              <Scale size={14} className="text-primary-500" /> Child's Weight
            </label>
            <span className="text-sm font-black text-primary-600 bg-white px-2.5 py-1 rounded-xl shadow-xs border border-cream-200">
              {weight} lbs
            </span>
          </div>
          <input
            type="range"
            min="4"
            max="45"
            step="1"
            value={weight}
            onChange={(e) => setWeight(Number(e.target.value))}
            className="w-full h-2 bg-cream-200 rounded-lg appearance-none cursor-pointer accent-primary-500"
          />
          <div className="flex justify-between text-[10px] text-gray-400 font-semibold px-1">
            <span>4 lbs (NB)</span>
            <span>22 lbs (1Y)</span>
            <span>45 lbs (5Y)</span>
          </div>
        </div>

        {/* Height Slider */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-xs font-bold text-charcoal flex items-center gap-1.5">
              <Ruler size={14} className="text-secondary-500" /> Child's Height
            </label>
            <span className="text-sm font-black text-secondary-600 bg-white px-2.5 py-1 rounded-xl shadow-xs border border-cream-200">
              {height} inches
            </span>
          </div>
          <input
            type="range"
            min="15"
            max="45"
            step="1"
            value={height}
            onChange={(e) => setHeight(Number(e.target.value))}
            className="w-full h-2 bg-cream-200 rounded-lg appearance-none cursor-pointer accent-secondary-500"
          />
          <div className="flex justify-between text-[10px] text-gray-400 font-semibold px-1">
            <span>15 in (NB)</span>
            <span>30 in (1Y)</span>
            <span>45 in (5Y)</span>
          </div>
        </div>

        {/* Dynamic Recommendation Panel */}
        <div className="p-4 bg-white rounded-2xl border border-cream-200 shadow-xs text-center space-y-2">
          <span className="text-xs text-gray-400 font-bold tracking-wide uppercase">Recommended Size</span>
          <div className="text-3xl font-black text-secondary-500 animate-pulse-slow">
            {recommendedSize}
          </div>
          
          {isNearBoundary ? (
            <div className="mt-2 text-xs bg-accent-50 text-accent-600 border border-accent-100 p-2.5 rounded-xl flex items-start gap-2 text-left leading-relaxed">
              <span>⚠️</span>
              <p>
                <strong>Grow-With-Me Tip:</strong> Your little one is close to sizing up! We recommend selecting <strong>{SIZE_BOUNDARIES[SIZE_BOUNDARIES.findIndex(b => b.size === recommendedSize) + 1]?.size}</strong> for longer, comfortable wear.
              </p>
            </div>
          ) : (
            <p className="text-[10px] text-gray-400 leading-normal">
              This garment features stretchy elastic threads and fold-over cuffs designed to accommodate comfortable movements.
            </p>
          )}
        </div>

        {/* Size Reference Table */}
        <details className="group border border-cream-200 rounded-2xl bg-white overflow-hidden transition-all">
          <summary className="flex justify-between items-center p-3 text-xs font-bold text-charcoal hover:bg-cream-50 cursor-pointer list-none select-none">
            <span className="flex items-center gap-1.5"><HelpCircle size={14} className="text-gray-400" /> Size Reference Table</span>
            <span className="transition-transform group-open:rotate-180">▼</span>
          </summary>
          <div className="p-3 pt-0 border-t border-cream-200/50 max-h-48 overflow-y-auto">
            <table className="w-full text-[10px] text-left text-gray-500">
              <thead>
                <tr className="border-b border-cream-100 text-charcoal font-bold">
                  <th className="py-2">Size</th>
                  <th className="py-2">Weight Range</th>
                  <th className="py-2">Height Range</th>
                </tr>
              </thead>
              <tbody>
                {SIZE_BOUNDARIES.map((b) => (
                  <tr key={b.size} className={`border-b border-cream-50/50 hover:bg-cream-100/30 ${b.size === recommendedSize ? 'bg-secondary-50/40 text-secondary-600 font-semibold' : ''}`}>
                    <td className="py-1.5">{b.size}</td>
                    <td className="py-1.5">{b.minWeight === 0 ? `Up to ${b.maxWeight}` : `${b.minWeight}-${b.maxWeight}`} lbs</td>
                    <td className="py-1.5">{b.minHeight === 0 ? `Up to ${b.maxHeight}` : `${b.minHeight}-${b.maxHeight}`} in</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </details>
      </div>
    </div>
  );
}
