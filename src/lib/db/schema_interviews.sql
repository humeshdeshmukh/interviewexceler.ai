-- Create interview_sessions table
create table if not exists interview_sessions (
  id uuid default gen_random_uuid() primary key,
  user_id text not null, -- In a real app, this would be a foreign key to auth.users
  resume_text text,
  goal text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create interview_scores table
create table if not exists interview_scores (
  id uuid default gen_random_uuid() primary key,
  session_id uuid references interview_sessions(id) on delete cascade,
  question_index integer,
  question_text text,
  answer_text text,
  feedback text,
  scores jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS (Optional, but recommended)
alter table interview_sessions enable row level security;
alter table interview_scores enable row level security;

-- Create policies (Adjust as needed for your auth setup)
create policy "Enable insert for authenticated users only" on interview_sessions for insert with check (true);
create policy "Enable select for users based on user_id" on interview_sessions for select using (true); -- Simplified for demo

create policy "Enable insert for authenticated users only" on interview_scores for insert with check (true);
create policy "Enable select for users based on session_id" on interview_scores for select using (true); -- Simplified for demo
