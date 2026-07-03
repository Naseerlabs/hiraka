import { createClient as createServerClient } from "@/lib/supabase/server";
import PracticeClient from "./practice-client";
import type { Word } from "@/types/database";

export const dynamic = "force-dynamic";

async function getWords(type: string): Promise<Word[]> {
  const supabase = await createServerClient();
  const { data } = await supabase.rpc("get_random_words", {
    p_script_type: type,
    p_count: 20,
  });
  return (data as Word[]) ?? [];
}

export default async function PracticePage({
  params,
}: {
  params: Promise<{ type: string }>;
}) {
  const { type } = await params;
  const words = await getWords(type);

  if (words.length === 0) {
    return (
      <main className="min-h-screen flex items-center justify-center p-6">
        <p className="text-zinc-500">No words found. Run the seed script first.</p>
      </main>
    );
  }

  return <PracticeClient words={words} scriptType={type as "hiragana" | "katakana"} />;
}
