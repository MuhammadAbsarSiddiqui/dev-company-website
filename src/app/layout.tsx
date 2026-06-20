import type { Metadata } from "next";
import { Geist, Inter } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ClientLayout } from "@/components/ClientLayout";
import { PageTransition } from "@/components/PageTransition";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DevStudio | Software Development Studio",
  description: "We build software that matters. Bespoke SaaS platforms, custom web applications, and mobile apps.",
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
        <div className="liquid-bg pointer-events-none">
          <div className="liquid-blob liquid-blob-1" />
          <div className="liquid-blob liquid-blob-2" />
          <div className="liquid-blob liquid-blob-3" />
        </div>
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
