"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextReveal } from "@/components/TextReveal";

gsap.registerPlugin(ScrollTrigger);

export const BrandOverview = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax for floating images
      gsap.to(".parallax-item", {
        y: (i, target) => -100 * parseFloat(target.dataset.speed || "1"),
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        }
      });

      // Background color transition
      gsap.to(containerRef.current, {
        backgroundColor: "#021533", // Slightly lighter than Cetacean Blue
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 50%",
          end: "bottom 50%",
          scrub: true,
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen w-full py-32 px-4 md:px-20 bg-primary"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        
        {/* Left Column - Large Text */}
        <div className="md:col-span-7 space-y-12">
          <TextReveal 
            text="A FOUNDATION OF DISTINCTION."
            className="text-6xl md:text-8xl font-heading text-light leading-[1.1]"
          />
          <p className="text-clamp-body text-neutral max-w-lg leading-relaxed font-body">
            initio is a fully integrated experience and production partner with one purpose: to plan, build, and deliver every detail of an experience so our clients can focus on the moment itself.
          </p>
          
          <div className="flex gap-12 pt-8">
            <div className="space-y-2">
              <span className="text-accent font-heading text-4xl block">01</span>
              <span className="text-xs uppercase tracking-[0.2em] text-neutral">Heritage</span>
            </div>
            <div className="space-y-2">
              <span className="text-accent font-heading text-4xl block">02</span>
              <span className="text-xs uppercase tracking-[0.2em] text-neutral">Clarity</span>
            </div>
            <div className="space-y-2">
              <span className="text-accent font-heading text-4xl block">03</span>
              <span className="text-xs uppercase tracking-[0.2em] text-neutral">Elegance</span>
            </div>
          </div>
        </div>

        {/* Right Column - Asymmetric Grid of Images */}
        <div className="md:col-span-5 relative h-[600px] flex items-center justify-center">
          <div 
            className="parallax-item absolute top-0 right-0 w-72 h-96 bg-secondary/10 rounded-2xl overflow-hidden shadow-2xl border border-white/5"
            data-speed="1.2"
          >
             <img 
               src="/initio_heritage_architecture_1777202121601.png" 
               alt="Initio Heritage" 
               className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
             />
          </div>
          
          <div 
            className="parallax-item absolute bottom-0 left-0 w-64 h-80 bg-accent/10 rounded-2xl overflow-hidden shadow-2xl border border-white/5"
            data-speed="0.8"
          >
            <img 
               src="/initio_clarity_abstract_1777202138542.png" 
               alt="Initio Clarity" 
               className="w-full h-full object-cover"
             />
          </div>

          <div 
            className="parallax-item absolute top-1/2 left-1/4 w-32 h-32 bg-accent/20 rounded-full blur-[80px] opacity-30"
            data-speed="1.5"
          />
        </div>


      </div>
    </section>
  );
};
