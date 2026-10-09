import type { Metadata } from "next";
import { Geist } from "next/font/google";

import { PageTransition } from "@/components/page-transition";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://webnivoofficial.vercel.app"),
  title: {
    default: "Web Nivo — Digital Solutions for Modern Businesses",
    template: "%s | Web Nivo",
  },
  description:
    "Web Nivo helps businesses build stronger digital presences through websites, e-commerce, databases, custom systems, marketing, and long-term support.",
  openGraph: {
    title: "Web Nivo — Digital Solutions for Modern Businesses",
    description:
      "Web Nivo helps businesses build stronger digital presences through websites, e-commerce, databases, custom systems, marketing, and long-term support.",
    type: "website",
    url: "https://webnivoofficial.vercel.app",
  },
  twitter: {
    card: "summary_large_image",
    title: "Web Nivo",
    description:
      "Digital solutions for modern businesses from websites to applications, databases, marketing, and ongoing support.",
  },
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
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  );
}
