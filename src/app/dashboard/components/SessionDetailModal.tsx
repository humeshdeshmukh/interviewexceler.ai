'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Trophy, MessageSquare, ChevronDown, ChevronUp, Target } from 'lucide-react';
import { SessionDetail } from '../services/dashboardService';
import { getDetailedSession } from '../services/dashboardService';

interface SessionDetailModalProps {
    sessionId: string | null;
    isOpen: boolean;
    onClose: () => void;
}

export function SessionDetailModal({ sessionId, isOpen, onClose }: SessionDetailModalProps) {
    const [session, setSession] = useState<SessionDetail | null>(null);
    const [loading, setLoading] = useState(false);
    const [expandedResponses, setExpandedResponses] = useState<Set<string>>(new Set());

    useEffect(() => {
        if (sessionId && isOpen) {
            loadSession();
        }
    }, [sessionId, isOpen]);

    const loadSession = async () => {
        if (!sessionId) return;

        setLoading(true);
        try {
            const data = await getDetailedSession(sessionId);
            setSession(data);
        } catch (error) {
            console.error('Error loading session:', error);
        } finally {
            setLoading(false);
        }
    };

    const toggleResponse = (responseId: string) => {
        const newExpanded = new Set(expandedResponses);
        if (newExpanded.has(responseId)) {
            newExpanded.delete(responseId);
        } else {
            newExpanded.add(responseId);
        }
        setExpandedResponses(newExpanded);
    };

    // Calculate average score from interview_scores
    const calculateAverageScore = (scores: any[]) => {
        if (!scores || scores.length === 0) return 0;
        const total = scores.reduce((sum, s) => {
            const scoresObj = s.scores || {};
            const avg = ((scoresObj.communication || 0) + (scoresObj.bodyLanguage || 0) + (scoresObj.answerQuality || 0)) / 3;
            return sum + avg;
        }, 0);
        return Math.round(total / scores.length);
    };

    if (!isOpen) return null;

    const avgScore = session ? calculateAverageScore(session.scores) : 0;

    return (
        <AnimatePresence>
            {isOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        onClick={(e) => e.stopPropagation()}
                        className="w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 border-2 border-purple-500/30 shadow-2xl shadow-purple-500/20"
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-purple-500/20 bg-gradient-to-r from-purple-900/30 to-pink-900/30">
                            <div className="flex items-start justify-between">
                                <div>
                                    <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                                        Session Details
                                    </h2>
                                    {session && (
                                        <p className="text-sm text-slate-400 mt-1">
                                            {new Date(session.created_at).toLocaleDateString('en-US', {
                                                weekday: 'long',
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })}
                                        </p>
                                    )}
                                </div>
                                <button
                                    onClick={onClose}
                                    className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 transition-all hover:scale-110"
                                >
                                    <X className="w-5 h-5 text-red-400" />
                                </button>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)] custom-scrollbar">
                            {loading ? (
                                <div className="flex flex-col items-center justify-center py-12 gap-3">
                                    <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
                                    <p className="text-slate-400">Loading session details...</p>
                                </div>
                            ) : session ? (
                                <div className="space-y-6">
                                    {/* Session Metadata */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                        <div className="p-5 rounded-2xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-2 border-green-500/30 hover:border-green-400/50 transition-all hover:shadow-lg hover:shadow-green-500/20">
                                            <div className="flex items-center gap-2 mb-2">
                                                <Trophy className="w-5 h-5 text-green-400" />
                                                <span className="text-xs font-semibold text-green-400/80">Avg Score</span>
                                            </div>
                                            <p className="text-3xl font-bold text-green-400">
                                                {avgScore}/100
                                            </p>
                                        </div>

                                        <div className="p-5 rounded-2xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-2 border-blue-500/30 hover:border-blue-400/50 transition-all hover:shadow-lg hover:shadow-blue-500/20">
                                            <div className="flex items-center gap-2 mb-2">
                                                <MessageSquare className="w-5 h-5 text-blue-400" />
                                                <span className="text-xs font-semibold text-blue-400/80">Questions</span>
                                            </div>
                                            <p className="text-3xl font-bold text-blue-400">
                                                {session.scores?.length || 0}
                                            </p>
                                        </div>

                                        <div className="p-5 rounded-2xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-2 border-purple-500/30 hover:border-purple-400/50 transition-all hover:shadow-lg hover:shadow-purple-500/20 sm:col-span-2 md:col-span-1">
                                            <div className="flex items-center gap-2 mb-2">
                                                <Target className="w-5 h-5 text-purple-400" />
                                                <span className="text-xs font-semibold text-purple-400/80">Goal</span>
                                            </div>
                                            <p className="text-sm font-semibold text-purple-400 line-clamp-2">
                                                {session.goal || 'General Practice'}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Question Responses */}
                                    <div className="space-y-4">
                                        <h3 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                                            Questions & Responses
                                        </h3>

                                        {session.scores && session.scores.length > 0 ? (
                                            <div className="space-y-3">
                                                {session.scores.map((response, index) => {
                                                    const scores = response.scores || {};
                                                    const avgScore = ((scores.communication || 0) + (scores.bodyLanguage || 0) + (scores.answerQuality || 0)) / 3;

                                                    return (
                                                        <div
                                                            key={response.id}
                                                            className="rounded-2xl border-2 border-slate-700/50 bg-gradient-to-br from-slate-800/50 to-slate-900/50 overflow-hidden hover:border-purple-500/40 transition-all"
                                                        >
                                                            <button
                                                                onClick={() => toggleResponse(response.id)}
                                                                className="w-full p-4 flex items-center justify-between hover:bg-white/5 transition-colors"
                                                            >
                                                                <div className="flex items-start gap-3 text-left flex-1">
                                                                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-white text-sm font-bold flex items-center justify-center shadow-lg">
                                                                        {index + 1}
                                                                    </span>
                                                                    <div className="flex-1">
                                                                        <p className="text-sm font-medium text-slate-200">
                                                                            {response.question_text}
                                                                        </p>
                                                                        <p className="text-xs text-green-400 mt-1 font-semibold">
                                                                            Score: {avgScore.toFixed(1)}/100
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                                {expandedResponses.has(response.id) ? (
                                                                    <ChevronUp className="w-5 h-5 text-slate-400 flex-shrink-0" />
                                                                ) : (
                                                                    <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />
                                                                )}
                                                            </button>

                                                            <AnimatePresence>
                                                                {expandedResponses.has(response.id) && (
                                                                    <motion.div
                                                                        initial={{ height: 0, opacity: 0 }}
                                                                        animate={{ height: 'auto', opacity: 1 }}
                                                                        exit={{ height: 0, opacity: 0 }}
                                                                        className="border-t border-slate-700/50 p-5 space-y-4 bg-slate-900/30"
                                                                    >
                                                                        <div>
                                                                            <h4 className="text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">
                                                                                Your Answer
                                                                            </h4>
                                                                            <p className="text-sm text-slate-300 leading-relaxed">
                                                                                {response.answer_text || 'No answer provided'}
                                                                            </p>
                                                                        </div>

                                                                        {response.feedback && (
                                                                            <div>
                                                                                <h4 className="text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">
                                                                                    AI Feedback
                                                                                </h4>
                                                                                <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-wrap">
                                                                                    {response.feedback}
                                                                                </p>
                                                                            </div>
                                                                        )}

                                                                        {scores && Object.keys(scores).length > 0 && (
                                                                            <div className="grid grid-cols-3 gap-3 pt-2">
                                                                                {scores.communication !== undefined && (
                                                                                    <div className="text-center p-3 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30">
                                                                                        <p className="text-xs text-blue-400/80 mb-1">Communication</p>
                                                                                        <p className="text-lg font-bold text-blue-400">{scores.communication}</p>
                                                                                    </div>
                                                                                )}
                                                                                {scores.bodyLanguage !== undefined && (
                                                                                    <div className="text-center p-3 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30">
                                                                                        <p className="text-xs text-purple-400/80 mb-1">Body Language</p>
                                                                                        <p className="text-lg font-bold text-purple-400">{scores.bodyLanguage}</p>
                                                                                    </div>
                                                                                )}
                                                                                {scores.answerQuality !== undefined && (
                                                                                    <div className="text-center p-3 rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30">
                                                                                        <p className="text-xs text-green-400/80 mb-1">Answer Quality</p>
                                                                                        <p className="text-lg font-bold text-green-400">{scores.answerQuality}</p>
                                                                                    </div>
                                                                                )}
                                                                            </div>
                                                                        )}
                                                                    </motion.div>
                                                                )}
                                                            </AnimatePresence>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        ) : (
                                            <div className="text-center py-12 rounded-2xl bg-slate-800/50 border-2 border-dashed border-slate-700">
                                                <MessageSquare className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                                                <p className="text-slate-400">No responses recorded for this session</p>
                                                <p className="text-xs text-slate-500 mt-1">Complete an interview to see your responses here</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <p className="text-slate-400">Failed to load session details</p>
                                    <button
                                        onClick={onClose}
                                        className="mt-4 px-6 py-2 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30 text-purple-400 transition-all"
                                    >
                                        Close
                                    </button>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
