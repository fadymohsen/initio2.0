"use client"

import { motion } from "framer-motion"
import { VerticalCutReveal } from "@/components/ui/vertical-cut-reveal"

export const ProcessSection = () => {
  const steps = [
    {
      id: "01",
      title: "Discover",
      description: "We start by deeply understanding your vision, objectives, audience, and competitive landscape."
    },
    {
      id: "02",
      title: "Strategize",
      description: "We develop a creative concept and execution plan tailored precisely to your goals and timeline."
    },
    {
      id: "03",
      title: "Create",
      description: "Our team of creatives and producers bring the concept to life with precision and artistic mastery."
    },
    {
      id: "04",
      title: "Execute",
      description: "Flawless on-ground execution, full logistics management, and real-time monitoring from start to finish."
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Delay between each child animating in
        delayChildren: 0.3 // Initial delay before the first child starts
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.21, 0.47, 0.32, 0.98] as const // Cinematic ease out
      }
    }
  }

  return (
    <section
      className="w-full flex justify-center"
      style={{ paddingTop: '100px', paddingBottom: '120px' }}
    >
      <div className="w-full max-w-7xl" style={{ paddingLeft: '32px', paddingRight: '32px' }}>

        {/* Header Section: eyebrow → 10 → title → 40 → grid */}
        <div className="flex flex-col items-center text-center" style={{ marginBottom: '40px' }}>
          <p
            className="font-sans text-[11px] uppercase tracking-[0.4em] text-[#71B8E3]/80 text-center"
            style={{ marginBottom: '10px' }}
          >
            How We Work
          </p>
          <h2 className="text-4xl md:text-6xl text-white font-serif text-center">
            Our Proven Process
          </h2>
        </div>

        {/* Staggered Grid Section */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-x-16 gap-y-16 md:gap-y-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {steps.map((step) => (
            <motion.div
              key={step.id}
              variants={itemVariants}
              className="flex flex-col items-center text-center group"
            >
              <div
                className="text-6xl font-serif text-white/10 group-hover:text-[#71B8E3] transition-colors duration-500 border-b border-white/10 w-24 pb-6 group-hover:border-[#71B8E3]/50"
                style={{ marginBottom: '25px' }}
              >
                {step.id}
              </div>
              <h3 className="text-2xl text-white font-serif text-center">
                {step.title}
              </h3>
              <div
                className="text-[#D4D4D4]/70 font-sans leading-relaxed text-sm text-center"
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
                  {step.description}
                </VerticalCutReveal>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
