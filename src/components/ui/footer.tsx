"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { VerticalCutReveal } from "@/components/ui/vertical-cut-reveal";

export const Footer = () => {
  return (
    <footer className="relative bg-[#010F24] pt-16 md:pt-24 pb-8 border-t border-white/5 overflow-hidden w-full box-border" style={{ marginTop: '60px' }}>
      
      {/* Massive Watermark Logo - Absolute Positioned to prevent height stretching */}
      <div className="absolute bottom-0 left-0 w-full flex justify-center pointer-events-none z-0 overflow-hidden">
        <Image
          src="/hero.png"
          alt=""
          width={1600}
          height={400}
          className="w-[90vw] h-auto select-none translate-y-1/4 opacity-[0.05]"
          style={{ filter: "brightness(0) invert(1)" }}
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#010F24] via-transparent to-transparent pointer-events-none" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center" style={{ paddingLeft: '32px', paddingRight: '32px' }}>
        
        {/* Top Section */}
        <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-center gap-12 md:gap-16 mb-16 md:mb-20">
          <div className="max-w-md">
            <h3 className="font-serif text-3xl md:text-5xl text-white mb-4 leading-tight">
              Ready to create something extraordinary?
            </h3>
            <div className="font-sans text-[#D4D4D4]/80 leading-relaxed mb-8">
              <VerticalCutReveal
                splitBy="words"
                staggerDuration={0.03}
                staggerFrom="first"
                triggerOnView
                transition={{ type: "spring", stiffness: 200, damping: 24 }}
              >
                Let&apos;s craft an experience that defies expectations and defines your legacy.
              </VerticalCutReveal>
            </div>
            <Link 
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#71B8E3] text-[#010F24] font-sans text-xs tracking-[0.2em] uppercase hover:bg-white transition-colors duration-300"
              style={{ padding: '10px 15px', marginTop: '20px' }}
            >
              Start the Conversation <ArrowUpRight size={16} />
            </Link>
          </div>
          
          <div className="flex gap-16 md:gap-24 mt-8 md:mt-0">
            <div className="flex flex-col gap-4">
              <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-[#71B8E3] mb-2">Navigation</span>
              <Link href="/who-we-are" className="font-sans text-sm text-[#D4D4D4] hover:text-white transition-colors">About Us</Link>
              <Link href="/process" className="font-sans text-sm text-[#D4D4D4] hover:text-white transition-colors">Our Process</Link>
              {/* <Link href="/portfolio" className="font-sans text-sm text-[#D4D4D4] hover:text-white transition-colors">Portfolio</Link> */}
            </div>
            <div className="flex flex-col gap-4">
              <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-[#71B8E3] mb-2">Socials</span>
              <a href="https://www.instagram.com/initio.sa" target="_blank" rel="noopener noreferrer" className="font-sans text-sm text-[#D4D4D4] hover:text-white transition-colors inline-flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
                Instagram
              </a>
              <a href="https://www.linkedin.com/company/initio-sa" target="_blank" rel="noopener noreferrer" className="font-sans text-sm text-[#D4D4D4] hover:text-white transition-colors inline-flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>
                LinkedIn
              </a>
              <a href="https://www.facebook.com/initio.sa" target="_blank" rel="noopener noreferrer" className="font-sans text-sm text-[#D4D4D4] hover:text-white transition-colors inline-flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
                Facebook
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="w-full flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-white/5 relative z-10 pb-8 md:pb-0">
          <p className="font-sans text-xs text-[#D4D4D4]/50 text-center md:text-left order-3 md:order-1 md:mt-0" style={{ marginTop: '20px' }}>
            &copy; {new Date().getFullYear()} Initio Creative. All rights reserved.
          </p>
          <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-center order-1 md:order-2 md:mt-0" style={{ marginTop: '20px' }}>
            <a href="https://www.veliq.co/" rel="follow" target="_blank" className="font-sans text-xs font-bold text-[#71B8E3] hover:text-white transition-colors">
              Powered by VELIQ
            </a>
            <span className="text-[#D4D4D4]/20 hidden md:inline">|</span>
            <div className="flex gap-6 order-2 md:order-3 md:mt-0" style={{ marginTop: '16px' }}>
              <Link href="#" className="font-sans text-xs text-[#D4D4D4]/50 hover:text-white transition-colors">Privacy</Link>
              <Link href="#" className="font-sans text-xs text-[#D4D4D4]/50 hover:text-white transition-colors">Terms</Link>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};
