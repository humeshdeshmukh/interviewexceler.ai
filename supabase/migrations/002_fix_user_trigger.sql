-- Fix the handle_new_user trigger function
-- The user_profiles table only has 'id' column, not 'user_id'
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.users (id, email, full_name, avatar_url)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  
  insert into public.user_profiles (id)
  values (new.id);
  
  return new;
end;
$$ language plpgsql security definer;
