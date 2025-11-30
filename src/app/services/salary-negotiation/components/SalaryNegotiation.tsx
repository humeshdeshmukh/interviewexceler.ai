"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaDollarSign, FaChartLine, FaSpinner, FaBriefcase, FaGraduationCap, FaMapMarkerAlt, FaIndustry, FaCheckCircle, FaTimes, FaHandshake } from 'react-icons/fa';
import { SalaryFormData, NegotiationState, AIAnalysis } from '../types';
import { INDUSTRIES, EXPERIENCE_LEVELS, COMMON_BENEFITS, COMMON_SKILLS } from '../constants';

const formVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  },
  exit: { 
    opacity: 0, 
    y: -20,
    transition: {
      duration: 0.3,
      ease: "easeIn"
    }
  }
};

const cardVariants = {
  initial: { scale: 0.95, opacity: 0 },
  animate: { 
    scale: 1, 
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  },
  hover: {
    scale: 1.02,
    transition: {
      duration: 0.2,
      ease: "easeInOut"
    }
  }
};

export default function SalaryNegotiation() {
  const [formData, setFormData] = useState<SalaryFormData>({
    role: '',
    experience: 0,
    location: '',
    industry: '',
    currentSalary: 0,
    currentOffer: undefined,
    benefits: [],
    skills: [],
    targetSalary: undefined,
    notes: ''
  });

  const [state, setState] = useState<NegotiationState>({
    step: 1,
    isAnalyzing: false,
    error: null,
    analysis: null
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name.includes('Salary') || name === 'experience' ? Number(value) : value
    }));
  };

  const handleMultiSelect = (category: 'benefits' | 'skills', item: string) => {
    setFormData(prev => ({
      ...prev,
      [category]: prev[category].includes(item)
        ? prev[category].filter(i => i !== item)
        : [...prev[category], item]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState(prev => ({ ...prev, isAnalyzing: true, error: null }));
    
    try {
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockAnalysis: AIAnalysis = {
        marketData: {
          percentile: 75,
          competitiveness: 'High',
          marketLow: 80000,
          marketMedian: 120000,
          marketHigh: 180000,
          growthRate: 12,
          demandLevel: 'Very High'
        },
        strategies: [
          {
            approach: 'Value-Based Negotiation',
            keyPoints: ['Market research', 'Past achievements', 'Future value'],
            talkingPoints: ['Industry experience', 'Leadership skills'],
            risksToAvoid: ['Emotional arguments', 'Ultimatums']
          }
        ],
        benefitsAnalysis: [
          {
            category: 'Health Insurance',
            value: 'Comprehensive',
            marketComparison: 'Above Market',
            negotiationTip: 'Focus on other benefits'
          }
        ],
        recommendations: [
          'Request 15% above current offer',
          'Emphasize recent certifications',
          'Discuss remote work options'
        ],
        skillsGap: [
          'Cloud Architecture',
          'Team Leadership'
        ]
      };

      setState(prev => ({
        ...prev,
        step: prev.step + 1,
        isAnalyzing: false,
        analysis: mockAnalysis
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        isAnalyzing: false,
        error: 'Failed to analyze data. Please try again."
      }));
    }
  };

  const renderForm = () => (
    <motion.form
      variants={formVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="space-y-6 bg-white/5 backdrop-blur-lg p-8 rounded-xl border border-white/10 max-w-2xl mx-auto"
      onSubmit={handleSubmit}
    >
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-white/90">
              Job Role
              <div className="mt-1 relative">
                <FaBriefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-[#fcba28]" />
                <input
                  type="text"
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className="pl-10 block w-full rounded-lg bg-white/10 border-white/20 text-white placeholder-white/50"
                  required
                  placeholder="e.g. Senior Developer"
                />
              </div>
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-white/90">
              Experience Level
              <div className="mt-1 relative">
                <FaGraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 text-[#fcba28]" />
                <select
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  className="pl-10 block w-full rounded-lg bg-white/10 border-white/20 text-white"
                  required
                >
                  <option value="">Select Experience</option>
                  {EXPERIENCE_LEVELS.map(level => (
                    <option key={level.id} value={level.range[0]}>
                      {level.name}
                    </option>
                  ))}
                </select>
              </div>
            </label>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-white/90">
              Location
              <div className="mt-1 relative">
                <FaMapMarkerAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-[#fcba28]" />
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="pl-10 block w-full rounded-lg bg-white/10 border-white/20 text-white"
                  required
                  placeholder="City, Country"
                />
              </div>
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-white/90">
              Industry
              <div className="mt-1 relative">
                <FaIndustry className="absolute left-3 top-1/2 -translate-y-1/2 text-[#fcba28]" />
                <select
                  name="industry"
                  value={formData.industry}
                  onChange={handleInputChange}
                  className="pl-10 block w-full rounded-lg bg-white/10 border-white/20 text-white"
                  required
                >
                  <option value="">Select Industry</option>
                  {INDUSTRIES.map(industry => (
                    <option key={industry.id} value={industry.id}>
                      {industry.icon} {industry.name}
                    </option>
                  ))}
                </select>
              </div>
            </label>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-white/90">
              Current Salary
              <div className="mt-1 relative">
                <FaDollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-[#fcba28]" />
                <input
                  type="number"
                  name="currentSalary"
                  value={formData.currentSalary || ''}
                  onChange={handleInputChange}
                  className="pl-10 block w-full rounded-lg bg-white/10 border-white/20 text-white"
                  required
                  placeholder="Annual salary"
                />
              </div>
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-white/90">
              Target Salary (Optional)
              <div className="mt-1 relative">
                <FaChartLine className="absolute left-3 top-1/2 -translate-y-1/2 text-[#fcba28]" />
                <input
                  type="number"
                  name="targetSalary"
                  value={formData.targetSalary || ''}
                  onChange={handleInputChange}
                  className="pl-10 block w-full rounded-lg bg-white/10 border-white/20 text-white"
                  placeholder="Desired salary"
                />
              </div>
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-white/90 mb-2">
            Benefits
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {COMMON_BENEFITS.map(benefit => (
              <motion.button
                key={benefit.id}
                type="button"
                variants={cardVariants}
                whileHover="hover"
                onClick={() => handleMultiSelect('benefits', benefit.id)}
                className={`p-2 rounded-lg text-sm flex items-center gap-2 transition-colors ${
                  formData.benefits.includes(benefit.id)
                    ? 'bg-[#fcba28] text-black'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                <span>{benefit.icon}</span>
                {benefit.name}
              </motion.button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-white/90 mb-2">
            Key Skills
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {COMMON_SKILLS.map(skill => (
              <motion.button
                key={skill.id}
                type="button"
                variants={cardVariants}
                whileHover="hover"
                onClick={() => handleMultiSelect('skills', skill.id)}
                className={`p-2 rounded-lg text-sm flex items-center gap-2 transition-colors ${
                  formData.skills.includes(skill.id)
                    ? 'bg-[#fcba28] text-black'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                {skill.name}
              </motion.button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-white/90">
            Additional Notes (Optional)
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              rows={3}
              className="mt-1 block w-full rounded-lg bg-white/10 border-white/20 text-white"
              placeholder="Any additional context about your situation..."
            />
          </label>
        </div>
      </div>

      <div className="flex justify-end">
        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-6 py-2 bg-[#fcba28] text-black rounded-lg font-medium flex items-center gap-2"
          disabled={state.isAnalyzing}
        >
          {state.isAnalyzing ? (
            <>
              <FaSpinner className="animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <FaHandshake />
              Get Negotiation Strategy
            </>
          )}
        </motion.button>
      </div>
    </motion.form>
  );

  const renderAnalysis = () => {
    if (!state.analysis) return null;

    return (
      <motion.div
        variants={formVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="space-y-6"
      >
        <div className="bg-white/5 backdrop-blur-lg p-8 rounded-xl border border-white/10">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
            <FaChartLine className="text-[#fcba28]" />
            Market Analysis
          </h2>
          {/* Market analysis content */}
        </div>

        <div className="bg-white/5 backdrop-blur-lg p-8 rounded-xl border border-white/10">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
            <FaHandshake className="text-[#fcba28]" />
            Negotiation Strategy
          </h2>
          {/* Strategy content */}
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <AnimatePresence mode="wait">
        {state.step === 1 ? renderForm() : renderAnalysis()}
      </AnimatePresence>
    </div>
  );
}
