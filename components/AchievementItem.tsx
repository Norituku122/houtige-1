import React from 'react';
import type { Achievement } from '../types';

interface AchievementItemProps {
  achievement: Achievement;
}

const AchievementItem: React.FC<AchievementItemProps> = ({ achievement }) => {
  const isUnlocked = achievement.isUnlocked;

  return (
    <div 
      className={`p-3 rounded-lg flex items-start gap-4 transition-all duration-300 ${
        isUnlocked 
        ? 'bg-yellow-50/80 border-l-4 border-yellow-300' 
        : 'bg-slate-50/70 border-l-4 border-slate-200 opacity-70'
      }`}
    >
      <div className="flex-shrink-0 mt-1">
        {isUnlocked ? (
          <i className="fas fa-trophy text-yellow-500 text-xl"></i>
        ) : (
          <i className="fas fa-lock text-slate-400 text-xl"></i>
        )}
      </div>
      <div>
        <h3 className={`font-bold ${isUnlocked ? 'text-yellow-800' : 'text-slate-600'}`}>
          {achievement.title}
        </h3>
        <p className={`text-sm ${isUnlocked ? 'text-yellow-700/80' : 'text-slate-500'}`}>
          {achievement.description}
        </p>
      </div>
    </div>
  );
};

export default AchievementItem;
