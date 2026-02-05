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
      <video
        ref={videoRef}
        src="/wait.mp4"
        muted
        loop
        playsInline
        preload="auto"
        className="w-full h-full object-cover pointer-events-none"
        tabIndex={-1}
      />
    </div>
  );
}
