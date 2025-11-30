import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Target, ChevronRight, ArrowRight } from 'lucide-react';

interface PersonalizedQuestionDisplayProps {
    question: {
        id: string;
        text: string;
        category: string;
        difficulty?: string;
    };
    questionNumber: number;
    totalQuestions: number;
    goal?: string;
    onNextQuestion?: () => void;
    isGenerating?: boolean;
}

export default function PersonalizedQuestionDisplay({
    question,
    questionNumber,
    totalQuestions,
    goal,
    onNextQuestion,
    isGenerating = false
}: PersonalizedQuestionDisplayProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="w-full mb-6"
        >
            <div className="relative bg-gradient-to-br from-[#1a1a1a] via-[#1f1f1f] to-[#1a1a1a] border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
                {/* Top gradient accent */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#fcba28] via-[#fcd978] to-[#fcba28]" />

                <div className="p-6">
                    {/* Header with progress */}
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-xl bg-gradient-to-br from-[#fcba28]/20 to-[#fcd978]/10 border border-[#fcba28]/20">
                                <Sparkles className="w-5 h-5 text-[#fcba28]" />
                            </div>
                            <div>
                                <h3 className="text-sm font-semibold text-[#fcba28]">Personalized Interview</h3>
                                {goal && (
                                    <div className="flex items-center gap-1.5 mt-0.5">
                                        <Target className="w-3 h-3 text-gray-500" />
                                        <p className="text-xs text-gray-400">{goal}</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Progress indicator */}
                        <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-500">Question</span>
                            <div className="flex items-center gap-1.5">
                                <span className="text-lg font-bold text-white">{questionNumber}</span>
                                {totalQuestions > 0 && (
                                    <>
                                        <span className="text-gray-600">/</span>
                                        <span className="text-sm text-gray-400">{totalQuestions}</span>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Question text */}
                    <div className="relative">
                        <div className="absolute -left-2 top-0 bottom-0 w-1 bg-gradient-to-b from-[#fcba28] to-[#fcd978] rounded-full opacity-50" />
                        <div className="pl-6">
                            <p className="text-xl font-medium text-white leading-relaxed">
                                {question.text}
                            </p>
                        </div>
                    </div>

                    {/* Metadata & Action */}
                    <div className="flex items-center justify-between mt-5 pt-4 border-t border-white/10">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-blue-400" />
                                <span className="text-xs text-gray-400">{question.category}</span>
                            </div>
                            {question.difficulty && (
                                <>
                                    <div className="w-px h-3 bg-white/10" />
                                    <div className="flex items-center gap-2">
                                        <div className={`w-2 h-2 rounded-full ${question.difficulty.toLowerCase() === 'easy' ? 'bg-green-400' :
                                            question.difficulty.toLowerCase() === 'medium' ? 'bg-yellow-400' :
                                                'bg-red-400'
                                            }`} />
                                        <span className="text-xs text-gray-400 capitalize">{question.difficulty}</span>
                                    </div>
                                </>
                            )}
                        </div>

                        {onNextQuestion && (
                            <button
                                onClick={onNextQuestion}
                                disabled={isGenerating}
                                className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
                            >
                                {isGenerating ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        <span>Generating...</span>
                                    </>
                                ) : (
                                    <>
                                        <span>Next Question</span>
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                                    </>
                                )}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
