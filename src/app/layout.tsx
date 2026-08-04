import type { Metadata } from "next";
import { Geist, Geist_Mono, VT323 } from "next/font/google";

import { ParticleField } from "@/components/effects/particle-field";
import { Navigation } from "@/components/layout/navigation";
import { Footer } from "@/components/layout/footer";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const vt323 = VT323({
  variable: "--font-vt323",
  weight: "400",
  subsets: ["latin"],
});

const SITE_URL = "https://abdulrahmanhafez.dev";
const TITLE = "Abdulrahman Hafez | Backend .NET Developer";
const DESCRIPTION =
  "Backend .NET Developer building scalable APIs and data-driven systems with ASP.NET Core, SQL Server, and Clean Architecture.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s | Abdulrahman Hafez",
  },
  description: DESCRIPTION,
  keywords: [
    "Backend Developer",
    ".NET Developer",
    "ASP.NET Core",
    "C#",
    "SQL Server",
    "Entity Framework Core",
    "REST APIs",
    "Clean Architecture",
  ],
  authors: [{ name: "Abdulrahman Hafez" }],
  creator: "Abdulrahman Hafez",
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Abdulrahman Hafez",
    title: TITLE,
    description: DESCRIPTION,
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Abdulrahman Hafez — Backend .NET Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [`${SITE_URL}/og-image.png`],
  },
  robots: {
    index: true,
    follow: true,
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
      className={`${geistSans.variable} ${geistMono.variable} ${vt323.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ParticleField />
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  );
}