'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Clock, Lightbulb, Star } from 'lucide-react';

interface QuestionPromptProps {
  currentQuestionIndex: number;
  practiceMode: 'preparation' | 'recording' | 'review';
}

export const QuestionPrompt: React.FC<QuestionPromptProps> = ({
  currentQuestionIndex,
  practiceMode
}) => {
  const questions = [
    {
      text: 'Tell me about yourself and your background.',
      type: 'introduction',
      difficulty: 'easy',
      expectedDuration: '2 minutes',
      tips: [
        'Start with your current role or education',
        'Highlight relevant experience',
        'End with why you are interested in this position'
      ]
    },
    {
      text: 'What is your greatest professional achievement?',
      type: 'behavioral',
      difficulty: 'medium',
      expectedDuration: '2-3 minutes',
      tips: [
        'Use the STAR method',
        'Focus on measurable results',
        'Show leadership and initiative'
      ]
    },
    // Add more questions as needed
  ];

  const currentQuestion = questions[currentQuestionIndex % questions.length];

  return (
    <div className="space-y-6">
      {/* Question Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-sm"
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#fcba28]" />
            <h3 className="text-lg font-semibold text-white">Interview Question</h3>
          </div>
          <div className="flex items-center gap-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              currentQuestion.difficulty === 'easy' ? 'bg-green-500/20 text-green-500' :
              currentQuestion.difficulty === 'medium' ? 'bg-yellow-500/20 text-yellow-500' :
              'bg-red-500/20 text-red-500'
            }`}>
              {currentQuestion.difficulty.charAt(0).toUpperCase() + currentQuestion.difficulty.slice(1)}
            </span>
            <span className="px-2 py-1 rounded-full bg-[#fcba28]/20 text-[#fcba28] text-xs font-medium">
              {currentQuestion.type}
            </span>
          </div>
        </div>

        <p className="text-xl text-white mb-6">{currentQuestion.text}</p>

        <div className="flex items-center gap-2 text-sm text-gray-400">
          <Clock className="w-4 h-4" />
          <span>Expected duration: {currentQuestion.expectedDuration}</span>
        </div>
      </motion.div>

      {/* Tips Section */}
      {practiceMode === 'preparation' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-sm"
        >
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb className="w-5 h-5 text-[#fcba28]" />
            <h3 className="text-lg font-semibold text-white">Tips for this Question</h3>
          </div>

          <ul className="space-y-3">
            {currentQuestion.tips.map((tip, index) => (
              <li key={index} className="flex items-start gap-2 text-gray-300">
                <Star className="w-4 h-4 text-[#fcba28] flex-shrink-0 mt-0.5" />
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      )}

      {/* Recording Mode Overlay */}
      {practiceMode === 'recording' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-red-500/20 border border-red-500/50 rounded-xl p-6 backdrop-blur-sm"
        >
          <div className="flex items-center justify-center text-red-500">
            <span className="animate-pulse">Recording in progress...</span>
          </div>
        </motion.div>
      )}
    </div>
  );
};
