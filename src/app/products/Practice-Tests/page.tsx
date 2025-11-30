"use client";

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { TestProvider } from './context/TestContext';
import LandingPage from './features/landing/LandingPage';
import StandardTestsPage from './features/standard-tests/StandardTestsPage';
import AITestsPage from './features/ai-tests/AITestsPage';
import LoadingSpinner from './components/LoadingSpinner';

function PracticeTestsContent() {
  const searchParams = useSearchParams();
  const [view, setView] = useState<'landing' | 'standard' | 'ai'>('landing');
  const [isLoading, setIsLoading] = useState(false);

  // Check URL params on mount to set initial view
  useEffect(() => {
    const viewParam = searchParams.get('view');
    if (viewParam === 'ai' || viewParam === 'standard') {
      setView(viewParam);
    }
  }, [searchParams]);

  const handleOptionSelect = (option: 'standard' | 'ai') => {
    setIsLoading(true);
    setTimeout(() => {
      setView(option);
      setIsLoading(false);
    }, 500);
  };

  const handleBack = () => {
    setIsLoading(true);
    setTimeout(() => {
      setView('landing');
      setIsLoading(false);
    }, 500);
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

      {/* Content */}
      <div className="relative max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="min-h-[80vh] flex items-center justify-center"
            >
              <LoadingSpinner />
            </motion.div>
          ) : (
            <motion.div
              key={view}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {view === 'landing' && (
                <LandingPage onOptionSelect={handleOptionSelect} />
              )}
              {view === 'standard' && (
                <StandardTestsPage onBack={handleBack} />
              )}
              {view === 'ai' && (
                <AITestsPage onBack={handleBack} />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>


    </div>
  );
}

export default function PracticeTests() {
  return (
    <TestProvider>
      <PracticeTestsContent />
    </TestProvider>
  );
}
