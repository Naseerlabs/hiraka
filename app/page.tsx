"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { ArrowRight, BookOpenText, CheckCircle2, Clock3, Languages, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SENTENCE_TOPICS, type SentenceDifficulty, type SentenceTopic } from "@/data/japanese-sentences";

function Dashboard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [topic, setTopic] = useState<SentenceTopic>("greetings");
  const [level, setLevel] = useState<SentenceDifficulty>("easy");
  const [count, setCount] = useState("20");

  useEffect(() => {
    if (searchParams.get("mode") === "sentences") {
      document.getElementById("sentence-setup")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [searchParams]);

  const beginSentences = () => router.push(`/practice/sentences?topic=${topic}&level=${level}&count=${count}`);

  return (
    <main className="pb-28 md:pb-12">
      <section className="border-b border-border bg-secondary/55">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-12 sm:px-6 md:flex-row md:items-end md:justify-between md:py-16">
          <div className="max-w-2xl">
            <Badge variant="secondary" className="mb-4">Daily Japanese practice</Badge>
            <h1 className="text-balance font-serif text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">Read Japanese with confidence.</h1>
            <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">Build a steady reading habit with focused hiragana, katakana, and practical sentence sessions made for beginners.</p>
          </div>
          <div className="grid grid-cols-2 gap-3 md:w-72">
            <div className="rounded-2xl border border-border bg-background p-4">
              <Clock3 className="mb-3 size-5 text-primary" />
              <p className="text-2xl font-semibold">5 min</p>
              <p className="text-sm text-muted-foreground">daily practice</p>
            </div>
            <div className="rounded-2xl border border-border bg-background p-4">
              <CheckCircle2 className="mb-3 size-5 text-primary" />
              <p className="text-2xl font-semibold">500</p>
              <p className="text-sm text-muted-foreground">real sentences</p>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-4 py-10 sm:px-6">
        <section aria-labelledby="choose-mode">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-primary">Practice library</p>
              <h2 id="choose-mode" className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">Choose your focus</h2>
            </div>
            <p className="hidden text-sm text-muted-foreground sm:block">20 prompts per word session</p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            <ModeCard glyph="あ" title="Hiragana words" description="Practice native Japanese words with image clues and clear readings." label="Begin hiragana" onClick={() => router.push("/practice/hiragana")} />
            <ModeCard glyph="ア" title="Katakana words" description="Read common loanwords and get comfortable with angular katakana forms." label="Begin katakana" onClick={() => router.push("/practice/katakana")} />
            <ModeCard glyph="文" title="Daily sentences" description="Read useful everyday phrases in hiragana, then reveal natural Japanese." label="Set up session" onClick={() => document.getElementById("sentence-setup")?.scrollIntoView({ behavior: "smooth" })} featured />
          </div>
        </section>

        <section id="sentence-setup" className="scroll-mt-24" aria-labelledby="sentence-heading">
          <Card className="overflow-hidden border-primary/20 shadow-sm">
            <div className="grid lg:grid-cols-[1.15fr_0.85fr]">
              <CardHeader className="bg-primary p-6 text-primary-foreground sm:p-8 lg:p-10">
                <Badge className="w-fit bg-primary-foreground text-primary hover:bg-primary-foreground">New practice mode</Badge>
                <CardTitle id="sentence-heading" className="mt-6 text-balance font-serif text-3xl leading-tight sm:text-4xl">Japanese you can use every day.</CardTitle>
                <CardDescription className="mt-3 max-w-lg text-base leading-relaxed text-primary-foreground/80">Each card starts with a hiragana reading. Reveal the natural sentence, romaji, and English meaning when you are ready.</CardDescription>
                <div className="mt-8 flex flex-wrap gap-3 text-sm">
                  <span className="rounded-full bg-primary-foreground/10 px-3 py-1.5">10 daily topics</span>
                  <span className="rounded-full bg-primary-foreground/10 px-3 py-1.5">Easy + medium</span>
                  <span className="rounded-full bg-primary-foreground/10 px-3 py-1.5">500 sentences</span>
                </div>
              </CardHeader>
              <CardContent className="flex flex-col justify-center gap-6 p-6 sm:p-8 lg:p-10">
                <div className="flex flex-col gap-2">
                  <label htmlFor="topic" className="text-sm font-medium">Daily-life topic</label>
                  <Select value={topic} onValueChange={(value) => setTopic(value as SentenceTopic)}>
                    <SelectTrigger id="topic" className="h-11 w-full"><SelectValue /></SelectTrigger>
                    <SelectContent><SelectGroup><SelectLabel>Topics</SelectLabel>{SENTENCE_TOPICS.map((item) => <SelectItem key={item.id} value={item.id}>{item.label}</SelectItem>)}</SelectGroup></SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="level" className="text-sm font-medium">Level</label>
                    <Select value={level} onValueChange={(value) => setLevel(value as SentenceDifficulty)}><SelectTrigger id="level" className="h-11 w-full"><SelectValue /></SelectTrigger><SelectContent><SelectGroup><SelectItem value="easy">Easy</SelectItem><SelectItem value="medium">Medium</SelectItem></SelectGroup></SelectContent></Select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="count" className="text-sm font-medium">Session</label>
                    <Select value={count} onValueChange={setCount}><SelectTrigger id="count" className="h-11 w-full"><SelectValue /></SelectTrigger><SelectContent><SelectGroup><SelectItem value="10">10 cards</SelectItem><SelectItem value="20">20 cards</SelectItem><SelectItem value="30">30 cards</SelectItem></SelectGroup></SelectContent></Select>
                  </div>
                </div>
                <Button size="lg" className="h-12 w-full" onClick={beginSentences}>Start sentence practice<ArrowRight data-icon="inline-end" /></Button>
              </CardContent>
            </div>
          </Card>
        </section>

        <section className="grid gap-4 sm:grid-cols-3" aria-label="Learning benefits">
          <Benefit icon={Languages} title="Read first" copy="Kana stays prominent so you actively decode Japanese instead of guessing." />
          <Benefit icon={BookOpenText} title="Learn in context" copy="Daily situations make vocabulary and grammar easier to remember." />
          <Benefit icon={Sparkles} title="Stay focused" copy="Short sessions, clear progress, and simple choices keep practice calm." />
        </section>
      </div>
    </main>
  );
}

function ModeCard({ glyph, title, description, label, onClick, featured = false }: { glyph: string; title: string; description: string; label: string; onClick: () => void; featured?: boolean }) {
  return <Card className={featured ? "border-primary/30" : ""}><CardHeader><div className={featured ? "mb-2 flex size-12 items-center justify-center rounded-xl bg-primary font-serif text-2xl text-primary-foreground" : "mb-2 flex size-12 items-center justify-center rounded-xl bg-muted font-serif text-2xl"}>{glyph}</div><CardTitle className="text-xl">{title}</CardTitle><CardDescription className="min-h-12 leading-relaxed">{description}</CardDescription></CardHeader><CardFooter><Button variant={featured ? "default" : "outline"} className="w-full" onClick={onClick}>{label}<ArrowRight data-icon="inline-end" /></Button></CardFooter></Card>;
}

function Benefit({ icon: Icon, title, copy }: { icon: typeof Languages; title: string; copy: string }) {
  return <div className="flex gap-4 rounded-2xl border border-border bg-card p-5"><div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary"><Icon className="size-5" /></div><div><h3 className="font-semibold">{title}</h3><p className="mt-1 text-sm leading-relaxed text-muted-foreground">{copy}</p></div></div>;
}

export default function Home() {
  return <Suspense><Dashboard /></Suspense>;
}
