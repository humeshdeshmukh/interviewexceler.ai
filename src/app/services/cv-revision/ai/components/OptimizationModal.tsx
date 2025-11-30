"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Download, FileText, Settings, Loader2, Copy, Check, ChevronRight, ArrowLeftRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { OptimizationOptions } from '../lib/gemini';
import { createFormattedDocx, defaultFormatting } from '../utils/docxFormatter';
import { saveAs } from 'file-saver';

interface OptimizationModalProps {
    isOpen: boolean;
    onClose: () => void;
    originalCV: string;
    onOptimize: (options: OptimizationOptions) => void;
    isOptimizing: boolean;
    optimizedResult: { content: string; improvedSections: string[]; changesSummary: string } | null;
    error: string | null;
}

type Step = 'configure' | 'generating' | 'results';
type ViewMode = 'split' | 'optimized';

export const OptimizationModal = ({
    isOpen,
    onClose,
    originalCV,
    onOptimize,
    isOptimizing,
    optimizedResult,
    error
}: OptimizationModalProps) => {
    const [tone, setTone] = useState<'professional' | 'creative' | 'technical' | 'executive'>('professional');
    const [focus, setFocus] = useState<'ats' | 'human' | 'balanced'>('balanced');
    const [targetRole, setTargetRole] = useState('');
    const [currentStep, setCurrentStep] = useState<Step>('configure');
    const [viewMode, setViewMode] = useState<ViewMode>('optimized');
    const [copied, setCopied] = useState(false);

    const steps = [
        { id: 'configure' as Step, name: 'Configure', icon: Settings },
        { id: 'generating' as Step, name: 'Generate', icon: Sparkles },
        { id: 'results' as Step, name: 'Review', icon: FileText }
    ];

    const handleOptimize = () => {
        setCurrentStep('generating');
        onOptimize({
            tone,
            focus,
            targetRole: targetRole.trim() || undefined,
            preserveLayout: true
        });
    };

    const handleCopy = async () => {
        if (!optimizedResult) return;
        try {
            await navigator.clipboard.writeText(optimizedResult.content);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    const downloadAsDocx = async () => {
        if (!optimizedResult) return;

        try {
            const blob = await createFormattedDocx(optimizedResult.content, defaultFormatting);
            saveAs(blob, `optimized-resume-${new Date().toISOString().split('T')[0]}.docx`);
        } catch (error) {
            console.error('Error generating DOCX:', error);
            alert('Failed to generate DOCX file. Please try downloading as TXT instead.');
        }
    };

    const downloadAsTxt = () => {
        if (!optimizedResult) return;

        const blob = new Blob([optimizedResult.content], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `optimized-resume-${new Date().toISOString().split('T')[0]}.txt`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
    };

    // Update step when optimization completes
    if (optimizedResult && currentStep === 'generating') {
        setCurrentStep('results');
    }

    if (!isOpen) return null;

    const originalCharCount = originalCV.length;
    const optimizedCharCount = optimizedResult?.content.length || 0;
    const charDifference = optimizedCharCount - originalCharCount;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    onClick={(e) => e.stopPropagation()}
                    className="bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-2xl max-w-7xl w-full max-h-[90vh] overflow-hidden shadow-2xl flex flex-col"
                >
                    {/* Header with Progress Steps */}
                    <div className="flex-shrink-0 border-b border-white/10 bg-black/40">
                        <div className="flex items-center justify-between p-6">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-[#fcba28]/20 rounded-lg">
                                    <Sparkles className="w-6 h-6 text-[#fcba28]" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-white">Optimize Your Resume</h2>
                                    <p className="text-sm text-gray-400">AI-powered resume enhancement</p>
                                </div>
                            </div>
                            <Button
                                onClick={onClose}
                                variant="ghost"
                                className="text-gray-400 hover:text-white hover:bg-white/10 rounded-full p-2"
                            >
                                <X className="w-5 h-5" />
                            </Button>
                        </div>

                        {/* Progress Steps */}
                        <div className="px-6 pb-4">
                            <div className="flex items-center justify-between max-w-md mx-auto">
                                {steps.map((step, index) => {
                                    const isActive = currentStep === step.id;
                                    const isCompleted = steps.findIndex(s => s.id === currentStep) > index;
                                    const StepIcon = step.icon;

                                    return (
                                        <div key={step.id} className="flex items-center">
                                            <div className="flex flex-col items-center">
                                                <motion.div
                                                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${isActive
                                                        ? 'border-[#fcba28] bg-[#fcba28]/20 text-[#fcba28]'
                                                        : isCompleted
                                                            ? 'border-green-500 bg-green-500/20 text-green-500'
                                                            : 'border-white/20 bg-white/5 text-gray-500'
                                                        }`}
                                                    animate={isActive ? { scale: [1, 1.1, 1] } : {}}
                                                    transition={{ duration: 2, repeat: Infinity }}
                                                >
                                                    <StepIcon className="w-5 h-5" />
                                                </motion.div>
                                                <span className={`text-xs mt-2 ${isActive ? 'text-white font-semibold' : 'text-gray-500'}`}>
                                                    {step.name}
                                                </span>
                                            </div>
                                            {index < steps.length - 1 && (
                                                <div className={`w-16 h-0.5 mx-2 mb-6 ${isCompleted ? 'bg-green-500' : 'bg-white/20'}`} />
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 overflow-y-auto p-6">
                        <AnimatePresence mode="wait">
                            {currentStep === 'configure' && (
                                <motion.div
                                    key="configure"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    className="space-y-6"
                                >
                                    {/* Tone Selection */}
                                    <div className="space-y-3">
                                        <label className="text-sm font-medium text-gray-300">Tone</label>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                            {(['professional', 'creative', 'technical', 'executive'] as const).map((t) => (
                                                <button
                                                    key={t}
                                                    onClick={() => setTone(t)}
                                                    className={`p-4 rounded-xl border-2 transition-all duration-200 ${tone === t
                                                        ? 'border-[#fcba28] bg-[#fcba28]/10 text-white scale-105'
                                                        : 'border-white/10 bg-white/5 text-gray-400 hover:border-white/20'
                                                        }`}
                                                >
                                                    <div className="font-semibold capitalize">{t}</div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Focus Selection */}
                                    <div className="space-y-3">
                                        <label className="text-sm font-medium text-gray-300">Focus</label>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                            {(['ats', 'human', 'balanced'] as const).map((f) => (
                                                <button
                                                    key={f}
                                                    onClick={() => setFocus(f)}
                                                    className={`p-4 rounded-xl border-2 transition-all duration-200 ${focus === f
                                                        ? 'border-[#fcba28] bg-[#fcba28]/10 text-white scale-105'
                                                        : 'border-white/10 bg-white/5 text-gray-400 hover:border-white/20'
                                                        }`}
                                                >
                                                    <div className="font-semibold capitalize">{f === 'ats' ? 'ATS Optimized' : f}</div>
                                                    <div className="text-xs mt-1 opacity-75">
                                                        {f === 'ats' && 'Keyword focused'}
                                                        {f === 'human' && 'Readable & engaging'}
                                                        {f === 'balanced' && 'Best of both'}
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Target Role */}
                                    <div className="space-y-3">
                                        <label className="text-sm font-medium text-gray-300">Target Role (Optional)</label>
                                        <input
                                            type="text"
                                            value={targetRole}
                                            onChange={(e) => setTargetRole(e.target.value)}
                                            placeholder="e.g., Senior Software Engineer"
                                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#fcba28] transition-colors"
                                        />
                                    </div>

                                    {/* Error Display */}
                                    {error && (
                                        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400">
                                            {error}
                                        </div>
                                    )}

                                    {/* Generate Button */}
                                    <Button
                                        onClick={handleOptimize}
                                        disabled={isOptimizing}
                                        className="w-full py-6 bg-gradient-to-r from-[#fcba28] to-[#fcd978] hover:from-[#fcd978] hover:to-[#fcba28] text-black font-bold text-lg rounded-xl transition-all duration-300 shadow-lg shadow-[#fcba28]/20"
                                    >
                                        <Sparkles className="w-5 h-5 mr-2" />
                                        Generate Optimized Resume
                                        <ChevronRight className="w-5 h-5 ml-2" />
                                    </Button>
                                </motion.div>
                            )}

                            {currentStep === 'generating' && (
                                <motion.div
                                    key="generating"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="flex flex-col items-center justify-center min-h-[400px] space-y-6"
                                >
                                    <div className="relative w-24 h-24">
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
                                    <div className="text-center">
                                        <h3 className="text-2xl font-bold text-white mb-2">Optimizing Your Resume</h3>
                                        <p className="text-gray-400">AI is enhancing your content with {tone} tone...</p>
                                    </div>
                                </motion.div>
                            )}

                            {currentStep === 'results' && optimizedResult && (
                                <motion.div
                                    key="results"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-6"
                                >
                                    {/* Summary Card */}
                                    <div className="p-6 bg-gradient-to-br from-[#fcba28]/10 to-[#fcba28]/5 border border-[#fcba28]/20 rounded-xl">
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="flex-1">
                                                <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                                                    <Check className="w-5 h-5 text-green-500" />
                                                    Optimization Complete!
                                                </h3>
                                                <p className="text-gray-300 mb-4">{optimizedResult.changesSummary}</p>
                                            </div>
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {optimizedResult.improvedSections.map((section, idx) => (
                                                <span
                                                    key={idx}
                                                    className="px-3 py-1 bg-[#fcba28]/20 border border-[#fcba28]/30 rounded-full text-sm text-[#fcba28]"
                                                >
                                                    {section}
                                                </span>
                                            ))}
                                        </div>
                                        {/* Character Count */}
                                        <div className="mt-4 flex items-center gap-6 text-sm">
                                            <div className="flex items-center gap-2">
                                                <span className="text-gray-400">Original:</span>
                                                <span className="text-white font-semibold">{originalCharCount} chars</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-gray-400">Optimized:</span>
                                                <span className="text-white font-semibold">{optimizedCharCount} chars</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className={charDifference >= 0 ? 'text-green-400' : 'text-blue-400'}>
                                                    {charDifference >= 0 ? '+' : ''}{charDifference} chars
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* View Toggle */}
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                                                <FileText className="w-4 h-4" />
                                                View Mode
                                            </label>
                                            <div className="flex gap-2 bg-white/5 p-1 rounded-lg border border-white/10">
                                                <button
                                                    onClick={() => setViewMode('optimized')}
                                                    className={`px-4 py-2 rounded-md text-sm transition-all ${viewMode === 'optimized'
                                                        ? 'bg-[#fcba28] text-black font-semibold'
                                                        : 'text-gray-400 hover:text-white'
                                                        }`}
                                                >
                                                    Optimized
                                                </button>
                                                <button
                                                    onClick={() => setViewMode('split')}
                                                    className={`px-4 py-2 rounded-md text-sm transition-all flex items-center gap-2 ${viewMode === 'split'
                                                        ? 'bg-[#fcba28] text-black font-semibold'
                                                        : 'text-gray-400 hover:text-white'
                                                        }`}
                                                >
                                                    <ArrowLeftRight className="w-4 h-4" />
                                                    Compare
                                                </button>
                                            </div>
                                        </div>
                                        <Button
                                            onClick={handleCopy}
                                            variant="outline"
                                            className="border-white/20 text-white hover:bg-white/10"
                                        >
                                            {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                                            {copied ? 'Copied!' : 'Copy'}
                                        </Button>
                                    </div>

                                    {/* Content Display */}
                                    {viewMode === 'optimized' ? (
                                        <div className="p-6 bg-white/5 border border-white/10 rounded-xl max-h-96 overflow-y-auto">
                                            <pre className="text-gray-200 whitespace-pre-wrap font-sans text-sm leading-relaxed">
                                                {optimizedResult.content}
                                            </pre>
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <div className="text-sm font-medium text-gray-400">Original</div>
                                                <div className="p-4 bg-white/5 border border-white/10 rounded-xl max-h-96 overflow-y-auto">
                                                    <pre className="text-gray-300 whitespace-pre-wrap font-sans text-xs leading-relaxed">
                                                        {originalCV}
                                                    </pre>
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <div className="text-sm font-medium text-[#fcba28]">Optimized</div>
                                                <div className="p-4 bg-[#fcba28]/5 border border-[#fcba28]/20 rounded-xl max-h-96 overflow-y-auto">
                                                    <pre className="text-gray-200 whitespace-pre-wrap font-sans text-xs leading-relaxed">
                                                        {optimizedResult.content}
                                                    </pre>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Download Buttons */}
                                    <div className="flex gap-3">
                                        <Button
                                            onClick={downloadAsDocx}
                                            className="flex-1 py-4 bg-[#fcba28] hover:bg-[#fcd978] text-black font-semibold rounded-xl transition-colors"
                                        >
                                            <Download className="w-4 h-4 mr-2" />
                                            Download as DOCX
                                        </Button>
                                        <Button
                                            onClick={downloadAsTxt}
                                            variant="outline"
                                            className="flex-1 py-4 border-white/20 text-white hover:bg-white/10 rounded-xl transition-colors"
                                        >
                                            <Download className="w-4 h-4 mr-2" />
                                            Download as TXT
                                        </Button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};
