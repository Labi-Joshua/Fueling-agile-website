import Image from "next/image";
import type { PortalPageContent } from "@/data/mockContent";

export interface PortalPlatformsProps {
  content: PortalPageContent;
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 12 12" fill="none" className="mt-0.5 shrink-0">
      <path
        d="M2 6.5L4.5 9L10 3"
        stroke="#f97316"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function PortalPlatforms({ content }: PortalPlatformsProps) {
  return (
    <section className="mx-auto max-w-5xl px-4 pt-20 text-center sm:px-8 sm:pt-28">
      <span className="text-xs font-medium uppercase tracking-wide text-orange-500">
        {content.eyebrow}
      </span>
      <h1 className="mx-auto mt-3 max-w-2xl font-heading text-2xl font-normal leading-[110%] tracking-[-2px] text-brand-900 sm:text-[56px]">
        {content.heading}
      </h1>
      <p className="mx-auto mt-4 max-w-xl text-sm text-brand-900/50">
        {content.subheading}
      </p>

      <div className="mt-16 grid grid-cols-1 gap-8 text-left md:grid-cols-2">
        {content.platforms.map((platform) => (
          <div key={platform.title} className="flex flex-col border border-brand-900/10">
            <div className="p-6">
              <h2 className="text-lg font-semibold text-brand-900">{platform.title}</h2>
              <p className="mt-1 text-sm text-brand-900/50">{platform.subtitle}</p>
            </div>

            <div className="px-6">
              <div className="relative aspect-[1600/786] overflow-hidden border border-brand-900/10">
                <Image
                  src={platform.image.src}
                  alt={platform.image.alt}
                  fill
                  className="object-cover object-top"
                />
              </div>
            </div>

            <div className="p-6">
              <a
                href={platform.ctaHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-full bg-brand-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-black"
              >
                {platform.ctaText}
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

            <ul className="flex flex-col gap-3 border-t border-brand-900/10 p-6">
              {platform.checklist.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-brand-900/70">
                  <CheckIcon />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
