"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowLeft, Check, Eye, Home, RotateCcw, X, XIcon } from "lucide-react";
import type { Word } from "@/types/database";
import type { JapaneseSentence } from "@/data/japanese-sentences";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

export type PracticeItem = Word | JapaneseSentence;

type Props = { items: PracticeItem[]; practiceType: "hiragana" | "katakana" | "sentences"; topicLabel?: string };

function isSentence(item: PracticeItem): item is JapaneseSentence { return "hiragana" in item; }

export default function PracticeClient({ items, practiceType, topicLabel }: Props) {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [answers, setAnswers] = useState<Record<number, boolean>>({});
  const [completed, setCompleted] = useState(false);
  const item = items[index];
  const total = items.length;
  const correct = Object.values(answers).filter(Boolean).length;
  const incorrect = Object.values(answers).filter((answer) => !answer).length;
  const label = practiceType === "sentences" ? topicLabel ?? "Daily sentences" : `${practiceType.charAt(0).toUpperCase()}${practiceType.slice(1)} words`;

  const handleAnswer = useCallback((value: boolean) => {
    setAnswers((current) => ({ ...current, [index]: value }));
    if (index >= total - 1) setCompleted(true);
    else { setIndex((current) => current + 1); setRevealed(false); }
  }, [index, total]);

  useEffect(() => {
    function handleKey(event: KeyboardEvent) {
      if (event.key === " " && !revealed) { event.preventDefault(); setRevealed(true); }
      if (revealed && (event.key === "1" || event.key.toLowerCase() === "x")) handleAnswer(false);
      if (revealed && (event.key === "2" || event.key.toLowerCase() === "c")) handleAnswer(true);
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [revealed, handleAnswer]);

  if (!item) return null;

  if (completed) {
    const accuracy = Math.round((correct / total) * 100);
    return (
      <main className="flex min-h-screen items-center justify-center bg-secondary/50 p-4 sm:p-6">
        <Card className="w-full max-w-xl shadow-lg">
          <CardHeader className="items-center gap-4 text-center">
            <div className="flex size-16 items-center justify-center rounded-full bg-primary text-primary-foreground"><Check className="size-8" /></div>
            <div><p className="text-sm font-semibold uppercase tracking-wider text-primary">Session complete</p><h1 className="mt-2 text-balance font-serif text-3xl font-semibold sm:text-4xl">Nice work. Keep the rhythm going.</h1><p className="mt-3 text-muted-foreground">You completed {total} {practiceType === "sentences" ? "sentences" : "words"} in {label.toLowerCase()}.</p></div>
          </CardHeader>
          <CardContent className="flex flex-col gap-6">
            <div className="grid grid-cols-3 overflow-hidden rounded-2xl border border-border bg-muted/40">
              <ResultStat value={`${accuracy}%`} label="Accuracy" />
              <ResultStat value={String(correct)} label="Correct" bordered />
              <ResultStat value={String(incorrect)} label="Review" />
            </div>
            <Progress value={accuracy} aria-label={`${accuracy}% accuracy`} />
          </CardContent>
          <CardFooter className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Button variant="outline" size="lg" onClick={() => window.location.reload()}><RotateCcw data-icon="inline-start" />Practice again</Button>
            <Button size="lg" onClick={() => router.push("/")}><Home data-icon="inline-start" />Back to dashboard</Button>
          </CardFooter>
        </Card>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <header className="border-b border-border bg-background">
        <div className="mx-auto flex max-w-4xl items-center gap-4 px-4 py-4 sm:px-6">
          <AlertDialog>
            <AlertDialogTrigger asChild><Button variant="ghost" size="icon" aria-label="Exit practice"><X /></Button></AlertDialogTrigger>
            <AlertDialogContent size="sm"><AlertDialogHeader><AlertDialogTitle>Leave this session?</AlertDialogTitle><AlertDialogDescription>Your answers from this session will not be saved.</AlertDialogDescription></AlertDialogHeader><AlertDialogFooter><AlertDialogCancel>Keep practicing</AlertDialogCancel><AlertDialogAction onClick={() => router.push("/")}>Leave session</AlertDialogAction></AlertDialogFooter></AlertDialogContent>
          </AlertDialog>
          <div className="min-w-0 flex-1"><div className="mb-2 flex items-center justify-between gap-3"><span className="truncate text-sm font-medium">{label}</span><span className="shrink-0 text-sm text-muted-foreground">{index + 1} of {total}</span></div><Progress value={(index / total) * 100} aria-label={`Question ${index + 1} of ${total}`} /></div>
        </div>
      </header>

      <div className="mx-auto flex max-w-4xl flex-col items-center px-4 py-6 sm:px-6 sm:py-10">
        <div className="mb-4 flex w-full max-w-2xl items-center justify-between"><Badge variant="secondary">{practiceType === "sentences" ? "Read aloud" : "Read the word"}</Badge><span className="text-xs text-muted-foreground">Space to reveal</span></div>
        <Card className="w-full max-w-2xl overflow-hidden shadow-md">
          {!isSentence(item) && <div className="flex aspect-[16/8] items-center justify-center overflow-hidden bg-muted sm:aspect-[16/7]">{item.image_url ? <div className="relative size-full"><Image src={item.image_url} alt={item.meaning} fill sizes="(max-width: 672px) 100vw, 672px" className="object-cover" /></div> : <span className="font-serif text-7xl text-muted-foreground/40">{practiceType === "hiragana" ? "あ" : "ア"}</span>}</div>}
          <CardContent className="flex min-h-80 flex-col justify-center p-6 text-center sm:p-10">
            <p className="text-sm font-medium text-muted-foreground">{isSentence(item) ? "Read this sentence" : "How do you read this?"}</p>
            <p lang="ja" className={isSentence(item) ? "mt-5 text-balance font-serif text-3xl font-semibold leading-relaxed sm:text-4xl" : "mt-5 font-serif text-5xl font-semibold tracking-wider sm:text-6xl"}>{isSentence(item) ? item.hiragana : item.japanese}</p>
            {revealed ? (
              <div className="mt-8 flex flex-col gap-4 animate-fade-in">
                {isSentence(item) && <div className="rounded-xl bg-secondary/60 p-4"><p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Natural Japanese</p><p lang="ja" className="mt-2 font-serif text-xl sm:text-2xl">{item.japanese}</p></div>}
                <div><p className="text-lg font-medium text-primary">{item.romaji}</p><p className="mt-2 text-base leading-relaxed text-muted-foreground">{isSentence(item) ? item.english : item.meaning}</p></div>
              </div>
            ) : <Button size="lg" className="mt-10 h-12 w-full" onClick={() => setRevealed(true)}><Eye data-icon="inline-start" />Reveal answer</Button>}
          </CardContent>
          {revealed && <CardFooter className="grid grid-cols-2 gap-3 border-t border-border bg-muted/30 p-4 sm:p-6"><Button variant="outline" size="lg" className="h-12" onClick={() => handleAnswer(false)}><XIcon data-icon="inline-start" />Needs work</Button><Button size="lg" className="h-12" onClick={() => handleAnswer(true)}><Check data-icon="inline-start" />Got it</Button></CardFooter>}
        </Card>
        <Button variant="ghost" className="mt-5" onClick={() => router.push("/")}><ArrowLeft data-icon="inline-start" />Return to dashboard</Button>
      </div>
    </main>
  );
}

function ResultStat({ value, label, bordered = false }: { value: string; label: string; bordered?: boolean }) {
  return <div className={bordered ? "border-x border-border p-5 text-center" : "p-5 text-center"}><p className="text-2xl font-semibold">{value}</p><p className="mt-1 text-xs text-muted-foreground">{label}</p></div>;
}
