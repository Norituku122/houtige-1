import React from 'react';
import LoadingSpinner from './LoadingSpinner';

interface BusinessPlanProps {
  plan: string;
  onPlanChange: (newPlan: string) => void;
  onGetFeedback: () => void;
  feedback: string;
  isLoading: boolean;
}

const BusinessPlan: React.FC<BusinessPlanProps> = ({ plan, onPlanChange, onGetFeedback, feedback, isLoading }) => {
  return (
    <div className="bg-white/60 backdrop-blur-lg p-4 sm:p-6 rounded-b-2xl shadow-lg border-x border-b border-white/80 h-full flex flex-col">
      <h2 className="text-xl font-bold mb-4 text-purple-700 border-b-2 border-purple-300/50 pb-2">
        <i className="fas fa-pen-nib mr-3 text-violet-400"></i>ゆめプラン
      </h2>
      
      <p className="text-sm text-slate-500 mb-3">
        あなたの素敵な夢や目標を書き留めて、妖精のフィードバックをもらおう！
      </p>

      <textarea
        value={plan}
        onChange={(e) => onPlanChange(e.target.value)}
        placeholder="例: ブログを育てて、その収益でSaaSプラットフォームに投資するんだっ！"
        className="flex-grow bg-white/80 border border-purple-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400 text-slate-800 w-full resize-none mb-4 min-h-[150px] transition-shadow"
        style={{ boxShadow: 'focus:var(--lavender-shadow)'}}
        disabled={isLoading}
      />
      
      <button
        onClick={onGetFeedback}
        className="w-full font-bold text-white transition-all duration-300 transform rounded-xl px-4 py-3 flex items-center justify-center mb-4
                   focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-offset-2
                   disabled:bg-slate-300 disabled:text-slate-500 disabled:cursor-not-allowed disabled:shadow-inner
                   bg-gradient-to-r from-pink-500 to-purple-600 shadow-lg shadow-pink-400/50
                   hover:enabled:shadow-xl hover:enabled:shadow-pink-400/60 hover:enabled:-translate-y-0.5
                   active:enabled:scale-95 active:enabled:shadow-md"
        disabled={isLoading || !plan.trim()}
      >
        {isLoading ? <LoadingSpinner /> : <><i className="fas fa-lightbulb mr-2"></i>フィードバックを貰う</>}
      </button>

      <div className="bg-purple-50/80 border border-purple-200 p-4 rounded-lg flex-grow min-h-[120px] text-slate-600 italic flex items-center justify-center">
        {isLoading ? <LoadingSpinner /> : <p className="text-center">"{feedback}"</p>}
      </div>
    </div>
  );
};

export default BusinessPlan;