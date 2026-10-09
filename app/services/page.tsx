"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  CalendarDays,
  Layers3,
  MonitorSmartphone,
  ShoppingBag,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

import { ServicePreview } from "@/components/service-preview";
import { PageIntro, SiteShell } from "@/components/site-shell";
import { services } from "@/lib/site-data";

const serviceIcons = [
  MonitorSmartphone,
  ShoppingBag,
  Sparkles,
  CalendarDays,
  Layers3,
  BarChart3,
];

export default function ServicesPage() {
  return (
    <SiteShell>
      <section className="section-shell">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <PageIntro
            eyebrow="Services"
            title="Digital solutions built around the way your business actually works."
            description="From business websites to connected systems, Web Nivo builds the experiences and infrastructure behind them."
          />

          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            {services.map((service, index) => (
              <motion.article
                key={service.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.38, delay: (index % 3) * 0.04 }}
                whileHover={{ y: -4 }}
                className="service-card group flex h-full flex-col justify-between overflow-hidden rounded-[1.75rem] bg-[var(--panel)]"
              >
                <Link href={`/services/${service.slug}`} className="flex h-full flex-col justify-between p-5 sm:p-6">
                  <div>
                    <ServicePreview slug={service.slug} />
                    <div className="mt-5 flex items-center justify-between gap-4">
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--surface-alt)] text-[var(--accent)]">
                        {(() => {
                          const Icon = serviceIcons[index] ?? Sparkles;
                          return <Icon size={18} aria-hidden="true" />;
                        })()}
                      </span>
                      <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">{String(index + 1).padStart(2, "0")}</span>
                    </div>
                    <h2 className="mt-4 text-2xl font-semibold tracking-[-0.05em] text-[var(--text)]">{service.title}</h2>
                    <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{service.description}</p>
                  </div>
                  <span className="mt-6 flex items-center justify-between gap-3 border-t border-[var(--line)] pt-4 text-sm font-medium text-[var(--accent)]">
                    Explore service <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </motion.article>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="mt-16 rounded-[2rem] border border-[var(--line)] bg-[var(--panel)] p-6 shadow-[var(--shadow-soft)] sm:p-8"
          >
            <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="section-kicker">Need a custom fit?</p>
                <h3 className="mt-3 text-3xl font-semibold tracking-[-0.05em] text-[var(--text)]">
                  Not every business problem fits in a standard package.
                </h3>
              </div>
              <Link href="/contact" className="brand-button inline-flex items-center gap-2 rounded-full px-6 py-3 text-base font-medium text-white">
                Start a Project
                <ArrowRight size={18} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </SiteShell>
  );
}
