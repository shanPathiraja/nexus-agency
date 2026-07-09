"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";

// ── Nav ──────────────────────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-ink/90 backdrop-blur-md border-b border-white/5" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 h-20 flex items-center justify-between">
        <a href="#" className="font-display text-2xl font-light tracking-[0.2em] text-cream">
          NEXUS
        </a>
        {/* Desktop */}
        <div className="hidden md:flex items-center gap-10">
          {["Work", "Services", "Process", "About"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="font-body text-sm text-slate hover:text-cream transition-colors tracking-wider uppercase"
            >
              {item}
            </a>
          ))}
        </div>
        <a
          href="#contact"
          className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 border border-gold/40 text-gold text-sm font-body tracking-wider uppercase hover:bg-gold hover:text-ink transition-all duration-300"
        >
          Start a Project
        </a>
        {/* Mobile */}
        <button
          className="md:hidden text-cream"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <div className={`w-6 h-0.5 bg-cream mb-1.5 transition-all ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <div className={`w-6 h-0.5 bg-cream mb-1.5 transition-all ${menuOpen ? "opacity-0" : ""}`} />
          <div className={`w-6 h-0.5 bg-cream transition-all ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-ink-2 border-t border-white/5 px-6 pb-6"
          >
            {["Work", "Services", "Process", "About", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="block py-3 text-slate hover:text-cream text-sm tracking-wider uppercase font-body border-b border-white/5"
                onClick={() => setMenuOpen(false)}
              >
                {item}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

// ── Hero ─────────────────────────────────────────────────────────────
function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const words = ["Strategy.", "Design.", "Code."];
  const [activeWord, setActiveWord] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveWord((prev) => (prev + 1) % words.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section ref={ref} className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* Grid background */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(to right, #F5F0E8 1px, transparent 1px),
                            linear-gradient(to bottom, #F5F0E8 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Gold accent orb */}
      <motion.div
        className="absolute top-1/4 right-0 w-[600px] h-[600px] rounded-full opacity-[0.07]"
        style={{
          background: "radial-gradient(circle, #E8C547 0%, transparent 70%)",
          y,
        }}
      />

      <motion.div
        style={{ opacity }}
        className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 pt-32 pb-20"
      >
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center gap-3 mb-12"
        >
          <div className="w-8 h-px bg-gold" />
          <span className="text-gold text-xs tracking-[0.3em] uppercase font-body">
            Digital Agency Est. 2019
          </span>
        </motion.div>

        {/* Headline */}
        <div className="overflow-hidden mb-6">
          <motion.h1
            initial={{ y: 120 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            className="font-display text-[clamp(52px,9vw,140px)] font-light leading-[0.9] tracking-tight text-cream"
          >
            We make
          </motion.h1>
        </div>
        <div className="overflow-hidden mb-6">
          <motion.div
            initial={{ y: 120 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.45 }}
            className="font-display text-[clamp(52px,9vw,140px)] font-light leading-[0.9] tracking-tight italic text-gold"
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={activeWord}
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -40, opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="inline-block"
              >
                {words[activeWord]}
              </motion.span>
            </AnimatePresence>
          </motion.div>
        </div>
        <div className="overflow-hidden mb-16">
          <motion.h1
            initial={{ y: 120 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
            className="font-display text-[clamp(52px,9vw,140px)] font-light leading-[0.9] tracking-tight text-cream"
          >
            brands win.
          </motion.h1>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex flex-col md:flex-row items-start md:items-center gap-8"
        >
          <p className="font-body text-slate text-base leading-relaxed max-w-sm">
            Full-service digital studio specialising in brand identity, web experiences, 
            and growth strategy for ambitious companies.
          </p>
          <a
            href="#work"
            className="group flex items-center gap-4 text-cream font-body text-sm tracking-wider uppercase"
          >
            <span className="w-12 h-px bg-gold group-hover:w-20 transition-all duration-300" />
            View Our Work
          </a>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="grid grid-cols-3 gap-8 mt-24 pt-10 border-t border-white/10 max-w-lg"
        >
          {[
            { num: "120+", label: "Projects Delivered" },
            { num: "98%", label: "Client Retention" },
            { num: "5yr", label: "In Business" },
          ].map(({ num, label }) => (
            <div key={label}>
              <div className="font-display text-3xl font-light text-gold mb-1">{num}</div>
              <div className="font-body text-xs text-slate tracking-wider uppercase">{label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-px h-12 bg-gradient-to-b from-gold/60 to-transparent"
        />
        <span className="font-body text-xs text-slate tracking-widest uppercase">Scroll</span>
      </motion.div>
    </section>
  );
}

// ── Work ─────────────────────────────────────────────────────────────
function WorkCard({ title, category, year, index }: {
  title: string; category: string; year: string; index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const colors = ["#E8C547", "#7B8CDE", "#6EE7B7", "#F9A8D4"];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="group relative cursor-pointer"
    >
      <div
        className="w-full aspect-[4/3] mb-5 overflow-hidden"
        style={{ background: "#111118" }}
      >
        {/* Placeholder project visual */}
        <div className="w-full h-full flex items-center justify-center relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-500"
            style={{ background: `radial-gradient(circle at 60% 40%, ${colors[index % colors.length]}, transparent 60%)` }}
          />
          <div className="text-center z-10">
            <div className="font-display text-6xl font-light text-white/10 group-hover:text-white/20 transition-colors duration-500">
              {String(index + 1).padStart(2, "0")}
            </div>
          </div>
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-gold/0 group-hover:bg-gold/5 transition-all duration-500 flex items-center justify-center">
            <span className="font-body text-xs tracking-widest uppercase text-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              View Case Study
            </span>
          </div>
        </div>
      </div>
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-display text-xl font-light text-cream group-hover:text-gold transition-colors duration-300">
            {title}
          </h3>
          <p className="font-body text-sm text-slate mt-1">{category}</p>
        </div>
        <span className="font-body text-xs text-slate/50 mt-1">{year}</span>
      </div>
    </motion.div>
  );
}

function Work() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  const projects = [
    { title: "Meridian Finance", category: "Brand Identity / Web", year: "2024" },
    { title: "Solara SaaS", category: "Web Design / Development", year: "2024" },
    { title: "Vero Skincare", category: "E-Commerce / UX", year: "2023" },
    { title: "Atlas Logistics", category: "Web App / Dashboard", year: "2023" },
    { title: "Koru Architecture", category: "Portfolio / CMS", year: "2023" },
    { title: "Pulse Media", category: "Brand / Social Strategy", year: "2022" },
  ];

  return (
    <section id="work" className="py-32 max-w-7xl mx-auto px-6 md:px-10">
      <div ref={ref} className="flex items-end justify-between mb-16">
        <div>
          <motion.span
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            className="font-body text-xs text-gold tracking-[0.3em] uppercase"
          >
            Selected Work
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-[clamp(36px,5vw,72px)] font-light text-cream mt-3 leading-[1]"
          >
            Recent Projects
          </motion.h2>
        </div>
        <motion.a
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
          href="#"
          className="hidden md:flex items-center gap-3 font-body text-sm text-slate hover:text-cream transition-colors tracking-wider uppercase"
        >
          All Work
          <span className="w-6 h-px bg-current" />
        </motion.a>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {projects.map((p, i) => (
          <WorkCard key={p.title} {...p} index={i} />
        ))}
      </div>
    </section>
  );
}

// ── Services ─────────────────────────────────────────────────────────
function Services() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const services = [
    {
      num: "01",
      title: "Brand Strategy",
      desc: "We dig into your market, audience, and ambition to define a positioning that makes you the obvious choice.",
      tags: ["Identity", "Naming", "Positioning"],
    },
    {
      num: "02",
      title: "Web Design",
      desc: "Conversion-focused designs that feel premium without feeling cold. Every pixel earns its place.",
      tags: ["UI Design", "Prototyping", "Design Systems"],
    },
    {
      num: "03",
      title: "Development",
      desc: "Next.js, Tailwind, and headless CMS — fast, maintainable, and built to scale with your business.",
      tags: ["Next.js", "TypeScript", "CMS"],
    },
    {
      num: "04",
      title: "Growth & SEO",
      desc: "From technical SEO to content strategy, we make sure the right people find you at the right time.",
      tags: ["SEO", "Analytics", "CRO"],
    },
  ];

  return (
    <section id="services" className="py-32 bg-ink-2">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div ref={ref} className="mb-20">
          <motion.span
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            className="font-body text-xs text-gold tracking-[0.3em] uppercase"
          >
            What We Do
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-[clamp(36px,5vw,72px)] font-light text-cream mt-3 leading-[1]"
          >
            Our Services
          </motion.h2>
        </div>

        <div className="divide-y divide-white/8">
          {services.map((s, i) => (
            <ServiceRow key={s.num} {...s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceRow({ num, title, desc, tags, index }: {
  num: string; title: string; desc: string; tags: string[]; index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -40 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group py-10 flex flex-col md:flex-row md:items-center gap-6 md:gap-0 cursor-pointer"
    >
      <span className="font-body text-xs text-slate/40 w-16 tracking-widest">{num}</span>
      <h3 className={`font-display text-3xl md:text-4xl font-light flex-1 transition-colors duration-300 ${hovered ? "text-gold italic" : "text-cream"}`}>
        {title}
      </h3>
      <p className="font-body text-sm text-slate leading-relaxed flex-1 max-w-sm">{desc}</p>
      <div className="flex gap-2 flex-wrap md:w-48 md:justify-end">
        {tags.map((tag) => (
          <span
            key={tag}
            className="font-body text-xs text-slate/60 border border-white/10 px-3 py-1 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

// ── Process ───────────────────────────────────────────────────────────
function Process() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const steps = [
    { title: "Discovery", desc: "Deep dive into your goals, audience, competitive landscape, and what success really looks like for your business." },
    { title: "Strategy", desc: "We map out a clear plan — positioning, architecture, and a roadmap that aligns creative and business outcomes." },
    { title: "Design", desc: "High-fidelity designs built for your users. We iterate fast with tight feedback loops until every detail is right." },
    { title: "Build", desc: "Production-grade code in Next.js. Clean, tested, and optimised for performance, SEO, and long-term maintainability." },
    { title: "Launch", desc: "We handle deployment, analytics setup, and go-live support. Then we stay on to optimise based on real-world data." },
  ];

  return (
    <section id="process" className="py-32 max-w-7xl mx-auto px-6 md:px-10">
      <div ref={ref} className="mb-20">
        <motion.span
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          className="font-body text-xs text-gold tracking-[0.3em] uppercase"
        >
          How We Work
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display text-[clamp(36px,5vw,72px)] font-light text-cream mt-3 leading-[1]"
        >
          Our Process
        </motion.h2>
      </div>

      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-[27px] md:left-1/2 top-0 bottom-0 w-px bg-white/8 hidden md:block" />

        <div className="space-y-16">
          {steps.map((step, i) => (
            <ProcessStep key={step.title} {...step} index={i} total={steps.length} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProcessStep({ title, desc, index, total }: {
  title: string; desc: string; index: number; total: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const isRight = index % 2 === 1;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.1 }}
      className={`relative flex items-center gap-10 ${isRight ? "md:flex-row-reverse" : "md:flex-row"} flex-row`}
    >
      {/* Number node */}
      <div className="relative z-10 flex-shrink-0 md:absolute md:left-1/2 md:-translate-x-1/2">
        <div className="w-14 h-14 rounded-full bg-ink border border-gold/30 flex items-center justify-center">
          <span className="font-display text-lg font-light text-gold">{index + 1}</span>
        </div>
      </div>

      {/* Content */}
      <div className={`flex-1 ${isRight ? "md:pr-28 md:text-right" : "md:pl-28"} pl-6 md:pl-0 md:w-1/2`}>
        <h3 className="font-display text-3xl font-light text-cream mb-3">{title}</h3>
        <p className="font-body text-sm text-slate leading-relaxed max-w-sm">{desc}</p>
      </div>
      <div className="hidden md:block flex-1" />
    </motion.div>
  );
}

// ── Testimonials ──────────────────────────────────────────────────────
function Testimonials() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  const testimonials = [
    {
      quote: "Nexus transformed how our brand shows up online. The results were immediate — our conversion rate jumped 34% in the first month.",
      author: "Sarah Chen",
      role: "CEO, Meridian Finance",
    },
    {
      quote: "Best agency we have ever worked with. They think like business partners, not just designers. Fast, sharp, and genuinely invested.",
      author: "James Okafor",
      role: "Founder, Solara",
    },
    {
      quote: "The website they built for us is not just beautiful — it actually works. Organic traffic up 180% in six months.",
      author: "Maria Santos",
      role: "CMO, Vero Skincare",
    },
  ];

  return (
    <section className="py-32 bg-ink-2 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div ref={ref} className="mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="font-display text-[clamp(36px,5vw,72px)] font-light text-cream leading-[1]"
          >
            What Clients Say
          </motion.h2>
        </div>
        <div className="grid md:grid-cols-3 gap-px bg-white/5">
          {testimonials.map((t, i) => (
            <TestimonialCard key={t.author} {...t} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ quote, author, role, index }: {
  quote: string; author: string; role: string; index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="bg-ink-2 p-10 group hover:bg-ink-3 transition-colors duration-300"
    >
      <div className="font-display text-5xl text-gold/30 mb-6 group-hover:text-gold/50 transition-colors">"</div>
      <p className="font-body text-slate-light text-base leading-relaxed mb-8 font-light">{quote}</p>
      <div>
        <div className="font-body text-sm text-cream font-medium">{author}</div>
        <div className="font-body text-xs text-slate mt-1 tracking-wide">{role}</div>
      </div>
    </motion.div>
  );
}

// ── CTA ───────────────────────────────────────────────────────────────
function CTA() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section id="contact" className="py-40 max-w-7xl mx-auto px-6 md:px-10">
      <div ref={ref} className="relative">
        {/* Gold line decoration */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full h-px bg-gradient-to-r from-gold via-gold/50 to-transparent mb-20 origin-left"
        />

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-16">
          <div className="flex-1">
            <motion.span
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              className="font-body text-xs text-gold tracking-[0.3em] uppercase"
            >
              Get In Touch
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-display text-[clamp(42px,6vw,96px)] font-light text-cream leading-[0.95] mt-4"
            >
              Ready to build<br />
              <span className="italic text-gold">something great?</span>
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex-shrink-0 max-w-sm"
          >
            <p className="font-body text-slate text-base leading-relaxed mb-10">
              Tell us about your project. We will get back to you within 24 hours with thoughts, ideas, and next steps.
            </p>
            <div className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Your name"
                className="w-full bg-transparent border-b border-white/15 pb-3 font-body text-sm text-cream placeholder:text-slate/40 outline-none focus:border-gold transition-colors"
              />
              <input
                type="email"
                placeholder="Your email"
                className="w-full bg-transparent border-b border-white/15 pb-3 font-body text-sm text-cream placeholder:text-slate/40 outline-none focus:border-gold transition-colors"
              />
              <textarea
                placeholder="Tell us about your project"
                rows={3}
                className="w-full bg-transparent border-b border-white/15 pb-3 font-body text-sm text-cream placeholder:text-slate/40 outline-none focus:border-gold transition-colors resize-none mt-2"
              />
              <button className="mt-4 w-full py-4 bg-gold text-ink font-body text-sm tracking-widest uppercase font-medium hover:bg-gold/90 active:bg-gold/80 transition-colors">
                Send Message
              </button>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="w-full h-px bg-gradient-to-r from-gold via-gold/50 to-transparent mt-20 origin-left"
        />
      </div>
    </section>
  );
}

// ── Footer ────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="border-t border-white/5 py-10 max-w-7xl mx-auto px-6 md:px-10">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <span className="font-display text-xl font-light tracking-[0.2em] text-cream/60">NEXUS</span>
        <p className="font-body text-xs text-slate/40 tracking-wider">
          Built with Next.js and Tailwind CSS
        </p>
        <div className="flex gap-6">
          {["Twitter", "LinkedIn", "Dribbble"].map((s) => (
            <a key={s} href="#" className="font-body text-xs text-slate/40 hover:text-gold transition-colors tracking-wider uppercase">
              {s}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

// ── Page ──────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <main className="bg-ink">
      <Nav />
      <Hero />
      <Work />
      <Services />
      <Process />
      <Testimonials />
      <CTA />
      <Footer />
    </main>
  );
}
