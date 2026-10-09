"use client";

import { motion } from "framer-motion";
import { ArrowRight, Cloud, Database, Lock, ShieldCheck } from "lucide-react";
import Link from "next/link";

import { PageIntro, SiteShell } from "@/components/site-shell";

const capabilityBlocks = [
  { title: "Websites", description: "Clear front-end experiences that guide customers and convert interest into action.", icon: "Web" },
  { title: "Databases", description: "Structured data supporting products, bookings, customer records, and operational insight.", icon: "DB" },
  { title: "Authentication", description: "Secure login and account experiences built for real user journeys and internal tools.", icon: "Auth" },
  { title: "Hosting", description: "Deployment and technical setup so the final product stays fast, stable, and accessible.", icon: "Host" },
  { title: "Maintenance", description: "Ongoing updates, fixes, support, and iterative improvements after launch.", icon: "Care" },
  { title: "Integrations", description: "The digital pieces connected so information can move without friction between systems.", icon: "Sync" },
];

export default function DigitalSolutionsPage() {
  return (
    <SiteShell>
      <section className="section-shell">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <PageIntro
            eyebrow="Digital solutions"
            title="Web Nivo builds the connected systems behind the experience."
            description="The website is only one part of a working digital business. Web Nivo connects the front-end, data, user access, support, and maintenance around it."
          />

          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            {capabilityBlocks.map((block, index) => (
              <motion.div
                key={block.title}
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.42, delay: index * 0.06 }}
                className="rounded-[1.75rem] border border-[var(--line)] bg-[var(--panel)] p-6 shadow-[var(--shadow-soft)]"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--surface-alt)] text-[var(--accent)] font-semibold">
                  {block.icon}
                </div>
                <h2 className="text-2xl font-semibold tracking-[-0.05em] text-[var(--text)]">{block.title}</h2>
                <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{block.description}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-20 rounded-[2rem] border border-[var(--line)] bg-[var(--panel)] p-6 shadow-[var(--shadow-soft)] sm:p-8 lg:p-10">
            <div className="mb-8 max-w-2xl">
              <p className="section-kicker">Connected system</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.05em] text-[var(--text)] sm:text-4xl">
                A digital presence works best when the pieces connect.
              </h2>
            </div>

            <div className="grid gap-6 lg:grid-cols-7">
              {[
                { label: "Website", icon: "W" },
                { label: "Customers", icon: "C" },
                { label: "Orders", icon: "O" },
                { label: "Data", icon: "D" },
                { label: "Auth", icon: "A" },
                { label: "Admin", icon: "Ad" },
                { label: "Support", icon: "S" },
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: index * 0.05 }}
                  className="rounded-[1.4rem] border border-[var(--line)] bg-[var(--surface)] p-4 text-center"
                >
                  <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-[var(--surface-alt)] font-semibold text-[var(--accent)]">
                    {item.icon}
                  </div>
                  <span className="text-xs uppercase tracking-[0.12em] text-[var(--muted)]">{item.label}</span>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="mt-20 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-[2rem] border border-[var(--line)] bg-[var(--panel)] p-6 shadow-[var(--shadow-soft)]">
              <p className="section-kicker">Why it matters</p>
              <h3 className="mt-4 text-3xl font-semibold tracking-[-0.05em] text-[var(--text)]">A business website should work like a real business asset.</h3>
              <p className="mt-4 text-base leading-7 text-[var(--muted)]">
                When the front-end, data layer, customer flows, and support systems are aligned, the business can move faster and serve customers with less friction.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { icon: <Database size={18} />, title: "Data-backed experiences", body: "Product, order, booking, and customer information can live in systems that support business decisions." },
                { icon: <Lock size={18} />, title: "Secure access", body: "Account systems and permissions can be structured for real use cases without unnecessary complexity." },
                { icon: <Cloud size={18} />, title: "Reliable hosting", body: "Deployment and infrastructure can be tuned for speed, stability, and simpler upkeep." },
                { icon: <ShieldCheck size={18} />, title: "Ongoing support", body: "New features, fixes, and improvements can keep the system healthy as the business grows." },
              ].map((item) => (
                <div key={item.title} className="rounded-[1.5rem] border border-[var(--line)] bg-[var(--panel)] p-5">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--surface-alt)] text-[var(--accent)]">{item.icon}</div>
                  <h3 className="mt-4 text-xl font-semibold tracking-[-0.04em] text-[var(--text)]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{item.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-20 rounded-[2rem] border border-[var(--line)] bg-[var(--panel)] p-7 text-center shadow-[var(--shadow-soft)]">
            <p className="section-kicker">Need a connected solution?</p>
            <h3 className="mt-4 text-3xl font-semibold tracking-[-0.05em] text-[var(--text)]">Let’s map the right digital system for your business.</h3>
            <Link href="/contact" className="brand-button mt-6 inline-flex items-center gap-2 rounded-full px-6 py-3 text-base font-medium text-white">
              Start a Project
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
