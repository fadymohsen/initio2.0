"use client";

import { motion } from "framer-motion";
import { SparklesCore } from "@/components/ui/sparkles";
import { VerticalCutReveal } from "@/components/ui/vertical-cut-reveal";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const MOTION_EASE = [0.76, 0, 0.24, 1] as const;

const stats = [
  { number: "50+", label: "Events Produced" },
  { number: "8+", label: "Years of Excellence" },
  { number: "30+", label: "Prestigious Clients" },
  { number: "15+", label: "Industry Awards" },
];

const values = [
  {
    title: "The client comes first, always.",
    description:
      "Every decision we make serves one outcome: making our client look, feel, and perform at their best.",
  },
  {
    title: "Precision behind the scenes.",
    description:
      "We obsess over the details so our clients never have to. Nothing is left to chance, and nothing is left unfinished.",
  },
  {
    title: "Quiet confidence.",
    description:
      "We don't compete for the spotlight, we build it. Our work is measured by how well our clients shine, not by how loudly we announce ourselves.",
  },
  {
    title: "One team, one standard.",
    description:
      "Strategy, creative, technology, and production move as one. No seams, no handoffs, no diluted vision.",
  },
  {
    title: "Craft in every detail.",
    description:
      "From a brand mark to a stage build, we hold every output to a standard of finish that speaks for itself.",
  },
];

const team = [
  {
    role: "Creative Direction",
    description: "Visionary leaders who set the artistic tone and ensure every project carries a distinctive, premium identity.",
  },
  {
    role: "Strategy & Planning",
    description: "Strategic minds who align every creative decision with your business goals, audience, and market positioning.",
  },
  {
    role: "Production & Execution",
    description: "Seasoned producers and coordinators who manage every detail, timeline, and vendor with absolute precision.",
  },
  {
    role: "Digital & Innovation",
    description: "Technologists and digital specialists who bring cutting-edge experiences and immersive technologies to every activation.",
  },
];

export default function WhoWeArePage() {
  return (
    <div className="relative text-[#D4D4D4] isolate">
      {/* ── GLOBAL SPARKLES ── */}
      <div className="fixed inset-0 w-full h-full pointer-events-none z-[-1] bg-[#010F24]">
        <SparklesCore
          id="tsparticles-whoweare"
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
      <section className="relative min-h-[80vh] w-full flex flex-col items-center justify-center overflow-hidden" style={{ paddingTop: '160px', paddingBottom: '120px', paddingLeft: '20px', paddingRight: '20px' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: MOTION_EASE }}
          className="flex flex-col items-center text-center max-w-4xl mx-auto"
        >
          <p className="font-sans text-[11px] uppercase tracking-[0.5em] text-[#71B8E3] font-medium" style={{ marginBottom: '20px' }}>
            About Us
          </p>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white leading-[1.05]" style={{ marginBottom: '30px' }}>
            We plan.
            <br />
            <span className="text-[#71B8E3]">You shine.</span>
          </h1>
          <div className="max-w-[52ch] text-center font-sans text-base md:text-lg font-light leading-relaxed text-[#D4D4D4]/80">
            <VerticalCutReveal
              splitBy="words"
              staggerDuration={0.04}
              staggerFrom="first"
              transition={{ type: "spring", stiffness: 200, damping: 24, delay: 0.6 }}
              containerClassName="justify-center"
            >
              initio is a Saudi-based experience and production company built on a simple promise: we plan, you shine.
            </VerticalCutReveal>
          </div>
        </motion.div>
      </section>

      {/* ── MISSION ── */}
      <section className="w-full border-t border-white/5 flex justify-center" style={{ paddingTop: '120px', paddingBottom: '120px' }}>
        <div className="w-full max-w-6xl" style={{ paddingLeft: '32px', paddingRight: '32px' }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: MOTION_EASE }}
            >
              <p className="font-sans text-[11px] uppercase tracking-[0.4em] text-[#71B8E3]/80" style={{ marginBottom: '16px' }}>
                Mission & Vision
              </p>
              <h2 className="font-serif text-4xl md:text-5xl text-white leading-tight" style={{ marginBottom: '28px' }}>
                To handle every detail of an experience
              </h2>
              <div className="font-sans text-base md:text-lg text-[#D4D4D4]/80 leading-relaxed space-y-6">
                <p>
                  To handle every detail of an experience: the planning, the production, the technology, the brand. So our clients can step forward with confidence and let their moment speak for itself.
                </p>
                <p>
                  To be the partner behind the region&apos;s most memorable moments: the team that plans quietly, executes precisely, and lets every client shine in the spotlight they deserve.
                </p>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 + 0.2, ease: MOTION_EASE }}
                  className="border border-white/10 rounded-lg text-center hover:border-[#71B8E3]/30 transition-colors duration-500"
                  style={{ padding: '40px 20px' }}
                >
                  <span className="block font-serif text-4xl md:text-5xl text-[#71B8E3]" style={{ marginBottom: '8px' }}>
                    {stat.number}
                  </span>
                  <span className="font-sans text-xs uppercase tracking-[0.2em] text-[#D4D4D4]/60">
                    {stat.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── VALUES ── */}
      <section className="w-full border-t border-white/5 flex justify-center" style={{ paddingTop: '120px', paddingBottom: '120px' }}>
        <div className="w-full max-w-6xl" style={{ paddingLeft: '32px', paddingRight: '32px' }}>
          <div className="flex flex-col items-center text-center" style={{ marginBottom: '60px' }}>
            <p className="font-sans text-[11px] uppercase tracking-[0.4em] text-[#71B8E3]/80" style={{ marginBottom: '12px' }}>
              What Defines Us
            </p>
            <h2 className="font-serif text-4xl md:text-6xl text-white">
              Our Values
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-16">
            {values.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: MOTION_EASE }}
                className="group"
              >
                <div className="flex items-start gap-6">
                  <span className="font-serif text-5xl text-white/10 group-hover:text-[#71B8E3] transition-colors duration-500 leading-none shrink-0" style={{ marginTop: '-4px' }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-serif text-2xl md:text-3xl text-white" style={{ marginBottom: '12px' }}>
                      {value.title}
                    </h3>
                    <p className="font-sans text-[#D4D4D4]/70 leading-relaxed text-base">
                      {value.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OUR TEAM ── */}
      <section className="w-full border-t border-white/5 flex justify-center" style={{ paddingTop: '120px', paddingBottom: '120px' }}>
        <div className="w-full max-w-6xl" style={{ paddingLeft: '32px', paddingRight: '32px' }}>
          <div className="flex flex-col items-center text-center" style={{ marginBottom: '60px' }}>
            <p className="font-sans text-[11px] uppercase tracking-[0.4em] text-[#71B8E3]/80" style={{ marginBottom: '12px' }}>
              The Team
            </p>
            <h2 className="font-serif text-4xl md:text-6xl text-white" style={{ marginBottom: '20px' }}>
              Expertise at Every Level
            </h2>
            <p className="font-sans text-[#D4D4D4]/70 max-w-2xl leading-relaxed text-base md:text-lg">
              Strategy, creative direction, production, technology, content, and on-ground delivery all answer to the same people, the same timeline, and the same level of finish.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, i) => (
              <motion.div
                key={member.role}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: MOTION_EASE }}
                className="border border-white/5 rounded-lg hover:border-[#71B8E3]/20 transition-all duration-500 group"
                style={{ padding: '32px 24px' }}
              >
                <h4 className="font-serif text-xl text-white group-hover:text-[#71B8E3] transition-colors duration-300" style={{ marginBottom: '16px' }}>
                  {member.role}
                </h4>
                <p className="font-sans text-sm text-[#D4D4D4]/60 leading-relaxed">
                  {member.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── QUOTE ── */}
      <section className="w-full border-t border-white/5 flex justify-center" style={{ paddingTop: '120px', paddingBottom: '120px' }}>
        <div className="w-full max-w-4xl text-center" style={{ paddingLeft: '32px', paddingRight: '32px' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: MOTION_EASE }}
          >
            <p className="font-serif text-3xl md:text-5xl text-white leading-snug" style={{ marginBottom: '24px' }}>
              We plan. You shine.
            </p>
            <p className="font-sans text-sm uppercase tracking-[0.3em] text-[#71B8E3]/60">
              That promise is the reason initio exists.
            </p>
          </motion.div>
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
              Work With Us
            </p>
            <h2 className="font-serif text-4xl md:text-6xl text-white" style={{ marginBottom: '20px' }}>
              Ready to create something extraordinary?
            </h2>
            <p className="font-sans text-[#D4D4D4]/70 max-w-lg leading-relaxed" style={{ marginBottom: '40px' }}>
              Clients who want to focus on their message, their guests, and their moment, and trust someone else to hold the rest together.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#71B8E3] text-[#010F24] font-sans text-xs tracking-[0.2em] uppercase hover:bg-white transition-colors duration-300"
              style={{ padding: '10px 15px' }}
            >
              Start a Conversation <ArrowUpRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
