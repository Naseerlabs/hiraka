"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import type { Word } from "@/types/database";

const PROGRESS_TOTAL = 20;

export default function PracticeClient({
  words,
  scriptType,
}: {
  words: Word[];
  scriptType: "hiragana" | "katakana";
}) {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [revealedIds, setRevealedIds] = useState<Set<number>>(new Set());
  const [completed, setCompleted] = useState(false);

  const word = words[index];
  const isLast = index >= PROGRESS_TOTAL - 1;

  const handleReveal = useCallback(() => {
    setRevealed(true);
    setRevealedIds((prev) => new Set(prev).add(word.id));
  }, [word.id]);

  const handleNext = useCallback(() => {
    if (isLast) {
      setCompleted(true);
    } else {
      setIndex((i) => i + 1);
      setRevealed(false);
    }
  }, [isLast]);

  if (completed || !word) {
    return (
      <main className="min-h-screen flex items-center justify-center p-6">
        <div className="text-center max-w-md">
          <h2 className="text-3xl font-bold mb-4">Session Complete!</h2>
          <p className="text-zinc-500 mb-2">
            You practiced {PROGRESS_TOTAL} {scriptType} words
          </p>
          <p className="text-zinc-400 mb-8">
            Revealed: {revealedIds.size} / {PROGRESS_TOTAL}
          </p>
          <button
            onClick={() => router.push("/")}
            className="bg-zinc-900 text-white px-8 py-3 rounded-xl font-medium hover:bg-zinc-800 transition-colors"
          >
            Back to Home
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6">
      {/* Progress bar */}
      <div className="w-full max-w-md mb-8">
        <div className="flex gap-1">
          {Array.from({ length: PROGRESS_TOTAL }).map((_, i) => (
            <div
              key={i}
              className={`h-2 flex-1 rounded-full transition-colors ${
                i < index
                  ? revealedIds.has(words[i]?.id ?? 0)
                    ? "bg-zinc-900"
                    : "bg-zinc-300"
                  : i === index
                    ? "bg-zinc-900"
                    : "bg-zinc-200"
              }`}
            />
          ))}
        </div>
        <p className="text-right text-sm text-zinc-400 mt-1">
          {index + 1} / {PROGRESS_TOTAL}
        </p>
      </div>

      {/* Card */}
      <div className="bg-white border border-zinc-200 rounded-3xl w-full max-w-md overflow-hidden shadow-sm">
        {/* Image */}
        <div className="aspect-[4/3] bg-zinc-100 flex items-center justify-center overflow-hidden">
          {word.image_url ? (
            <img
              src={word.image_url}
              alt={word.meaning}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-7xl">{scriptType === "hiragana" ? "あ" : "ア"}</span>
          )}
        </div>

        {/* Kana text */}
        <div className="p-6">
          <p className="text-center text-4xl tracking-wider mb-6">
            {word.japanese}
          </p>

          {/* Reveal button / Romaji */}
          {revealed ? (
            <div className="text-center animate-fade-in">
              <div className="bg-zinc-50 rounded-xl p-4 mb-4">
                <p className="text-xl font-medium text-zinc-800">{word.romaji}</p>
                <p className="text-sm text-zinc-400 mt-1">{word.meaning}</p>
              </div>
            </div>
          ) : (
            <button
              onClick={handleReveal}
              className="w-full py-3 px-6 bg-zinc-900 text-white rounded-xl font-medium hover:bg-zinc-800 transition-colors"
            >
              Reveal Answer
            </button>
          )}

          {/* Next button */}
          {revealed && (
            <button
              onClick={handleNext}
              className="w-full py-3 px-6 mt-3 border-2 border-zinc-200 text-zinc-700 rounded-xl font-medium hover:bg-zinc-50 transition-colors"
            >
              {isLast ? "See Results" : "Next Word"}
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
