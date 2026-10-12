import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Services",
    template: "%s | Web Nivo",
  },
  description:
    "Explore Web Nivo's business websites, e-commerce, booking systems, redesigns, custom applications, and digital support services.",
  alternates: {
    canonical: "/services",
  },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
