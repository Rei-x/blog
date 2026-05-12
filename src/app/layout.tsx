import type { Metadata } from "next";
import { Lato, Lora } from "next/font/google";
import type { ReactNode } from "react";

import { Nav } from "@/components/Nav";

import "./globals.css";

const sans = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-sans",
});

const serif = Lora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-serif",
});

export const metadata: Metadata = {
  title: "hi",
  description: "web developer, software engineer, and student",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" data-theme="cupcake">
      <body
        className={`${sans.variable} ${serif.variable} ${sans.className} container mx-auto`}
      >
        <Nav />
        {children}
      </body>
    </html>
  );
}
