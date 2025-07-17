'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRobot, FaBrain, FaChartLine, FaSpinner } from 'react-icons/fa';
import { SkillInput } from './components/input/SkillInput';
import { AnalysisResults } from './components/analysis/AnalysisResults';
import { SkillAnalyzer, type SkillAssessment, type AnalysisResult } from './services/skill-analyzer';
import { theme } from './constants/theme';

export default function SkillsAnalyzer() {
  const [activeTab, setActiveTab] = useState<'input' | 'analysis'>('input');
  const [selectedMode, setSelectedMode] = useState<'quick' | 'detailed' | 'ai'>('quick');
  const [skills, setSkills] = useState<SkillAssessment[]>([]);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const addSkill = () => {
    setSkills([
      ...skills,
      {
        skillId: '',
        proficiencyLevel: 1,
        yearsOfExperience: 0,
        lastUsed: new Date().toISOString().split('T')[0],
        confidenceLevel: 1,
        projects: []
      }
    ]);
  };

  const removeSkill = (index: number) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  const updateSkill = (index: number, updates: Partial<SkillAssessment>) => {
    setSkills(
      skills.map((skill, i) => (i === index ? { ...skill, ...updates } : skill))
    );
  };

  const analyzeSkills = async () => {
    setIsLoading(true);
    try {
      const analyzer = new SkillAnalyzer();
      const result = selectedMode === 'ai'
        ? await analyzer.analyzeSkillsWithAI(skills)
        : analyzer.analyzeSkills(skills);
      setAnalysisResult(result);
      setActiveTab('analysis');
    } catch (error) {
      console.error('Failed to analyze skills:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const startNewAnalysis = () => {
    setActiveTab('input');
    setSkills([]);
    setAnalysisResult(null);
  };

  return (
    <div className="min-h-screen bg-background text-white pt-20 px-4 md:px-8">
      {/* Enhanced Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#fcba2810_0%,transparent_65%)] blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,#fcba2815_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,#fcba2815_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-[#fcba28]/5" />
      </div>

      <div className="max-w-6xl mx-auto relative">
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.6 }}
            className="w-20 h-20 mx-auto bg-gradient-to-br from-[#fcba28] to-[#fcd978] rounded-2xl p-5 shadow-lg shadow-[#fcba28]/20 mb-8"
          >
            <FaBrain className="w-full h-full text-black" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            <span className="bg-gradient-to-r from-[#fcba28] via-[#fcd978] to-[#fcba28] text-transparent bg-clip-text">
              Skills Analyzer
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-300 max-w-3xl mx-auto"
          >
            Analyze your technical skills and get personalized recommendations for growth
          </motion.p>
        </div>

        {/* Analysis Mode Selection */}
        {activeTab === 'input' && (
          <div className="mb-12">
            <div className="flex justify-center gap-4">
              {['quick', 'detailed', 'ai'].map((mode) => (
                <motion.button
                  key={mode}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedMode(mode as any)}
                  className={`px-6 py-3 rounded-xl flex items-center gap-2 transition-all duration-300 ${
                    selectedMode === mode
                      ? 'bg-gradient-to-r from-[#fcba28] to-[#fcd978] text-black font-medium shadow-lg shadow-[#fcba28]/20'
                      : 'bg-white/5 text-gray-300 hover:bg-white/10'
                  }`}
                >
                  {mode === 'ai' ? <FaRobot className="w-4 h-4" /> : <FaChartLine className="w-4 h-4" />}
                  {mode.charAt(0).toUpperCase() + mode.slice(1)} Analysis
                </motion.button>
              ))}
            </div>
          </div>
        )}

        <AnimatePresence mode="wait">
          {activeTab === 'input' ? (
            <motion.div
              key="input"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <SkillInput
                skills={skills}
                onAddSkill={addSkill}
                onRemoveSkill={removeSkill}
                onUpdateSkill={updateSkill}
              />

              <div className="flex justify-center mt-8">
                <button
                  onClick={analyzeSkills}
                  disabled={isLoading || skills.length === 0}
                  className="px-8 py-4 bg-gradient-to-r from-[#fcba28] to-[#fcd978] text-black rounded-xl hover:from-[#fcd978] hover:to-[#fcba28] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3 font-semibold shadow-lg shadow-[#fcba28]/20"
                >
                  {isLoading ? (
                    <>
                      <FaSpinner className="animate-spin w-5 h-5" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <FaBrain className="w-5 h-5" />
                      Analyze Skills
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="analysis"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {analysisResult && (
                <AnalysisResults
                  result={analysisResult}
                  onNewAnalysis={startNewAnalysis}
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
