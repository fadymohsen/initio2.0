'use client'

import { useRef } from "react"
import { motion, useScroll, useTransform } from 'framer-motion'
import { VerticalCutReveal } from "@/components/ui/vertical-cut-reveal"
import { SiteSection } from "@/lib/data-service"

export const WhoWeAreParallax = ({ 
  title, 
  subtitle, 
  description, 
  sections 
}: { 
  title: string; 
  subtitle: string; 
  description: string; 
  sections: SiteSection[] 
}) => {
    // Create refs and animations for each section
    const sectionRefs = sections.map(() => useRef(null));
    
    const scrollYProgress = sections.map((_, index) => {
        return useScroll({
            target: sectionRefs[index],
            offset: ["start end", "start 0.75"]
        }).scrollYProgress;
    });

    const opacityContents = scrollYProgress.map(progress =>
        useTransform(progress, [0, 0.3], [0, 1])
    );

    const translateContents = scrollYProgress.map(progress =>
        useTransform(progress, [0, 0.3], [40, 0])
    );

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ paddingTop: '96px', paddingBottom: '160px' }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#010F24] via-transparent to-[#010F24] pointer-events-none" />
      <div
        className='relative z-10 w-full flex flex-col items-center justify-center'
        style={{ marginBottom: '40px', paddingLeft: '32px', paddingRight: '32px' }}
      >
        <p
          className="font-sans text-[11px] uppercase tracking-[0.4em] text-[#71B8E3]/80 text-center"
          style={{ marginBottom: '10px' }}
        >{subtitle}</p>
        <h2
          className='text-4xl md:text-6xl max-w-4xl text-center font-serif text-white leading-tight'
          style={{ marginBottom: '15px' }}
        >
            {title}
        </h2>
        <div className="text-lg md:text-xl text-[#D4D4D4]/80 max-w-3xl text-center font-sans leading-relaxed">
          <VerticalCutReveal
            splitBy="words"
            staggerDuration={0.025}
            staggerFrom="first"
            triggerOnView
            transition={{ type: "spring", stiffness: 200, damping: 24 }}
            containerClassName="justify-center"
          >
            {description}
          </VerticalCutReveal>
        </div>
      </div>

        <div className="relative z-10 flex flex-col items-center" style={{ paddingLeft: '32px', paddingRight: '32px' }}>
            <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                {sections.map((section, index) => (
                    <motion.div
                        key={section.id}
                        ref={sectionRefs[index]}
                        style={{
                            y: translateContents[index],
                            opacity: opacityContents[index],
                        }}
                        className="group relative flex flex-col items-center text-center rounded-2xl border border-white/10 bg-[#010F24]/60 backdrop-blur-md p-8 md:p-10 transition-all duration-500 hover:border-[#71B8E3]/30 hover:bg-[#010F24]/80"
                    >
                        {/* Number accent */}
                        <span className="font-serif text-[#71B8E3]/20 text-4xl md:text-5xl font-normal absolute top-4 right-5 select-none leading-none group-hover:text-[#71B8E3]/30 transition-colors duration-500">
                            {String(index + 1).padStart(2, '0')}
                        </span>

                        {/* Decorative line */}
                        <div className="w-8 h-px bg-[#71B8E3]/40 mb-6 group-hover:w-12 transition-all duration-500" />

                        <h3 className="text-2xl md:text-3xl text-white font-serif mb-4 relative z-10">
                            {section.title}
                        </h3>
                        <div className="text-[#D4D4D4]/70 font-sans leading-relaxed text-sm md:text-base relative z-10">
                            <VerticalCutReveal
                                splitBy="words"
                                staggerDuration={0.03}
                                staggerFrom="first"
                                triggerOnView
                                transition={{ type: "spring", stiffness: 200, damping: 24 }}
                                containerClassName="justify-center"
                            >
                                {section.description}
                            </VerticalCutReveal>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    </section>
  );
};
