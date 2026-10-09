import { ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";

import { ServicePreview } from "@/components/service-preview";
import { PageIntro, SiteShell } from "@/components/site-shell";
import { services } from "@/lib/site-data";

const serviceHighlights: Record<string, string[]> = {
  "business-websites": ["Brand positioning", "Clear customer journey", "Lead generation", "A polished, reliable online presence"],
  ecommerce: ["Product-first layouts", "Trust-building design", "Checkout flow thinking", "Conversion-focused storefronts"],
  "landing-pages": ["Campaign-specific messaging", "Clear calls to action", "Fast launch times", "Optimised for conversion"],
  "booking-systems": ["Easy appointment flows", "Availability management", "Customer-first UX", "Operational efficiency"],
  "website-redesign": ["Fresh positioning", "Improved UX", "Better content hierarchy", "Structured next-step growth"],
  "custom-web-applications": ["Workflow mapping", "Internal tools", "Operational clarity", "Scalable digital systems"],
};

const serviceSlugAliases: Record<string, string> = {
  "e-commerce-websites": "ecommerce",
  "website-redesigns": "website-redesign",
};

export function generateStaticParams() {
  return [
    ...services.map((service) => ({ slug: service.slug })),
    ...Object.keys(serviceSlugAliases).map((slug) => ({ slug })),
  ];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);

  return service
    ? { title: service.title, description: service.detail }
    : { title: "Service not found" };
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const canonicalSlug = serviceSlugAliases[slug] ?? slug;
  if (canonicalSlug !== slug) redirect(`/services/${canonicalSlug}`);
  const service = services.find((item) => item.slug === canonicalSlug);

  if (!service) {
    notFound();
  }

  const related = services.filter((item) => item.title !== service.title).slice(0, 3);
  const highlights = serviceHighlights[slug] ?? [
    "Clear direction",
    "Useful flow design",
    "Simple launch plan",
    "Ongoing support",
  ];

  return (
    <SiteShell>
      <section className="section-shell">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <nav className="mb-10 flex items-center gap-2 text-sm text-[var(--muted)]">
            <Link href="/" className="transition hover:text-[var(--text)]">Home</Link>
            <span>›</span>
            <Link href="/services" className="transition hover:text-[var(--text)]">Services</Link>
            <span>›</span>
            <span className="text-[var(--text)]">{service.title}</span>
          </nav>

          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div>
              <p className="section-kicker">Service</p>
              <h1 className="mt-4 text-[clamp(2.7rem,6vw,5rem)] font-semibold leading-[0.92] tracking-[-0.07em] text-[var(--text)]">
                {service.title}
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-[var(--muted)] sm:text-lg">{service.detail}</p>
            </div>
            <div className="rounded-[2rem] border border-[var(--line)] bg-[var(--panel)] p-6 shadow-[var(--shadow-soft)]">
              <ServicePreview slug={service.slug} />
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">Best for</p>
              <div className="mt-4 space-y-3">
                {highlights.map((item) => (
                  <div key={item} className="flex items-center gap-3 text-sm text-[var(--text)]">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--surface-alt)] text-[var(--accent)]">
                      <CheckCircle2 size={14} />
                    </span>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {[
              "Discovery and positioning",
              "Design and UX direction",
              "Build, launch, and support",
            ].map((item, index) => (
              <div key={item} className="rounded-[1.75rem] border border-[var(--line)] bg-[var(--panel)] p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">0{index + 1}</p>
                <h2 className="mt-3 text-xl font-semibold tracking-[-0.04em] text-[var(--text)]">{item}</h2>
                <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                  Clear planning, useful design decisions, and a real business outcome rather than a decorative build.
                </p>
              </div>
            ))}
          </div>

          <div className="mt-16 rounded-[2rem] border border-[var(--line)] bg-[var(--panel)] p-5 shadow-[var(--shadow-soft)] sm:p-8">
            <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
              <div>
                <p className="section-kicker">How it works</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-[-0.06em] text-[var(--text)]">A cleaner path from idea to launch.</h2>
              </div>
              <div className="space-y-4">
                {[
                  "Understand the business goals, growth path, and the audience the experience needs to serve.",
                  "Shape the structure, visual direction, and user flows with clarity and purpose.",
                  "Build the system, connect any needed data or tools, and launch with support in place.",
                ].map((step, index) => (
                  <div key={step} className="flex gap-4 rounded-[1.5rem] border border-[var(--line)] bg-[var(--surface)] p-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--surface-alt)] font-semibold text-[var(--accent)]">
                      {index + 1}
                    </span>
                    <p className="text-sm leading-6 text-[var(--muted)]">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-16">
            <PageIntro
              eyebrow="Related services"
              title="Build what your business needs, not just a generic package."
              description="Web Nivo combines the digital touchpoints your business relies on so the experience feels connected and scalable."
            />
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {related.map((item) => (
                <Link key={item.title} href={`/services/${item.slug}`} className="service-card rounded-[1.5rem] p-5">
                  <p className="text-sm font-medium text-[var(--muted)]">{item.title}</p>
                  <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{item.description}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-[var(--accent)]">
                    Explore
                    <ArrowRight size={15} />
                  </span>
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-16 rounded-[2rem] border border-[var(--line)] bg-[var(--panel)] p-8 text-center">
            <p className="section-kicker">Start with the right next step</p>
            <h3 className="mt-4 text-3xl font-semibold tracking-[-0.05em] text-[var(--text)]">Need help deciding what your business should build?</h3>
            <Link href="/contact" className="brand-button mt-6 inline-flex items-center gap-2 rounded-full px-6 py-3 text-base font-medium text-white">
              Talk to Web Nivo
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
