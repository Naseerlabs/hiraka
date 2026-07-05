"use client";

interface GradientTextProps {
  text: string;
  className?: string;
  colors?: string[];
  animationSpeed?: number;
}

export default function GradientText({
  text,
  className = "",
  colors = ["#1a2744", "#e8789a", "#1a2744"],
  animationSpeed = 3,
}: GradientTextProps) {
  return (
    <span
      className={`inline-block bg-[length:200%_auto] bg-clip-text text-transparent ${className}`}
      style={{
        backgroundImage: `linear-gradient(to right, ${colors.join(", ")})`,
        backgroundClip: "text",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        animation: `gradient-shift ${animationSpeed}s linear infinite`,
      }}
    >
      {text}
    </span>
  );
}
