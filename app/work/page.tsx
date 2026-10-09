"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { PageIntro, SiteShell } from "@/components/site-shell";
import { projects } from "@/lib/site-data";

export default function WorkPage() {
  return (
    <SiteShell>
      <section className="section-shell">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <PageIntro
            eyebrow="Our work"
            title="Clear visual direction, useful experiences, and business-first design."
            description="Selected work and concept directions that show how Web Nivo turns ideas into polished digital experiences."
          />

          <div className="mt-14 space-y-8">
            {projects.map((project, index) => (
              <motion.article
                key={project.title}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: index * 0.05 }}
                className="glass-panel overflow-hidden rounded-[2rem] border border-[var(--line)] shadow-[var(--shadow-soft)]"
              >
                <div className="grid gap-6 p-4 lg:grid-cols-[1.3fr_0.7fr] lg:p-6">
                  <div className="glass-subtle rounded-[1.6rem] border border-[var(--line)] p-3">
                    <div className={`project-preview ${project.preview}`}>
                      <div className="project-browser-bar">
                        <div className="project-browser-dots"><span /><span /><span /></div>
                        <span className="project-browser-url">{project.title.toLowerCase().replace(/\s+/g, "")}.com</span>
                      </div>

                      {project.preview === "hospitality" && (
                        <div className="project-page hospitality-page">
                          <div className="project-site-nav">
                            <strong>CAFÉ ATELIER<span>.</span></strong>
                            <div><span>Menu</span><span>About</span><span>Visit</span></div>
                            <span className="project-nav-action">Book a table</span>
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

                  <div className="flex flex-col justify-between gap-5 py-2">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">{project.category}</p>
                      <h2 className="mt-3 text-3xl font-semibold tracking-[-0.05em] text-[var(--text)]">{project.title}</h2>
                      <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{project.description}</p>
                    </div>

                    <div className="flex items-center justify-between gap-4 border-t border-[var(--line)] pt-4">
                      <span className="rounded-full bg-[var(--surface-alt)] px-3 py-1 text-[10px] font-medium uppercase tracking-[0.15em] text-[var(--accent-strong)]">Concept</span>
                      <Link href="/contact" className="inline-flex items-center gap-2 text-sm font-medium text-[var(--accent)]">
                        Discuss a similar build
                        <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
