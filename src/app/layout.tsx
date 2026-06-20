import type { Metadata } from "next";
import { Geist, Inter } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ClientLayout } from "@/components/ClientLayout";
import { PageTransition } from "@/components/PageTransition";
import { HexagonBackground } from "@/components/HexagonBackground";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://devstudio.example.com'),
  title: {
    default: "DevStudio | Premium Software Development",
    template: "%s | DevStudio"
  },
  description: "We build software that matters. Bespoke SaaS platforms, custom web applications, and mobile apps with zero ambiguity.",
  keywords: ["Software Development", "Web Agency", "SaaS", "Mobile Apps", "UI/UX Design", "Next.js"],
  authors: [{ name: "DevStudio Team" }],
  creator: "DevStudio",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://devstudio.example.com",
    title: "DevStudio | Premium Software Development",
    description: "We build software that matters. Bespoke SaaS platforms, custom web applications, and mobile apps with zero ambiguity.",
    siteName: "DevStudio",
    images: [
      {
        url: "/og-image.jpg", // You can replace this with your actual OG image later
        width: 1200,
        height: 630,
        alt: "DevStudio Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DevStudio | Premium Software Development",
    description: "We build software that matters. Bespoke SaaS platforms, custom web applications, and mobile apps with zero ambiguity.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${inter.variable} antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col relative">
        <HexagonBackground />
        <ClientLayout>
          <Navigation />
          <main className="flex-grow pt-[80px]">
            <PageTransition>
              {children}
            </PageTransition>
          </main>
          <Footer />
        </ClientLayout>
      </body>
    </html>
  );
}
