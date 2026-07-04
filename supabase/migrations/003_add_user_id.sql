-- Add user_id to practice_sessions (run after original migration)
alter table public.practice_sessions
  add column if not exists user_id uuid references auth.users(id) on delete cascade;

-- Update RLS policies
drop policy if exists "Allow all on practice_sessions" on public.practice_sessions;
drop policy if exists "Users can manage own sessions" on public.practice_sessions;

create policy "Users can manage own sessions" on public.practice_sessions
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
