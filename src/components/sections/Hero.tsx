"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { TextReveal } from "@/components/TextReveal";
import { motion } from "framer-motion";
import { SparklesCore } from "@/components/ui/sparkles";
import Image from "next/image";


export const Hero = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".hero-overlay", {
        opacity: 0.4,
        duration: 2,
        ease: "power2.inOut",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-primary"
    >
      {/* Background Video */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        src="/videos/Initio Hero - V.1.7.mp4"
        className="absolute inset-0 w-full h-full object-cover scale-105"
      />

      {/* Bottom Fade Gradient */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-primary via-primary/80 to-transparent z-[1] pointer-events-none" />

      {/* Overlay */}
      <div className="hero-overlay absolute inset-0 bg-primary opacity-40 transition-opacity duration-[3s]" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 w-full flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.5, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="relative w-full max-w-4xl mx-auto mb-4">
            <Image
              src="/hero.png"
              alt="Initio Hero"
              width={1200}
              height={400}
              priority
              className="w-full h-auto object-contain"
            />
          </div>
        </motion.div>
        
        <div className="w-[40rem] h-40 relative">
          {/* Gradients */}
          <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-accent to-transparent h-[2px] w-3/4 blur-sm" />
          <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-accent to-transparent h-px w-3/4" />
          <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-secondary to-transparent h-[5px] w-1/4 blur-sm" />
          <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-secondary to-transparent h-px w-1/4" />

          {/* Core component */}
          <SparklesCore
            background="transparent"
            minSize={0.4}
            maxSize={1}
            particleDensity={1200}
            className="w-full h-full"
            particleColor="#71b8e3"
          />

          {/* Radial Gradient to prevent sharp edges */}
          <div className="absolute inset-0 w-full h-full bg-primary [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
        </div>

        <TextReveal 
          text="A FOUNDATION OF DISTINCTION" 
          className="text-clamp-subheading font-body text-accent justify-center font-light tracking-[0.2em] mt-[-60px]"
          delay={1}
        />
      </div>


      {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center">
        <motion.div
          animate={{
            rotate: 360
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear"
          }}
          className="relative w-24 h-24 flex items-center justify-center"
        >
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <path
              id="circlePath"
              d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
              fill="none"
            />
            <text className="fill-neutral/60 text-[10px] font-body uppercase tracking-[0.1em]">
              <textPath xlinkHref="#circlePath">
                SCROLL TO EXPLORE • DISTINCTION • CLARITY • ELEGANCE • 
              </textPath>
            </text>
          </svg>
        </motion.div>
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="mt-[-40px] text-accent"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
          </svg>
        </motion.div>
      </div>
    </section>
  );
};
