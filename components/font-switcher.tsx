"use client";

import { useState, useEffect } from "react";
import { motion, useReducedMotion } from "motion/react";
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

  useEffect(() => {
    setFontIndex(getSavedIndex());
  }, []);

  const cycleFont = () => {
    setFontIndex((prev) => {
      const next = (prev + 1) % FONTS.length;
      localStorage.setItem(STORAGE_KEY, String(next));
      return next;
    });
  };

  const skip = !!shouldReduceMotion;

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
        whileHover={{ opacity: 0.6 }}
        transition={{
          duration: skip ? 0 : 0.3,
          ease: [0.25, 0.1, 0.25, 1],
          delay: skip ? 0 : 0.15,
        }}
        onClick={cycleFont}
        className="cursor-pointer w-fit select-none opacity-0"
        aria-label={`Current font: ${FONTS[fontIndex].name}. Click to switch.`}
      >
        <Image
          src={FONTS[fontIndex].icon}
          alt={FONTS[fontIndex].name}
          width={14}
          height={14}
          className="dark:invert"
        />
      </motion.button>
      <div className="mt-8">
        {children}
      </div>
    </motion.main>
  );
}
