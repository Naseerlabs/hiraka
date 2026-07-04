"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";

export default function AuthButton() {
  const supabase = createClient();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) return null;

  if (!user) {
    return (
      <button
        onClick={() => router.push("/auth")}
        className="text-sm text-zinc-500 hover:text-rose-500 transition-colors"
      >
        Sign In
      </button>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-zinc-400 truncate max-w-[120px]">
        {user.email}
      </span>
      <button
        onClick={async () => {
          await supabase.auth.signOut();
          router.push("/");
          router.refresh();
        }}
        className="text-sm text-zinc-500 hover:text-rose-500 transition-colors"
      >
        Sign Out
      </button>
    </div>
  );
}
