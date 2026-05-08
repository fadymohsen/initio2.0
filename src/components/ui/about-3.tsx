"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button";

interface About3Props {
  title?: string;
  description?: string;
  mainImage?: {
    src: string;
    alt: string;
  };
  secondaryImage?: {
    src: string;
    alt: string;
  };
  breakout?: {
    src: string;
    alt: string;
    title?: string;
    description?: string;
    buttonText?: string;
    buttonUrl?: string;
  };
  companiesTitle?: string;
  companies?: Array<{
    src: string;
    alt: string;
  }>;
  achievementsTitle?: string;
  achievementsDescription?: string;
  achievements?: Array<{
    label: string;
    value: string;
  }>;
}

export const About3 = ({
  title = "Who We Are",
  description = "initio is a Saudi-based experience and production company built on a simple promise: we plan, you shine.\n\nWe bring event management, technology, branding, and digital production under one roof, so our clients have a single team and a single standard across every part of their experience.",
  mainImage = {
    src: "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?q=80&w=2940&auto=format&fit=crop",
    alt: "Events and branding",
  },
  secondaryImage = {
    src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2940&auto=format&fit=crop",
    alt: "Event production",
  },
  breakout = {
    src: "https://shadcnblocks.com/images/block/block-1.svg",
    alt: "logo",
    title: "Built to Make an Impact",
    description:
      "Every project is approached with precision, creative mastery, and an unwavering commitment to excellence.",
    buttonText: "Discover more",
    buttonUrl: "/",
  },
  companiesTitle = "Valued by clients worldwide",
  companies = [],
  achievementsTitle = "Our Core Pillars",
  achievementsDescription = "Built for organizations that refuse to settle for ordinary.",
  achievements = [
    { value: "Client First", label: "Every decision we make serves one outcome: making our client look, feel, and perform at their best." },
    { value: "Precision", label: "We obsess over the details so our clients never have to. Nothing is left to chance, and nothing is left unfinished." },
    { value: "Quiet Confidence", label: "We don't compete for the spotlight, we build it. Our work is measured by how well our clients shine." },
  ],
}: About3Props = {}) => {
  const containerRef = useRef(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  // Parallax values
  const yMainImage = useTransform(scrollYProgress, [0, 1], [-100, 100])
  const ySecondaryImage = useTransform(scrollYProgress, [0, 1], [100, -100])

  return (
    <section ref={containerRef} className="py-32 bg-[#010F24] text-[#D4D4D4] relative">
      <div className="container mx-auto px-10 md:px-0">
        <div className="mb-14 grid gap-5 text-center md:grid-cols-2 md:text-left">
          <h1 className="text-5xl font-semibold text-white font-serif">{title}</h1>
          <p className="text-[#D4D4D4]/80 whitespace-pre-wrap">{description}</p>
        </div>
        
        <div className="grid gap-7 lg:grid-cols-3">
          <div className="relative size-full max-h-[620px] lg:col-span-2 overflow-hidden rounded-xl shadow-xl">
            <motion.img
              style={{ y: yMainImage, scale: 1.2 }}
              src={mainImage.src}
              alt={mainImage.alt}
              className="absolute inset-0 size-full object-cover"
            />
          </div>
          <div className="flex flex-col gap-7 md:flex-row lg:flex-col">
            <div className="flex flex-col justify-between gap-6 rounded-xl bg-white/5 border border-white/10 p-7 md:w-1/2 lg:w-auto relative z-10 backdrop-blur-sm">
              <img
                src={breakout.src}
                alt={breakout.alt}
                className="mr-auto h-12 invert opacity-50"
              />
              <div>
                <p className="mb-2 text-xl font-semibold text-white font-serif">{breakout.title}</p>
                <p className="text-[#D4D4D4]/80 text-sm leading-relaxed">{breakout.description}</p>
              </div>
              <Button variant="outline" className="mr-auto border-white/20 text-white bg-transparent hover:bg-white hover:text-black" asChild>
                <a href={breakout.buttonUrl}>
                  {breakout.buttonText}
                </a>
              </Button>
            </div>
            <div className="relative grow basis-0 rounded-xl md:w-1/2 lg:min-h-0 lg:w-auto overflow-hidden shadow-xl min-h-[300px]">
              <motion.img
                style={{ y: ySecondaryImage, scale: 1.2 }}
                src={secondaryImage.src}
                alt={secondaryImage.alt}
                className="absolute inset-0 size-full object-cover"
              />
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-xl bg-white/5 border border-white/10 p-10 md:p-16 mt-32">
          <div className="flex flex-col gap-4 text-center md:text-left">
            <h2 className="text-4xl font-semibold text-white font-serif">{achievementsTitle}</h2>
            <p className="max-w-screen-sm text-[#D4D4D4]/80">
              {achievementsDescription}
            </p>
          </div>
          <div className="mt-16 flex flex-wrap justify-between gap-10 text-left">
            {achievements.map((item, idx) => (
              <div className="flex flex-col gap-4 flex-1 min-w-[200px]" key={item.label + idx}>
                <span className="text-2xl font-semibold md:text-3xl text-white font-serif border-b border-white/10 pb-4">
                  {item.value}
                </span>
                <p className="text-[#D4D4D4]/80 text-sm leading-relaxed">{item.label}</p>
              </div>
            ))}
          </div>
          <div className="pointer-events-none absolute -top-1 right-1 z-10 hidden h-full w-full bg-[linear-gradient(to_right,hsl(var(--muted-foreground))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--muted-foreground))_1px,transparent_1px)] bg-[size:80px_80px] opacity-15 [mask-image:linear-gradient(to_bottom_right,#000,transparent,transparent)] md:block"></div>
        </div>

      </div>
    </section>
  );
};
