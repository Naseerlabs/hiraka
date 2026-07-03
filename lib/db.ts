import { createClient as createBrowserClient } from "@/lib/supabase/client";
import { createClient as createServerClient } from "@/lib/supabase/server";
import type { Word, PracticeSession } from "@/types/database";

async function getClient(server = false) {
  return server ? await createServerClient() : createBrowserClient();
}

/** Fetch 20 random words of the given script type for a practice session */
export async function getRandomWords(
  type: "hiragana" | "katakana",
  count = 20,
  server = false,
): Promise<Word[]> {
  const supabase = await getClient(server);
  const { data } = await supabase
    .rpc("get_random_words", { p_script_type: type, p_count: count });

  return (data ?? []) as Word[];
}

/** Create a new practice session record */
export async function createSession(
  scriptType: "hiragana" | "katakana",
  wordIds: number[],
): Promise<PracticeSession | null> {
  const supabase = await getClient();
  const { data } = await supabase
    .from("practice_sessions")
    .insert({ script_type: scriptType, word_ids: wordIds })
    .select()
    .single();

  return data;
}

/** Update a session with revealed words */
export async function updateSessionRevealed(
  sessionId: number,
  revealedIds: number[],
): Promise<void> {
  const supabase = await getClient();
  await supabase
    .from("practice_sessions")
    .update({ revealed_ids: revealedIds })
    .eq("id", sessionId);
}

/** Complete a session */
export async function completeSession(sessionId: number): Promise<void> {
  const supabase = await getClient();
  await supabase
    .from("practice_sessions")
    .update({ completed_at: new Date().toISOString() })
    .eq("id", sessionId);
}
