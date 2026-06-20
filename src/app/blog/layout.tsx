import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Insights & Blog",
  description: "Read our engineering insights, case studies, and technical deep-dives on React, Next.js, and modern software architecture.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
