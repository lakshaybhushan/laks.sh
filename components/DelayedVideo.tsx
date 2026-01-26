"use client";

import { useEffect, useRef, useState } from "react";

export function DelayedVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      videoRef.current?.play();
      setIsPlaying(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative md:w-1/2 md:h-1/2 w-full h-full">
      <img
        src="/wait-poster.jpg"
        alt=""
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-out ${
          isPlaying ? "opacity-0" : "opacity-100"
        }`}
      />
      <video
        ref={videoRef}
        src="/wait.mp4"
        muted
        loop
        playsInline
        preload="auto"
        className={`w-full h-full object-cover pointer-events-none transition-opacity duration-700 ease-out ${
          isPlaying ? "opacity-100" : "opacity-0"
        }`}
        tabIndex={-1}
      />
    </div>
  );
}
