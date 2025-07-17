"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaLightbulb, FaChartLine, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';

interface ResumeAnalyzerProps {
  content: {
    personalInfo?: {
      name: string;
      email: string;
      phone: string;
      location: string;
      linkedin?: string;
    };
    experience?: Array<{
      company: string;
      position: string;
      duration: string;
      description: string[];
    }>;
    education?: Array<{
      institution: string;
      degree: string;
      duration: string;
      gpa?: number;
    }>;
    skills?: string[];
  };
}

export default function ResumeAnalyzer({ content }: ResumeAnalyzerProps) {
  const [analysis, setAnalysis] = useState<{
    score: number;
    suggestions: string[];
    strengths: string[];
    weaknesses: string[];
  } | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'suggestions' | 'ai'>('overview');

  useEffect(() => {
    analyzeResume();
  }, [content]);

  const analyzeResume = () => {
    const result = {
      score: 0,
      suggestions: [] as string[],
      strengths: [] as string[],
      weaknesses: [] as string[]
    };

    // Analyze Personal Info
    if (content.personalInfo) {
      const { linkedin } = content.personalInfo;
      if (!linkedin) {
        result.suggestions.push('Add your LinkedIn profile to increase visibility');
      } else {
        result.strengths.push('Professional online presence with LinkedIn');
      }
    }

    // Analyze Experience
    if (content.experience) {
      if (content.experience.length > 0) {
        result.strengths.push('Has relevant work experience');
        
        // Check for quantifiable achievements
        const hasQuantifiableAchievements = content.experience.some(exp => 
          exp.description.some(desc => /\d+%|\$\d+|\d+ (people|clients|users)/.test(desc))
        );
        
        if (!hasQuantifiableAchievements) {
          result.suggestions.push('Add quantifiable achievements to your experience');
        }
      } else {
        result.weaknesses.push('No work experience listed');
      }
    }

    // Analyze Education
    if (content.education) {
      if (content.education.length > 0) {
        result.strengths.push('Educational background included');
        
        const hasGPA = content.education.some(edu => edu.gpa && edu.gpa > 3.5);
        if (hasGPA) {
          result.strengths.push('Strong academic performance highlighted');
        }
      }
    }

    // Analyze Skills
    if (content.skills) {
      if (content.skills.length >= 5) {
        result.strengths.push('Good range of skills listed');
      } else {
        result.suggestions.push('Add more relevant skills to your resume');
      }
    }

    // Calculate score
    result.score = calculateScore(result);
    setAnalysis(result);
  };

  const calculateScore = (result: typeof analysis) => {
    if (!result) return 0;
    
    let score = 70; // Base score
    score += result.strengths.length * 5;
    score -= result.weaknesses.length * 5;
    score = Math.min(100, Math.max(0, score));
    
    return score;
  };

  if (!analysis) return null;

  return (
    <div className="bg-white/5 rounded-xl p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#fcba28]">Resume Analysis</h2>
        <div className="flex gap-2">
          {(['overview', 'suggestions', 'ai'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg transition-all ${
                activeTab === tab
                  ? 'bg-[#fcba28] text-black'
                  : 'bg-white/5 text-gray-300 hover:bg-white/10'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-center">
              <div className="relative w-32 h-32">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="60"
                    cy="60"
                    r="54"
                    fill="none"
                    stroke="#333"
                    strokeWidth="12"
                  />
                  <circle
                    cx="60"
                    cy="60"
                    r="54"
                    fill="none"
                    stroke="#fcba28"
                    strokeWidth="12"
                    strokeDasharray={`${339.292 * (analysis.score / 100)} 339.292`}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl font-bold text-[#fcba28]">
                    {analysis.score}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-green-400 flex items-center gap-2">
                  <FaCheckCircle /> Strengths
                </h3>
                <ul className="space-y-2">
                  {analysis.strengths.map((strength, index) => (
                    <li key={index} className="text-gray-300 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                      {strength}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-yellow-400 flex items-center gap-2">
                  <FaExclamationTriangle /> Areas to Improve
                </h3>
                <ul className="space-y-2">
                  {analysis.weaknesses.map((weakness, index) => (
                    <li key={index} className="text-gray-300 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full" />
                      {weakness}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'suggestions' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            {analysis.suggestions.map((suggestion, index) => (
              <div
                key={index}
                className="bg-white/5 p-4 rounded-lg flex items-start gap-3"
              >
                <FaLightbulb className="text-[#fcba28] mt-1" />
                <p className="text-gray-300">{suggestion}</p>
              </div>
            ))}
          </motion.div>
        )}

        {activeTab === 'ai' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            <div className="bg-white/5 p-4 rounded-lg">
              <div className="flex items-start gap-3">
                <FaChartLine className="text-blue-400 mt-1" />
                <div>
                  <h4 className="font-semibold text-blue-400 mb-2">AI Insights</h4>
                  <p className="text-gray-300">
                    Based on current job market trends and your resume content, here are some
                    AI-powered suggestions for improvement...
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
