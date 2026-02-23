"use client";

import { useState, useEffect, useRef } from "react";
import {
  motion,
  useReducedMotion,
  useAnimate,
  AnimatePresence,
} from "motion/react";
import Image from "next/image";

const STORAGE_KEY = "font-preference";

const FONTS = [
  { name: "Square", variable: "var(--font-geist-pixel-square)", icon: "/icons/square.svg" },
  { name: "Grid", variable: "var(--font-geist-pixel-grid)", icon: "/icons/grid.svg" },
  { name: "Circle", variable: "var(--font-geist-pixel-circle)", icon: "/icons/circle.svg" },
  { name: "Triangle", variable: "var(--font-geist-pixel-triangle)", icon: "/icons/triangle.svg" },
  { name: "Line", variable: "var(--font-geist-pixel-line)", icon: "/icons/line.svg" },
];

function getSavedIndex(): number {
  if (typeof window === "undefined") return 0;
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === null) return 0;
  const idx = Number(saved);
  return idx >= 0 && idx < FONTS.length ? idx : 0;
}

export function FontSwitcher({
  children,
}: {
  children: React.ReactNode;
}) {
  const [fontIndex, setFontIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  const [contentScope, animateContent] = useAnimate();
  const transitioning = useRef(false);

  useEffect(() => {
    setFontIndex(getSavedIndex());
  }, []);

  const skip = !!shouldReduceMotion;

  const cycleFont = async () => {
    if (transitioning.current) return;

    const next = (fontIndex + 1) % FONTS.length;
    localStorage.setItem(STORAGE_KEY, String(next));

    if (skip) {
      setFontIndex(next);
      return;
    }

    transitioning.current = true;

    await animateContent(
      contentScope.current,
      { opacity: 0, filter: "blur(3px)" },
      { duration: 0.1, ease: [0.4, 0, 1, 1] }
    );

    setFontIndex(next);
    await new Promise((r) => requestAnimationFrame(r));

    await animateContent(
      contentScope.current,
      { opacity: 1, filter: "blur(0px)" },
      { duration: 0.15, ease: [0, 0, 0.2, 1] }
    );

    transitioning.current = false;
  };

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: skip ? 0 : 0.4, ease: [0.25, 0.1, 0.25, 1] }}
      className="flex min-h-screen flex-col md:py-16 py-8 max-w-xl mx-auto px-4 opacity-0"
      style={{ fontFamily: FONTS[fontIndex].variable }}
    >
      <motion.button
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: skip ? 0 : 0.3,
          ease: [0.25, 0.1, 0.25, 1],
          delay: skip ? 0 : 0.15,
        }}
        onClick={cycleFont}
        className="cursor-pointer w-fit select-none opacity-0"
        aria-label={`Current font: ${FONTS[fontIndex].name}. Click to switch.`}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={fontIndex}
            initial={{ opacity: 0, scale: 0.5, filter: "blur(2px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.5, filter: "blur(2px)" }}
            transition={{ duration: skip ? 0 : 0.12, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <Image
              src={FONTS[fontIndex].icon}
              alt={FONTS[fontIndex].name}
              width={14}
              height={14}
              className="dark:invert"
            />
          </motion.div>
        </AnimatePresence>
      </motion.button>
      <div ref={contentScope} className="mt-8">
        {children}
      </div>
    </motion.main>
  );
}
