import type { Metadata, Viewport } from "next";
import { Geist, Noto_Serif_JP } from "next/font/google";
import "./globals.css";
import { AppShell } from "@/components/app-shell";

const defaultUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: { default: "Hiraka — Japanese Reading Practice", template: "%s — Hiraka" },
  description: "Practice hiragana, katakana, and 500 useful daily Japanese sentences in focused beginner-friendly sessions.",
  icons: { icon: "/favicon.svg" },
};

export const viewport: Viewport = {
  themeColor: "#f9f7f1",
  width: "device-width",
  initialScale: 1,
  userScalable: true,
};

const geist = Geist({ variable: "--font-geist", display: "swap", subsets: ["latin"] });
const notoSerif = Noto_Serif_JP({ variable: "--font-noto-serif-jp", display: "swap", subsets: ["latin"] });

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="bg-background">
      <body className={`${geist.variable} ${notoSerif.variable} min-h-screen bg-background font-sans text-foreground antialiased`}>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
