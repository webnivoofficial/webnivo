"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

import { PageIntro, SiteShell } from "@/components/site-shell";
import { services } from "@/lib/site-data";

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

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
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.42, delay: index * 0.04 }}
                whileHover={{ y: -4 }}
                className="service-card group flex h-full flex-col justify-between rounded-[1.75rem] p-6"
              >
                <div>
                  <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--surface-alt)] text-[var(--accent)]">
                    <Sparkles size={18} />
                  </div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">{index + 1}</p>
                  <h2 className="mt-3 text-2xl font-semibold tracking-[-0.05em] text-[var(--text)]">{service.title}</h2>
                  <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{service.description}</p>
                </div>

                <div className="mt-6 flex items-center justify-between gap-3 border-t border-[var(--line)] pt-4">
                  <span className="text-xs font-medium uppercase tracking-[0.12em] text-[var(--muted)]">Strategy</span>
                  <Link
                    href={`/services/${slugify(service.title)}`}
                    className="inline-flex items-center gap-2 text-sm font-medium text-[var(--accent)]"
                  >
                    Learn more
                    <ArrowRight size={15} />
                  </Link>
                </div>
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
