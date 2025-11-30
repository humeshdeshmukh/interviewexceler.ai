'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { FaArrowLeft, FaFilter, FaChartBar } from 'react-icons/fa';
import { tcsDataQuestions } from '../questions/tcs';
import { infosysDataQuestions } from '../questions/infosys';
import { wiproDataQuestions } from '../questions/wipro';
import { accentureDataQuestions } from '../questions/accenture';
import { commonDataQuestions } from '../questions/common';

export default function DataPracticePage() {
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const companies = [
    { id: 'tcs', name: 'TCS', questions: tcsDataQuestions },
    { id: 'infosys', name: 'Infosys', questions: infosysDataQuestions },
    { id: 'wipro', name: 'Wipro', questions: wiproDataQuestions },
    { id: 'accenture', name: 'Accenture', questions: accentureDataQuestions },
    { id: 'common', name: 'Common Questions', questions: commonDataQuestions },
  ];

  const allQuestions = selectedCompany 
    ? companies.find(c => c.id === selectedCompany)?.questions || []
    : [];

  const difficulties = ['Easy', 'Medium', 'Hard'];
  const categories = [...new Set(allQuestions.map(q => q.category))];

  const filteredQuestions = allQuestions.filter(q => {
    if (selectedDifficulty && q.difficulty !== selectedDifficulty) return false;
    if (selectedCategory && q.category !== selectedCategory) return false;
    return true;
  });

  const currentQuestions = filteredQuestions;

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
    setSelectedDifficulty(null);
    setSelectedCategory(null);
  };

  const FilterPanel = () => (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      className="bg-white/5 border border-white/10 rounded-xl p-6 mb-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-white font-medium mb-3">Difficulty</h3>
          <div className="space-y-2">
            {difficulties.map(difficulty => (
              <button
                key={difficulty}
                onClick={() => setSelectedDifficulty(selectedDifficulty === difficulty ? null : difficulty)}
                className={`px-4 py-2 rounded-lg text-sm transition-all ${
                  selectedDifficulty === difficulty
                    ? 'bg-[#fcba28] text-black'
                    : 'bg-white/5 text-white hover:bg-white/10'
                }`}
              >
                {difficulty}
              </button>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-white font-medium mb-3">Category</h3>
          <div className="space-y-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
                className={`px-4 py-2 rounded-lg text-sm transition-all ${
                  selectedCategory === category
                    ? 'bg-[#fcba28] text-black'
                    : 'bg-white/5 text-white hover:bg-white/10'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#fcba2810_0%,transparent_65%)] blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,#fcba2815_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,#fcba2815_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      <div className="max-w-4xl mx-auto relative">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link 
            href="/products/aptitude-ai/standard/data-interpretation"
            className="text-gray-400 hover:text-white transition-colors inline-flex items-center"
          >
            <FaArrowLeft className="w-5 h-5 mr-2" />
            Back to Data Interpretation
          </Link>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <FaFilter className="w-5 h-5" />
            </button>
            <div className="text-white font-medium">
              Score: {score}/{currentQuestions.length}
            </div>
          </div>
        </div>

        {/* Filters */}
        {showFilters && selectedCompany && <FilterPanel />}

        {/* Company Selection */}
        {!selectedCompany ? (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-block p-4 rounded-full bg-[#fcba28]/20 mb-6"
              >
                <FaChartBar className="w-8 h-8 text-[#fcba28]" />
              </motion.div>
              <h2 className="text-2xl font-bold text-white mb-4">
                Choose Your Practice Set
              </h2>
              <p className="text-gray-400">
                Test your data interpretation skills with company-specific questions
              </p>
            </div>
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
        ) : currentQuestions.length > 0 ? (
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
              <div className="mb-6">
                <h2 className="text-xl text-white mb-6 whitespace-pre-line">
                  {currentQuestions[currentQuestion].question}
                </h2>
                {currentQuestions[currentQuestion].imageUrl && (
                  <div className="relative w-full h-64 mb-6 rounded-lg overflow-hidden">
                    <Image
                      src={currentQuestions[currentQuestion].imageUrl}
                      alt="Question visual"
                      fill
                      className="object-contain"
                    />
                  </div>
                )}
              </div>
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
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl text-white mb-4">No questions match the selected filters</h3>
            <button
              onClick={resetPractice}
              className="px-6 py-3 rounded-lg transition-all bg-[#fcba28] text-black hover:bg-[#fcba28]/90"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
