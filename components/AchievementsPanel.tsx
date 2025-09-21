import React, { useMemo } from 'react';
import type { Achievement } from '../types';
import AchievementItem from './AchievementItem';

interface AchievementsPanelProps {
  achievements: Achievement[];
}

const AchievementsPanel: React.FC<AchievementsPanelProps> = ({ achievements }) => {
  const groupedAchievements = useMemo(() => {
    return achievements.reduce((acc, ach) => {
      const category = ach.category || 'General';
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(ach);
      return acc;
    }, {} as Record<string, Achievement[]>);
  }, [achievements]);

  const categoryOrder: (keyof typeof groupedAchievements)[] = [
    'Money & Income', 
    'Business', 
    'Synergy', 
    'Roadmap', 
    'Game Features'
  ];

  return (
    <div className="bg-white/60 backdrop-blur-lg p-4 sm:p-6 rounded-b-2xl shadow-lg border-x border-b border-white/80 flex-grow flex flex-col h-full">
      <h2 className="text-xl font-bold mb-4 text-purple-700 border-b-2 border-purple-300/50 pb-2">
        <i className="fas fa-trophy mr-3 text-violet-400"></i>実績
      </h2>
      <div className="overflow-y-auto flex-grow pr-2">
        {categoryOrder.map(category => {
          const group = groupedAchievements[category];
          if (!group || group.length === 0) return null;
          return (
            <div key={category} className="mb-6">
              <h3 className="font-bold text-purple-600 mb-2 border-l-4 border-purple-300 pl-2">{category}</h3>
              <div className="space-y-3">
                {group.map((ach) => (
                  <AchievementItem key={ach.id} achievement={ach} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AchievementsPanel;