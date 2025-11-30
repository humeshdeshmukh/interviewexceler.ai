'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaChartLine, FaLightbulb, FaExclamationTriangle, FaGraduationCap } from 'react-icons/fa';
import type { AnalysisResult } from '../../services/skill-analyzer';
import { SkillsRadar } from './SkillsRadar';
import { theme } from '../../constants/theme';

interface AnalysisResultsProps {
  result: AnalysisResult;
  onNewAnalysis: () => void;
}

export const AnalysisResults: React.FC<AnalysisResultsProps> = ({
  result,
  onNewAnalysis
}) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="space-y-12">
      {/* Overall Score and Market Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          variants={item}
          className="bg-white/5 p-6 rounded-xl border border-white/10 text-center"
        >
          <h3 className="text-lg font-semibold text-[#fcba28] mb-2">Overall Score</h3>
          <div className="text-4xl font-bold text-white mb-2">{result.overallScore}%</div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${result.overallScore}%` }}
              className="h-full bg-[#fcba28]"
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>
        </motion.div>

        <motion.div
          variants={item}
          className="bg-white/5 p-6 rounded-xl border border-white/10 text-center"
        >
          <h3 className="text-lg font-semibold text-[#fcba28] mb-2">Market Relevance</h3>
          <div className="text-4xl font-bold text-white mb-2">{result.marketRelevance}%</div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${result.marketRelevance}%` }}
              className="h-full bg-[#7B61FF]"
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>
        </motion.div>

        <motion.div
          variants={item}
          className="bg-white/5 p-6 rounded-xl border border-white/10 text-center"
        >
          <h3 className="text-lg font-semibold text-[#fcba28] mb-2">Growth Potential</h3>
          <div className="text-4xl font-bold text-white mb-2">{result.growthPotential}%</div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${result.growthPotential}%` }}
              className="h-full bg-[#FF6B6B]"
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>
        </motion.div>
      </div>

      {/* Skills Radar Chart */}
      <motion.div
        variants={item}
        className="bg-white/5 p-6 rounded-xl border border-white/10"
      >
        <h3 className="text-lg font-semibold text-[#fcba28] mb-6 text-center">Skills Distribution</h3>
        <SkillsRadar result={result} />
      </motion.div>

      {/* Strengths and Areas for Improvement */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          variants={item}
          className="bg-white/5 p-6 rounded-xl border border-white/10"
        >
          <h3 className="text-lg font-semibold text-[#fcba28] mb-4 flex items-center gap-2">
            <FaChartLine className="text-green-400" />
            Key Strengths
          </h3>
          <ul className="space-y-3">
            {result.strengths.map((strength, index) => (
              <motion.li
                key={index}
                variants={item}
                className="flex items-start gap-3 bg-white/5 p-3 rounded-lg border border-white/10"
              >
                <span className="text-gray-300">{strength}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          variants={item}
          className="bg-white/5 p-6 rounded-xl border border-white/10"
        >
          <h3 className="text-lg font-semibold text-[#fcba28] mb-4 flex items-center gap-2">
            <FaExclamationTriangle className="text-yellow-400" />
            Areas for Improvement
          </h3>
          <ul className="space-y-3">
            {result.areasForImprovement.map((area, index) => (
              <motion.li
                key={index}
                variants={item}
                className="flex items-start gap-3 bg-white/5 p-3 rounded-lg border border-white/10"
              >
                <span className="text-gray-300">{area}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* Learning Path */}
      <motion.div
        variants={item}
        className="bg-white/5 p-6 rounded-xl border border-white/10"
      >
        <h3 className="text-lg font-semibold text-[#fcba28] mb-6 flex items-center gap-2">
          <FaGraduationCap className="text-[#fcba28]" />
          Recommended Learning Path
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {result.learningPath.map((item, index) => (
            <motion.div
              key={index}
              variants={item}
              className="bg-white/5 p-4 rounded-lg border border-white/10 hover:border-[#fcba28]/50 transition-colors duration-300"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className={`px-2 py-1 rounded text-xs font-medium ${
                  item.priority === 'high'
                    ? 'bg-red-400/20 text-red-400'
                    : item.priority === 'medium'
                    ? 'bg-yellow-400/20 text-yellow-400'
                    : 'bg-green-400/20 text-green-400'
                }`}>
                  {item.priority.toUpperCase()}
                </div>
                <span className="text-sm text-gray-400">{item.timeEstimate}</span>
              </div>
              <h4 className="font-medium text-white mb-2">{item.skill}</h4>
              <div className="space-y-2">
                {item.resources.map((resource, i) => (
                  <div key={i} className="text-sm text-gray-300">
                    • {resource}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div variants={item} className="flex justify-center">
        <button
          onClick={onNewAnalysis}
          className="px-6 py-3 bg-gradient-to-r from-[#fcba28] to-[#fcd978] text-black rounded-xl hover:from-[#fcd978] hover:to-[#fcba28] transition-all duration-300 flex items-center gap-2 font-medium shadow-lg shadow-[#fcba28]/20"
        >
          <FaLightbulb className="w-4 h-4" />
          Start New Analysis
        </button>
      </motion.div>
    </div>
  );
};
