'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaClock, FaLightbulb, FaCheck, FaTimes } from 'react-icons/fa6';

interface PracticeModeProps {
  questions: Array<{
    id: string;
    question: string;
    options?: string[];
    answer: string;
    explanation: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    category: string;
    hints?: string[];
  }>;
  onComplete: (results: any) => void;
}

export function PracticeMode({ questions, onComplete }: PracticeModeProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [timer, setTimer] = useState(0);
  const [results, setResults] = useState<Array<{
    questionId: string;
    correct: boolean;
    timeSpent: number;
  }>>([]);

  const currentQuestion = questions[currentQuestionIndex];

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prev => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [currentQuestionIndex]);

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    const isCorrect = answer === currentQuestion.answer;

    setResults(prev => [...prev, {
      questionId: currentQuestion.id,
      correct: isCorrect,
      timeSpent: timer
    }]);

    setShowExplanation(true);
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
      setTimer(0);
    } else {
      onComplete(results);
    }
  };

  return (
    <div className="space-y-8">
      {/* Progress Bar */}
      <div className="w-full bg-black/40 h-2 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-[#fcba28]"
          initial={{ width: 0 }}
          animate={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
        />
      </div>

      {/* Question Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-medium text-white">
            Question {currentQuestionIndex + 1} of {questions.length}
          </h2>
          <div className="text-sm text-gray-400">
            {currentQuestion.category} • {currentQuestion.difficulty}
          </div>
        </div>
        <div className="flex items-center gap-2 text-[#fcba28]">
          <FaClock />
          <span>{Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}</span>
        </div>
      </div>

      {/* Question Content */}
      <div className="bg-black/40 backdrop-blur-lg border border-[#fcba28]/20 rounded-xl p-6">
        <p className="text-lg text-white mb-8">{currentQuestion.question}</p>

        {currentQuestion.options ? (
          <div className="space-y-4">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option)}
                disabled={showExplanation}
                className={`w-full p-4 rounded-xl text-left transition-all ${
                  showExplanation
                    ? option === currentQuestion.answer
                      ? 'bg-green-500/20 border-green-500/40 text-green-400'
                      : option === selectedAnswer
                      ? 'bg-red-500/20 border-red-500/40 text-red-400'
                      : 'bg-black/40 border-[#fcba28]/20 text-gray-400'
                    : 'bg-black/40 border border-[#fcba28]/20 text-white hover:border-[#fcba28]/40'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        ) : (
          <input
            type="text"
            placeholder="Type your answer..."
            className="w-full p-4 bg-black/40 border border-[#fcba28]/20 rounded-xl text-white focus:outline-none focus:border-[#fcba28]/40"
            onKeyDown={e => {
              if (e.key === 'Enter') {
                handleAnswer(e.currentTarget.value);
              }
            }}
            disabled={showExplanation}
          />
        )}
      </div>

      {/* Explanation */}
      {showExplanation && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-black/40 backdrop-blur-lg border border-[#fcba28]/20 rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-4">
            {selectedAnswer === currentQuestion.answer ? (
              <>
                <FaCheck className="text-green-400" />
                <span className="text-green-400 font-medium">Correct!</span>
              </>
            ) : (
              <>
                <FaTimes className="text-red-400" />
                <span className="text-red-400 font-medium">Incorrect</span>
              </>
            )}
          </div>

          <h3 className="text-white font-medium mb-2">Explanation:</h3>
          <p className="text-gray-300 mb-4">{currentQuestion.explanation}</p>

          {currentQuestion.hints && (
            <div className="mt-4">
              <h4 className="text-[#fcba28] font-medium mb-2">Helpful Tips:</h4>
              <ul className="list-disc list-inside space-y-2">
                {currentQuestion.hints.map((hint, index) => (
                  <li key={index} className="text-gray-300">{hint}</li>
                ))}
              </ul>
            </div>
          )}

          <button
            onClick={nextQuestion}
            className="mt-6 px-6 py-3 bg-[#fcba28] text-black rounded-xl font-medium hover:bg-[#ffd700] transition-colors"
          >
            {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Complete Practice'}
          </button>
        </motion.div>
      )}

      {/* AI Help Button */}
      <button
        className="fixed bottom-8 right-8 p-4 bg-[#fcba28] text-black rounded-full shadow-lg hover:bg-[#ffd700] transition-colors"
        title="Get AI Help"
      >
        <FaLightbulb className="text-xl" />
      </button>
    </div>
  );
}
