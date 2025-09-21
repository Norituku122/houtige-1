
export const formatCurrency = (amount: number): string => {
  if (amount < 1000) {
    return new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY', maximumFractionDigits: 0 }).format(Math.floor(amount));
  }
  const units = [
    { value: 1e42, symbol: 'TDc' }, { value: 1e39, symbol: 'DDc' },
    { value: 1e36, symbol: 'UDc' }, { value: 1e33, symbol: 'Dc' },
    { value: 1e30, symbol: 'No' }, { value: 1e27, symbol: 'Oc' },
    { value: 1e24, symbol: 'Sp' }, { value: 1e21, symbol: 'Sx' },
    { value: 1e18, symbol: 'Qi' }, { value: 1e15, symbol: 'Qa' },
    { value: 1e12, symbol: 'T' }, { value: 1e9, symbol: 'B' },
    { value: 1e6, symbol: 'M' }, { value: 1e3, symbol: 'K' },
  ];
  const unit = units.find(u => amount >= u.value);
  if (unit) {
    const value = Math.floor((amount / unit.value) * 10) / 10;
    const formattedValue = value.toLocaleString('ja-JP', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
    return `¥${formattedValue}${unit.symbol}`;
  }
  
  // Fallback for numbers larger than the largest defined unit
  return `¥${amount.toExponential(1)}`;
};

export interface Business {
  id: string;
  name: string;
  level: number;
  baseCost: number;
  costMultiplier: number;
  baseIncome: number;
  incomePerSecond: number;
  icon: string;
  eventMultiplier: number;
  totalMultiplier: number;
}

export interface ExplorationResult {
  scenario: string;
  reward: number;
}

// --- New Flexible Event Effect System ---
export interface MoneyEffect {
  type: 'money';
  amount: number; // Positive for reward, negative for fine
}

export interface IncomeMultiplierEffect {
  type: 'income_multiplier';
  businessId: string;
  multiplier: number;
}

export type Effect = MoneyEffect | IncomeMultiplierEffect;

export interface EventOption {
  text: string;
  resultText: string;
  effects: Effect[];
}
// --- End New System ---

export interface InteractiveEvent {
  description: string;
  options: EventOption[];
  requiredBusinessLevel?: {
    businessId: string;
    level: number;
  };
  minIncomeRequired?: number;
}

export type EventType = 'positive' | 'negative' | 'opportunity' | 'default';

export interface EventLogEntry {
  text: string;
  type: EventType;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  isUnlocked: boolean;
  category: 'Money & Income' | 'Business' | 'Synergy' | 'Roadmap' | 'Game Features';
  check: (stats: { 
    money: number; 
    totalMoneyEarned: number; 
    incomePerSecond: number; 
    businesses: Business[];
    eventsHandled: number;
    advisorRequests: number;
    purchasedUpgrades: string[];
    hiredManagers: Manager[];
  }) => boolean;
}

export interface ExplorationOption {
  id: string;
  name: string;
  description: string;
  cooldown: number;
  minMultiplier: number;
  maxMultiplier: number;
  icon: string;
}

// --- Synergy System Types ---
export interface SynergyRequirement {
  businessId: string;
  level: number;
}

export interface SynergyBonus {
  businessId: string;
  multiplier: number; // e.g., 1.1 for a 10% bonus
}

export interface Synergy {
  id: string;
  name: string;
  description: string;
  icon: string;
  requirements: SynergyRequirement[];
  bonuses: SynergyBonus[];
}

// --- Roadmap System Types ---
export type UpgradeEffectType = 
  | 'GLOBAL_INCOME_MULTIPLIER' 
  | 'SYNERGY_BONUS_MULTIPLIER' 
  | 'GLOBAL_COST_REDUCTION'
  | 'ENABLE_BULK_BUY'
  | 'ENABLE_AUTO_BUYER'
  | 'ENABLE_MANAGERS'
  | 'MANAGER_COST_REDUCTION'
  | 'MANAGER_BONUS_MULTIPLIER';

export interface UpgradeEffect {
    type: UpgradeEffectType;
    value?: number; // e.g., 1.05 for 5% increase, 0.95 for 5% reduction
}

export interface RoadmapUpgrade {
  id: string;
  name: string;
  description: string;
  cost: number; // in Idea Sparks
  effect: UpgradeEffect;
  icon: string;
}

// --- Manager System Types ---
export interface Manager {
  id: string;
  name: string;
  description: string;
  businessId: string;
  bonusMultiplier: number; // e.g., 1.1 for 10%
  icon: string;
  level: number;
  baseLevelUpCost: number;
  costMultiplier: number;
}

// --- Save/Load System Type ---
export interface SaveData {
  version: number;
  money: number;
  businesses: { id: string, level: number, eventMultiplier: number }[];
  totalMoneyEarned: number;
  achievements: { id: string, isUnlocked: boolean }[];
  eventsHandled: number;
  advisorRequests: number;
  ideaSparks: number;
  purchasedUpgrades: string[];
  lastSaveTimestamp: number;
  bulkBuyAmount: 1 | 10 | 100 | 'MAX';
  hiredManagers: {id: string, level: number}[];
}
