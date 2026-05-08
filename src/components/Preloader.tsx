"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";

export const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCounter((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 1;
      });
    }, 20);

    if (counter === 100) {
      setTimeout(() => {
        onComplete();
      }, 500);
    }

    return () => clearInterval(timer);
  }, [counter, onComplete]);



  return (
    <motion.div
      initial={{ y: 0 }}
      exit={{ y: "-100%" }}
      transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[10000] bg-primary flex flex-col items-center justify-center"
    >
      <div className="flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-light font-heading text-8xl md:text-[12rem] leading-none mb-4"
        >
          {counter}%
        </motion.div>
        <div className="w-48 h-[1px] bg-neutral/30 relative overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 h-full bg-accent"
            initial={{ width: 0 }}
            animate={{ width: `${counter}%` }}
          />
        </div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 font-body text-xs uppercase tracking-[0.3em] text-neutral"
        >
          Initializing Distinction
        </motion.p>
      </div>
    </motion.div>
  );
};
