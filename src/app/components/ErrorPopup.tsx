"use client";

import { motion } from 'framer-motion';
import { FaExclamationTriangle } from 'react-icons/fa';
import { Portal } from './Portal';

interface ErrorPopupProps {
  message: string;
  onClose: () => void;
}

export const ErrorPopup = ({ message, onClose }: ErrorPopupProps) => {
  return (
    <Portal>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          className="bg-white/10 backdrop-blur-xl p-8 rounded-2xl max-w-md w-full"
        >
          <div className="flex items-center justify-center mb-4">
            <FaExclamationTriangle className="text-red-500 w-12 h-12" />
          </div>
          <h3 className="text-xl font-semibold text-white text-center mb-4">Error</h3>
          <p className="text-gray-300 text-center mb-6">{message}</p>
          <button
            onClick={onClose}
            className="w-full py-2 px-4 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
          >
            Close
          </button>
        </motion.div>
      </div>
    </Portal>
  );
};
