import { createClient } from '@/lib/supabase/client';

// Types matching the ACTUAL database schema
export interface SessionSummary {
    id: string;
    user_id: string;
    resume_text: string | null;
    goal: string | null;
    created_at: string;
    scores?: any[]; // Array of scores from interview_scores table
    averageScore?: number;
    totalQuestions?: number;
    status?: 'completed' | 'in_progress';
    session_type?: string;
}

export interface UserStats {
    totalSessions: number;
    averageScore: number;
    totalTimeMinutes: number;
    currentStreak: number;
    completedSessions: number;
    inProgressSessions: number;
}

export interface PerformanceTrends {
    scoresByDate: { date: string; score: number; count: number; label?: string }[];
    scoresByGoal: { goal: string; avgScore: number; count: number }[];
}

export interface SessionDetail extends SessionSummary {
    scores: Array<{
        id: string;
        question_index: number;
        question_text: string;
        answer_text: string | null;
        feedback: string | null;
        scores: any;
        created_at: string;
    }>;
}

export interface AIInsights {
    trends: string[];
    strengths: string[];
    weaknesses: string[];
    recommendations: string[];
}

/**
 * Calculate average score from JSONB scores object
 */
function calculateAverageFromScores(scores: any): number {
    if (!scores) return 0;

    // Handle stringified JSON
    let parsedScores = scores;
    if (typeof scores === 'string') {
        try {
            parsedScores = JSON.parse(scores);
        } catch (e) {
            console.error('Error parsing scores JSON:', e);
            return 0;
        }
    }

    if (typeof parsedScores !== 'object') return 0;

    const values: number[] = [];

    // Handle different score field formats
    if (typeof parsedScores.communication === 'number') values.push(parsedScores.communication);
    if (typeof parsedScores.bodyLanguage === 'number') values.push(parsedScores.bodyLanguage);
    if (typeof parsedScores.answerQuality === 'number') values.push(parsedScores.answerQuality);

    // Also check for alternative field names
    if (typeof parsedScores.score === 'number') values.push(parsedScores.score);
    if (typeof parsedScores.overallScore === 'number') values.push(parsedScores.overallScore);
    if (typeof parsedScores.clarity === 'number') values.push(parsedScores.clarity);
    if (typeof parsedScores.confidence === 'number') values.push(parsedScores.confidence);
    if (typeof parsedScores.communicationScore === 'number') values.push(parsedScores.communicationScore);
    if (typeof parsedScores.bodyLanguageScore === 'number') values.push(parsedScores.bodyLanguageScore);

    if (values.length === 0) {
        // If no recognized fields, try to get any numeric values
        const numericValues = Object.values(parsedScores).filter(v => typeof v === 'number' && v >= 0 && v <= 100) as number[];
        if (numericValues.length > 0) {
            return numericValues.reduce((a, b) => a + b, 0) / numericValues.length;
        }
        return 0;
    }

    return values.reduce((a, b) => a + b, 0) / values.length;
}

/**
 * Get user statistics from all sessions
 */
export async function getUserStats(userId: string): Promise<UserStats> {
    const supabase = createClient();

    try {
        // Fetch all sessions for the user
        const { data: sessions, error: sessionsError } = await supabase
            .from('interview_sessions')
            .select('*')
            .eq('user_id', userId);

        if (sessionsError) {
            console.error('Error fetching sessions:', sessionsError);
            throw sessionsError;
        }

        if (!sessions || sessions.length === 0) {
            return {
                totalSessions: 0,
                averageScore: 0,
                totalTimeMinutes: 0,
                currentStreak: 0,
                completedSessions: 0,
                inProgressSessions: 0,
            };
        }

        // Fetch all scores for these sessions
        const sessionIds = sessions.map(s => s.id);
        const { data: allScores, error: scoresError } = await supabase
            .from('interview_scores')
            .select('*')
            .in('session_id', sessionIds);

        if (scoresError) {
            console.error('Error fetching scores:', scoresError);
        }

        // Calculate statistics
        const scoresBySession = new Map<string, any[]>();
        (allScores || []).forEach(score => {
            if (!scoresBySession.has(score.session_id)) {
                scoresBySession.set(score.session_id, []);
            }
            scoresBySession.get(score.session_id)!.push(score);
        });

        let totalScore = 0;
        let sessionsWithScores = 0;

        sessions.forEach(session => {
            const scores = scoresBySession.get(session.id) || [];
            if (scores.length > 0) {
                const sessionAvg = scores.reduce((sum, s) => {
                    return sum + calculateAverageFromScores(s.scores);
                }, 0) / scores.length;
                totalScore += sessionAvg;
                sessionsWithScores++;
            }
        });

        const averageScore = sessionsWithScores > 0 ? totalScore / sessionsWithScores : 0;

        // Calculate actual practice time based on questions answered
        // Estimate: average 5 minutes per question (includes thinking + answering time)
        let totalTimeMinutes = 0;
        sessions.forEach(session => {
            const scores = scoresBySession.get(session.id) || [];
            // Each score represents one question answered
            // Use 5 minutes per question as a reasonable estimate
            totalTimeMinutes += scores.length * 5;
        });

        // If no scores yet, use minimum time (5 min) per session
        if (totalTimeMinutes === 0 && sessions.length > 0) {
            totalTimeMinutes = sessions.length * 5;
        }

        // Calculate streak (consecutive days with sessions)
        const currentStreak = calculateStreak(sessions);

        return {
            totalSessions: sessions.length,
            averageScore: Math.round(averageScore * 10) / 10,
            totalTimeMinutes,
            currentStreak,
            completedSessions: sessions.length, // All sessions are completed once created
            inProgressSessions: 0,
        };
    } catch (error) {
        console.error('Error in getUserStats:', error);
        throw error;
    }
}

/**
 * Calculate the current streak of consecutive days with practice
 */
function calculateStreak(sessions: any[]): number {
    if (sessions.length === 0) return 0;

    // Get unique dates (YYYY-MM-DD format)
    const dates = sessions
        .map(s => new Date(s.created_at).toISOString().split('T')[0])
        .filter((date, index, self) => self.indexOf(date) === index)
        .sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

    let streak = 0;
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

    // Start counting from today or yesterday
    if (dates[0] !== today && dates[0] !== yesterday) return 0;

    for (let i = 0; i < dates.length; i++) {
        const expectedDate = new Date(Date.now() - (streak * 86400000)).toISOString().split('T')[0];
        if (dates[i] === expectedDate) {
            streak++;
        } else {
            break;
        }
    }

    return streak;
}

/**
 * Get session history with optional filters
 */
export async function getSessionHistory(
    userId: string,
    filters?: {
        startDate?: string;
        endDate?: string;
        limit?: number;
    }
): Promise<SessionSummary[]> {
    const supabase = createClient();

    try {
        let query = supabase
            .from('interview_sessions')
            .select('*')
            .eq('user_id', userId)
            .order('created_at', { ascending: false });

        if (filters?.startDate) {
            query = query.gte('created_at', filters.startDate);
        }

        if (filters?.endDate) {
            query = query.lte('created_at', filters.endDate);
        }

        if (filters?.limit) {
            query = query.limit(filters.limit);
        }

        const { data: sessions, error } = await query;

        if (error) {
            console.error('Error fetching session history:', error);
            throw error;
        }

        // Fetch scores for each session
        if (!sessions || sessions.length === 0) return [];

        const sessionIds = sessions.map(s => s.id);
        const { data: allScores } = await supabase
            .from('interview_scores')
            .select('*')
            .in('session_id', sessionIds);

        // Group scores by session
        const scoresBySession = new Map<string, any[]>();
        (allScores || []).forEach(score => {
            if (!scoresBySession.has(score.session_id)) {
                scoresBySession.set(score.session_id, []);
            }
            scoresBySession.get(score.session_id)!.push(score);
        });

        // Add scores to sessions and calculate averages
        return sessions.map((session: SessionSummary) => {
            const scores = scoresBySession.get(session.id) || [];

            // Calculate average
            let totalScore = 0;
            scores.forEach((s) => {
                const scoreValue = calculateAverageFromScores(s.scores);
                totalScore += scoreValue;
            });

            const averageScore = scores.length > 0 ? totalScore / scores.length : 0;
            const roundedScore = Math.round(averageScore * 10) / 10;

            return {
                ...session,
                scores,
                averageScore: roundedScore,
                totalQuestions: scores.length,
                // Session is completed if it has at least one answered question
                status: scores.length > 0 ? 'completed' as const : 'in_progress' as const,
                session_type: (session as any).goal || 'Interview Practice',
            };
        });
    } catch (error) {
        console.error('Error in getSessionHistory:', error);
        throw error;
    }
}

/**
 * Get performance trends for charts
 */
export async function getPerformanceTrends(userId: string): Promise<PerformanceTrends> {
    const supabase = createClient();

    try {
        const sessions = await getSessionHistory(userId);

        if (sessions.length === 0) {
            return {
                scoresByDate: [],
                scoresByGoal: [],
            };
        }

        // Show each session individually (not grouped by date)
        // Sort by date ascending for the chart
        const scoresByDate = sessions
            .filter(session => session.totalQuestions && session.totalQuestions > 0)
            .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
            .map((session, index) => {
                const date = new Date(session.created_at);
                const formattedDate = date.toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric'
                });
                return {
                    date: formattedDate,
                    score: session.averageScore || 0,
                    count: session.totalQuestions || 1,
                    // Add session number for tooltip
                    label: `Session ${index + 1}`,
                };
            });

        // Group by goal for the bar chart
        const scoresByGoalMap = new Map<string, { sum: number; count: number }>();
        sessions.forEach(session => {
            const goal = session.goal || 'General Practice';
            if (session.totalQuestions && session.totalQuestions > 0) {
                const existing = scoresByGoalMap.get(goal) || { sum: 0, count: 0 };
                scoresByGoalMap.set(goal, {
                    sum: existing.sum + (session.averageScore || 0),
                    count: existing.count + 1,
                });
            }
        });

        const scoresByGoal = Array.from(scoresByGoalMap.entries()).map(([goal, data]) => ({
            goal: goal.length > 25 ? goal.substring(0, 22) + '...' : goal,
            avgScore: data.count > 0 ? Math.round((data.sum / data.count) * 10) / 10 : 0,
            count: data.count,
        }));

        return {
            scoresByDate,
            scoresByGoal,
        };
    } catch (error) {
        console.error('Error in getPerformanceTrends:', error);
        throw error;
    }
}

/**
 * Get detailed session information including all scores
 */
export async function getDetailedSession(sessionId: string): Promise<SessionDetail | null> {
    const supabase = createClient();

    try {
        const { data: session, error: sessionError } = await supabase
            .from('interview_sessions')
            .select('*')
            .eq('id', sessionId)
            .single();

        if (sessionError) throw sessionError;
        if (!session) return null;

        const { data: scores, error: scoresError } = await supabase
            .from('interview_scores')
            .select('*')
            .eq('session_id', sessionId)
            .order('question_index', { ascending: true });

        if (scoresError) throw scoresError;

        return {
            ...session,
            scores: scores || [],
        };
    } catch (error) {
        console.error('Error in getDetailedSession:', error);
        throw error;
    }
}

/**
 * Generate AI-powered insights based on recent sessions
 */
export async function generateAIInsights(
    userId: string,
    recentSessions: SessionSummary[]
): Promise<AIInsights> {
    // Import Gemini dynamically to avoid server-side issues
    const { generateInsights } = await import('./geminiInsightsService');

    try {
        const insights = await generateInsights(userId, recentSessions);
        return insights;
    } catch (error) {
        console.error('Error generating AI insights:', error);
        // Return default insights on error
        return {
            trends: ['Continue practicing regularly to improve your interview skills.'],
            strengths: ['You are making progress! Keep up the good work.'],
            weaknesses: ['More data needed to identify specific areas for improvement.'],
            recommendations: [
                'Complete more interview sessions to get personalized insights.',
                'Practice consistently to build confidence.',
            ],
        };
    }
}

/**
 * Reset all performance data for a user
 * This deletes all interview sessions (scores are cascade deleted)
 */
export async function resetPerformanceData(userId: string): Promise<{ success: boolean; deletedCount: number; error?: string }> {
    const supabase = createClient();

    try {
        // First, get count of sessions to be deleted
        const { count, error: countError } = await supabase
            .from('interview_sessions')
            .select('*', { count: 'exact', head: true })
            .eq('user_id', userId);

        if (countError) {
            console.error('Error counting sessions:', countError);
            throw countError;
        }

        // Delete all sessions for this user
        // interview_scores are automatically deleted due to ON DELETE CASCADE
        const { error: deleteError } = await supabase
            .from('interview_sessions')
            .delete()
            .eq('user_id', userId);

        if (deleteError) {
            console.error('Error deleting sessions:', deleteError);
            throw deleteError;
        }

        return {
            success: true,
            deletedCount: count || 0,
        };
    } catch (error) {
        console.error('Error in resetPerformanceData:', error);
        return {
            success: false,
            deletedCount: 0,
            error: error instanceof Error ? error.message : 'An unexpected error occurred',
        };
    }
}
