"use client";

import { useRouter } from "next/navigation";

function Logo() {
  return (
    <svg viewBox="0 0 200 200" className="w-32 h-32 mx-auto mb-6" xmlns="http://www.w3.org/2000/svg">
      {/* Circular brush stroke — dark navy left, pink right */}
      <circle cx="100" cy="100" r="90" fill="none" stroke="#1a2744" strokeWidth="5" strokeDasharray="283 283" strokeDashoffset="0" strokeLinecap="round" />
      <circle cx="100" cy="100" r="90" fill="none" stroke="#e8789a" strokeWidth="5" strokeDasharray="0 283" strokeDashoffset="-141" strokeLinecap="round" />
      {/* Brush stroke texture — dark navy arc */}
      <path d="M100 10 A90 90 0 0 1 190 100" fill="none" stroke="#1a2744" strokeWidth="6" strokeLinecap="round" opacity="0.9" />
      {/* Brush stroke texture — pink arc */}
      <path d="M190 100 A90 90 0 0 1 100 190" fill="none" stroke="#e8789a" strokeWidth="6" strokeLinecap="round" opacity="0.9" />

      {/* あ — hiragana "a" in dark navy */}
      <text x="62" y="115" fontSize="52" fontFamily="serif" fontWeight="bold" fill="#1a2744" textAnchor="middle">あ</text>

      {/* Vertical divider */}
      <line x1="100" y1="75" x2="100" y2="135" stroke="#1a2744" strokeWidth="1.5" opacity="0.4" />
      <circle cx="100" cy="105" r="2.5" fill="#e8789a" />

      {/* ア — katakana "a" in pink */}
      <text x="138" y="115" fontSize="52" fontFamily="serif" fontWeight="bold" fill="#e8789a" textAnchor="middle">ア</text>

      {/* Cherry blossom */}
      <g transform="translate(155, 45) scale(0.5)">
        <circle cx="0" cy="-12" r="8" fill="#e8789a" opacity="0.85" />
        <circle cx="11" cy="-4" r="8" fill="#e8789a" opacity="0.85" />
        <circle cx="7" cy="9" r="8" fill="#e8789a" opacity="0.85" />
        <circle cx="-7" cy="9" r="8" fill="#e8789a" opacity="0.85" />
        <circle cx="-11" cy="-4" r="8" fill="#e8789a" opacity="0.85" />
        <circle cx="0" cy="0" r="4" fill="#fff" />
      </g>

      {/* Falling petals */}
      <ellipse cx="175" cy="70" rx="4" ry="6" fill="#e8789a" opacity="0.5" transform="rotate(30 175 70)" />
      <ellipse cx="180" cy="85" rx="3" ry="5" fill="#e8789a" opacity="0.35" transform="rotate(-15 180 85)" />

      {/* Open book at bottom */}
      <g transform="translate(100, 155)">
        <path d="M-30 0 Q-15 -12 0 -8 Q15 -12 30 0" fill="none" stroke="#1a2744" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M-30 0 Q-15 8 0 4 Q15 8 30 0" fill="none" stroke="#e8789a" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="0" y1="-8" x2="0" y2="4" stroke="#1a2744" strokeWidth="1.5" opacity="0.3" />
      </g>
    </svg>
  );
}

export default function Home() {
  const router = useRouter();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="text-center mb-12">
        <Logo />
        <h1 className="text-5xl font-bold tracking-tight mb-3">
          Hiraka
        </h1>
        <p className="text-lg text-zinc-500">
          Hiragana &amp; Katakana Reading Practice
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-6 w-full max-w-lg">
        <button
          onClick={() => router.push("/practice/hiragana")}
          className="flex-1 group cursor-pointer"
        >
          <div className="bg-white border-2 border-zinc-200 rounded-2xl p-8 text-center transition-all duration-200 hover:border-rose-300 hover:shadow-lg hover:-translate-y-1">
            <span className="text-6xl block mb-4">あ</span>
            <h2 className="text-2xl font-semibold mb-1">Hiragana</h2>
            <p className="text-sm text-zinc-400">Native Japanese words</p>
          </div>
        </button>

        <button
          onClick={() => router.push("/practice/katakana")}
          className="flex-1 group cursor-pointer"
        >
          <div className="bg-white border-2 border-zinc-200 rounded-2xl p-8 text-center transition-all duration-200 hover:border-sky-300 hover:shadow-lg hover:-translate-y-1">
            <span className="text-6xl block mb-4">ア</span>
            <h2 className="text-2xl font-semibold mb-1">Katakana</h2>
            <p className="text-sm text-zinc-400">Foreign loan words</p>
          </div>
        </button>
      </div>
    </main>
  );
}
