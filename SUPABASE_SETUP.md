# Supabase Setup Instructions

## Step 1: Create the `resumes` Table

You need to create the `resumes` table in your Supabase database. Follow these steps:

1. Go to your Supabase Dashboard: <https://app.supabase.com>
2. Select your project
3. Click on "SQL Editor" in the left sidebar
4. Click "New Query"
5. Paste the following SQL and click "Run":

```sql
create table resumes (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade,
  content jsonb not null,
  ats_score integer,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

-- Enable Row Level Security
alter table resumes enable row level security;

-- Create policies
create policy "Users can view their own resumes"
  on resumes for select
  using (auth.uid() = user_id);

create policy "Users can insert their own resumes"
  on resumes for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own resumes"
  on resumes for update
  using (auth.uid() = user_id);

create policy "Users can delete their own resumes"
  on resumes for delete
  using (auth.uid() = user_id);

-- Create an index for faster queries
create index resumes_user_id_idx on resumes(user_id);
```

## Step 2: Verify Environment Variables

Make sure your `.env` file has the following variables set:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
GEMINI_API_KEY=your_gemini_api_key
```

## Step 3: Restart Your Dev Server

After creating the table, restart your Next.js dev server:

```bash
npm run dev
```

## Testing

1. Visit `/products/resume-builder/dashboard` - you should see an empty list
2. Create a new resume and click "Save"
3. Go back to the dashboard - you should see your saved resume
4. Click "Edit Resume" to load it back into the builder
