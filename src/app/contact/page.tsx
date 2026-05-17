"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { SparklesCore } from "@/components/ui/sparkles";
import { VerticalCutReveal } from "@/components/ui/vertical-cut-reveal";
import { ArrowUpRight, Mail, MapPin, Phone, Clock } from "lucide-react";
import Link from "next/link";

const MOTION_EASE = [0.76, 0, 0.24, 1] as const;

const contactInfo: {
  icon: typeof Phone;
  title: string;
  lines: { text: string; href?: string }[];
  subtitle: string;
}[] = [
  {
    icon: Phone,
    title: "WhatsApp Us",
    lines: [{ text: "+966 59 505 3003", href: "https://wa.me/966595053003" }],
    subtitle: "Tap to chat on WhatsApp",
  },
  {
    icon: MapPin,
    title: "Visit Us",
    lines: [{ text: "Saudi Arabia" }],
    subtitle: "By appointment only",
  },
  {
    icon: Mail,
    title: "Email Us",
    lines: [{ text: "info@initio.sa", href: "mailto:info@initio.sa" }],
    subtitle: "We respond within 24 hours",
  },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          subject: formData.get("subject"),
          message: formData.get("message"),
        }),
      });

      if (!res.ok) throw new Error("Failed to send");
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative text-[#D4D4D4] isolate">
      {/* ── GLOBAL SPARKLES ── */}
      <div className="fixed inset-0 w-full h-full pointer-events-none z-[-1] bg-[#010F24]">
        <SparklesCore
          id="tsparticles-contact"
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
      <section className="relative min-h-[70vh] w-full flex flex-col items-center justify-center overflow-hidden" style={{ paddingTop: '160px', paddingBottom: '100px', paddingLeft: '32px', paddingRight: '32px' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: MOTION_EASE }}
          className="flex flex-col items-center text-center max-w-4xl mx-auto"
        >
          <p className="font-sans text-[11px] uppercase tracking-[0.5em] text-[#71B8E3] font-medium" style={{ marginBottom: '20px' }}>
            Contact Us
          </p>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white leading-[1.05]" style={{ marginBottom: '30px' }}>
            Let&apos;s Start
            <br />
            <span className="text-[#71B8E3]">a Conversation</span>
          </h1>
          <div className="max-w-[52ch] text-center font-sans text-base md:text-lg font-light leading-relaxed text-[#D4D4D4]/80">
            <VerticalCutReveal
              splitBy="words"
              staggerDuration={0.04}
              staggerFrom="first"
              transition={{ type: "spring", stiffness: 200, damping: 24, delay: 0.6 }}
              containerClassName="justify-center"
            >
              Have a project in mind? We&apos;d love to hear about it. Reach out and let&apos;s explore what we can create together.
            </VerticalCutReveal>
          </div>
        </motion.div>
      </section>

      {/* ── CONTACT INFO CARDS ── */}
      <section className="w-full border-t border-white/5 flex justify-center" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
        <div className="w-full max-w-5xl" style={{ paddingLeft: '32px', paddingRight: '32px' }}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {contactInfo.map((info, i) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: MOTION_EASE }}
                className="border border-white/5 rounded-lg text-center group hover:border-[#71B8E3]/20 transition-all duration-500"
                style={{ padding: '40px 24px' }}
              >
                <div className="w-12 h-12 rounded-full border border-[#71B8E3]/30 flex items-center justify-center mx-auto" style={{ marginBottom: '20px' }}>
                  <info.icon size={20} className="text-[#71B8E3]" />
                </div>
                <h4 className="font-serif text-xl text-white" style={{ marginBottom: '12px' }}>
                  {info.title}
                </h4>
                {info.lines.map((line) =>
                  line.href ? (
                    <a
                      key={line.text}
                      href={line.href}
                      target={line.href.startsWith("http") ? "_blank" : undefined}
                      rel={line.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="block font-sans text-sm text-[#D4D4D4]/80 hover:text-[#71B8E3] transition-colors duration-300"
                    >
                      {line.text}
                    </a>
                  ) : (
                    <p key={line.text} className="font-sans text-sm text-[#D4D4D4]/80 leading-relaxed">
                      {line.text}
                    </p>
                  )
                )}
                <p className="font-sans text-xs text-[#71B8E3]/60" style={{ marginTop: '12px' }}>
                  {info.subtitle}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT FORM ── */}
      <section className="w-full border-t border-white/5 flex justify-center" style={{ paddingTop: '100px', paddingBottom: '100px' }}>
        <div className="w-full max-w-4xl" style={{ paddingLeft: '32px', paddingRight: '32px' }}>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
            {/* Left side: intro */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: MOTION_EASE }}
              className="lg:col-span-2"
            >
              <p className="font-sans text-[11px] uppercase tracking-[0.4em] text-[#71B8E3]/80" style={{ marginBottom: '16px' }}>
                Get in Touch
              </p>
              <h2 className="font-serif text-3xl md:text-4xl text-white" style={{ marginBottom: '20px' }}>
                Tell us about your project
              </h2>
              <p className="font-sans text-[#D4D4D4]/70 leading-relaxed" style={{ marginBottom: '32px' }}>
                Whether you&apos;re planning an event, building a brand, or launching a campaign, we&apos;re here to make it extraordinary.
              </p>

              {/* Office hours */}
              <div className="border border-white/5 rounded-lg" style={{ padding: '24px' }}>
                <div className="flex items-center gap-3" style={{ marginBottom: '12px' }}>
                  <Clock size={16} className="text-[#71B8E3]" />
                  <span className="font-sans text-xs uppercase tracking-[0.2em] text-[#71B8E3]">
                    Office Hours
                  </span>
                </div>
                <div className="space-y-2 font-sans text-sm text-[#D4D4D4]/70">
                  <p>Monday to Friday: 9:00 AM – 6:00 PM</p>
                  <p>Saturday: 10:00 AM – 2:00 PM</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>
            </motion.div>

            {/* Right side: form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2, ease: MOTION_EASE }}
              className="lg:col-span-3"
            >
              {submitted ? (
                <div className="border border-[#71B8E3]/20 rounded-lg text-center" style={{ padding: '60px 30px' }}>
                  <div className="w-16 h-16 rounded-full border border-[#71B8E3]/30 flex items-center justify-center mx-auto" style={{ marginBottom: '24px' }}>
                    <Mail size={28} className="text-[#71B8E3]" />
                  </div>
                  <h3 className="font-serif text-3xl text-white" style={{ marginBottom: '12px' }}>
                    Thank you!
                  </h3>
                  <p className="font-sans text-[#D4D4D4]/70 max-w-sm mx-auto">
                    Your message has been sent. We&apos;ll get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col" style={{ gap: '20px' }}>
                  <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: '20px' }}>
                    <input
                      type="text"
                      name="name"
                      placeholder="YOUR NAME"
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-lg font-sans text-sm text-white placeholder:text-[#D4D4D4]/30 placeholder:tracking-[0.15em] placeholder:text-xs focus:outline-none focus:border-[#71B8E3]/40 transition-colors duration-300"
                      style={{ padding: '22px 24px' }}
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="YOUR EMAIL"
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-lg font-sans text-sm text-white placeholder:text-[#D4D4D4]/30 placeholder:tracking-[0.15em] placeholder:text-xs focus:outline-none focus:border-[#71B8E3]/40 transition-colors duration-300"
                      style={{ padding: '22px 24px' }}
                    />
                  </div>
                  <input
                    type="text"
                    name="subject"
                    placeholder="SUBJECT"
                    className="w-full bg-white/5 border border-white/10 rounded-lg font-sans text-sm text-white placeholder:text-[#D4D4D4]/30 placeholder:tracking-[0.15em] placeholder:text-xs focus:outline-none focus:border-[#71B8E3]/40 transition-colors duration-300"
                    style={{ padding: '22px 24px' }}
                  />
                  <textarea
                    name="message"
                    placeholder="TELL US ABOUT YOUR PROJECT"
                    required
                    rows={6}
                    className="w-full bg-white/5 border border-white/10 rounded-lg font-sans text-sm text-white placeholder:text-[#D4D4D4]/30 placeholder:tracking-[0.15em] placeholder:text-xs focus:outline-none focus:border-[#71B8E3]/40 transition-colors duration-300 resize-vertical"
                    style={{ padding: '20px 24px' }}
                  />
                  {error && (
                    <p className="font-sans text-sm text-red-400">{error}</p>
                  )}
                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center justify-center gap-2 bg-[#71B8E3] text-[#010F24] font-sans text-xs tracking-[0.2em] uppercase hover:bg-white transition-colors duration-300 rounded-lg self-start disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ padding: '10px 15px' }}
                  >
                    {loading ? "Sending..." : "Send Message"} {!loading && <ArrowUpRight size={16} />}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── SOCIAL ── */}
      <section className="w-full border-t border-white/5 flex justify-center" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
        <div className="w-full max-w-3xl text-center" style={{ paddingLeft: '32px', paddingRight: '32px' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: MOTION_EASE }}
            className="flex flex-col items-center"
          >
            <p className="font-sans text-[11px] uppercase tracking-[0.4em] text-[#71B8E3]/80" style={{ marginBottom: '20px' }}>
              Follow Us
            </p>
            <div className="flex flex-wrap justify-center" style={{ gap: '24px' }}>
              {["Instagram", "LinkedIn", "X (Twitter)", "Behance"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="font-sans text-sm text-[#D4D4D4]/60 hover:text-[#71B8E3] transition-colors duration-300"
                >
                  {social}
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
