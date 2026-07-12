import { notFound } from "next/navigation";
import { createClient as createServerClient } from "@/lib/supabase/server";
import PracticeClient, { type PracticeItem } from "./practice-client";
import type { Word } from "@/types/database";
import { getSentencePractice, SENTENCE_TOPICS, type SentenceDifficulty, type SentenceTopic } from "@/data/japanese-sentences";

export const dynamic = "force-dynamic";

async function getWords(type: "hiragana" | "katakana", count: number): Promise<Word[]> {
  const supabase = await createServerClient();
  const { data } = await supabase.rpc("get_random_words", { p_script_type: type, p_count: count });
  return (data as Word[]) ?? [];
}

export default async function PracticePage({ params, searchParams }: { params: Promise<{ type: string }>; searchParams: Promise<{ topic?: string; level?: string; count?: string }> }) {
  const { type } = await params;
  const query = await searchParams;
  if (!(["hiragana", "katakana", "sentences"] as string[]).includes(type)) notFound();

  const count = Math.min(Math.max(Number(query.count) || 20, 5), 30);
  let items: PracticeItem[] = [];
  let topicLabel: string | undefined;

  if (type === "sentences") {
    const topic = (SENTENCE_TOPICS.some((entry) => entry.id === query.topic) ? query.topic : "greetings") as SentenceTopic;
    const level: SentenceDifficulty = query.level === "medium" ? "medium" : "easy";
    items = getSentencePractice(topic, level, count);
    topicLabel = `${SENTENCE_TOPICS.find((entry) => entry.id === topic)?.label} · ${level === "easy" ? "Easy" : "Medium"}`;
  } else {
    items = await getWords(type as "hiragana" | "katakana", 20);
  }

  if (items.length === 0) {
    return <main className="flex min-h-screen items-center justify-center p-6"><div className="max-w-md text-center"><h1 className="text-2xl font-semibold">Practice is not ready yet</h1><p className="mt-2 text-muted-foreground">No items were found for this session. Please return to the dashboard and try again.</p></div></main>;
  }

  return <PracticeClient items={items} practiceType={type as "hiragana" | "katakana" | "sentences"} topicLabel={topicLabel} />;
}
