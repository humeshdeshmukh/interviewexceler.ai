"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, ArrowLeft, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCVAnalysis } from './hooks/useCVAnalysis';
import { FileUpload } from './components/FileUpload';

export default function CVRevisionPage() {
  const [showResults, setShowResults] = useState(false);
  const { analyzeCV, isAnalyzing, error, result } = useCVAnalysis();

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
  };

  const handleDownload = () => {
    if (!result) return;

    const analysisResult = {
      timestamp: new Date().toLocaleString(),
      atsScores: result.atsScores,
      improvements: result.improvements,
      skills: result.skills,
      experience: result.experience,
      actionPlan: result.actionPlan
    };

    const content = `CV Analysis Report
Generated on: ${analysisResult.timestamp}

ATS COMPATIBILITY SCORES
${Object.entries(analysisResult.atsScores)
  .map(([key, data]) => `
${key.toUpperCase()} SCORE: ${data.score}%
Feedback: ${data.feedback}
${data.improvements.length > 0 ? '\nImprovements needed:' : ''}
${data.improvements.map(imp => `- ${imp}`).join('\n')}
`).join('\n')}

PRIORITY IMPROVEMENTS

Critical:
${result.improvements.critical.map(imp => `- ${imp.point}${imp.solution ? `\n  Solution: ${imp.solution}` : ''}`).join('\n')}

Important:
${result.improvements.important.map(imp => `- ${imp.point}${imp.solution ? `\n  Solution: ${imp.solution}` : ''}`).join('\n')}

Recommended:
${result.improvements.recommended.map(imp => `- ${imp.point}${imp.solution ? `\n  Solution: ${imp.solution}` : ''}`).join('\n')}

SKILLS ANALYSIS

Technical Skills:
${result.skills.technical.map(skill => `- ${skill.name} - ${skill.proficiency}${skill.context ? ` - ${skill.context}` : ''}`).join('\n')}

Missing Critical Skills:
${result.skills.missing.map(skill => `- ${skill.name} - ${skill.importance}`).join('\n')}

EXPERIENCE ANALYSIS
${result.experience.map(exp => `
${exp.title}
Company: ${exp.company}
Duration: ${exp.duration}
Key Achievements:
${exp.achievements.map(achievement => `- ${achievement}`).join('\n')}
`).join('\n')}

ACTION PLAN

Immediate Actions (24-48 hours):
${result.actionPlan.immediate.map(action => `- ${action.action}`).join('\n')}

Short-term Goals (1-2 weeks):
${result.actionPlan.shortTerm.map(action => `- ${action.action}`).join('\n')}

Long-term Development (1-3 months):
${result.actionPlan.longTerm.map(action => `- ${action.action}`).join('\n')}`;

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

      <div className="max-w-6xl mx-auto relative">
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
        <div className="relative">
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
                <div className="flex justify-between items-center mb-8">
                  <Button
                    onClick={handleReset}
                    variant="ghost"
                    className="text-gray-400 hover:text-white"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Upload Another CV
                  </Button>
                  <Button
                    onClick={handleDownload}
                    className="bg-[#fcba28] hover:bg-[#fcba28]/90 text-black font-semibold"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download Analysis Report
                  </Button>
                </div>

                <div className="space-y-8">
                  {result && (
                    <div className="container mx-auto p-4 space-y-8">
                      {/* ATS Score Card */}
                      <div className="bg-[#fcba28]/5 border border-[#fcba28]/20 rounded-lg p-8">
                        <h3 className="text-xl font-semibold text-[#fcba28] mb-6">ATS Compatibility Score</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
                          {Object.entries(result.atsScores).map(([key, data]) => (
                            <div key={key} className="bg-black/20 p-6 rounded-lg">
                              <div className="relative h-24 w-24 mx-auto mb-4">
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <div className="text-2xl font-bold text-[#fcba28]">
                                    {data.score}%
                                  </div>
                                </div>
                                <svg className="transform -rotate-90 w-24 h-24">
                                  <circle
                                    className="text-[#fcba28]/20"
                                    strokeWidth="4"
                                    stroke="currentColor"
                                    fill="transparent"
                                    r="38"
                                    cx="48"
                                    cy="48"
                                  />
                                  <circle
                                    className="text-[#fcba28]"
                                    strokeWidth="4"
                                    strokeLinecap="round"
                                    stroke="currentColor"
                                    fill="transparent"
                                    r="38"
                                    cx="48"
                                    cy="48"
                                    strokeDasharray={`${2.4 * Math.PI * 38 * data.score/100} ${2.4 * Math.PI * 38}`}
                                  />
                                </svg>
                              </div>
                              <div className="text-center">
                                <div className="text-sm font-medium text-gray-300 capitalize mb-2">
                                  {key.replace(/_/g, ' ')}
                                </div>
                                <p className="text-sm text-gray-400 mb-3">{data.feedback}</p>
                                {data.improvements.length > 0 && (
                                  <div className="text-left space-y-2">
                                    {data.improvements.map((improvement, idx) => (
                                      <div key={idx} className="flex items-start space-x-2 text-xs">
                                        <div className="w-1.5 h-1.5 rounded-full bg-[#fcba28] mt-1 flex-shrink-0" />
                                        <p className="text-gray-400">{improvement}</p>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Priority Improvements */}
                      <div className="bg-[#fcba28]/5 border border-[#fcba28]/20 rounded-lg p-8">
                        <h3 className="text-xl font-semibold text-[#fcba28] mb-6">Priority Improvements</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          {[
                            { title: 'Critical', color: 'text-red-500', type: 'critical' },
                            { title: 'Important', color: 'text-yellow-500', type: 'important' },
                            { title: 'Recommended', color: 'text-green-500', type: 'recommended' }
                          ].map((priority) => (
                            <div key={priority.type} className="bg-black/20 p-6 rounded-lg">
                              <h4 className={`text-lg font-medium ${priority.color} mb-4`}>
                                {priority.title}
                              </h4>
                              <div className="space-y-3">
                                {result.improvements[priority.type].map((improvement, idx) => (
                                  <div key={idx} className="flex items-start space-x-3">
                                    <div className={`w-6 h-6 rounded-full bg-${priority.color}/20 flex items-center justify-center flex-shrink-0`}>
                                      <span className={priority.color}>{idx + 1}</span>
                                    </div>
                                    <div>
                                      <p className="text-gray-300">{improvement.point}</p>
                                      {improvement.solution && (
                                        <p className="text-gray-400 text-sm mt-1">{improvement.solution}</p>
                                      )}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Skills Analysis */}
                      <div className="bg-[#fcba28]/5 border border-[#fcba28]/20 rounded-lg p-8">
                        <h3 className="text-xl font-semibold text-[#fcba28] mb-6">Skills Analysis</h3>
                        <div className="space-y-6">
                          <div>
                            <h4 className="text-lg font-medium text-[#fcba28]/90 mb-4">Technical Skills</h4>
                            <div className="space-y-3">
                              {result.skills.technical.map((skill, idx) => (
                                <div key={idx} className="flex items-center justify-between">
                                  <span className="text-gray-300">{skill.name}</span>
                                  <div className="w-32 h-2 bg-black/20 rounded-full overflow-hidden">
                                    <div
                                      className="h-full bg-[#fcba28]"
                                      style={{ width: `${parseInt(skill.proficiency)}%` }}
                                    />
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div>
                            <h4 className="text-lg font-medium text-[#fcba28]/90 mb-4">Missing Critical Skills</h4>
                            <div className="space-y-2">
                              {result.skills.missing.map((skill, idx) => (
                                <div key={idx} className="flex items-start space-x-3">
                                  <div className="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                                  <div>
                                    <p className="text-gray-300">{skill.name}</p>
                                    <p className="text-gray-400 text-sm">{skill.importance}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Experience Analysis */}
                      <div className="bg-[#fcba28]/5 border border-[#fcba28]/20 rounded-lg p-8">
                        <h3 className="text-xl font-semibold text-[#fcba28] mb-6">Experience Analysis</h3>
                        <div className="space-y-6">
                          {result.experience.map((position, idx) => (
                            <div key={idx} className="border-l-2 border-[#fcba28]/50 pl-4">
                              <h4 className="text-lg font-medium text-[#fcba28]/90">{position.title}</h4>
                              <p className="text-sm text-gray-400 mb-2">
                                {position.company} • {position.duration}
                              </p>
                              <div className="space-y-2">
                                {position.achievements.map((achievement, aidx) => (
                                  <div key={aidx} className="flex items-start space-x-3">
                                    <div className="w-2 h-2 rounded-full bg-[#fcba28] mt-2 flex-shrink-0" />
                                    <p className="text-gray-300">{achievement}</p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Market Insights */}
                      <div className="bg-[#fcba28]/5 border border-[#fcba28]/20 rounded-lg p-8">
                        <h3 className="text-xl font-semibold text-[#fcba28] mb-6">Market Insights</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div>
                            <h4 className="text-lg font-medium text-[#fcba28]/90 mb-4">Industry Trends</h4>
                            <div className="space-y-3">
                              {result.sections.find(s => s.title.includes('MARKET'))?.content
                                .split('\n')
                                .filter(line => line.trim().startsWith('-'))
                                .map((trend, idx) => (
                                  <div key={idx} className="flex items-start space-x-3">
                                    <div className="w-2 h-2 rounded-full bg-[#fcba28] mt-2 flex-shrink-0" />
                                    <p className="text-gray-300">{trend.substring(1).trim()}</p>
                                  </div>
                                ))}
                            </div>
                          </div>
                          <div>
                            <h4 className="text-lg font-medium text-[#fcba28]/90 mb-4">Keyword Optimization</h4>
                            <div className="space-y-3">
                              {result.sections.find(s => s.title.includes('MARKET'))?.content
                                .split('\n')
                                .filter(line => line.includes('occurrences'))
                                .map((keyword, idx) => {
                                  const [word, count] = keyword.split('-').map(s => s.trim());
                                  return (
                                    <div key={idx} className="flex items-center justify-between">
                                      <span className="text-gray-300">{word}</span>
                                      <span className="text-sm text-[#fcba28]">{count}</span>
                                    </div>
                                  );
                                })}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Action Plan */}
                      <div className="bg-[#fcba28]/5 border border-[#fcba28]/20 rounded-lg p-8">
                        <h3 className="text-xl font-semibold text-[#fcba28] mb-6">Action Plan</h3>
                        <div className="space-y-6">
                          {[
                            { title: 'Immediate Actions', timeframe: 'Next 24-48 hours', type: 'immediate' },
                            { title: 'Short-term Goals', timeframe: '1-2 weeks', type: 'shortTerm' },
                            { title: 'Long-term Development', timeframe: '1-3 months', type: 'longTerm' }
                          ].map((section) => (
                            <div key={section.type}>
                              <div className="flex items-center justify-between mb-4">
                                <h4 className="text-lg font-medium text-[#fcba28]/90">{section.title}</h4>
                                <span className="text-sm text-gray-400">{section.timeframe}</span>
                              </div>
                              <div className="space-y-3">
                                {result.actionPlan[section.type].map((action, idx) => (
                                  <div key={idx} className="flex items-start space-x-3">
                                    <div className="w-6 h-6 rounded-full bg-[#fcba28]/20 flex items-center justify-center flex-shrink-0">
                                      <span className="text-[#fcba28] text-sm">{idx + 1}</span>
                                    </div>
                                    <p className="text-gray-300">{action.action}</p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Detailed Analysis */}
                      <div className="bg-[#fcba28]/5 border border-[#fcba28]/20 rounded-lg p-8">
                        <h3 className="text-xl font-semibold text-[#fcba28] mb-6">Detailed Analysis</h3>
                        <div className="prose max-w-none">
                          <pre className="text-gray-300 whitespace-pre-wrap text-sm">
                            {result.rawContent}
                          </pre>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
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
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
            >
              <div className="text-[#fcba28] flex flex-col items-center space-y-4">
                <motion.div
                  className="w-12 h-12 border-4 border-[#fcba28] border-t-transparent rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
                <p className="text-lg font-medium">Analyzing your CV...</p>
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
              className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-red-500/20 border border-red-500/50 rounded-lg px-6 py-4 text-center"
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
