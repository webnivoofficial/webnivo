"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useSyncExternalStore, useState } from "react";

import { services, siteConfig } from "@/lib/site-data";

const serviceLinks = services.map((service) => service.title);

const primaryLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Digital Solutions", href: "/digital-solutions" },
  { label: "Our Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/faq" },
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
        {theme === "dark" ? "☀" : "☾"}
      </motion.span>
    </button>
  );
}

function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
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

  const isPageMatch = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      className={`site-header fixed inset-x-0 top-0 z-50 pt-3 ${isHidden ? "site-header-hidden" : ""}`}
      onFocusCapture={() => setIsHidden(false)}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav className="site-nav flex items-center justify-between rounded-full px-3 py-2 sm:px-4">
          <Link href="/" className="flex items-center gap-3" aria-label="Web Nivo home">
            <Image src="/web-nivo-logo.png" alt="Web Nivo logo" width={120} height={44} priority className="h-8 w-auto sm:h-10" />
          </Link>

          <div className="hidden items-center gap-7 md:flex">
            {primaryLinks.map((item) => (
              <div key={item.href} className="relative">
                {item.label === "Services" ? (
                  <div
                    className="relative"
                    onMouseEnter={() => setServicesOpen(true)}
                    onMouseLeave={() => setServicesOpen(false)}
                  >
                    <button
                      type="button"
                      className={`nav-link flex items-center gap-1 ${isPageMatch(item.href) ? "text-[var(--text)]" : ""}`}
                      aria-expanded={servicesOpen}
                    >
                      {item.label}
                      <ChevronDown size={14} />
                    </button>
                    <AnimatePresence>
                      {servicesOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.18 }}
                          className="absolute left-1/2 top-full mt-3 w-64 -translate-x-1/2 rounded-[1.25rem] border border-[var(--line)] bg-[var(--bg-soft)] p-2 shadow-[var(--shadow-soft)] backdrop-blur-xl"
                        >
                          {serviceLinks.map((label) => {
                            const route = `/services/${label
                              .toLowerCase()
                              .replace(/[^a-z0-9]+/g, "-")
                              .replace(/(^-|-$)/g, "")}`;

                            return (
                              <Link
                                key={label}
                                href={route}
                                className="block rounded-xl px-3 py-2 text-sm text-[var(--muted)] transition hover:bg-[var(--surface-alt)] hover:text-[var(--text)]"
                              >
                                {label}
                              </Link>
                            );
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link href={item.href} className={`nav-link ${isPageMatch(item.href) ? "text-[var(--text)]" : ""}`}>
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <ThemeToggle />
            <Link href="/contact" className="brand-button inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium text-white">
              Start a Project
              <ArrowRight size={16} />
            </Link>
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
              {primaryLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-2xl px-4 py-3 text-base font-medium text-[var(--text)] transition hover:bg-[var(--surface-alt)]"
                  onClick={closeMenu}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/contact"
                onClick={closeMenu}
                className="brand-button mt-3 inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-medium text-white"
              >
                Start a Project
                <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export function PageIntro({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="mx-auto max-w-3xl text-center"
    >
      <p className="section-kicker">{eyebrow}</p>
      <h1 className="mt-4 text-[clamp(2.7rem,6vw,5rem)] font-semibold leading-[0.92] tracking-[-0.07em] text-[var(--text)]">
        {title}
      </h1>
      <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[var(--muted)] sm:text-lg">{description}</p>
    </motion.div>
  );
}

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-24">{children}</div>
      <footer className="border-t border-[var(--line)] bg-[var(--bg-soft)]/80">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.2fr_0.8fr_0.8fr_1fr] lg:px-8">
          <div>
            <Image src="/web-nivo-logo.png" alt="Web Nivo logo" width={130} height={44} className="h-10 w-auto" />
            <p className="mt-4 max-w-sm text-sm leading-6 text-[var(--muted)]">
              Design and development for businesses that need more than a basic website.
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">Explore</p>
            <ul className="mt-4 space-y-3 text-sm text-[var(--text)]">
              {primaryLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="transition hover:text-[var(--accent)]">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">Services</p>
            <ul className="mt-4 space-y-3 text-sm text-[var(--text)]">
              {serviceLinks.map((label) => (
                <li key={label}>
                  <Link
                    href={`/services/${label
                      .toLowerCase()
                      .replace(/[^a-z0-9]+/g, "-")
                      .replace(/(^-|-$)/g, "")}`}
                    className="transition hover:text-[var(--accent)]"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">Contact</p>
            <ul className="mt-4 space-y-3 text-sm text-[var(--text)]">
              <li>
                <a href={`mailto:${siteConfig.email}`} className="transition hover:text-[var(--accent)]">
                  {siteConfig.email}
                </a>
              </li>
              <li>
                <a href={siteConfig.whatsappLink} className="transition hover:text-[var(--accent)]">
                  WhatsApp: {siteConfig.whatsapp}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
}
