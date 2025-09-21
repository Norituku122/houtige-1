import React from 'react';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  children: React.ReactNode;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ isOpen, onClose, onConfirm, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div 
        className="bg-white/90 border-2 border-purple-300 rounded-3xl shadow-2xl p-6 max-w-lg w-full animate-pop-in"
        style={{ boxShadow: '0 8px 30px rgba(209, 196, 233, 0.7)' }}
      >
        <h2 className="text-2xl font-bold mb-4 text-purple-700">
          {title}
        </h2>
        <div className="text-slate-600 mb-6">{children}</div>
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-xl font-bold text-slate-600 bg-slate-200 hover:bg-slate-300 transition-all duration-300"
          >
            キャンセル
          </button>
          <button
            onClick={onConfirm}
            className="px-6 py-2 rounded-xl font-bold text-white transition-all duration-300 transform
                       focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-offset-2
                       bg-gradient-to-r from-red-500 to-orange-500 shadow-lg shadow-red-400/50
                       hover:shadow-xl hover:shadow-red-400/60 hover:-translate-y-0.5
                       active:scale-95 active:shadow-md"
          >
            実行する
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;