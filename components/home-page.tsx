"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  CalendarCheck2,
  Cloud,
  Database,
  LockKeyhole,
  MonitorSmartphone,
  ShoppingBag,
  Wrench,
} from "lucide-react";
import Link from "next/link";

import { SiteShell } from "@/components/site-shell";
import { projects, services } from "@/lib/site-data";

const featuredServices = [
  { title: "Business Websites", icon: MonitorSmartphone, description: "Clear, brand-led experiences that guide customers to the right next step." },
  { title: "E-commerce Websites", icon: ShoppingBag, description: "Product discovery, storefronts, and thoughtful paths to checkout." },
  { title: "Booking Systems", icon: CalendarCheck2, description: "Scheduling and reservation flows connected to day-to-day operations." },
  { title: "Custom Web Applications", icon: BarChart3, description: "Dashboards and tools shaped around the way your team works." },
];

const systemParts = [
  { label: "Website", icon: MonitorSmartphone },
  { label: "Bookings", icon: CalendarCheck2 },
  { label: "Accounts", icon: LockKeyhole },
  { label: "Database", icon: Database },
  { label: "Admin", icon: BarChart3 },
  { label: "Hosting", icon: Cloud },
  { label: "Maintenance", icon: Wrench },
];

function HeroComposition() {
  return (
    <div role="img" className="hero-visual" aria-label="Illustration of a business website connected to bookings and demo analytics">
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
      <motion.div
        className="hero-product-widget hero-booking-widget"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.4 }}
      >
        <div className="widget-heading"><span>Booking preview</span><CalendarCheck2 size={14} /></div>
        <strong>24 <small>reservations</small></strong>
        <div className="widget-booking-row"><span>10:30</span><span>Table for two</span><i /></div>
        <div className="widget-booking-row"><span>12:00</span><span>Table for four</span><i /></div>
      </motion.div>
      <motion.div
        className="hero-product-widget hero-data-widget"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.36, duration: 0.4 }}
      >
        <div className="widget-heading"><span>Store activity</span><BarChart3 size={14} /></div>
        <div className="activity-summary"><strong>$4,280</strong><span>Demo data</span></div>
        <div className="activity-chart" aria-hidden="true">
          {[32, 48, 39, 65, 48, 72, 55, 84, 67, 100, 74, 91].map((height, index) => (
            <i key={index} style={{ height: `${height}%` }} />
          ))}
        </div>
      </motion.div>
      <div className="hero-system-note"><span /> Website <b>·</b> Bookings <b>·</b> Data</div>
    </div>
  );
}

export default function HomePage() {
  return (
    <SiteShell>
      <main>
        <section className="section-shell hero-section relative overflow-hidden pt-16 sm:pt-20">
          <div className="hero-ambient-wash pointer-events-none absolute inset-0" />
          <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[1.08fr_0.92fr] lg:gap-14 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
              <p className="section-kicker">Web Nivo · Digital solutions</p>
              <h1 className="mt-6 max-w-[12ch] text-[clamp(3.2rem,9vw,7rem)] font-semibold leading-[0.9] tracking-[-0.08em] text-[var(--text)]">
                Your business needs more than a website.
              </h1>
              <p className="mt-6 max-w-xl text-base leading-7 text-[var(--muted)] sm:text-lg sm:leading-8">
                We design and build websites, online stores, booking tools, and custom applications—connected to the systems your business relies on.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/contact" className="brand-button group/cta inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 text-base font-semibold">
                  Start a Project
                  <ArrowRight size={17} className="transition-transform duration-200 group-hover/cta:translate-x-1" />
                </Link>
                <Link href="/work" className="secondary-button inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-medium text-[var(--text)] sm:text-base">
                  Explore Our Work
                </Link>
              </div>
              <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs font-medium uppercase tracking-[0.12em] text-[var(--muted)] sm:text-sm">
                <span>Websites</span><span aria-hidden="true">·</span>
                <span>Commerce</span><span aria-hidden="true">·</span>
                <span>Connected systems</span>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.08 }}
            >
              <HeroComposition />
            </motion.div>
          </div>
        </section>

        <section className="section-shell capability-section" aria-labelledby="home-services-title">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="capability-intro">
              <div>
                <p className="section-kicker">Services</p>
                <h2 id="home-services-title" className="mt-4 max-w-2xl text-[clamp(2.5rem,5.5vw,4.5rem)] font-semibold leading-[0.94] tracking-[-0.07em] text-[var(--text)]">
                  The right tools for the work ahead.
                </h2>
              </div>
              <p className="max-w-md text-base leading-7 text-[var(--muted)] sm:text-lg">
                From a first business website to a connected digital product.
              </p>
            </div>

            <div className="mt-9 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {featuredServices.map(({ title, icon: Icon, description }, index) => {
                const service = services.find((item) => item.title === title);
                return (
                  <motion.div
                    key={title}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.35, delay: index * 0.04 }}
                    className="service-card group rounded-[1.5rem] bg-[var(--panel)] p-5 sm:p-6"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--surface-alt)] text-[var(--accent)] transition-transform duration-200 group-hover:scale-105">
                      <Icon size={20} aria-hidden="true" />
                    </div>
                    <h3 className="mt-6 text-lg font-semibold tracking-[-0.04em] text-[var(--text)]">{title}</h3>
                    <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{description}</p>
                    {service && (
                      <Link href={`/services/${service.slug}`} className="service-arrow mt-5 inline-flex items-center gap-2 text-sm font-medium text-[var(--accent)]">
                        Explore service <ArrowRight size={15} />
                      </Link>
                    )}
                  </motion.div>
                );
              })}
            </div>
            <div className="mt-6 flex justify-end">
              <Link href="/services" className="project-link inline-flex items-center gap-2 text-sm font-medium text-[var(--accent)]">
                View all services <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </section>

        <section className="section-shell pt-0" aria-labelledby="home-system-title">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.7fr_1.3fr] lg:items-center lg:px-8">
            <div>
              <p className="section-kicker">More than websites</p>
              <h2 id="home-system-title" className="mt-4 text-[clamp(2.3rem,5vw,4rem)] font-semibold leading-[0.96] tracking-[-0.07em] text-[var(--text)]">
                One connected experience.
              </h2>
              <p className="mt-5 max-w-lg text-base leading-7 text-[var(--muted)]">
                Customer-facing experiences work better when the data, operations, and support behind them fit together.
              </p>
              <Link href="/digital-solutions" className="brand-button mt-7 inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium">
                Explore Digital Solutions <ArrowRight size={16} />
              </Link>
            </div>
            <div className="glass-panel rounded-[2rem] p-5 sm:p-8">
              <div className="grid gap-3 sm:grid-cols-4">
                {systemParts.map(({ label, icon: Icon }, index) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.04, duration: 0.3 }}
                    className="system-node"
                  >
                    <Icon size={19} aria-hidden="true" />
                    <span>{label}</span>
                  </motion.div>
                ))}
              </div>
              <div className="system-board-footer mt-5">
                <span className="system-status-dot" aria-hidden="true" />
                <span>One system, shaped around your business</span>
              </div>
            </div>
          </div>
        </section>

        <section className="section-shell" aria-labelledby="home-work-title">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="work-intro">
              <div>
                <p className="section-kicker">Selected concepts</p>
                <h2 id="home-work-title" className="mt-4 max-w-3xl text-[clamp(2.6rem,6vw,4.7rem)] font-semibold leading-[0.93] tracking-[-0.075em] text-[var(--text)]">
                  See what a digital experience can become.
                </h2>
              </div>
              <Link href="/work" className="project-link inline-flex shrink-0 items-center gap-2 text-sm font-medium text-[var(--accent)]">
                View all work <ArrowRight size={15} />
              </Link>
            </div>
            <div className="mt-9 grid gap-4 md:grid-cols-3">
              {projects.map((project, index) => (
                <Link key={project.title} href="/work" className="glass-panel project-card group overflow-hidden rounded-[1.5rem] border border-[var(--line)]">
                  <div className={`project-stage relative h-48 overflow-hidden bg-gradient-to-br ${project.accent} p-3`}>
                    <div className="project-preview relative h-full overflow-hidden rounded-[1rem] border border-white/55 bg-[#fbf8f4] p-4 transition-transform duration-300 group-hover:scale-[1.015]">
                      <div className="flex items-center gap-1.5 border-b border-[#e8dfd5] pb-2">
                        <i className="h-1.5 w-1.5 rounded-full bg-[#bc9b7f]" />
                        <i className="h-1.5 w-1.5 rounded-full bg-[#d7c6b6]" />
                        <span className="ml-auto text-[9px] tracking-[0.12em] text-[#8c7866]">{project.category.toUpperCase()}</span>
                      </div>
                      <div className={`home-project-art home-project-art-${index + 1}`}>
                        <span>{project.title}</span>
                        {index === 0 && <div className="home-cafe-preview"><i /><i /><i /></div>}
                        {index === 1 && <div className="home-store-preview"><i /><i /><i /></div>}
                        {index === 2 && <div className="home-booking-preview"><i /><i /><i /><i /><i /><i /></div>}
                      </div>
                    </div>
                  </div>
                  <div className="p-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">{project.category} · Concept</p>
                    <h3 className="mt-2 text-xl font-semibold tracking-[-0.04em] text-[var(--text)]">{project.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{project.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="section-shell pt-0" aria-labelledby="home-approach-title">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:px-8">
            <div>
              <p className="section-kicker">Why Web Nivo</p>
              <h2 id="home-approach-title" className="mt-4 text-[clamp(2.4rem,5vw,4rem)] font-semibold leading-[0.96] tracking-[-0.07em] text-[var(--text)]">
                Built around your business, not a template.
              </h2>
              <Link href="/about" className="project-link mt-6 inline-flex items-center gap-2 text-sm font-medium text-[var(--accent)]">
                Learn about our approach <ArrowRight size={15} />
              </Link>
            </div>
            <ol className="process-overview divide-y divide-[var(--line)]">
              {[
                ["01", "Understand the work", "Align the project around your goals, customers, and real operational needs."],
                ["02", "Design with intent", "Give the experience a clear structure, useful flows, and a distinctive visual direction."],
                ["03", "Build and support", "Connect the right tools and plan for a reliable launch and continued upkeep."],
              ].map(([number, title, description]) => (
                <li key={number} className="process-phase">
                  <span className="process-phase-number">{number}</span>
                  <div><h3>{title}</h3><p>{description}</p></div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="section-shell pt-0 pb-24">
          <div className="glass-prominent contact-cta-panel mx-auto max-w-7xl rounded-[2rem] border border-[var(--line)] p-8 text-center sm:p-12">
            <p className="section-kicker">Start with a conversation</p>
            <h2 className="mx-auto mt-4 max-w-3xl text-[clamp(2.2rem,5vw,3.7rem)] font-semibold leading-[0.98] tracking-[-0.065em] text-[var(--text)]">
              Have a business challenge in mind?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-[var(--muted)]">
              Share what you are trying to solve. We can help shape the right digital next step.
            </p>
            <Link href="/contact" className="brand-button mt-7 inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-base font-medium">
              Start a Project <ArrowRight size={17} />
            </Link>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
