import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Web Nivo — Digital Solutions for Modern Businesses",
    short_name: "Web Nivo",
    description:
      "Web Nivo helps businesses build stronger digital presences through websites, e-commerce, databases, custom systems, marketing, and long-term support.",
    start_url: "/",
    display: "minimal-ui",
    lang: "en",
    background_color: "#e9e8f0",
    theme_color: "#8b5d38",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
      {
        src: "/web-nivo-logo.png",
        sizes: "1254x1254",
        type: "image/png",
      },
    ],
  };
}
