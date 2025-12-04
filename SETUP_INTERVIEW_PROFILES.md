# Setup Instructions for Interview User Profiles

## ✅ What's Been Done

1. **Created separate table**: `interview_user_profiles` (won't interfere with existing `user_profiles`)
2. **Updated code**: All references now point to `interview_user_profiles`
3. **Fixed error handling**: Better logging for profile fetch errors

## 🚀 Next Steps

### Run the SQL Migration

1. Open your **Supabase Dashboard**
2. Go to **SQL Editor** (left sidebar)
3. Click **New Query**
4. Copy and paste the contents of: `interview_profiles_migration.sql`
5. Click **Run** (or Ctrl+Enter)

You should see: **"interview_user_profiles table created successfully!"**

### Test the Profile Page

1. Save any changes and wait for your dev server to reload
2. Navigate to: `http://localhost:3000/profile`
3. Fill in your profile information
4. Click "Save Profile"  
5. Click "Start Mock Interview" to test integration

## 📋 What the Migration Creates

- ✅ `interview_user_profiles` table
- ✅ Columns: `user_id`, `target_role`, `experience_level`, `skills`, `preferences`
- ✅ RLS policies (users can only see/edit their own data)
- ✅ Auto-update trigger for `updated_at`
- ✅ Proper indexes for performance

## ❓ If You Still Get Errors

### Check if table exists

```sql
SELECT * FROM interview_user_profiles LIMIT 1;
```

### Clear and recreate (⚠️ deletes data)

```sql
DROP TABLE IF EXISTS interview_user_profiles CASCADE;
```

Then run the migration again.

## 🔄 What Changed in Code

- `supabaseService.ts`: Now uses `interview_user_profiles` table
- Profile page: Displays better error messages
- Mock interview: Can access saved profile data

Your existing `user_profiles` table remains untouched!
