'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import Link from 'next/link';
import {
  Brain,
  Target,
  Trophy,
  ArrowRight,
  Calculator,
  ChartBar,
  Clock,
  Sparkles,
} from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="flex gap-4 p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm"
  >
    <motion.div
      animate={{
        y: [-2, 2, -2],
        rotate: [-5, 5, -5],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      className="p-2 rounded-lg bg-[#fcba28]/20"
    >
      <Icon className="w-6 h-6 text-[#fcba28]" />
    </motion.div>
    <div>
      <h3 className="font-semibold mb-1">{title}</h3>
      <p className="text-sm text-white/60">{description}</p>
    </div>
  </motion.div>
);

const StatItem = ({ value, label, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay }}
    className="flex flex-col items-center"
  >
    <motion.div
      animate={{ scale: [1, 1.1, 1] }}
      transition={{ duration: 2, repeat: Infinity }}
      className="text-3xl font-bold text-[#fcba28] mb-1"
    >
      {value}
    </motion.div>
    <div className="text-sm text-white/60 text-center">{label}</div>
  </motion.div>
);

const BrandBadge = () => (
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#fcba28]/10 border border-[#fcba28]/20 backdrop-blur-sm"
  >
    <motion.div
      animate={{ rotate: [0, 360] }}
      transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      className="w-5 h-5"
    >
      <Sparkles className="w-full h-full text-[#fcba28]" />
    </motion.div>
    <span className="text-sm font-medium">AI-Powered Aptitude Training</span>
  </motion.div>
);

export const AptitudeHero = () => {
  return (
    <div className="relative flex flex-col lg:flex-row items-center gap-12 min-h-[calc(100vh-4rem)] py-20">
      {/* Left Section */}
      <div className="flex-1 flex flex-col gap-8">
        {/* Brand Badge */}
        <BrandBadge />

        {/* Main Headline */}
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold leading-tight mb-4"
          >
            Master Your{' '}
            <TypeAnimation
              sequence={[
                'Numerical',
                1500,
                'Logical',
                1500,
                'Verbal',
                1500,
                'Data',
                1500,
                'Quantitative',
                1500,
              ]}
              wrapper="span"
              speed={50}
              className="text-[#fcba28]"
              repeat={Infinity}
            />{' '}
            Aptitude Skills
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-white/60 mb-6"
          >
            Enhance your problem-solving abilities with our comprehensive aptitude practice platform.
            Get AI-powered feedback and track your progress.
          </motion.p>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex gap-4"
        >
          <Link
            href="/products/aptitude/practice"
            className="group flex items-center gap-2 px-6 py-3 rounded-xl bg-[#fcba28] text-black font-semibold transition-all hover:bg-[#fcba28]/90"
          >
            Start Practice
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowRight className="w-5 h-5" />
            </motion.div>
          </Link>
          <Link
            href="/products/aptitude/assessments"
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/10 font-semibold hover:bg-white/10"
          >
            Take Assessment
          </Link>
        </motion.div>

        {/* Key Features */}
        <div className="grid gap-4">
          <FeatureCard
            icon={Brain}
            title="AI-Powered Learning"
            description="Get personalized practice questions based on your performance"
            delay={0.3}
          />
          <FeatureCard
            icon={Target}
            title="Topic-wise Practice"
            description="Focus on specific areas to improve your weak points"
            delay={0.4}
          />
          <FeatureCard
            icon={Trophy}
            title="Performance Analytics"
            description="Track your progress with detailed analytics and insights"
            delay={0.5}
          />
        </div>
      </div>

      {/* Right Section */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="flex-1 relative"
      >
        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-6">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm"
          >
            <Calculator className="w-8 h-8 text-[#fcba28] mb-4" />
            <h3 className="text-lg font-semibold mb-2">1000+ Questions</h3>
            <p className="text-sm text-white/60">Comprehensive question bank covering all topics</p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm"
          >
            <ChartBar className="w-8 h-8 text-[#fcba28] mb-4" />
            <h3 className="text-lg font-semibold mb-2">Detailed Analysis</h3>
            <p className="text-sm text-white/60">Get insights into your performance patterns</p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm"
          >
            <Clock className="w-8 h-8 text-[#fcba28] mb-4" />
            <h3 className="text-lg font-semibold mb-2">Timed Practice</h3>
            <p className="text-sm text-white/60">Improve your speed and accuracy</p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm"
          >
            <Brain className="w-8 h-8 text-[#fcba28] mb-4" />
            <h3 className="text-lg font-semibold mb-2">Smart Learning</h3>
            <p className="text-sm text-white/60">Adaptive questions based on your level</p>
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 grid grid-cols-3 gap-8 p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm"
        >
          <StatItem value="98%" label="Success Rate" delay={0.7} />
          <StatItem value="50k+" label="Questions Solved" delay={0.8} />
          <StatItem value="30+" label="Topics" delay={0.9} />
        </motion.div>
      </motion.div>
    </div>
  );
};
