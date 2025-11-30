"use client";

import { motion } from "framer-motion";

interface ProgressData {
  questionsSolved: number;
  questionsChange: string;
  accuracyRate: number;
  accuracyChange: string;
  avgTime: string;
  timeChange: string;
}

interface StatCardProps {
  title: string;
  value: string | number;
  change: string;
  delay: number;
}

const StatCard = ({ title, value, change, delay }: StatCardProps) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5, delay }}
    className="p-6 rounded-xl bg-black/40 backdrop-blur-lg border border-[#fcba28]/20"
  >
    <h3 className="text-gray-400 text-sm mb-2">{title}</h3>
    <div className="flex items-end gap-2">
      <span className="text-4xl font-bold text-[#fcba28]">{value}</span>
      <span className="text-green-400 text-sm mb-1">{change}</span>
    </div>
  </motion.div>
);

export const ProgressSection = ({ data }: { data: ProgressData }) => {
  return (
    <div>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-[#fcba28] text-center mb-8"
      >
        Your Progress
      </motion.h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          title="Questions Solved"
          value={data.questionsSolved}
          change={data.questionsChange}
          delay={0.2}
        />
        <StatCard
          title="Accuracy Rate"
          value={`${data.accuracyRate}%`}
          change={data.accuracyChange}
          delay={0.3}
        />
        <StatCard
          title="Average Time per Question"
          value={data.avgTime}
          change={data.timeChange}
          delay={0.4}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-8 text-center"
      >
        <p className="text-gray-300">
          Keep practicing to improve your scores and unlock more advanced questions!
        </p>
      </motion.div>
    </div>
  );
};
