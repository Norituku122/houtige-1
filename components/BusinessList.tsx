
import React from 'react';
import type { Business, ExplorationOption } from '../types';
import BusinessItem from './BusinessItem';
import LoadingSpinner from './LoadingSpinner';

type BulkBuyAmount = 1 | 10 | 100 | 'MAX';
interface BusinessListProps {
  businesses: Business[];
  onUpgrade: (id: string, amount: BulkBuyAmount) => void;
  playerMoney: number;
  costReductionMultiplier: number;
  explorationOptions: ExplorationOption[];
  onExplore: (option: ExplorationOption) => void;
  explorationResult: string;
  isExploring: boolean;
  explorationCooldown: number;
  explorationTotalCooldown: number;
  isBulkBuyUnlocked: boolean;
  bulkBuyAmount: BulkBuyAmount;
  onSetBulkBuyAmount: (amount: BulkBuyAmount) => void;
  managedBusinessIds: Set<string>;
}

const BusinessList: React.FC<BusinessListProps> = ({ 
  businesses, 
  onUpgrade, 
  playerMoney,
  costReductionMultiplier,
  explorationOptions,
  onExplore,
  explorationResult,
  isExploring,
  explorationCooldown,
  explorationTotalCooldown,
  isBulkBuyUnlocked,
  bulkBuyAmount,
  onSetBulkBuyAmount,
  managedBusinessIds
}) => {
  const isButtonDisabled = isExploring || explorationCooldown > 0;
  const cooldownProgress = explorationCooldown > 0 ? ((explorationTotalCooldown - explorationCooldown) / explorationTotalCooldown) * 100 : 0;
  
  const bulkBuyOptions: BulkBuyAmount[] = [1, 10, 100, 'MAX'];

  return (
    <div className="bg-white/60 backdrop-blur-lg p-4 sm:p-6 rounded-2xl shadow-lg border border-white/80 h-full flex flex-col">
      {/* Exploration Section */}
      <div className="flex-shrink-0">
        <h2 className="text-xl font-bold mb-4 text-purple-700 border-b-2 border-purple-300/50 pb-2">
          <i className="fas fa-map-location-dot mr-3 text-violet-400"></i>お宝さがし
        </h2>
        <div className="bg-purple-50/80 border border-purple-200 p-4 rounded-lg min-h-[80px] mb-4 text-slate-600 italic flex items-center justify-center">
          <p className="text-center">{explorationResult}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
          {explorationOptions.map(option => (
            <button
              key={option.id}
              onClick={() => onExplore(option)}
              disabled={isButtonDisabled}
              className={`
                p-3 rounded-xl transition-all duration-300 transform text-center border-2 group
                focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-offset-2
                ${!isButtonDisabled
                  ? `bg-white border-purple-200/90 shadow-lg shadow-purple-200/70
                     hover:border-pink-300 hover:shadow-xl hover:shadow-pink-300/60 hover:-translate-y-0.5
                     active:scale-95 active:shadow-md`
                  : `bg-slate-200/80 border-transparent cursor-not-allowed shadow-inner`
                }
              `}
            >
              <i className={`fas ${option.icon} text-2xl mb-1 ${!isButtonDisabled ? 'text-purple-500' : 'text-slate-400'}`}></i>
              <p className={`font-bold text-sm ${!isButtonDisabled ? 'text-purple-800' : 'text-slate-500'}`}>{option.name}</p>
              <p className={`text-xs ${!isButtonDisabled ? 'text-slate-500' : 'text-slate-400'}`}>{option.description}</p>
            </button>
          ))}
        </div>
        
        <div className="relative h-8 mb-4">
          {explorationCooldown > 0 && (
            <div className="w-full text-center">
              <span className="font-mono text-slate-500">クールダウン中... ({explorationCooldown}秒)</span>
              <div className="absolute bottom-0 left-0 w-full h-1.5 bg-slate-200 rounded-full overflow-hidden mt-2">
                <div className="h-full bg-gradient-to-r from-pink-400 to-purple-400 transition-all duration-1000 linear" style={{ width: `${cooldownProgress}%` }}></div>
              </div>
            </div>
          )}
          {isExploring && (
              <div className="flex justify-center items-center h-full">
                  <LoadingSpinner />
              </div>
          )}
        </div>
      </div>
      
      <div className="border-t-2 border-purple-200/50 mt-2 mb-6"></div>

      {/* Business Section */}
      <div className="flex-grow flex flex-col min-h-0">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-purple-700 border-b-2 border-purple-300/50 pb-2">
            <i className="fas fa-grip mr-3 text-violet-400"></i>マイアプリ
          </h2>
          {isBulkBuyUnlocked && (
             <div className="bg-purple-100/80 p-1 rounded-lg flex items-center space-x-1">
                {bulkBuyOptions.map(amount => (
                    <button
                        key={amount}
                        onClick={() => onSetBulkBuyAmount(amount)}
                        className={`px-3 py-1 text-xs font-bold rounded-md transition-colors ${
                            bulkBuyAmount === amount 
                                ? 'bg-white text-purple-700 shadow' 
                                : 'text-slate-500 hover:bg-white/50'
                        }`}
                    >
                        x{amount}
                    </button>
                ))}
             </div>
          )}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 overflow-y-auto flex-grow pr-2">
          {businesses.map(business => (
            <BusinessItem 
              key={business.id} 
              business={business} 
              onUpgrade={onUpgrade} 
              playerMoney={playerMoney}
              costReductionMultiplier={costReductionMultiplier}
              bulkBuyAmount={bulkBuyAmount}
              managedBusinessIds={managedBusinessIds}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BusinessList;
