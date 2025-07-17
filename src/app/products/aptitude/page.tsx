'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { AptitudeHero } from './components/hero/AptitudeHero';
import { TopicsGrid } from './components/topics/TopicsGrid';
import { ProgressSection } from './components/progress/ProgressSection';
import {
  BackgroundGradient,
  GridPattern,
  FloatingShapes,
} from './components/background/BackgroundEffects';
import { MaxWidthWrapper } from '@/components/MaxWidthWrapper';
import { ProgressData } from './types';

const progressData: ProgressData = {
  questionsSolved: 248,
  questionsChange: '+12 this week',
  accuracyRate: 76,
  accuracyChange: '+2.5% this week',
  avgTime: '1.8m',
  timeChange: '-0.2m this week',
};

export default function AptitudePage() {
  return (
    <section className="relative min-h-screen bg-background overflow-hidden">
      {/* Background Effects */}
      <BackgroundGradient />
      <GridPattern />
      <FloatingShapes />

      {/* Content */}
      <div className="relative z-10">
        <MaxWidthWrapper>
          {/* Hero Section */}
          <AptitudeHero />

          {/* Topics Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-16"
          >
            <TopicsGrid />
          </motion.div>

          {/* Progress Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-16 mb-16"
          >
            <ProgressSection data={progressData} />
          </motion.div>
        </MaxWidthWrapper>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-[#fcba28]/30 flex items-start justify-center p-2"
        >
          <motion.div
            animate={{ height: ['20%', '80%', '20%'] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 bg-[#fcba28]/50 rounded-full"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
