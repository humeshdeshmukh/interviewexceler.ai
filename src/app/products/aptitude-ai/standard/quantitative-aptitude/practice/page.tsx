'use client';

import { useState } from 'react';
import { motion } from "framer-motion";
import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa6";
import { PracticeMode } from "../../components/PracticeMode";

const questions = [
  {
    id: "qa1",
    question: `A and B can do a piece of work in 12 days, B and C in 15 days, and A and C in 20 days. How many days will A alone take to complete the work?`,
    options: ["20 days", "24 days", "30 days", "40 days"],
    answer: "24 days",
    explanation: `Let's solve this step by step:
1. Let's say the total work is 60 units (LCM of 12, 15, 20)
2. In one day:
   - A + B = 60/12 = 5 units
   - B + C = 60/15 = 4 units
   - A + C = 60/20 = 3 units
3. Adding equations (1) and (2):
   2(A + B + C) = 12 units
   A + B + C = 6 units
4. Substituting in equation (1):
   A = 2.5 units per day
5. Therefore, A will take 60/2.5 = 24 days`,
    difficulty: "Hard" as const,
    category: "Time & Work",
    hints: [
      "Convert the problem into units of work",
      "Use LCM to make calculations easier",
      "Create equations using work rates"
    ]
  },
  {
    id: "qa2",
    question: `In how many ways can 4 boys and 3 girls be arranged in a row if all boys must sit together?`,
    options: ["144", "288", "720", "5040"],
    answer: "720",
    explanation: `Let's solve this step by step:
1. Consider all boys as one unit
2. So now we have 4 units to arrange:
   - The boys unit (1)
   - 3 individual girls (3)
3. First, arrange these 4 units: 4! = 24 ways
4. The boys can be arranged among themselves: 4! = 24 ways
5. Total arrangements = 24 × 24 = 720`,
    difficulty: "Hard" as const,
    category: "Permutation & Combination",
    hints: [
      "Treat the boys as one unit initially",
      "Use multiplication principle",
      "Consider internal arrangements of boys"
    ]
  },
  {
    id: "qa3",
    question: `Two dice are rolled. What is the probability of getting a sum of 8?`,
    options: ["5/36", "1/6", "1/4", "7/36"],
    answer: "5/36",
    explanation: `Let's find all possible combinations that sum to 8:
1. (2,6), (6,2)
2. (3,5), (5,3)
3. (4,4)

Total favorable outcomes = 5
Total possible outcomes = 6 × 6 = 36
Therefore, probability = 5/36`,
    difficulty: "Medium" as const,
    category: "Probability",
    hints: [
      "List all possible combinations",
      "Remember order matters for different numbers",
      "Count (x,y) and (y,x) as separate outcomes"
    ]
  },
  {
    id: "qa4",
    question: `If the sum of first n terms of an AP is 2n² + 3n, find the nth term of the AP.`,
    options: ["4n + 1", "4n - 1", "4n + 2", "4n"],
    answer: "4n + 1",
    explanation: `Let's solve step by step:
1. Let Sn = 2n² + 3n be the sum of n terms
2. We know that an = Sn - S(n-1)
3. S(n-1) = 2(n-1)² + 3(n-1)
   = 2(n² - 2n + 1) + 3n - 3
   = 2n² - 4n + 2 + 3n - 3
   = 2n² - n - 1
4. Therefore, an = (2n² + 3n) - (2n² - n - 1)
   = 4n + 1`,
    difficulty: "Hard" as const,
    category: "Advanced Algebra",
    hints: [
      "Use the formula for nth term: an = Sn - S(n-1)",
      "Expand S(n-1) carefully",
      "Simplify the final expression"
    ]
  },
  {
    id: "qa5",
    question: `A bag contains 6 white and 4 black balls. Two balls are drawn at random. Find the probability that they are of different colors.`,
    options: ["12/45", "24/45", "30/45", "40/45"],
    answer: "24/45",
    explanation: `Let's solve:
1. Total ways of selecting 2 balls = ¹⁰C₂ = 45
2. Ways to select different colors:
   - White then Black = 6 × 4 = 24
   - Total favorable = 24
3. Probability = 24/45`,
    difficulty: "Medium" as const,
    category: "Probability",
    hints: [
      "Use combination formula for total outcomes",
      "Count ways to select one of each color",
      "Remember order doesn't matter in final answer"
    ]
  }
];

export default function QuantitativeAptitudePracticePage() {
  const [practiceComplete, setPracticeComplete] = useState(false);
  const [results, setResults] = useState<any>(null);

  const handleComplete = (practiceResults: any) => {
    setResults(practiceResults);
    setPracticeComplete(true);
  };

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
        <MaxWidthWrapper className="py-8">
          {/* Navigation */}
          <div className="mb-8">
            <Link 
              href="/products/aptitude-ai/standard/quantitative-aptitude"
              className="inline-flex items-center text-[#fcba28] hover:text-[#ffd700] transition-colors gap-2 group"
            >
              <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
              Back to Overview
            </Link>
          </div>

          {practiceComplete ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12"
            >
              <h1 className="text-4xl font-bold text-white mb-6">Practice Complete!</h1>
              <p className="text-gray-300 mb-8">
                You've completed {questions.length} questions. Here's your performance:
              </p>
              
              {/* Results summary */}
              <div className="grid grid-cols-3 gap-6 max-w-3xl mx-auto mb-12">
                <div className="p-6 rounded-xl bg-black/40 backdrop-blur-lg border border-[#fcba28]/20">
                  <div className="text-3xl font-bold text-[#fcba28] mb-2">
                    {results.filter((r: any) => r.correct).length}/{questions.length}
                  </div>
                  <div className="text-gray-400">Correct Answers</div>
                </div>
                <div className="p-6 rounded-xl bg-black/40 backdrop-blur-lg border border-[#fcba28]/20">
                  <div className="text-3xl font-bold text-[#fcba28] mb-2">
                    {Math.round((results.filter((r: any) => r.correct).length / questions.length) * 100)}%
                  </div>
                  <div className="text-gray-400">Accuracy</div>
                </div>
                <div className="p-6 rounded-xl bg-black/40 backdrop-blur-lg border border-[#fcba28]/20">
                  <div className="text-3xl font-bold text-[#fcba28] mb-2">
                    {Math.round(results.reduce((acc: number, r: any) => acc + r.timeSpent, 0) / results.length)}s
                  </div>
                  <div className="text-gray-400">Avg. Time per Question</div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex justify-center gap-4">
                <Link
                  href="/products/aptitude-ai/standard/quantitative-aptitude"
                  className="px-6 py-3 bg-black/40 backdrop-blur-lg border border-[#fcba28]/20 text-[#fcba28] rounded-xl hover:border-[#fcba28]/40 transition-colors"
                >
                  Back to Topics
                </Link>
                <button
                  onClick={() => {
                    setPracticeComplete(false);
                    setResults(null);
                  }}
                  className="px-6 py-3 bg-[#fcba28] text-black rounded-xl hover:bg-[#ffd700] transition-colors"
                >
                  Practice Again
                </button>
              </div>
            </motion.div>
          ) : (
            <PracticeMode 
              questions={questions}
              onComplete={handleComplete}
            />
          )}
        </MaxWidthWrapper>
      </div>
    </main>
  );
}
