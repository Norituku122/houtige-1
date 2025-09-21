import React from 'react';
import type { RoadmapUpgrade } from '../types';
import { ROADMAP_UPGRADES } from '../data/roadmapUpgrades';
import RoadmapItem from './RoadmapItem';

interface RoadmapPanelProps {
  ideaSparks: number;
  purchasedUpgrades: string[];
  onPurchase: (upgradeId: string) => void;
}

const RoadmapPanel: React.FC<RoadmapPanelProps> = ({ ideaSparks, purchasedUpgrades, onPurchase }) => {
  return (
    <div className="bg-white/60 backdrop-blur-lg p-4 sm:p-6 rounded-b-2xl shadow-lg border-x border-b border-white/80 flex-grow flex flex-col h-full">
      <div className="flex justify-between items-center border-b-2 border-purple-300/50 pb-2 mb-4">
        <h2 className="text-xl font-bold text-purple-700">
          <i className="fas fa-map-signs mr-3 text-violet-400"></i>ロードマップ
        </h2>
        <div className="font-bold text-amber-800 bg-gradient-to-r from-yellow-200 to-amber-300 px-4 py-2 rounded-full text-base font-mono flex items-center gap-2 shadow-lg shadow-yellow-200/80 border border-white/50">
           <i className="fas fa-sparkles text-yellow-600"></i>
           <span>{ideaSparks}</span>
        </div>
      </div>
      
      <p className="text-sm text-slate-500 mb-4">
        リセットで得た「アイデアの煌めき」を使って、会社を永久に強化しよう！
      </p>

      <div className="space-y-4 overflow-y-auto flex-grow pr-2">
        {ROADMAP_UPGRADES.map((upgrade) => (
          <RoadmapItem 
            key={upgrade.id}
            upgrade={upgrade}
            onPurchase={onPurchase}
            isPurchased={purchasedUpgrades.includes(upgrade.id)}
            canAfford={ideaSparks >= upgrade.cost}
          />
        ))}
      </div>
    </div>
  );
};

export default RoadmapPanel;