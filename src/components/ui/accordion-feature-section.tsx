"use client";

import { useState } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FeatureItem {
  id: number;
  title: string;
  image: string;
  description: string;
}

interface Feature197Props {
  features?: FeatureItem[];
}

const defaultFeatures: FeatureItem[] = [
  {
    id: 1,
    title: "01 Events",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2940&auto=format&fit=crop",
    description:
      "From intimate corporate gatherings to large-scale public festivals, we design, produce, and execute events that leave lasting impressions and drive real results for your brand.\n\nCorporate Events, Conferences, Product Launches, Festivals, Exhibitions, Award Ceremonies",
  },
  {
    id: 2,
    title: "02 Branding",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=3164&auto=format&fit=crop",
    description:
      "We build brand identities that endure. Cohesive visual systems, sharp messaging frameworks, and strategic design direction that give your brand an authoritative, unmistakable presence.\n\nBrand Identity, Visual Systems, Art Direction, Brand Strategy, Naming",
  },
  {
    id: 3,
    title: "03 Marketing",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2940&auto=format&fit=crop",
    description:
      "Strategic, multi-channel campaigns built to amplify your presence, from digital activations and content creation to PR, media planning, and social strategy.\n\nDigital Campaigns, Content Creation, Social Media, PR & Media, Influencer",
  },
];

const Feature197 = ({ features = defaultFeatures }: Feature197Props) => {
  const [activeTabId, setActiveTabId] = useState<number | null>(1);
  const [activeImage, setActiveImage] = useState(features[0].image);

  return (
    <section className="py-32">
      <div className="container mx-auto">
        <div className="mb-20">
          <div className="flex items-center gap-3 font-sans text-[11px] uppercase tracking-[0.4em] text-[#71B8E3]/80">
            <span className="h-px w-6 bg-[#71B8E3]/60" />
            What We Do
          </div>
          <h2 className="mt-8 font-serif text-[clamp(2.5rem,5vw,4.5rem)] font-light leading-[1.05] tracking-[-0.015em] text-white">
            Three Pillars <br/>
            <span className="text-[#71B8E3]">of Impact</span>
          </h2>
        </div>
        <div className="mb-12 flex w-full items-start justify-between gap-12">
          <div className="w-full md:w-1/2">
            <Accordion type="single" className="w-full" defaultValue="item-1">
              {features.map((tab) => (
                <AccordionItem key={tab.id} value={`item-${tab.id}`}>
                  <AccordionTrigger
                    onClick={() => {
                      setActiveImage(tab.image);
                      setActiveTabId(tab.id);
                    }}
                    className="cursor-pointer py-5 !no-underline transition"
                  >
                    <h6
                      className={`text-xl font-semibold ${tab.id === activeTabId ? "text-foreground" : "text-muted-foreground"}`}
                    >
                      {tab.title}
                    </h6>
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="mt-3 text-muted-foreground whitespace-pre-wrap">
                      {tab.description}
                    </p>
                    <div className="mt-4 md:hidden">
                      <img
                        src={tab.image}
                        alt={tab.title}
                        className="h-full max-h-80 w-full rounded-md object-cover"
                      />
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
          <div className="relative m-auto hidden w-1/2 overflow-hidden rounded-xl bg-muted md:block">
            <img
              src={activeImage}
              alt="Feature preview"
              className="aspect-[4/3] rounded-md object-cover pl-4"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export { Feature197 };

