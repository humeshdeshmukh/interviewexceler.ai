-- ==============================================================================
-- INTERVIEW EXCELER AI - COMPLETE DATABASE SETUP SCRIPT
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ==============================================================================
-- 2. HELPER FUNCTIONS & TRIGGERS
-- ==============================================================================

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ==============================================================================
-- 3. TABLES
-- ==============================================================================

-- 3.1 USERS (App profile metadata synced from auth.users)
CREATE TABLE IF NOT EXISTS public.users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    avatar_url TEXT,
    subscription_tier TEXT DEFAULT 'free',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3.2 USER_PROFILES (General profile, skills, preferences)
CREATE TABLE IF NOT EXISTS public.user_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
    bio TEXT,
    resume_url TEXT,
    target_role TEXT,
    experience_level TEXT,
    skills JSONB DEFAULT '[]'::jsonb,
    preferences JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3.3 USER_ACTIVITY_LOG (Recent activity history for dashboard)
CREATE TABLE IF NOT EXISTS public.user_activity_log (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    activity_type TEXT NOT NULL,
    description TEXT,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3.4 INTERVIEW_USER_PROFILES (Specific profile used by visual simulation)
CREATE TABLE IF NOT EXISTS public.interview_user_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
    name TEXT,
    resume_url TEXT,
    target_role TEXT,
    experience_level TEXT,
    skills JSONB DEFAULT '[]'::jsonb,
    preferences JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3.5 INTERVIEW_SESSIONS (Mock interviews & simulations)
CREATE TABLE IF NOT EXISTS public.interview_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id TEXT NOT NULL,
    session_type TEXT DEFAULT 'mock',
    category TEXT,
    difficulty TEXT,
    status TEXT DEFAULT 'in_progress',
    resume_text TEXT,
    job_description TEXT,
    goal TEXT,
    started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    completed_at TIMESTAMP WITH TIME ZONE,
    total_score NUMERIC,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3.6 INTERVIEW_SCORES (Per-question evaluation scores & metrics)
CREATE TABLE IF NOT EXISTS public.interview_scores (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID NOT NULL REFERENCES public.interview_sessions(id) ON DELETE CASCADE,
    question_index INTEGER NOT NULL DEFAULT 0,
    question_text TEXT NOT NULL,
    answer_text TEXT NOT NULL,
    feedback TEXT,
    scores JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3.7 INTERVIEW_RESPONSES (Detailed AI feedback & suggested answers)
CREATE TABLE IF NOT EXISTS public.interview_responses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID REFERENCES public.interview_sessions(id) ON DELETE CASCADE,
    question_id TEXT,
    question_text TEXT NOT NULL,
    user_answer TEXT,
    ai_feedback JSONB,
    score NUMERIC,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3.8 PRACTICE_TESTS (Aptitude & technical practice tests)
CREATE TABLE IF NOT EXISTS public.practice_tests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    test_type TEXT NOT NULL,
    topics TEXT[] DEFAULT '{}'::text[],
    difficulty TEXT,
    questions JSONB NOT NULL DEFAULT '[]'::jsonb,
    answers JSONB DEFAULT '{}'::jsonb,
    score NUMERIC,
    completed BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    completed_at TIMESTAMP WITH TIME ZONE
);

-- 3.9 RESUMES (Saved AI Resume Builder drafts & ATS scores)
CREATE TABLE IF NOT EXISTS public.resumes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    content JSONB NOT NULL DEFAULT '{}'::jsonb,
    ats_score NUMERIC,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3.10 RESUME_ANALYSES (CV review and ATS report storage)
CREATE TABLE IF NOT EXISTS public.resume_analyses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    resume_url TEXT,
    analysis_result JSONB,
    suggestions JSONB,
    ats_score NUMERIC DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3.11 CONSULTATIONS (AI Career Consultation chats)
CREATE TABLE IF NOT EXISTS public.consultations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    title TEXT DEFAULT 'New Chat',
    topic TEXT NOT NULL DEFAULT 'career-guidance',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3.12 CONSULTATION_MESSAGES (Messages within a consultation)
CREATE TABLE IF NOT EXISTS public.consultation_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    consultation_id UUID NOT NULL REFERENCES public.consultations(id) ON DELETE CASCADE,
    role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==============================================================================
-- 4. PERFORMANCE INDEXES
-- ==============================================================================

CREATE INDEX IF NOT EXISTS idx_users_email ON public.users(email);
CREATE INDEX IF NOT EXISTS idx_users_created_at ON public.users(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_user_profiles_user_id ON public.user_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_user_activity_log_user_id ON public.user_activity_log(user_id);
CREATE INDEX IF NOT EXISTS idx_user_activity_log_created_at ON public.user_activity_log(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_interview_user_profiles_user_id ON public.interview_user_profiles(user_id);

CREATE INDEX IF NOT EXISTS idx_interview_sessions_user_id ON public.interview_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_interview_sessions_created_at ON public.interview_sessions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_interview_sessions_started_at ON public.interview_sessions(started_at DESC);

CREATE INDEX IF NOT EXISTS idx_interview_scores_session_id ON public.interview_scores(session_id);
CREATE INDEX IF NOT EXISTS idx_interview_scores_created_at ON public.interview_scores(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_interview_responses_session_id ON public.interview_responses(session_id);

CREATE INDEX IF NOT EXISTS idx_practice_tests_user_id ON public.practice_tests(user_id);
CREATE INDEX IF NOT EXISTS idx_practice_tests_created_at ON public.practice_tests(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_resumes_user_id ON public.resumes(user_id);
CREATE INDEX IF NOT EXISTS idx_resumes_created_at ON public.resumes(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_resume_analyses_user_id ON public.resume_analyses(user_id);

CREATE INDEX IF NOT EXISTS idx_consultations_user_id ON public.consultations(user_id);
CREATE INDEX IF NOT EXISTS idx_consultations_created_at ON public.consultations(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_consultation_messages_consultation_id ON public.consultation_messages(consultation_id);
CREATE INDEX IF NOT EXISTS idx_consultation_messages_created_at ON public.consultation_messages(created_at);

-- ==============================================================================
-- 5. AUTOMATIC TIMESTAMP TRIGGERS
-- ==============================================================================

DROP TRIGGER IF EXISTS trigger_users_updated_at ON public.users;
CREATE TRIGGER trigger_users_updated_at BEFORE UPDATE ON public.users FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS trigger_user_profiles_updated_at ON public.user_profiles;
CREATE TRIGGER trigger_user_profiles_updated_at BEFORE UPDATE ON public.user_profiles FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS trigger_interview_user_profiles_updated_at ON public.interview_user_profiles;
CREATE TRIGGER trigger_interview_user_profiles_updated_at BEFORE UPDATE ON public.interview_user_profiles FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS trigger_interview_sessions_updated_at ON public.interview_sessions;
CREATE TRIGGER trigger_interview_sessions_updated_at BEFORE UPDATE ON public.interview_sessions FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS trigger_resumes_updated_at ON public.resumes;
CREATE TRIGGER trigger_resumes_updated_at BEFORE UPDATE ON public.resumes FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS trigger_consultations_updated_at ON public.consultations;
CREATE TRIGGER trigger_consultations_updated_at BEFORE UPDATE ON public.consultations FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- ==============================================================================
-- 6. AUTH SIGNUP HOOK (Automatically create profiles when user registers)
-- ==============================================================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    -- 1. Insert into public.users
    INSERT INTO public.users (id, email, full_name, avatar_url)
    VALUES (
        NEW.id,
        NEW.email,
        NEW.raw_user_meta_data->>'full_name',
        NEW.raw_user_meta_data->>'avatar_url'
    )
    ON CONFLICT (id) DO UPDATE SET
        email = EXCLUDED.email,
        full_name = COALESCE(EXCLUDED.full_name, public.users.full_name),
        avatar_url = COALESCE(EXCLUDED.avatar_url, public.users.avatar_url),
        updated_at = NOW();

    -- 2. Insert into public.user_profiles
    INSERT INTO public.user_profiles (id, user_id)
    VALUES (NEW.id, NEW.id)
    ON CONFLICT (user_id) DO NOTHING;

    -- 3. Insert into public.interview_user_profiles
    INSERT INTO public.interview_user_profiles (user_id, name)
    VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name')
    ON CONFLICT (user_id) DO NOTHING;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_new_user();

-- ==============================================================================
-- 7. ROW LEVEL SECURITY (RLS) & POLICIES
-- ==============================================================================

-- Enable RLS on all tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_activity_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.interview_user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.interview_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.interview_scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.interview_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.practice_tests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resumes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resume_analyses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.consultations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.consultation_messages ENABLE ROW LEVEL SECURITY;

-- 7.1 USERS Policies
DROP POLICY IF EXISTS "Users can view own data" ON public.users;
CREATE POLICY "Users can view own data" ON public.users FOR SELECT USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update own data" ON public.users;
CREATE POLICY "Users can update own data" ON public.users FOR UPDATE USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can insert own data" ON public.users;
CREATE POLICY "Users can insert own data" ON public.users FOR INSERT WITH CHECK (auth.uid() = id);

-- 7.2 USER_PROFILES Policies
DROP POLICY IF EXISTS "Users can view own profile" ON public.user_profiles;
CREATE POLICY "Users can view own profile" ON public.user_profiles FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own profile" ON public.user_profiles;
CREATE POLICY "Users can update own profile" ON public.user_profiles FOR UPDATE USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own profile" ON public.user_profiles;
CREATE POLICY "Users can insert own profile" ON public.user_profiles FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 7.3 USER_ACTIVITY_LOG Policies
DROP POLICY IF EXISTS "Users can view own activity" ON public.user_activity_log;
CREATE POLICY "Users can view own activity" ON public.user_activity_log FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own activity" ON public.user_activity_log;
CREATE POLICY "Users can insert own activity" ON public.user_activity_log FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 7.4 INTERVIEW_USER_PROFILES Policies
DROP POLICY IF EXISTS "Users can view own interview profile" ON public.interview_user_profiles;
CREATE POLICY "Users can view own interview profile" ON public.interview_user_profiles FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own interview profile" ON public.interview_user_profiles;
CREATE POLICY "Users can insert own interview profile" ON public.interview_user_profiles FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own interview profile" ON public.interview_user_profiles;
CREATE POLICY "Users can update own interview profile" ON public.interview_user_profiles FOR UPDATE USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete own interview profile" ON public.interview_user_profiles;
CREATE POLICY "Users can delete own interview profile" ON public.interview_user_profiles FOR DELETE USING (auth.uid() = user_id);

-- 7.5 INTERVIEW_SESSIONS Policies
DROP POLICY IF EXISTS "Users can view own sessions" ON public.interview_sessions;
CREATE POLICY "Users can view own sessions" ON public.interview_sessions FOR SELECT USING (auth.uid()::text = user_id);

DROP POLICY IF EXISTS "Users can insert own sessions" ON public.interview_sessions;
CREATE POLICY "Users can insert own sessions" ON public.interview_sessions FOR INSERT WITH CHECK (auth.uid()::text = user_id);

DROP POLICY IF EXISTS "Users can update own sessions" ON public.interview_sessions;
CREATE POLICY "Users can update own sessions" ON public.interview_sessions FOR UPDATE USING (auth.uid()::text = user_id);

DROP POLICY IF EXISTS "Users can delete own sessions" ON public.interview_sessions;
CREATE POLICY "Users can delete own sessions" ON public.interview_sessions FOR DELETE USING (auth.uid()::text = user_id);

-- 7.6 INTERVIEW_SCORES Policies
DROP POLICY IF EXISTS "Users can view own scores" ON public.interview_scores;
CREATE POLICY "Users can view own scores" ON public.interview_scores FOR SELECT
    USING (EXISTS (SELECT 1 FROM public.interview_sessions s WHERE s.id = interview_scores.session_id AND s.user_id = auth.uid()::text));

DROP POLICY IF EXISTS "Users can insert own scores" ON public.interview_scores;
CREATE POLICY "Users can insert own scores" ON public.interview_scores FOR INSERT
    WITH CHECK (EXISTS (SELECT 1 FROM public.interview_sessions s WHERE s.id = interview_scores.session_id AND s.user_id = auth.uid()::text));

-- 7.7 INTERVIEW_RESPONSES Policies
DROP POLICY IF EXISTS "Users can view own responses" ON public.interview_responses;
CREATE POLICY "Users can view own responses" ON public.interview_responses FOR SELECT
    USING (EXISTS (SELECT 1 FROM public.interview_sessions s WHERE s.id = interview_responses.session_id AND s.user_id = auth.uid()::text));

DROP POLICY IF EXISTS "Users can insert own responses" ON public.interview_responses;
CREATE POLICY "Users can insert own responses" ON public.interview_responses FOR INSERT
    WITH CHECK (EXISTS (SELECT 1 FROM public.interview_sessions s WHERE s.id = interview_responses.session_id AND s.user_id = auth.uid()::text));

-- 7.8 PRACTICE_TESTS Policies
DROP POLICY IF EXISTS "Users can manage own tests" ON public.practice_tests;
CREATE POLICY "Users can manage own tests" ON public.practice_tests FOR ALL USING (auth.uid() = user_id);

-- 7.9 RESUMES Policies
DROP POLICY IF EXISTS "Users can manage own resumes" ON public.resumes;
CREATE POLICY "Users can manage own resumes" ON public.resumes FOR ALL USING (auth.uid() = user_id);

-- 7.10 RESUME_ANALYSES Policies
DROP POLICY IF EXISTS "Users can manage own cv analyses" ON public.resume_analyses;
CREATE POLICY "Users can manage own cv analyses" ON public.resume_analyses FOR ALL USING (auth.uid() = user_id);

-- 7.11 CONSULTATIONS Policies
DROP POLICY IF EXISTS "Users can manage own consultations" ON public.consultations;
CREATE POLICY "Users can manage own consultations" ON public.consultations FOR ALL USING (auth.uid() = user_id);

-- 7.12 CONSULTATION_MESSAGES Policies
DROP POLICY IF EXISTS "Users can view messages from their consultations" ON public.consultation_messages;
CREATE POLICY "Users can view messages from their consultations" ON public.consultation_messages FOR SELECT
    USING (EXISTS (SELECT 1 FROM public.consultations c WHERE c.id = consultation_messages.consultation_id AND c.user_id = auth.uid()));

DROP POLICY IF EXISTS "Users can create messages in their consultations" ON public.consultation_messages;
CREATE POLICY "Users can create messages in their consultations" ON public.consultation_messages FOR INSERT
    WITH CHECK (EXISTS (SELECT 1 FROM public.consultations c WHERE c.id = consultation_messages.consultation_id AND c.user_id = auth.uid()));

-- ==============================================================================
-- 8. REALTIME CONFIGURATION
-- ==============================================================================

-- Enable realtime updates on user_profiles (used by useUser hook)
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_publication_tables 
        WHERE pubname = 'supabase_realtime' 
        AND schemaname = 'public' 
        AND tablename = 'user_profiles'
    ) THEN
        ALTER PUBLICATION supabase_realtime ADD TABLE public.user_profiles;
    END IF;
END $$;

-- ==============================================================================
-- 9. PERMISSIONS GRANT
-- ==============================================================================

GRANT USAGE ON SCHEMA public TO anon, authenticated, service_role;
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated, service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated, service_role;

-- ==============================================================================
-- 10. BACKFILL EXISTING USERS (if any exist in auth.users)
-- ==============================================================================

INSERT INTO public.users (id, email, full_name, avatar_url)
SELECT id, email, raw_user_meta_data->>'full_name', raw_user_meta_data->>'avatar_url'
FROM auth.users
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.user_profiles (id, user_id)
SELECT id, id
FROM auth.users
ON CONFLICT (user_id) DO NOTHING;

INSERT INTO public.interview_user_profiles (user_id, name)
SELECT id, raw_user_meta_data->>'full_name'
FROM auth.users
ON CONFLICT (user_id) DO NOTHING;

SELECT 'Interview Exceler database setup completed successfully!' AS status;
