"use client";
import { useCallback, useRef } from "react";

interface ClickSparkProps {
  children: React.ReactNode;
  className?: string;
  sparkColor?: string;
  sparkSize?: number;
  sparkRadius?: number;
  duration?: number;
}

export default function ClickSpark({
  children,
  className = "",
  sparkColor = "#e8789a",
  sparkSize = 10,
  sparkRadius = 15,
  duration = 400,
}: ClickSparkProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const createSpark = useCallback(
    (x: number, y: number) => {
      const container = containerRef.current;
      if (!container) return;

      const spark = document.createElement("span");
      spark.style.cssText = `
        position: absolute;
        left: ${x}px;
        top: ${y}px;
        width: ${sparkSize}px;
        height: ${sparkSize}px;
        border-radius: 50%;
        background: ${sparkColor};
        pointer-events: none;
        transform: translate(-50%, -50%) scale(0);
        animation: spark-pop ${duration}ms ease-out forwards;
      `;

      container.appendChild(spark);

      // Create sparks around the click point
      for (let i = 0; i < 6; i++) {
        const angle = (i / 6) * Math.PI * 2;
        const dist = sparkRadius + Math.random() * 10;
        const offsetX = Math.cos(angle) * dist;
        const offsetY = Math.sin(angle) * dist;
        const dot = document.createElement("span");
        dot.style.cssText = `
          position: absolute;
          left: ${x + offsetX}px;
          top: ${y + offsetY}px;
          width: ${sparkSize * 0.5}px;
          height: ${sparkSize * 0.5}px;
          border-radius: 50%;
          background: ${sparkColor};
          pointer-events: none;
          transform: translate(-50%, -50%) scale(0);
          animation: spark-pop ${duration}ms ease-out ${duration * 0.1}ms forwards;
          opacity: 0.7;
        `;
        container.appendChild(dot);
      }

      setTimeout(() => {
        spark.remove();
        container.querySelectorAll("span").forEach((s) => s.remove());
      }, duration);
    },
    [sparkColor, sparkSize, sparkRadius, duration],
  );

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    createSpark(x, y);
  };

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      onClick={handleClick}
    >
      {children}
    </div>
  );
}
