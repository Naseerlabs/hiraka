-- Run this entire file in your Supabase SQL Editor
-- https://supabase.com/dashboard/project/dveuhzrjaryziwnxojvg/sql/new

-- 1. Words table
create table if not exists public.words (
  id          bigint generated always as identity primary key,
  script_type text      not null check (script_type in ('hiragana', 'katakana')),
  japanese    text      not null,
  romaji      text      not null,
  meaning     text      not null,
  category    text,
  image_url   text,
  image_photographer     text,
  image_photographer_url text,
  created_at  timestamptz not null default now()
);

create index if not exists idx_words_script_type on public.words (script_type);

alter table public.words enable row level security;
create policy "Allow public read" on public.words for select using (true);

-- 2. Practice sessions table
create table if not exists public.practice_sessions (
  id            bigint generated always as identity primary key,
  user_id       uuid       references auth.users(id) on delete cascade,
  script_type   text       not null check (script_type in ('hiragana', 'katakana')),
  word_ids      bigint[]   not null default '{}',
  revealed_ids  bigint[]   not null default '{}',
  started_at    timestamptz not null default now(),
  completed_at  timestamptz
);

alter table public.practice_sessions enable row level security;
create policy "Users can manage own sessions" on public.practice_sessions
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- 3. Random word selection function
create or replace function public.get_random_words(
  p_script_type text,
  p_count int default 20
)
returns setof public.words
language sql
stable
as $$
  select *
  from public.words
  where script_type = p_script_type
  order by random()
  limit p_count;
$$;
