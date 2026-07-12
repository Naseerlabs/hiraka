"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { User } from "@supabase/supabase-js";
import { ArrowRight, BookOpenText, CircleHelp, Languages, LogOut, ShieldCheck, UserRound } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export default function SettingsPage() {
  const supabase = useMemo(() => {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY) return null;
    return createClient();
  }, []);
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) { router.replace("/auth?redirect=/settings"); return; }
      setUser(data.user);
      setLoading(false);
    });
  }, [router, supabase]);

  if (loading) {
    return <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6"><div className="flex flex-col gap-4"><Skeleton className="h-10 w-48" /><Skeleton className="h-48 w-full" /><Skeleton className="h-56 w-full" /></div></main>;
  }

  if (!user) {
    return <main className="mx-auto max-w-2xl px-4 py-16 text-center sm:px-6"><h1 className="text-3xl font-semibold">Sign in to view settings</h1><p className="mt-3 text-muted-foreground">Your account controls will appear here after you sign in.</p><Button className="mt-6" onClick={() => router.push("/auth?redirect=/settings")}>Go to sign in</Button></main>;
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-10 pb-28 sm:px-6 md:pb-12">
      <div className="mb-8"><p className="text-sm font-semibold uppercase tracking-wider text-primary">Your space</p><h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Settings</h1><p className="mt-2 text-muted-foreground">Manage your account and learn how Hiraka works.</p></div>

      <div className="flex flex-col gap-6">
        <Card id="account">
          <CardHeader><div className="flex items-start gap-4"><div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-secondary text-primary"><UserRound className="size-6" /></div><div><CardTitle>Account</CardTitle><CardDescription className="mt-1">Your sign-in information stays private and appears only here.</CardDescription></div></div></CardHeader>
          <CardContent><dl className="flex flex-col gap-4 rounded-xl bg-muted/50 p-4"><div className="flex flex-col justify-between gap-1 sm:flex-row"><dt className="text-sm text-muted-foreground">Email address</dt><dd className="break-all text-sm font-medium">{user.email}</dd></div><Separator /><div className="flex flex-col justify-between gap-1 sm:flex-row"><dt className="text-sm text-muted-foreground">Member since</dt><dd className="text-sm font-medium">{new Date(user.created_at).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })}</dd></div></dl></CardContent>
          <CardFooter><Button variant="outline" onClick={async () => { await supabase?.auth.signOut(); router.push("/"); router.refresh(); }}><LogOut data-icon="inline-start" />Sign out</Button></CardFooter>
        </Card>

        <div className="grid gap-6 md:grid-cols-2">
          <Card><CardHeader><Languages className="mb-2 size-6 text-primary" /><CardTitle>Practice preferences</CardTitle><CardDescription>Choose the topic, level, and session length each time you begin. Nothing is locked in.</CardDescription></CardHeader><CardFooter><Button asChild variant="outline"><Link href="/?mode=sentences#sentence-setup">Set up sentences<ArrowRight data-icon="inline-end" /></Link></Button></CardFooter></Card>
          <Card><CardHeader><ShieldCheck className="mb-2 size-6 text-primary" /><CardTitle>Privacy & security</CardTitle><CardDescription>Learn how your account and learning activity are handled.</CardDescription></CardHeader><CardContent className="flex flex-col gap-2"><Link className="flex items-center justify-between rounded-lg px-3 py-2 text-sm hover:bg-muted" href="/privacy">Privacy policy<ArrowRight className="size-4" /></Link><Link className="flex items-center justify-between rounded-lg px-3 py-2 text-sm hover:bg-muted" href="/terms">Terms of service<ArrowRight className="size-4" /></Link></CardContent></Card>
        </div>

        <Card><CardHeader><div className="flex items-start gap-4"><div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary"><CircleHelp className="size-6" /></div><div><CardTitle>How practice works</CardTitle><CardDescription className="mt-1">A simple routine designed to strengthen active reading.</CardDescription></div></div></CardHeader><CardContent><ol className="grid gap-4 sm:grid-cols-3"><Step number="1" title="Read" copy="Say the kana or sentence aloud before revealing anything." /><Step number="2" title="Reveal" copy="Compare with romaji, meaning, and natural Japanese." /><Step number="3" title="Reflect" copy="Mark whether you got it, then review your result." /></ol></CardContent></Card>

        <Card className="border-primary/20 bg-secondary/45"><CardHeader><BookOpenText className="mb-2 size-6 text-primary" /><CardTitle>About Hiraka</CardTitle><CardDescription className="leading-relaxed">Hiraka is a focused Japanese reading companion with hiragana, katakana, and 500 practical daily-use sentences. Word imagery is provided through Pexels where available.</CardDescription></CardHeader></Card>
      </div>
    </main>
  );
}

function Step({ number, title, copy }: { number: string; title: string; copy: string }) {
  return <li className="flex gap-3"><span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">{number}</span><div><h3 className="font-medium">{title}</h3><p className="mt-1 text-sm leading-relaxed text-muted-foreground">{copy}</p></div></li>;
}
