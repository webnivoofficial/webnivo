import { ArrowRight, Mail, MessageCircle } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

import { ProjectInquiryForm } from "@/components/contact-form";
import { PageIntro, SiteShell } from "@/components/site-shell";
import { siteConfig } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Tell Web Nivo about your business, project goals, and the digital solution you need.",
};

export default function ContactPage() {
  return (
    <SiteShell>
      <section className="section-shell">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <PageIntro
            eyebrow="Contact"
            title="Tell us what you want to build, fix, or improve."
            description="Share your goals, your audience, and what the website or digital system needs to do."
          />

          <div className="mt-14 grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="space-y-5">
              <div className="glass-panel rounded-[2rem] border border-[var(--line)] p-6 shadow-[var(--shadow-soft)]">
                <p className="section-kicker">Reach out</p>
                <h3 className="mt-3 text-2xl font-semibold tracking-[-0.05em] text-[var(--text)]">Prefer a quick conversation?</h3>
                <div className="mt-5 space-y-4 text-sm text-[var(--muted)]">
                  <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-3 rounded-2xl border border-[var(--line)] bg-[var(--surface)] px-4 py-3 transition hover:text-[var(--text)]">
                    <Mail size={18} className="text-[var(--accent)]" />
                    {siteConfig.email}
                  </a>
                  <a href={siteConfig.whatsappLink} className="flex items-center gap-3 rounded-2xl border border-[var(--line)] bg-[var(--surface)] px-4 py-3 transition hover:text-[var(--text)]">
                    <MessageCircle size={18} className="text-[var(--accent)]" />
                    WhatsApp: {siteConfig.whatsapp}
                  </a>
                </div>
              </div>

              <div className="glass-panel rounded-[2rem] border border-[var(--line)] p-6 shadow-[var(--shadow-soft)]">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">What happens next</p>
                <ul className="mt-4 space-y-3 text-sm leading-6 text-[var(--muted)]">
                  <li>1. Web Nivo reviews your goals and business context.</li>
                  <li>2. We identify the right service, system, and build direction.</li>
                  <li>3. A next step is shared so the project can move forward clearly.</li>
                </ul>
              </div>
            </div>

            <ProjectInquiryForm />
          </div>

          <div className="glass-panel mt-16 rounded-[2rem] border border-[var(--line)] p-7 text-center shadow-[var(--shadow-soft)]">
            <p className="section-kicker">Need a direction first?</p>
            <h3 className="mt-4 text-3xl font-semibold tracking-[-0.05em] text-[var(--text)]">Explore the services page to see what Web Nivo can build.</h3>
            <Link href="/services" className="brand-button mt-6 inline-flex items-center gap-2 rounded-full px-6 py-3 text-base font-medium text-white">
              Explore Services
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
