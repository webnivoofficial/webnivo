"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronDown, Search } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { PageIntro, SiteShell } from "@/components/site-shell";
import { faqItems } from "@/lib/site-data";

export default function FaqPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [query, setQuery] = useState("");
  const filteredFaqs = faqItems.filter((item) =>
    `${item.question} ${item.answer}`.toLowerCase().includes(query.trim().toLowerCase()),
  );

  return (
    <SiteShell>
      <section className="section-shell">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <PageIntro
            eyebrow="FAQ"
            title="Questions that usually come up before a project begins."
            description="Straight answers about the kind of work Web Nivo supports, what’s included, and how projects usually move from idea to launch."
          />

          <label className="mx-auto mt-10 flex max-w-2xl items-center gap-3 rounded-2xl border border-[var(--line)] bg-[var(--panel)] px-4 py-3 text-[var(--muted)] shadow-[var(--shadow-soft)]">
            <Search size={18} aria-hidden="true" />
            <input
              type="search"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setOpenIndex(null);
              }}
              placeholder="Search questions"
              aria-label="Search frequently asked questions"
              className="w-full bg-transparent text-sm text-[var(--text)] outline-none placeholder:text-[var(--muted)]"
            />
          </label>

          <div className="mt-8 space-y-3">
            {filteredFaqs.length === 0 && (
              <p className="rounded-2xl border border-[var(--line)] bg-[var(--panel)] px-5 py-6 text-center text-sm text-[var(--muted)]">
                No questions match that search. Try another term or contact Web Nivo.
              </p>
            )}
            {filteredFaqs.map((item, index) => {
              const open = openIndex === index;
              return (
                <motion.div key={item.question} className="overflow-hidden rounded-[1.5rem] border border-[var(--line)] bg-[var(--panel)] shadow-[var(--shadow-soft)]" initial={false}>
                  <button
                    type="button"
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                    onClick={() => setOpenIndex(open ? null : index)}
                    aria-expanded={open}
                  >
                    <span className="text-base font-medium text-[var(--text)] sm:text-lg">{item.question}</span>
                    <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--surface-alt)] text-[var(--accent)] transition ${open ? "rotate-180" : ""}`}>
                      <ChevronDown size={16} />
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <p className="px-5 pb-5 pt-1 text-sm leading-7 text-[var(--muted)] sm:text-base">{item.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-16 rounded-[2rem] border border-[var(--line)] bg-[var(--panel)] p-8 text-center shadow-[var(--shadow-soft)]">
            <p className="section-kicker">Need a more specific answer?</p>
            <h3 className="mt-4 text-3xl font-semibold tracking-[-0.05em] text-[var(--text)]">Tell Web Nivo what you’re trying to build.</h3>
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
