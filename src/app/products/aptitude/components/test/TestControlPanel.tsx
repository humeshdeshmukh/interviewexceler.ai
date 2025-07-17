'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Brain,
  Clock,
  Target,
  Settings,
  BookOpen,
  ChevronDown,
  PlayCircle,
} from 'lucide-react';

interface TestSettings {
  topics: string[];
  subtopics: string[];
  difficulty: 'easy' | 'medium' | 'hard' | 'mixed';
  questionsPerTopic: number;
  timePerQuestion: number;
  showHints: boolean;
  showSolutions: boolean;
}

const defaultSettings: TestSettings = {
  topics: [],
  subtopics: [],
  difficulty: 'medium',
  questionsPerTopic: 5,
  timePerQuestion: 2,
  showHints: true,
  showSolutions: true,
};

export function TestControlPanel() {
  const [settings, setSettings] = useState<TestSettings>(defaultSettings);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleStartTest = async () => {
    try {
      setIsGenerating(true);
      // Call to Gemini API will be implemented here
      const response = await fetch('/api/generate-test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(settings),
      });
      
      if (!response.ok) throw new Error('Failed to generate test');
      
      const data = await response.json();
      // Handle the generated test data
      console.log('Test generated:', data);
    } catch (error) {
      console.error('Error generating test:', error);
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
            <h2 className="text-2xl font-bold">Practice Test Setup</h2>
            <p className="text-white/60">Customize your practice session</p>
          </div>
          <BookOpen className="w-6 h-6 text-[#fcba28]" />
        </div>

        {/* Settings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

          {/* Difficulty */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium">
              <Settings className="w-4 h-4" />
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

          {/* Questions per Topic */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium">
              <Brain className="w-4 h-4" />
              Questions per Topic
            </label>
            <input
              type="number"
              value={settings.questionsPerTopic}
              onChange={(e) => setSettings({ ...settings, questionsPerTopic: parseInt(e.target.value) })}
              min={1}
              max={20}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm"
            />
          </div>

          {/* Time per Question */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium">
              <Clock className="w-4 h-4" />
              Time per Question (minutes)
            </label>
            <input
              type="number"
              value={settings.timePerQuestion}
              onChange={(e) => setSettings({ ...settings, timePerQuestion: parseInt(e.target.value) })}
              min={1}
              max={10}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm"
            />
          </div>
        </div>

        {/* Additional Options */}
        <div className="flex flex-col sm:flex-row gap-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={settings.showHints}
              onChange={(e) => setSettings({ ...settings, showHints: e.target.checked })}
              className="rounded border-white/10 bg-white/5"
            />
            <span className="text-sm">Show Hints</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={settings.showSolutions}
              onChange={(e) => setSettings({ ...settings, showSolutions: e.target.checked })}
              className="rounded border-white/10 bg-white/5"
            />
            <span className="text-sm">Show Solutions</span>
          </label>
        </div>

        {/* Start Button */}
        <div className="flex justify-end">
          <button
            onClick={handleStartTest}
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
                Start Practice
                <PlayCircle className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
