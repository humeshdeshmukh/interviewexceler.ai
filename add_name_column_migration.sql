-- Add name column to existing interview_user_profiles table

ALTER TABLE public.interview_user_profiles 
ADD COLUMN IF NOT EXISTS name TEXT;

-- Verify column was added
SELECT 'Name column added successfully!' as status;
