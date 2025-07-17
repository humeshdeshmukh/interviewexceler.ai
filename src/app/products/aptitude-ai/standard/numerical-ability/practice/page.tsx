'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';
import { tcsNumericalQuestions } from '../questions/tcs';
import { infosysNumericalQuestions } from '../questions/infosys';
import { wiproNumericalQuestions } from '../questions/wipro';
import { accentureNumericalQuestions } from '../questions/accenture';
import { commonNumericalQuestions } from '../questions/common';

export default function NumericalPracticePage() {
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);

  const companies = [
    { id: 'tcs', name: 'TCS', questions: tcsNumericalQuestions },
    { id: 'infosys', name: 'Infosys', questions: infosysNumericalQuestions },
    { id: 'wipro', name: 'Wipro', questions: wiproNumericalQuestions },
    { id: 'accenture', name: 'Accenture', questions: accentureNumericalQuestions },
    { id: 'common', name: 'Common Questions', questions: commonNumericalQuestions },
  ];

  const currentQuestions = selectedCompany 
    ? companies.find(c => c.id === selectedCompany)?.questions || []
    : [];

  const handleAnswer = (answer: string) => {
    const currentQues = currentQuestions[currentQuestion];
    const isCorrect = answer === currentQues.correctAnswer;
    
    setAnswers(prev => ({
      ...prev,
      [currentQues.id]: answer
    }));
    
    if (!answers[currentQues.id] && isCorrect) {
      setScore(prev => prev + 1);
    }
    
    setShowExplanation(true);
  };

  const nextQuestion = () => {
    if (currentQuestion < currentQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setShowExplanation(false);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
      setShowExplanation(false);
    }
  };

  const resetPractice = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowExplanation(false);
    setScore(0);
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#fcba2810_0%,transparent_65%)] blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,#fcba2815_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,#fcba2815_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      <div className="max-w-3xl mx-auto relative">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link 
            href="/products/aptitude-ai/standard/numerical-ability"
            className="text-gray-400 hover:text-white transition-colors inline-flex items-center"
          >
            <FaArrowLeft className="w-5 h-5 mr-2" />
            Back to Numerical Ability
          </Link>
          <div className="text-white font-medium">
            Score: {score}/{currentQuestions.length}
          </div>
        </div>

        {/* Company Selection */}
        {!selectedCompany ? (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white text-center mb-8">
              Choose Your Practice Set
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {companies.map((company, index) => (
                <motion.button
                  key={company.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedCompany(company.id)}
                  className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-6 text-left transition-all group"
                >
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-[#fcba28] transition-colors">
                    {company.name}
                  </h3>
                  <p className="text-gray-400 mb-4">
                    {company.questions.length} questions
                  </p>
                  <div className="flex items-center text-[#fcba28] group-hover:gap-2 transition-all">
                    Start Practice
                    <FaArrowLeft className="rotate-180 ml-2" />
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        ) : (
          <>
            {/* Question Card */}
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/5 border border-white/10 rounded-xl p-6 mb-6"
            >
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-400">
                  Question {currentQuestion + 1} of {currentQuestions.length}
                </span>
                <span className="text-gray-400">
                  {currentQuestions[currentQuestion].category} • {currentQuestions[currentQuestion].difficulty}
                </span>
              </div>
              <h2 className="text-xl text-white mb-6">
                {currentQuestions[currentQuestion].question}
              </h2>
              <div className="space-y-4">
                {currentQuestions[currentQuestion].options.map((option, index) => {
                  const isSelected = answers[currentQuestions[currentQuestion].id] === option[0];
                  const isCorrect = option[0] === currentQuestions[currentQuestion].correctAnswer;
                  const showResult = showExplanation && isSelected;

                  return (
                    <button
                      key={index}
                      onClick={() => !showExplanation && handleAnswer(option[0])}
                      disabled={showExplanation}
                      className={`w-full p-4 rounded-lg text-left transition-all ${
                        showResult
                          ? isCorrect
                            ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                            : 'bg-red-500/20 text-red-300 border border-red-500/30'
                          : isSelected
                          ? 'bg-[#fcba28] text-black'
                          : 'bg-white/5 text-white hover:bg-white/10'
                      }`}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
            </motion.div>

            {/* Explanation */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/5 border border-white/10 rounded-xl p-6 mb-6"
              >
                <h3 className="text-lg font-semibold text-white mb-2">Explanation</h3>
                <p className="text-gray-400 whitespace-pre-line">
                  {currentQuestions[currentQuestion].explanation}
                </p>
              </motion.div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={prevQuestion}
                disabled={currentQuestion === 0}
                className={`px-6 py-3 rounded-lg transition-all ${
                  currentQuestion === 0
                    ? 'bg-white/5 text-gray-500 cursor-not-allowed'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                Previous
              </motion.button>
              {currentQuestion === currentQuestions.length - 1 ? (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={resetPractice}
                  className="px-6 py-3 rounded-lg transition-all bg-[#fcba28] text-black hover:bg-[#fcba28]/90"
                >
                  Restart Practice
                </motion.button>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={nextQuestion}
                  className="px-6 py-3 rounded-lg transition-all bg-[#fcba28] text-black hover:bg-[#fcba28]/90"
                >
                  Next
                </motion.button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
