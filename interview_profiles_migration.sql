-- New separate table for interview profiles
-- This won't affect your existing user_profiles table

-- Create the new table with name column
CREATE TABLE public.interview_user_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT,
    resume_url TEXT,
    target_role TEXT,
    experience_level TEXT,
    skills JSONB DEFAULT '[]'::jsonb,
    preferences JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    CONSTRAINT interview_user_profiles_user_id_key UNIQUE(user_id)
);

-- Create index
CREATE INDEX idx_interview_user_profiles_user_id ON public.interview_user_profiles(user_id);

-- Enable RLS
ALTER TABLE public.interview_user_profiles ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view their own interview profile" ON public.interview_user_profiles
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own interview profile" ON public.interview_user_profiles
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own interview profile" ON public.interview_user_profiles
    FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own interview profile" ON public.interview_user_profiles
    FOR DELETE USING (auth.uid() = user_id);

-- Create update trigger function (only if it doesn't exist)
CREATE OR REPLACE FUNCTION update_interview_profile_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger
CREATE TRIGGER update_interview_user_profiles_updated_at
    BEFORE UPDATE ON public.interview_user_profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_interview_profile_updated_at();

-- Grant permissions
GRANT ALL ON public.interview_user_profiles TO authenticated;
GRANT ALL ON public.interview_user_profiles TO service_role;

-- Verify
SELECT 'interview_user_profiles table created successfully!' as status;
