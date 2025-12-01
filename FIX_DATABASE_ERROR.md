# Fix Database Error: "Database error saving new user"

## Root Cause

When a new user signs up, Supabase Auth successfully creates the authentication record, but a **database trigger** (`handle_new_user`) tries to automatically create related records in:

1. `public.users` table
2. `public.user_profiles` table

**The problem**: These tables don't exist in your database, causing the trigger to fail with "Database error saving new user".

---

## Solution: Run Database Migration

You need to create these tables in your Supabase database. Follow these steps:

### Step 1: Open Supabase SQL Editor

1. Go to your **Supabase Dashboard**: <https://app.supabase.com>
2. Select your project
3. Click **"SQL Editor"** in the left sidebar
4. Click **"+ New Query"**

### Step 2: Copy and Run the Migration

Copy the **ENTIRE** SQL script from this file and paste it into the SQL editor:

📁 **File location**: [`001_create_user_tables.sql`](file:///d:/interviewexceler.ai_next.js-devops-master/supabase/migrations/001_create_user_tables.sql)

Or copy the SQL below:

<details>
<summary>Click to expand SQL migration script</summary>

```sql
-- Create the users table
CREATE TABLE IF NOT EXISTS public.users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create the user_profiles table
CREATE TABLE IF NOT EXISTS public.user_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    bio TEXT,
    preferences JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

-- Create RLS Policies for users table
CREATE POLICY "Users can view their own data" ON public.users
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own data" ON public.users
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Enable insert for authenticated users only" ON public.users
    FOR INSERT WITH CHECK (auth.uid() = id);

-- Create RLS Policies for user_profiles table
CREATE POLICY "Users can view their own profile" ON public.user_profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.user_profiles
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Enable insert for authenticated users only" ON public.user_profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

-- Create the handle_new_user function
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.users (id, email, full_name, avatar_url)
    VALUES (
        NEW.id,
        NEW.email,
        NEW.raw_user_meta_data->>'full_name',
        NEW.raw_user_meta_data->>'avatar_url'
    );
    
    INSERT INTO public.user_profiles (id)
    VALUES (NEW.id);
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create the trigger on auth.users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_new_user();

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS users_email_idx ON public.users(email);
CREATE INDEX IF NOT EXISTS users_created_at_idx ON public.users(created_at DESC);
```

</details>

### Step 3: Execute the Migration

1. Click the **"RUN"** button (or press `Ctrl+Enter` / `Cmd+Enter`)
2. Wait for the success message

### Step 4: Verify Tables Were Created

1. Click **"Table Editor"** in the left sidebar
2. You should now see two new tables:
   - ✅ `users`
   - ✅ `user_profiles`

---

## Test Account Creation

After running the migration:

1. **Go back to your app** (it should still be running on `localhost:3000`)
2. **Try creating a new account** again
3. **It should work now!** 🎉

---

## What This Does

### Tables Created

1. **`public.users`** - Stores user profile information
   - `id` - Links to auth.users
   - `email` - User's email
   - `full_name` - User's full name
   - `avatar_url` - Profile picture URL
   - Timestamps

2. **`public.user_profiles`** - Stores user preferences and settings
   - `id` - Links to auth.users
   - `bio` - User bio/description
   - `preferences` - JSON object for user settings
   - Timestamps

### Trigger Setup

- **Function**: `handle_new_user()` - Automatically creates user records
- **Trigger**: `on_auth_user_created` - Fires when someone signs up
- **RLS Policies**: Ensures users can only access their own data

---

## If You Get Errors

### "relation already exists"

✅ **This is OK!** It means the table already exists. The migration uses `IF NOT EXISTS` so it's safe to run multiple times.

### "permission denied"

❌ Make sure you're the project owner or have sufficient permissions.

### "function already exists"

✅ **This is OK!** The migration uses `CREATE OR REPLACE` so it will update the function.

### Other errors

📝 Copy the error message and share it - I can help troubleshoot!

---

## Alternative: Manual Table Creation

If you prefer, you can also create just the basic tables without the trigger:

```sql
CREATE TABLE IF NOT EXISTS public.users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS public.user_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);
```

And then run `002_fix_user_trigger.sql` separately.

---

## Summary

**Problem**: Database trigger fails because `users` and `user_profiles` tables don't exist

**Solution**: Run the migration SQL to create the tables and set up the trigger

**Result**: Account creation will work! ✅
