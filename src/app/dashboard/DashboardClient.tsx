'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/features/auth/context/AuthContext';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/Header';
import { MaxWidthWrapper } from '@/components/MaxWidthWrapper';
import { TrendingUp, Trophy, Clock, Flame, BarChart3, RotateCcw } from 'lucide-react';

// Components
import { StatsCard } from './components/StatsCard';
import { PerformanceChart } from './components/PerformanceChart';
import { SessionHistoryList } from './components/SessionHistoryList';
import { SessionDetailModal } from './components/SessionDetailModal';
import { AIInsightsPanel } from './components/AIInsightsPanel';
import { EmptyState } from './components/EmptyState';
import { ResetConfirmModal } from './components/ResetConfirmModal';

// Services
import {
    getUserStats,
    getSessionHistory,
    getPerformanceTrends,
    generateAIInsights,
    resetPerformanceData,
    UserStats,
    SessionSummary,
    PerformanceTrends,
    AIInsights,
} from './services/dashboardService';

export default function DashboardClient() {
    const { user, isAuthenticated, loading: authLoading } = useAuth();
    const router = useRouter();

    // State
    const [stats, setStats] = useState<UserStats | null>(null);
    const [sessions, setSessions] = useState<SessionSummary[]>([]);
    const [trends, setTrends] = useState<PerformanceTrends | null>(null);
    const [insights, setInsights] = useState<AIInsights | null>(null);
    const [loading, setLoading] = useState(true);
    const [insightsLoading, setInsightsLoading] = useState(false);
    const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isResetModalOpen, setIsResetModalOpen] = useState(false);

    // Redirect if not authenticated
    useEffect(() => {
        if (!authLoading && !isAuthenticated) {
            router.push('/auth');
        }
    }, [authLoading, isAuthenticated, router]);

    // Load dashboard data
    useEffect(() => {
        if (user?.id && isAuthenticated) {
            loadDashboardData();
        }
    }, [user?.id, isAuthenticated]);

    const loadDashboardData = async () => {
        if (!user?.id) return;

        setLoading(true);
        try {
            // Load all data in parallel
            const [statsData, sessionsData, trendsData] = await Promise.all([
                getUserStats(user.id),
                getSessionHistory(user.id, { limit: 50 }),
                getPerformanceTrends(user.id),
            ]);

            setStats(statsData);
            setSessions(sessionsData);
            setTrends(trendsData);
            // AI insights now only load when user clicks "Generate Insights" button
        } catch (error) {
            console.error('Error loading dashboard data:', error);
        } finally {
            setLoading(false);
        }
    };

    const loadAIInsights = async (sessionData?: SessionSummary[]) => {
        if (!user?.id) return;

        setInsightsLoading(true);
        try {
            const recentSessions = sessionData || sessions.slice(0, 10);
            const insightsData = await generateAIInsights(user.id, recentSessions);
            setInsights(insightsData);
        } catch (error) {
            console.error('Error loading AI insights:', error);
        } finally {
            setInsightsLoading(false);
        }
    };

    const handleSessionClick = (sessionId: string) => {
        setSelectedSessionId(sessionId);
        setIsModalOpen(true);
    };

    const handleRefreshInsights = useCallback(() => {
        loadAIInsights();
    }, [sessions, user?.id]);

    const handleReset = async () => {
        if (!user?.id) return;

        const result = await resetPerformanceData(user.id);
        if (result.success) {
            // Reload dashboard data after reset
            await loadDashboardData();
            setInsights(null); // Clear AI insights
        } else {
            throw new Error(result.error || 'Failed to reset performance data');
        }
    };

    // Show loading while checking auth
    if (authLoading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-[#fcba28] border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    // Redirect happens in useEffect if not authenticated
    if (!isAuthenticated || !user) {
        return null;
    }

    // Show empty state for new users
    const isNewUser = !loading && (!sessions || sessions.length === 0);

    return (
        <div className="min-h-screen bg-black">
            <Header />

            <MaxWidthWrapper>
                <div className="pt-32 pb-16 space-y-8">
                    {/* Page Header */}
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                        <div className="space-y-2">
                            <h1 className="text-4xl md:text-5xl font-bold text-white">
                                Welcome back, <span className="text-[#fcba28]">{user.email?.split('@')[0] || 'User'}</span>! 👋
                            </h1>
                            <p className="text-gray-400">
                                Track your progress and insights across all your interview sessions
                            </p>
                        </div>
                        {!isNewUser && (
                            <button
                                onClick={() => setIsResetModalOpen(true)}
                                className="flex items-center gap-2 px-4 py-2.5 bg-zinc-800/80 hover:bg-red-500/20 border border-zinc-700 hover:border-red-500/50 text-gray-400 hover:text-red-400 rounded-lg transition-all duration-200 text-sm font-medium self-start"
                            >
                                <RotateCcw className="w-4 h-4" />
                                Reset Progress
                            </button>
                        )}
                    </div>

                    {isNewUser ? (
                        <EmptyState />
                    ) : (
                        <>
                            {/* Stats Overview */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                <StatsCard
                                    icon={Trophy}
                                    label="Total Sessions"
                                    value={stats?.totalSessions || 0}
                                    loading={loading}
                                    subtitle={`${stats?.completedSessions || 0} completed`}
                                />
                                <StatsCard
                                    icon={TrendingUp}
                                    label="Average Score"
                                    value={stats?.averageScore ? `${stats.averageScore}%` : 'N/A'}
                                    loading={loading}
                                    trend={
                                        stats && stats.averageScore >= 70
                                            ? { direction: 'up', value: 'Good' }
                                            : stats && stats.averageScore >= 50
                                                ? { direction: 'neutral', value: 'Fair' }
                                                : { direction: 'down', value: 'Needs work' }
                                    }
                                />
                                <StatsCard
                                    icon={Clock}
                                    label="Time Practiced"
                                    value={stats ? `${Math.floor(stats.totalTimeMinutes / 60)}h ${stats.totalTimeMinutes % 60}m` : 'N/A'}
                                    loading={loading}
                                />
                                <StatsCard
                                    icon={Flame}
                                    label="Current Streak"
                                    value={stats ? `${stats.currentStreak} ${stats.currentStreak === 1 ? 'day' : 'days'}` : '0 days'}
                                    loading={loading}
                                    trend={
                                        stats && stats.currentStreak > 0
                                            ? { direction: 'up', value: 'Keep going!' }
                                            : undefined
                                    }
                                />
                            </div>

                            {/* AI Insights Section */}
                            <div className="grid grid-cols-1 gap-6">
                                {/* AI Insights Panel */}
                                <AIInsightsPanel
                                    insights={insights}
                                    loading={insightsLoading}
                                    onRefresh={handleRefreshInsights}
                                />
                            </div>

                            {/* Session History */}
                            <SessionHistoryList
                                sessions={sessions}
                                loading={loading}
                                onSessionClick={handleSessionClick}
                            />
                        </>
                    )}
                </div>
            </MaxWidthWrapper>

            {/* Session Detail Modal */}
            <SessionDetailModal
                sessionId={selectedSessionId}
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setSelectedSessionId(null);
                }}
            />

            {/* Reset Confirmation Modal */}
            <ResetConfirmModal
                isOpen={isResetModalOpen}
                onClose={() => setIsResetModalOpen(false)}
                onConfirm={handleReset}
                sessionCount={sessions.length}
            />

            {/* Custom Scrollbar Styles */}
            <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: hsl(var(--muted-foreground) / 0.3);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: hsl(var(--muted-foreground) / 0.5);
        }
      `}</style>
        </div>
    );
}
