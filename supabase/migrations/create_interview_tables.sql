-- Create interview_sessions table
CREATE TABLE IF NOT EXISTS public.interview_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id TEXT NOT NULL,
    resume_text TEXT NOT NULL,
    goal TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create interview_scores table
CREATE TABLE IF NOT EXISTS public.interview_scores (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id UUID NOT NULL REFERENCES public.interview_sessions(id) ON DELETE CASCADE,
    question_index INTEGER NOT NULL,
    question_text TEXT NOT NULL,
    answer_text TEXT NOT NULL,
    feedback TEXT,
    scores JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_interview_sessions_user_id ON public.interview_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_interview_sessions_created_at ON public.interview_sessions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_interview_scores_session_id ON public.interview_scores(session_id);
CREATE INDEX IF NOT EXISTS idx_interview_scores_created_at ON public.interview_scores(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE public.interview_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.interview_scores ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for interview_sessions
CREATE POLICY "Users can insert their own sessions" ON public.interview_sessions
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can view their own sessions" ON public.interview_sessions
    FOR SELECT USING (true);

-- Create RLS policies for interview_scores
CREATE POLICY "Users can insert their own scores" ON public.interview_scores
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can view their own scores" ON public.interview_scores
    FOR SELECT USING (true);
