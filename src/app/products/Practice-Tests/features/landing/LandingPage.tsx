"use client";

import { motion } from "framer-motion";
import { FaCode, FaRobot, FaArrowRight, FaGraduationCap } from 'react-icons/fa';

interface LandingPageProps {
  onOptionSelect: (option: 'standard' | 'ai') => void;
}

const options = [
  {
    id: 'standard',
    title: 'Standard Practice Tests',
    description: 'Access our curated collection of interview practice tests',
    icon: FaCode,
    color: 'from-[#fcba28] to-[#fcd978]',
    features: [
      'Comprehensive test coverage',
      'Multiple difficulty levels',
      'Detailed explanations',
      'Progress tracking'
    ]
  },
  {
    id: 'ai',
    title: 'AI-Generated Tests',
    description: 'Get personalized tests created by our AI system',
    icon: FaRobot,
    color: 'from-[#fcba28] to-[#fcd978]',
    features: [
      'Customized difficulty',
      'Topic selection',
      'Real-time generation',
      'Adaptive questions'
    ]
  }
];

export default function LandingPage({ onOptionSelect }: LandingPageProps) {
  return (
    <div className="min-h-[80vh]">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="relative">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-block mb-6"
            >
              <div className="p-4 rounded-2xl bg-gradient-to-r from-[#fcba28]/20 to-[#fcd978]/20 backdrop-blur-sm">
                <FaGraduationCap className="w-12 h-12 text-[#fcba28]" />
              </div>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-[#fcba28] via-[#fcd978] to-[#fcba28] text-transparent bg-clip-text"
            >
              Master Your Technical Interviews
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-xl text-gray-300 max-w-2xl mx-auto mb-12"
            >
              Choose your path to interview success with our comprehensive practice tests
              or AI-generated custom challenges.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mt-16">
            {options.map((option, index) => (
              <motion.div
                key={option.id}
                initial={{ opacity: 0, x: index === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + (index * 0.2) }}
                onClick={() => onOptionSelect(option.id as 'standard' | 'ai')}
                className="group cursor-pointer"
              >
                <div className="relative h-full p-8 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 transition-all duration-300 hover:scale-[1.02] hover:bg-white/10">
                  <div className={`absolute inset-0 opacity-10 rounded-2xl bg-gradient-to-br ${option.color}`} />
                  
                  <div className="relative">
                    <option.icon className="w-12 h-12 mb-6 text-[#fcba28]" />
                    
                    <h3 className="text-2xl font-bold mb-4">{option.title}</h3>
                    <p className="text-gray-400 mb-6">{option.description}</p>

                    <ul className="space-y-3 mb-8">
                      {option.features.map((feature, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.8 + (i * 0.1) }}
                          className="flex items-center text-gray-300"
                        >
                          <svg className="w-4 h-4 mr-2 text-[#fcba28]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {feature}
                        </motion.li>
                      ))}
                    </ul>

                    <motion.div
                      className="flex items-center text-[#fcba28] group-hover:gap-2 transition-all"
                      whileHover={{ x: 5 }}
                    >
                      Get Started
                      <FaArrowRight className="ml-2" />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="grid grid-cols-3 gap-8 max-w-3xl mx-auto mt-16 p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10"
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-[#fcba28]">500+</div>
              <div className="text-sm text-gray-400">Practice Tests</div>
            </div>
            <div className="text-center border-x border-white/10">
              <div className="text-3xl font-bold text-[#fcba28]">∞</div>
              <div className="text-sm text-gray-400">AI Generated Tests</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#fcba28]">10+</div>
              <div className="text-sm text-gray-400">Categories</div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
