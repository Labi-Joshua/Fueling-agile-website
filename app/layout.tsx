import type { Metadata } from "next";
import { Manrope, Instrument_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import { navLinks, footerContent } from "@/data/mockContent";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
});

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
        <Navbar
          brand="Fueling Agile Solutions"
          links={navLinks}
          loginText="Access Client Portals"
          loginHref="/login"
          ctaText="Schedule a Demo"
          ctaHref="/request"
        />
        <main className="flex-1">{children}</main>
        <Footer
          content={footerContent}
          logoSrc="/fan-logo-white.png"
          backgroundImageSrc="/hero-background.jpg"
        />
      </body>
    </html>
  );
}
