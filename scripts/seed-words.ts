import { config } from "dotenv";
import { resolve } from "path";
config({ path: resolve(process.cwd(), ".env.local") });

import { createClient } from "@supabase/supabase-js";
import { hiraganaWords } from "../data/hiragana-words";
import { katakanaWords } from "../data/katakana-words";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const pexelsKey = process.env.PEXELS_API_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

async function fetchPexelsImage(keyword: string): Promise<{ url: string | null; photographer: string | null; photographerUrl: string | null }> {
  try {
    const res = await fetch(
      `https://api.pexels.com/v1/search?query=${encodeURIComponent(keyword)}&per_page=1&orientation=square`,
      { headers: { Authorization: pexelsKey } },
    );
    if (!res.ok) return { url: null, photographer: null, photographerUrl: null };
    const data = await res.json();
    if (!data.photos?.[0]) return { url: null, photographer: null, photographerUrl: null };
    return {
      url: data.photos[0].src.medium,
      photographer: data.photos[0].photographer,
      photographerUrl: data.photos[0].photographer_url,
    };
  } catch {
    return { url: null, photographer: null, photographerUrl: null };
  }
}

async function seed() {
  console.log("🌱 Seeding words to Supabase...\n");

  // Skip clearing — we check below

  const allWords = [
    ...hiraganaWords.map((w) => ({ ...w, script_type: "hiragana" as const })),
    ...katakanaWords.map((w) => ({ ...w, script_type: "katakana" as const })),
  ];

  console.log(`Total words to seed: ${allWords.length}\n`);

  const batchSize = 20;
  for (let i = 0; i < allWords.length; i += batchSize) {
    const batch = allWords.slice(i, i + batchSize);
    const rows = [];

    for (const word of batch) {
      const img = await fetchPexelsImage(word.searchKeyword);
      rows.push({
        script_type: word.script_type,
        japanese: word.japanese,
        romaji: word.romaji,
        meaning: word.meaning,
        category: word.category,
        image_url: img.url,
        image_photographer: img.photographer,
        image_photographer_url: img.photographerUrl,
      });

      if (img.url) {
        console.log(`  ✓ ${word.japanese} (${word.romaji}) → image found`);
      } else {
        console.log(`  - ${word.japanese} (${word.romaji}) → no image`);
      }

      // Pexels rate limit
      await new Promise((r) => setTimeout(r, 500));
    }

    const { error } = await supabase.from("words").insert(rows);
    if (error) {
      console.error(`  ✗ Batch ${i / batchSize + 1} failed:`, error.message);
    } else {
      console.log(`  ✓ Batch ${i / batchSize + 1}/${Math.ceil(allWords.length / batchSize)} inserted\n`);
    }
  }

  console.log("\n✅ Seeding complete!");
}

seed().catch(console.error);
