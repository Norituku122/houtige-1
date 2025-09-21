import React from 'react';
import type { EventLogEntry } from '../types';

interface EventLogProps {
  events: EventLogEntry[];
}

const EventLog: React.FC<EventLogProps> = ({ events }) => {
  const getEventStyle = (type: EventLogEntry['type']) => {
    switch (type) {
      case 'positive':
        return {
          borderColor: '#f9a8d4', // pink-300
          icon: 'fas fa-wand-magic-sparkles',
          iconColor: 'text-pink-400',
        };
      case 'negative':
        return {
          borderColor: '#cbd5e1', // slate-300
          icon: 'fas fa-triangle-exclamation',
          iconColor: 'text-slate-500',
        };
      case 'opportunity':
        return {
          borderColor: '#c4b5fd', // violet-300
          icon: 'fas fa-circle-question',
          iconColor: 'text-violet-500',
        };
      case 'default':
      default:
        return {
          borderColor: '#f9a8d4', // pink-300
          icon: 'fas fa-sparkles',
          iconColor: 'text-pink-400',
        };
    }
  };

  return (
    <div className="bg-white/60 backdrop-blur-lg p-4 sm:p-6 rounded-b-2xl shadow-lg border-x border-b border-white/80 flex-grow flex flex-col h-full">
      <h2 className="text-xl font-bold mb-4 text-purple-700 border-b-2 border-purple-300/50 pb-2">
        <i className="fas fa-book-sparkles mr-3 text-violet-400"></i>できごとログ
      </h2>
      <ul className="space-y-3 overflow-y-auto flex-grow text-sm pr-2">
        {[...events].reverse().map((event, index) => {
          const style = getEventStyle(event.type);
          return (
            <li 
              key={index} 
              className="bg-white/70 p-3 rounded-lg border-l-4 animate-fade-in text-slate-700"
              style={{ borderColor: style.borderColor }}
            >
              <i className={`${style.icon} ${style.iconColor} mr-3`}></i>
              {event.text}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default EventLog;