'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";
import { 
  FaArrowLeft, 
  FaBrain, 
  FaLightbulb,
  FaClock,
  FaRobot,
  FaSpinner
} from 'react-icons/fa6';
import { tcsQuestions } from '../questions/tcs';
import { infosysQuestions } from '../questions/infosys';
import { wiproQuestions } from '../questions/wipro';
import { accentureQuestions } from '../questions/accenture';
import { generateQuestion } from '../utils/questionGenerator';
import { Question } from '../questions/common';

const categories = [
  'Analogies',
  'Reading Comprehension'
] as const;

const difficulties = ['Easy', 'Medium', 'Hard'] as const;

const VerbalReasoningPractice = () => {
  // State management
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [hintIndex, setHintIndex] = useState(0);
  const [selectedCompany, setSelectedCompany] = useState<string>('TCS');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<typeof categories[number]>('Analogies');
  const [selectedDifficulty, setSelectedDifficulty] = useState<typeof difficulties[number]>('Easy');
  const [showGenerateSuccess, setShowGenerateSuccess] = useState(false);
  const [showDebug, setShowDebug] = useState(false);

  const allQuestions = {
    'TCS': tcsQuestions,
    'Infosys': infosysQuestions,
    'Wipro': wiproQuestions,
    'Accenture': accentureQuestions,
  };

  // Initialize questions
  useEffect(() => {
    setQuestions(allQuestions[selectedCompany as keyof typeof allQuestions] || []);
  }, [selectedCompany]);

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswerSelect = (option: string) => {
    setSelectedAnswer(option);
    setShowExplanation(true);
  };

  const handleNextQuestion = () => {
    if (questions.length === 0) return;
    setCurrentQuestionIndex((prev) => (prev + 1) % questions.length);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setShowHint(false);
    setHintIndex(0);
  };

  const handlePrevQuestion = () => {
    if (questions.length === 0) return;
    setCurrentQuestionIndex((prev) => (prev - 1 + questions.length) % questions.length);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setShowHint(false);
    setHintIndex(0);
  };

  const handleShowHint = () => {
    if (!currentQuestion) return;
    if (!showHint) {
      setShowHint(true);
    } else {
      setHintIndex((prev) => (prev + 1) % currentQuestion.hints.length);
    }
  };

  const handleCompanyChange = (company: string) => {
    setSelectedCompany(company);
    const newQuestions = allQuestions[company as keyof typeof allQuestions] || [];
    setQuestions(newQuestions);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setShowHint(false);
  };

  const handleGenerateQuestion = async () => {
    try {
      setIsGenerating(true);
      const newQuestion = await generateQuestion(
        selectedCompany,
        selectedCategory,
        selectedDifficulty
      );
      
      setQuestions(prev => {
        const newQuestions = [...prev, newQuestion];
        console.log('Updated questions:', newQuestions); // Debug log
        return newQuestions;
      });
      
      // Wait for state update
      setTimeout(() => {
        setCurrentQuestionIndex(questions.length);
        setSelectedAnswer(null);
        setShowExplanation(false);
        setShowHint(false);
        setHintIndex(0);
        setShowGenerateSuccess(true);
        setTimeout(() => setShowGenerateSuccess(false), 3000);
      }, 100);

      const dialog = document.getElementById('aiGeneratorDialog') as HTMLDialogElement;
      dialog.close();
    } catch (error) {
      console.error('Failed to generate question:', error);
      alert('Failed to generate question. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const companies = Object.keys(allQuestions);

  if (!currentQuestion) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-white text-center">
          <h2 className="text-2xl mb-4">Loading questions...</h2>
          <FaSpinner className="animate-spin text-4xl mx-auto" />
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,#fcba2810_0%,transparent_65%)] blur-3xl"
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      <div className="relative z-10">
        <MaxWidthWrapper>
          {/* Navigation */}
          <div className="pt-8">
            <Link 
              href="/products/aptitude-ai/standard/verbal-reasoning"
              className="inline-flex items-center text-[#fcba28] hover:text-[#ffd700] transition-colors gap-2 group"
            >
              <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
              Back to Verbal Reasoning
            </Link>
          </div>

          {/* Debug Panel */}
          {showDebug && (
            <div className="mt-4 p-4 bg-black/60 rounded-lg text-white">
              <h3 className="font-bold mb-2">Debug Info:</h3>
              <pre className="text-sm">
                {JSON.stringify({
                  totalQuestions: questions.length,
                  currentIndex: currentQuestionIndex,
                  currentQuestion: currentQuestion.id,
                  company: selectedCompany
                }, null, 2)}
              </pre>
            </div>
          )}

          {/* Main Content */}
          <div className="py-12">
            {/* Header Stats */}
            <div className="grid grid-cols-4 gap-6 mb-12">
              <div className="p-4 rounded-xl bg-black/40 backdrop-blur-lg border border-[#fcba28]/20">
                <div className="text-[#fcba28] mb-2"><FaBrain className="text-2xl" /></div>
                <div className="text-white font-bold">{selectedCompany}</div>
                <div className="text-gray-400 text-sm">Current Company</div>
              </div>
              <div className="p-4 rounded-xl bg-black/40 backdrop-blur-lg border border-[#fcba28]/20">
                <div className="text-[#fcba28] mb-2"><FaClock className="text-2xl" /></div>
                <div className="text-white font-bold">{currentQuestionIndex + 1}/{questions.length}</div>
                <div className="text-gray-400 text-sm">Question Progress</div>
              </div>
              <div className="p-4 rounded-xl bg-black/40 backdrop-blur-lg border border-[#fcba28]/20">
                <div className="text-[#fcba28] mb-2"><FaLightbulb className="text-2xl" /></div>
                <div className="text-white font-bold">{currentQuestion.difficulty}</div>
                <div className="text-gray-400 text-sm">Difficulty Level</div>
              </div>
              <button 
                onClick={() => {
                  const dialog = document.getElementById('aiGeneratorDialog') as HTMLDialogElement;
                  dialog.showModal();
                }}
                className="p-4 rounded-xl bg-black/40 backdrop-blur-lg border border-[#fcba28]/20 hover:bg-[#fcba28]/10 transition-all cursor-pointer group"
              >
                <div className="text-[#fcba28] mb-2 group-hover:scale-110 transition-transform">
                  <FaRobot className="text-2xl" />
                </div>
                <div className="text-white font-bold">Generate</div>
                <div className="text-gray-400 text-sm">AI Question</div>
              </button>
            </div>

            {/* Success Message */}
            <AnimatePresence>
              {showGenerateSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="fixed top-4 right-4 bg-green-500/90 text-white px-6 py-3 rounded-lg shadow-lg backdrop-blur-lg"
                >
                  New question generated successfully!
                </motion.div>
              )}
            </AnimatePresence>

            {/* Question Card */}
            <motion.div
              key={currentQuestion.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="p-8 rounded-xl bg-black/40 backdrop-blur-lg border border-[#fcba28]/20 mb-8"
            >
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-4">
                  <span className="text-[#fcba28]">{currentQuestion.category}</span>
                  {currentQuestion.id.includes('ai') && (
                    <span className="px-2 py-1 rounded-full bg-[#fcba28]/20 text-[#fcba28] text-sm">
                      AI Generated
                    </span>
                  )}
                </div>
                <select
                  value={selectedCompany}
                  onChange={(e) => handleCompanyChange(e.target.value)}
                  className="bg-black/40 border border-[#fcba28]/20 rounded-lg px-4 py-2 text-white"
                >
                  {companies.map((company) => (
                    <option key={company} value={company}>
                      {company}
                    </option>
                  ))}
                </select>
              </div>
              
              <p className="text-lg text-white mb-8 whitespace-pre-wrap">{currentQuestion.question}</p>

              <div className="space-y-4">
                {currentQuestion.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(option)}
                    className={`w-full p-4 text-left rounded-lg transition-all ${
                      selectedAnswer === option
                        ? option === currentQuestion.answer
                          ? 'bg-green-500/20 border-green-500'
                          : 'bg-red-500/20 border-red-500'
                        : 'bg-black/40 hover:bg-[#fcba28]/10'
                    } border ${
                      selectedAnswer && option === currentQuestion.answer
                        ? 'border-green-500'
                        : 'border-[#fcba28]/20'
                    } text-white`}
                    disabled={selectedAnswer !== null}
                  >
                    {option}
                  </button>
                ))}
              </div>

              {showExplanation && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 rounded-lg bg-[#fcba28]/10 border border-[#fcba28]/20"
                >
                  <h3 className="font-semibold text-[#fcba28] mb-2">Explanation:</h3>
                  <p className="text-white">{currentQuestion.explanation}</p>
                </motion.div>
              )}

              {showHint && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20"
                >
                  <h3 className="font-semibold text-yellow-400 mb-2">Hint {hintIndex + 1}:</h3>
                  <p className="text-white">{currentQuestion.hints[hintIndex]}</p>
                </motion.div>
              )}
            </motion.div>

            {/* Navigation Buttons */}
            <div className="flex justify-between">
              <button
                onClick={handlePrevQuestion}
                className="px-6 py-3 bg-black/40 text-white rounded-lg hover:bg-[#fcba28]/20 transition-colors border border-[#fcba28]/20"
              >
                Previous
              </button>
              <button
                onClick={handleShowHint}
                className="px-6 py-3 bg-black/40 text-[#fcba28] rounded-lg hover:bg-[#fcba28]/20 transition-colors border border-[#fcba28]/20"
                disabled={selectedAnswer !== null}
              >
                {showHint ? 'Next Hint' : 'Show Hint'}
              </button>
              <button
                onClick={handleNextQuestion}
                className="px-6 py-3 bg-[#fcba28] text-black rounded-lg hover:bg-[#ffd700] transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        </MaxWidthWrapper>
      </div>

      {/* AI Question Generator Dialog */}
      <dialog
        id="aiGeneratorDialog"
        className="p-8 rounded-xl bg-black/95 backdrop:bg-gray-900/50 text-white border border-[#fcba28]/20 backdrop-blur-lg"
      >
        <h2 className="text-2xl font-bold text-[#fcba28] mb-6">Generate AI Question</h2>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as typeof categories[number])}
              className="w-full bg-black/40 border border-[#fcba28]/20 rounded-lg px-4 py-2 text-white"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Difficulty</label>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value as typeof difficulties[number])}
              className="w-full bg-black/40 border border-[#fcba28]/20 rounded-lg px-4 py-2 text-white"
            >
              {difficulties.map((difficulty) => (
                <option key={difficulty} value={difficulty}>
                  {difficulty}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-end gap-4 mt-8">
            <button
              onClick={() => {
                const dialog = document.getElementById('aiGeneratorDialog') as HTMLDialogElement;
                dialog.close();
              }}
              className="px-6 py-3 bg-black/40 text-white rounded-lg hover:bg-[#fcba28]/20 transition-colors border border-[#fcba28]/20"
            >
              Cancel
            </button>
            <button
              onClick={handleGenerateQuestion}
              disabled={isGenerating}
              className="px-6 py-3 bg-[#fcba28] text-black rounded-lg hover:bg-[#ffd700] transition-colors disabled:bg-[#fcba28]/50 flex items-center gap-2"
            >
              {isGenerating ? (
                <>
                  <FaSpinner className="animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <FaRobot />
                  Generate Question
                </>
              )}
            </button>
          </div>
        </div>
      </dialog>
    </main>
  );
};

export default VerbalReasoningPractice;
