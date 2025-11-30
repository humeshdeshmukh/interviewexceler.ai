"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaClock, FaCheck } from 'react-icons/fa';
import { Test } from '../../../utils/types';

interface TestViewProps {
  test: Test;
  onBack: () => void;
}

export default function TestView({ test, onBack }: TestViewProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);

  const handleAnswerSelect = (questionId: string, answer: string) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleSubmit = () => {
    setShowResults(true);
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={onBack}
          className="flex items-center text-gray-400 hover:text-white mb-8"
        >
          <FaArrowLeft className="mr-2" />
          Back to Tests
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold mb-4">{test.title}</h1>
          <div className="flex items-center gap-4 text-gray-400">
            <span className="flex items-center">
              <FaClock className="mr-2" />
              {test.timeLimit} minutes
            </span>
            <span>{test.totalQuestions} questions</span>
          </div>
        </motion.div>

        {/* Question */}
        {test.questions.length > 0 && (
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 rounded-xl p-6 backdrop-blur-sm border border-white/10"
          >
            <div className="mb-6">
              <div className="text-sm text-gray-400 mb-2">
                Question {currentQuestion + 1} of {test.questions.length}
              </div>
              <h2 className="text-xl font-medium text-white">
                {test.questions[currentQuestion].text}
              </h2>
            </div>

            <div className="space-y-3">
              {test.questions[currentQuestion].options.map((option, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handleAnswerSelect(test.questions[currentQuestion].id, option)}
                  className={`w-full p-4 rounded-lg text-left transition-all ${
                    selectedAnswers[test.questions[currentQuestion].id] === option
                      ? 'bg-[#fcba28] text-gray-900'
                      : 'bg-white/5 text-gray-300 hover:bg-white/10'
                  }`}
                >
                  {option}
                </motion.button>
              ))}
            </div>

            <div className="mt-8 flex justify-between">
              <button
                onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
                disabled={currentQuestion === 0}
                className="px-4 py-2 rounded-lg bg-white/5 text-gray-300 hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              
              {currentQuestion === test.questions.length - 1 ? (
                <button
                  onClick={handleSubmit}
                  className="px-6 py-2 rounded-lg bg-[#fcba28] text-gray-900 hover:bg-[#fcd978] transition-colors"
                >
                  Submit Test
                </button>
              ) : (
                <button
                  onClick={() => setCurrentQuestion(prev => Math.min(test.questions.length - 1, prev + 1))}
                  className="px-4 py-2 rounded-lg bg-white/5 text-gray-300 hover:bg-white/10"
                >
                  Next
                </button>
              )}
            </div>
          </motion.div>
        )}

        {/* Results */}
        {showResults && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 p-6 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10"
          >
            <h2 className="text-2xl font-bold mb-4">Test Results</h2>
            <div className="space-y-4">
              {test.questions.map((question, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg ${
                    selectedAnswers[question.id] === question.correctAnswer
                      ? 'bg-green-500/20 border border-green-500/30'
                      : 'bg-red-500/20 border border-red-500/30'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">Question {index + 1}</span>
                    {selectedAnswers[question.id] === question.correctAnswer ? (
                      <span className="text-green-400 flex items-center">
                        <FaCheck className="mr-1" /> Correct
                      </span>
                    ) : (
                      <span className="text-red-400">Incorrect</span>
                    )}
                  </div>
                  <p className="text-gray-300 mb-2">{question.text}</p>
                  <div className="text-sm">
                    <p className="text-gray-400">Your answer: {selectedAnswers[question.id]}</p>
                    <p className="text-gray-400">Correct answer: {question.correctAnswer}</p>
                  </div>
                  {selectedAnswers[question.id] !== question.correctAnswer && (
                    <p className="mt-2 text-sm text-gray-400">{question.explanation}</p>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
