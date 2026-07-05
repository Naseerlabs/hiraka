"use client";
import { useEffect, useRef, useState } from "react";

interface BlurTextProps {
  text: string;
  delay?: number;
  className?: string;
  animateBy?: "words" | "characters";
  direction?: "top" | "bottom";
  once?: boolean;
}

export default function BlurText({
  text,
  delay = 0,
  className = "",
  animateBy = "words",
  direction = "top",
  once = true,
}: BlurTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.unobserve(el);
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [once]);

  const items = animateBy === "characters" ? text.split("") : text.split(" ");

  return (
    <div ref={ref} className={`flex flex-wrap ${className}`}>
      {items.map((item, i) => (
        <span
          key={i}
          className={`inline-block transition-all duration-500 ${
            isVisible ? "blur-0 opacity-100" : "blur-md opacity-0"
          } ${direction === "top" ? "translate-y-4" : "-translate-y-4"}`}
          style={{ transitionDelay: `${delay + i * 50}ms` }}
        >
          {item}
          {animateBy === "words" && i < items.length - 1 && "\u00A0"}
        </span>
      ))}
    </div>
  );
}
