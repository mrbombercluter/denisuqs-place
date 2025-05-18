import React from 'react';
import { X, AlertTriangle } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const TOS: React.FC<Props> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-gray-900 p-8 rounded-xl shadow-xl max-w-2xl w-full mx-4 border border-cyan-500/20">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600 flex items-center gap-2">
            <AlertTriangle size={24} className="text-yellow-500" />
            Terms of Service
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="space-y-6 text-gray-300">
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
            <h3 className="text-red-400 font-semibold mb-2">Important Notice</h3>
            <ul className="list-disc list-inside space-y-2">
              <li>No refunds; all sales are final.</li>
              <li>Leaking will result in removal from the configuration.</li>
              <li>You agree that we can discontinue this project at any time.</li>
              <li>You agree that we can revoke your access at any time WITH OR WITHOUT A VALID REASON.</li>
            </ul>
          </div>

          <div className="sticky bottom-0 bg-gray-900/95 backdrop-blur-sm py-4 border-t border-gray-800 mt-8">
            <p className="text-center text-sm text-gray-400">
              By purchasing our configurations, you automatically agree to these terms.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};