import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQs",
  description:
    "Find answers about Web Nivo's services, project process, hosting, maintenance, and custom digital systems.",
  alternates: {
    canonical: "/faq",
  },
};

export default function FaqLayout({ children }: LayoutProps<"/faq">) {
  return children;
}
