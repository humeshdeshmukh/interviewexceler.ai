'use client';

import { motion } from 'framer-motion';
import { Brain, Target, Clock, TrendingUp } from 'lucide-react';

interface ResultsChartProps {
  data: {
    correct: number;
    incorrect: number;
    skipped: number;
    totalTime: number;
    avgTimePerQuestion: number;
    accuracy: number;
    improvement: number;
  };
}

export function ResultsChart({ data }: ResultsChartProps) {
  const total = data.correct + data.incorrect + data.skipped;
  const correctPercentage = (data.correct / total) * 100;
  const incorrectPercentage = (data.incorrect / total) * 100;
  const skippedPercentage = (data.skipped / total) * 100;

  return (
    <div className="space-y-8">
      {/* Circular Progress */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative w-48 h-48 mx-auto"
      >
        <svg className="w-full h-full" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="currentColor"
            className="text-white/5"
            strokeWidth="10"
          />
          {/* Progress circle */}
          <motion.circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="#fcba28"
            strokeWidth="10"
            strokeDasharray={`${correctPercentage * 2.83} ${100 * 2.83}`}
            strokeLinecap="round"
            className="transform -rotate-90 origin-center"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: correctPercentage / 100 }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
          {/* Center text */}
          <text
            x="50"
            y="45"
            textAnchor="middle"
            className="text-2xl font-bold fill-current"
          >
            {correctPercentage.toFixed(1)}%
          </text>
          <text
            x="50"
            y="65"
            textAnchor="middle"
            className="text-sm fill-white/60"
          >
            Accuracy
          </text>
        </svg>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          {
            icon: Brain,
            label: 'Questions',
            value: total,
            subtext: `${data.correct} correct`,
          },
          {
            icon: Clock,
            label: 'Total Time',
            value: `${Math.floor(data.totalTime / 60)}m ${data.totalTime % 60}s`,
            subtext: `${data.avgTimePerQuestion.toFixed(1)}s per question`,
          },
          {
            icon: Target,
            label: 'Accuracy',
            value: `${data.accuracy.toFixed(1)}%`,
            subtext: `${data.skipped} skipped`,
          },
          {
            icon: TrendingUp,
            label: 'Improvement',
            value: `${data.improvement > 0 ? '+' : ''}${data.improvement}%`,
            subtext: 'from last attempt',
          },
        ].map(({ icon: Icon, label, value, subtext }, index) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-4 bg-white/5 border border-white/10 rounded-xl space-y-2"
          >
            <div className="flex items-center gap-2">
              <Icon className="w-4 h-4 text-[#fcba28]" />
              <span className="text-sm text-white/60">{label}</span>
            </div>
            <div>
              <div className="text-xl font-semibold">{value}</div>
              <div className="text-sm text-white/40">{subtext}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Question Distribution */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="space-y-4"
      >
        <h3 className="text-lg font-semibold">Question Distribution</h3>
        <div className="h-4 bg-white/5 rounded-full overflow-hidden">
          <div className="flex h-full">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${correctPercentage}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="bg-green-500"
            />
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${incorrectPercentage}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="bg-red-500"
            />
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${skippedPercentage}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="bg-gray-500"
            />
          </div>
        </div>
        <div className="flex justify-between text-sm text-white/60">
          <span>Correct ({data.correct})</span>
          <span>Incorrect ({data.incorrect})</span>
          <span>Skipped ({data.skipped})</span>
        </div>
      </motion.div>
    </div>
  );
}
