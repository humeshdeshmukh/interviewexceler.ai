import { createClient } from '@/lib/supabase/client';

export const supabaseService = {
    async saveSession(userId: string, resumeText: string, jobDescription: string, goal: string) {
        const supabase = createClient();

        // Build insert object without job_description to avoid schema errors
        const insertData: any = {
            user_id: userId,
            resume_text: resumeText,
            goal: goal,
            created_at: new Date().toISOString()
        };

        // @ts-ignore
        const { data, error } = await supabase
            .from('interview_sessions')
            .insert(insertData)
            .select()
            .single();

        if (error) {
            console.error('Error saving session:', JSON.stringify(error, null, 2));
            return null;
        }
        return data;
    },

    async saveScore(sessionId: string, questionIndex: number, question: string, answer: string, analysis: any) {
        const supabase = createClient();
        // @ts-ignore
        const { error } = await supabase
            .from('interview_scores')
            .insert({
                session_id: sessionId,
                question_index: questionIndex,
                question_text: question,
                answer_text: answer,
                feedback: analysis.analysis,
                scores: {
                    communication: analysis.communicationScore,
                    bodyLanguage: analysis.bodyLanguageScore,
                    answerQuality: analysis.score
                },
                created_at: new Date().toISOString()
            });

        if (error) {
            console.error('Error saving score:', error);
        }
    },

    async getUserProfile(userId: string) {
        const supabase = createClient();
        try {
            const { data, error } = await supabase
                .from('interview_user_profiles')
                .select('*')
                .eq('user_id', userId)
                .single();

            if (error) {
                // PGRST116 means no rows returned (user doesn't have a profile yet)
                if (error.code === 'PGRST116') {
                    console.log('No profile found for user, this is normal for first-time users');
                    return null;
                }
                // Log the full error for debugging
                console.error('Error fetching user profile:', {
                    message: error.message,
                    code: error.code,
                    details: error.details,
                    hint: error.hint
                });
                return null;
            }
            return data;
        } catch (err) {
            console.error('Unexpected error fetching user profile:', err);
            return null;
        }
    },

    async updateUserProfile(userId: string, profileData: any) {
        const supabase = createClient();

        // Check if profile exists
        const { data: existingProfile } = await supabase
            .from('interview_user_profiles')
            .select('id')
            .eq('user_id', userId)
            .single();

        if (existingProfile) {
            // Update
            // @ts-ignore
            const { error } = await supabase
                .from('interview_user_profiles')
                .update({
                    ...profileData,
                    updated_at: new Date().toISOString()
                })
                .eq('user_id', userId);

            if (error) throw error;
        } else {
            // Insert
            // @ts-ignore
            const { error } = await supabase
                .from('interview_user_profiles')
                .insert({
                    user_id: userId,
                    ...profileData,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString()
                });

            if (error) throw error;
        }
    }
};
