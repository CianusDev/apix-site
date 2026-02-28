import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import LocalFont from "next/font/local";
import "./globals.css";
import { Header } from "@/components/layouts/header";
import { Footer } from "@/components/layouts/footer";
import { clientEnv } from "@/config/env";

const BASE_URL = clientEnv.APP_URL ?? "https://apix.dev";

const googleSans = LocalFont({
  src: "../../public/fonts/google_sans.ttf",
  variable: "--font-geist-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "apix — A lightweight Postman alternative for your terminal",
    template: "%s — apix",
  },
  description:
    "Send HTTP requests, manage collections and environments directly in your terminal. A TUI HTTP client written in Rust.",
  openGraph: {
    title: "apix — A lightweight Postman alternative for your terminal",
    description:
      "Send HTTP requests, manage collections and environments directly in your terminal. A TUI HTTP client written in Rust.",
    url: BASE_URL,
    siteName: "apix",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "apix — Postman for your terminal",
    description:
      "Send HTTP requests, manage collections and environments directly in your terminal.",
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
      className={`dark ${googleSans.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-screen antialiased flex flex-col font-sans bg-background text-foreground">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
