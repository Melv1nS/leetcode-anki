import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ErrorBoundary } from "@/app/components/ErrorBoundary";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "LeetCode Spaced Repetition",
  description: "Master coding interviews with spaced repetition practice",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <ClerkProvider>
        <ErrorBoundary>
          <body suppressHydrationWarning>
            <main className="min-h-screen bg-white dark:bg-gray-900 antialiased">
              {children}
            </main>
          </body>
        </ErrorBoundary>
      </ClerkProvider>
    </html>
  );
}
