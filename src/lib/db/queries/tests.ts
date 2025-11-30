import { createClient } from '@/lib/supabase/client';
import { Database } from '@/types/database.types';

type PracticeTest = Database['public']['Tables']['practice_tests']['Row'];

export async function createPracticeTest(
    userId: string,
    data: Pick<PracticeTest, 'test_type' | 'topics' | 'difficulty' | 'questions'>
) {
    const supabase = createClient();
    const { data: test, error } = await supabase
        .from('practice_tests')
        .insert({
            user_id: userId,
            ...data,
            completed: false
        })
        .select()
        .single();

    if (error) throw error;
    return test;
}

export async function submitTestResults(
    testId: string,
    results: { answers: any; score: number }
) {
    const supabase = createClient();
    const { data, error } = await supabase
        .from('practice_tests')
        .update({
            answers: results.answers,
            score: results.score,
            completed: true,
            completed_at: new Date().toISOString()
        })
        .eq('id', testId)
        .select()
        .single();

    if (error) throw error;
    return data;
}

export async function getUserTests(userId: string) {
    const supabase = createClient();
    const { data, error } = await supabase
        .from('practice_tests')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
}
