'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, BarChart, MessageSquare, ThumbsUp, ThumbsDown, RefreshCw } from 'lucide-react';

interface FeedbackPanelProps {
  feedback: {
    confidence: number;
    clarity: number;
    content: number;
    improvements: string[];
  };
  onNext: () => void;
  onRetry: () => void;
}

export const FeedbackPanel: React.FC<FeedbackPanelProps> = ({
  feedback,
  onNext,
  onRetry
}) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getScoreBackground = (score: number) => {
    if (score >= 80) return 'bg-green-500/20';
    if (score >= 60) return 'bg-yellow-500/20';
    return 'bg-red-500/20';
  };

  const getScoreEmoji = (score: number) => {
    if (score >= 80) return '🌟';
    if (score >= 60) return '👍';
    return '💪';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Score Overview */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-sm">
        <div className="flex items-center gap-2 mb-6">
          <BarChart className="w-5 h-5 text-[#fcba28]" />
          <h3 className="text-lg font-semibold text-white">Performance Analysis</h3>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {/* Confidence Score */}
          <div className="text-center">
            <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${getScoreBackground(feedback.confidence)} mb-2`}>
              <span className={`text-2xl font-bold ${getScoreColor(feedback.confidence)}`}>
                {Math.round(feedback.confidence)}
              </span>
            </div>
            <p className="text-sm text-gray-400">Confidence</p>
          </div>

          {/* Clarity Score */}
          <div className="text-center">
            <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${getScoreBackground(feedback.clarity)} mb-2`}>
              <span className={`text-2xl font-bold ${getScoreColor(feedback.clarity)}`}>
                {Math.round(feedback.clarity)}
              </span>
            </div>
            <p className="text-sm text-gray-400">Clarity</p>
          </div>

          {/* Content Score */}
          <div className="text-center">
            <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${getScoreBackground(feedback.content)} mb-2`}>
              <span className={`text-2xl font-bold ${getScoreColor(feedback.content)}`}>
                {Math.round(feedback.content)}
              </span>
            </div>
            <p className="text-sm text-gray-400">Content</p>
          </div>
        </div>
      </div>

      {/* Detailed Feedback */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-sm">
        <div className="flex items-center gap-2 mb-6">
          <MessageSquare className="w-5 h-5 text-[#fcba28]" />
          <h3 className="text-lg font-semibold text-white">Areas for Improvement</h3>
        </div>

        <div className="space-y-4">
          {feedback.improvements.map((improvement, index) => (
            <div
              key={index}
              className="flex items-start gap-3 text-gray-300"
            >
              {index % 2 === 0 ? (
                <ThumbsUp className="w-5 h-5 text-[#fcba28] flex-shrink-0 mt-0.5" />
              ) : (
                <ThumbsDown className="w-5 h-5 text-[#fcba28] flex-shrink-0 mt-0.5" />
              )}
              <p>{improvement}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={onRetry}
          className="flex-1 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-white font-medium flex items-center justify-center gap-2"
        >
          <RefreshCw className="w-5 h-5" />
          Try Again
        </button>
        <button
          onClick={onNext}
          className="flex-1 p-4 rounded-xl bg-[#fcba28] hover:bg-[#fcd978] transition-colors text-black font-medium flex items-center justify-center gap-2"
        >
          Next Question
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </motion.div>
  );
};
