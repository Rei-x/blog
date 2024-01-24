import type { Metadata } from "next";
import { Lato } from "next/font/google";

import { Nav } from "@/components/Nav";

import "./globals.css";

const poppin = Lato({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
  title: "hi",
  description: "web developer, software engineer, and student",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="cupcake">
      <body className={`${poppin.className} container mx-auto`}>
        <Nav />
        {children}
      </body>
    </html>
  );
}
