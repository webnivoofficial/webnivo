import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Web Nivo's business-first approach to design, digital systems, and long-term support.",
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
