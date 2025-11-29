"use client";

import { Poppins, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import RootLayoutClient from "@/layout/MainLayout";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${poppins.variable} ${geistMono.variable} antialiased font-sans`}
      >
        <ThemeProvider
          attribute="class" 
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <RootLayoutClient>{children}</RootLayoutClient>
        </ThemeProvider>
      </body>
    </html>
  );
}
