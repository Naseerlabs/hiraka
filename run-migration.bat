@echo off
echo.
echo =====================================================
echo  HIRAKA - Supabase Migration Runner
echo =====================================================
echo.
echo This will create the database tables for your app.
echo.
echo First, get a Supabase Access Token:
echo  1. Go to https://supabase.com/dashboard/account/tokens
echo  2. Click "Generate New Token"
echo  3. Name: "hiraka-migration"
echo  4. Copy the generated token
echo.
set /p TOKEN="Paste your Supabase access token here: "

echo.
echo Running migration...
echo.

powershell -Command ^
  $sql = @' ^
create table if not exists public.words ( ^
  id bigint generated always as identity primary key, ^
  script_type text not null check (script_type in ('hiragana','katakana')), ^
  japanese text not null, ^
  romaji text not null, ^
  meaning text not null, ^
  category text, ^
  image_url text, ^
  image_photographer text, ^
  image_photographer_url text, ^
  created_at timestamptz not null default now() ^
); ^
create index if not exists idx_words_script_type on public.words(script_type); ^
alter table public.words enable row level security; ^
create policy "Allow public read" on public.words for select using (true); ^
create table if not exists public.practice_sessions ( ^
  id bigint generated always as identity primary key, ^
  script_type text not null check (script_type in ('hiragana','katakana')), ^
  word_ids bigint[] not null default '{}', ^
  revealed_ids bigint[] not null default '{}', ^
  started_at timestamptz not null default now(), ^
  completed_at timestamptz ^
); ^
alter table public.practice_sessions enable row level security; ^
create policy "Allow all on practice_sessions" on public.practice_sessions ^
  for all using (true) with check (true); ^
create or replace function public.get_random_words(p_script_type text, p_count int default 20) ^
  returns setof public.words language sql stable as $$ ^
    select * from public.words ^
    where script_type = p_script_type ^
    order by random() limit p_count; ^
  $$; ^
'@; ^
$body = @{ query = $sql } | ConvertTo-Json; ^
try { ^
  $res = Invoke-RestMethod -Uri "https://api.supabase.com/v1/projects/dveuhzrjaryziwnxojvg/sql" ^
    -Method Post ^
    -Headers @{ Authorization = "Bearer %TOKEN%"; "Content-Type" = "application/json" } ^
    -Body $body; ^
  Write-Host "  SUCCESS! Tables created."; ^
} catch { ^
  Write-Host "  FAILED: $_"; ^
  exit 1; ^
}

if %errorlevel% equ 0 (
  echo.
  echo =====================================================
  echo  DONE! Now run: npm run seed
  echo =====================================================
) else (
  echo.
  echo Failed. Try pasting the SQL directly at:
  echo https://supabase.com/dashboard/project/dveuhzrjaryziwnxojvg/sql/new
)

pause
