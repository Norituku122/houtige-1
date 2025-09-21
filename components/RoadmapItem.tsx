import React from 'react';
import type { RoadmapUpgrade } from '../types';

interface RoadmapItemProps {
  upgrade: RoadmapUpgrade;
  onPurchase: (upgradeId: string) => void;
  isPurchased: boolean;
  canAfford: boolean;
}

const RoadmapItem: React.FC<RoadmapItemProps> = ({ upgrade, onPurchase, isPurchased, canAfford }) => {
  return (
    <div className={`p-4 rounded-xl transition-all duration-300 shadow-lg border flex items-center gap-4 ${
        isPurchased 
        ? 'bg-green-100/80 border-green-300 shadow-green-200/50' 
        : 'bg-white/90 border-slate-200 shadow-purple-200/50'
      }`}>
      <div className={`flex-shrink-0 text-2xl p-3 rounded-full ${
          isPurchased ? 'bg-green-200 text-green-600' : 'bg-purple-100 text-purple-500'
      }`}>
        <i className={`fas ${upgrade.icon}`}></i>
      </div>
      <div className="flex-grow">
        <h3 className={`font-bold ${isPurchased ? 'text-green-800' : 'text-slate-800'}`}>
          {upgrade.name}
        </h3>
        <p className={`text-sm ${isPurchased ? 'text-green-700/90' : 'text-slate-500'}`}>
          {upgrade.description}
        </p>
      </div>
      <div className="flex-shrink-0">
        <button
          onClick={() => onPurchase(upgrade.id)}
          disabled={isPurchased || !canAfford}
          className={`font-bold text-sm transition-all duration-300 transform rounded-lg px-4 py-2 flex items-center gap-2
                     focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-offset-2
                     ${isPurchased
                        ? 'bg-gradient-to-br from-green-200 to-teal-200 text-green-900 shadow-inner cursor-default'
                        : canAfford
                          ? `text-yellow-900 bg-gradient-to-r from-amber-300 to-yellow-400 
                             shadow-lg shadow-yellow-300/60
                             hover:shadow-xl hover:shadow-yellow-300/80 hover:brightness-105 hover:-translate-y-0.5 
                             active:scale-95 active:brightness-95`
                          : 'bg-slate-200 text-slate-500 shadow-inner cursor-not-allowed'
                     }`}
        >
          {isPurchased ? (
            <>
              <i className="fas fa-check-circle"></i>
              <span>購入済み</span>
            </>
          ) : (
            <>
              <i className="fas fa-sparkles"></i>
              <span>{upgrade.cost}</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default RoadmapItem;