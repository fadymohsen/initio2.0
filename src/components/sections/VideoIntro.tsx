"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const VideoIntro = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [showMain, setShowMain] = useState(false);

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
      {/* Pre-intro video */}
      <AnimatePresence>
        {!showMain && (
          <motion.video
            key="preintro"
            autoPlay
            muted
            playsInline
            src="/videos/preintro.mp4"
            onEnded={() => setShowMain(true)}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
      </AnimatePresence>

      {/* Main intro video */}
      <motion.video
        autoPlay={showMain}
        muted
        loop
        playsInline
        src="/videos/intro.mp4"
        initial={{ opacity: 0 }}
        animate={{ opacity: showMain ? 0.4 : 0 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-transparent pointer-events-none" />
      {/* Bottom fade into primary */}
      <div className="absolute inset-x-0 bottom-0 h-[40%] bg-gradient-to-t from-[#010F24] via-[#010F24]/80 to-transparent pointer-events-none" />

      {/* Text + CTA */}
      <AnimatePresence>
        {showMain && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.76, 0, 0.24, 1] }}
            className="relative z-10 flex flex-col items-center text-center px-6"
          >
            <p
              className="font-sans text-white/80 uppercase tracking-[0.3em] font-light"
              style={{ fontSize: "clamp(0.75rem, 1.2vw, 0.95rem)" }}
            >
              A Foundation of Distinction
            </p>
            <motion.a
              href="/contact"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5, ease: [0.76, 0, 0.24, 1] }}
              className="mt-8 inline-flex items-center gap-3 px-8 py-3 border border-white/30 text-white font-sans text-[11px] uppercase tracking-[0.4em] hover:bg-white/10 transition-all duration-300"
              style={{ borderRadius: "9999px" }}
            >
              Start a Project
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">&#8594;</span>
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll down button */}
      <AnimatePresence>
        {showMain && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
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
          </motion.button>
        )}
      </AnimatePresence>
    </section>
  );
};
