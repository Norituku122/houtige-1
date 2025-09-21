// This file provides local, mechanical game logic.
// It was previously named geminiService.ts but has been refactored.
import { INTERACTIVE_EVENTS } from '../data/interactiveEvents';
import { EXPLORATION_SCENARIOS } from '../data/explorationScenarios';
import { ADVISOR_TIPS } from '../data/advisorTips';
import { PLAN_FEEDBACK } from '../data/planFeedback';
import type { ExplorationResult, InteractiveEvent, Business, EventOption } from '../types';

// --- Utility Functions ---
const getRandomElement = <T>(arr: T[]): T => {
  return arr[Math.floor(Math.random() * arr.length)];
};

// --- Mechanical Game Logic ---

export const generateInteractiveEvent = (ownedBusinesses: Business[], totalIncome: number): InteractiveEvent | null => {
  if (ownedBusinesses.length === 0) return null;

  // An "active" business is one that is owned AND currently generating income.
  const activeBusinesses = ownedBusinesses.filter(b => b.incomePerSecond > 0);
  if (activeBusinesses.length === 0) return null;
  const activeBusinessMap = new Map(activeBusinesses.map(b => [b.id, b.level]));

  // An "owned" business map is still needed for level requirements, even if income is zero (e.g. sold app).
  const ownedBusinessLevelMap = new Map(ownedBusinesses.map(b => [b.id, b.level]));

  const triggerableEvents = INTERACTIVE_EVENTS.filter(event => {
    // 1. Check if player's income is high enough for this event
    if (event.minIncomeRequired && totalIncome < event.minIncomeRequired) {
      return false;
    }

    // 2. Check if business level requirement is met
    if (event.requiredBusinessLevel) {
      const currentLevel = ownedBusinessLevelMap.get(event.requiredBusinessLevel.businessId) ?? 0;
      if (currentLevel < event.requiredBusinessLevel.level) {
        return false; // Requirement not met
      }
    }
    
    // 3. Check if the event is relevant to any ACTIVE business.
    const isRelevant = event.options.some(option =>
      option.effects.some(effect => {
        if (effect.type === 'income_multiplier') {
          return activeBusinessMap.has(effect.businessId);
        }
        return true; // Money effects are always relevant.
      })
    );
    if (!isRelevant) {
      return false;
    }

    return true;
  });

  if (triggerableEvents.length === 0) {
    return null;
  }

  const chosenEvent = getRandomElement(triggerableEvents);
  
  // Deep copy to prevent mutation of original data
  const eventInstance = JSON.parse(JSON.stringify(chosenEvent));

  // Sanitize effects to ensure they only apply to ACTIVE businesses.
  eventInstance.options.forEach((option: EventOption) => {
    option.effects = option.effects.filter(effect => {
       if (effect.type === 'income_multiplier') {
          return activeBusinessMap.has(effect.businessId);
        }
        return true;
    });
  });

  return eventInstance;
};


export const getAdvisorResponse = (): string => {
  return getRandomElement(ADVISOR_TIPS);
};

export const generateExplorationEvent = (currentIncomePerSecond: number, minMultiplier: number, maxMultiplier: number): ExplorationResult => {
  const scenario = getRandomElement(EXPLORATION_SCENARIOS);
  const multiplier = Math.random() * (maxMultiplier - minMultiplier) + minMultiplier;
  const reward = currentIncomePerSecond * multiplier;
  
  return {
    scenario,
    reward,
  };
};

export const getBusinessPlanFeedback = (plan: string): string => {
  if (!plan.trim()) {
    return "プランが空っぽだよ！まずはあなたの夢を書いてみよう！";
  }
  return getRandomElement(PLAN_FEEDBACK);
};