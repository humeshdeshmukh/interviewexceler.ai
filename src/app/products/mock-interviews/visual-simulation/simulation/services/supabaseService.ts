import { createClient } from '@/lib/supabase/client';

export const supabaseService = {
    async saveSession(userId: string, resumeText: string, goal: string) {
        const supabase = createClient();
        // @ts-ignore
        const { data, error } = await supabase
            .from('interview_sessions')
            .insert({
                user_id: userId,
                resume_text: resumeText,
                goal: goal,
                created_at: new Date().toISOString()
            })
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
    }
};
