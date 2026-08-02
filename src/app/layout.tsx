import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { ParticleField } from "@/components/effects/particle-field";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Abdulrahman Hafez | Backend .NET Developer",
    template: "%s | Abdulrahman Hafez",
  },
  description:
    "Backend .NET Developer building scalable APIs and data-driven systems.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ParticleField />
        {children}
      </body>
    </html>
  );
}
