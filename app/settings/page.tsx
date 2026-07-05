"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";
import FadeContent from "@/components/react-bits/FadeContent";
import ClickSpark from "@/components/react-bits/ClickSpark";
import Silk from "@/components/react-bits/Silk";

type SettingsSection = "accounts" | "notifications" | "appearance" | "privacy" | "help" | "about";

const sections: { id: SettingsSection; label: string; icon: string }[] = [
  { id: "accounts", label: "Accounts", icon: "👤" },
  { id: "notifications", label: "Notifications", icon: "🔔" },
  { id: "appearance", label: "Appearance", icon: "🎨" },
  { id: "privacy", label: "Privacy & Security", icon: "🔒" },
  { id: "help", label: "Help", icon: "❓" },
  { id: "about", label: "About", icon: "ℹ️" },
];

function AccountsSection({ user, onSignOut }: { user: User; onSignOut: () => void }) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Account Information</h3>
        <div className="glass rounded-xl p-4 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-zinc-500">Email</span>
            <span className="text-sm font-medium">{user.email}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-zinc-500">User ID</span>
            <span className="text-sm font-mono text-zinc-400">{user.id.slice(0, 8)}...</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-zinc-500">Last Sign In</span>
            <span className="text-sm text-zinc-600">
              {new Date(user.last_sign_in_at || user.created_at).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Sign Out</h3>
        <ClickSpark>
          <button
            onClick={onSignOut}
            className="w-full py-3 px-4 bg-red-50 text-red-600 rounded-xl font-medium hover:bg-red-100 transition-colors"
          >
            Sign Out
          </button>
        </ClickSpark>
      </div>
    </div>
  );
}

function NotificationsSection() {
  const [settings, setSettings] = useState({
    practiceReminders: true,
    emailNotifications: false,
    weeklyProgress: true,
  });

  const toggle = (key: keyof typeof settings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Notification Preferences</h3>
      <div className="space-y-3">
        {Object.entries(settings).map(([key, value]) => (
          <div key={key} className="glass rounded-xl p-4 flex justify-between items-center">
            <span className="text-sm capitalize">{key.replace(/([A-Z])/g, " $1")}</span>
            <button
              onClick={() => toggle(key as keyof typeof settings)}
              className={`w-12 h-6 rounded-full transition-colors ${
                value ? "bg-rose-400" : "bg-zinc-300"
              }`}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full transition-transform ${
                  value ? "translate-x-6" : "translate-x-0.5"
                }`}
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function AppearanceSection() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Appearance</h3>

      <div>
        <h4 className="text-sm font-medium mb-3">Theme</h4>
        <div className="grid grid-cols-2 gap-3">
          {(["light", "dark"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTheme(t)}
              className={`p-4 rounded-xl border-2 transition-all ${
                theme === t
                  ? "border-rose-400 bg-rose-50"
                  : "border-zinc-200 hover:border-zinc-300"
              }`}
            >
              <div className={`w-full h-16 rounded-lg mb-2 ${
                t === "light" ? "bg-white border border-zinc-200" : "bg-zinc-800"
              }`} />
              <span className="text-sm capitalize">{t}</span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">Accent Color</h4>
        <div className="flex gap-3">
          {["#e8789a", "#3b82f6", "#10b981", "#f59e0b", "#8b5cf6"].map((color) => (
            <button
              key={color}
              className="w-10 h-10 rounded-full border-2 border-transparent hover:scale-110 transition-transform"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function PrivacySection() {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Privacy & Security</h3>

      <div className="space-y-3">
        <a
          href="/privacy"
          className="glass rounded-xl p-4 flex justify-between items-center hover:bg-zinc-50 transition-colors"
        >
          <span className="text-sm">Privacy Policy</span>
          <span className="text-zinc-400">→</span>
        </a>
        <a
          href="/terms"
          className="glass rounded-xl p-4 flex justify-between items-center hover:bg-zinc-50 transition-colors"
        >
          <span className="text-sm">Terms of Service</span>
          <span className="text-zinc-400">→</span>
        </a>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">Data</h4>
        <div className="glass rounded-xl p-4 space-y-3">
          <p className="text-sm text-zinc-500">
            Your practice data is stored securely in Supabase. We never share your data with third parties.
          </p>
        </div>
      </div>
    </div>
  );
}

function HelpSection() {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Help</h3>

      <div className="space-y-3">
        <div className="glass rounded-xl p-4">
          <h4 className="text-sm font-medium mb-2">How to Practice</h4>
          <ol className="text-sm text-zinc-500 space-y-1 list-decimal list-inside">
            <li>Select Hiragana or Katakana from the home page</li>
            <li>Look at the image and try to read the Japanese text</li>
            <li>Click &quot;Reveal Answer&quot; to check your reading</li>
            <li>Click &quot;Next Word&quot; to continue</li>
          </ol>
        </div>

        <div className="glass rounded-xl p-4">
          <h4 className="text-sm font-medium mb-2">Keyboard Shortcuts</h4>
          <div className="text-sm text-zinc-500 space-y-1">
            <p><kbd className="px-2 py-0.5 bg-zinc-100 rounded text-xs">Space</kbd> Reveal answer</p>
            <p><kbd className="px-2 py-0.5 bg-zinc-100 rounded text-xs">Enter</kbd> Next word</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function AboutSection() {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">About</h3>

      <div className="glass rounded-xl p-4 space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm text-zinc-500">App Name</span>
          <span className="text-sm font-medium">Hiraka</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-zinc-500">Version</span>
          <span className="text-sm font-mono">1.0.0</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-zinc-500">Built With</span>
          <span className="text-sm">Next.js + Supabase</span>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">Credits</h4>
        <div className="glass rounded-xl p-4 text-sm text-zinc-500 space-y-1">
          <p>Images from <a href="https://pexels.com" className="text-rose-500 hover:underline" target="_blank" rel="noopener noreferrer">Pexels</a></p>
          <p>Components from <a href="https://reactbits.dev" className="text-rose-500 hover:underline" target="_blank" rel="noopener noreferrer">React Bits</a></p>
        </div>
      </div>
    </div>
  );
}

export default function SettingsPage() {
  const supabase = createClient();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [activeSection, setActiveSection] = useState<SettingsSection>("accounts");

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) {
        router.push("/auth");
        return;
      }
      setUser(data.user);
    });
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  if (!user) return null;

  const renderSection = () => {
    switch (activeSection) {
      case "accounts":
        return <AccountsSection user={user} onSignOut={handleSignOut} />;
      case "notifications":
        return <NotificationsSection />;
      case "appearance":
        return <AppearanceSection />;
      case "privacy":
        return <PrivacySection />;
      case "help":
        return <HelpSection />;
      case "about":
        return <AboutSection />;
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden">
      <Silk className="opacity-10" speed={0.1} color="#e8789a" />

      <div className="relative z-10 max-w-4xl mx-auto p-6">
        <FadeContent direction="up">
          <div className="mb-8">
            <button
              onClick={() => router.push("/")}
              className="text-sm text-zinc-400 hover:text-rose-500 transition-colors mb-4"
            >
              ← Back to Home
            </button>
            <h1 className="text-3xl font-bold">Settings</h1>
          </div>
        </FadeContent>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <FadeContent delay={100} direction="left" className="md:w-64 shrink-0">
            <nav className="glass rounded-xl p-2">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors flex items-center gap-3 ${
                    activeSection === section.id
                      ? "bg-rose-50 text-rose-600"
                      : "text-zinc-600 hover:bg-zinc-50"
                  }`}
                >
                  <span>{section.icon}</span>
                  {section.label}
                </button>
              ))}
            </nav>
          </FadeContent>

          {/* Content */}
          <FadeContent delay={200} direction="up" className="flex-1">
            {renderSection()}
          </FadeContent>
        </div>
      </div>
    </main>
  );
}
