'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  Video, Camera, Mic, Play, Settings, Download,
  MessageSquare, BarChart, Shield, Clock, Star, 
  CheckCircle, Monitor, Users
} from 'lucide-react';

const InterviewModes = [
  {
    title: 'Practice Mode',
    description: 'Record yourself answering interview questions with instant AI feedback',
    icon: Camera,
    features: [
      'Self-paced practice',
      'Video recording & playback',
      'AI-powered feedback',
      'Body language analysis'
    ],
    gradient: 'from-blue-600/20 to-purple-600/20',
    link: '/products/mock-interviews/visual-simulation/practice'
  },
  {
    title: 'Live Simulation',
    description: 'Experience a real-time interview with our AI interviewer',
    icon: Monitor,
    features: [
      'Real-time interaction',
      'Dynamic questions',
      'Immediate feedback',
      'Performance metrics'
    ],
    gradient: 'from-amber-600/20 to-orange-600/20',
    link: '/products/mock-interviews/visual-simulation/simulation'
  },
  {
    title: 'Personalized AI Interview',
    description: 'Get a tailored interview experience based on your resume',
    icon: Users,
    features: [
      'Resume-based questions',
      'Voice interaction',
      'Real-time AI feedback',
      'Natural conversation'
    ],
    gradient: 'from-green-600/20 to-emerald-600/20',
    link: '/products/mock-interviews/visual-simulation/personal'
  }
];

const features = [
  {
    icon: Video,
    title: 'HD Video Recording',
    description: 'Crystal clear video recording with adjustable quality settings'
  },
  {
    icon: Mic,
    title: 'Audio Analysis',
    description: 'Voice tone and clarity analysis with improvement suggestions'
  },
  {
    icon: MessageSquare,
    title: 'Real-time Feedback',
    description: 'Get instant feedback on your performance and body language'
  },
  {
    icon: BarChart,
    title: 'Performance Analytics',
    description: 'Detailed metrics and progress tracking over time'
  },
  {
    icon: Shield,
    title: 'Secure Platform',
    description: 'Your recordings are encrypted and stored securely'
  },
  {
    icon: Download,
    title: 'Export Options',
    description: 'Download your recordings and feedback reports'
  }
];

const handleNavigationError = (error: any) => {
  console.error('Navigation error:', error);
};

export default function VisualSimulationPage() {
  const [selectedMode, setSelectedMode] = useState('practice');

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#fcba2810_0%,transparent_65%)] blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,#fcba2815_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,#fcba2815_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-block p-4 rounded-full bg-[#fcba28]/20 mb-6"
          >
            <Video className="w-8 h-8 text-[#fcba28]" />
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 text-transparent bg-clip-text"
          >
            Visual Interview Simulation
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-400 max-w-3xl mx-auto mb-12"
          >
            Practice and perfect your interview skills with our advanced AI-powered platform
          </motion.p>
        </div>

        {/* Interview Modes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {InterviewModes.map((mode, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className={`relative overflow-hidden rounded-2xl border border-white/10 backdrop-blur-lg bg-gradient-to-br ${mode.gradient} p-8 group hover:scale-[1.02] transition-all duration-300`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="p-3 rounded-lg bg-[#fcba28]/20 inline-block mb-4">
                  <mode.icon className="w-6 h-6 text-[#fcba28]" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{mode.title}</h3>
                <p className="text-gray-300 mb-6">{mode.description}</p>
                <ul className="space-y-3 mb-8">
                  {mode.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-gray-400">
                      <CheckCircle className="w-5 h-5 text-[#fcba28] mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link href={mode.link} onClick={() => handleNavigationError(new Error('Navigation to ' + mode.link))}>
                  <button className="w-full px-6 py-3 bg-[#fcba28] text-black rounded-lg hover:bg-[#fcd978] transition-colors duration-200 font-medium flex items-center justify-center gap-2">
                    Start Now
                    <Play className="w-4 h-4" />
                  </button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-white text-center mb-12">Advanced Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-6 bg-white/5 border border-white/10 rounded-xl backdrop-blur-lg hover:bg-white/10 transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-lg bg-[#fcba28]/20">
                    <feature.icon className="w-6 h-6 text-[#fcba28]" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
                </div>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center bg-white/5 border border-white/10 rounded-2xl p-12 backdrop-blur-lg"
        >
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Start Practicing?</h2>
          <p className="text-gray-400 mb-8">Choose your preferred interview mode and begin your journey to interview success</p>
          <button className="px-8 py-4 bg-[#fcba28] text-black rounded-lg hover:bg-[#fcd978] transition-colors duration-200 font-medium text-lg">
            Get Started Now
          </button>
        </motion.div>
      </div>
    </div>
  );
}