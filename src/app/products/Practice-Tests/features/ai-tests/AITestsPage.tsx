'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRobot } from 'react-icons/fa';
import AITestForm from './components/AITestForm';
import TestSession from './components/TestSession';
import ResultSummary from './components/ResultSummary';
import { generateTest } from './services/gemini';
import type { TestFormData } from './services/gemini';

const BackgroundGradient = () => {
  return (
    <motion.div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%"],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,#fcba2810_0%,transparent_65%)] blur-3xl"
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,#fcba2815_0%,transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,#fcba2815_0%,transparent_50%)]" />
    </motion.div>
  );
};

const GridPattern = () => {
  return (
    <motion.div className="absolute inset-0 pointer-events-none">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_-30%,#fcba2815,transparent)]" />
    </motion.div>
  );
};

export default function AITestsPage({ onBack }: { onBack?: () => void }) {
  const [view, setView] = useState<'form' | 'test' | 'results'>('form');
  const [loading, setLoading] = useState(false);
  const [generatedTest, setGeneratedTest] = useState<any>(null);
  const [testResults, setTestResults] = useState<any>(null);

  const handleFormSubmit = async (formData: TestFormData) => {
    setLoading(true);
    try {
      const test = await generateTest(formData);
      setGeneratedTest(test);
      setView('test');
    } catch (error) {
      console.error('Error generating test:', error);
      alert('Failed to generate test. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleTestComplete = (results: any) => {
    setTestResults(results);
    setView('results');
  };

  const handleRetry = () => {
    setGeneratedTest(null);
    setTestResults(null);
    setView('form');
  };

  return (
    <div className="relative w-full h-full">
      <div className="relative z-10 w-full h-full px-4 py-8 flex flex-col">
        {/* Header - Only show on form view or if needed */}
        {view === 'form' && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            {/* <div className="inline-flex items-center justify-center p-4 rounded-2xl bg-gradient-to-r from-[#fcba28]/10 to-[#fcd978]/10 backdrop-blur-sm mb-6">
              <FaRobot className="w-12 h-12 text-[#fcba28]" />
            </div> */}
            <h1 className="text-4xl font-bold mb-4 text-[#fcba28]">AI Interview Test Generator</h1>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Generate customized technical interview tests powered by AI. Practice with real-world questions and get instant feedback.
            </p>
            {/* {onBack && (
              <button
                onClick={onBack}
                className="mt-8 text-sm text-gray-500 hover:text-white transition-colors"
              >
                ← Back to Selection
              </button>
            )} */}
          </motion.div>
        )}

        <AnimatePresence mode="wait">
          {view === 'form' && (
            <motion.div
              key="form"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="w-full flex-1"
            >
              <AITestForm
                onSubmit={handleFormSubmit}
                loading={loading}
              />
            </motion.div>
          )}

          {view === 'test' && generatedTest && (
            <motion.div
              key="test"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="w-full h-full"
            >
              <TestSession
                test={generatedTest}
                onComplete={handleTestComplete}
                onExit={() => setView('form')}
              />
            </motion.div>
          )}

          {view === 'results' && testResults && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full h-full"
            >
              <ResultSummary
                results={testResults}
                test={generatedTest}
                onRetry={handleRetry}
                onHome={() => {
                  if (onBack) onBack();
                  else setView('form');
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
