"use client";

import { motion } from "framer-motion";
import { ArrowRight, BadgeCheck, Building2, Compass, Lightbulb } from "lucide-react";
import Link from "next/link";

import { PageIntro, SiteShell } from "@/components/site-shell";

const values = [
  { icon: <Compass size={20} />, title: "Clear thinking", body: "Every decision is shaped around what helps a business communicate better and operate more effectively." },
  { icon: <Building2 size={20} />, title: "Business-first design", body: "The final experience should make sense commercially, not just visually." },
  { icon: <Lightbulb size={20} />, title: "Practical creativity", body: "We combine strategy and visual polish with real-world digital functionality." },
  { icon: <BadgeCheck size={20} />, title: "Reliable delivery", body: "The system should be useful, maintainable, and ready to keep working after launch." },
];

export default function AboutPage() {
  return (
    <SiteShell>
      <section className="section-shell">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <PageIntro
            eyebrow="About"
            title="Web Nivo helps businesses turn digital complexity into something usable and clear."
            description="We design and build digital experiences that work for the people behind the business and the people they serve."
          />

          <div className="mt-14 grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="glass-panel rounded-[2rem] border border-[var(--line)] p-8 shadow-[var(--shadow-soft)]"
            >
              <p className="section-kicker">Our approach</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.05em] text-[var(--text)] sm:text-4xl">Simple process. Strong outcomes.</h2>
              <p className="mt-4 text-base leading-7 text-[var(--muted)]">
                Web Nivo brings together design, strategy, build quality, and ongoing support so businesses can present themselves more effectively online and operate with fewer friction points.
              </p>
              <p className="mt-4 text-base leading-7 text-[var(--muted)]">
                The aim is not decoration for its own sake. It is clarity, trust, better customer experience, and digital systems that grow with the business.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.05 }}
              className="glass-panel rounded-[2rem] border border-[var(--line)] p-6 shadow-[var(--shadow-soft)]"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  ["Brand clarity", "Your online presence should be easy to understand, trust, and act on."],
                  ["Customer experience", "Every touchpoint should work toward the same business goal."],
                  ["Digital systems", "The tools behind the website should support the work, not slow it down."],
                  ["Longer-term value", "The work should keep performing after launch and evolve with the business."],
                ].map(([title, body]) => (
                  <div key={title} className="glass-subtle rounded-[1.5rem] border border-[var(--line)] p-4">
                    <h3 className="text-lg font-semibold text-[var(--text)]">{title}</h3>
                    <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{body}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="mt-20">
            <p className="section-kicker text-center">What matters to us</p>
            <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {values.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: index * 0.06 }}
                  className="glass-panel rounded-[1.75rem] border border-[var(--line)] p-6 shadow-[var(--shadow-soft)]"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--surface-alt)] text-[var(--accent)]">{item.icon}</div>
                  <h3 className="mt-4 text-xl font-semibold tracking-[-0.04em] text-[var(--text)]">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{item.body}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="glass-panel mt-20 rounded-[2rem] border border-[var(--line)] p-8 text-center shadow-[var(--shadow-soft)]">
            <p className="section-kicker">Let’s build something useful</p>
            <h3 className="mt-4 text-3xl font-semibold tracking-[-0.05em] text-[var(--text)]">Need a better digital presence for your business?</h3>
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
