import React, { useState, useEffect } from 'react';
import type { Achievement } from '../types';

interface ToastProps {
  achievement: Achievement | null;
}

const Toast: React.FC<ToastProps> = ({ achievement }) => {
  const [isExiting, setIsExiting] = useState(false);
  const [currentAchievement, setCurrentAchievement] = useState<Achievement | null>(null);

  useEffect(() => {
    // When a new achievement prop comes in, show the toast and reset exit state
    if (achievement) {
      setCurrentAchievement(achievement);
      setIsExiting(false);
    } 
    // When the achievement prop becomes null but we are still showing one, start the exit animation
    else if (!achievement && currentAchievement) {
      setIsExiting(true);
    }
  }, [achievement, currentAchievement]);

  useEffect(() => {
    if (isExiting) {
      const exitTimer = setTimeout(() => {
        // After the animation, nullify the current achievement to unmount the component
        setCurrentAchievement(null);
      }, 500); // This duration must match the exit animation duration

      return () => clearTimeout(exitTimer);
    }
  }, [isExiting]);

  if (!currentAchievement) {
    return null;
  }

  // Apply the correct animation class based on the state
  const animationClass = isExiting ? 'animate-fade-out-up' : 'animate-slide-in-bounce';

  return (
    <div className={`fixed top-5 left-1/2 z-[100] ${animationClass}`}>
      <div 
        className="bg-white/80 backdrop-blur-lg rounded-full px-6 py-3 shadow-lg border border-white/80 flex items-center gap-4" 
        style={{ boxShadow: 'var(--pink-shadow)' }}
      >
        <p className="font-bold text-pink-500 flex items-center gap-3">
          <i className="fas fa-trophy text-yellow-400"></i>
          {currentAchievement.icon && <i className={`fas ${currentAchievement.icon} text-purple-400`}></i>}
          <span>実績解除: {currentAchievement.title}</span>
        </p>
      </div>
    </div>
  );
};

export default Toast;