'use client';

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SparklesCore } from "@/components/ui/sparkles";
import { VerticalCutReveal } from "@/components/ui/vertical-cut-reveal";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Project } from "@/lib/data-service";

const MOTION_EASE = [0.76, 0, 0.24, 1] as const;
const categories = ["All", "Events", "Branding", "Marketing"];

export const PortfolioContent = ({ initialProjects }: { initialProjects: Project[] }) => {
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered =
    activeFilter === "All"
      ? initialProjects
      : initialProjects.filter((item) => item.category === activeFilter);

  return (
    <div className="relative text-[#D4D4D4] isolate">
      {/* ── GLOBAL SPARKLES ── */}
      <div className="fixed inset-0 w-full h-full pointer-events-none z-[-1] bg-[#010F24]">
        <SparklesCore
          id="tsparticles-portfolio"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={50}
          className="w-full h-full"
          particleColor="#71B8E3"
          speed={1}
        />
      </div>

      {/* ── HERO ── */}
      <section className="relative min-h-[80vh] w-full flex flex-col items-center justify-center overflow-hidden" style={{ paddingTop: '160px', paddingBottom: '120px', paddingLeft: '32px', paddingRight: '32px' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: MOTION_EASE }}
          className="flex flex-col items-center text-center max-w-4xl mx-auto"
        >
          <p className="font-sans text-[11px] uppercase tracking-[0.5em] text-[#71B8E3] font-medium" style={{ marginBottom: '20px' }}>
            Portfolio
          </p>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white leading-[1.05]" style={{ marginBottom: '30px' }}>
            Work That
            <br />
            <span className="text-[#71B8E3]">Speaks Volumes</span>
          </h1>
          <div className="max-w-[52ch] text-center font-sans text-base md:text-lg font-light leading-relaxed text-[#D4D4D4]/80">
            <VerticalCutReveal
              splitBy="words"
              staggerDuration={0.04}
              staggerFrom="first"
              transition={{ type: "spring", stiffness: 200, damping: 24, delay: 0.6 }}
              containerClassName="justify-center"
            >
              A curated selection of projects that showcase our creative range, from intimate private events to large-scale brand activations.
            </VerticalCutReveal>
          </div>
        </motion.div>
      </section>

      {/* ── FILTER + GRID ── */}
      <section className="w-full border-t border-white/5 flex justify-center" style={{ paddingTop: '80px', paddingBottom: '120px' }}>
        <div className="w-full max-w-6xl" style={{ paddingLeft: '32px', paddingRight: '32px' }}>
          {/* Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: MOTION_EASE }}
            className="flex flex-wrap justify-center"
            style={{ marginBottom: '60px', gap: '32px' }}
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`font-sans text-xs tracking-[0.2em] uppercase transition-colors duration-300 ${
                  activeFilter === cat
                    ? "text-[#71B8E3]"
                    : "text-[#D4D4D4]/50 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AnimatePresence mode="popLayout">
              {filtered.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, ease: MOTION_EASE }}
                  className="group relative overflow-hidden rounded-xl cursor-pointer"
                >
                  <Link href={`/portfolio/${item.slug}`} className="block">
                    <div className="aspect-[4/3] relative overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#010F24] via-[#010F24]/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                      {/* Content */}
                      <div className="absolute inset-0 flex flex-col justify-end" style={{ padding: '28px' }}>
                        <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-[#71B8E3]" style={{ marginBottom: '8px' }}>
                          {item.category}
                        </p>
                        <h3 className="font-serif text-2xl md:text-3xl text-white" style={{ marginBottom: '8px' }}>
                          {item.title}
                        </h3>
                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          <p className="font-sans text-sm text-[#D4D4D4]/70 leading-relaxed max-w-sm">
                            {item.description}
                          </p>
                        </div>
                        <div className="flex items-center gap-1 mt-3 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                          <span className="font-sans text-xs uppercase tracking-[0.2em] text-[#71B8E3]">View Project</span>
                          <ArrowUpRight size={14} className="text-[#71B8E3]" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="w-full border-t border-white/5 flex justify-center" style={{ paddingTop: '120px', paddingBottom: '120px' }}>
        <div className="w-full max-w-3xl text-center" style={{ paddingLeft: '32px', paddingRight: '32px' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: MOTION_EASE }}
            className="flex flex-col items-center"
          >
            <p className="font-sans text-[11px] uppercase tracking-[0.4em] text-[#71B8E3]/80" style={{ marginBottom: '16px' }}>
              Inspired?
            </p>
            <h2 className="font-serif text-4xl md:text-6xl text-white" style={{ marginBottom: '20px' }}>
              Have a project in mind?
            </h2>
            <p className="font-sans text-[#D4D4D4]/70 max-w-lg leading-relaxed" style={{ marginBottom: '40px' }}>
              We&apos;d love to hear about it. Let&apos;s create something extraordinary together.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#71B8E3] text-[#010F24] font-sans text-xs tracking-[0.2em] uppercase hover:bg-white transition-colors duration-300"
              style={{ padding: '10px 15px' }}
            >
              Say Hello <ArrowUpRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
