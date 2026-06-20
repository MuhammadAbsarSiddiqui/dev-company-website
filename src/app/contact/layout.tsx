import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Ready to start your next software project? Get in touch with our engineering team today.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
