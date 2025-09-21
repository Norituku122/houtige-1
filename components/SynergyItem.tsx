import React from 'react';
import type { Synergy } from '../types';

interface SynergyItemProps {
  synergy: Synergy;
  isUnlocked: boolean;
  businessNameMap: Map<string, string>;
  businessLevelMap: Map<string, number>;
}

const SynergyItem: React.FC<SynergyItemProps> = ({ synergy, isUnlocked, businessNameMap, businessLevelMap }) => {
  const isRequirementMet = (businessId: string, level: number) => {
    return (businessLevelMap.get(businessId) || 0) >= level;
  };

  return (
    <div 
      className={`p-4 rounded-xl transition-all duration-300 shadow-lg border ${
        isUnlocked 
        ? 'bg-white border-green-300 animate-pop-in shadow-green-200/50' 
        : 'bg-slate-100/80 border-slate-200 opacity-90'
      }`}
    >
      <div className="flex items-center gap-4 mb-3">
        <div className="flex-shrink-0">
          {isUnlocked ? (
            <i className={`fas ${synergy.icon} text-green-500 text-2xl`}></i>
          ) : (
            <i className="fas fa-lock text-slate-400 text-2xl"></i>
          )}
        </div>
        <div>
          <h3 className={`font-bold text-lg ${isUnlocked ? 'text-green-800' : 'text-slate-700'}`}>
            {synergy.name}
          </h3>
          <p className={`text-sm ${isUnlocked ? 'text-green-700/90' : 'text-slate-500'}`}>
            {synergy.description}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 text-sm border-t border-slate-200/70 pt-3 mt-3">
        {/* Requirements */}
        <div>
          <h4 className="font-semibold text-slate-500 text-xs mb-1 uppercase tracking-wider">条件</h4>
          <ul className="list-none space-y-1">
            {synergy.requirements.map(req => {
              const met = isRequirementMet(req.businessId, req.level);
              return (
                 <li key={req.businessId} className={`transition-colors duration-300 ${met ? 'text-slate-800' : 'text-slate-500'} flex items-center`}>
                  <i className={`fas fa-check-circle mr-2 transition-colors duration-300 ${met ? 'text-green-400' : 'text-slate-300'}`}></i>
                  {businessNameMap.get(req.businessId) || req.businessId} (Lv. {req.level})
                </li>
              );
            })}
          </ul>
        </div>
        {/* Bonuses */}
        <div>
          <h4 className={`font-semibold text-xs mb-1 uppercase tracking-wider transition-colors duration-300 ${isUnlocked ? 'text-green-600' : 'text-slate-400'}`}>ボーナス</h4>
          <ul className="list-none space-y-1">
            {synergy.bonuses.map(bonus => (
              <li key={bonus.businessId} className={`font-semibold transition-colors duration-300 ${isUnlocked ? 'text-green-700' : 'text-slate-500'} flex items-center`}>
                <i className={`fas fa-arrow-up-wide-short mr-2 transition-colors duration-300 ${isUnlocked ? 'text-green-400' : 'text-slate-300'}`}></i>
                {businessNameMap.get(bonus.businessId) || bonus.businessId}: <span className="font-mono ml-1">+{( (bonus.multiplier - 1) * 100).toFixed(0)}%</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SynergyItem;