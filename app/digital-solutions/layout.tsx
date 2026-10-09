import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Digital Solutions",
  description:
    "See how Web Nivo connects websites, databases, authentication, hosting, integrations, and ongoing technical support.",
};

export default function DigitalSolutionsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
