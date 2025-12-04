'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';

export default function DebugPage() {
    const [userId, setUserId] = useState<string | null>(null);
    const [sessions, setSessions] = useState<any[]>([]);
    const [scores, setScores] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchDebugData() {
            const supabase = createClient();

            // Get current user
            const { data: { user }, error: userError } = await supabase.auth.getUser();
            console.log('Current user:', user);

            if (userError || !user) {
                console.error('User error:', userError);
                setLoading(false);
                return;
            }

            setUserId(user.id);

            // Fetch ALL sessions (no filter)
            const { data: allSessions, error: sessionsError } = await supabase
                .from('interview_sessions')
                .select('*');

            console.log('All sessions in database:', allSessions);
            console.log('Sessions error:', sessionsError);

            // Fetch sessions for THIS user
            const { data: userSessions, error: userSessionsError } = await supabase
                .from('interview_sessions')
                .select('*')
                .eq('user_id', user.id);

            console.log('User sessions:', userSessions);
            console.log('User sessions error:', userSessionsError);

            setSessions(userSessions || []);

            // Fetch all scores
            const { data: allScores, error: scoresError } = await supabase
                .from('interview_scores')
                .select('*');

            console.log('All scores:', allScores);
            console.log('Scores error:', scoresError);

            setScores(allScores || []);
            setLoading(false);
        }

        fetchDebugData();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-lg">Loading debug data...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen p-8 bg-background text-foreground">
            <div className="max-w-6xl mx-auto space-y-8">
                <h1 className="text-3xl font-bold">Dashboard Debug Info</h1>

                {/* User ID */}
                <div className="p-6 bg-card rounded-lg border border-border">
                    <h2 className="text-xl font-semibold mb-4">Current User ID</h2>
                    <p className="font-mono text-sm bg-muted p-3 rounded">{userId || 'Not logged in'}</p>
                </div>

                {/* Sessions */}
                <div className="p-6 bg-card rounded-lg border border-border">
                    <h2 className="text-xl font-semibold mb-4">
                        Interview Sessions ({sessions.length})
                    </h2>
                    {sessions.length === 0 ? (
                        <p className="text-muted-foreground">No sessions found for this user</p>
                    ) : (
                        <div className="space-y-4">
                            {sessions.map((session) => (
                                <div key={session.id} className="p-4 bg-muted rounded-lg">
                                    <div className="grid grid-cols-2 gap-2 text-sm">
                                        <div>
                                            <span className="text-muted-foreground">ID:</span>
                                            <span className="ml-2 font-mono">{session.id}</span>
                                        </div>
                                        <div>
                                            <span className="text-muted-foreground">User ID:</span>
                                            <span className="ml-2 font-mono">{session.user_id}</span>
                                        </div>
                                        <div>
                                            <span className="text-muted-foreground">Goal:</span>
                                            <span className="ml-2">{session.goal || 'None'}</span>
                                        </div>
                                        <div>
                                            <span className="text-muted-foreground">Created:</span>
                                            <span className="ml-2">
                                                {new Date(session.created_at).toLocaleString()}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Scores */}
                <div className="p-6 bg-card rounded-lg border border-border">
                    <h2 className="text-xl font-semibold mb-4">
                        Interview Scores ({scores.length})
                    </h2>
                    {scores.length === 0 ? (
                        <p className="text-muted-foreground">No scores found</p>
                    ) : (
                        <div className="space-y-4">
                            {scores.map((score) => (
                                <div key={score.id} className="p-4 bg-muted rounded-lg">
                                    <div className="grid grid-cols-2 gap-2 text-sm">
                                        <div>
                                            <span className="text-muted-foreground">Session ID:</span>
                                            <span className="ml-2 font-mono">{score.session_id}</span>
                                        </div>
                                        <div>
                                            <span className="text-muted-foreground">Question:</span>
                                            <span className="ml-2">{score.question_text?.substring(0, 50)}...</span>
                                        </div>
                                        <div>
                                            <span className="text-muted-foreground">Scores:</span>
                                            <span className="ml-2">
                                                {JSON.stringify(score.scores)}
                                            </span>
                                        </div>
                                        <div>
                                            <span className="text-muted-foreground">Created:</span>
                                            <span className="ml-2">
                                                {new Date(score.created_at).toLocaleString()}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* User ID Comparison */}
                <div className="p-6 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                    <h2 className="text-xl font-semibold mb-4 text-yellow-500">
                        User ID Matching Check
                    </h2>
                    <p className="text-sm mb-4">
                        Check if session user_ids match your current user ID:
                    </p>
                    {sessions.map((session) => (
                        <div key={session.id} className="mb-2">
                            <span className={session.user_id === userId ? 'text-green-400' : 'text-red-400'}>
                                {session.user_id === userId ? '✓' : '✗'} Session {session.id.substring(0, 8)}...
                                {session.user_id !== userId && (
                                    <span className="ml-2 text-xs">
                                        (user_id: {session.user_id.substring(0, 8)}... vs current: {userId?.substring(0, 8)}...)
                                    </span>
                                )}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
