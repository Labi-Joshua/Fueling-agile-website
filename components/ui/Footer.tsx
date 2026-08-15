// Site-wide footer, rendered once in app/layout.tsx. Made of three stacked panels
// (all sharing the same dark background so it reads as one continuous block):
// 1. A centered CTA panel ("Get in touch")
// 2. A background-image strip
// 3. The main link/contact grid + legal/social bottom row
import Image from "next/image";
import { FaXTwitter, FaFacebookF, FaLinkedinIn, FaInstagram } from "react-icons/fa6";
import type { FooterContent } from "@/data/mockContent";

export interface FooterProps {
  content: FooterContent;
  logoSrc: string;
  backgroundImageSrc: string;
  certifications: { src: string; alt: string }[];
}

export default function Footer({ content, logoSrc, backgroundImageSrc, certifications }: FooterProps) {
  return (
    <footer className="relative mt-16">
      {/* Panel 1: centered "Get in touch" CTA */}
      <div className="mx-auto max-w-[1536px] px-4 sm:px-8">
        <div className="bg-[#262626] px-6 pt-10 text-center sm:px-12">
          <span className="text-xs font-medium uppercase tracking-wide text-orange-500">
            {content.ctaEyebrow}
          </span>
          <h2 className="mx-auto mt-3 max-w-lg text-2xl font-medium text-white sm:text-3xl">
            {content.ctaHeading}
          </h2>
          <a
            href={content.ctaButtonHref}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-600"
          >
            {content.ctaButtonText}
            <svg width="14" height="14" viewBox="0 0 12 12" fill="none">
              <path
                d="M3 1.5L8.5 6L3 10.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </div>

      {/* Spacer panel — same dark background, bridges panel 1 into the image strip below */}
      <div className="mx-auto max-w-[1536px] px-4 sm:px-8">
        <div className="bg-[#262626] px-6 pt-10 sm:px-12" />
      </div>

      {/* Panel 2 + 3: background image strip behind the main link/contact grid */}
      <div className="relative overflow-hidden">
        <Image
          src={backgroundImageSrc}
          alt=""
          fill
          className="object-cover"
        />

        <div className="relative mx-auto max-w-[1536px] px-4 pb-16 sm:px-8">
          <div className="bg-[#262626] px-6 pb-10 sm:px-12">
            {/* Brand/contact info on the left, link columns on the right */}
            <div className="flex flex-col gap-10 border-t border-white/10 pt-10 text-left md:flex-row md:items-start md:justify-between">
              <div className="flex flex-col gap-8">
                <div className="relative h-8 w-28">
                  <Image
                    src={logoSrc}
                    alt={content.brand}
                    fill
                    className="object-contain object-left"
                  />
                </div>
                <div className="flex flex-col gap-1 text-xs text-white/50">
                  <p>
                    <span className="text-white/70">Address:</span> {content.address}
                  </p>
                  <p>
                    <span className="text-white/70">Email:</span> {content.email}
                  </p>
                  <p>
                    <span className="text-white/70">Phone:</span> {content.phone}
                  </p>
                </div>

                {/* Regulatory certification badges (DPR / NDPB) */}
                <div className="flex flex-col gap-3">
                  <span className="text-xs text-white/50">Certified by</span>
                  <div className="flex flex-wrap items-center gap-3">
                    {certifications.map((cert) => (
                      <div
                        key={cert.src}
                        className="flex items-center bg-white px-3 py-1.5"
                      >
                        <div className="relative h-8 w-28">
                          <Image src={cert.src} alt={cert.alt} fill className="object-contain" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-10 sm:flex-row sm:gap-16">
                {content.columns.map((column) => (
                  <div key={column.heading} className="flex flex-col gap-3">
                    <span className="text-xs text-white/40">{column.heading}</span>
                    <ul className="flex flex-col gap-2">
                      {column.links.map((link) => (
                        <li key={link.href}>
                          <a
                            href={link.href}
                            className="text-xs text-white/70 hover:text-white"
                          >
                            {link.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom row: copyright, legal links (Terms/Privacy), social icons */}
            <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row">
              <p className="text-xs text-white/40">{content.copyright}</p>

              <div className="flex items-center gap-6">
                <ul className="flex items-center gap-4">
                  {content.legalLinks.map((link) => (
                    <li key={link.href}>
                      <a href={link.href} className="text-xs text-white/50 hover:text-white">
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>

                <div className="flex items-center gap-3 text-white/50">
                  <a href="https://x.com" aria-label="X (Twitter)" className="hover:text-white">
                    <FaXTwitter size={16} />
                  </a>
                  <a href="https://facebook.com" aria-label="Facebook" className="hover:text-white">
                    <FaFacebookF size={16} />
                  </a>
                  <a href="https://linkedin.com" aria-label="LinkedIn" className="hover:text-white">
                    <FaLinkedinIn size={16} />
                  </a>
                  <a href="https://instagram.com" aria-label="Instagram" className="hover:text-white">
                    <FaInstagram size={16} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
