import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import AuthButton from "@/components/auth-button";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Hiraka — Hiragana & Katakana Reading Practice",
  description: "Learn to read Japanese hiragana and katakana with image-based practice sessions",
  icons: {
    icon: "/favicon.svg",
  },
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  display: "swap",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.className} antialiased bg-zinc-50 text-zinc-900`}>
        <header className="absolute top-0 right-0 p-4 z-10">
          <AuthButton />
        </header>
        {children}
      </body>
    </html>
  );
}
