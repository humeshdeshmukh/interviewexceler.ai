'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, CheckCircle, XCircle, HelpCircle } from 'lucide-react';

interface Question {
  id: string;
  topic: string;
  question: string;
  options: string[];
  correctAnswer: string;
  userAnswer?: string;
  explanation: string;
  timeTaken: number;
}

interface QuestionReviewProps {
  questions: Question[];
}

export function QuestionReview({ questions }: QuestionReviewProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const getStatusIcon = (question: Question) => {
    if (!question.userAnswer) return <HelpCircle className="w-5 h-5 text-gray-500" />;
    return question.userAnswer === question.correctAnswer ? (
      <CheckCircle className="w-5 h-5 text-green-500" />
    ) : (
      <XCircle className="w-5 h-5 text-red-500" />
    );
  };

  return (
    <div className="space-y-4">
      {questions.map((question) => (
        <motion.div
          key={question.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 border border-white/10 rounded-xl overflow-hidden"
        >
          {/* Question Header */}
          <div
            className="p-4 cursor-pointer hover:bg-white/5 transition-colors"
            onClick={() => setExpandedId(expandedId === question.id ? null : question.id)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {getStatusIcon(question)}
                <div>
                  <div className="text-sm text-white/60">{question.topic}</div>
                  <div className="font-medium">{question.question}</div>
                </div>
              </div>
              <motion.div
                animate={{ rotate: expandedId === question.id ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown className="w-5 h-5" />
              </motion.div>
            </div>
          </div>

          {/* Question Details */}
          <AnimatePresence>
            {expandedId === question.id && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="border-t border-white/10"
              >
                <div className="p-4 space-y-4">
                  {/* Options */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {question.options.map((option, index) => {
                      const isCorrect = option.startsWith(question.correctAnswer);
                      const isUserAnswer = option.startsWith(question.userAnswer || '');
                      
                      return (
                        <div
                          key={index}
                          className={`p-3 rounded-lg border ${
                            isCorrect
                              ? 'border-green-500/30 bg-green-500/10'
                              : isUserAnswer && !isCorrect
                              ? 'border-red-500/30 bg-red-500/10'
                              : 'border-white/10 bg-white/5'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            {isCorrect && <CheckCircle className="w-4 h-4 text-green-500" />}
                            {isUserAnswer && !isCorrect && <XCircle className="w-4 h-4 text-red-500" />}
                            <span>{option}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Explanation */}
                  <div className="space-y-2">
                    <div className="text-sm font-medium">Explanation</div>
                    <div className="text-sm text-white/60 bg-white/5 p-3 rounded-lg">
                      {question.explanation}
                    </div>
                  </div>

                  {/* Time Taken */}
                  <div className="text-sm text-white/40">
                    Time taken: {question.timeTaken.toFixed(1)}s
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
}
