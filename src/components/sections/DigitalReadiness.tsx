"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const DigitalReadiness = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scoreRef = useRef<HTMLSpanElement>(null);
  const rankRef = useRef<HTMLSpanElement>(null);
  const pointsRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const animateNumber = (ref: React.RefObject<HTMLSpanElement | null>, value: number) => {
        if (!ref.current) return;
        gsap.to(ref.current, {
          innerText: value,
          duration: 2,
          snap: { innerText: 1 },
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          }
        });
      };

      animateNumber(scoreRef, 94);
      animateNumber(rankRef, 1);
      animateNumber(pointsRef, 4);

      // Glow pulse animation
      gsap.to(".metric-glow", {
        opacity: 0.6,
        scale: 1.2,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen w-full py-32 px-4 md:px-20 bg-[#010c1f]"
    >
      <div className="max-w-5xl mx-auto">
        <div className="mb-20 text-center">
          <h2 className="text-5xl md:text-7xl font-heading text-light mb-6">Digital Readiness 2025</h2>
          <div className="h-[1px] w-24 bg-accent mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Metric 1 */}
          <div className="relative group p-12 bg-primary/50 border border-neutral/10 rounded-2xl overflow-hidden backdrop-blur-sm">
            <div className="metric-glow absolute inset-0 bg-accent/5 blur-[100px] opacity-20 pointer-events-none" />
            <div className="relative z-10 text-center">
              <p className="text-xs uppercase tracking-[0.3em] text-neutral mb-8">Overall Score</p>
              <div className="flex items-center justify-center gap-2">
                <span ref={scoreRef} className="text-8xl md:text-9xl font-heading text-light">0</span>
              </div>
              <div className="mt-8 h-1 w-full bg-neutral/10 overflow-hidden">
                <div className="h-full bg-accent w-[94%]" />
              </div>
            </div>
          </div>

          {/* Metric 2 */}
          <div className="relative group p-12 bg-primary/50 border border-neutral/10 rounded-2xl overflow-hidden backdrop-blur-sm">
            <div className="metric-glow absolute inset-0 bg-secondary/5 blur-[100px] opacity-20 pointer-events-none" />
            <div className="relative z-10 text-center">
              <p className="text-xs uppercase tracking-[0.3em] text-neutral mb-8">Global Rank</p>
              <div className="flex items-center justify-center gap-2">
                <span className="text-4xl md:text-5xl font-heading text-accent mb-12">#</span>
                <span ref={rankRef} className="text-8xl md:text-9xl font-heading text-light">0</span>
              </div>
              <p className="text-sm font-body text-accent/80">Leader in Segment</p>
            </div>
          </div>

          {/* Metric 3 */}
          <div className="relative group p-12 bg-primary/50 border border-neutral/10 rounded-2xl overflow-hidden backdrop-blur-sm">
            <div className="metric-glow absolute inset-0 bg-accent/5 blur-[100px] opacity-20 pointer-events-none" />
            <div className="relative z-10 text-center">
              <p className="text-xs uppercase tracking-[0.3em] text-neutral mb-8">Points Increase</p>
              <div className="flex items-center justify-center gap-2">
                <span className="text-4xl md:text-5xl font-heading text-secondary mb-12">+</span>
                <span ref={pointsRef} className="text-8xl md:text-9xl font-heading text-light">0</span>
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/10 rounded-full border border-secondary/20">
                <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                <span className="text-[10px] uppercase tracking-widest text-secondary">Accelerating</span>
              </div>
            </div>
          </div>

        </div>

        <div className="mt-20 p-8 border border-neutral/10 rounded-xl bg-primary/30 flex flex-col md:flex-row items-center justify-between gap-8">
           <div className="space-y-2">
              <h4 className="text-xl font-heading text-light">Strategic Evolution</h4>
              <p className="text-sm text-neutral font-body">Data visualization powered by Initio Intelligence.</p>
           </div>
           <button className="px-8 py-4 bg-light text-primary font-body text-xs uppercase tracking-widest hover:bg-accent transition-colors duration-500">
              Download Report
           </button>
        </div>
      </div>
    </section>
  );
};
