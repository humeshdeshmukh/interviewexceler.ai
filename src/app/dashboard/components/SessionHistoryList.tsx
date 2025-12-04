'use client';

import React, { useState } from 'react';
import { Calendar, ChevronRight, Clock, Trophy, Filter } from 'lucide-react';
import { SessionSummary } from '../services/dashboardService';
import { cn } from '@/lib/utils';

interface SessionHistoryListProps {
    sessions: SessionSummary[];
    loading?: boolean;
    onSessionClick?: (sessionId: string) => void;
}

export function SessionHistoryList({ sessions, loading, onSessionClick }: SessionHistoryListProps) {
    const [filter, setFilter] = useState<string>('all');

    const filteredSessions = sessions.filter(session => {
        if (filter === 'all') return true;
        if (filter === 'completed') return session.status === 'completed';
        if (filter === 'in_progress') return session.status === 'in_progress';
        return true;
    });

    if (loading) {
        return (
            <div className="rounded-xl bg-zinc-900/80 border border-[#fcba28]/20 p-6">
                <div className="animate-pulse space-y-4">
                    <div className="h-6 bg-zinc-800 rounded w-40" />
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="h-16 bg-zinc-800 rounded-lg" />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="rounded-xl bg-zinc-900/80 border border-[#fcba28]/20 overflow-hidden flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-[#fcba28]/20 bg-zinc-900">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-[#fcba28]" />
                    Session History
                </h3>
                <span className="text-sm text-gray-400">{filteredSessions.length} sessions</span>
            </div>

            {/* Sessions List */}
            <div className="flex-1 overflow-y-auto max-h-[400px] p-4 space-y-3">
                {filteredSessions.length === 0 ? (
                    <div className="text-center py-8 text-gray-400 text-sm">
                        No sessions found
                    </div>
                ) : (
                    filteredSessions.map((session) => (
                        <div
                            key={session.id}
                            onClick={() => onSessionClick?.(session.id)}
                            className={cn(
                                'p-4 rounded-lg border border-zinc-700/50 bg-zinc-800/30',
                                'hover:border-[#fcba28]/30 hover:bg-zinc-800/50',
                                'transition-all duration-200 cursor-pointer group'
                            )}
                        >
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex-1 space-y-2">
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <span className="text-sm font-medium text-white">
                                            {session.session_type || session.goal || 'Interview Session'}
                                        </span>
                                        <span
                                            className={cn(
                                                'px-2 py-0.5 text-xs rounded-md',
                                                session.status === 'completed'
                                                    ? 'bg-green-500/10 text-green-400'
                                                    : 'bg-blue-500/10 text-blue-400'
                                            )}
                                        >
                                            {session.status === 'completed' ? 'Completed' : 'In Progress'}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-4 text-xs text-gray-400">
                                        <span className="flex items-center gap-1">
                                            <Calendar className="w-3 h-3" />
                                            {session.created_at ? new Date(session.created_at).toLocaleDateString('en-US', {
                                                month: 'short',
                                                day: 'numeric',
                                                year: 'numeric'
                                            }) : 'Unknown date'}
                                        </span>
                                        {session.totalQuestions && session.totalQuestions > 0 && (
                                            <span className="flex items-center gap-1">
                                                <Clock className="w-3 h-3" />
                                                {session.totalQuestions} questions
                                            </span>
                                        )}
                                        {session.averageScore !== null && session.averageScore !== undefined && session.averageScore > 0 && (
                                            <span className="flex items-center gap-1 text-[#fcba28] font-medium">
                                                <Trophy className="w-3 h-3" />
                                                {Math.round(session.averageScore)}/100
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-[#fcba28] transition-colors flex-shrink-0" />
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Filter Bar at Bottom */}
            <div className="p-3 border-t border-[#fcba28]/20 bg-zinc-900 flex items-center justify-center gap-2">
                <Filter className="w-4 h-4 text-gray-500" />
                <div className="flex gap-1">
                    <button
                        onClick={() => setFilter('all')}
                        className={cn(
                            'px-3 py-1.5 text-xs font-medium rounded-lg transition-all',
                            filter === 'all'
                                ? 'bg-[#fcba28] text-black'
                                : 'bg-zinc-800 text-gray-400 hover:bg-zinc-700'
                        )}
                    >
                        All
                    </button>
                    <button
                        onClick={() => setFilter('completed')}
                        className={cn(
                            'px-3 py-1.5 text-xs font-medium rounded-lg transition-all',
                            filter === 'completed'
                                ? 'bg-green-500 text-white'
                                : 'bg-zinc-800 text-gray-400 hover:bg-zinc-700'
                        )}
                    >
                        Completed
                    </button>
                    <button
                        onClick={() => setFilter('in_progress')}
                        className={cn(
                            'px-3 py-1.5 text-xs font-medium rounded-lg transition-all',
                            filter === 'in_progress'
                                ? 'bg-blue-500 text-white'
                                : 'bg-zinc-800 text-gray-400 hover:bg-zinc-700'
                        )}
                    >
                        In Progress
                    </button>
                </div>
            </div>
        </div>
    );
}
