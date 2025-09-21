
import React, { useState } from 'react';
import EventLog from './EventLog';
import AdvisorPanel from './AdvisorPanel';
import BusinessPlan from './BusinessPlan';
import AchievementsPanel from './AchievementsPanel';
import SynergiesPanel from './SynergiesPanel';
import RoadmapPanel from './RoadmapPanel';
import ResetPanel from './ResetPanel';
import ManagersPanel from './ManagersPanel';
import SettingsPanel from './SettingsPanel';
import type { Achievement, EventLogEntry, Business, Manager } from '../types';

interface SidePanelProps {
  events: EventLogEntry[];
  advisorResponse: string;
  onAdvisorQuery: () => void;
  isAILoading: boolean;
  businessPlan: string;
  onPlanChange: (plan: string) => void;
  onGetPlanFeedback: () => void;
  planFeedback: string;
  isPlanFeedbackLoading: boolean;
  achievements: Achievement[];
  businesses: Business[];
  ideaSparks: number;
  purchasedUpgrades: string[];
  onPurchaseUpgrade: (upgradeId: string) => void;
  onReset: () => void;
  sparksOnReset: number;
  totalMoneyEarned: number;
  hiredManagers: Manager[];
  onHireManager: () => void;
  onLevelUpManager: (managerId: string) => void;
  isManagerSystemUnlocked: boolean;
  managerCostReduction: number;
  managerBonusMultiplier: number;
  onExportSave: () => void;
  onImportSave: (saveString: string) => void;
  onHardReset: () => void;
}

type ActiveTab = 'log' | 'advisor' | 'manager' | 'achievements' | 'synergy' | 'roadmap' | 'reset' | 'settings' | 'plan';

const SidePanel: React.FC<SidePanelProps> = (props) => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('log');

  const getTabClass = (tabName: ActiveTab) => {
    const isActive = activeTab === tabName;
    return `px-3 py-2 font-bold transition-all duration-300 text-xs sm:text-sm border-b-4 flex-grow text-center
      ${isActive 
        ? 'bg-white text-purple-800 border-pink-500' 
        : 'bg-transparent text-slate-600 hover:bg-white/60 hover:text-purple-700 border-transparent'
    }`;
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'log':
        return <EventLog events={props.events} />;
      case 'advisor':
        return (
          <AdvisorPanel 
            onQuery={props.onAdvisorQuery}
            response={props.advisorResponse}
            isLoading={props.isAILoading}
          />
        );
      case 'plan':
        return (
          <BusinessPlan
            plan={props.businessPlan}
            onPlanChange={props.onPlanChange}
            onGetFeedback={props.onGetPlanFeedback}
            feedback={props.planFeedback}
            isLoading={props.isPlanFeedbackLoading}
          />
        );
      case 'achievements':
        return <AchievementsPanel achievements={props.achievements} />;
      case 'synergy':
        return <SynergiesPanel businesses={props.businesses} />;
      case 'roadmap':
        return (
          <RoadmapPanel 
            ideaSparks={props.ideaSparks}
            purchasedUpgrades={props.purchasedUpgrades}
            onPurchase={props.onPurchaseUpgrade}
          />
        );
      case 'reset':
        return (
          <ResetPanel
            onReset={props.onReset}
            sparksOnReset={props.sparksOnReset}
            totalMoneyEarned={props.totalMoneyEarned}
          />
        );
       case 'manager':
        return (
          <ManagersPanel
            ideaSparks={props.ideaSparks}
            hiredManagers={props.hiredManagers}
            onHireManager={props.onHireManager}
            businesses={props.businesses}
            onLevelUpManager={props.onLevelUpManager}
            isManagerSystemUnlocked={props.isManagerSystemUnlocked}
            managerCostReduction={props.managerCostReduction}
            managerBonusMultiplier={props.managerBonusMultiplier}
          />
        );
      case 'settings':
        return (
            <SettingsPanel
                onExport={props.onExportSave}
                onImport={props.onImportSave}
                onHardReset={props.onHardReset}
            />
        );
      default:
        return null;
    }
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex flex-wrap rounded-t-2xl bg-purple-100/50 border-t border-x border-white/80">
        {/* Gameplay Tabs */}
        <button onClick={() => setActiveTab('log')} className={getTabClass('log') + ' rounded-tl-xl'}>イベント</button>
        <button onClick={() => setActiveTab('advisor')} className={getTabClass('advisor')}>AIともだち</button>
        <button onClick={() => setActiveTab('manager')} className={getTabClass('manager')}>マネージャー</button>
        <button onClick={() => setActiveTab('achievements')} className={getTabClass('achievements')}>実績</button>
        
        {/* Meta-Progression Tabs */}
        <button onClick={() => setActiveTab('synergy')} className={getTabClass('synergy')}>シナジー</button>
        <button onClick={() => setActiveTab('roadmap')} className={getTabClass('roadmap')}>ロードマップ</button>
        <button onClick={() => setActiveTab('reset')} className={getTabClass('reset')}>リセット</button>
        <button onClick={() => setActiveTab('settings')} className={getTabClass('settings') + ' rounded-tr-xl'}>設定</button>
      </div>
      <div className="flex-grow">
        {renderContent()}
      </div>
    </div>
  );
};

export default SidePanel;
