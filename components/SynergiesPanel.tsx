import React, { useMemo } from 'react';
import type { Synergy, Business } from '../types';
import SynergyItem from './SynergyItem';
import { SYNERGIES } from '../data/synergies';

interface SynergiesPanelProps {
  businesses: Business[];
}

const SynergiesPanel: React.FC<SynergiesPanelProps> = ({ businesses }) => {
  const businessLevelMap = useMemo(() => new Map(businesses.map(b => [b.id, b.level])), [businesses]);
  const businessNameMap = useMemo(() => new Map(businesses.map(b => [b.id, b.name])), [businesses]);

  const isSynergyUnlocked = (synergy: Synergy) => {
    return synergy.requirements.every(req => 
      (businessLevelMap.get(req.businessId) || 0) >= req.level
    );
  };

  return (
    <div className="bg-white/60 backdrop-blur-lg p-4 sm:p-6 rounded-b-2xl shadow-lg border-x border-b border-white/80 flex-grow flex flex-col h-full">
      <h2 className="text-xl font-bold mb-4 text-purple-700 border-b-2 border-purple-300/50 pb-2">
        <i className="fas fa-link mr-3 text-violet-400"></i>シナジー
      </h2>
      <p className="text-sm text-slate-500 mb-4">
        特定の事業を組み合わせると、特別なボーナスが発生するよ！
      </p>
      <div className="space-y-4 overflow-y-auto flex-grow pr-2">
        {SYNERGIES.map((synergy) => (
          <SynergyItem 
            key={synergy.id} 
            synergy={synergy}
            isUnlocked={isSynergyUnlocked(synergy)}
            businessNameMap={businessNameMap}
            businessLevelMap={businessLevelMap}
          />
        ))}
      </div>
    </div>
  );
};

export default SynergiesPanel;