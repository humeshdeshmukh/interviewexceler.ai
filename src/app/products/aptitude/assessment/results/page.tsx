'use client';

import { motion } from 'framer-motion';
import { Target, Share2, Download, RotateCcw, Trophy } from 'lucide-react';
import Link from 'next/link';
import { MaxWidthWrapper } from '@/components/MaxWidthWrapper';
import { ResultsChart } from '../../components/results/ResultsChart';
import { QuestionReview } from '../../components/results/QuestionReview';

// Mock data - replace with real data from your state management solution
const mockResults = {
  correct: 18,
  incorrect: 4,
  skipped: 3,
  totalTime: 1800, // in seconds
  avgTimePerQuestion: 72,
  accuracy: 72,
  improvement: 8,
};

const mockQuestions = [
  {
    id: '1',
    topic: 'Logical Reasoning',
    question: 'If all A are B, and all B are C, what can we conclude?',
    options: [
      'A) All A are C',
      'B) Some A are C',
      'C) No A are C',
      'D) Cannot determine'
    ],
    correctAnswer: 'A',
    userAnswer: 'B',
    explanation: 'Using syllogistic reasoning: If all A are B, and all B are C, then all A must be C. This is a transitive relationship.',
    timeTaken: 85,
  },
  // Add more mock questions as needed
];

export default function AssessmentResultsPage() {
  return (
    <div className="min-h-screen bg-background py-20">
      <MaxWidthWrapper>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4 mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
            <Target className="w-4 h-4 text-[#fcba28]" />
            <span className="text-sm">Assessment Results</span>
          </div>
          <h1 className="text-4xl font-bold">Assessment Complete!</h1>
          <p className="text-white/60 max-w-2xl mx-auto">
            Here's your detailed performance report. Analyze your strengths and areas for improvement.
          </p>
        </motion.div>

        {/* Performance Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center mb-12"
        >
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-[#fcba28] blur-2xl opacity-20" />
            <div className="relative w-32 h-32 rounded-full bg-[#fcba28]/20 border border-[#fcba28]/30 flex items-center justify-center">
              <div className="text-center">
                <Trophy className="w-8 h-8 text-[#fcba28] mx-auto mb-1" />
                <div className="text-2xl font-bold">{mockResults.accuracy}%</div>
                <div className="text-sm text-white/60">Score</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Results Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-12"
        >
          <ResultsChart data={mockResults} />
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
            <Share2 className="w-4 h-4" />
            Share Results
          </button>
          <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
            <Download className="w-4 h-4" />
            Download Certificate
          </button>
          <Link
            href="/products/aptitude/assessment/setup"
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#fcba28] text-black font-semibold hover:bg-[#fcba28]/90 transition-all"
          >
            <RotateCcw className="w-4 h-4" />
            Try Another Assessment
          </Link>
        </motion.div>

        {/* AI Feedback */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-12 p-6 bg-white/5 border border-white/10 rounded-xl"
        >
          <h2 className="text-xl font-bold mb-4">AI Performance Analysis</h2>
          <div className="space-y-4 text-white/80">
            <p>
              Your performance shows strong analytical skills, particularly in numerical reasoning.
              Consider focusing more on time management in logical reasoning questions.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="p-4 bg-white/5 rounded-lg">
                <h3 className="font-medium mb-2">Strengths</h3>
                <ul className="list-disc list-inside text-sm text-white/60">
                  <li>Excellent in quantitative comparisons</li>
                  <li>Strong problem-solving approach</li>
                  <li>Good accuracy in data interpretation</li>
                </ul>
              </div>
              <div className="p-4 bg-white/5 rounded-lg">
                <h3 className="font-medium mb-2">Areas for Improvement</h3>
                <ul className="list-disc list-inside text-sm text-white/60">
                  <li>Time management in complex problems</li>
                  <li>Verbal reasoning section</li>
                  <li>Pattern recognition speed</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Questions Review */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="space-y-4"
        >
          <h2 className="text-2xl font-bold">Detailed Question Analysis</h2>
          <p className="text-white/60 mb-6">
            Review each question with detailed explanations and see where you can improve.
          </p>
          <QuestionReview questions={mockQuestions} />
        </motion.div>
      </MaxWidthWrapper>
    </div>
  );
}
