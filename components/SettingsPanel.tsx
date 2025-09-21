import React, { useState } from 'react';

interface SettingsPanelProps {
  onExport: () => void;
  onImport: (saveString: string) => void;
  onHardReset: () => void;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({ onExport, onImport, onHardReset }) => {
    const [importData, setImportData] = useState('');

    const handleImportClick = () => {
        onImport(importData);
    };

  return (
    <div className="bg-white/60 backdrop-blur-lg p-4 sm:p-6 rounded-b-2xl shadow-lg border-x border-b border-white/80 flex-grow flex flex-col h-full space-y-6">
      <div>
        <h2 className="text-xl font-bold mb-4 text-purple-700 border-b-2 border-purple-300/50 pb-2">
          <i className="fas fa-save mr-3 text-violet-400"></i>セーブデータ管理
        </h2>
        <div className="space-y-4">
            <div>
                <h3 className="font-semibold text-slate-700 mb-2">エクスポート</h3>
                <p className="text-sm text-slate-500 mb-3">現在のセーブデータをクリップボードにコピーします。バックアップや、別の端末へのデータ移行に使えます。</p>
                <button onClick={onExport} className="w-full font-bold text-white bg-gradient-to-r from-sky-400 to-blue-500 rounded-lg py-2 px-4 shadow-md hover:shadow-lg transition">
                    コピーする
                </button>
            </div>
            <div>
                <h3 className="font-semibold text-slate-700 mb-2">インポート</h3>
                <p className="text-sm text-slate-500 mb-3">エクスポートしたセーブデータを貼り付けて、進行状況を復元します。</p>
                <textarea
                    value={importData}
                    onChange={(e) => setImportData(e.target.value)}
                    placeholder="ここにセーブデータを貼り付け..."
                    className="w-full h-24 p-2 border border-purple-200 rounded-lg resize-none text-sm focus:ring-2 focus:ring-purple-400 focus:outline-none"
                />
                <button onClick={handleImportClick} className="w-full mt-2 font-bold text-white bg-gradient-to-r from-teal-400 to-emerald-500 rounded-lg py-2 px-4 shadow-md hover:shadow-lg transition">
                    復元する
                </button>
            </div>
        </div>
      </div>
      
      <div className="border-t-2 border-red-200/50 pt-6">
        <h2 className="text-xl font-bold mb-2 text-red-600">
          <i className="fas fa-triangle-exclamation mr-3"></i>デンジャーゾーン
        </h2>
        <p className="text-sm text-slate-500 mb-4">この操作は取り消せません。ご注意ください。</p>
        <div>
            <h3 className="font-semibold text-slate-700 mb-2">ハードリセット</h3>
            <p className="text-sm text-slate-500 mb-3">すべての進行状況（ロードマップ、マネージャー、アイデアの煌めきを含む）を完全に削除し、ゲームを最初の状態に戻します。</p>
            <button
                onClick={onHardReset}
                className="w-full font-bold text-white bg-gradient-to-r from-red-500 to-orange-500 rounded-lg py-2 px-4 shadow-md hover:shadow-lg transition"
            >
                すべてのデータを削除
            </button>
        </div>
      </div>

    </div>
  );
};

export default SettingsPanel;