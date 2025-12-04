'use client';

import React from 'react';
import { Sparkles, RefreshCw, TrendingUp, Award, AlertTriangle, Lightbulb, Zap } from 'lucide-react';
import { AIInsights } from '../services/dashboardService';

interface AIInsightsPanelProps {
    insights: AIInsights | null;
    loading: boolean;
    onRefresh: () => void;
}

export function AIInsightsPanel({ insights, loading, onRefresh }: AIInsightsPanelProps) {
    const categories = [
        {
            title: 'Performance Trends',
            icon: TrendingUp,
            data: insights?.trends || [],
        },
        {
            title: 'Strengths',
            icon: Award,
            data: insights?.strengths || [],
        },
        {
            title: 'Areas to Improve',
            icon: AlertTriangle,
            data: insights?.weaknesses || [],
        },
        {
            title: 'Recommendations',
            icon: Lightbulb,
            data: insights?.recommendations || [],
        }
    ];

    // Show standby mode if no insights and not loading
    const isStandby = !insights && !loading;

    return (
        <div className="h-full max-h-[600px] rounded-xl bg-zinc-900/80 border border-[#fcba28]/30 overflow-hidden flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-[#fcba28]/20 flex-shrink-0 bg-zinc-900">
                <div className="flex items-center gap-3">
                    <Sparkles className="w-5 h-5 text-[#fcba28]" />
                    <h3 className="text-lg font-semibold text-white">AI Insights</h3>
                </div>
                {insights && (
                    <button
                        onClick={onRefresh}
                        disabled={loading}
                        className="p-2 rounded-lg bg-[#fcba28]/10 hover:bg-[#fcba28]/20 border border-[#fcba28]/30 transition-all disabled:opacity-50"
                        aria-label="Refresh insights"
                    >
                        <RefreshCw className={`w-4 h-4 text-[#fcba28] ${loading ? 'animate-spin' : ''}`} />
                    </button>
                )}
            </div>

            {/* Content - Scrollable */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {/* Standby Mode - Show Generate Button */}
                {isStandby && (
                    <div className="flex flex-col items-center justify-center py-10 text-center space-y-4">
                        <div className="p-4 rounded-full bg-[#fcba28]/10 border border-[#fcba28]/20">
                            <Zap className="w-10 h-10 text-[#fcba28]" />
                        </div>
                        <div>
                            <p className="text-white font-medium mb-1">AI Analysis Ready</p>
                            <p className="text-gray-400 text-sm mb-4">Click below to generate personalized insights</p>
                        </div>
                        <button
                            onClick={onRefresh}
                            className="px-6 py-3 rounded-lg bg-[#fcba28] text-black font-semibold hover:bg-[#fcba28]/90 transition-all flex items-center gap-2"
                        >
                            <Sparkles className="w-4 h-4" />
                            Generate Insights
                        </button>
                    </div>
                )}

                {/* Loading State */}
                {loading && (
                    <div className="flex flex-col items-center justify-center py-8 gap-3">
                        <div className="w-10 h-10 border-3 border-[#fcba28] border-t-transparent rounded-full animate-spin" />
                        <p className="text-sm text-gray-400">Analyzing performance...</p>
                    </div>
                )}

                {/* Insights Content */}
                {!loading && insights && (
                    <div className="space-y-4">
                        {categories.map((category) => (
                            <div
                                key={category.title}
                                className="p-3 rounded-lg bg-zinc-800/50 border border-zinc-700/50"
                            >
                                <div className="flex items-center gap-2 mb-2">
                                    <category.icon className="w-4 h-4 text-[#fcba28]" />
                                    <h4 className="text-sm font-medium text-[#fcba28]">{category.title}</h4>
                                </div>
                                <ul className="space-y-1.5">
                                    {category.data.length > 0 ? (
                                        category.data.map((item, i) => (
                                            <li key={i} className="flex gap-2 text-sm text-gray-300">
                                                <span className="text-[#fcba28] mt-1">•</span>
                                                <span>{item}</span>
                                            </li>
                                        ))
                                    ) : (
                                        <li className="text-sm text-gray-500">No data yet</li>
                                    )}
                                </ul>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
