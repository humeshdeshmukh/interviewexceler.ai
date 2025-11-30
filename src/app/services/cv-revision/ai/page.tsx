"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, ArrowLeft, Download, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCVAnalysis } from './hooks/useCVAnalysis';
import { useCVOptimization } from './hooks/useCVOptimization';
import { FileUpload } from './components/FileUpload';
import { AnalysisDashboard } from './components/AnalysisDashboard';
import { OptimizationModal } from './components/OptimizationModal';
import { OptimizationOptions } from './lib/gemini';

export default function CVRevisionPage() {
  const [showResults, setShowResults] = useState(false);
  const [showOptimizationModal, setShowOptimizationModal] = useState(false);
  const { analyzeCV, isAnalyzing, error, result, cvText } = useCVAnalysis();
  const { optimize, isOptimizing, error: optimizationError, result: optimizedResult, reset: resetOptimization } = useCVOptimization();

  const handleFileContent = async (content: string) => {
    try {
      await analyzeCV(content);
      setShowResults(true);
    } catch (err) {
      console.error('Analysis error:', err);
    }
  };

  const handleError = (error: string) => {
    console.error('File upload error:', error);
  };

  const handleReset = () => {
    setShowResults(false);
    setShowOptimizationModal(false);
    resetOptimization();
  };

  const handleOptimize = (options: OptimizationOptions) => {
    if (cvText) {
      optimize(cvText, options);
    }
  };

  const handleOpenOptimizationModal = () => {
    setShowOptimizationModal(true);
    resetOptimization();
  };

  const handleDownload = () => {
    if (!result) return;

    const analysisResult = {
      timestamp: new Date().toLocaleString(),
      ...result
    };

    const content = `CV Analysis Report
Generated on: ${analysisResult.timestamp}

ATS COMPATIBILITY SCORES
------------------------
Overall Score: ${result.atsScores.overall.score}%
Feedback: ${result.atsScores.overall.feedback}

Format Score: ${result.atsScores.format.score}%
Keyword Score: ${result.atsScores.keyword.score}%
Relevance Score: ${result.atsScores.relevance.score}%

PRIORITY IMPROVEMENTS
---------------------
CRITICAL:
${result.improvements.critical.map((imp: any) => `- ${imp.point}\\n  Solution: ${imp.solution}`).join('\\n')}

IMPORTANT:
${result.improvements.important.map((imp: any) => `- ${imp.point}\\n  Solution: ${imp.solution}`).join('\\n')}

RECOMMENDED:
${result.improvements.recommended.map((imp: any) => `- ${imp.point}\\n  Solution: ${imp.solution}`).join('\\n')}

MARKET INSIGHTS
---------------
Trends:
${result.marketInsights.trends.map((t: string) => `- ${t}`).join('\\n')}

Top Keywords:
${result.marketInsights.keywords.map((k: any) => `- ${k.word}: ${k.count}`).join('\\n')}

ACTION PLAN
-----------
Immediate (24-48h):
${result.actionPlan.immediate.map((a: any) => `- ${a.action}`).join('\\n')}

Short-term (1-2w):
${result.actionPlan.shortTerm.map((a: any) => `- ${a.action}`).join('\\n')}

Long-term (1-3m):
${result.actionPlan.longTerm.map((a: any) => `- ${a.action}`).join('\\n')}
`;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cv-analysis-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
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

      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-block p-4 rounded-full bg-[#fcba28]/20 mb-6"
          >
            <FileText className="w-8 h-8 text-[#fcba28]" />
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#fcba28] via-[#fcd978] to-[#fcba28] text-transparent bg-clip-text">
            AI CV Analysis
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-6">
            Upload your CV and get instant insights powered by AI. Our analysis covers ATS compatibility,
            skills assessment, and actionable recommendations.
          </p>
        </div>

        {/* Main Content */}
        <div className="relative min-h-[400px]">
          <AnimatePresence mode="wait">
            {!showResults ? (
              <motion.div
                key="upload"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-2xl mx-auto"
              >
                <FileUpload
                  onFileContent={handleFileContent}
                  onError={handleError}
                />
              </motion.div>
            ) : (
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="relative"
              >
                {/* Results Header */}
                <div className="flex justify-between items-center mb-8 bg-black/20 p-4 rounded-xl backdrop-blur-sm border border-white/5">
                  <Button
                    onClick={handleReset}
                    variant="ghost"
                    className="text-gray-400 hover:text-white hover:bg-white/10"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Upload Another CV
                  </Button>
                  <div className="flex gap-3">
                    <Button
                      onClick={handleOpenOptimizationModal}
                      className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold shadow-lg shadow-purple-500/20"
                    >
                      <Sparkles className="w-4 h-4 mr-2" />
                      Optimize Resume
                    </Button>
                    <Button
                      onClick={handleDownload}
                      className="bg-[#fcba28] hover:bg-[#fcba28]/90 text-black font-semibold shadow-lg shadow-[#fcba28]/20"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download Report
                    </Button>
                  </div>
                </div>

                {result && <AnalysisDashboard result={result} />}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Loading Overlay */}
        <AnimatePresence>
          {isAnalyzing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50"
            >
              <div className="text-center space-y-8">
                <div className="relative w-24 h-24 mx-auto">
                  <motion.div
                    className="absolute inset-0 border-4 border-[#fcba28]/30 rounded-full"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <motion.div
                    className="absolute inset-0 border-4 border-t-[#fcba28] rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Sparkles className="w-8 h-8 text-[#fcba28]" />
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">Analyzing Your CV</h3>
                  <p className="text-gray-400">Our AI is checking ATS compatibility and content quality...</p>
                </div>
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
              className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-red-500/20 border border-red-500/50 rounded-lg px-6 py-4 text-center backdrop-blur-md z-50"
            >
              <div className="text-red-400 mb-2 text-lg font-semibold">
                Error Processing Request
              </div>
              <p className="text-red-300">{error}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Optimization Modal */}
        <OptimizationModal
          isOpen={showOptimizationModal}
          onClose={() => setShowOptimizationModal(false)}
          originalCV={cvText || ''}
          onOptimize={handleOptimize}
          isOptimizing={isOptimizing}
          optimizedResult={optimizedResult}
          error={optimizationError}
        />
      </div>
    </div>
  );
}
