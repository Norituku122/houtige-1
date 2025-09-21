import React from 'react';
import type { InteractiveEvent, EventOption } from '../types';

interface EventModalProps {
  event: InteractiveEvent;
  onChoice: (option: EventOption) => void;
}

const EventModal: React.FC<EventModalProps> = ({ event, onChoice }) => {
  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div 
        className="bg-white/90 border-2 border-purple-300 rounded-3xl shadow-2xl p-6 max-w-lg w-full animate-pop-in"
        style={{ boxShadow: '0 8px 30px rgba(209, 196, 233, 0.7)' }}
      >
        <h2 className="text-2xl font-bold mb-4 text-purple-700">
            <i className="fas fa-wand-magic-sparkles mr-3 text-violet-400"></i>ハプニング発生！
        </h2>
        <p className="text-slate-600 mb-6">{event.description}</p>
        <div className="flex flex-col gap-3">
          {event.options.map((option, index) => (
            <button
              key={index}
              onClick={() => onChoice(option)}
              className="w-full px-4 py-3 rounded-xl font-bold text-white transition-all duration-300 transform
                         focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-offset-2
                         bg-gradient-to-r from-pink-500 to-purple-600 shadow-lg shadow-pink-400/50
                         hover:shadow-xl hover:shadow-pink-400/60 hover:-translate-y-0.5
                         active:scale-95 active:shadow-md"
            >
              {option.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventModal;