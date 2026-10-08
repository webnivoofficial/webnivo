"use client";

import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  Building2,
  CalendarCheck2,
  Camera,
  Check,
  ChevronDown,
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
  UsersRound,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { type FormEvent, useEffect, useState, useSyncExternalStore } from "react";

import {
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
    <section id="home" className="section-shell hero-section relative overflow-hidden pt-16 sm:pt-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_75%_18%,_rgba(173,123,78,0.12),transparent_42%)]" />
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[1.08fr_0.92fr] lg:gap-14 lg:px-8">
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
            <a href="#work" className="secondary-button inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-medium text-[var(--text)] sm:text-base">
              Explore Work
            </a>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs font-medium uppercase tracking-[0.12em] text-[var(--muted)] sm:text-sm">
            <span>Websites</span><span aria-hidden="true">·</span>
            <span>Commerce</span><span aria-hidden="true">·</span>
            <span>Custom systems</span>
          </div>
        </motion.div>

        <motion.div {...sectionReveal} transition={{ ...sectionReveal.transition, delay: 0.1 }} className="relative z-10">
          <div className="hero-visual">
            <div className="hero-product-window">
              <div className="product-window-bar">
                <div className="window-dots"><i /><i /><i /></div>
                <span className="window-address">cafeatelier.com</span>
                <span className="window-live"><i /> Live</span>
              </div>
              <div className="cafe-site-preview">
                <div className="cafe-site-nav">
                  <span>ATELIER<span className="cafe-mark">.</span></span>
                  <div><span>Our menu</span><span>Visit us</span></div>
                  <span className="cafe-nav-button">Book a table</span>
                </div>
                <div className="cafe-site-hero">
                  <div className="cafe-site-copy">
                    <span className="mock-eyebrow">COFFEE · KITCHEN · COMMUNITY</span>
                    <h2>Make room<br />for a good day.</h2>
                    <p>Thoughtful coffee. Something good from the kitchen.</p>
                    <span className="cafe-visit-button">Find your table <ArrowRight size={12} /></span>
                  </div>
                  <div className="cafe-scene" aria-hidden="true">
                    <div className="cafe-sun" />
                    <div className="cafe-vase"><i /></div>
                    <div className="cafe-cup"><i /></div>
                    <div className="cafe-table" />
                  </div>
                </div>
                <div className="cafe-site-footer">
                  <span>Seasonal menu</span><span>Open daily · 8am—6pm</span><span>Made for lingering</span>
                </div>
              </div>
            </div>
            <div className="hero-product-widget hero-booking-widget">
              <div className="widget-heading"><span>Today&apos;s bookings</span><CalendarCheck2 size={14} /></div>
              <strong>24 <small>reservations</small></strong>
              <div className="widget-booking-row"><span>10:30</span><span>Table for two</span><i /></div>
              <div className="widget-booking-row"><span>12:00</span><span>Table for four</span><i /></div>
            </div>
            <div className="hero-product-widget hero-data-widget">
              <div className="widget-heading"><span>Store activity</span><BarChart3 size={14} /></div>
              <div className="activity-summary"><strong>$4,280</strong><span>+12.8%</span></div>
              <div className="activity-chart" aria-hidden="true">
                {[32, 48, 39, 65, 48, 72, 55, 84, 67, 100, 74, 91].map((height, index) => (
                  <i key={index} style={{ height: `${height}%` }} />
                ))}
              </div>
            </div>
            <div className="hero-system-note"><span /> Website <b>·</b> Bookings <b>·</b> Data</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ServicesSection() {
  const featuredServices = [
    {
      icon: Building2,
      title: "Websites that work",
      description: "Brand-led business websites and focused landing pages.",
      services: ["Business Websites", "Landing Pages"],
    },
    {
      icon: ShoppingBag,
      title: "E-commerce",
      description: "Product discovery, storefronts, and smooth checkout.",
      services: ["E-commerce Websites"],
    },
    {
      icon: CalendarCheck2,
      title: "Bookings & customer flows",
      description: "Reservations, scheduling, and customer accounts.",
      services: ["Booking Websites"],
    },
    {
      icon: MonitorSmartphone,
      title: "Custom applications",
      description: "Applications, admin tools, and reporting shaped around your workflows.",
      services: ["Custom Web Applications", "Admin Dashboards", "Analytics"],
    },
  ];

  const foundations = services.filter(
    (service) =>
      !featuredServices.some((group) => group.services.includes(service.title)),
  );

  const ecosystemServices = [
    { label: "Website", icon: MonitorSmartphone },
    { label: "Commerce", icon: ShoppingBag },
    { label: "Bookings", icon: CalendarCheck2 },
    { label: "Web app", icon: Sparkles },
    { label: "Accounts", icon: UsersRound },
    { label: "Database", icon: Database },
    { label: "Admin", icon: BarChart3 },
    { label: "Analytics", icon: BarChart3 },
    { label: "Hosting", icon: Cloud },
    { label: "Ongoing care", icon: Wrench },
  ];

  return (
    <section id="services" className="section-shell capability-section">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div {...sectionReveal} className="capability-intro">
          <div>
            <p className="section-kicker">What Web Nivo builds</p>
            <h2 className="mt-4 max-w-2xl text-[clamp(2.5rem,5.5vw,4.5rem)] font-semibold leading-[0.94] tracking-[-0.07em] text-[var(--text)]">
              A better website is just the start.
            </h2>
          </div>
          <p className="max-w-md text-base leading-7 text-[var(--muted)] sm:text-lg">
            Customer-facing experiences, connected to the tools that keep your business moving.
          </p>
        </motion.div>

        <div className="mt-10 grid gap-5 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
          <div className="grid gap-3 sm:grid-cols-2">
            {featuredServices.map(({ icon: Icon, title, description, services: serviceLabels }, index) => (
              <motion.article
                key={title}
                {...sectionReveal}
                transition={{ ...sectionReveal.transition, delay: index * 0.04 }}
                whileHover={{ y: -3 }}
                className="service-card group flex min-h-40 flex-col justify-between rounded-[1.5rem] bg-[var(--panel)] p-5 sm:p-6"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--surface-alt)] text-[var(--accent)] transition-transform duration-200 group-hover:scale-105">
                  <Icon size={20} aria-hidden="true" />
                </span>
                <div className="mt-7">
                  <h3 className="text-lg font-semibold tracking-[-0.04em] text-[var(--text)]">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{description}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {serviceLabels.map((service) => (
                      <span className="service-mini-tag" key={service}>{service}</span>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          <motion.div {...sectionReveal} transition={{ ...sectionReveal.transition, delay: 0.08 }} className="system-board">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="section-kicker">One connected experience</p>
                <h3 className="mt-2 text-xl font-semibold tracking-[-0.045em] text-[var(--text)] sm:text-2xl">
                  Everything working together.
                </h3>
              </div>
            </div>

            <div className="admin-preview" aria-label="Example business administration dashboard">
              <div className="admin-preview-sidebar">
                <span className="admin-brand">N<span>.</span></span>
                <i className="active"><BarChart3 size={15} /></i>
                <i><CalendarCheck2 size={15} /></i>
                <i><UsersRound size={15} /></i>
                <i><Database size={15} /></i>
                <i><Wrench size={15} /></i>
              </div>
              <div className="admin-preview-main">
                <div className="admin-preview-top">
                  <div><span>MONDAY, OCTOBER 06</span><strong>Good morning, Alex</strong></div>
                  <span className="admin-avatar">A</span>
                </div>
                <div className="admin-metrics">
                  <div><span>Revenue</span><strong>$8,420</strong><i>+12.8%</i></div>
                  <div><span>Bookings</span><strong>36</strong><i>+8.2%</i></div>
                  <div><span>Customers</span><strong>248</strong><i>+16.4%</i></div>
                </div>
                <div className="admin-activity">
                  <div className="admin-chart">
                    <div className="admin-chart-label"><span>Weekly activity</span><b>This week⌄</b></div>
                    <div className="admin-chart-plot">
                      <span /><span /><span /><span />
                      <svg viewBox="0 0 360 88" preserveAspectRatio="none" aria-hidden="true">
                        <path d="M0 69 C28 60 37 67 62 48 S104 62 130 38 S171 56 202 31 S244 46 269 20 S321 34 360 5" />
                        <path className="chart-fill" d="M0 69 C28 60 37 67 62 48 S104 62 130 38 S171 56 202 31 S244 46 269 20 S321 34 360 5 V88 H0Z" />
                      </svg>
                    </div>
                    <div className="admin-chart-days"><span>MON</span><span>TUE</span><span>WED</span><span>THU</span><span>FRI</span><span>SAT</span><span>SUN</span></div>
                  </div>
                  <div className="admin-upcoming">
                    <div><span>Next booking</span><b>View all</b></div>
                    <strong>11:30 <small>AM</small></strong>
                    <span>Olivia M. · Table for two</span>
                    <i>Confirmed</i>
                  </div>
                </div>
              </div>
            </div>

            <div className="ecosystem-caption">
              <span>One system, built around your business</span>
              <span className="ecosystem-caption-line" />
            </div>
            <ul className="ecosystem-services" aria-label="Connected digital capabilities">
              {ecosystemServices.map(({ label, icon: Icon }) => (
                <li key={label}>
                  <Icon size={14} aria-hidden="true" />
                  <span>{label}</span>
                </li>
              ))}
            </ul>

            <div className="system-board-footer">
              <span className="system-status-dot" aria-hidden="true" />
              <span>From the customer experience to the tools behind it</span>
            </div>
          </motion.div>
        </div>

        <div className="capability-support mt-7 border-t border-[var(--line)] pt-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm font-medium text-[var(--text)]">
              For restaurants, retail, service teams, and growing businesses.
            </p>
            <details className="capability-details">
              <summary>
                Explore the foundations
                <ChevronDown size={15} aria-hidden="true" />
              </summary>
              <div className="capability-foundations">
                {foundations.map(({ title, detail }) => (
                  <div key={title}>
                    <h4>{title}</h4>
                    <p>{detail}</p>
                  </div>
                ))}
              </div>
            </details>
          </div>
          <ul className="capability-pills" aria-label="Additional digital capabilities">
            {foundations.map(({ title }) => (
              <li key={title}>{title}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function ProcessSection() {
  return (
    <section id="process" className="section-shell">
      <div id="about" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div {...sectionReveal} className="process-intro">
          <div className="process-identity">
            <p className="section-kicker">A considered partnership</p>
            <h2 className="mt-4 text-[clamp(2.5rem,5vw,4.2rem)] font-semibold leading-[0.94] tracking-[-0.07em] text-[var(--text)]">
              Small team. Systems-level thinking.
            </h2>
            <p className="mt-5 max-w-lg text-base leading-7 text-[var(--muted)] sm:text-lg">
              Design and engineering, grounded in how your business actually works.
            </p>
            <div className="mt-7 flex flex-wrap gap-2">
              {["Business-first", "Connected by design", "Support beyond launch"].map((value) => (
                <span className="identity-tag" key={value}>{value}</span>
              ))}
            </div>
          </div>

          <div className="process-overview">
            <p className="section-kicker">From brief to better</p>
            <h3 className="mt-3 text-2xl font-semibold tracking-[-0.05em] text-[var(--text)]">
              A clear path, with you at every step.
            </h3>
            <ol className="mt-6 divide-y divide-[var(--line)]">
              {processSteps.map((phase, index) => (
                <li className="process-phase" key={phase.title}>
                  <span className="process-phase-number">{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <h4>{phase.title}</h4>
                    <p>{phase.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function WorkSection() {
  return (
    <section id="work" className="section-shell">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div {...sectionReveal} className="work-intro">
          <div>
            <p className="section-kicker">Selected concepts</p>
            <h2 className="mt-4 max-w-3xl text-[clamp(2.6rem,6vw,4.7rem)] font-semibold leading-[0.93] tracking-[-0.075em] text-[var(--text)]">
              Your business, brought to life online.
            </h2>
          </div>
          <p className="max-w-sm text-base leading-7 text-[var(--muted)] sm:text-lg">
            Three directions. Each built around a different customer experience.
          </p>
        </motion.div>

        <div className="mt-10 grid gap-5 lg:grid-cols-2 lg:gap-7">
          {projects.map((project, index) => (
            <motion.article
              key={project.title}
              {...sectionReveal}
              transition={{ ...sectionReveal.transition, delay: index * 0.05 }}
              whileHover={{ y: -3 }}
              className={`project-card group overflow-hidden rounded-[1.8rem] border border-[var(--line)] bg-[var(--panel)] ${
                index === 0 ? "lg:col-span-2" : ""
              }`}
            >
              <div className={`project-stage relative overflow-hidden bg-gradient-to-br ${project.accent} p-3 sm:p-5 ${
                index === 0 ? "h-72 sm:h-[27rem]" : "h-64 sm:h-72"
              }`}>
                <div className={`project-preview relative h-full overflow-hidden rounded-[1.25rem] border border-white/55 bg-[#fbf8f4] transition-transform duration-300 group-hover:scale-[1.012] ${
                  index === 0 ? "shadow-[0_14px_34px_rgba(54,39,28,0.12)]" : ""
                }`}>
                  <div className="flex h-8 items-center gap-1.5 border-b border-[#e8dfd5] px-3">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#bc9b7f]" />
                    <span className="h-1.5 w-1.5 rounded-full bg-[#d7c6b6]" />
                    <span className="h-1.5 w-1.5 rounded-full bg-[#e7ded4]" />
                    <span className="ml-auto h-1.5 w-16 rounded-full bg-[#ebe4dc]" />
                  </div>
                  {project.preview === "hospitality" && (
                    <div className="project-cafe-page">
                      <div className="project-site-nav">
                        <strong>CAFÉ ATELIER<span>.</span></strong>
                        <div><span>Our story</span><span>Menu</span><span>Visit</span></div>
                        <span className="project-nav-action">Find a table</span>
                      </div>
                      <div className="project-cafe-hero">
                        <div className="project-cafe-copy">
                          <span className="project-overline">A NEIGHBOURHOOD CAFÉ</span>
                          <h4>Slow mornings.<br />Good coffee.</h4>
                          <p>Seasonal plates and coffee worth sitting down for.</p>
                          <span className="project-cta-dark">Explore the menu <ArrowRight size={12} /></span>
                        </div>
                        <div className="project-cafe-art" aria-hidden="true">
                          <div className="cafe-art-window" />
                          <div className="cafe-art-plant"><i /><i /><i /></div>
                          <div className="cafe-art-cup"><i /></div>
                          <div className="cafe-art-saucer" />
                          <div className="cafe-art-shadow" />
                        </div>
                      </div>
                      <div className="project-cafe-meta"><span>GOOD COFFEE, EVERY DAY</span><span>OPEN 8AM — 6PM</span></div>
                    </div>
                  )}
                  {project.preview === "commerce" && (
                    <div className="project-shop-page">
                      <div className="project-site-nav">
                        <strong>NORTHLINE<span>®</span></strong>
                        <div><span>New arrivals</span><span>Home</span><span>Objects</span></div>
                        <span className="shop-bag">Bag <i>2</i></span>
                      </div>
                      <div className="project-shop-intro">
                        <div><span className="project-overline">OBJECTS FOR SLOWER LIVING</span><h4>Made to be<br />lived with.</h4></div>
                        <span>Thoughtful pieces for<br />everyday rituals.</span>
                      </div>
                      <div className="shop-product-grid">
                        <div className="shop-product">
                          <div className="shop-object object-vase"><i /></div>
                          <div><span>FORMA STUDIO</span><b>Stoneware vase</b><strong>$68</strong></div>
                        </div>
                        <div className="shop-product">
                          <div className="shop-object object-lamp"><i /></div>
                          <div><span>ATELIER NORTH</span><b>Table light</b><strong>$124</strong></div>
                        </div>
                        <div className="shop-product">
                          <div className="shop-object object-bowl"><i /></div>
                          <div><span>STUDIO CERAMIC</span><b>Everyday bowl</b><strong>$42</strong></div>
                        </div>
                      </div>
                    </div>
                  )}
                  {project.preview === "booking" && (
                    <div className="project-booking-page">
                      <div className="project-site-nav">
                        <strong>HORIZON<span>.</span></strong>
                        <div><span>Services</span><span>Our team</span><span>About</span></div>
                        <span className="project-nav-action">Book now</span>
                      </div>
                      <div className="project-booking-layout">
                        <div className="booking-copy">
                          <span className="project-overline">CARE, ON YOUR TIME</span>
                          <h4>Make time<br />for yourself.</h4>
                          <p>Choose your service and a time that works for you.</p>
                          <span className="booking-duration"><i /> Booking takes less than 2 minutes</span>
                        </div>
                        <div className="booking-calendar">
                          <div className="calendar-title"><span><b>October 2026</b><small>Select a date</small></span><span>‹　›</span></div>
                          <div className="calendar-days"><i>MO</i><i>TU</i><i>WE</i><i>TH</i><i>FR</i><i>SA</i><i>SU</i></div>
                          <div className="calendar-dates">
                            {Array.from({ length: 35 }).map((_, day) => {
                              const date = day - 2;
                              const isCurrentMonth = date > 0 && date <= 31;
                              return <i key={day} className={`${!isCurrentMonth ? "muted" : ""} ${date === 14 ? "selected" : ""}`}>{isCurrentMonth ? date : date <= 0 ? 30 + date : date - 31}</i>;
                            })}
                          </div>
                          <div className="calendar-time"><span>Available times</span><div><i>10:30</i><i>12:00</i><i className="selected">2:30</i></div></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-3 px-5 pt-5 sm:px-7 sm:pt-6">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">{project.category}</p>
                <span className="rounded-full bg-[var(--surface-alt)] px-3 py-1 text-[10px] font-medium uppercase tracking-[0.16em] text-[var(--accent-strong)]">Concept</span>
              </div>
              <div className="flex flex-col gap-3 px-5 pb-5 pt-2 sm:flex-row sm:items-end sm:justify-between sm:px-7 sm:pb-7">
                <div>
                  <h3 className="text-2xl font-semibold tracking-[-0.05em] text-[var(--text)] sm:text-3xl">{project.title}</h3>
                  <p className="mt-2 max-w-xl text-sm leading-6 text-[var(--muted)] sm:text-base">{project.description}</p>
                </div>
                {project.url ? (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link inline-flex shrink-0 items-center gap-2 text-sm font-medium text-[var(--accent)]"
                  >
                    View Project
                    <ExternalLink size={15} aria-hidden="true" />
                  </a>
                ) : (
                  <a href="#contact" className="project-link inline-flex shrink-0 items-center gap-2 text-sm font-medium text-[var(--accent)]">
                    Discuss a similar build
                    <ArrowRight size={15} aria-hidden="true" />
                  </a>
                )}
              </div>
            </motion.article>
          ))}
        </div>

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
            Start a Project
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
    const obstructingSections = ["services", "process", "work", "faq", "contact"]
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
        <ServicesSection />
        <WorkSection />
        <ProcessSection />
        <FaqSection />
        <ContactSection />
      </main>
      <Footer />
      <WhatsAppButton />
      </div>
    </MotionConfig>
  );
}
