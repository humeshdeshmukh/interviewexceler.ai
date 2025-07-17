"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, TrendingUp, Building2, DollarSign, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SalaryForm } from './components/SalaryForm';
import { SalaryResults } from './components/SalaryResults';
import { useSalaryPrediction } from './hooks/useSalaryPrediction';
import Link from 'next/link';

export default function SalaryNegotiationPage() {
  const [showResults, setShowResults] = useState(false);
  const { result, loading, error, getPrediction } = useSalaryPrediction();

  useEffect(() => {
    if (error) {
      setShowResults(false);
    }
  }, [error]);

  const handleSubmit = async (formData: any) => {
    try {
      await getPrediction(formData);
      setShowResults(true);
    } catch (err) {
      setShowResults(false);
    }
  };

  const handleReset = () => {
    setShowResults(false);
  };

  return (
    <div className="min-h-screen bg-background text-white pt-20 px-4 md:px-8">
      {/* Background gradients */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#fcba2810_0%,transparent_65%)] blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,#fcba2815_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,#fcba2815_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      <div className="max-w-6xl mx-auto relative">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-block p-4 rounded-full bg-[#fcba28]/20 mb-6"
          >
            <Calculator className="w-8 h-8 text-[#fcba28]" />
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#fcba28] via-[#fcd978] to-[#fcba28] text-transparent bg-clip-text">
            AI Salary Negotiation
          </h1>
          <p className="text-xl text-gray-300">
            Get accurate salary insights powered by AI
          </p>
        </div>

        {/* Main Content */}
        <AnimatePresence mode="wait">
          {!showResults ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.5 }}
            >
              <SalaryForm onSubmit={handleSubmit} />
            </motion.div>
          ) : (
            <motion.div
              key="results"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              <div className="flex justify-end">
                <Button
                  onClick={handleReset}
                  variant="outline"
                  className="text-[#fcba28] border-[#fcba28] hover:bg-[#fcba28]/10 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Start Over
                </Button>
              </div>
              <SalaryResults result={result} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Loading Overlay */}
        <AnimatePresence>
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
            >
              <div className="bg-gray-900/90 p-8 rounded-xl shadow-xl text-center backdrop-blur-lg border border-[#fcba28]/20">
                <div className="relative w-16 h-16 mx-auto mb-4">
                  <motion.div
                    className="absolute inset-0 rounded-full border-4 border-[#fcba28] border-t-transparent"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  />
                </div>
                <p className="text-lg text-white">Analyzing salary data...</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Error Message */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-red-500/10 border border-red-500/20 rounded-lg p-6 mt-4 text-center backdrop-blur-sm"
            >
              <div className="text-red-400 mb-2 text-lg font-semibold">
                Error Processing Request
              </div>
              <p className="text-red-300">{error}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
