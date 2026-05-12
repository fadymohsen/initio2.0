"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, Variants } from "framer-motion";

const navLinks = [
  { title: "Home", href: "/" },
  { title: "About Us", href: "/who-we-are" },
  { title: "Our Process", href: "/process" },
  // { title: "Portfolio", href: "/portfolio" },
  { title: "Contact", href: "/contact" },
];

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const menuVariants: Variants = {
    closed: {
      clipPath: "circle(0px at calc(100% - 45px) 45px)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
        delay: 0.2
      }
    },
    open: {
      clipPath: "circle(150% at calc(100% - 45px) 45px)",
      transition: {
        type: "spring",
        stiffness: 20,
        restDelta: 2
      }
    }
  };

  const linkVariants: Variants = {
    closed: { y: 20, opacity: 0 },
    open: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1 + 0.3,
        ease: [0.21, 0.47, 0.32, 0.98],
        duration: 0.6
      }
    })
  };

  return (
    <header
      className="fixed top-0 left-0 w-full z-[100] flex justify-center box-border"
      style={{
        paddingTop: scrolled ? '12px' : '20px',
        paddingBottom: scrolled ? '12px' : '20px'
      }}
    >
      <div
        className={`w-full max-w-7xl flex items-center justify-between transition-all duration-500 ${
          scrolled
            ? "bg-white/90 backdrop-blur-xl shadow-lg"
            : "bg-transparent"
        }`}
        style={{
          paddingLeft: '24px',
          paddingRight: '24px',
          paddingTop: '12px',
          paddingBottom: '12px',
          borderRadius: '9999px',
          marginLeft: '16px',
          marginRight: '16px',
        }}
      >
        {/* Logo */}
        <Link href="/" className="relative z-[110] group flex items-center" onClick={() => setIsOpen(false)}>
          <Image
            src="/logo.png"
            alt="Initio"
            width={120}
            height={32}
            priority
            className={`h-8 w-auto transition-all duration-500 group-hover:opacity-80 ${
              scrolled ? "" : "brightness-0 invert"
            }`}
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-10">
          {navLinks.slice(1).map((link, idx) => (
            <Link 
              key={idx}
              href={link.href}
              className={`font-sans text-xs tracking-[0.2em] uppercase transition-colors duration-500 ${
                scrolled ? "text-[#010F24] hover:text-[#2D64AE]" : "text-white hover:text-[#71B8E3]"
              }`}
            >
              {link.title}
            </Link>
          ))}
          <Link 
            href="/contact"
            className={`px-8 py-3 text-xs font-sans tracking-[0.2em] uppercase transition-all duration-500 ${
              scrolled ? "text-[#2D64AE] hover:text-[#010F24]" : "text-[#71B8E3] hover:text-white"
            }`}
          >
            Start a Project
          </Link>
        </nav>

        {/* Mobile Hamburger */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden relative z-[110] w-12 h-12 flex flex-col items-end justify-center gap-2 focus:outline-none"
        >
          <motion.span
            animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 9 : 0, width: isOpen ? "100%" : "80%" }}
            className={`w-full h-[1.5px] block transition-all origin-center ${scrolled && !isOpen ? "bg-[#010F24]" : "bg-white"}`}
          />
          <motion.span
            animate={{ opacity: isOpen ? 0 : 1, width: isOpen ? "0%" : "60%" }}
            className={`w-3/4 h-[1.5px] block transition-all ${scrolled && !isOpen ? "bg-[#010F24]" : "bg-white"}`}
          />
          <motion.span
            animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -9 : 0, width: "100%" }}
            className={`w-full h-[1.5px] block transition-all origin-center ${scrolled && !isOpen ? "bg-[#010F24]" : "bg-white"}`}
          />
        </button>
      </div>

      {/* Mobile Full Screen Menu */}
      <motion.div
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        variants={menuVariants}
        className="fixed inset-0 bg-[#010F24] z-[105] flex flex-col justify-center items-center h-[100dvh] overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#2D64AE]/10 via-[#010F24] to-[#010F24] pointer-events-none" />
        
        <nav className="flex flex-col items-center gap-6 relative z-[110] w-full px-6">
          {navLinks.map((link, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={linkVariants}
              initial="closed"
              animate={isOpen ? "open" : "closed"}
              className="overflow-hidden"
            >
              <Link
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block font-serif text-2xl text-white hover:text-[#71B8E3] transition-colors duration-300 relative group text-center"
              >
                {link.title}
                <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-0 h-px bg-[#71B8E3] transition-all duration-500 group-hover:w-full" />
              </Link>
            </motion.div>
          ))}
        </nav>

        <motion.div 
          custom={navLinks.length}
          variants={linkVariants}
          initial="closed"
          animate={isOpen ? "open" : "closed"}
          className="absolute bottom-16 text-center z-[110]"
        >
          <p className="font-sans text-[10px] tracking-[0.4em] uppercase text-[#71B8E3] mb-4">Get in Touch</p>
          <a href="mailto:info@initio.sa" className="font-sans text-sm text-[#D4D4D4] hover:text-white transition-colors">info@initio.sa</a>
        </motion.div>
      </motion.div>
    </header>
  );
};
