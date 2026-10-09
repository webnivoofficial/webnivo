import type { Metadata } from "next";

import HomePage from "@/components/home-page";

export const metadata: Metadata = {
  title: "Digital Solutions for Modern Businesses",
  description:
    "Web Nivo designs and builds business websites, e-commerce, booking systems, and custom applications connected to the systems businesses rely on.",
};

export default function Page() {
  return <HomePage />;
}
