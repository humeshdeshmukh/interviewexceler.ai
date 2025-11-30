"use client";

import { motion } from 'framer-motion';
import { Portal } from './Portal';

export const LoadingSpinner = () => {
  return (
    <Portal>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          className="bg-white/10 backdrop-blur-xl p-8 rounded-2xl flex flex-col items-center"
        >
          <div className="w-16 h-16 border-4 border-[#fcba28] border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-white text-lg">Processing your request...</p>
        </motion.div>
      </div>
    </Portal>
  );
};
