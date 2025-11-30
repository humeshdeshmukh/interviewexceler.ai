# How to Apply Supabase Migration for Interview Tables

## Quick Steps

1. **Open Supabase Dashboard**
   - Go to: <https://supabase.com/dashboard>
   - Select your project

2. **Navigate to SQL Editor**
   - Click "SQL Editor" in the left sidebar
   - Click "+ New Query"

3. **Copy & Paste the SQL**
   Copy the entire contents below and paste into the SQL editor:

```sql
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
```

4. **Run the Query**
   - Click "RUN" button (or press Ctrl+Enter / Cmd+Enter)
   - Wait for "Success. No rows returned" message

5. **Verify Tables Were Created**
   - Click "Table Editor" in left sidebar
   - You should see:
     - `interview_sessions`
     - `interview_scores`

6. **Test Your Application**
   - Go back to your app
   - Try the personalized interview again
   - The error should be gone!

## If You Get Errors

- **"relation already exists"** - That's OK! It means the table is already there
- **"permission denied"** - Make sure you're the project owner
- **Other errors** - Share the error message and I can help

---

**Note:** The SQL file is also saved at:  
`d:\interviewexceler.ai-devops\supabase\migrations\create_interview_tables.sql`
