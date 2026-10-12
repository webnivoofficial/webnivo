import type { Metadata } from "next";
import { Geist } from "next/font/google";

import { PageTransition } from "@/components/page-transition";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const BASE_URL = "https://webnivoofficial.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Web Nivo — Digital Solutions for Modern Businesses",
    template: "%s | Web Nivo",
  },
  description:
    "Web Nivo helps businesses build stronger digital presences through websites, e-commerce, databases, custom systems, marketing, and long-term support.",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Web Nivo — Digital Solutions for Modern Businesses",
    description:
      "Web Nivo helps businesses build stronger digital presences through websites, e-commerce, databases, custom systems, marketing, and long-term support.",
    url: BASE_URL,
    siteName: "Web Nivo",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/web-nivo-logo.png",
        width: 1254,
        height: 1254,
        alt: "Web Nivo logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Web Nivo",
    description:
      "Digital solutions for modern businesses from websites to applications, databases, marketing, and ongoing support.",
    images: ["/web-nivo-logo.png"],
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${BASE_URL}/#organization`,
      name: "Web Nivo",
      url: BASE_URL,
      logo: `${BASE_URL}/web-nivo-logo.png`,
      image: `${BASE_URL}/web-nivo-logo.png`,
      description:
        "Web Nivo builds business websites, e-commerce stores, landing pages, booking systems, custom web applications, and databases, with hosting, maintenance, and marketing support.",
      sameAs: ["https://instagram.com/webnivoofficial"],
      contactPoint: [
        {
          "@type": "ContactPoint",
          contactType: "customer service",
          email: "webnivoofficial@gmail.com",
          availableLanguage: ["English"],
        },
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${BASE_URL}/#website`,
      url: BASE_URL,
      name: "Web Nivo",
      description:
        "Digital solutions for modern businesses: websites, e-commerce, redesigns, hosting, maintenance, databases, and custom web applications.",
      inLanguage: "en",
      publisher: { "@id": `${BASE_URL}/#organization` },
    },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (() => {
                try {
                  const storedTheme = localStorage.getItem('web-nivo-theme');
                  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                  const nextTheme = storedTheme === 'dark' || storedTheme === 'light' ? storedTheme : systemTheme;
                  document.documentElement.dataset.theme = nextTheme;
                } catch (error) {
                  document.documentElement.dataset.theme = 'light';
                }
              })();
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  );
}
