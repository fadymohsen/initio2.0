"use client";

import { useRef } from "react";
import { motion } from "framer-motion";

export const VideoIntro = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    const section = sectionRef.current;
    if (!section) return;
    const next = section.nextElementSibling as HTMLElement | null;
    if (next) {
      next.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative h-[100svh] w-full flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        src="/videos/intro.mp4"
        className="absolute inset-0 w-full h-full object-cover opacity-40"
      />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60 pointer-events-none" />

      {/* Scroll down button */}
      <button
        onClick={handleScroll}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3 group cursor-pointer"
        aria-label="Scroll down"
      >
        <span className="font-sans text-[10px] uppercase tracking-[0.4em] text-white/60 group-hover:text-white/90 transition-colors duration-300">
          Discover
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="w-10 h-10 rounded-full border border-white/30 group-hover:border-white/60 flex items-center justify-center transition-colors duration-300"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-white/70 group-hover:text-white transition-colors duration-300"
          >
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
        </motion.div>
      </button>
    </section>
  );
};
