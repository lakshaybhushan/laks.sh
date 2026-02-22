"use client";

import { useState, useEffect } from "react";
import { useReducedMotion } from "motion/react";

export function Typewriter({
  text,
  speed = 30,
  delay = 400,
  className,
}: {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
}) {
  const [count, setCount] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) {
      setCount(text.length);
      return;
    }

    let interval: ReturnType<typeof setInterval>;

    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        setCount((prev) => {
          if (prev >= text.length) {
            clearInterval(interval);
            return prev;
          }
          return prev + 1;
        });
      }, speed);
    }, delay);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [text, speed, delay, shouldReduceMotion]);

  return (
    <p className={className}>
      {text.slice(0, count)}
      <span className="inline-block w-1 h-4 bg-black dark:bg-white align-middle -translate-y-[0.1em] animate-blink" />
    </p>
  );
}
