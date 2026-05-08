"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

gsap.registerPlugin(ScrollTrigger);

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  once?: boolean;
}

export const TextReveal = ({ text, className, delay = 0, once = true }: TextRevealProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const words = el.querySelectorAll(".word-reveal");
    
    gsap.fromTo(
      words,
      {
        y: "100%",
        rotateX: -45,
        opacity: 0,
      },
      {
        y: "0%",
        rotateX: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.05,
        delay: delay,
        ease: "power4.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: once ? "play none none none" : "play reverse play reverse",
        },
      }
    );
  }, [delay, once]);

  return (
    <div ref={containerRef} className={cn("overflow-hidden flex flex-wrap", className)}>
      {text.split(" ").map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.4em] py-[0.1em]">
          <span className="word-reveal inline-block translate-y-full">
            {word}
          </span>
        </span>
      ))}
    </div>
  );
};

