'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaCalculator, FaChartLine, FaLightbulb, FaClock, FaBrain, FaTrophy, FaArrowLeft } from 'react-icons/fa';
import { tcsQuantitativeQuestions } from './questions/tcs';
import { infosysQuantitativeQuestions } from './questions/infosys';
import { wiproQuantitativeQuestions } from './questions/wipro';
import { accentureQuantitativeQuestions } from './questions/accenture';
import { commonQuantitativeQuestions } from './questions/common';

export default function QuantitativeAptitudePage() {
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [showExplanation, setShowExplanation] = useState(false);

  const companies = [
    { id: 'tcs', name: 'TCS', questions: tcsQuantitativeQuestions },
    { id: 'infosys', name: 'Infosys', questions: infosysQuantitativeQuestions },
    { id: 'wipro', name: 'Wipro', questions: wiproQuantitativeQuestions },
    { id: 'accenture', name: 'Accenture', questions: accentureQuantitativeQuestions },
    { id: 'common', name: 'Common Questions', questions: commonQuantitativeQuestions },
  ];

  const features = [
    {
      icon: <FaCalculator className="w-6 h-6" />,
      title: "Numerical Computation",
      description: "Master arithmetic, algebra, and mathematical calculations essential for aptitude tests."
    },
    {
      icon: <FaChartLine className="w-6 h-6" />,
      title: "Data Analysis",
      description: "Practice interpreting graphs, charts, and statistical data with real-world scenarios."
    },
    {
      icon: <FaLightbulb className="w-6 h-6" />,
      title: "Problem Solving",
      description: "Develop logical thinking and analytical skills through diverse problem types."
    },
    {
      icon: <FaClock className="w-6 h-6" />,
      title: "Time Management",
      description: "Learn techniques to solve complex problems quickly and efficiently."
    },
    {
      icon: <FaBrain className="w-6 h-6" />,
      title: "Mental Math",
      description: "Strengthen your ability to perform calculations mentally with speed and accuracy."
    },
    {
      icon: <FaTrophy className="w-6 h-6" />,
      title: "Company-Specific",
      description: "Practice questions tailored to match the patterns of top tech companies."
    }
  ];

  const currentQuestions = selectedCompany 
    ? companies.find(c => c.id === selectedCompany)?.questions || []
    : [];

  const handleAnswer = (answer: string) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestions[currentQuestion].id]: answer
    }));
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

  if (!selectedCompany) {
    return (
      <div className="min-h-screen bg-background">
        {/* Background Effects */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#fcba2810_0%,transparent_65%)] blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,#fcba2815_0%,transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,#fcba2815_0%,transparent_50%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Back Button */}
          <div className="mb-8">
            <Link 
              href="/products/aptitude-ai/standard" 
              className="inline-flex items-center text-gray-400 hover:text-white transition-colors duration-200"
            >
              <FaArrowLeft className="w-5 h-5 mr-2" />
              Back to Standard Tests
            </Link>
          </div>

          {/* Header */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-block p-4 rounded-full bg-[#fcba28]/20 mb-6"
            >
              <FaCalculator className="w-8 h-8 text-[#fcba28]" />
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 text-transparent bg-clip-text"
            >
              Quantitative Aptitude Practice
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xl text-gray-400 max-w-3xl mx-auto"
            >
              Master the mathematical concepts and problem-solving techniques required for technical interviews
            </motion.p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 border border-white/10 rounded-xl p-6"
              >
                <div className="p-3 bg-[#fcba28]/20 rounded-lg inline-block mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Company Selection */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white text-center mb-8">
              Choose Your Practice Set
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
        </div>
      </div>
    );
  }

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
          <button
            onClick={() => setSelectedCompany(null)}
            className="text-gray-400 hover:text-white transition-colors inline-flex items-center"
          >
            <FaArrowLeft className="w-5 h-5 mr-2" />
            Back to Companies
          </button>
          <div className="text-white font-medium">
            Question {currentQuestion + 1} of {currentQuestions.length}
          </div>
        </div>

        {/* Question Card */}
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 border border-white/10 rounded-xl p-6 mb-6"
        >
          <h2 className="text-xl text-white mb-6">
            {currentQuestions[currentQuestion].question}
          </h2>
          <div className="space-y-4">
            {currentQuestions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option[0])}
                className={`w-full p-4 rounded-lg text-left transition-all ${
                  answers[currentQuestions[currentQuestion].id] === option[0]
                    ? 'bg-[#fcba28] text-black'
                    : 'bg-white/5 text-white hover:bg-white/10'
                }`}
              >
                {option}
              </button>
            ))}
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
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={nextQuestion}
            disabled={currentQuestion === currentQuestions.length - 1}
            className={`px-6 py-3 rounded-lg transition-all ${
              currentQuestion === currentQuestions.length - 1
                ? 'bg-white/5 text-gray-500 cursor-not-allowed'
                : 'bg-[#fcba28] text-black hover:bg-[#fcba28]/90'
            }`}
          >
            Next
          </motion.button>
        </div>
      </div>
    </div>
  );
}
