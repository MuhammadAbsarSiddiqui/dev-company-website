import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about DevStudio's mission, our team of expert engineers, and the philosophy behind our zero-ambiguity development process.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
