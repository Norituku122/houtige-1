
import React, { useMemo } from 'react';
import type { Business } from '../types';
import { formatCurrency } from '../types';

type BulkBuyAmount = 1 | 10 | 100 | 'MAX';

interface BusinessItemProps {
  business: Business;
  onUpgrade: (id: string, amount: BulkBuyAmount) => void;
  playerMoney: number;
  costReductionMultiplier: number;
  bulkBuyAmount: BulkBuyAmount;
  managedBusinessIds: Set<string>;
}

const BusinessItem: React.FC<BusinessItemProps> = ({ business, onUpgrade, playerMoney, costReductionMultiplier, bulkBuyAmount, managedBusinessIds }) => {
  const { totalCost, numLevels, canAfford } = useMemo(() => {
    const { baseCost, costMultiplier, level } = business;
    let levelsToBuy: number;
    let cost: number;

    const r = costMultiplier;
    const a = baseCost * Math.pow(r, level) * costReductionMultiplier;

    if (bulkBuyAmount === 'MAX') {
      if (r === 1) {
        levelsToBuy = Math.floor(playerMoney / a);
      } else {
        const maxLevels = Math.floor(Math.log(playerMoney * (r - 1) / a + 1) / Math.log(r));
        levelsToBuy = Math.max(0, maxLevels);
      }
    } else {
      levelsToBuy = bulkBuyAmount;
    }

    if (levelsToBuy === 0) {
      cost = a; // Show cost for 1 even if we can't afford
    } else {
       if (r === 1) {
        cost = a * levelsToBuy;
      } else {
        cost = a * (Math.pow(r, levelsToBuy) - 1) / (r - 1);
      }
    }

    return { totalCost: cost, numLevels: levelsToBuy, canAfford: playerMoney >= cost && levelsToBuy > 0 };
  }, [business, playerMoney, costReductionMultiplier, bulkBuyAmount]);

  const levelDisplay = bulkBuyAmount === 'MAX' ? (numLevels > 0 ? `+${numLevels}` : '') : `+${bulkBuyAmount}`;

  return (
    <button
      onClick={() => onUpgrade(business.id, bulkBuyAmount)}
      disabled={!canAfford}
      className={`
        relative aspect-square flex flex-col items-center p-2 rounded-3xl
        transition-all duration-300 transform text-center border-2 group
        focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-offset-2
        
        ${canAfford
          ? `
            bg-gradient-to-br from-purple-100 via-white to-pink-100
            border-white
            shadow-lg shadow-pink-300/60
            hover:shadow-xl hover:shadow-pink-300/80 hover:border-pink-200
            hover:-translate-y-1
            active:scale-95 active:shadow-md`
          : `
            bg-slate-200/80
            border-transparent
            cursor-not-allowed
            shadow-inner`
        }
      `}
    >
      {business.level > 0 && (
        <span className="absolute top-1.5 right-1.5 text-xs font-bold bg-purple-200 text-purple-800 px-2 py-0.5 rounded-full font-mono z-10">
          Lv.{business.level}
        </span>
      )}

      {business.totalMultiplier > 1 && (
        <span className="absolute top-1.5 left-1.5 text-xs font-bold bg-green-200 text-green-800 px-2 py-0.5 rounded-full font-mono z-10">
          x{business.totalMultiplier.toFixed(2)}
        </span>
      )}
      
      {managedBusinessIds.has(business.id) && (
        <span className="absolute bottom-1.5 right-1.5 text-xs text-purple-600 bg-purple-200/80 p-1 rounded-full z-10">
            <i className="fas fa-user-tie"></i>
        </span>
      )}
      
      <div className="flex-grow flex flex-col items-center justify-center">
        <i className={`fas ${business.icon} text-3xl sm:text-4xl mb-1 transition-colors ${canAfford ? 'text-purple-600' : 'text-slate-400'}`}></i>
        <span className={`text-xs font-bold transition-colors ${canAfford ? 'text-slate-700' : 'text-slate-500'}`}>{business.name}</span>
      </div>

      <div className="text-xs font-mono text-center flex-shrink-0">
        <div className={`transition-colors ${canAfford ? 'text-pink-600' : 'text-slate-500'}`}>
           {bulkBuyAmount !== 1 && <span className="text-purple-400 font-bold">{levelDisplay} </span>}
           {formatCurrency(totalCost)}
        </div>
        {business.level > 0 && (
           <div className={`transition-colors text-green-600`}>
            +{formatCurrency(business.incomePerSecond)}/s
           </div>
        )}
      </div>
    </button>
  );
};

export default BusinessItem;
