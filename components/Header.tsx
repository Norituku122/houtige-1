import React from 'react';
import { formatCurrency } from '../types';

interface HeaderProps {
  money: number;
  moneyPerSecond: number;
  ideaSparks: number;
}

const CuteRobotMascot: React.FC = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline-block mr-2 drop-shadow-lg">
    <path d="M17 10.5V8C17 5.79086 15.2091 4 13 4H11C8.79086 4 7 5.79086 7 8V10.5C7 11.3284 6.32843 12 5.5 12C4.67157 12 4 11.3284 4 10.5V9" stroke="#c4b5fd" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M7 16V17C7 18.6569 8.34315 20 10 20H14C15.6569 20 17 18.6569 17 17V16" stroke="#c4b5fd" strokeWidth="1.5" strokeLinecap="round"/>
    <rect x="7" y="9" width="10" height="8" rx="2" fill="#f5f3ff" stroke="#c4b5fd" strokeWidth="1.5"/>
    <circle cx="10.5" cy="13.5" r="1" fill="#f9a8d4"/>
    <circle cx="13.5" cy="13.5" r="1" fill="#f9a8d4"/>
    <path d="M11 5L10 2.5" stroke="#c4b5fd" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);


const Header: React.FC<HeaderProps> = ({ money, moneyPerSecond, ideaSparks }) => {
  return (
    <header 
      className="bg-white/60 backdrop-blur-lg p-4 rounded-2xl shadow-lg border border-white/80"
      style={{ boxShadow: 'var(--lavender-shadow)' }}
    >
      <div className="flex flex-col sm:flex-row justify-between items-center">
        <h1 className="text-2xl sm:text-3xl font-bold text-purple-700 mb-2 sm:mb-0 flex items-center">
          <CuteRobotMascot />
          アイドル株式会社
        </h1>
        <div className="text-right font-mono flex items-center gap-4">
           <div className="flex items-center gap-2 font-bold text-yellow-500 bg-yellow-100/80 px-3 py-1 rounded-full text-sm">
             <i className="fas fa-sparkles"></i>
             <span>{ideaSparks}</span>
             <span className="hidden sm:inline">アイデアの煌めき</span>
           </div>
           <div>
            <div className="text-xl sm:text-2xl font-bold text-pink-600">
              {formatCurrency(money)}
            </div>
            <div className="text-sm text-pink-500/80">
              {formatCurrency(moneyPerSecond)} / 秒
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
