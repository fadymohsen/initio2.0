'use client';

import { motion } from "framer-motion";
import { SparklesCore } from "@/components/ui/sparkles";
import { ArrowUpRight, ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Project } from "@/lib/data-service";

const EASE = [0.76, 0, 0.24, 1] as const;

export const ProjectDetailContent = ({ project, isModal = false }: { project: Project; isModal?: boolean }) => {
  if (isModal) return <ModalView project={project} />;
  return <FullPageView project={project} />;
};

// ─── Modal layout: centered column, timed animations ───────────────────────

function ModalView({ project }: { project: Project }) {
  const fade = (delay: number) => ({
    initial: { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.65, delay, ease: EASE },
  });

  return (
    <div className="relative text-[#D4D4D4] bg-[#010F24]">

      {/* Hero image */}
      <section className="relative w-full overflow-hidden" style={{ height: '62vh', minHeight: '400px' }}>
        <Image src={project.image} alt={project.title} fill priority className="object-cover" />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, rgba(1,15,36,0.1) 0%, rgba(1,15,36,0.45) 55%, rgba(1,15,36,1) 100%)' }}
        />
        <motion.div
          {...fade(0.1)}
          className="absolute bottom-0 left-0 right-0"
          style={{ padding: '0 40px 52px' }}
        >
          <p className="font-sans text-[10px] uppercase tracking-[0.4em] text-[#71B8E3]" style={{ marginBottom: '12px' }}>
            {project.category}{project.typology ? ` · ${project.typology}` : ''}
          </p>
          <h1 className="font-serif text-4xl md:text-6xl text-white leading-tight" style={{ marginBottom: '10px' }}>
            {project.title}
          </h1>
          <p className="font-sans text-sm text-[#D4D4D4]/50">
            {project.location} &nbsp;·&nbsp; {project.year}
          </p>
        </motion.div>
      </section>

      {/* Centered content column */}
      <div className="max-w-3xl mx-auto" style={{ padding: '72px 32px 32px' }}>

        {/* Overview */}
        <motion.div {...fade(0.2)} style={{ marginBottom: '56px' }}>
          <p className="font-sans text-[11px] uppercase tracking-[0.4em] text-[#71B8E3]/70" style={{ marginBottom: '18px' }}>
            Overview
          </p>
          <p className="font-sans text-base md:text-lg text-[#D4D4D4]/80 leading-relaxed">
            {project.summary || project.description}
          </p>
        </motion.div>

        {/* Stats — horizontal row */}
        {project.stats && project.stats.length > 0 && (
          <motion.div
            {...fade(0.3)}
            className="flex flex-col md:flex-row rounded-2xl overflow-hidden border border-white/[0.07]"
            style={{ marginBottom: '64px' }}
          >
            {project.stats.map((stat, i) => (
              <div
                key={stat.label}
                className={`flex-1 flex flex-col items-center justify-center text-center ${
                  i < project.stats!.length - 1
                    ? 'border-b md:border-b-0 md:border-r border-white/[0.07]'
                    : ''
                }`}
                style={{ padding: '32px 24px' }}
              >
                <span className="font-serif text-3xl md:text-4xl text-[#71B8E3]" style={{ marginBottom: '6px' }}>
                  {stat.number}
                </span>
                <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-[#D4D4D4]/40">
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>
        )}

        {/* Challenge / Approach / Outcome */}
        {(project.challenge || project.approach || project.outcome) && (
          <div
            className="flex flex-col"
            style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '56px', marginBottom: '64px', gap: '44px' }}
          >
            {[
              { label: 'The Challenge', body: project.challenge },
              { label: 'Our Approach', body: project.approach },
              { label: 'The Outcome', body: project.outcome },
            ]
              .filter((b) => b.body)
              .map((block, i) => (
                <motion.div key={block.label} {...fade(0.35 + i * 0.08)}>
                  <p className="font-sans text-[11px] uppercase tracking-[0.4em] text-[#71B8E3]/60" style={{ marginBottom: '14px' }}>
                    {block.label}
                  </p>
                  <p className="font-sans text-base text-[#D4D4D4]/75 leading-relaxed">{block.body}</p>
                </motion.div>
              ))}
          </div>
        )}

        {/* Services tags */}
        {project.services && project.services.length > 0 && (
          <motion.div
            {...fade(0.5)}
            style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '48px', marginBottom: '64px' }}
          >
            <p className="font-sans text-[11px] uppercase tracking-[0.4em] text-[#71B8E3]/70" style={{ marginBottom: '20px' }}>
              Services
            </p>
            <div className="flex flex-wrap" style={{ gap: '10px' }}>
              {project.services.map((s) => (
                <span
                  key={s}
                  className="font-sans text-xs uppercase tracking-[0.15em] text-[#D4D4D4]/55"
                  style={{ border: '1px solid rgba(255,255,255,0.1)', borderRadius: '999px', padding: '7px 16px' }}
                >
                  {s}
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Gallery — wider container, breaks out of column */}
      {project.images && project.images.length > 0 && (
        <motion.div {...fade(0.42)} style={{ padding: '0 16px 80px' }}>
          <div className="max-w-5xl mx-auto">
            <p
              className="font-sans text-[11px] uppercase tracking-[0.4em] text-[#71B8E3]/70"
              style={{ marginBottom: '24px', paddingLeft: '8px' }}
            >
              Gallery
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3" style={{ gap: '10px' }}>
              {project.images.map((src, i) => (
                <div
                  key={i}
                  className={`relative overflow-hidden rounded-2xl ${i === 0 ? 'col-span-2' : ''}`}
                  style={{ aspectRatio: i === 0 ? '16/9' : '1/1' }}
                >
                  <Image
                    src={src}
                    alt={`${project.title} ${i + 1}`}
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* CTA */}
      <motion.div
        {...fade(0.55)}
        className="text-center"
        style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '80px 32px 100px' }}
      >
        <p className="font-sans text-[11px] uppercase tracking-[0.4em] text-[#71B8E3]/60" style={{ marginBottom: '16px' }}>
          Inspired?
        </p>
        <h2 className="font-serif text-3xl md:text-5xl text-white" style={{ marginBottom: '28px' }}>
          Have a project in mind?
        </h2>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 bg-[#71B8E3] text-[#010F24] font-sans text-xs tracking-[0.2em] uppercase hover:bg-white transition-colors duration-300"
          style={{ padding: '10px 20px' }}
        >
          Say Hello <ArrowUpRight size={16} />
        </Link>
      </motion.div>
    </div>
  );
}

// ─── Full-page layout: wide, scroll-triggered animations ───────────────────

function FullPageView({ project }: { project: Project }) {
  const px = 'px-8 md:px-12 lg:px-20';

  return (
    <div className="relative text-[#D4D4D4] isolate min-h-screen">
      <div className="fixed inset-0 w-full h-full pointer-events-none z-[-1] bg-[#010F24]">
        <SparklesCore
          id={`tsparticles-project-${project.slug}`}
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={50}
          className="w-full h-full"
          particleColor="#71B8E3"
          speed={1}
        />
      </div>

      {/* Hero */}
      <section className="relative w-full overflow-hidden" style={{ height: '100vh', minHeight: '640px' }}>
        <Image src={project.image} alt={project.title} fill priority className="object-cover" />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, rgba(1,15,36,0.2) 0%, rgba(1,15,36,0.3) 50%, rgba(1,15,36,0.95) 100%)' }}
        />
        <div className={`absolute top-0 left-0 w-full ${px}`} style={{ paddingTop: '120px', zIndex: 20 }}>
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 font-sans text-xs uppercase tracking-[0.2em] text-[#D4D4D4]/60 hover:text-white transition-colors duration-300"
          >
            <ArrowLeft size={14} /> Portfolio
          </Link>
        </div>
        <div className={`absolute bottom-0 left-0 w-full ${px}`} style={{ paddingBottom: '60px', zIndex: 20 }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE }}
            className="max-w-4xl"
          >
            <p className="font-sans text-[10px] uppercase tracking-[0.4em] text-[#71B8E3]" style={{ marginBottom: '12px' }}>
              {project.category}{project.typology ? ` · ${project.typology}` : ''}
            </p>
            <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl text-white leading-tight" style={{ marginBottom: '16px' }}>
              {project.title}
            </h1>
            <p className="font-sans text-sm text-[#D4D4D4]/70">
              {project.location} &nbsp;·&nbsp; {project.year}
            </p>
          </motion.div>
        </div>
      </section>

      <div className={`w-full max-w-7xl mx-auto ${px}`}>

        {/* Overview + Stats */}
        <section className="w-full" style={{ paddingTop: '120px', paddingBottom: '100px' }}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, ease: EASE }}
              className="lg:col-span-2"
            >
              <p className="font-sans text-[11px] uppercase tracking-[0.4em] text-[#71B8E3]/80" style={{ marginBottom: '16px' }}>
                Overview
              </p>
              <p className="font-sans text-base md:text-lg text-[#D4D4D4]/80 leading-relaxed">
                {project.summary || project.description}
              </p>
            </motion.div>

            {project.stats && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
                className="flex flex-col gap-6"
              >
                {project.stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="border border-white/10 rounded-lg text-center hover:border-[#71B8E3]/30 transition-colors duration-500"
                    style={{ padding: '28px 20px' }}
                  >
                    <span className="block font-serif text-4xl text-[#71B8E3]" style={{ marginBottom: '6px' }}>
                      {stat.number}
                    </span>
                    <span className="font-sans text-xs uppercase tracking-[0.2em] text-[#D4D4D4]/50">{stat.label}</span>
                  </div>
                ))}
              </motion.div>
            )}
          </div>
        </section>

        {/* Challenge / Approach / Outcome */}
        {(project.challenge || project.approach || project.outcome) && (
          <section className="w-full border-t border-white/5" style={{ paddingTop: '100px', paddingBottom: '100px' }}>
            <div className="flex flex-col gap-16">
              {[
                { label: 'The Challenge', body: project.challenge },
                { label: 'Our Approach', body: project.approach },
                { label: 'The Outcome', body: project.outcome },
              ]
                .filter((b) => b.body)
                .map((block, i) => (
                  <motion.div
                    key={block.label}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.7, delay: 0.05 * i, ease: EASE }}
                    className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-12"
                  >
                    <p className="font-sans text-[11px] uppercase tracking-[0.4em] text-[#71B8E3]/70 md:col-span-1 pt-1">
                      {block.label}
                    </p>
                    <p className="font-sans text-base md:text-lg text-[#D4D4D4]/80 leading-relaxed md:col-span-3">
                      {block.body}
                    </p>
                  </motion.div>
                ))}
            </div>
          </section>
        )}

        {/* Gallery */}
        {project.images && project.images.length > 0 && (
          <section className="w-full border-t border-white/5" style={{ paddingTop: '100px', paddingBottom: '100px' }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EASE }}
              style={{ marginBottom: '48px' }}
            >
              <p className="font-sans text-[11px] uppercase tracking-[0.4em] text-[#71B8E3]/80" style={{ marginBottom: '12px' }}>
                Gallery
              </p>
              <h2 className="font-serif text-4xl md:text-5xl text-white">The Work</h2>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {project.images.map((src, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.6, delay: i * 0.1, ease: EASE }}
                  className={`relative overflow-hidden rounded-xl ${i === 0 ? 'md:col-span-2 aspect-[16/9]' : 'aspect-square'}`}
                >
                  <Image
                    src={src}
                    alt={`${project.title} — image ${i + 1}`}
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-105"
                  />
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* Services */}
        {project.services && project.services.length > 0 && (
          <section className="w-full border-t border-white/5" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              <p className="font-sans text-[11px] uppercase tracking-[0.4em] text-[#71B8E3]/80" style={{ marginBottom: '24px' }}>
                Services
              </p>
              <div className="flex flex-wrap gap-3">
                {project.services.map((s) => (
                  <span
                    key={s}
                    className="font-sans text-xs uppercase tracking-[0.15em] text-[#D4D4D4]/60 border border-white/10 rounded-full"
                    style={{ padding: '8px 18px' }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </motion.div>
          </section>
        )}

        {/* CTA */}
        <section className="w-full border-t border-white/5" style={{ paddingTop: '100px', paddingBottom: '120px' }}>
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: EASE }}
              className="flex flex-col items-center"
            >
              <p className="font-sans text-[11px] uppercase tracking-[0.4em] text-[#71B8E3]/80" style={{ marginBottom: '16px' }}>
                Inspired?
              </p>
              <h2 className="font-serif text-4xl md:text-6xl text-white" style={{ marginBottom: '20px' }}>
                Have a project in mind?
              </h2>
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
    </div>
  );
}
