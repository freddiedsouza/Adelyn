import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

const siteDescription =
  "Clinical physiotherapy and rehabilitation with Dr. Adelyn Pereira — musculoskeletal care, post-surgical recovery, sports injury management, and virtual consultations in Malad (West), Mumbai.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Dr. Adelyn Pereira | Physiotherapy & Rehabilitation",
  description: siteDescription,
  openGraph: {
    type: "website",
    siteName: "Dr. Adelyn Pereira Physiotherapy",
    title: "Dr. Adelyn Pereira | Physiotherapy & Rehabilitation",
    description: siteDescription,
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "Dr. Adelyn Pereira — Physiotherapy & Rehabilitation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dr. Adelyn Pereira | Physiotherapy & Rehabilitation",
    description: siteDescription,
    images: ["/og.jpg"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
