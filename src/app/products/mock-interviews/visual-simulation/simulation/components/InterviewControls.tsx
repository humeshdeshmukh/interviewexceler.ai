'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, RotateCcw, Settings } from 'lucide-react';

interface InterviewControlsProps {
  isRecording: boolean;
  onToggleRecording: () => void;
  onReset: () => void;
  onSettings: () => void;
}

export const InterviewControls: React.FC<InterviewControlsProps> = ({
  isRecording,
  onToggleRecording,
  onReset,
  onSettings,
}) => {
  return (
    <motion.div
      className="flex items-center justify-center gap-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <button
        onClick={onToggleRecording}
        className="p-4 rounded-full bg-[#fcba28] hover:bg-[#fcd978] transition-colors"
      >
        {isRecording ? (
          <Pause className="w-6 h-6 text-black" />
        ) : (
          <Play className="w-6 h-6 text-black" />
        )}
      </button>

      <button
        onClick={onReset}
        className="p-4 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
      >
        <RotateCcw className="w-6 h-6 text-white" />
      </button>

      <button
        onClick={onSettings}
        className="p-4 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
      >
        <Settings className="w-6 h-6 text-white" />
      </button>
    </motion.div>
  );
};

export default InterviewControls;
