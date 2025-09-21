
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Business, InteractiveEvent, EventOption, Achievement, EventLogEntry, formatCurrency, ExplorationOption, Effect, RoadmapUpgrade, SaveData, Manager } from './types';
import { getAdvisorResponse, generateExplorationEvent, generateInteractiveEvent, getBusinessPlanFeedback } from './services/gameService';
import Header from './components/Header';
import BusinessList from './components/BusinessList';
import SidePanel from './components/SidePanel';
import EventModal from './components/EventModal';
import Toast from './components/Toast';
import ConfirmationModal from './components/ConfirmationModal';
import OfflineProgressModal from './components/OfflineProgressModal';
import { INITIAL_ACHIEVEMENTS } from './data/achievements';
import { SYNERGIES } from './data/synergies';
import { ROADMAP_UPGRADES } from './data/roadmapUpgrades';
import { MANAGERS, HIRE_COST } from './data/managers';
import { MIN_MONEY_FOR_RESET } from './data/constants';

const SAVE_KEY = 'idleIncSaveData_v2';
const GAME_VERSION = 2;

const INITIAL_BUSINESSES: Omit<Business, 'eventMultiplier' | 'totalMultiplier'>[] = [
    { id: 'lemonade', name: 'レモネードスタンド', level: 0, baseCost: 10, costMultiplier: 1.07, baseIncome: 1, incomePerSecond: 0, icon: 'fa-lemon' },
    { id: 'cookie', name: '手作りクッキー屋さん', level: 0, baseCost: 100, costMultiplier: 1.08, baseIncome: 8, incomePerSecond: 0, icon: 'fa-cookie-bite' },
    { id: 'blog', name: '個人ブログ', level: 0, baseCost: 1100, costMultiplier: 1.09, baseIncome: 45, incomePerSecond: 0, icon: 'fa-blog' },
    { id: 'general_store', name: 'オンライン雑貨屋さん', level: 0, baseCost: 12000, costMultiplier: 1.10, baseIncome: 250, incomePerSecond: 0, icon: 'fa-store' },
    { id: 'app', name: 'モバイルアプリ', level: 0, baseCost: 130000, costMultiplier: 1.11, baseIncome: 1400, incomePerSecond: 0, icon: 'fa-mobile-screen-button' },
    { id: 'saas', name: 'SaaSプラットフォーム', level: 0, baseCost: 1.4e6, costMultiplier: 1.12, baseIncome: 7800, incomePerSecond: 0, icon: 'fa-server' },
    { id: 'ai_cafe', name: 'AIペットカフェ', level: 0, baseCost: 2e7, costMultiplier: 1.13, baseIncome: 44000, incomePerSecond: 0, icon: 'fa-robot' },
    { id: 'rocket', name: '民間ロケット事業', level: 0, baseCost: 3.3e8, costMultiplier: 1.14, baseIncome: 260000, incomePerSecond: 0, icon: 'fa-rocket' },
    { id: 'moon_resort', name: '月面リゾート開発', level: 0, baseCost: 5.1e9, costMultiplier: 1.15, baseIncome: 1.6e6, incomePerSecond: 0, icon: 'fa-moon' },
    { id: 'time_travel', name: '時間旅行エージェンシー', level: 0, baseCost: 7.5e10, costMultiplier: 1.16, baseIncome: 1e7, incomePerSecond: 0, icon: 'fa-clock-rotate-left' },
    { id: 'reality_studio', name: '仮想現実スタジオ', level: 0, baseCost: 1e12, costMultiplier: 1.17, baseIncome: 6.5e7, incomePerSecond: 0, icon: 'fa-vr-cardboard' },
    { id: 'interdimensional_market', name: '次元間マーケットプレイス', level: 0, baseCost: 1.2e13, costMultiplier: 1.18, baseIncome: 4.2e8, incomePerSecond: 0, icon: 'fa-atom' },
    { id: 'consciousness_upload', name: '宇宙意識アップロード事業', level: 0, baseCost: 1.5e14, costMultiplier: 1.19, baseIncome: 2.8e9, incomePerSecond: 0, icon: 'fa-brain' },
    { id: 'dyson_sphere', name: 'ダイソンスフィア建設', level: 0, baseCost: 2.5e15, costMultiplier: 1.20, baseIncome: 1.8e10, incomePerSecond: 0, icon: 'fa-sun' },
    { id: 'simulation_hypothesis', name: 'シミュレーション仮説検証', level: 0, baseCost: 4e16, costMultiplier: 1.21, baseIncome: 1.2e11, incomePerSecond: 0, icon: 'fa-infinity' },
    { id: 'omniverse_corp', name: '全宇宙管理公社', level: 0, baseCost: 6e17, costMultiplier: 1.22, baseIncome: 8e11, incomePerSecond: 0, icon: 'fa-sitemap' },
    { id: 'metaphysical_engineering', name: '形而上学エンジニアリング', level: 0, baseCost: 8e18, costMultiplier: 1.23, baseIncome: 5e12, incomePerSecond: 0, icon: 'fa-yin-yang' },
    { id: 'causality_brokerage', name: '因果律ブローカー', level: 0, baseCost: 1e20, costMultiplier: 1.24, baseIncome: 3e13, incomePerSecond: 0, icon: 'fa-timeline' },
    { id: 'author_ascension', name: '「作者」への昇天', level: 0, baseCost: 1e22, costMultiplier: 1.25, baseIncome: 2e14, incomePerSecond: 0, icon: 'fa-feather-pointed' },
];

const getInitialBusinesses = (): Business[] => 
  INITIAL_BUSINESSES.map(b => ({
    ...b,
    eventMultiplier: 1,
    totalMultiplier: 1,
}));

const getInitialAchievements = (): Achievement[] =>
  INITIAL_ACHIEVEMENTS.map(ach => ({
    ...ach,
    isUnlocked: false,
  }));

const EXPLORATION_OPTIONS: ExplorationOption[] = [
  { id: 'quick', name: 'クイックサーチ', description: '短い時間でさっとお宝を見つけるよ！', cooldown: 20, minMultiplier: 10, maxMultiplier: 40, icon: 'fa-stopwatch-20' },
  { id: 'normal', name: 'ノーマルサーチ', description: 'いつものお宝さがし。バランスの取れた探索。', cooldown: 60, minMultiplier: 30, maxMultiplier: 120, icon: 'fa-map-marked-alt' },
  { id: 'deep', name: 'ディープサーチ', description: 'じっくり時間をかけて、伝説級のお宝を探しに行こう！', cooldown: 300, minMultiplier: 200, maxMultiplier: 500, icon: 'fa-gem' },
];

const App: React.FC = () => {
  // Run-specific state
  const [money, setMoney] = useState<number>(10);
  const [businesses, setBusinesses] = useState<Business[]>(getInitialBusinesses());
  const [events, setEvents] = useState<EventLogEntry[]>([{ text: 'ゲーム開始！最初の事業を購入しよう。', type: 'default' }]);
  const [totalMoneyEarned, setTotalMoneyEarned] = useState<number>(0);
  const [explorationCooldown, setExplorationCooldown] = useState<number>(0);
  const [achievements, setAchievements] = useState<Achievement[]>(getInitialAchievements());
  const [eventsHandled, setEventsHandled] = useState<number>(0);
  const [advisorRequests, setAdvisorRequests] = useState<number>(0);
  
  // Persistent state (meta-progression)
  const [ideaSparks, setIdeaSparks] = useState<number>(0);
  const [purchasedUpgrades, setPurchasedUpgrades] = useState<string[]>([]);
  const [hiredManagers, setHiredManagers] = useState<Manager[]>([]);

  // UI/Transient State
  const [advisorResponse, setAdvisorResponse] = useState<string>('なんでも聞いてね！あなたのビジネスの味方だよ✨');
  const [isAdvisorLoading, setIsAdvisorLoading] = useState<boolean>(false);
  const [explorationResult, setExplorationResult] = useState<string>('「お宝さがし」ボタンで、素敵なチャンスを見つけよう！');
  const [isExploring, setIsExploring] = useState<boolean>(false);
  const [activeCooldown, setActiveCooldown] = useState<number>(60);
  const [activeEvent, setActiveEvent] = useState<InteractiveEvent | null>(null);
  const [isEventLoading, setIsEventLoading] = useState<boolean>(false);
  const [businessPlan, setBusinessPlan] = useState<string>('');
  const [planFeedback, setPlanFeedback] = useState<string>('あなたの素敵な夢のプランを教えて！');
  const [isPlanFeedbackLoading, setIsPlanFeedbackLoading] = useState<boolean>(false);
  const [activeToast, setActiveToast] = useState<Achievement | null>(null);
  const [sparksOnReset, setSparksOnReset] = useState<number>(0);
  const [isResetModalOpen, setIsResetModalOpen] = useState<boolean>(false);
  const [isHardResetModalOpen, setIsHardResetModalOpen] = useState<boolean>(false);
  const [offlineProgress, setOfflineProgress] = useState<{ timeAway: number; moneyEarned: number } | null>(null);
  const [bulkBuyAmount, setBulkBuyAmount] = useState<1 | 10 | 100 | 'MAX'>(1);

  // --- Derived State ---
  const managedBusinessIds = useMemo(() => new Set(hiredManagers.map(m => m.businessId)), [hiredManagers]);

  // --- Roadmap Upgrade Effects ---
  const { 
    globalIncomeMultiplier, 
    synergyBonusMultiplier, 
    costReductionMultiplier,
    isBulkBuyUnlocked,
    isAutoBuyerUnlocked,
    isManagerSystemUnlocked,
    managerCostReduction,
    managerBonusMultiplier,
  } = useMemo(() => {
    const effects = {
      globalIncomeMultiplier: 1,
      synergyBonusMultiplier: 1,
      costReductionMultiplier: 1,
      isBulkBuyUnlocked: false,
      isAutoBuyerUnlocked: false,
      isManagerSystemUnlocked: false,
      managerCostReduction: 1,
      managerBonusMultiplier: 1,
    };
    purchasedUpgrades.forEach(upgradeId => {
      const upgrade = ROADMAP_UPGRADES.find(u => u.id === upgradeId);
      if (upgrade && upgrade.effect) {
        switch (upgrade.effect.type) {
          case 'GLOBAL_INCOME_MULTIPLIER':
            effects.globalIncomeMultiplier *= upgrade.effect.value!;
            break;
          case 'SYNERGY_BONUS_MULTIPLIER':
            effects.synergyBonusMultiplier *= upgrade.effect.value!;
            break;
          case 'GLOBAL_COST_REDUCTION':
            effects.costReductionMultiplier *= upgrade.effect.value!;
            break;
          case 'ENABLE_BULK_BUY':
            effects.isBulkBuyUnlocked = true;
            break;
          case 'ENABLE_AUTO_BUYER':
            effects.isAutoBuyerUnlocked = true;
            break;
          case 'ENABLE_MANAGERS':
            effects.isManagerSystemUnlocked = true;
            break;
          case 'MANAGER_COST_REDUCTION':
            effects.managerCostReduction *= upgrade.effect.value!;
            break;
          case 'MANAGER_BONUS_MULTIPLIER':
            effects.managerBonusMultiplier *= upgrade.effect.value!;
            break;
        }
      }
    });
    return effects;
  }, [purchasedUpgrades]);

  const totalIncomePerSecond = useMemo(() => {
    return businesses.reduce((total, biz) => total + biz.incomePerSecond, 0);
  }, [businesses]);
  
  // --- Reset Sparks Calculation ---
  useEffect(() => {
    if (totalMoneyEarned < MIN_MONEY_FOR_RESET) {
      setSparksOnReset(0);
      return;
    }
    const sparks = Math.floor(5 * Math.cbrt(totalMoneyEarned / MIN_MONEY_FOR_RESET));
    setSparksOnReset(sparks);
  }, [totalMoneyEarned]);

  // --- Centralized Income & Multiplier Calculation Effect (ADDITIVE) ---
  useEffect(() => {
    // Synergy Bonuses
    const businessLevelMap = new Map(businesses.map(b => [b.id, b.level]));
    const unlockedSynergies = SYNERGIES.filter(synergy =>
      synergy.requirements.every(req =>
        (businessLevelMap.get(req.businessId) || 0) >= req.level
      )
    );
    const synergyBonuses = new Map<string, number>();
    businesses.forEach(b => synergyBonuses.set(b.id, 0));
    unlockedSynergies.forEach(synergy => {
      synergy.bonuses.forEach(bonus => {
        const currentBonus = synergyBonuses.get(bonus.businessId) || 0;
        const synergyEffect = (bonus.multiplier - 1) * synergyBonusMultiplier;
        synergyBonuses.set(bonus.businessId, currentBonus + synergyEffect);
      });
    });

    // Manager Bonuses
    const managerBonuses = new Map<string, number>();
     hiredManagers.forEach(manager => {
        const currentBonus = managerBonuses.get(manager.businessId) || 0;
        const managerEffect = (manager.bonusMultiplier - 1) * manager.level * managerBonusMultiplier; 
        managerBonuses.set(manager.businessId, currentBonus + managerEffect);
    });


    let hasChanges = false;
    const newBusinesses = businesses.map(biz => {
      const synergyBonus = synergyBonuses.get(biz.id) || 0;
      const managerBonus = managerBonuses.get(biz.id) || 0;
      const eventBonus = biz.eventMultiplier - 1;
      
      const totalMultiplier = 1 + synergyBonus + eventBonus + managerBonus;
      const newIncomePerSecond = biz.baseIncome * biz.level * totalMultiplier * globalIncomeMultiplier;

      if (newIncomePerSecond !== biz.incomePerSecond || totalMultiplier !== biz.totalMultiplier) {
        hasChanges = true;
      }

      return {
        ...biz,
        incomePerSecond: newIncomePerSecond,
        totalMultiplier: totalMultiplier,
      };
    });

    if (hasChanges) {
      setBusinesses(newBusinesses);
    }
  }, [businesses, hiredManagers, globalIncomeMultiplier, synergyBonusMultiplier, managerBonusMultiplier]);
  // --- End Calculation ---
  
  // --- Save & Load System ---
  const loadGame = useCallback(() => {
    const savedDataString = localStorage.getItem(SAVE_KEY);
    if (savedDataString) {
        try {
            const savedData: SaveData = JSON.parse(savedDataString);

            if (savedData.version !== GAME_VERSION) {
                console.warn(`Save data version mismatch. Expected ${GAME_VERSION}, found ${savedData.version}. Data might be inconsistent.`);
                 // Here you could add migration logic if needed in the future
            }
            
            // --- Rehydration Step ---
            // Safely apply saved progress to the master data templates.
            const rehydratedAchievements = getInitialAchievements().map(templateAch => {
                const savedAch = savedData.achievements.find(sa => sa.id === templateAch.id);
                return { ...templateAch, isUnlocked: savedAch ? savedAch.isUnlocked : false };
            });

            const rehydratedManagers = (savedData.hiredManagers || [])
                .map(savedManager => {
                    const templateManager = MANAGERS.find(m => m.id === savedManager.id);
                    if (!templateManager) return null; // Manager no longer exists in game data
                    return { ...templateManager, level: savedManager.level };
                })
                .filter((m): m is Manager => m !== null);
            
            const rehydratedBusinesses = getInitialBusinesses().map(templateBiz => {
                const savedBiz = savedData.businesses.find(sb => sb.id === templateBiz.id);
                return savedBiz ? { ...templateBiz, level: savedBiz.level, eventMultiplier: savedBiz.eventMultiplier } : templateBiz;
            });

            const loadedUpgrades = (savedData.purchasedUpgrades || []).filter(id => ROADMAP_UPGRADES.some(u => u.id === id));


            // --- Offline Progress Calculation Step ---
            // Temporarily calculate effects based on loaded data to get accurate offline income.
            const tempEffects = { globalIncomeMultiplier: 1, synergyBonusMultiplier: 1, managerBonusMultiplier: 1 };
            loadedUpgrades.forEach(upgradeId => {
                const upgrade = ROADMAP_UPGRADES.find(u => u.id === upgradeId);
                if (upgrade?.effect) {
                    if (upgrade.effect.type === 'GLOBAL_INCOME_MULTIPLIER') tempEffects.globalIncomeMultiplier *= upgrade.effect.value!;
                    if (upgrade.effect.type === 'SYNERGY_BONUS_MULTIPLIER') tempEffects.synergyBonusMultiplier *= upgrade.effect.value!;
                    if (upgrade.effect.type === 'MANAGER_BONUS_MULTIPLIER') tempEffects.managerBonusMultiplier *= upgrade.effect.value!;
                }
            });

            // Calculate offline income based on rehydrated data
            const managerBonuses = new Map<string, number>();
            rehydratedManagers.forEach(manager => {
                const currentBonus = managerBonuses.get(manager.businessId) || 0;
                managerBonuses.set(manager.businessId, currentBonus + ((manager.bonusMultiplier - 1) * manager.level * tempEffects.managerBonusMultiplier));
            });
            const businessLevelMap = new Map(rehydratedBusinesses.map(b => [b.id, b.level]));
            const unlockedSynergies = SYNERGIES.filter(synergy =>
                synergy.requirements.every(req => (businessLevelMap.get(req.businessId) || 0) >= req.level)
            );
            const synergyBonuses = new Map<string, number>();
            rehydratedBusinesses.forEach(b => synergyBonuses.set(b.id, 0));
            unlockedSynergies.forEach(synergy => {
                synergy.bonuses.forEach(bonus => {
                    const currentBonus = synergyBonuses.get(bonus.businessId) || 0;
                    synergyBonuses.set(bonus.businessId, currentBonus + ((bonus.multiplier - 1) * tempEffects.synergyBonusMultiplier));
                });
            });

            const offlineIncomePerSecond = rehydratedBusinesses.reduce((total, biz) => {
                const totalMultiplier = 1 + (synergyBonuses.get(biz.id) || 0) + (managerBonuses.get(biz.id) || 0) + (biz.eventMultiplier - 1);
                return total + (biz.baseIncome * biz.level * totalMultiplier * tempEffects.globalIncomeMultiplier);
            }, 0);
            
            const now = Date.now();
            const timeOfflineInSeconds = (now - savedData.lastSaveTimestamp) / 1000;
            const moneyEarnedOffline = offlineIncomePerSecond > 0 ? Math.max(0, offlineIncomePerSecond * timeOfflineInSeconds) : 0;

            // --- Set State Step ---
            // Set all game state from the rehydrated and calculated data.
            setIdeaSparks(savedData.ideaSparks);
            setPurchasedUpgrades(loadedUpgrades);
            setHiredManagers(rehydratedManagers);
            setMoney(savedData.money + moneyEarnedOffline);
            setBusinesses(rehydratedBusinesses);
            setTotalMoneyEarned(savedData.totalMoneyEarned + moneyEarnedOffline);
            setAchievements(rehydratedAchievements);
            setEventsHandled(savedData.eventsHandled);
            setAdvisorRequests(savedData.advisorRequests);
            setBulkBuyAmount(savedData.bulkBuyAmount || 1);
            
            if(moneyEarnedOffline > 1) {
                setOfflineProgress({ timeAway: timeOfflineInSeconds, moneyEarned: moneyEarnedOffline });
            }
        } catch (e) {
            console.error("Failed to load or rehydrate game data:", e);
        }
    }
  }, []);

  useEffect(() => {
    loadGame();
  }, [loadGame]);

  useEffect(() => {
    const saveGame = () => {
      const saveData: SaveData = {
        version: GAME_VERSION,
        money,
        businesses: businesses.map(({id, level, eventMultiplier}) => ({id, level, eventMultiplier})),
        totalMoneyEarned,
        achievements: achievements.map(({id, isUnlocked}) => ({id, isUnlocked})),
        eventsHandled,
        advisorRequests,
        ideaSparks,
        purchasedUpgrades,
        hiredManagers: hiredManagers.map(({id, level}) => ({id, level})),
        lastSaveTimestamp: Date.now(),
        bulkBuyAmount,
      };
      localStorage.setItem(SAVE_KEY, JSON.stringify(saveData));
    };

    const saveInterval = setInterval(saveGame, 15000);
    return () => clearInterval(saveInterval);
  }, [money, businesses, totalMoneyEarned, achievements, eventsHandled, advisorRequests, ideaSparks, purchasedUpgrades, hiredManagers, bulkBuyAmount]);
  // --- End Save & Load ---
  
  // --- Auto Buyer Effect ---
  useEffect(() => {
    if (!isAutoBuyerUnlocked) return;
    
    const autoBuyInterval = setInterval(() => {
      let cheapestBusiness: Business | null = null;
      let minCost = Infinity;

      businesses.forEach(biz => {
        if (biz.level > 0 || biz.id === 'lemonade') { // Consider owned or first business
          const cost = biz.baseCost * Math.pow(biz.costMultiplier, biz.level) * costReductionMultiplier;
          if (cost < minCost) {
            minCost = cost;
            cheapestBusiness = biz;
          }
        }
      });
      
      if (cheapestBusiness && money >= minCost) {
        handleUpgrade(cheapestBusiness.id, 1);
      }
    }, 2000); // every 2 seconds

    return () => clearInterval(autoBuyInterval);

  }, [isAutoBuyerUnlocked, businesses, money, costReductionMultiplier]);


  const showToast = (achievement: Achievement) => {
    setActiveToast(achievement);
  };

  const checkAchievements = useCallback(() => {
    const stats = { money, totalMoneyEarned, incomePerSecond: totalIncomePerSecond, businesses, eventsHandled, advisorRequests, purchasedUpgrades, hiredManagers };
    let achievementsUpdated = false;

    setAchievements(prevAchievements => {
      const newAchievements = [...prevAchievements];
      newAchievements.forEach(ach => {
        if (!ach.isUnlocked && ach.check(stats)) {
          ach.isUnlocked = true;
          achievementsUpdated = true;
          showToast(ach);
        }
      });
      return achievementsUpdated ? newAchievements : prevAchievements;
    });
  }, [money, totalMoneyEarned, totalIncomePerSecond, businesses, eventsHandled, advisorRequests, purchasedUpgrades, hiredManagers]);

  useEffect(() => {
    const gameLoop = setInterval(() => {
      const incomeThisTick = totalIncomePerSecond / 10;
      setMoney(prevMoney => prevMoney + incomeThisTick);
      setTotalMoneyEarned(prevTotal => prevTotal + incomeThisTick);
    }, 100);

    return () => clearInterval(gameLoop);
  }, [totalIncomePerSecond]);

  useEffect(() => {
    checkAchievements();
  }, [checkAchievements]);

  useEffect(() => {
    if (activeToast) {
      const timer = setTimeout(() => setActiveToast(null), 3500);
      return () => clearTimeout(timer);
    }
  }, [activeToast]);

  useEffect(() => {
    if (explorationCooldown > 0) {
        const timer = setTimeout(() => {
            setExplorationCooldown(prev => prev - 1);
        }, 1000);
        return () => clearTimeout(timer);
    }
  }, [explorationCooldown]);

  useEffect(() => {
    const triggerEvent = () => {
      if (activeEvent || isEventLoading || isExploring || isAdvisorLoading || isPlanFeedbackLoading) return;

      const ownedBusinesses = businesses.filter(b => b.level > 0);
      if (ownedBusinesses.length === 0) return;

      setIsEventLoading(true);
      setTimeout(() => {
        const event = generateInteractiveEvent(ownedBusinesses, totalIncomePerSecond);
        if (event) {
          setActiveEvent(event);
          setEvents(prev => [...prev, { text: `ハプニング発生！「${event.description.substring(0, 20)}...」`, type: 'opportunity' }]);
        }
        setIsEventLoading(false);
      }, 500);
    };

    const firstEventTimeout = setTimeout(triggerEvent, 1 * 60 * 1000); 
    const intervalId = setInterval(triggerEvent, 3 * 60 * 1000); 

    return () => {
      clearTimeout(firstEventTimeout);
      clearInterval(intervalId);
    };
  }, [businesses, activeEvent, isEventLoading, isExploring, isAdvisorLoading, isPlanFeedbackLoading, totalIncomePerSecond]);

  const handleUpgrade = (id: string, levelsToBuy: number | 'MAX') => {
    setBusinesses(prevBusinesses => {
      const business = prevBusinesses.find(b => b.id === id);
      if (!business) return prevBusinesses;
      
      let numLevels: number;
      let totalCost: number;
      const { baseCost, costMultiplier, level } = business;

      if (levelsToBuy === 'MAX') {
          const a = baseCost * Math.pow(costMultiplier, level) * costReductionMultiplier;
          const r = costMultiplier;
          if (r === 1) {
              numLevels = Math.floor(money / a);
          } else {
              const maxLevels = Math.floor(Math.log(money * (r - 1) / a + 1) / Math.log(r));
              numLevels = Math.max(0, maxLevels);
          }
      } else {
          numLevels = levelsToBuy;
      }

      if (numLevels === 0) return prevBusinesses;
      
      const r = costMultiplier;
      const a = baseCost * Math.pow(r, level) * costReductionMultiplier;
      if (r === 1) {
        totalCost = a * numLevels;
      } else {
        totalCost = a * (Math.pow(r, numLevels) - 1) / (r - 1);
      }

      if (money >= totalCost) {
        setMoney(prevMoney => prevMoney - totalCost);
        return prevBusinesses.map(b => 
          b.id === id ? { ...b, level: b.level + numLevels } : b
        );
      }
      return prevBusinesses;
    });
  };

  const handleAdvisorQuery = () => {
    setIsAdvisorLoading(true);
    setAdvisorResponse('');
    setTimeout(() => {
      const response = getAdvisorResponse();
      setAdvisorResponse(response);
      setAdvisorRequests(prev => prev + 1);
      setIsAdvisorLoading(false);
    }, 500);
  };
  
  const handleExploration = (option: ExplorationOption) => {
    if (isExploring || explorationCooldown > 0) return;

    setIsExploring(true);
    setExplorationResult('わくわく！何が見つかるかな...？');
    setTimeout(() => {
      const result = generateExplorationEvent(totalIncomePerSecond, option.minMultiplier, option.maxMultiplier);
      setMoney(prevMoney => prevMoney + result.reward);
      const formattedReward = formatCurrency(result.reward);
      const eventText = `${result.scenario} (+${formattedReward})`;
      setExplorationResult(eventText);
      setEvents(prev => [...prev, { text: `お宝さがし成功！ ${result.scenario}`, type: 'positive' }]);
      setExplorationCooldown(option.cooldown);
      setActiveCooldown(option.cooldown);
      setIsExploring(false);
    }, 800);
  };

  const handleEventChoice = (option: EventOption) => {
    let isOverallPositive = true;
    let tempBusinesses = [...businesses];
    let moneyChange = 0;

    option.effects.forEach((effect: Effect) => {
        if (effect.type === 'money') {
            moneyChange += effect.amount;
            if (effect.amount < 0) isOverallPositive = false;
        } else if (effect.type === 'income_multiplier') {
            tempBusinesses = tempBusinesses.map(biz => {
                if (biz.id === effect.businessId) {
                    if (effect.multiplier === 0) {
                        isOverallPositive = false; 
                        return { ...biz, baseIncome: 0 };
                    }
                    if (effect.multiplier < 1.0) isOverallPositive = false;
                    const bonus = effect.multiplier - 1;
                    return { ...biz, eventMultiplier: biz.eventMultiplier + bonus };
                }
                return biz;
            });
        }
    });
    
    setMoney(prev => prev + moneyChange);
    setBusinesses(tempBusinesses);

    const eventType = isOverallPositive ? 'positive' : 'negative';
    setEvents(prev => [...prev, { text: option.resultText, type: eventType }]);
    setEventsHandled(prev => prev + 1);
    setActiveEvent(null);
  };
  
  const handleGetPlanFeedback = () => {
    setIsPlanFeedbackLoading(true);
    setPlanFeedback('');
    setTimeout(() => {
      const response = getBusinessPlanFeedback(businessPlan);
      setPlanFeedback(response);
      setIsPlanFeedbackLoading(false);
    }, 600);
  };

  const handlePurchaseUpgrade = (upgradeId: string) => {
    const upgrade = ROADMAP_UPGRADES.find(u => u.id === upgradeId);
    if (!upgrade || purchasedUpgrades.includes(upgradeId) || ideaSparks < upgrade.cost) {
      return;
    }
    setIdeaSparks(prev => prev - upgrade.cost);
    setPurchasedUpgrades(prev => [...prev, upgradeId]);
  };
  
  const handleHireManager = () => {
    if(ideaSparks < HIRE_COST || hiredManagers.length >= MANAGERS.length) return;
    
    setIdeaSparks(prev => prev - HIRE_COST);
    
    const availableManagers = MANAGERS.filter(m => !hiredManagers.some(hm => hm.id === m.id));
    if (availableManagers.length > 0) {
        const newManager = availableManagers[Math.floor(Math.random() * availableManagers.length)];
        setHiredManagers(prev => [...prev, {...newManager, level: 1}]);
    }
  };
  
  const handleLevelUpManager = (managerId: string) => {
    setHiredManagers(prevManagers => {
      const manager = prevManagers.find(m => m.id === managerId);
      if (!manager) return prevManagers;
      
      const cost = manager.baseLevelUpCost * Math.pow(manager.costMultiplier, manager.level - 1) * managerCostReduction;
      
      if (ideaSparks >= cost) {
        setIdeaSparks(prev => prev - cost);
        return prevManagers.map(m => m.id === managerId ? {...m, level: m.level + 1} : m);
      }
      return prevManagers;
    });
  };

  const handleReset = () => {
    if (sparksOnReset <= 0) return;
    const newIdeaSparks = ideaSparks + sparksOnReset;
    
    // Create a new save state that preserves permanent progress
    const newSaveData: SaveData = {
      version: GAME_VERSION,
      money: 10,
      businesses: getInitialBusinesses().map(({id, level, eventMultiplier}) => ({id, level, eventMultiplier})),
      totalMoneyEarned: 0,
      achievements: getInitialAchievements().map(({id, isUnlocked}) => ({id, isUnlocked})),
      eventsHandled: 0,
      advisorRequests: 0,
      ideaSparks: newIdeaSparks,
      purchasedUpgrades: purchasedUpgrades,
      hiredManagers: hiredManagers.map(({id, level}) => ({id, level})),
      lastSaveTimestamp: Date.now(),
      bulkBuyAmount: 1,
    };
    localStorage.setItem(SAVE_KEY, JSON.stringify(newSaveData));
    
    // Reload the page to apply the new save state cleanly
    window.location.reload();
  };

  const handleExportSave = () => {
    const saveData = localStorage.getItem(SAVE_KEY);
    if (saveData) {
      navigator.clipboard.writeText(saveData)
        .then(() => alert('セーブデータをクリップボードにコピーしました！'))
        .catch(err => alert('セーブデータのコピーに失敗しました。'));
    } else {
      alert('セーブデータが見つかりません。');
    }
  };

  const handleImportSave = (saveString: string) => {
    try {
      if (!saveString.trim()) {
        alert('セーブデータを入力してください。');
        return;
      }
      const data = JSON.parse(saveString);
      if (data && typeof data.money === 'number' && Array.isArray(data.businesses)) {
        localStorage.setItem(SAVE_KEY, saveString);
        window.location.reload();
      } else {
        throw new Error('Invalid save data format');
      }
    } catch (error) {
      alert('無効なセーブデータです。');
    }
  };
  
  const handleHardReset = () => {
      localStorage.removeItem(SAVE_KEY);
      window.location.reload();
  };

  return (
    <div className="min-h-screen flex flex-col p-4 sm:p-6 lg:p-8">
      <Toast achievement={activeToast} />
      {activeEvent && <EventModal event={activeEvent} onChoice={handleEventChoice} />}
      <ConfirmationModal
        isOpen={isResetModalOpen}
        onClose={() => setIsResetModalOpen(false)}
        onConfirm={handleReset}
        title="本当にリセットしますか？"
      >
        <p>現在の進行状況は失われますが、<strong className="text-yellow-500 font-bold">{sparksOnReset} <i className="fas fa-sparkles"></i></strong> のアイデアの煌めきを獲得します。</p>
        <p className="mt-2 text-sm text-slate-500">ロードマップのアップグレード、雇ったマネージャー、合計の煌めきは引き継がれます。</p>
      </ConfirmationModal>
      <ConfirmationModal
        isOpen={isHardResetModalOpen}
        onClose={() => setIsHardResetModalOpen(false)}
        onConfirm={handleHardReset}
        title="本当にすべてをリセットしますか？"
      >
        <p className="font-bold text-red-500">この操作は取り消せません！</p>
        <p className="mt-2">すべての進行状況（ロードマップ、マネージャー、アイデアの煌めきを含む）が完全に削除され、ゲームが最初の状態に戻ります。</p>
      </ConfirmationModal>
      {offlineProgress && (
        <OfflineProgressModal
            isOpen={true}
            onClose={() => setOfflineProgress(null)}
            timeAway={offlineProgress.timeAway}
            moneyEarned={offlineProgress.moneyEarned}
        />
      )}

      <Header money={money} moneyPerSecond={totalIncomePerSecond} ideaSparks={ideaSparks} />
      <main className="flex-grow grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
        <div className="lg:col-span-2">
          <BusinessList
            businesses={businesses}
            onUpgrade={handleUpgrade}
            playerMoney={money}
            costReductionMultiplier={costReductionMultiplier}
            explorationOptions={EXPLORATION_OPTIONS}
            onExplore={handleExploration}
            explorationResult={explorationResult}
            isExploring={isExploring}
            explorationCooldown={explorationCooldown}
            explorationTotalCooldown={activeCooldown}
            isBulkBuyUnlocked={isBulkBuyUnlocked}
            bulkBuyAmount={bulkBuyAmount}
            onSetBulkBuyAmount={setBulkBuyAmount}
            managedBusinessIds={managedBusinessIds}
          />
        </div>
        <div className="lg:col-span-1">
          <SidePanel
            events={events}
            advisorResponse={advisorResponse}
            onAdvisorQuery={handleAdvisorQuery}
            isAILoading={isAdvisorLoading}
            businessPlan={businessPlan}
            onPlanChange={setBusinessPlan}
            onGetPlanFeedback={handleGetPlanFeedback}
            planFeedback={planFeedback}
            isPlanFeedbackLoading={isPlanFeedbackLoading}
            achievements={achievements}
            businesses={businesses}
            ideaSparks={ideaSparks}
            purchasedUpgrades={purchasedUpgrades}
            onPurchaseUpgrade={handlePurchaseUpgrade}
            onReset={() => setIsResetModalOpen(true)}
            sparksOnReset={sparksOnReset}
            totalMoneyEarned={totalMoneyEarned}
            hiredManagers={hiredManagers}
            onHireManager={handleHireManager}
            onLevelUpManager={handleLevelUpManager}
            isManagerSystemUnlocked={isManagerSystemUnlocked}
            managerCostReduction={managerCostReduction}
            managerBonusMultiplier={managerBonusMultiplier}
            onExportSave={handleExportSave}
            onImportSave={handleImportSave}
            onHardReset={() => setIsHardResetModalOpen(true)}
          />
        </div>
      </main>
    </div>
  );
};

export default App;
