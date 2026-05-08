'use client'

import { useRef } from "react"
import { motion, useScroll, useTransform } from 'framer-motion'
import { VerticalCutReveal } from "@/components/ui/vertical-cut-reveal"
import { ServicePillar } from "@/lib/data-service"

interface Props {
  title?: string;
  subtitle?: string;
  pillars: ServicePillar[];
}

export const ParallaxScrollFeatureSection = ({ title = "Three Pillars of Impact", subtitle = "What We Do", pillars }: Props) => {
    const sectionRefs = pillars.map(() => useRef(null));

    const scrollYProgress = pillars.map((_, index) => {
        return useScroll({
            target: sectionRefs[index],
            offset: ["start end", "center start"]
        }).scrollYProgress;
    });

    const opacityContents = scrollYProgress.map(progress =>
        useTransform(progress, [0, 0.7], [0, 1])
    );

    const clipProgresses = scrollYProgress.map(progress =>
        useTransform(progress, [0, 0.7], ["inset(0 100% 0 0)", "inset(0 0% 0 0)"])
    );

    const translateContents = scrollYProgress.map(progress =>
        useTransform(progress, [0, 1], [-50, 0])
    );

  return (
    <section
      className="w-full"
      style={{ paddingTop: '180px', paddingBottom: '120px' }}
    >
      <div
        className='w-full flex flex-col items-center justify-center'
        style={{ marginBottom: '40px', paddingLeft: '32px', paddingRight: '32px' }}
      >
        <p
          className="font-sans text-[11px] uppercase tracking-[0.4em] text-[#71B8E3]/80 text-center"
          style={{ marginBottom: '10px' }}
        >{subtitle}</p>
        <h2 className='text-4xl md:text-6xl max-w-2xl text-center font-serif text-white'>{title}</h2>
      </div>

        {/* Desktop Parallax Layout */}
        <div className="hidden md:flex flex-col px-10">
            {pillars.map((pillar, index) => {
                const reverse = index % 2 !== 0;
                return (
                    <div
                        key={pillar.id}
                        ref={sectionRefs[index]}
                        className={`md:h-screen flex flex-col items-center justify-center md:gap-40 gap-10 ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'}`}
                    >
                        <motion.div style={{ y: translateContents[index] }} className="w-full md:w-auto flex flex-col items-center md:items-start px-6 md:px-0">
                            <div className="text-4xl md:text-6xl max-w-sm text-white font-serif text-center md:text-left">
                                {pillar.title}
                            </div>
                            <div
                                className="text-[#D4D4D4]/80 max-w-sm font-sans leading-relaxed text-lg text-center md:text-left"
                                style={{ marginTop: '25px' }}
                            >
                                <VerticalCutReveal
                                  splitBy="words"
                                  staggerDuration={0.025}
                                  staggerFrom="first"
                                  triggerOnView
                                  transition={{ type: "spring", stiffness: 200, damping: 24 }}
                                  containerClassName="md:justify-start justify-center"
                                >
                                  {pillar.description}
                                </VerticalCutReveal>
                            </div>
                            <div
                                className="text-[#71B8E3]/80 font-sans text-sm max-w-sm leading-relaxed text-center md:text-left"
                                style={{ marginTop: '25px' }}
                            >
                                <VerticalCutReveal
                                  splitBy="words"
                                  staggerDuration={0.02}
                                  staggerFrom="first"
                                  triggerOnView
                                  transition={{ type: "spring", stiffness: 220, damping: 26, delay: 0.2 }}
                                  containerClassName="md:justify-start justify-center"
                                >
                                  {pillar.list}
                                </VerticalCutReveal>
                            </div>
                        </motion.div>
                        <motion.div
                            style={{
                                opacity: opacityContents[index],
                                clipPath: clipProgresses[index],
                            }}
                            className="relative w-full md:w-auto flex justify-center"
                        >
                            <img
                                src={pillar.image}
                                className="size-[300px] md:size-[450px] object-cover rounded-xl shadow-2xl"
                                alt={pillar.title}
                            />
                        </motion.div>
                    </div>
                );
            })}
        </div>

        {/* Mobile Clean Layout */}
        <div className="flex md:hidden flex-col" style={{ paddingLeft: '32px', paddingRight: '32px' }}>
            {pillars.map((pillar, idx) => (
                <div
                    key={pillar.id}
                    className="flex flex-col items-center text-center"
                    style={{ marginTop: idx === 0 ? '0px' : '40px' }}
                >
                    <div className="text-4xl w-full max-w-sm text-white font-serif text-center">
                        {pillar.title}
                    </div>
                    <div
                      className="text-[#D4D4D4]/80 max-w-sm font-sans leading-relaxed text-lg text-center"
                      style={{ marginTop: '25px' }}
                    >
                        <VerticalCutReveal
                          splitBy="words"
                          staggerDuration={0.025}
                          staggerFrom="first"
                          triggerOnView
                          transition={{ type: "spring", stiffness: 200, damping: 24 }}
                          containerClassName="justify-center"
                        >
                          {pillar.description}
                        </VerticalCutReveal>
                    </div>
                    <div
                      className="text-[#71B8E3]/80 font-sans text-sm max-w-sm leading-relaxed text-center"
                      style={{ marginTop: '25px' }}
                    >
                        <VerticalCutReveal
                          splitBy="words"
                          staggerDuration={0.02}
                          staggerFrom="first"
                          triggerOnView
                          transition={{ type: "spring", stiffness: 220, damping: 26, delay: 0.2 }}
                          containerClassName="justify-center"
                        >
                          {pillar.list}
                        </VerticalCutReveal>
                    </div>
                    <div
                      className="w-full flex justify-center"
                      style={{ marginTop: '25px' }}
                    >
                        <img
                            src={pillar.image}
                            className="size-[300px] object-cover rounded-xl shadow-2xl"
                            alt={pillar.title}
                        />
                    </div>
                </div>
            ))}
        </div>
    </section>
  );
};
