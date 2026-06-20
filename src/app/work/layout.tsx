import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Portfolio",
  description: "View our featured engineering projects, including Fintech dashboards, healthcare systems, and E-commerce platforms.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
