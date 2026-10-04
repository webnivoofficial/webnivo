"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  BriefcaseBusiness,
  Building2,
  CalendarCheck2,
  Camera,
  Check,
  ChevronDown,
  ChevronRight,
  Cloud,
  Database,
  ExternalLink,
  Mail,
  Menu,
  MessageCircle,
  Moon,
  MonitorSmartphone,
  ShoppingBag,
  Sparkles,
  Sun,
  Wrench,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { type FormEvent, useEffect, useState } from "react";

import {
  ecosystemNodes,
  faqItems,
  formServiceOptions,
  navItems,
  processSteps,
  projects,
  services,
  siteConfig,
  whyWebNivo,
} from "@/lib/site-data";

const sectionReveal = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6, ease: "easeOut" as const },
};

const serviceIcons = [
  Building2,
  ShoppingBag,
  Sparkles,
  CalendarCheck2,
  BriefcaseBusiness,
  Database,
  BadgeCheck,
  Cloud,
  Wrench,
  BarChart3,
  MonitorSmartphone,
];

const stepList = [
  { label: "Tell us about yourself", key: "about" },
  { label: "Your business", key: "business" },
  { label: "Project needs", key: "needs" },
  { label: "Project goals", key: "details" },
  { label: "Contact method", key: "contact" },
];

function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem("web-nivo-theme");
    const preferredDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialTheme = stored === "light" || stored === "dark" ? stored : preferredDark ? "dark" : "light";
    setTheme(initialTheme);
    document.documentElement.dataset.theme = initialTheme;
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("web-nivo-theme", theme);
  }, [mounted, theme]);

  return (
    <button
      type="button"
      className="theme-toggle"
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      onClick={() => setTheme((current) => (current === "dark" ? "light" : "dark"))}
    >
      <motion.span
        key={theme}
        initial={{ rotate: -35, opacity: 0.5, scale: 0.85 }}
        animate={{ rotate: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.25 }}
        className="flex h-8 w-8 items-center justify-center"
      >
        {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
      </motion.span>
    </button>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <p className="section-kicker">{eyebrow}</p>
      <h2 className="mt-4 text-[clamp(2.4rem,6vw,4.2rem)] font-semibold tracking-[-0.06em] text-[var(--text)] leading-[0.96]">
        {title}
      </h2>
      <p className="mx-auto mt-4 max-w-xl text-sm text-[var(--muted)] sm:text-base lg:text-lg">{description}</p>
    </div>
  );
}

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 pt-3">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav className="glass-panel flex items-center justify-between rounded-full px-3 py-2 sm:px-4">
          <Link href="#home" className="flex items-center gap-3" aria-label="Web Nivo home">
            <Image src="/web-nivo-logo.png" alt="Web Nivo logo" width={120} height={44} priority className="h-8 w-auto sm:h-10" />
          </Link>

          <div className="hidden items-center gap-7 md:flex">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="nav-link">
                {item.label}
              </a>
            ))}
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <ThemeToggle />
            <a href="#contact" className="brand-button inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium text-white">
              Start a Project
              <ArrowRight size={16} />
            </a>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button
              type="button"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--line)] bg-[var(--panel)] text-[var(--text)]"
              aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.2 }}
            className="mx-4 mt-3 rounded-[2rem] border border-[var(--line)] bg-[var(--panel)] p-4 shadow-[var(--shadow-soft)] backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-1">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="rounded-2xl px-4 py-3 text-base font-medium text-[var(--text)] transition hover:bg-[var(--surface-alt)]"
                  onClick={closeMenu}
                >
                  {item.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={closeMenu}
                className="brand-button mt-3 inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-medium text-white"
              >
                Start a Project
                <ArrowRight size={16} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function Hero() {
  return (
    <section id="home" className="section-shell relative overflow-hidden pt-16 sm:pt-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(173,123,78,0.18),transparent_35%),radial-gradient(circle_at_80%_20%,_rgba(201,170,143,0.18),transparent_25%)]" />
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
        <motion.div {...sectionReveal} className="relative z-10">
          <p className="section-kicker">WEB NIVO</p>
          <h1 className="mt-6 max-w-[12ch] text-[clamp(3.2rem,9vw,7rem)] font-semibold leading-[0.9] tracking-[-0.08em] text-[var(--text)]">
            Your business needs more than a website.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-[var(--muted)] sm:text-lg sm:leading-8">
            Web Nivo helps businesses create, connect, launch, and grow the digital systems that support visibility, sales, bookings, operations, and long-term growth.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#contact" className="brand-button inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-base font-medium text-white">
              Start a Project
              <ArrowRight size={17} />
            </a>
            <a href="#services" className="secondary-button inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-base font-medium text-[var(--text)]">
              Explore What We Do
            </a>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-5 text-sm text-[var(--muted)]">
            <div className="flex items-center gap-2">
              <span className="flex h-2.5 w-2.5 rounded-full bg-[var(--accent)]" />
              Websites
            </div>
            <div className="flex items-center gap-2">
              <span className="flex h-2.5 w-2.5 rounded-full bg-[var(--accent)]" />
              E-commerce
            </div>
            <div className="flex items-center gap-2">
              <span className="flex h-2.5 w-2.5 rounded-full bg-[var(--accent)]" />
              Custom systems
            </div>
          </div>
        </motion.div>

        <motion.div {...sectionReveal} transition={{ ...sectionReveal.transition, delay: 0.1 }} className="relative z-10">
          <div className="hero-visual">
            <div className="hero-glow" />
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              className="absolute left-8 top-10 w-48 rounded-[1.5rem] border border-[var(--line)] bg-[var(--panel)] p-4 shadow-[var(--shadow-soft)]"
            >
              <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.22em] text-[var(--muted)]">
                <span>Website</span>
                <span className="rounded-full bg-[var(--chip)] px-2 py-1 text-[9px] text-[var(--text)]">Live</span>
              </div>
              <div className="mt-4 space-y-2">
                <div className="h-2.5 w-24 rounded-full bg-[var(--surface-alt)]" />
                <div className="h-2.5 w-16 rounded-full bg-[var(--surface-alt)]" />
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <div className="h-12 rounded-xl bg-[var(--surface-alt)]" />
                  <div className="h-12 rounded-xl bg-[var(--surface-alt)]" />
                </div>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 6.8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute right-6 top-12 w-44 rounded-[1.5rem] border border-[var(--line)] bg-[var(--panel)] p-4 shadow-[var(--shadow-soft)]"
            >
              <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.22em] text-[var(--muted)]">
                <span>Auth</span>
                <span className="flex h-2.5 w-2.5 rounded-full bg-[var(--accent)]" />
              </div>
              <div className="mt-4 space-y-3">
                <div className="h-8 rounded-xl bg-[var(--surface-alt)]" />
                <div className="h-8 rounded-xl bg-[var(--surface-alt)]" />
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute left-12 bottom-10 w-52 rounded-[1.5rem] border border-[var(--line)] bg-[var(--panel)] p-4 shadow-[var(--shadow-soft)]"
            >
              <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.22em] text-[var(--muted)]">
                <span>Bookings</span>
                <span className="text-[var(--text)]">12</span>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2">
                <div className="h-10 rounded-xl bg-[var(--surface-alt)]" />
                <div className="h-10 rounded-xl bg-[var(--surface-alt)]" />
                <div className="h-10 rounded-xl bg-[var(--surface-alt)]" />
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-8 right-10 w-40 rounded-[1.5rem] border border-[var(--line)] bg-[var(--panel)] p-4 shadow-[var(--shadow-soft)]"
            >
              <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.22em] text-[var(--muted)]">
                <span>Data</span>
                <span className="rounded-full bg-[var(--surface-alt)] px-2 py-1 text-[9px] text-[var(--text)]">Sync</span>
              </div>
              <div className="mt-4 flex items-center gap-2">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <div key={idx} className="h-12 flex-1 rounded-t-xl bg-[var(--surface-alt)]" style={{ height: `${18 + idx * 12}px` }} />
                ))}
              </div>
            </motion.div>

            <div className="absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[var(--line)] bg-[var(--panel)] shadow-[var(--shadow-soft)] backdrop-blur-xl">
              <div className="flex h-full flex-col items-center justify-center text-center">
                <div className="mb-2 h-9 w-9 rounded-full bg-[var(--surface-alt)] ring-4 ring-[var(--beige-ring)]" />
                <span className="text-[10px] uppercase tracking-[0.30em] text-[var(--muted)]">Business</span>
                <span className="mt-2 text-xl font-semibold tracking-[-0.05em] text-[var(--text)]">Web Nivo</span>
              </div>
            </div>

            <div className="absolute inset-0 rounded-[2rem] border border-[var(--line)] bg-[linear-gradient(135deg,rgba(255,255,255,0.44),rgba(255,255,255,0.02))]" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function MissionSection() {
  return (
    <section className="section-shell">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
        <motion.div {...sectionReveal} className="rounded-[2rem] border border-[var(--line)] bg-[var(--panel)] p-6 sm:p-8">
          <p className="section-kicker">A broader view</p>
          <h2 className="mt-5 text-3xl font-semibold tracking-[-0.06em] text-[var(--text)] sm:text-5xl">
            A website is only the beginning.
          </h2>
          <p className="mt-4 max-w-lg text-base leading-7 text-[var(--muted)] sm:text-lg">
            The real challenge is building a digital presence that connects your message, systems, customers, and growth opportunities into one clear experience.
          </p>
        </motion.div>

        <motion.div {...sectionReveal} transition={{ ...sectionReveal.transition, delay: 0.08 }} className="rounded-[2rem] border border-[var(--line)] bg-[var(--panel)] p-5 sm:p-6">
          <div className="space-y-4">
            {[
              "Website",
              "Database",
              "Authentication",
              "Bookings",
              "Marketing",
              "Maintenance",
              "Growth",
            ].map((item, index) => (
              <div key={item} className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--line)] bg-[var(--surface-alt)] text-xs font-medium text-[var(--text)]">
                  {index + 1}
                </div>
                <div className="flex-1 border-b border-dashed border-[var(--line)]" />
                <div className="rounded-full border border-[var(--line)] bg-[var(--surface)] px-4 py-2 text-sm font-medium text-[var(--text)]">
                  {item}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function WhySection() {
  return (
    <section className="section-shell">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Why Web Nivo"
          title="Businesses need a digital partner, not just a one-off build."
          description="A digital presence is rarely one problem. It is usually a combination of website design, information systems, customer journeys, operations, and visibility."
        />

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {whyWebNivo.map((item, idx) => (
            <motion.div
              key={item}
              {...sectionReveal}
              transition={{ ...sectionReveal.transition, delay: idx * 0.05 }}
              className="rounded-[1.5rem] border border-[var(--line)] bg-[var(--panel)] p-5 shadow-[var(--shadow-soft)]"
            >
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-full border border-[var(--line)] bg-[var(--surface-alt)] text-[var(--accent)]">
                <Check size={18} />
              </div>
              <p className="text-lg font-medium leading-7 text-[var(--text)]">{item}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServicesSection() {
  return (
    <section id="services" className="section-shell">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Services"
          title="A complete digital capability built around your business."
          description="From websites and storefronts to databases, marketing, maintenance, and custom functionality, Web Nivo helps connect the digital pieces your business needs."
        />

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service, index) => {
            const Icon = serviceIcons[index % serviceIcons.length];

            return (
              <motion.article
                key={service.title}
                {...sectionReveal}
                transition={{ ...sectionReveal.transition, delay: index * 0.04 }}
                whileHover={{ y: -6 }}
                className="group rounded-[1.6rem] border border-[var(--line)] bg-[var(--panel)] p-5 shadow-[var(--shadow-soft)]"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--surface-alt)] text-[var(--accent)] transition group-hover:scale-110 group-hover:text-[var(--text)]">
                    <Icon size={22} />
                  </div>
                  <div className="rounded-full border border-[var(--line)] bg-[var(--surface)] px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] text-[var(--muted)]">
                    0{index + 1}
                  </div>
                </div>
                <h3 className="mt-6 text-xl font-semibold tracking-[-0.05em] text-[var(--text)]">{service.title}</h3>
                <p className="mt-3 text-base leading-7 text-[var(--muted)]">{service.description}</p>
                <p className="mt-4 text-sm leading-6 text-[var(--muted)] opacity-0 transition duration-200 group-hover:opacity-100">
                  {service.detail}
                </p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ProcessSection() {
  return (
    <section id="process" className="section-shell">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="How we work"
          title="A process built for clarity, momentum, and realistic progress."
          description="Web Nivo is not a one-step order-and-deliver workflow. The process is designed to understand the business and build what supports it long term."
        />

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {processSteps.map((step, index) => (
            <motion.div
              key={step.title}
              {...sectionReveal}
              transition={{ ...sectionReveal.transition, delay: index * 0.04 }}
              className="rounded-[1.5rem] border border-[var(--line)] bg-[var(--panel)] p-5 shadow-[var(--shadow-soft)]"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">0{index + 1}</span>
                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--line)] bg-[var(--surface-alt)] text-xs font-medium text-[var(--text)]">
                  {index + 1}
                </span>
              </div>
              <h3 className="mt-5 text-2xl font-semibold tracking-[-0.05em] text-[var(--text)]">{step.title}</h3>
              <p className="mt-3 text-base leading-7 text-[var(--muted)]">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WorkSection() {
  return (
    <section id="work" className="section-shell">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Work"
          title="Selected digital concepts and demo experiences."
          description="Portfolio projects are easy to swap out later, while the structure stays polished, flexible, and ready for future links and real work."
        />

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {projects.map((project, index) => (
            <motion.article
              key={project.title}
              {...sectionReveal}
              transition={{ ...sectionReveal.transition, delay: index * 0.05 }}
              whileHover={{ y: -8 }}
              className="overflow-hidden rounded-[1.8rem] border border-[var(--line)] bg-[var(--panel)] shadow-[var(--shadow-soft)]"
            >
              <div className={`relative h-60 bg-gradient-to-br ${project.accent}`}>
                <div className="absolute inset-4 rounded-[1.4rem] border border-white/40 bg-white/20 backdrop-blur-sm" />
                <div className="absolute left-6 top-6 rounded-full border border-white/40 bg-white/30 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-[var(--text)]">
                  {project.category}
                </div>
              </div>
              <div className="p-5">
                <p className="text-xs uppercase tracking-[0.22em] text-[var(--muted)]">{project.category}</p>
                <h3 className="mt-3 text-2xl font-semibold tracking-[-0.05em] text-[var(--text)]">{project.title}</h3>
                <p className="mt-3 text-base leading-7 text-[var(--muted)]">{project.description}</p>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-[var(--accent)]"
                >
                  View Project
                  <ExternalLink size={15} />
                </a>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <a href="#contact" className="secondary-button inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-base font-medium text-[var(--text)]">
            Have something different in mind?
            <ChevronRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  const [activeNode, setActiveNode] = useState(0);

  return (
    <section id="about" className="section-shell">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
        <motion.div {...sectionReveal} className="rounded-[2rem] border border-[var(--line)] bg-[var(--panel)] p-6 sm:p-8">
          <p className="section-kicker">About Web Nivo</p>
          <h2 className="mt-5 text-3xl font-semibold tracking-[-0.06em] text-[var(--text)] sm:text-5xl">
            Helping businesses build a digital presence that actually supports growth.
          </h2>
          <p className="mt-4 text-base leading-7 text-[var(--muted)] sm:text-lg">
            Web Nivo exists to help businesses establish their online presence, solve practical digital problems, and create systems that work together rather than in isolation.
          </p>
          <div className="mt-6 space-y-4">
            <div className="flex items-start gap-3">
              <div className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-[var(--surface-alt)] text-[var(--accent)]">
                <Check size={14} />
              </div>
              <p className="text-base text-[var(--muted)]">Clear thinking around brand, systems, and customer experience.</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-[var(--surface-alt)] text-[var(--accent)]">
                <Check size={14} />
              </div>
              <p className="text-base text-[var(--muted)]">Practical digital support across websites, products, operations, and growth.</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-[var(--surface-alt)] text-[var(--accent)]">
                <Check size={14} />
              </div>
              <p className="text-base text-[var(--muted)]">A realistic partnership that helps your business function better online.</p>
            </div>
          </div>
        </motion.div>

        <motion.div {...sectionReveal} transition={{ ...sectionReveal.transition, delay: 0.1 }} className="rounded-[2rem] border border-[var(--line)] bg-[var(--panel)] p-4 sm:p-6">
          <div className="hidden md:block">
            <div className="relative h-[420px] w-full overflow-hidden rounded-[1.8rem] border border-[var(--line)] bg-[radial-gradient(circle_at_center,_rgba(180,130,92,0.22),transparent_45%),linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0))]">
              <div className="absolute inset-0 opacity-50 [background-image:linear-gradient(rgba(184,153,129,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(184,153,129,0.12)_1px,transparent_1px)] [background-size:36px_36px]" />

              {ecosystemNodes.map((node, index) => {
                const positions = [
                  { top: "7%", left: "48%" },
                  { top: "23%", left: "10%" },
                  { top: "22%", left: "76%" },
                  { top: "47%", left: "7%" },
                  { top: "45%", left: "79%" },
                  { top: "69%", left: "18%" },
                  { top: "70%", left: "72%" },
                  { top: "86%", left: "50%" },
                ];

                const position = positions[index];

                return (
                  <motion.button
                    key={node.name}
                    type="button"
                    onMouseEnter={() => setActiveNode(index)}
                    onFocus={() => setActiveNode(index)}
                    className="absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--panel)] px-3 py-2 text-xs font-medium uppercase tracking-[0.18em] text-[var(--text)] shadow-[var(--shadow-soft)]"
                    style={{ top: position.top, left: position.left }}
                    whileHover={{ scale: 1.04 }}
                  >
                    {node.name}
                  </motion.button>
                );
              })}

              <div className="absolute left-1/2 top-1/2 flex h-32 w-32 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--line)] bg-[var(--panel)] text-center shadow-[var(--shadow-soft)]">
                <div>
                  <div className="mx-auto h-9 w-9 rounded-full bg-[var(--surface-alt)] ring-4 ring-[var(--beige-ring)]" />
                  <p className="mt-3 text-[10px] uppercase tracking-[0.28em] text-[var(--muted)]">Your</p>
                  <p className="text-lg font-semibold tracking-[-0.05em] text-[var(--text)]">Business</p>
                </div>
              </div>

              <div className="absolute bottom-4 left-1/2 max-w-xs -translate-x-1/2 rounded-2xl border border-[var(--line)] bg-[var(--panel)] px-4 py-3 text-center shadow-[var(--shadow-soft)]">
                <p className="text-[10px] uppercase tracking-[0.22em] text-[var(--muted)]">Connected focus</p>
                <p className="mt-2 text-sm text-[var(--text)]">{ecosystemNodes[activeNode].description}</p>
              </div>
            </div>
          </div>

          <div className="grid gap-3 md:hidden">
            {ecosystemNodes.map((node, index) => (
              <button
                key={node.name}
                type="button"
                onClick={() => setActiveNode(index)}
                className={`flex items-center justify-between rounded-2xl border px-3 py-2.5 text-left text-xs font-medium uppercase tracking-[0.18em] ${
                  activeNode === index
                    ? "border-[var(--accent)] bg-[var(--surface-alt)] text-[var(--text)]"
                    : "border-[var(--line)] bg-[var(--surface)] text-[var(--muted)]"
                }`}
              >
                <span>{node.name}</span>
                <span className="h-2.5 w-2.5 rounded-full bg-[var(--accent)]" />
              </button>
            ))}
            <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] px-4 py-3 text-sm text-[var(--text)]">
              {ecosystemNodes[activeNode].description}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="section-shell">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="FAQ"
          title="Questions people usually ask before starting."
          description="A clear conversation is usually the easiest way to decide what is right for a project and what kind of digital support a business actually needs."
        />

        <div className="mt-10 space-y-3">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div key={item.question} className="overflow-hidden rounded-[1.5rem] border border-[var(--line)] bg-[var(--panel)] shadow-[var(--shadow-soft)]" initial={false}>
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  aria-expanded={isOpen}
                >
                  <span className="text-base font-medium text-[var(--text)] sm:text-lg">{item.question}</span>
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--line)] bg-[var(--surface-alt)] text-[var(--text)]">
                    <ChevronDown size={16} className={isOpen ? "rotate-180 transition-transform" : "transition-transform"} />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.22, ease: "easeOut" }}
                    >
                      <p className="px-5 pb-5 text-base leading-7 text-[var(--muted)]">{item.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ProjectInquiry() {
  type FormState = {
    name: string;
    company: string;
    email: string;
    whatsapp: string;
    businessType: string;
    currentWebsite: string;
    businessDescription: string;
    social: string;
    selectedServices: string[];
    detail: string;
    preferredContact: string;
  };

  const initialState: FormState = {
    name: "",
    company: "",
    email: "",
    whatsapp: "",
    businessType: "",
    currentWebsite: "",
    businessDescription: "",
    social: "",
    selectedServices: [],
    detail: "",
    preferredContact: "WhatsApp",
  };

  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitted, setSubmitted] = useState(false);

  const updateField = (field: keyof FormState, value: string | string[]) => {
    setFormData((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: "" }));
  };

  const validateStep = () => {
    const nextErrors: Partial<Record<keyof FormState, string>> = {};

    if (currentStep === 0) {
      if (!formData.name.trim()) nextErrors.name = "Please enter your name.";
      if (!formData.company.trim()) nextErrors.company = "Please enter your business or company name.";
    }

    if (currentStep === 1) {
      if (!formData.businessType.trim()) nextErrors.businessType = "Please tell us your business type.";
      if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) nextErrors.email = "Please enter a valid email address.";
      if (formData.currentWebsite && !/^https?:\/\//i.test(formData.currentWebsite)) nextErrors.currentWebsite = "Please enter a valid website URL.";
    }

    if (currentStep === 2) {
      if (formData.selectedServices.length === 0) nextErrors.selectedServices = "Please select at least one service.";
      if (!formData.businessDescription.trim()) nextErrors.businessDescription = "Please tell us a bit about your business.";
    }

    if (currentStep === 3) {
      if (!formData.detail.trim()) nextErrors.detail = "Please tell us what you need.";
      if (formData.social && !/^https?:\/\//i.test(formData.social)) nextErrors.social = "Please enter a valid social profile URL.";
    }

    if (currentStep === 4) {
      if (!formData.preferredContact.trim()) nextErrors.preferredContact = "Please choose a preferred contact method.";
      if (formData.preferredContact === "WhatsApp" && !formData.whatsapp.trim()) {
        nextErrors.whatsapp = "Please add a WhatsApp number.";
      }
      if (formData.preferredContact === "Email" && !formData.email.trim()) {
        nextErrors.email = "Please add an email address.";
      }
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const stepIsValid = (step: number) => {
    if (step === 0) return Boolean(formData.name.trim() && formData.company.trim());
    if (step === 1) return Boolean(formData.businessType.trim());
    if (step === 2) return formData.selectedServices.length > 0 && Boolean(formData.businessDescription.trim());
    if (step === 3) return Boolean(formData.detail.trim());
    if (step === 4) return Boolean(formData.preferredContact.trim());
    return true;
  };

  const handleNext = () => {
    if (!validateStep()) return;
    setCurrentStep((step) => Math.min(step + 1, stepList.length - 1));
  };

  const handleBack = () => setCurrentStep((step) => Math.max(step - 1, 0));

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validateStep()) return;
    setSubmitted(true);
  };

  const toggleService = (service: string) => {
    setFormData((current) => {
      const exists = current.selectedServices.includes(service);
      return {
        ...current,
        selectedServices: exists ? current.selectedServices.filter((item) => item !== service) : [...current.selectedServices, service],
      };
    });
    setErrors((current) => ({ ...current, selectedServices: "" }));
  };

  if (submitted) {
    return (
      <div className="rounded-[2rem] border border-[var(--line)] bg-[var(--panel)] p-8 text-center shadow-[var(--shadow-soft)]">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[var(--surface-alt)] text-[var(--accent)]">
          <Check size={28} />
        </div>
        <h3 className="mt-5 text-3xl font-semibold tracking-[-0.06em] text-[var(--text)]">Thanks, {formData.name || "there"}.</h3>
        <p className="mt-3 text-base leading-7 text-[var(--muted)]">
          Your project inquiry has been prepared. Web Nivo will review your details and get back to you soon.
        </p>
        <button
          type="button"
          onClick={() => {
            setSubmitted(false);
            setCurrentStep(0);
            setFormData(initialState);
          }}
          className="secondary-button mt-6 inline-flex items-center gap-2 rounded-full px-6 py-3 text-base font-medium text-[var(--text)]"
        >
          Submit another inquiry
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-[2rem] border border-[var(--line)] bg-[var(--panel)] p-5 shadow-[var(--shadow-soft)] sm:p-6">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <p className="section-kicker">Project inquiry</p>
          <h3 className="mt-2 text-2xl font-semibold tracking-[-0.05em] text-[var(--text)]">Start your project</h3>
        </div>
        <div className="rounded-full border border-[var(--line)] bg-[var(--surface)] px-3 py-1.5 text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
          Step {currentStep + 1} / {stepList.length}
        </div>
      </div>

      <div className="mb-6 grid gap-2 sm:grid-cols-5">
        {stepList.map((step, index) => (
          <div key={step.key} className="flex items-center gap-2">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full border text-xs font-medium ${
                index === currentStep
                  ? "border-[var(--accent)] bg-[var(--surface-alt)] text-[var(--text)]"
                  : stepIsValid(index)
                    ? "border-[var(--line)] bg-[var(--surface-alt)] text-[var(--text)]"
                    : "border-[var(--line)] bg-[var(--surface)] text-[var(--muted)]"
              }`}
            >
              {index + 1}
            </div>
            <span className="hidden text-[10px] uppercase tracking-[0.16em] text-[var(--muted)] sm:block">{step.label}</span>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {currentStep === 0 && (
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="field-label" htmlFor="name">Name</label>
              <input id="name" className="field-input" value={formData.name} onChange={(event) => updateField("name", event.target.value)} placeholder="Your name" />
              {errors.name && <p className="field-error">{errors.name}</p>}
            </div>
            <div>
              <label className="field-label" htmlFor="company">Business / company name</label>
              <input id="company" className="field-input" value={formData.company} onChange={(event) => updateField("company", event.target.value)} placeholder="Business name" />
              {errors.company && <p className="field-error">{errors.company}</p>}
            </div>
          </div>
        )}

        {currentStep === 1 && (
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="field-label" htmlFor="businessType">Business type</label>
              <input id="businessType" className="field-input" value={formData.businessType} onChange={(event) => updateField("businessType", event.target.value)} placeholder="Restaurant, clinic, retail, service business..." />
              {errors.businessType && <p className="field-error">{errors.businessType}</p>}
            </div>
            <div>
              <label className="field-label" htmlFor="email">Email</label>
              <input id="email" className="field-input" value={formData.email} onChange={(event) => updateField("email", event.target.value)} placeholder="hello@example.com" type="email" />
              {errors.email && <p className="field-error">{errors.email}</p>}
            </div>
            <div className="md:col-span-2">
              <label className="field-label" htmlFor="currentWebsite">Current website (optional)</label>
              <input id="currentWebsite" className="field-input" value={formData.currentWebsite} onChange={(event) => updateField("currentWebsite", event.target.value)} placeholder="https://yourwebsite.com" />
              {errors.currentWebsite && <p className="field-error">{errors.currentWebsite}</p>}
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-4">
            <div>
              <label className="field-label">Which services do you need?</label>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {formServiceOptions.map((option) => {
                  const checked = formData.selectedServices.includes(option);
                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => toggleService(option)}
                      className={`flex items-center justify-between rounded-2xl border px-4 py-3 text-left text-sm font-medium transition ${
                        checked
                          ? "border-[var(--accent)] bg-[var(--surface-alt)] text-[var(--text)]"
                          : "border-[var(--line)] bg-[var(--surface)] text-[var(--muted)]"
                      }`}
                    >
                      <span>{option}</span>
                      {checked ? <Check size={16} /> : null}
                    </button>
                  );
                })}
              </div>
              {errors.selectedServices && <p className="field-error">{errors.selectedServices}</p>}
            </div>

            <div>
              <label className="field-label" htmlFor="businessDescription">Describe your business</label>
              <textarea id="businessDescription" className="field-input min-h-[120px]" value={formData.businessDescription} onChange={(event) => updateField("businessDescription", event.target.value)} placeholder="Tell us a bit about your business, offer, audience, and current situation." />
              {errors.businessDescription && <p className="field-error">{errors.businessDescription}</p>}
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-4">
            <div>
              <label className="field-label" htmlFor="detail">What are your project goals?</label>
              <textarea id="detail" className="field-input min-h-[150px]" value={formData.detail} onChange={(event) => updateField("detail", event.target.value)} placeholder="Share the idea, the challenge, the audience, and any requirements or constraints." />
              {errors.detail && <p className="field-error">{errors.detail}</p>}
            </div>
            <div>
              <label className="field-label" htmlFor="social">Instagram / social link (optional)</label>
              <input id="social" className="field-input" value={formData.social} onChange={(event) => updateField("social", event.target.value)} placeholder="https://instagram.com/yourprofile" />
              {errors.social && <p className="field-error">{errors.social}</p>}
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="field-label" htmlFor="whatsapp">WhatsApp number</label>
              <input id="whatsapp" className="field-input" value={formData.whatsapp} onChange={(event) => updateField("whatsapp", event.target.value)} placeholder="0301 2542026" />
              {errors.whatsapp && <p className="field-error">{errors.whatsapp}</p>}
            </div>
            <div>
              <label className="field-label">Preferred contact method</label>
              <div className="mt-2 flex gap-2">
                {['WhatsApp', 'Email'].map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => updateField("preferredContact", option)}
                    className={`flex-1 rounded-2xl border px-4 py-3 text-sm font-medium transition ${
                      formData.preferredContact === option
                        ? "border-[var(--accent)] bg-[var(--surface-alt)] text-[var(--text)]"
                        : "border-[var(--line)] bg-[var(--surface)] text-[var(--muted)]"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col-reverse gap-3 border-t border-[var(--line)] pt-5 sm:flex-row sm:justify-between">
          <button
            type="button"
            className="secondary-button inline-flex items-center justify-center rounded-full px-5 py-3 text-base font-medium text-[var(--text)]"
            onClick={handleBack}
            disabled={currentStep === 0}
          >
            Back
          </button>
          {currentStep < stepList.length - 1 ? (
            <button
              type="button"
              onClick={handleNext}
              className="brand-button inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-base font-medium text-white"
            >
              Continue
              <ArrowRight size={16} />
            </button>
          ) : (
            <button type="submit" className="brand-button inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-base font-medium text-white">
              Send inquiry
              <ArrowRight size={16} />
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

function ContactSection() {
  return (
    <section id="contact" className="section-shell pb-24">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:px-8">
        <motion.div {...sectionReveal} className="rounded-[2rem] border border-[var(--line)] bg-[var(--panel)] p-6 sm:p-8">
          <p className="section-kicker">Let&apos;s talk</p>
          <h2 className="mt-5 text-3xl font-semibold tracking-[-0.06em] text-[var(--text)] sm:text-5xl">
            Let&apos;s build more than a website.
          </h2>
          <p className="mt-4 max-w-lg text-base leading-7 text-[var(--muted)] sm:text-lg">
            Whether you need a new online presence, a booking flow, a storefront, a database-backed system, or a custom digital solution, start the conversation with Web Nivo.
          </p>

          <div className="mt-8 space-y-4">
            <a href={siteConfig.whatsappLink} target="_blank" rel="noreferrer" className="contact-row">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--surface-alt)] text-[var(--accent)]">
                <MessageCircle size={18} />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">WhatsApp</p>
                <p className="mt-1 font-medium text-[var(--text)]">{siteConfig.whatsapp}</p>
              </div>
            </a>
            <a href={`mailto:${siteConfig.email}`} className="contact-row">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--surface-alt)] text-[var(--accent)]">
                <Mail size={18} />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">Email</p>
                <p className="mt-1 font-medium text-[var(--text)]">{siteConfig.email}</p>
              </div>
            </a>
            <a href={siteConfig.instagram} target="_blank" rel="noreferrer" className="contact-row">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--surface-alt)] text-[var(--accent)]">
                <Camera size={18} />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">Instagram</p>
                <p className="mt-1 font-medium text-[var(--text)]">@webnivoofficial</p>
              </div>
            </a>
          </div>
        </motion.div>

        <motion.div {...sectionReveal} transition={{ ...sectionReveal.transition, delay: 0.08 }}>
          <ProjectInquiry />
        </motion.div>
      </div>
    </section>
  );
}

function WhatsAppButton() {
  return (
    <a
      href={siteConfig.whatsappLink}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-5 right-5 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_20px_30px_rgba(37,211,102,0.25)] transition hover:-translate-y-0.5 hover:shadow-[0_20px_30px_rgba(37,211,102,0.35)] sm:bottom-8 sm:right-8"
      aria-label="Chat with Web Nivo on WhatsApp"
    >
      <MessageCircle size={24} />
    </a>
  );
}

function Footer() {
  return (
    <footer className="border-t border-[var(--line)] bg-[var(--bg-soft)]/90">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
        <div>
          <Image src="/web-nivo-logo.png" alt="Web Nivo logo" width={120} height={44} className="h-10 w-auto" />
          <p className="mt-4 max-w-md text-base leading-7 text-[var(--muted)]">
            Web Nivo helps businesses build and grow their digital presence through websites, applications, systems, and other digital solutions.
          </p>
        </div>

        <div className="flex flex-col gap-5 sm:flex-row sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">Navigate</p>
            <ul className="mt-4 space-y-2 text-sm text-[var(--text)]">
              {navItems.map((item) => (
                <li key={item.href}> 
                  <a href={item.href} className="nav-link inline-block">{item.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">Connect</p>
            <ul className="mt-4 space-y-2 text-sm text-[var(--text)]">
              <li><a href={siteConfig.whatsappLink} className="nav-link inline-block">WhatsApp</a></li>
              <li><a href={`mailto:${siteConfig.email}`} className="nav-link inline-block">Email</a></li>
              <li><a href={siteConfig.instagram} target="_blank" rel="noreferrer" className="nav-link inline-block">Instagram</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-[var(--line)] py-5 text-center text-sm text-[var(--muted)]">
        © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <div>
      <Navbar />
      <main>
        <Hero />
        <MissionSection />
        <WhySection />
        <ServicesSection />
        <ProcessSection />
        <WorkSection />
        <AboutSection />
        <FaqSection />
        <ContactSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
