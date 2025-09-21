import React from 'react';
import { formatCurrency } from '../types';

interface OfflineProgressModalProps {
  isOpen: boolean;
  onClose: () => void;
  timeAway: number; // in seconds
  moneyEarned: number;
}

const formatTime = (seconds: number) => {
    if (seconds < 60) return `${Math.floor(seconds)}秒`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)}分`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}時間`;
    return `${Math.floor(seconds / 86400)}日`;
};


const OfflineProgressModal: React.FC<OfflineProgressModalProps> = ({ isOpen, onClose, timeAway, moneyEarned }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div 
        className="bg-white/90 border-2 border-purple-300 rounded-3xl shadow-2xl p-6 max-w-lg w-full animate-pop-in text-center"
        style={{ boxShadow: '0 8px 30px rgba(209, 196, 233, 0.7)' }}
      >
        <h2 className="text-2xl font-bold mb-4 text-purple-700">
            <i className="fas fa-hand-sparkles mr-3 text-pink-400"></i>おかえりなさい！
        </h2>
        <p className="text-slate-600 mb-2">
            あなたが離れている <strong className="text-purple-600">{formatTime(timeAway)}</strong> の間に…
        </p>
        <p className="text-3xl font-bold text-pink-600 my-4">
            {formatCurrency(moneyEarned)}
        </p>
        <p className="text-slate-600 mb-6">
            のお金を稼ぎました！
        </p>
        <button
            onClick={onClose}
            className="w-full max-w-xs mx-auto px-4 py-3 rounded-xl font-bold text-white transition-all duration-300 transform
                        focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-offset-2
                        bg-gradient-to-r from-pink-500 to-purple-600 shadow-lg shadow-pink-400/50
                        hover:shadow-xl hover:shadow-pink-400/60 hover:-translate-y-0.5
                        active:scale-95 active:shadow-md"
        >
            やったね！
        </button>
      </div>
    </div>
  );
};

export default OfflineProgressModal;