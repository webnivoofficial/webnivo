import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Work",
  description:
    "Explore Web Nivo's concept previews for hospitality websites, e-commerce stores, and booking experiences.",
};

export default function WorkLayout({ children }: { children: React.ReactNode }) {
  return children;
}
