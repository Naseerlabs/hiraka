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

-- Index for fetching random words of a given type
create index if not exists idx_words_script_type on public.words (script_type);

-- Enable Row Level Security but allow public read for now (personal app)
alter table public.words enable row level security;
create policy "Allow public read" on public.words for select using (true);
