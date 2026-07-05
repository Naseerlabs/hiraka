"use client";
import { useEffect, useRef, useState } from "react";

interface FadeContentProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  once?: boolean;
  direction?: "up" | "down" | "left" | "right" | "none";
}

export default function FadeContent({
  children,
  className = "",
  delay = 0,
  duration = 600,
  once = true,
  direction = "up",
}: FadeContentProps) {
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

  const directionClasses = {
    up: isVisible ? "translate-y-0" : "translate-y-6",
    down: isVisible ? "translate-y-0" : "-translate-y-6",
    left: isVisible ? "translate-x-0" : "translate-x-6",
    right: isVisible ? "translate-x-0" : "-translate-x-6",
    none: "",
  };

  return (
    <div
      ref={ref}
      className={`transition-all ${directionClasses[direction]} ${
        isVisible ? "opacity-100" : "opacity-0"
      } ${className}`}
      style={{ transitionDuration: `${duration}ms`, transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
