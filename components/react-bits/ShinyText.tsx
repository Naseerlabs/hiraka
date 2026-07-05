"use client";

interface ShinyTextProps {
  text: string;
  className?: string;
  disabled?: boolean;
  speed?: number;
}

export default function ShinyText({
  text,
  className = "",
  disabled = false,
  speed = 3,
}: ShinyTextProps) {
  return (
    <span
      className={`inline-block bg-[length:250%_100%] bg-clip-text text-transparent ${
        disabled ? "" : "animate-shine"
      } ${className}`}
      style={{
        backgroundImage:
          "linear-gradient(120deg, #1a2744 30%, #e8789a 50%, #1a2744 70%)",
        backgroundClip: "text",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        animationDuration: `${speed}s`,
      }}
    >
      {text}
    </span>
  );
}
