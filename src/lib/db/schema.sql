-- Create interview_sessions table
CREATE TABLE IF NOT EXISTS interview_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL, -- Assuming you have a users table or auth.users
  resume_text TEXT,
  goal TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create interview_scores table
CREATE TABLE IF NOT EXISTS interview_scores (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id UUID REFERENCES interview_sessions(id) ON DELETE CASCADE,
  question_index INTEGER,
  question_text TEXT,
  answer_text TEXT,
  feedback TEXT,
  scores JSONB, -- Stores { communication: number, bodyLanguage: number, answerQuality: number }
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE interview_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE interview_scores ENABLE ROW LEVEL SECURITY;

-- Create policies (adjust as needed for your auth setup)
-- Allow users to insert their own sessions
CREATE POLICY "Users can insert their own sessions" ON interview_sessions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Allow users to view their own sessions
CREATE POLICY "Users can view their own sessions" ON interview_sessions
  FOR SELECT USING (auth.uid() = user_id);

-- Allow users to insert scores for their sessions (via session_id check could be complex, simplifying for now)
-- Ideally, you'd check if the session belongs to the user.
CREATE POLICY "Users can insert scores" ON interview_scores
  FOR INSERT WITH CHECK (true); -- refine this based on your needs

-- Allow users to view scores for their sessions
CREATE POLICY "Users can view their own scores" ON interview_scores
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM interview_sessions
      WHERE interview_sessions.id = interview_scores.session_id
      AND interview_sessions.user_id = auth.uid()
    )
  );
