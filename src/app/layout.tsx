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

export const metadata: Metadata = {
  metadataBase: new URL("https://abdulrahmanhafez.dev"),
  title: {
    default: "Abdulrahman Hafez | Backend .NET Developer",
    template: "%s | Abdulrahman Hafez",
  },
  description:
    "Backend .NET Developer building scalable APIs and data-driven systems with ASP.NET Core, SQL Server, and Clean Architecture.",
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
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://abdulrahmanhafez.dev",
    siteName: "Abdulrahman Hafez",
    title: "Abdulrahman Hafez | Backend .NET Developer",
    description:
      "Backend .NET Developer building scalable APIs and data-driven systems with ASP.NET Core, SQL Server, and Clean Architecture.",
  },
  twitter: {
    card: "summary",
    title: "Abdulrahman Hafez | Backend .NET Developer",
    description:
      "Backend .NET Developer building scalable APIs and data-driven systems.",
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