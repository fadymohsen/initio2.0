'use client'

import { useRef } from "react"
import { motion, useScroll, useTransform } from 'framer-motion'
import { VerticalCutReveal } from "@/components/ui/vertical-cut-reveal"
import { ServicePillar } from "@/lib/data-service"

interface Props {
  title?: string;
  subtitle?: string;
  pillars: ServicePillar[];
}

const ICONS: Record<string, React.ReactNode> = {
  "Event & Project Management": (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
      <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01" />
    </svg>
  ),
  "Technology & Equipment": (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" />
    </svg>
  ),
  "Branding & Identity": (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2z" />
    </svg>
  ),
  "Digital Production": (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="23 7 16 12 23 17 23 7" />
      <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
    </svg>
  ),
};

const fallbackIcon = (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 6v6l4 2" />
  </svg>
);

export const ParallaxScrollFeatureSection = ({ title = "Three Pillars of Impact", subtitle = "What We Do", pillars }: Props) => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "start 0.4"],
  });

  const containerOpacity = useTransform(scrollYProgress, [0, 0.4], [0, 1]);
  const containerY = useTransform(scrollYProgress, [0, 0.4], [60, 0]);

  return (
    <section
      className="w-full"
      style={{ paddingTop: '140px', paddingBottom: '120px' }}
    >
      <div
        className="w-full flex flex-col items-center justify-center"
        style={{ marginBottom: '60px', paddingLeft: '32px', paddingRight: '32px' }}
      >
        <p
          className="font-sans text-[11px] uppercase tracking-[0.4em] text-[#71B8E3]/80 text-center"
          style={{ marginBottom: '10px' }}
        >{subtitle}</p>
        <h2 className="text-4xl md:text-6xl max-w-2xl text-center font-serif text-white">{title}</h2>
      </div>

      <motion.div
        ref={containerRef}
        style={{ opacity: containerOpacity, y: containerY }}
        className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 px-6 md:px-10"
      >
        {pillars.map((pillar, index) => (
          <div
            key={pillar.id}
            className="group relative flex flex-col rounded-2xl border border-white/10 bg-[#010F24]/50 backdrop-blur-sm overflow-hidden transition-all duration-500 hover:border-[#71B8E3]/25 hover:bg-[#010F24]/70"
            style={{ padding: '40px 36px' }}
          >
            {/* Top row: icon + number */}
            <div className="flex items-start justify-between mb-8">
              <div className="w-14 h-14 rounded-xl bg-[#71B8E3]/10 border border-[#71B8E3]/20 flex items-center justify-center text-[#71B8E3] group-hover:bg-[#71B8E3]/20 transition-colors duration-500">
                {ICONS[pillar.title] || fallbackIcon}
              </div>
              <span className="font-serif text-[#71B8E3]/15 text-6xl font-normal leading-none select-none group-hover:text-[#71B8E3]/25 transition-colors duration-500">
                {String(index + 1).padStart(2, '0')}
              </span>
            </div>

            {/* Title */}
            <h3 className="text-2xl md:text-3xl text-white font-serif mb-4 leading-tight">
              {pillar.title}
            </h3>

            {/* Description */}
            <div className="text-[#D4D4D4]/70 font-sans leading-relaxed text-sm md:text-base mb-6 flex-grow">
              <VerticalCutReveal
                splitBy="words"
                staggerDuration={0.02}
                staggerFrom="first"
                triggerOnView
                transition={{ type: "spring", stiffness: 200, damping: 24 }}
              >
                {pillar.description}
              </VerticalCutReveal>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {pillar.list.split('•').map((item, i) => (
                <span
                  key={i}
                  className="inline-block px-3 py-1 text-[11px] font-sans uppercase tracking-[0.15em] text-[#71B8E3]/70 border border-[#71B8E3]/15 rounded-full bg-[#71B8E3]/5 group-hover:border-[#71B8E3]/30 transition-colors duration-500"
                >
                  {item.trim()}
                </span>
              ))}
            </div>

            {/* Bottom accent line */}
            <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-[#71B8E3] to-[#2D64AE] group-hover:w-full transition-all duration-700" />
          </div>
        ))}
      </motion.div>
    </section>
  );
};
