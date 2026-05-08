'use client';

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SparklesCore } from "@/components/ui/sparkles";
import { CardsParallax } from "@/components/ui/scroll-cards";
import { ParallaxScrollFeatureSection } from "@/components/ui/parallax-scroll-feature-section";
import { WhoWeAreParallax } from "@/components/ui/who-we-are-parallax";
import { ProcessSection } from "@/components/ui/process-section";
import { SiteContent, Project } from "@/lib/data-service";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const GSAP_EASE = "power4.out";

const DEFAULT_PARTNERS = [
  { id: '1', name: 'Saudi Aramco', logo: '' },
  { id: '2', name: 'NEOM', logo: '' },
  { id: '3', name: 'PIF', logo: '' },
  { id: '4', name: 'Saudi Tourism Authority', logo: '' },
  { id: '5', name: 'Diriyah Gate Authority', logo: '' },
  { id: '6', name: 'Saudi Vision 2030', logo: '' },
];

export const HomeContent = ({ site, projects }: { site: SiteContent['site'], projects: Project[] }) => {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const heroWords = gsap.utils.toArray<HTMLElement>("[data-hero-word]");
      gsap.set(heroWords, { yPercent: 115 });
      gsap.set("[data-hero-fade]", { autoAlpha: 0, y: 24 });
      gsap.set("[data-hero-rule]", { scaleX: 0, transformOrigin: "left center" });
      gsap
        .timeline({ delay: 0.15 })
        .to(heroWords, {
          yPercent: 0,
          duration: 1.6,
          ease: GSAP_EASE,
          stagger: 0.08,
        })
        .to("[data-hero-rule]", { scaleX: 1, duration: 1.4, ease: "power4.inOut" }, "-=1.0")
        .to("[data-hero-fade]", {
          autoAlpha: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          stagger: 0.08,
        }, "-=1.1");
    },
    { scope: root }
  );

  return (
    <div ref={root} className="relative text-[#D4D4D4] isolate">
      {/* Site-wide Sparkles */}
      <div className="fixed inset-0 w-full h-full pointer-events-none z-[-1] bg-[#010F24]">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={30}
          className="w-full h-full"
          particleColor="#71B8E3"
          speed={1}
        />
      </div>

      <section data-hero className="relative h-[100svh] min-h-[640px] w-full flex flex-col justify-center overflow-hidden">

        {/* Watermark */}
        <div
          aria-hidden="true"
          className="absolute pointer-events-none z-[1] opacity-[0.07]
                     top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2
                     w-[80vw] max-w-[420px]
                     md:w-[55vw] md:left-auto md:right-[-8vw] md:translate-x-0 md:max-w-[780px]"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/16x16.svg"
            alt=""
            className="w-full h-auto"
            style={{ filter: 'brightness(0) invert(1)' }}
          />
        </div>

        {/* Hero content — centered */}
        <div className="relative z-20 w-full flex flex-col items-center text-center px-6">

          {/* Headline */}
          <div className="overflow-hidden">
            <h1
              data-hero-word
              className="font-serif font-normal leading-[1.05] tracking-[-0.02em] text-[#D4D4D4]"
              style={{ fontSize: 'clamp(3.4rem, 7.5vw, 7.5rem)' }}
            >
              We plan.
            </h1>
          </div>
          <div className="overflow-hidden">
            <h1
              data-hero-word
              className="font-serif font-normal leading-[1.05] tracking-[-0.02em] text-accent"
              style={{ fontSize: 'clamp(3.4rem, 7.5vw, 7.5rem)' }}
            >
              You shine.
            </h1>
          </div>

          {/* Rule */}
          <div
            data-hero-rule
            className="mt-5 mb-6 h-px bg-[#D4D4D4]/30 mx-auto"
            style={{ width: '2.5rem' }}
          />

          {/* Body copy */}
          <p
            data-hero-fade
            className="font-sans font-light leading-relaxed text-[#D4D4D4]/65"
            style={{ fontSize: 'clamp(0.82rem, 1.1vw, 0.92rem)', maxWidth: '36ch' }}
          >
            {site.hero.description}
          </p>

          {/* CTA */}
          <a
            href="/who-we-are"
            data-hero-fade
            className="mt-8 inline-flex items-center gap-3 font-sans uppercase text-accent group"
            style={{ fontSize: '11px', letterSpacing: '0.45em' }}
          >
            Explore More
            <span className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-1.5">
              &#8594;
            </span>
          </a>
        </div>
      </section>

      <WhoWeAreParallax
        title={site.whoWeAre.title}
        subtitle={site.whoWeAre.subtitle}
        description={site.whoWeAre.description}
        sections={site.whoWeAre.sections}
      />

      {/* Partners */}
      <section className="relative w-full z-10 pt-[51px] pb-16">
        <p className="font-sans text-[13px] uppercase tracking-[0.45em] text-[#71B8E3]/60 text-center mb-4">
          Trusted By
        </p>
        <h2 className="font-serif font-normal text-white text-center mb-12" style={{ fontSize: 'clamp(2.8rem, 6vw, 6rem)' }}>
          Partners
        </h2>
        <div
          className="overflow-hidden"
          style={{ maskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)' }}
        >
          <div
            className="flex items-center w-max gap-24"
            style={{ animation: 'marquee 32s linear infinite' }}
          >
            {(() => { const p = site.partners?.length ? site.partners : DEFAULT_PARTNERS; return [...p, ...p]; })().map((partner, i) =>
              partner.logo ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  key={i}
                  src={partner.logo}
                  alt={partner.name}
                  className="h-10 w-auto shrink-0 select-none object-contain opacity-25 grayscale"
                />
              ) : (
                <span
                  key={i}
                  className="font-serif text-3xl shrink-0 select-none text-[#D4D4D4]/25"
                >
                  {partner.name}
                </span>
              )
            )}
          </div>
        </div>
      </section>

      <ProcessSection />

      <section className="relative w-full z-10">
        <div className="hidden md:flex w-full flex-col items-center justify-center px-6" style={{ paddingTop: '70px', paddingBottom: '90px' }}>
          <p className="font-sans text-[11px] uppercase tracking-[0.4em] text-[#71B8E3]/80 mb-6 text-center">
            Portfolio
          </p>
          <h2 className="text-6xl text-white font-serif text-center drop-shadow-lg">
            Our Work
          </h2>
        </div>
        <CardsParallax items={projects.map(p => ({
          title: p.title,
          description: p.description,
          src: p.image,
          link: `/portfolio/${p.slug}`,
          color: "#010f24",
          textColor: "white"
        }))} />
      </section>

      <ParallaxScrollFeatureSection
        title={site.services.title}
        subtitle={site.services.subtitle}
        pillars={site.services.pillars}
      />
    </div>
  );
};
