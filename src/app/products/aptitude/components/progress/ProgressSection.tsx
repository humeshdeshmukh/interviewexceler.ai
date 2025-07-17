'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Target, Clock, CheckCircle2 } from 'lucide-react';
import { ProgressData } from '../../types';

interface ProgressSectionProps {
  data: ProgressData;
}

const StatCard = ({ 
  icon: Icon, 
  value, 
  change, 
  label, 
  delay 
}: { 
  icon: any; 
  value: string | number; 
  change: string; 
  label: string; 
  delay: number; 
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    whileHover={{ scale: 1.02 }}
    className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm"
  >
    <div className="p-3 rounded-xl bg-[#fcba28]/20 w-fit">
      <Icon className="w-6 h-6 text-[#fcba28]" />
    </div>
    <div className="mt-4">
      <div className="flex items-baseline gap-2">
        <span className="text-3xl font-bold">{value}</span>
        <span className="text-sm text-green-400">{change}</span>
      </div>
      <p className="mt-1 text-white/60">{label}</p>
    </div>
  </motion.div>
);

export function ProgressSection({ data }: ProgressSectionProps) {
  return (
    <div>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-bold mb-8"
      >
        Your Progress
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          icon={Target}
          value={data.questionsSolved}
          change={data.questionsChange}
          label="Questions Solved"
          delay={0.2}
        />
        <StatCard
          icon={CheckCircle2}
          value={`${data.accuracyRate}%`}
          change={data.accuracyChange}
          label="Accuracy Rate"
          delay={0.3}
        />
        <StatCard
          icon={Clock}
          value={data.avgTime}
          change={data.timeChange}
          label="Average Time per Question"
          delay={0.4}
        />
      </div>
    </div>
  );
}
