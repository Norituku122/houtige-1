
import React from 'react';
import type { Manager, Business } from '../types';
import ManagerItem from './ManagerItem';
import { HIRE_COST } from '../data/managers';

interface ManagersPanelProps {
  ideaSparks: number;
  hiredManagers: Manager[];
  onHireManager: () => void;
  businesses: Business[];
  onLevelUpManager: (managerId: string) => void;
  isManagerSystemUnlocked: boolean;
  managerCostReduction: number;
  managerBonusMultiplier: number;
}

const ManagersPanel: React.FC<ManagersPanelProps> = ({ 
    ideaSparks, 
    hiredManagers, 
    onHireManager, 
    businesses, 
    onLevelUpManager, 
    isManagerSystemUnlocked,
    managerCostReduction,
    managerBonusMultiplier
}) => {
  const businessNameMap = new Map(businesses.map(b => [b.id, b.name]));

  if (!isManagerSystemUnlocked) {
    return (
        <div className="bg-white/60 backdrop-blur-lg p-6 rounded-b-2xl shadow-lg border-x border-b border-white/80 h-full flex flex-col items-center justify-center text-center">
            <i className="fas fa-lock text-4xl text-slate-400 mb-4"></i>
            <h3 className="font-bold text-lg text-slate-600">マネージャーシステムはロックされています</h3>
            <p className="text-sm text-slate-500 mt-2">
                「ロードマップ」で<strong className="text-purple-600">人事部設立</strong>のアップグレードを購入すると、マネージャーを雇えるようになります。
            </p>
        </div>
    );
  }

  return (
    <div className="bg-white/60 backdrop-blur-lg p-4 sm:p-6 rounded-b-2xl shadow-lg border-x border-b border-white/80 flex-grow flex flex-col h-full">
      <h2 className="text-xl font-bold mb-4 text-purple-700 border-b-2 border-purple-300/50 pb-2">
        <i className="fas fa-users-cog mr-3 text-violet-400"></i>マネージャー
      </h2>
      <p className="text-sm text-slate-500 mb-4">
        「アイデアの煌めき」を使って、事業をブーストしてくれるユニークなマネージャーを雇ったり、レベルアップさせよう！
      </p>
      
      <button
        onClick={onHireManager}
        disabled={ideaSparks < HIRE_COST}
        className="w-full font-bold text-amber-900 bg-gradient-to-r from-amber-300 to-yellow-400 
                   shadow-lg shadow-yellow-300/60 transition-all duration-300 transform rounded-xl px-4 py-3 flex items-center justify-center mb-4
                   focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2
                   disabled:bg-slate-300 disabled:text-slate-500 disabled:cursor-not-allowed disabled:shadow-inner
                   hover:enabled:shadow-xl hover:enabled:shadow-yellow-300/80 hover:enabled:brightness-105 hover:enabled:-translate-y-0.5 
                   active:enabled:scale-95 active:enabled:brightness-95"
      >
        <i className="fas fa-sparkles mr-2"></i> {HIRE_COST} でマネージャーを雇う
      </button>

      <div className="space-y-4 overflow-y-auto flex-grow pr-2">
        {hiredManagers.length > 0 ? (
            hiredManagers.map((manager) => (
                <ManagerItem
                    key={manager.id}
                    manager={manager}
                    businessName={businessNameMap.get(manager.businessId) || '不明な事業'}
                    onLevelUp={onLevelUpManager}
                    ideaSparks={ideaSparks}
                    managerCostReduction={managerCostReduction}
                    managerBonusMultiplier={managerBonusMultiplier}
                />
            ))
        ) : (
            <div className="text-center text-slate-500 p-8 bg-slate-100/70 rounded-lg">
                <p>まだマネージャーがいません。</p>
            </div>
        )}
      </div>
    </div>
  );
};

export default ManagersPanel;
