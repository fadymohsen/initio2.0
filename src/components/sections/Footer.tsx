"use client";

import React from "react";
import { ArrowUpRight } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="relative w-full pt-32 pb-12 px-4 md:px-20 bg-primary border-t border-neutral/10 overflow-hidden">
      {/* Background Brand Mark */}
      <div className="absolute -bottom-10 left-0 w-full select-none pointer-events-none overflow-hidden">
        <h2 className="text-[25vw] font-heading text-neutral/5 leading-none translate-y-1/4">
          INITIO
        </h2>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 md:gap-8 mb-32">
          
          <div className="md:col-span-2 space-y-8">
            <h3 className="text-4xl font-heading text-light">INITIO</h3>
            <p className="text-neutral font-body max-w-xs text-sm leading-relaxed">
              Crafting a foundation of distinction in the digital landscape. Award-winning experiences for visionary brands.
            </p>
          </div>

          <div className="space-y-6">
            <h4 className="text-xs uppercase tracking-[0.3em] text-accent">Services</h4>
            <ul className="space-y-4 font-body text-sm text-neutral">
              <li><a href="#" className="hover:text-light transition-colors flex items-center gap-1">Digital Readiness <ArrowUpRight size={12}/></a></li>
              <li><a href="#" className="hover:text-light transition-colors flex items-center gap-1">Brand Architecture <ArrowUpRight size={12}/></a></li>
              <li><a href="#" className="hover:text-light transition-colors flex items-center gap-1">Immersive Design <ArrowUpRight size={12}/></a></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-xs uppercase tracking-[0.3em] text-accent">Connect</h4>
            <ul className="space-y-4 font-body text-sm text-neutral">
              <li><a href="#" className="hover:text-light transition-colors">LinkedIn</a></li>
              <li><a href="#" className="hover:text-light transition-colors">Instagram</a></li>
              <li><a href="#" className="hover:text-light transition-colors">X / Twitter</a></li>
            </ul>
          </div>

        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-12 border-t border-neutral/5 gap-8">
          <div className="flex gap-8 text-[10px] uppercase tracking-[0.2em] text-neutral/60">
            <span>© 2025 INITIO</span>
            <a href="#" className="hover:text-accent transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-accent transition-colors">Terms of Service</a>
          </div>
          
          <div className="font-body text-[12px] md:text-[14px] text-neutral">
            <p>Powered by <a href="https://www.veliq.co/" rel="follow" target="_blank" className="hover:text-accent transition-colors text-light">VELIQ</a></p>
          </div>
        </div>
      </div>
    </footer>
  );
};
