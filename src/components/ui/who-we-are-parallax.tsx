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
            offset: ["start end", "center start"]
        }).scrollYProgress;
    });

    const opacityContents = scrollYProgress.map(progress => 
        useTransform(progress, [0, 0.7], [0, 1])
    );
    
    const clipProgresses = scrollYProgress.map(progress => 
        useTransform(progress, [0, 0.7], ["inset(0% 0% 100% 0%)", "inset(0% 0% 0% 0%)"])
    );
    
    const translateContents = scrollYProgress.map(progress => 
        useTransform(progress, [0, 1], [-50, 0])
    );

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ paddingTop: '96px', paddingBottom: '160px' }}
    >
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        src="/videos/intro.mp4"
        className="absolute inset-0 w-full h-full object-cover opacity-60 pointer-events-none"
      />
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

        <div className="relative z-10 flex flex-col" style={{ paddingLeft: '32px', paddingRight: '32px' }}>
            {sections.map((section, index) => (
                <div
                    key={section.id}
                    ref={sectionRefs[index]}
                    className="flex flex-col items-center justify-center gap-12 py-20 md:py-32"
                >
                    <motion.div 
                        style={{ 
                            y: translateContents[index],
                            opacity: opacityContents[index] 
                        }} 
                        className="w-full max-w-2xl flex flex-col items-center text-center"
                    >
                        <div 
                            className="text-4xl md:text-6xl text-white font-serif"
                            style={{ marginTop: '55px' }}
                        >
                            {section.title}
                        </div>
                        <div
                          className="text-[#D4D4D4]/80 font-sans leading-relaxed text-xl md:text-2xl mt-6"
                        >
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

                    <motion.div 
                        style={{ 
                            opacity: opacityContents[index],
                            clipPath: clipProgresses[index],
                        }}
                        className="relative w-full max-w-4xl flex justify-center"
                    >
                        <img 
                            src={section.image} 
                            className="w-full max-w-[800px] aspect-video object-cover rounded-xl shadow-2xl border border-white/5" 
                            alt={section.title}
                        />
                    </motion.div>
                </div>
            ))}
        </div>
    </section>
  );
};
