import type { Metadata } from "next";
import { Hero } from "@/features/landing/components/hero";
import { InstallSection } from "@/features/landing/components/install-section";
import { FeaturesGrid } from "@/features/landing/components/features-grid";
import { CtaSection } from "@/features/landing/components/cta-section";

export const metadata: Metadata = {
  title: "apix — A lightweight Postman alternative for your terminal",
  description:
    "Send HTTP requests, manage collections and environments directly in your terminal. A TUI HTTP client written in Rust.",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <InstallSection />
      <FeaturesGrid />
      <CtaSection />
    </>
  );
}
