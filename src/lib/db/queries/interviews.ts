import { createClient } from '@/lib/supabase/client';
import { Database } from '@/types/database.types';

type InterviewSession = Database['public']['Tables']['interview_sessions']['Row'];

export async function createInterviewSession(
    userId: string,
    data: Pick<InterviewSession, 'session_type' | 'category' | 'difficulty'>
) {
    const supabase = createClient();
    const { data: session, error } = await supabase
        .from('interview_sessions')
        .insert({
            user_id: userId,
            ...data,
            status: 'in_progress'
        })
        .select()
        .single();

    if (error) throw error;
    return session;
}

export async function getInterviewSession(sessionId: string) {
    const supabase = createClient();
    const { data, error } = await supabase
        .from('interview_sessions')
        .select(`
      *,
      responses:interview_responses(*)
    `)
        .eq('id', sessionId)
        .single();

    if (error) throw error;
    return data;
}

export async function getUserInterviews(userId: string) {
    const supabase = createClient();
    const { data, error } = await supabase
        .from('interview_sessions')
        .select('*')
        .eq('user_id', userId)
        .order('started_at', { ascending: false });

    if (error) throw error;
    return data;
}
