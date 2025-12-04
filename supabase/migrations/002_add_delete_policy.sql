-- Add delete policy for interview_sessions
-- This allows users to delete their own sessions
CREATE POLICY "Users can delete their own sessions" ON public.interview_sessions
    FOR DELETE USING (user_id = auth.uid()::text);

-- Note: interview_scores are automatically deleted due to ON DELETE CASCADE
