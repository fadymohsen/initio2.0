"use client";

import { useState, FormEvent, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SparklesCore } from "@/components/ui/sparkles";
import { VerticalCutReveal } from "@/components/ui/vertical-cut-reveal";
import { ArrowUpRight, Mail, MapPin, Phone, Clock, AlertCircle } from "lucide-react";
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

type FieldErrors = Partial<Record<"name" | "email" | "message", string>>;

function FieldError({ message }: { message?: string }) {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: -6, height: 0 }}
          animate={{ opacity: 1, y: 0, height: "auto" }}
          exit={{ opacity: 0, y: -6, height: 0 }}
          transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
          className="flex items-center gap-1.5 overflow-hidden"
          style={{ marginTop: '6px' }}
        >
          <AlertCircle size={12} className="text-[#f87171] shrink-0" />
          <span className="font-sans text-[12px] text-[#f87171]">{message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const formRef = useRef<HTMLFormElement>(null);

  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case "name":
        if (!value.trim()) return "Please enter your name";
        if (value.trim().length < 2) return "Name must be at least 2 characters";
        return undefined;
      case "email":
        if (!value.trim()) return "Please enter your email";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) return "Please enter a valid email address";
        return undefined;
      case "message":
        if (!value.trim()) return "Please enter your message";
        if (value.trim().length < 10) return "Message must be at least 10 characters";
        return undefined;
      default:
        return undefined;
    }
  };

  const handleBlur = (name: string, value: string) => {
    setTouched((prev) => ({ ...prev, [name]: true }));
    const err = validateField(name, value);
    setFieldErrors((prev) => ({ ...prev, [name]: err }));
  };

  const handleChange = (name: string, value: string) => {
    if (touched[name]) {
      const err = validateField(name, value);
      setFieldErrors((prev) => ({ ...prev, [name]: err }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = (formData.get("name") as string) || "";
    const email = (formData.get("email") as string) || "";
    const message = (formData.get("message") as string) || "";

    const errors: FieldErrors = {
      name: validateField("name", name),
      email: validateField("email", email),
      message: validateField("message", message),
    };

    // Remove undefined entries
    const activeErrors = Object.fromEntries(
      Object.entries(errors).filter(([, v]) => v !== undefined)
    ) as FieldErrors;

    setFieldErrors(activeErrors);
    setTouched({ name: true, email: true, message: true });

    if (Object.keys(activeErrors).length > 0) return;

    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          subject: formData.get("subject"),
          message,
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
        <div className="w-full max-w-5xl" style={{ paddingLeft: '24px', paddingRight: '24px' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: MOTION_EASE }}
            className="relative border border-white/[0.06] rounded-2xl bg-white/[0.02] backdrop-blur-sm overflow-hidden"
          >
            {/* Subtle glow accent */}
            <div className="absolute -top-32 -right-32 w-64 h-64 bg-[#71B8E3]/[0.04] rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-[#71B8E3]/[0.03] rounded-full blur-3xl pointer-events-none" />

            <div className="relative grid grid-cols-1 lg:grid-cols-12">
              {/* Left side: intro */}
              <div className="lg:col-span-5 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/[0.06]" style={{ padding: '40px 32px' }}>
                <div>
                  <p className="font-sans text-[11px] uppercase tracking-[0.5em] text-[#71B8E3]" style={{ marginBottom: '20px' }}>
                    Get in Touch
                  </p>
                  <h2 className="font-serif text-3xl md:text-4xl lg:text-[2.6rem] text-white leading-[1.15]" style={{ marginBottom: '20px' }}>
                    Tell us about
                    <br />
                    your project
                  </h2>
                  <p className="font-sans text-[15px] text-[#D4D4D4]/60 leading-relaxed max-w-[34ch]" style={{ marginBottom: '40px' }}>
                    Whether you&apos;re planning an event, building a brand, or launching a campaign &mdash; we&apos;re here to make it extraordinary.
                  </p>
                </div>

                {/* Office hours */}
                <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl" style={{ padding: '24px' }}>
                  <div className="flex items-center gap-3" style={{ marginBottom: '16px' }}>
                    <div className="w-8 h-8 rounded-full bg-[#71B8E3]/10 flex items-center justify-center">
                      <Clock size={14} className="text-[#71B8E3]" />
                    </div>
                    <span className="font-sans text-[11px] uppercase tracking-[0.3em] text-[#71B8E3]/90 font-medium">
                      Office Hours
                    </span>
                  </div>
                  <div className="space-y-3 font-sans text-sm text-[#D4D4D4]/60">
                    <div className="flex justify-between">
                      <span>Mon – Fri</span>
                      <span className="text-[#D4D4D4]/80">9:00 AM – 6:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Saturday</span>
                      <span className="text-[#D4D4D4]/80">10:00 AM – 2:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sunday</span>
                      <span className="text-[#D4D4D4]/40">Closed</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right side: form */}
              <div className="lg:col-span-7" style={{ padding: '40px 32px' }}>
                {submitted ? (
                  <div className="flex flex-col items-center justify-center text-center h-full" style={{ padding: '40px 20px' }}>
                    <div className="w-20 h-20 rounded-full bg-[#71B8E3]/10 border border-[#71B8E3]/20 flex items-center justify-center" style={{ marginBottom: '28px' }}>
                      <Mail size={32} className="text-[#71B8E3]" />
                    </div>
                    <h3 className="font-serif text-3xl text-white" style={{ marginBottom: '12px' }}>
                      Thank you!
                    </h3>
                    <p className="font-sans text-[#D4D4D4]/60 max-w-sm">
                      Your message has been sent. We&apos;ll get back to you within 24 hours.
                    </p>
                  </div>
                ) : (
                  <form ref={formRef} onSubmit={handleSubmit} noValidate className="flex flex-col" style={{ gap: '16px' }}>
                    <div className="relative group">
                      <label className={`block font-sans text-[10px] uppercase tracking-[0.3em] transition-colors duration-300 ${fieldErrors.name ? 'text-[#f87171]/80' : 'text-[#D4D4D4]/40 group-focus-within:text-[#71B8E3]/70'}`} style={{ marginBottom: '8px' }}>
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        placeholder="John Doe"
                        onBlur={(e) => handleBlur("name", e.target.value)}
                        onChange={(e) => handleChange("name", e.target.value)}
                        className={`w-full bg-white/[0.04] border rounded-xl font-sans text-sm text-white placeholder:text-[#D4D4D4]/20 focus:outline-none transition-all duration-300 ${fieldErrors.name ? 'border-[#f87171]/40 bg-[#f87171]/[0.03] focus:border-[#f87171]/60' : 'border-white/[0.08] focus:border-[#71B8E3]/40 focus:bg-white/[0.06]'}`}
                        style={{ padding: '16px 20px' }}
                      />
                      <FieldError message={fieldErrors.name} />
                    </div>
                    <div className="relative group">
                      <label className={`block font-sans text-[10px] uppercase tracking-[0.3em] transition-colors duration-300 ${fieldErrors.email ? 'text-[#f87171]/80' : 'text-[#D4D4D4]/40 group-focus-within:text-[#71B8E3]/70'}`} style={{ marginBottom: '8px' }}>
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        placeholder="john@example.com"
                        onBlur={(e) => handleBlur("email", e.target.value)}
                        onChange={(e) => handleChange("email", e.target.value)}
                        className={`w-full bg-white/[0.04] border rounded-xl font-sans text-sm text-white placeholder:text-[#D4D4D4]/20 focus:outline-none transition-all duration-300 ${fieldErrors.email ? 'border-[#f87171]/40 bg-[#f87171]/[0.03] focus:border-[#f87171]/60' : 'border-white/[0.08] focus:border-[#71B8E3]/40 focus:bg-white/[0.06]'}`}
                        style={{ padding: '16px 20px' }}
                      />
                      <FieldError message={fieldErrors.email} />
                    </div>
                    <div className="relative group">
                      <label className="block font-sans text-[10px] uppercase tracking-[0.3em] text-[#D4D4D4]/40 group-focus-within:text-[#71B8E3]/70 transition-colors duration-300" style={{ marginBottom: '8px' }}>
                        Subject <span className="normal-case tracking-normal text-[#D4D4D4]/25">(optional)</span>
                      </label>
                      <input
                        type="text"
                        name="subject"
                        placeholder="What can we help you with?"
                        className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl font-sans text-sm text-white placeholder:text-[#D4D4D4]/20 focus:outline-none focus:border-[#71B8E3]/40 focus:bg-white/[0.06] transition-all duration-300"
                        style={{ padding: '16px 20px' }}
                      />
                    </div>
                    <div className="relative group">
                      <label className={`block font-sans text-[10px] uppercase tracking-[0.3em] transition-colors duration-300 ${fieldErrors.message ? 'text-[#f87171]/80' : 'text-[#D4D4D4]/40 group-focus-within:text-[#71B8E3]/70'}`} style={{ marginBottom: '8px' }}>
                        Message
                      </label>
                      <textarea
                        name="message"
                        placeholder="Tell us about your vision..."
                        rows={5}
                        onBlur={(e) => handleBlur("message", e.target.value)}
                        onChange={(e) => handleChange("message", e.target.value)}
                        className={`w-full bg-white/[0.04] border rounded-xl font-sans text-sm text-white placeholder:text-[#D4D4D4]/20 focus:outline-none transition-all duration-300 resize-none ${fieldErrors.message ? 'border-[#f87171]/40 bg-[#f87171]/[0.03] focus:border-[#f87171]/60' : 'border-white/[0.08] focus:border-[#71B8E3]/40 focus:bg-white/[0.06]'}`}
                        style={{ padding: '16px 20px' }}
                      />
                      <FieldError message={fieldErrors.message} />
                    </div>
                    <AnimatePresence>
                      {error && (
                        <motion.div
                          initial={{ opacity: 0, y: -6, height: 0 }}
                          animate={{ opacity: 1, y: 0, height: "auto" }}
                          exit={{ opacity: 0, y: -6, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="flex items-center gap-2 bg-[#f87171]/[0.06] border border-[#f87171]/20 rounded-xl overflow-hidden"
                          style={{ padding: '14px 20px' }}
                        >
                          <AlertCircle size={16} className="text-[#f87171] shrink-0" />
                          <span className="font-sans text-sm text-[#f87171]">{error}</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full md:w-auto md:self-end inline-flex items-center justify-center gap-3 bg-[#71B8E3] text-[#010F24] font-sans text-xs font-semibold tracking-[0.2em] uppercase rounded-xl hover:bg-white hover:shadow-[0_0_30px_rgba(113,184,227,0.15)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{ padding: '16px 36px', marginTop: '8px' }}
                    >
                      {loading ? "Sending..." : "Send Message"} {!loading && <ArrowUpRight size={16} strokeWidth={2.5} />}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
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
