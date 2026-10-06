"use client";

import { AnimatePresence, MotionConfig, motion } from "framer-motion";
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
import { type FormEvent, useEffect, useState, useSyncExternalStore } from "react";

import {
  digitalJourney,
  ecosystemNodes,
  faqItems,
  formServiceOptions,
  navItems,
  processSteps,
  projects,
  services,
  siteConfig,
} from "@/lib/site-data";

const sectionReveal = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.52, ease: [0.22, 1, 0.36, 1] as const },
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

function subscribeToTheme(onChange: () => void) {
  window.addEventListener("web-nivo-theme-change", onChange);
  return () => window.removeEventListener("web-nivo-theme-change", onChange);
}

function getThemeSnapshot(): "light" | "dark" {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

function getServerThemeSnapshot(): "light" | "dark" {
  return "light";
}

function ThemeToggle() {
  const theme = useSyncExternalStore(subscribeToTheme, getThemeSnapshot, getServerThemeSnapshot);
  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem("web-nivo-theme", nextTheme);
    window.dispatchEvent(new Event("web-nivo-theme-change"));
  };

  return (
    <button
      type="button"
      className="theme-toggle"
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      onClick={toggleTheme}
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
    <motion.div {...sectionReveal} className="mx-auto max-w-3xl text-center">
      <p className="section-kicker">{eyebrow}</p>
      <h2 className="mt-4 text-[clamp(2.5rem,6vw,4.5rem)] font-semibold tracking-[-0.065em] text-[var(--text)] leading-[0.94]">
        {title}
      </h2>
      <p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-[var(--muted)] sm:text-base sm:leading-7 lg:text-lg">{description}</p>
    </motion.div>
  );
}

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  useEffect(() => {
    if (menuOpen) return;

    let lastScrollY = window.scrollY;
    let direction: "up" | "down" | null = null;
    let directionTravel = 0;
    const scrollThreshold = 12;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY;

      if (currentScrollY <= 24) {
        setIsHidden(false);
        directionTravel = 0;
        direction = null;
      } else if (Math.abs(delta) > 0) {
        const nextDirection = delta > 0 ? "down" : "up";
        if (nextDirection !== direction) {
          direction = nextDirection;
          directionTravel = 0;
        }
        directionTravel += Math.abs(delta);

        if (directionTravel >= scrollThreshold) {
          setIsHidden(nextDirection === "down");
          directionTravel = 0;
        }
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      className={`site-header fixed inset-x-0 top-0 z-50 pt-3 ${isHidden ? "site-header-hidden" : ""}`}
      onFocusCapture={() => setIsHidden(false)}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav className="site-nav flex items-center justify-between rounded-full px-3 py-2 sm:px-4">
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
              aria-controls="mobile-navigation"
              onClick={() => {
                setIsHidden(false);
                setMenuOpen((open) => !open);
              }}
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-navigation"
            role="region"
            aria-label="Mobile navigation"
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
            Web Nivo designs and builds websites, online stores, booking tools, and custom applications—connected to the systems your business relies on.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#contact" className="brand-button group/cta inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 text-base font-semibold text-white">
              Start a Project
              <ArrowRight size={17} className="transition-transform duration-200 group-hover/cta:translate-x-1" />
            </a>
            <a href="#services" className="secondary-button inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-medium text-[var(--text)] sm:text-base">
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
            <svg
              aria-hidden="true"
              viewBox="0 0 580 580"
              className="pointer-events-none absolute inset-0 h-full w-full"
              fill="none"
            >
              <path d="M290 290 142 116M290 290 438 126M290 290 148 432M290 290 438 436" stroke="var(--accent)" strokeOpacity=".25" strokeWidth="1.5" strokeDasharray="5 7" />
              <circle cx="290" cy="290" r="126" stroke="var(--accent)" strokeOpacity=".12" />
              <circle cx="290" cy="290" r="178" stroke="var(--accent)" strokeOpacity=".08" strokeDasharray="3 8" />
            </svg>
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
          <p className="section-kicker">A connected foundation</p>
          <h2 className="mt-5 text-3xl font-semibold tracking-[-0.06em] text-[var(--text)] sm:text-5xl">
            Digital pieces work better together.
          </h2>
          <p className="mt-4 max-w-lg text-base leading-7 text-[var(--muted)] sm:text-lg">
            From the first customer visit to the tools behind daily operations, each part should feel connected.
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
          title="Thoughtful work, built around how you operate."
          description="A considered mix of design, engineering, and practical business thinking—before, during, and after launch."
        />

        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {digitalJourney.map((item, idx) => (
            <motion.div
              key={item.title}
              {...sectionReveal}
              transition={{ ...sectionReveal.transition, delay: idx * 0.05 }}
              className={`relative rounded-[1.5rem] border p-4 shadow-[var(--shadow-soft)] ${
                idx > 3
                  ? "border-[var(--accent)]/25 bg-[var(--surface-alt)]"
                  : "border-[var(--line)] bg-[var(--panel)]"
              }`}
            >
              <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-full border border-[var(--line)] bg-[var(--surface-alt)] text-xs font-semibold text-[var(--accent)]">
                0{idx + 1}
              </div>
              <p className="text-base font-semibold text-[var(--text)]">{item.title}</p>
              <p className="mt-2 text-sm leading-5 text-[var(--muted)]">{item.detail}</p>
              {idx < digitalJourney.length - 1 && (
                <ArrowRight aria-hidden="true" size={14} className="absolute -right-3 top-1/2 z-10 hidden -translate-y-1/2 text-[var(--accent)] xl:block" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BusinessFitSection() {
  const businessTypes = [
    {
      icon: Building2,
      title: "Restaurants",
      detail: "Brand-led websites, digital menus, reservations, and ordering.",
    },
    {
      icon: ShoppingBag,
      title: "Retail",
      detail: "Online stores, product catalogs, and connected commerce tools.",
    },
    {
      icon: CalendarCheck2,
      title: "Service businesses",
      detail: "Booking flows, lead-generation websites, and customer accounts.",
    },
    {
      icon: MonitorSmartphone,
      title: "Growing businesses",
      detail: "Custom applications, databases, and systems built to scale.",
    },
  ];

  return (
    <section className="section-shell !py-12 sm:!py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <p className="section-kicker">Built for businesses like yours</p>
            <h2 className="mt-4 max-w-lg text-[clamp(2.25rem,5vw,3.5rem)] font-semibold leading-[0.98] tracking-[-0.065em] text-[var(--text)]">
              Whatever you do, there&apos;s a useful next step.
            </h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {businessTypes.map(({ icon: Icon, title, detail }, index) => (
              <motion.article
                key={title}
                {...sectionReveal}
                transition={{ ...sectionReveal.transition, delay: index * 0.04 }}
                className="rounded-[1.35rem] border border-[var(--line)] bg-[var(--panel)] p-4 sm:p-5"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--surface-alt)] text-[var(--accent)]">
                    <Icon size={19} aria-hidden="true" />
                  </span>
                  <h3 className="text-base font-semibold tracking-[-0.03em] text-[var(--text)]">{title}</h3>
                </div>
                <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{detail}</p>
              </motion.article>
            ))}
          </div>
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
          description="Choose a focused service or combine the pieces your business needs."
        />

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service, index) => {
            const Icon = serviceIcons[index % serviceIcons.length];

            return (
              <motion.article
                key={service.title}
                {...sectionReveal}
                transition={{ ...sectionReveal.transition, delay: index * 0.04 }}
                whileHover={{ y: -4 }}
                tabIndex={0}
                className="service-card group rounded-[1.6rem] border border-[var(--line)] bg-[var(--panel)] p-5 shadow-[var(--shadow-soft)]"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="service-icon flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--surface-alt)] text-[var(--accent)] transition group-hover:scale-105 group-hover:text-[var(--text)]">
                    <Icon size={22} />
                  </div>
                  <div className="rounded-full border border-[var(--line)] bg-[var(--surface)] px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] text-[var(--muted)]">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                </div>
                <h3 className="mt-6 text-xl font-semibold tracking-[-0.05em] text-[var(--text)]">{service.title}</h3>
                <p className="mt-3 text-base leading-7 text-[var(--muted)]">{service.description}</p>
                <p className="mt-4 text-sm leading-6 text-[var(--muted)]">
                  {service.detail}
                </p>
                <ChevronRight aria-hidden="true" size={17} className="service-arrow ml-auto mt-3 text-[var(--accent)]" />
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
          title="From first conversation to a dependable launch."
          description="A clear sequence of decisions and delivery, with room for the right support after launch."
        />

        <div aria-hidden="true" className="relative mx-auto mt-10 hidden max-w-6xl items-center justify-between px-[6.25%] xl:flex">
          <div className="absolute left-[6.25%] right-[6.25%] top-1/2 h-px -translate-y-1/2 bg-[linear-gradient(90deg,var(--line),var(--accent),var(--accent),var(--line))]" />
          {processSteps.map((step, index) => (
            <span
              key={step.title}
              className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-full border text-[10px] font-semibold ${
                index >= 6
                  ? "border-[var(--accent)] bg-[var(--accent)] text-white"
                  : "border-[var(--line)] bg-[var(--bg)] text-[var(--accent)]"
              }`}
            >
              {index + 1}
            </span>
          ))}
        </div>
        <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {processSteps.map((step, index) => (
            <motion.div
              key={step.title}
              {...sectionReveal}
              transition={{ ...sectionReveal.transition, delay: index * 0.04 }}
              className={`relative rounded-[1.5rem] border p-5 shadow-[var(--shadow-soft)] ${
                index >= 6
                  ? "border-[var(--accent)]/35 bg-[var(--surface-alt)]"
                  : "border-[var(--line)] bg-[var(--panel)]"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">{String(index + 1).padStart(2, "0")}</span>
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
          eyebrow="Work · Demo concepts"
          title="Different businesses. Different digital needs."
          description="Explore how a brand, a storefront, and a booking flow can each become a complete online experience."
        />

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {projects.map((project, index) => (
            <motion.article
              key={project.title}
              {...sectionReveal}
              transition={{ ...sectionReveal.transition, delay: index * 0.05 }}
              whileHover={{ y: -5 }}
              className="group overflow-hidden rounded-[1.8rem] border border-[var(--line)] bg-[var(--panel)] shadow-[var(--shadow-soft)]"
            >
              <div className={`relative h-72 overflow-hidden bg-gradient-to-br ${project.accent} p-4 sm:h-80 sm:p-5`}>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_10%,rgba(255,255,255,.7),transparent_35%)]" />
                <div className="relative h-full overflow-hidden rounded-[1.25rem] border border-white/55 bg-[#fbf8f4] shadow-[0_18px_45px_rgba(54,39,28,0.18)] transition-transform duration-500 group-hover:scale-[1.025]">
                  <div className="flex h-8 items-center gap-1.5 border-b border-[#e8dfd5] px-3">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#bc9b7f]" />
                    <span className="h-1.5 w-1.5 rounded-full bg-[#d7c6b6]" />
                    <span className="h-1.5 w-1.5 rounded-full bg-[#e7ded4]" />
                    <span className="ml-auto h-1.5 w-16 rounded-full bg-[#ebe4dc]" />
                  </div>
                  {project.preview === "hospitality" && (
                    <div className="grid h-[calc(100%-2rem)] grid-cols-[1.1fr_0.9fr]">
                      <div className="flex flex-col justify-center p-4 sm:p-5">
                        <span className="text-[8px] uppercase tracking-[0.28em] text-[#91735b]">A place to pause</span>
                        <p className="mt-2 text-xl font-semibold leading-[0.95] tracking-[-0.06em] text-[#32261e] sm:text-2xl">Slow mornings.<br />Good coffee.</p>
                        <span className="mt-4 w-fit rounded-full bg-[#4f3929] px-3 py-1.5 text-[8px] uppercase tracking-[0.15em] text-white">Explore the menu</span>
                      </div>
                      <div className="m-3 rounded-[1rem] bg-[linear-gradient(155deg,#a27754,#e5c9a9_48%,#f1e3d4)]">
                        <div className="ml-auto mt-8 h-20 w-20 rounded-full border-[8px] border-[#fbf8f4]/45 bg-[#79543a]/45 sm:h-24 sm:w-24" />
                      </div>
                    </div>
                  )}
                  {project.preview === "commerce" && (
                    <div className="p-4 sm:p-5">
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] font-semibold tracking-[0.18em] text-[#35281f]">OBJECTS / 01</span>
                        <span className="text-[8px] uppercase tracking-[0.15em] text-[#91735b]">Shop collection</span>
                      </div>
                      <div className="mt-3 grid grid-cols-3 gap-2">
                        {["#bd9977", "#ddd0c1", "#8f765f"].map((color) => (
                          <div key={color} className="aspect-[0.82] rounded-xl p-2" style={{ background: `linear-gradient(155deg, ${color}, #f1e8dc)` }}>
                            <div className="mx-auto mt-4 h-10 w-8 rounded-[45%_45%_35%_35%] bg-white/60 sm:h-12 sm:w-10" />
                          </div>
                        ))}
                      </div>
                      <div className="mt-3 h-2 w-24 rounded-full bg-[#d9cabb]" />
                      <div className="mt-2 h-1.5 w-16 rounded-full bg-[#eee6dd]" />
                    </div>
                  )}
                  {project.preview === "booking" && (
                    <div className="grid h-[calc(100%-2rem)] grid-cols-[0.8fr_1.2fr] gap-3 p-4 sm:p-5">
                      <div className="flex flex-col justify-center">
                        <span className="text-[8px] uppercase tracking-[0.24em] text-[#91735b]">Make time</span>
                        <p className="mt-2 text-lg font-semibold leading-[1] tracking-[-0.05em] text-[#35281f] sm:text-xl">Your next<br />appointment.</p>
                        <div className="mt-3 h-6 w-20 rounded-full bg-[#4f3929]" />
                      </div>
                      <div className="my-auto rounded-xl border border-[#e5dbcf] bg-white p-3">
                        <div className="mb-3 flex items-center justify-between text-[8px] text-[#58483d]">
                          <span>Choose a time</span><span>›</span>
                        </div>
                        <div className="grid grid-cols-4 gap-1.5">
                          {Array.from({ length: 12 }).map((_, day) => (
                            <div key={day} className={`flex aspect-square items-center justify-center rounded-md text-[7px] ${day === 5 ? "bg-[#74543b] text-white" : "bg-[#f4efe9] text-[#715f50]"}`}>{day + 1}</div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="absolute bottom-6 left-6 rounded-full border border-white/60 bg-white/75 px-3 py-1 text-[9px] uppercase tracking-[0.18em] text-[#4d3828] backdrop-blur-md sm:bottom-7 sm:left-7">
                  Demo concept
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-xs uppercase tracking-[0.22em] text-[var(--muted)]">{project.category}</p>
                  <span className="rounded-full border border-[var(--line)] px-2.5 py-1 text-[9px] uppercase tracking-[0.15em] text-[var(--muted)]">Concept</span>
                </div>
                <h3 className="mt-3 text-2xl font-semibold tracking-[-0.05em] text-[var(--text)]">{project.title}</h3>
                <p className="mt-3 text-base leading-7 text-[var(--muted)]">{project.description}</p>
                {project.url ? (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-[var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                  >
                    View Project
                    <ExternalLink size={15} />
                  </a>
                ) : (
                  <a href="#contact" className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-[var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]">
                    Start a similar project
                    <ArrowRight size={15} />
                  </a>
                )}
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
          <h2 className="mt-5 text-[clamp(2.4rem,5vw,3.8rem)] font-semibold leading-[0.98] tracking-[-0.065em] text-[var(--text)]">
            A small team with a systems-level view.
          </h2>
          <p className="mt-4 text-base leading-7 text-[var(--muted)] sm:text-lg">
            Web Nivo brings design, engineering, and practical business thinking together to make technology feel clear, useful, and considered.
          </p>
          <div className="mt-6 space-y-4">
            <div className="flex items-start gap-3">
              <div className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-[var(--surface-alt)] text-[var(--accent)]">
                <Check size={14} />
              </div>
              <p className="text-base text-[var(--muted)]">We start with your business context, not a one-size-fits-all template.</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-[var(--surface-alt)] text-[var(--accent)]">
                <Check size={14} />
              </div>
              <p className="text-base text-[var(--muted)]">Design and engineering stay connected to everyday operations.</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-[var(--surface-alt)] text-[var(--accent)]">
                <Check size={14} />
              </div>
              <p className="text-base text-[var(--muted)]">Thoughtful support continues beyond the day your project launches.</p>
            </div>
          </div>
        </motion.div>

        <motion.div {...sectionReveal} transition={{ ...sectionReveal.transition, delay: 0.1 }} className="rounded-[2rem] border border-[var(--line)] bg-[var(--panel)] p-4 sm:p-6">
          <div className="hidden md:block">
            <div className="relative h-[500px] w-full overflow-hidden rounded-[1.8rem] border border-[var(--line)] bg-[radial-gradient(circle_at_center,_rgba(180,130,92,0.22),transparent_45%),linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0))]">
              <div className="absolute inset-0 opacity-50 [background-image:linear-gradient(rgba(184,153,129,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(184,153,129,0.12)_1px,transparent_1px)] [background-size:36px_36px]" />
              <svg aria-hidden="true" viewBox="0 0 500 500" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 h-full w-full">
                <path d="M250 250 250 50M250 250 100 135M250 250 400 125M250 250 90 245M250 250 410 240M250 250 120 345M250 250 380 345M250 250 250 375" fill="none" stroke="var(--accent)" strokeOpacity=".22" strokeWidth="1.5" strokeDasharray="5 7" />
                <circle cx="250" cy="250" r="118" fill="none" stroke="var(--accent)" strokeOpacity=".12" />
              </svg>

              {ecosystemNodes.map((node, index) => {
                const positions = [
                  { top: "7%", left: "48%" },
                  { top: "27%", left: "20%" },
                  { top: "25%", left: "80%" },
                  { top: "49%", left: "18%" },
                  { top: "48%", left: "82%" },
                  { top: "69%", left: "24%" },
                  { top: "70%", left: "76%" },
                  { top: "75%", left: "50%" },
                ];

                const position = positions[index];

                return (
                  <motion.button
                    key={node.name}
                    type="button"
                    onMouseEnter={() => setActiveNode(index)}
                    onFocus={() => setActiveNode(index)}
                    className="absolute z-[1] flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--panel)] px-3 py-2 text-xs font-medium uppercase tracking-[0.18em] text-[var(--text)] shadow-[var(--shadow-soft)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                    style={{ top: position.top, left: position.left }}
                    onClick={() => setActiveNode(index)}
                    aria-label={`${node.name}: ${node.description}`}
                    whileHover={{ scale: 1.04 }}
                  >
                    {node.name}
                  </motion.button>
                );
              })}

              <div className="absolute left-1/2 top-1/2 z-[2] flex h-32 w-32 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--line)] bg-[var(--panel)] text-center shadow-[var(--shadow-soft)]">
                <div>
                  <div className="mx-auto h-9 w-9 rounded-full bg-[var(--surface-alt)] ring-4 ring-[var(--beige-ring)]" />
                  <p className="mt-3 text-[10px] uppercase tracking-[0.28em] text-[var(--muted)]">Your</p>
                  <p className="text-lg font-semibold tracking-[-0.05em] text-[var(--text)]">Business</p>
                </div>
              </div>

              <div className="absolute bottom-4 left-4 max-w-[205px] rounded-2xl border border-[var(--line)] bg-[var(--panel)] px-3 py-2.5 text-left shadow-[var(--shadow-soft)] backdrop-blur-md">
                <p className="text-[9px] uppercase tracking-[0.22em] text-[var(--muted)]">Connected focus</p>
                <p className="mt-1.5 text-xs leading-5 text-[var(--text)] sm:text-sm">{ecosystemNodes[activeNode].description}</p>
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
          description="Straight answers about scope, technology, and what happens after launch."
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
                  aria-controls={`faq-answer-${index}`}
                  id={`faq-question-${index}`}
                >
                  <span className="text-base font-medium text-[var(--text)] sm:text-lg">{item.question}</span>
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--line)] bg-[var(--surface-alt)] text-[var(--text)]">
                    <ChevronDown size={16} className={isOpen ? "rotate-180 transition-transform" : "transition-transform"} />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-answer-${index}`}
                      role="region"
                      aria-labelledby={`faq-question-${index}`}
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
      if (!formData.email.trim()) nextErrors.email = "Please enter your email address.";
      else if (!/\S+@\S+\.\S+/.test(formData.email)) nextErrors.email = "Please enter a valid email address.";
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
    if (step === 1) return Boolean(formData.businessType.trim() && /\S+@\S+\.\S+/.test(formData.email));
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
    const inquiry = [
      `Project inquiry from ${formData.name}`,
      `Business: ${formData.company}`,
      `Business type: ${formData.businessType}`,
      `Email: ${formData.email || "Not provided"}`,
      `WhatsApp: ${formData.whatsapp || "Not provided"}`,
      `Current website: ${formData.currentWebsite || "Not provided"}`,
      `Services: ${formData.selectedServices.join(", ")}`,
      `Business overview: ${formData.businessDescription}`,
      `Project goals: ${formData.detail}`,
      `Social profile: ${formData.social || "Not provided"}`,
    ].join("\n");

    if (formData.preferredContact === "WhatsApp") {
      window.open(`${siteConfig.whatsappLink}?text=${encodeURIComponent(inquiry)}`, "_blank", "noopener,noreferrer");
    } else {
      window.location.href = `mailto:${siteConfig.email}?subject=${encodeURIComponent(`Project inquiry — ${formData.company}`)}&body=${encodeURIComponent(inquiry)}`;
    }
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
        <h3 className="mt-5 text-3xl font-semibold tracking-[-0.06em] text-[var(--text)]">Your message is ready, {formData.name || "there"}.</h3>
        <p className="mt-3 text-base leading-7 text-[var(--muted)]">
          {formData.preferredContact === "WhatsApp"
            ? "WhatsApp should open with your project details filled in. Send the message there to complete your inquiry."
            : "Your email app should open with your project details filled in. Send the email to complete your inquiry."}
        </p>
        <a
          href={`${siteConfig.whatsappLink}?text=${encodeURIComponent(`Hi Web Nivo, I'm ${formData.name}. I'd like to discuss a project.`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="brand-button mt-6 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-base font-medium text-white"
        >
          <MessageCircle size={17} />
          Continue on WhatsApp
        </a>
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
    <div className="w-full min-w-0 rounded-[2rem] border border-[var(--line)] bg-[var(--panel)] p-5 shadow-[var(--shadow-soft)] sm:p-6">
      <div className="mb-6 flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
        <div>
          <p className="section-kicker">Project inquiry</p>
          <h3 className="mt-2 text-2xl font-semibold tracking-[-0.05em] text-[var(--text)]">Start your project</h3>
        </div>
        <div className="rounded-full border border-[var(--line)] bg-[var(--surface)] px-3 py-1.5 text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
          Step {currentStep + 1} / {stepList.length}
        </div>
      </div>
      <p className="mb-5 text-sm leading-6 text-[var(--muted)]">
        Share only what you know so far. We can help you work through the details together.
      </p>

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
      <div
        className="mb-6 h-1 overflow-hidden rounded-full bg-[var(--surface-alt)]"
        role="progressbar"
        aria-label="Project inquiry progress"
        aria-valuemin={1}
        aria-valuemax={stepList.length}
        aria-valuenow={currentStep + 1}
      >
        <motion.div
          className="h-full rounded-full bg-[var(--accent)]"
          initial={false}
          animate={{ width: `${((currentStep + 1) / stepList.length) * 100}%` }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
      </div>

      <form id="project-inquiry" onSubmit={handleSubmit} className="space-y-5">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.2 }}
            className="space-y-5"
          >
        {currentStep === 0 && (
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="field-label" htmlFor="name">Name <span aria-hidden="true">*</span></label>
              <input id="name" className="field-input" autoComplete="name" required aria-required="true" value={formData.name} onChange={(event) => updateField("name", event.target.value)} placeholder="Your name" />
              {errors.name && <p className="field-error" role="alert">{errors.name}</p>}
            </div>
            <div>
              <label className="field-label" htmlFor="company">Business / company name <span aria-hidden="true">*</span></label>
              <input id="company" className="field-input" autoComplete="organization" required aria-required="true" value={formData.company} onChange={(event) => updateField("company", event.target.value)} placeholder="Business name" />
              {errors.company && <p className="field-error" role="alert">{errors.company}</p>}
            </div>
          </div>
        )}

        {currentStep === 1 && (
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="field-label" htmlFor="businessType">Business type <span aria-hidden="true">*</span></label>
              <input id="businessType" className="field-input" required aria-required="true" value={formData.businessType} onChange={(event) => updateField("businessType", event.target.value)} placeholder="Restaurant, clinic, retail, service business..." />
              {errors.businessType && <p className="field-error" role="alert">{errors.businessType}</p>}
            </div>
            <div>
              <label className="field-label" htmlFor="email">Email <span aria-hidden="true">*</span></label>
              <input id="email" className="field-input" autoComplete="email" value={formData.email} onChange={(event) => updateField("email", event.target.value)} placeholder="you@business.com" type="email" required aria-required="true" />
              {errors.email && <p className="field-error" role="alert">{errors.email}</p>}
            </div>
            <div className="md:col-span-2">
              <label className="field-label" htmlFor="currentWebsite">Current website (optional)</label>
              <input id="currentWebsite" className="field-input" value={formData.currentWebsite} onChange={(event) => updateField("currentWebsite", event.target.value)} placeholder="https://yourwebsite.com" />
              {errors.currentWebsite && <p className="field-error" role="alert">{errors.currentWebsite}</p>}
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-4">
            <div>
              <label className="field-label">Which services do you need? <span aria-hidden="true">*</span></label>
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
              {errors.selectedServices && <p className="field-error" role="alert">{errors.selectedServices}</p>}
            </div>

            <div>
              <label className="field-label" htmlFor="businessDescription">Describe your business <span aria-hidden="true">*</span></label>
              <textarea id="businessDescription" className="field-input min-h-[120px]" required aria-required="true" value={formData.businessDescription} onChange={(event) => updateField("businessDescription", event.target.value)} placeholder="Tell us a bit about your business, offer, audience, and current situation." />
              {errors.businessDescription && <p className="field-error" role="alert">{errors.businessDescription}</p>}
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-4">
            <div>
              <label className="field-label" htmlFor="detail">What are your project goals? <span aria-hidden="true">*</span></label>
              <textarea id="detail" className="field-input min-h-[150px]" required aria-required="true" value={formData.detail} onChange={(event) => updateField("detail", event.target.value)} placeholder="Share the idea, the challenge, the audience, and any requirements or constraints." />
              {errors.detail && <p className="field-error" role="alert">{errors.detail}</p>}
            </div>
            <div>
              <label className="field-label" htmlFor="social">Instagram / social link (optional)</label>
              <input id="social" className="field-input" value={formData.social} onChange={(event) => updateField("social", event.target.value)} placeholder="https://instagram.com/yourprofile" />
              {errors.social && <p className="field-error" role="alert">{errors.social}</p>}
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="field-label" htmlFor="whatsapp">WhatsApp number</label>
              <input id="whatsapp" className="field-input" type="tel" autoComplete="tel" value={formData.whatsapp} onChange={(event) => updateField("whatsapp", event.target.value)} placeholder="0301 2542026" required={formData.preferredContact === "WhatsApp"} aria-required={formData.preferredContact === "WhatsApp"} />
              {errors.whatsapp && <p className="field-error" role="alert">{errors.whatsapp}</p>}
            </div>
            <div>
              <label className="field-label">Preferred contact method</label>
              <div className="mt-2 flex gap-2" role="group" aria-label="Preferred contact method">
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
          </motion.div>
        </AnimatePresence>

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
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 sm:px-6 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:px-8">
        <motion.div {...sectionReveal} className="contact-cta-panel min-w-0 rounded-[2rem] border border-[var(--line)] bg-[var(--panel)] p-6 sm:p-9">
          <p className="section-kicker">Let&apos;s talk</p>
          <h2 className="mt-5 text-[clamp(2.6rem,6vw,4.5rem)] font-semibold leading-[0.94] tracking-[-0.07em] text-[var(--text)]">
            Let&apos;s build more than a website.
          </h2>
          <p className="mt-5 max-w-lg text-base leading-7 text-[var(--muted)] sm:text-lg">
            Tell us what you&apos;re building, where you&apos;re stuck, or what you want to improve. We&apos;ll help you find the right next step.
          </p>

          <a href="#project-inquiry" className="brand-button group/cta mt-7 inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 text-base font-semibold text-white">
            Start Your Project
            <ArrowRight size={17} className="transition-transform duration-200 group-hover/cta:translate-x-1" />
          </a>

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

        <motion.div {...sectionReveal} transition={{ ...sectionReveal.transition, delay: 0.08 }} className="min-w-0">
          <ProjectInquiry />
        </motion.div>
      </div>
    </section>
  );
}

function WhatsAppButton() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const obstructingSections = ["services", "process", "work", "about", "faq", "contact"]
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);
    if (obstructingSections.length === 0) return;
    const intersecting = new Set<Element>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) intersecting.add(entry.target);
          else intersecting.delete(entry.target);
        }
        setVisible(intersecting.size === 0);
      },
      { threshold: 0.08 },
    );
    obstructingSections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <a
      href={siteConfig.whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className={`fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-40 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_12px_24px_rgba(37,211,102,0.2)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_16px_28px_rgba(37,211,102,0.28)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 sm:bottom-8 sm:right-8 sm:h-14 sm:w-14 ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      }`}
      aria-label="Chat with Web Nivo on WhatsApp"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
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
            Digital experiences and connected systems, thoughtfully built around your business.
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
    <MotionConfig reducedMotion="user">
      <div>
      <Navbar />
      <main className="pt-[4.75rem] sm:pt-20">
        <Hero />
        <MissionSection />
        <WhySection />
        <BusinessFitSection />
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
    </MotionConfig>
  );
}
