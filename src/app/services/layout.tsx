import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services",
  description: "Explore our capabilities: Custom Web Apps, Native Mobile Development, SaaS Architecture, and UI/UX Design.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
