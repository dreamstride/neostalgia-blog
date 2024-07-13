import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from 'next/font/local';

import "./globals.css";

import { GeistMono } from 'geist/font/mono';

// Font files can be colocated inside of `pages`
const migha = localFont({ src: './Migha-Regular.otf', variable: '--font-migha' });

const inter = Inter({
  subsets: ["latin"],
  variable: '--font-inter'
});


export const metadata: Metadata = {
  title: "Neostalgic",
  description: "A collection of blog posts straight out of one man's Obsidian vault.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${GeistMono.variable} ${inter.variable} ${migha.variable}`}>{children}</body>
    </html>
  );
}
