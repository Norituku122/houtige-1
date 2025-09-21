import React from 'react';
import { formatCurrency } from '../types';
import { MIN_MONEY_FOR_RESET } from '../data/constants';

interface ResetPanelProps {
  onReset: () => void;
  sparksOnReset: number;
  totalMoneyEarned: number;
}

const ResetPanel: React.FC<ResetPanelProps> = ({ onReset, sparksOnReset, totalMoneyEarned }) => {
  const canReset = totalMoneyEarned >= MIN_MONEY_FOR_RESET;

  return (
    <div className="bg-white/60 backdrop-blur-lg p-4 sm:p-6 rounded-b-2xl shadow-lg border-x border-b border-white/80 flex-grow flex flex-col h-full">
      <h2 className="text-xl font-bold mb-4 text-purple-700 border-b-2 border-purple-300/50 pb-2">
        <i className="fas fa-recycle mr-3 text-violet-400"></i>リセット
      </h2>
      
      <div className="text-sm text-slate-600 space-y-3 mb-6">
        <p>
          進行状況をリセットして、「<i className="fas fa-sparkles text-yellow-500"></i>アイデアの煌めき」を獲得できます。
        </p>
        <p>
          獲得した煌めきと、ロードマップのアップグレードは<strong className="text-purple-700">永久に引き継がれます。</strong>
          リセットすると、次の周回がより速く、より有利になります！
        </p>
        <div className="bg-purple-100/80 p-3 rounded-lg border-l-4 border-purple-300">
          <p><strong className="font-bold">リセットされるもの:</strong> お金、事業レベル、実績など</p>
          <p><strong className="font-bold">引き継がれるもの:</strong> アイデアの煌めき、ロードマップ</p>
        </div>
      </div>
      
      <div className="text-center my-auto">
        <div className="bg-gradient-to-br from-yellow-50 to-amber-100 border-2 border-white rounded-2xl p-6 my-2 shadow-xl shadow-amber-200/70">
          <p className="text-amber-800 text-sm text-center font-semibold">今回のランで獲得できる煌めき:</p>
          <div className="mt-3 bg-white/50 rounded-xl p-4 text-center shadow-inner">
              <p className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-yellow-600 font-mono flex items-center justify-center gap-3 drop-shadow-lg">
                  <i className="fas fa-sparkles text-yellow-500"></i>
                  <span>{canReset ? sparksOnReset : 0}</span>
              </p>
          </div>
        </div>
        <p className="text-xs text-slate-400 mt-1">(合計獲得金額 {formatCurrency(totalMoneyEarned)} に基づく)</p>
      </div>

      <button
        onClick={onReset}
        disabled={!canReset}
        className="w-full mt-6 font-bold text-white transition-all duration-300 transform rounded-xl px-4 py-3 flex items-center justify-center
                   focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2
                   disabled:bg-slate-300 disabled:text-slate-500 disabled:cursor-not-allowed disabled:shadow-inner
                   bg-gradient-to-r from-red-500 to-orange-500 shadow-lg shadow-red-400/50
                   hover:enabled:shadow-xl hover:enabled:shadow-red-400/60 hover:enabled:-translate-y-0.5
                   active:enabled:scale-95 active:enabled:shadow-md"
      >
        <i className="fas fa-recycle mr-2"></i>進行状況をリセットする
      </button>
      {!canReset && (
        <p className="text-center text-xs text-slate-500 mt-2">
            リセットするには、合計獲得金額が {formatCurrency(MIN_MONEY_FOR_RESET)} 以上必要です。
        </p>
      )}
    </div>
  );
};

export default ResetPanel;