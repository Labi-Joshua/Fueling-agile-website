import Image from "next/image";
import type { FooterContent } from "@/data/mockContent";

export interface FooterProps {
  content: FooterContent;
  logoSrc: string;
  backgroundImageSrc: string;
}

function SocialIcon({ path }: { path: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d={path} />
    </svg>
  );
}

export default function Footer({ content, logoSrc, backgroundImageSrc }: FooterProps) {
  return (
    <footer className="relative mt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
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

      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <div className="bg-[#262626] px-6 pt-10 sm:px-12" />
      </div>

      <div className="relative overflow-hidden">
        <Image
          src={backgroundImageSrc}
          alt=""
          fill
          className="object-cover"
        />

        <div className="relative mx-auto max-w-7xl px-4 pb-16 sm:px-8">
          <div className="bg-[#262626] px-6 pb-10 sm:px-12">
            <div className="flex flex-col gap-10 border-t border-white/10 pt-10 text-left md:flex-row md:items-start md:justify-between">
              <div className="flex flex-col gap-4">
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
                    <SocialIcon path="M18.9 2H22l-7.6 8.7L23.3 22h-6.7l-5.3-6.5L5.2 22H2l8.1-9.3L1 2h6.9l4.8 5.9L18.9 2Zm-1.2 18h1.9L7.4 3.9H5.3L17.7 20Z" />
                  </a>
                  <a href="https://linkedin.com" aria-label="LinkedIn" className="hover:text-white">
                    <SocialIcon path="M4.98 3.5C4.98 4.9 3.9 6 2.5 6S0 4.9 0 3.5 1.1 1 2.5 1s2.48 1.1 2.48 2.5ZM.5 8.5h4V23h-4V8.5ZM8.5 8.5h3.8v2h.05c.53-1 1.83-2.06 3.77-2.06 4.03 0 4.78 2.65 4.78 6.1V23h-4v-6.4c0-1.53-.03-3.5-2.13-3.5-2.13 0-2.46 1.66-2.46 3.38V23h-4V8.5Z" />
                  </a>
                  <a href="https://instagram.com" aria-label="Instagram" className="hover:text-white">
                    <SocialIcon path="M12 2c2.7 0 3.06.01 4.12.06 1.06.05 1.79.22 2.43.47.66.26 1.21.6 1.76 1.15.55.55.89 1.1 1.15 1.76.25.64.42 1.37.47 2.43.05 1.06.06 1.42.06 4.13s-.01 3.06-.06 4.12c-.05 1.06-.22 1.79-.47 2.43-.26.66-.6 1.21-1.15 1.76a4.9 4.9 0 0 1-1.76 1.15c-.64.25-1.37.42-2.43.47-1.06.05-1.42.06-4.12.06s-3.06-.01-4.13-.06c-1.06-.05-1.79-.22-2.43-.47a4.9 4.9 0 0 1-1.76-1.15 4.9 4.9 0 0 1-1.15-1.76c-.25-.64-.42-1.37-.47-2.43C2.01 15.06 2 14.7 2 12s.01-3.06.06-4.12c.05-1.06.22-1.79.47-2.43.26-.66.6-1.21 1.15-1.76A4.9 4.9 0 0 1 5.44.54c.64-.25 1.37-.42 2.43-.47C8.94.02 9.3.01 12 .01Zm0 1.8c-2.66 0-2.98.01-4.03.06-.87.04-1.34.18-1.65.3-.42.16-.71.35-1.02.66-.31.31-.5.6-.66 1.02-.12.31-.26.78-.3 1.65-.05 1.05-.06 1.37-.06 4.03s.01 2.98.06 4.03c.04.87.18 1.34.3 1.65.16.42.35.71.66 1.02.31.31.6.5 1.02.66.31.12.78.26 1.65.3 1.05.05 1.37.06 4.03.06s2.98-.01 4.03-.06c.87-.04 1.34-.18 1.65-.3.42-.16.71-.35 1.02-.66.31-.31.5-.6.66-1.02.12-.31.26-.78.3-1.65.05-1.05.06-1.37.06-4.03s-.01-2.98-.06-4.03c-.04-.87-.18-1.34-.3-1.65a2.7 2.7 0 0 0-.66-1.02 2.7 2.7 0 0 0-1.02-.66c-.31-.12-.78-.26-1.65-.3-1.05-.05-1.37-.06-4.03-.06Zm0 4.6a4.6 4.6 0 1 1 0 9.2 4.6 4.6 0 0 1 0-9.2Zm0 1.8a2.8 2.8 0 1 0 0 5.6 2.8 2.8 0 0 0 0-5.6Zm5.85-1.98a1.08 1.08 0 1 1-2.15 0 1.08 1.08 0 0 1 2.15 0Z" />
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
