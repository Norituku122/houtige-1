import React from 'react';
import LoadingSpinner from './LoadingSpinner';

interface AdvisorPanelProps {
  onQuery: () => void;
  response: string;
  isLoading: boolean;
}

const AdvisorPanel: React.FC<AdvisorPanelProps> = ({ onQuery, response, isLoading }) => {

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onQuery();
  };

  return (
    <div className="bg-white/60 backdrop-blur-lg p-4 sm:p-6 rounded-b-2xl shadow-lg border-x border-b border-white/80 flex-grow flex flex-col h-full">
      <h2 className="text-xl font-bold mb-4 text-purple-700 border-b-2 border-purple-300/50 pb-2">
        <i className="fas fa-hand-holding-heart mr-3 text-violet-400"></i>AIともだち
      </h2>
      <div className="bg-purple-50/80 p-4 rounded-lg flex-grow min-h-[120px] mb-4 text-slate-600 italic flex items-center justify-center border border-purple-200">
        {isLoading ? <LoadingSpinner /> : <p className="text-center">"{response}"</p>}
      </div>
      <form onSubmit={handleSubmit}>
        <button
          type="submit"
          className="w-full font-bold text-white transition-all duration-300 transform rounded-xl px-4 py-3 flex items-center justify-center
                     focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-offset-2
                     disabled:bg-slate-300 disabled:text-slate-500 disabled:cursor-not-allowed disabled:shadow-inner
                     bg-gradient-to-r from-pink-500 to-purple-600 shadow-lg shadow-pink-400/50
                     hover:enabled:shadow-xl hover:enabled:shadow-pink-400/60 hover:enabled:-translate-y-0.5
                     active:enabled:scale-95 active:enabled:shadow-md"
          disabled={isLoading}
        >
          {isLoading ? <LoadingSpinner /> : <><i className="fas fa-magic-sparkles mr-2"></i>アドバイスを貰う</>}
        </button>
      </form>
    </div>
  );
};

export default AdvisorPanel;