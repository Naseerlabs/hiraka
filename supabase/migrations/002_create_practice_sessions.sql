create table if not exists public.practice_sessions (
  id            bigint generated always as identity primary key,
  script_type   text       not null check (script_type in ('hiragana', 'katakana')),
  word_ids      bigint[]   not null default '{}',
  revealed_ids  bigint[]   not null default '{}',
  started_at    timestamptz not null default now(),
  completed_at  timestamptz
);

alter table public.practice_sessions enable row level security;
create policy "Allow all on practice_sessions" on public.practice_sessions
  for all using (true) with check (true);
