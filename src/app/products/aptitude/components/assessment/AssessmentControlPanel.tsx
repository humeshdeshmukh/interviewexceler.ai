'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Brain,
  Clock,
  Target,
  Settings,
  HelpCircle,
  ChevronDown,
} from 'lucide-react';

interface AssessmentSettings {
  difficulty: 'easy' | 'medium' | 'hard' | 'mixed';
  duration: number;
  questionsCount: number;
  topics: string[];
  includeExplanations: boolean;
  adaptiveDifficulty: boolean;
}

const defaultSettings: AssessmentSettings = {
  difficulty: 'medium',
  duration: 30,
  questionsCount: 20,
  topics: [],
  includeExplanations: true,
  adaptiveDifficulty: true,
};

export function AssessmentControlPanel() {
  const [settings, setSettings] = useState<AssessmentSettings>(defaultSettings);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleStartAssessment = async () => {
    try {
      setIsGenerating(true);
      // Call to Gemini API will be implemented here
      const response = await fetch('/api/generate-assessment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(settings),
      });
      
      if (!response.ok) throw new Error('Failed to generate assessment');
      
      const data = await response.json();
      // Handle the generated assessment data
      console.log('Assessment generated:', data);
    } catch (error) {
      console.error('Error generating assessment:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/5 border border-white/10 rounded-2xl p-8 space-y-8"
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold">Assessment Setup</h2>
            <p className="text-white/60">Configure your assessment parameters</p>
          </div>
          <Settings className="w-6 h-6 text-[#fcba28]" />
        </div>

        {/* Settings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Difficulty */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium">
              <Target className="w-4 h-4" />
              Difficulty Level
            </label>
            <select
              value={settings.difficulty}
              onChange={(e) => setSettings({ ...settings, difficulty: e.target.value as any })}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm"
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
              <option value="mixed">Mixed</option>
            </select>
          </div>

          {/* Duration */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium">
              <Clock className="w-4 h-4" />
              Duration (minutes)
            </label>
            <input
              type="number"
              value={settings.duration}
              onChange={(e) => setSettings({ ...settings, duration: parseInt(e.target.value) })}
              min={5}
              max={180}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm"
            />
          </div>

          {/* Questions Count */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium">
              <Brain className="w-4 h-4" />
              Number of Questions
            </label>
            <input
              type="number"
              value={settings.questionsCount}
              onChange={(e) => setSettings({ ...settings, questionsCount: parseInt(e.target.value) })}
              min={5}
              max={50}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm"
            />
          </div>

          {/* Topics */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium">
              <Target className="w-4 h-4" />
              Topics
            </label>
            <div className="relative">
              <select
                multiple
                value={settings.topics}
                onChange={(e) => {
                  const selected = Array.from(e.target.selectedOptions, option => option.value);
                  setSettings({ ...settings, topics: selected });
                }}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm"
              >
                <option value="numerical">Numerical Ability</option>
                <option value="logical">Logical Reasoning</option>
                <option value="verbal">Verbal Ability</option>
                <option value="data">Data Interpretation</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/60" />
            </div>
          </div>
        </div>

        {/* Additional Options */}
        <div className="flex flex-col sm:flex-row gap-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={settings.includeExplanations}
              onChange={(e) => setSettings({ ...settings, includeExplanations: e.target.checked })}
              className="rounded border-white/10 bg-white/5"
            />
            <span className="text-sm">Include Explanations</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={settings.adaptiveDifficulty}
              onChange={(e) => setSettings({ ...settings, adaptiveDifficulty: e.target.checked })}
              className="rounded border-white/10 bg-white/5"
            />
            <span className="text-sm">Adaptive Difficulty</span>
          </label>
        </div>

        {/* Start Button */}
        <div className="flex justify-end">
          <button
            onClick={handleStartAssessment}
            disabled={isGenerating}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#fcba28] text-black font-semibold hover:bg-[#fcba28]/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isGenerating ? (
              <>
                <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                Generating...
              </>
            ) : (
              <>
                Start Assessment
                <HelpCircle className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
