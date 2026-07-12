"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpenText, Home, Languages } from "lucide-react";
import AuthButton from "@/components/auth-button";
import { cn } from "@/lib/utils";

const navigation = [
  { href: "/", label: "Learn", icon: Home },
  { href: "/practice/hiragana", label: "Words", icon: Languages },
  { href: "/?mode=sentences#sentence-setup", label: "Sentences", icon: BookOpenText },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isPractice = pathname.startsWith("/practice/");
  const isAuth = pathname.startsWith("/auth");

  if (isPractice || isAuth) return <>{children}</>;

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border/80 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/85">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-3" aria-label="Hiraka home">
            <span className="flex size-9 items-center justify-center rounded-xl bg-primary font-serif text-lg font-semibold text-primary-foreground">あ</span>
            <span className="text-lg font-semibold tracking-tight">Hiraka</span>
          </Link>
          <nav className="hidden items-center gap-1 md:flex" aria-label="Primary navigation">
            {navigation.map((item) => {
              const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href.split("?")[0]);
              return (
                <Link key={item.label} href={item.href} className={cn("rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground", active && "bg-muted text-foreground")}>
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <AuthButton />
        </div>
      </header>
      {children}
      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 px-3 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2 backdrop-blur md:hidden" aria-label="Mobile navigation">
        <div className="mx-auto flex max-w-md items-center justify-around">
          {navigation.map((item) => {
            const Icon = item.icon;
            const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href.split("?")[0]);
            return (
              <Link key={item.label} href={item.href} className={cn("flex min-h-12 min-w-20 flex-col items-center justify-center gap-1 rounded-lg text-xs font-medium text-muted-foreground", active && "bg-muted text-primary")}>
                <Icon className="size-5" aria-hidden="true" />
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
