
import React, { useState } from 'react';
import type { Manager } from '../types';

interface ManagerItemProps {
  manager: Manager;
  businessName: string;
  onLevelUp: (managerId: string) => void;
  ideaSparks: number;
  managerCostReduction: number;
  managerBonusMultiplier: number;
}

const ManagerItem: React.FC<ManagerItemProps> = ({ manager, businessName, onLevelUp, ideaSparks, managerCostReduction, managerBonusMultiplier }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  
  const levelUpCost = Math.floor(manager.baseLevelUpCost * Math.pow(manager.costMultiplier, manager.level - 1) * managerCostReduction);
  const canAfford = ideaSparks >= levelUpCost;

  const handleLevelUp = () => {
    onLevelUp(manager.id);
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 400); // match animation duration
  };
  
  const bonus = (manager.bonusMultiplier - 1) * manager.level * managerBonusMultiplier * 100;

  return (
    <div className={`p-4 rounded-xl transition-all duration-300 shadow-lg border flex items-center gap-4 bg-white/90 border-slate-200 shadow-purple-200/50 ${isAnimating ? 'animate-pop-in' : ''}`}>
      <div className="flex-shrink-0 text-3xl p-3 rounded-full bg-purple-100 text-purple-500">
        <i className={`fas ${manager.icon}`}></i>
      </div>
      <div className="flex-grow">
        <div className="flex justify-between items-baseline">
            <h3 className="font-bold text-slate-800">{manager.name}</h3>
            <span className="text-xs font-bold bg-purple-200 text-purple-800 px-2 py-0.5 rounded-full font-mono">
                Lv.{manager.level}
            </span>
        </div>
        <p className="text-sm text-slate-500">{businessName}担当</p>
        <div className="mt-2 text-sm bg-green-100/80 text-green-800 font-semibold p-1.5 rounded-md inline-block">
            <i className="fas fa-arrow-up-wide-short mr-1 text-green-600"></i>
            収益 <span className="font-mono">+{bonus.toFixed(0)}%</span>
        </div>
      </div>
      <div className="flex-shrink-0">
        <button
          onClick={handleLevelUp}
          disabled={!canAfford}
          className={`font-bold text-sm transition-all duration-300 transform rounded-lg px-4 py-2 flex items-center gap-2
                     focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2
                     ${canAfford
                       ? `text-white bg-gradient-to-r from-violet-500 to-purple-500
                          shadow-lg shadow-purple-400/50
                          hover:shadow-xl hover:shadow-purple-400/70 hover:brightness-105 hover:-translate-y-0.5 
                          active:scale-95 active:brightness-95`
                       : 'bg-slate-200 text-slate-500 shadow-inner cursor-not-allowed'
                     }`}
        >
          <i className="fas fa-sparkles"></i>
          <span>{levelUpCost}</span>
        </button>
      </div>
    </div>
  );
};

export default ManagerItem;
