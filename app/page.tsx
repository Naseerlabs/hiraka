"use client";

import { useRouter } from "next/navigation";
import ShinyText from "@/components/react-bits/ShinyText";
import SplitText from "@/components/react-bits/SplitText";
import FadeContent from "@/components/react-bits/FadeContent";
import ClickSpark from "@/components/react-bits/ClickSpark";
import Silk from "@/components/react-bits/Silk";

function Logo() {
  return (
    <svg viewBox="0 0 200 200" className="w-32 h-32 mx-auto mb-6 animate-float" xmlns="http://www.w3.org/2000/svg">
      <circle cx="100" cy="100" r="90" fill="none" stroke="#1a2744" strokeWidth="5" strokeDasharray="283 283" strokeDashoffset="0" strokeLinecap="round" />
      <circle cx="100" cy="100" r="90" fill="none" stroke="#e8789a" strokeWidth="5" strokeDasharray="0 283" strokeDashoffset="-141" strokeLinecap="round" />
      <path d="M100 10 A90 90 0 0 1 190 100" fill="none" stroke="#1a2744" strokeWidth="6" strokeLinecap="round" opacity="0.9" />
      <path d="M190 100 A90 90 0 0 1 100 190" fill="none" stroke="#e8789a" strokeWidth="6" strokeLinecap="round" opacity="0.9" />
      <text x="62" y="115" fontSize="52" fontFamily="serif" fontWeight="bold" fill="#1a2744" textAnchor="middle">あ</text>
      <line x1="100" y1="75" x2="100" y2="135" stroke="#1a2744" strokeWidth="1.5" opacity="0.4" />
      <circle cx="100" cy="105" r="2.5" fill="#e8789a" />
      <text x="138" y="115" fontSize="52" fontFamily="serif" fontWeight="bold" fill="#e8789a" textAnchor="middle">ア</text>
      <g transform="translate(155, 45) scale(0.5)">
        <circle cx="0" cy="-12" r="8" fill="#e8789a" opacity="0.85" />
        <circle cx="11" cy="-4" r="8" fill="#e8789a" opacity="0.85" />
        <circle cx="7" cy="9" r="8" fill="#e8789a" opacity="0.85" />
        <circle cx="-7" cy="9" r="8" fill="#e8789a" opacity="0.85" />
        <circle cx="-11" cy="-4" r="8" fill="#e8789a" opacity="0.85" />
        <circle cx="0" cy="0" r="4" fill="#fff" />
      </g>
      <ellipse cx="175" cy="70" rx="4" ry="6" fill="#e8789a" opacity="0.5" transform="rotate(30 175 70)" />
      <ellipse cx="180" cy="85" rx="3" ry="5" fill="#e8789a" opacity="0.35" transform="rotate(-15 180 85)" />
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
    <main className="relative min-h-screen flex flex-col items-center justify-center p-6 overflow-hidden">
      <Silk className="opacity-30" speed={0.2} color="#e8789a" />

      <div className="relative z-10 text-center mb-12">
        <FadeContent delay={0} direction="up">
          <Logo />
        </FadeContent>

        <FadeContent delay={200} direction="up">
          <h1 className="text-5xl font-bold tracking-tight mb-3">
            <ShinyText text="Hiraka" speed={4} />
          </h1>
        </FadeContent>

        <FadeContent delay={400} direction="up">
          <p className="text-lg text-zinc-500">
            <SplitText text="Hiragana & Katakana Reading Practice" stagger={20} />
          </p>
        </FadeContent>
      </div>

      <div className="relative z-10 flex flex-col sm:flex-row gap-6 w-full max-w-lg">
        <FadeContent delay={600} direction="left">
          <ClickSpark className="flex-1">
            <button
              onClick={() => router.push("/practice/hiragana")}
              className="w-full group cursor-pointer"
            >
              <div className="glass rounded-2xl p-8 text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-2 hover:border-rose-300">
                <span className="text-6xl block mb-4 transition-transform duration-300 group-hover:scale-110">あ</span>
                <h2 className="text-2xl font-semibold mb-1">Hiragana</h2>
                <p className="text-sm text-zinc-400">Native Japanese words</p>
              </div>
            </button>
          </ClickSpark>
        </FadeContent>

        <FadeContent delay={800} direction="right">
          <ClickSpark className="flex-1">
            <button
              onClick={() => router.push("/practice/katakana")}
              className="w-full group cursor-pointer"
            >
              <div className="glass rounded-2xl p-8 text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-2 hover:border-sky-300">
                <span className="text-6xl block mb-4 transition-transform duration-300 group-hover:scale-110">ア</span>
                <h2 className="text-2xl font-semibold mb-1">Katakana</h2>
                <p className="text-sm text-zinc-400">Foreign loan words</p>
              </div>
            </button>
          </ClickSpark>
        </FadeContent>
      </div>

      <FadeContent delay={1000} direction="up">
        <button
          onClick={() => router.push("/settings")}
          className="relative z-10 mt-8 text-sm text-zinc-400 hover:text-rose-500 transition-colors"
        >
          Settings
        </button>
      </FadeContent>
    </main>
  );
}
