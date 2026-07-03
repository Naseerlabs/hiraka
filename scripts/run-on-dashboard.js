// ═══════════════════════════════════════════════════════════════
// HIRAKA — Supabase Migration Runner
// ═══════════════════════════════════════════════════════════════
//
// 1. Go to https://supabase.com/dashboard/project/dveuhzrjaryziwnxojvg
// 2. Press F12 (or Ctrl+Shift+I) to open DevTools
// 3. Click "Console" tab
// 4. Paste this entire script and press Enter
// 5. Wait for "✅ DONE!" message
//
// ═══════════════════════════════════════════════════════════════

(async () => {
  const ref = "dveuhzrjaryziwnxojvg";

  // Get the access token from the dashboard's local storage
  const token =
    JSON.parse(localStorage.getItem("sb-" + ref + "-auth-token") || "null")
      ?.access_token ||
    (await (async () => {
      // Try to get it from the Supabase API
      const res = await fetch(
        "https://api.supabase.com/v1/projects/" + ref + "/api-keys",
        { credentials: "include" },
      );
      const keys = await res.json();
      return keys.find((k) => k.name === "service_role")?.api_key;
    })());

  if (!token) {
    console.error("❌ Could not get auth token. Make sure you're logged in to Supabase dashboard.");
    return;
  }

  const sql = `
    create table if not exists public.words (
      id          bigint generated always as identity primary key,
      script_type text not null check (script_type in ('hiragana','katakana')),
      japanese    text not null,
      romaji      text not null,
      meaning     text not null,
      category    text,
      image_url   text,
      image_photographer text,
      image_photographer_url text,
      created_at  timestamptz not null default now()
    );
    create index if not exists idx_words_script_type on public.words(script_type);
    alter table public.words enable row level security;
    create policy "Allow public read" on public.words for select using (true);

    create table if not exists public.practice_sessions (
      id            bigint generated always as identity primary key,
      script_type   text not null check (script_type in ('hiragana','katakana')),
      word_ids      bigint[] not null default '{}',
      revealed_ids  bigint[] not null default '{}',
      started_at    timestamptz not null default now(),
      completed_at  timestamptz
    );
    alter table public.practice_sessions enable row level security;
    create policy "Allow all on practice_sessions" on public.practice_sessions
      for all using (true) with check (true);

    create or replace function public.get_random_words(p_script_type text, p_count int default 20)
      returns setof public.words language sql stable as $$
        select * from public.words
        where script_type = p_script_type
        order by random() limit p_count;
      $$;
  `;

  try {
    const res = await fetch(
      "https://api.supabase.com/v1/projects/" + ref + "/sql",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({ query: sql }),
      },
    );

    if (res.ok) {
      console.log("✅ Migration successful! Tables created.");
      console.log("📦 Now run: npm run seed");
    } else {
      const err = await res.text();
      console.error("❌ Failed:", err);
      console.log("\nAlternative: Go to https://supabase.com/dashboard/project/" + ref + "/sql/new");
      console.log("and paste the SQL from supabase/migration-combined.sql file.");
    }
  } catch (err) {
    console.error("❌ Error:", err.message);
  }
})();
