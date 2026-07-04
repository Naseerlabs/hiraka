"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Suspense, useState } from "react";

function AuthForm() {
  const supabase = createClient();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleEmailSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const action = mode === "login" ? supabase.auth.signInWithPassword : supabase.auth.signUp;
    const { error } = await action({ email, password });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    if (mode === "signup") {
      setError("Check your email to confirm your account!");
      setLoading(false);
      return;
    }

    router.push(redirect);
    router.refresh();
  }

  async function handleGoogleSignIn() {
    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${location.origin}/auth/callback?redirect=${redirect}` },
    });
    if (error) setError(error.message);
    setLoading(false);
  }

  return (
    <div className="w-full max-w-sm">
      <form onSubmit={handleEmailSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-3 rounded-xl border border-zinc-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-rose-200"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
          className="w-full px-4 py-3 rounded-xl border border-zinc-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-rose-200"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-xl bg-rose-400 text-white font-medium text-sm hover:bg-rose-500 disabled:opacity-50 transition-colors"
        >
          {loading ? "Please wait..." : mode === "login" ? "Sign In" : "Sign Up"}
        </button>
      </form>

      <div className="my-6 flex items-center gap-3">
        <div className="flex-1 h-px bg-zinc-200" />
        <span className="text-xs text-zinc-400">or</span>
        <div className="flex-1 h-px bg-zinc-200" />
      </div>

      <button
        onClick={handleGoogleSignIn}
        disabled={loading}
        className="w-full py-3 rounded-xl border-2 border-zinc-200 bg-white text-sm font-medium hover:bg-zinc-50 disabled:opacity-50 transition-colors flex items-center justify-center gap-2"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
        </svg>
        Sign in with Google
      </button>

      <p className="mt-6 text-center text-sm text-zinc-500">
        {mode === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
        <button
          onClick={() => { setMode(mode === "login" ? "signup" : "login"); setError(null); }}
          className="text-rose-500 hover:underline font-medium"
        >
          {mode === "login" ? "Sign Up" : "Sign In"}
        </button>
      </p>

      {error && (
        <p className="mt-4 text-center text-sm text-rose-500">{error}</p>
      )}
    </div>
  );
}

export default function AuthPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold tracking-tight mb-2">Welcome to Hiraka</h1>
        <p className="text-zinc-500">Sign in to start practicing</p>
      </div>
      <Suspense>
        <AuthForm />
      </Suspense>
    </main>
  );
}
