import type { Metadata } from "next";

import HomePage from "@/components/home-page";

export const metadata: Metadata = {
  title: {
    absolute: "Web Nivo — Digital Solutions for Modern Businesses",
  },
  description:
    "Web Nivo designs and builds business websites, e-commerce, booking systems, and custom applications connected to the systems businesses rely on.",
  alternates: {
    canonical: "/",
  },
};

export default function Page() {
  return <HomePage />;
}
