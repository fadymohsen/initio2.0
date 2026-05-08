"use client";

import { motion } from "framer-motion";
import { SparklesCore } from "@/components/ui/sparkles";
import { VerticalCutReveal } from "@/components/ui/vertical-cut-reveal";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const MOTION_EASE = [0.76, 0, 0.24, 1] as const;

const processSteps = [
  {
    number: "01",
    title: "Discover",
    description:
      "We start by deeply understanding your vision, objectives, audience, and competitive landscape. Through in-depth research, stakeholder interviews, and brand audits, we uncover the insights that will shape every decision.",
    details: ["Stakeholder Interviews", "Brand & Market Audit", "Competitor Analysis", "Audience Research", "Goal Definition"],
  },
  {
    number: "02",
    title: "Strategize",
    description:
      "With insights in hand, we develop a creative concept and execution plan tailored precisely to your goals. Strategy without creativity is forgettable; creativity without strategy is chaos. We bring both.",
    details: ["Creative Brief", "Brand Positioning", "Content Strategy", "Channel Planning", "Project Roadmap"],
  },
  {
    number: "03",
    title: "Create",
    description:
      "This is where ideas become tangible. Our team of creatives and producers bring the concept to life with precision and artistic mastery, exploring, iterating, and refining until every element is perfect.",
    details: ["Concept Development", "Visual Design", "Copywriting", "Prototyping", "Design Iteration"],
  },
  {
    number: "04",
    title: "Execute",
    description:
      "Flawless on-ground execution, full logistics management, and real-time monitoring from start to finish. We manage every vendor, timeline, and moving part with military precision and creative flair.",
    details: ["Production Management", "Vendor Coordination", "On-site Direction", "Quality Assurance", "Real-time Monitoring"],
  },
  {
    number: "05",
    title: "Measure & Evolve",
    description:
      "Going live is just the beginning. We measure impact, gather feedback, and deliver comprehensive post-project analysis, fueling continuous improvement and ensuring lasting results.",
    details: ["Impact Analytics", "Post-event Reports", "Client Debrief", "Performance Optimization", "Long-term Strategy"],
  },
];

const highlights = [
  {
    title: "Transparent Communication",
    description:
      "You're never left guessing. We keep you in the loop at every stage with regular updates, clear timelines, and open feedback channels.",
  },
  {
    title: "Iterative Refinement",
    description:
      "Good isn't good enough. We refine, test, and polish until every element meets our exacting standards and exceeds your expectations.",
  },
  {
    title: "Results-Driven",
    description:
      "Beautiful design is meaningless without impact. Every decision we make is rooted in strategy and aimed at delivering measurable results.",
  },
];

export default function ProcessPage() {
  return (
    <div className="relative text-[#D4D4D4] isolate">
      {/* ── GLOBAL SPARKLES ── */}
      <div className="fixed inset-0 w-full h-full pointer-events-none z-[-1] bg-[#010F24]">
        <SparklesCore
          id="tsparticles-process"
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
            Our Process
          </p>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white leading-[1.05]" style={{ marginBottom: '30px' }}>
            How We Bring
            <br />
            <span className="italic text-[#71B8E3]">Ideas to Life</span>
          </h1>
          <div className="max-w-[52ch] text-center font-sans text-base md:text-lg font-light leading-relaxed text-[#D4D4D4]/80">
            <VerticalCutReveal
              splitBy="words"
              staggerDuration={0.04}
              staggerFrom="first"
              transition={{ type: "spring", stiffness: 200, damping: 24, delay: 0.6 }}
              containerClassName="justify-center"
            >
              A proven creative process that transforms raw concepts into polished, impactful work, every single time.
            </VerticalCutReveal>
          </div>
        </motion.div>
      </section>

      {/* ── TIMELINE ── */}
      <section className="w-full border-t border-white/5 flex justify-center" style={{ paddingTop: '100px', paddingBottom: '100px' }}>
        <div className="w-full max-w-4xl" style={{ paddingLeft: '32px', paddingRight: '32px' }}>
          <div className="relative">
            {/* Vertical connecting line */}
            <div className="absolute left-[27px] md:left-[35px] top-0 bottom-0 w-px bg-gradient-to-b from-[#71B8E3]/40 via-[#71B8E3]/20 to-transparent" />

            <div className="flex flex-col" style={{ gap: '80px' }}>
              {processSteps.map((step, i) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.7, delay: 0.1, ease: MOTION_EASE }}
                  className="flex gap-4 md:gap-12 relative"
                >
                  {/* Step marker */}
                  <div className="shrink-0 flex flex-col items-center relative z-10">
                    <div className="w-14 h-14 md:w-[70px] md:h-[70px] rounded-full border border-[#71B8E3]/40 bg-[#010F24] flex items-center justify-center">
                      <span className="font-serif text-lg md:text-xl text-[#71B8E3]">{step.number}</span>
                    </div>
                  </div>

                  {/* Step content */}
                  <div className="flex-1" style={{ paddingTop: '8px' }}>
                    <h3 className="font-serif text-3xl md:text-4xl text-white" style={{ marginBottom: '16px' }}>
                      {step.title}
                    </h3>
                    <p className="font-sans text-[#D4D4D4]/70 text-base md:text-[17px] leading-relaxed" style={{ marginBottom: '24px' }}>
                      {step.description}
                    </p>
                    <div className="flex flex-wrap" style={{ gap: '10px' }}>
                      {step.details.map((detail) => (
                        <span
                          key={detail}
                          className="px-4 py-2 border border-white/10 rounded-full font-sans text-xs tracking-wider text-[#D4D4D4]/60 hover:border-[#71B8E3]/30 hover:text-[#71B8E3] transition-all duration-300"
                        >
                          {detail}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY IT WORKS ── */}
      <section className="w-full border-t border-white/5 flex justify-center" style={{ paddingTop: '120px', paddingBottom: '120px' }}>
        <div className="w-full max-w-6xl" style={{ paddingLeft: '32px', paddingRight: '32px' }}>
          <div className="flex flex-col items-center text-center" style={{ marginBottom: '60px' }}>
            <p className="font-sans text-[11px] uppercase tracking-[0.4em] text-[#71B8E3]/80" style={{ marginBottom: '12px' }}>
              Why It Works
            </p>
            <h2 className="font-serif text-4xl md:text-6xl text-white">
              Built for Excellence
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {highlights.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15, ease: MOTION_EASE }}
                className="relative border border-white/5 rounded-lg group hover:border-[#71B8E3]/20 transition-all duration-500"
                style={{ padding: '40px 30px' }}
              >
                <div className="absolute top-0 left-[30px] w-12 h-[3px] bg-[#71B8E3]/60 rounded-b" />
                <h4 className="font-serif text-xl text-white" style={{ marginBottom: '16px' }}>
                  {item.title}
                </h4>
                <p className="font-sans text-sm text-[#D4D4D4]/60 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
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
              Start Your Project
            </p>
            <h2 className="font-serif text-4xl md:text-6xl text-white" style={{ marginBottom: '20px' }}>
              Let&apos;s build something remarkable
            </h2>
            <p className="font-sans text-[#D4D4D4]/70 max-w-lg leading-relaxed" style={{ marginBottom: '40px' }}>
              Ready to see our process in action? Tell us about your project and let&apos;s bring your vision to life.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#71B8E3] text-[#010F24] font-sans text-xs tracking-[0.2em] uppercase hover:bg-white transition-colors duration-300"
              style={{ padding: '10px 15px' }}
            >
              Start a Project <ArrowUpRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
