// Root layout: wraps every page in the app with shared fonts, Navbar, and Footer.
import type { Metadata } from "next";
import { Manrope, Instrument_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import QueryProvider from "@/components/providers/QueryProvider";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import RequestFuelCardModalProvider from "@/components/providers/RequestFuelCardModalProvider";
import BackToTopButton from "@/components/ui/BackToTopButton";
import { navLinks, footerContent } from "@/data/mockContent";

// Body font (Manrope) — loaded via next/font and exposed as a CSS variable
// so Tailwind's `font-sans` can reference it (see tailwind.config.ts).
const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

// Heading font (Instrument Sans) — used via the `font-heading` Tailwind class
// on page titles across the site.
const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
});

// Default browser tab title/description for every page (can be overridden per-route).
export const metadata: Metadata = {
  title: "Fueling Agile Nigeria",
  description: "Fueling Agile Transformation in Nigeria",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${instrumentSans.variable} h-full font-sans antialiased`}
    >
      <body className="flex min-h-full flex-col">
        {/* Provides the TanStack Query client used by client components (e.g. the
            live fuel-price widgets) to fetch and cache data from our API routes. */}
        <QueryProvider>
          {/* Drives every scroll on the site through Lenis instead of native
              scroll, synced with GSAP's ticker so ScrollTrigger's pinned/scrubbed
              sections (HowItWorks, WhyUs, ScrollHighlightText, ...) stay smooth. */}
          <SmoothScrollProvider>
            {/* Owns the single shared "Request fuel cards" modal instance that
                every matching CTA button site-wide opens via
                useRequestFuelCardModal() (see RequestFuelCardModalProvider). */}
            <RequestFuelCardModalProvider>
              {/* Sticky top navigation, shared across all pages */}
              <Navbar
                brand="Fueling Agile Solutions"
                links={navLinks}
                loginText="Access Client Portals"
                loginHref="/login"
                ctaText="Contact us"
                ctaHref="/request"
              />

              {/* Actual page content is injected here by Next.js's App Router */}
              <main className="flex-1">{children}</main>

              {/* Shared footer with CTA panel, link columns, and legal/social row */}
              <Footer
                content={footerContent}
                logoSrc="/fan-logo-white.png"
                backgroundImageSrc="/footer-pattern.png"
                certifications={[
                  { src: "/dpr-logo.png", alt: "Department of Petroleum Resources" },
                  { src: "/ndpb-logo.png", alt: "Nigeria Data Protection Bureau" },
                ]}
              />

              {/* Floating "back to top" button, appears once the page has scrolled a bit */}
              <BackToTopButton />
            </RequestFuelCardModalProvider>
          </SmoothScrollProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
