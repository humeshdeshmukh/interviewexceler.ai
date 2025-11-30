'use client';

import { motion } from 'framer-motion';
import { Brain, Share2, Download, RotateCcw } from 'lucide-react';
import Link from 'next/link';
import { MaxWidthWrapper } from '@/components/MaxWidthWrapper';
import { ResultsChart } from '../../components/results/ResultsChart';
import { QuestionReview } from '../../components/results/QuestionReview';

// Mock data - replace with real data from your state management solution
const mockResults = {
  correct: 15,
  incorrect: 3,
  skipped: 2,
  totalTime: 1250, // in seconds
  avgTimePerQuestion: 62.5,
  accuracy: 75,
  improvement: 12,
};

const mockQuestions = [
  {
    id: '1',
    topic: 'Numerical Ability',
    question: 'What is 15% of 400?',
    options: ['A) 60', 'B) 70', 'C) 80', 'D) 90'],
    correctAnswer: 'A',
    userAnswer: 'A',
    explanation: '15% of 400 = (15/100) × 400 = 60',
    timeTaken: 45,
  },
  // Add more mock questions as needed
];

export default function TestResultsPage() {
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
            <Brain className="w-4 h-4 text-[#fcba28]" />
            <span className="text-sm">Practice Results</span>
          </div>
          <h1 className="text-4xl font-bold">Great Progress!</h1>
          <p className="text-white/60 max-w-2xl mx-auto">
            Here's a detailed breakdown of your performance. Review your answers and learn from the explanations.
          </p>
        </motion.div>

        {/* Results Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <ResultsChart data={mockResults} />
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
            <Share2 className="w-4 h-4" />
            Share Results
          </button>
          <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
            <Download className="w-4 h-4" />
            Download PDF
          </button>
          <Link
            href="/products/aptitude/test/setup"
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#fcba28] text-black font-semibold hover:bg-[#fcba28]/90 transition-all"
          >
            <RotateCcw className="w-4 h-4" />
            Try Again
          </Link>
        </motion.div>

        {/* Questions Review */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-4"
        >
          <h2 className="text-2xl font-bold">Question Review</h2>
          <p className="text-white/60 mb-6">
            Review your answers and learn from the detailed explanations.
          </p>
          <QuestionReview questions={mockQuestions} />
        </motion.div>
      </MaxWidthWrapper>
    </div>
  );
}
