import Image from "next/image";
import type { PortalSupportContent } from "@/data/mockContent";

export interface PortalSupportProps {
  content: PortalSupportContent;
}

export default function PortalSupport({ content }: PortalSupportProps) {
  return (
    <section className="mx-auto max-w-5xl px-4 py-16 sm:px-8">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-[2fr_1fr] md:items-stretch">
        <div className="relative aspect-[1200/794] overflow-hidden bg-brand-500/10">
          <Image
            src={content.image.src}
            alt={content.image.alt}
            fill
            className="object-cover"
          />
        </div>

        <div className="flex flex-col justify-between text-left">
          <div>
            <span className="text-xs font-medium uppercase tracking-wide text-orange-500">
              {content.eyebrow}
            </span>
            <h2 className="mt-3 text-2xl font-semibold leading-snug text-brand-900">
              {content.heading}
            </h2>
          </div>

          <div>
            <p className="text-sm text-brand-900/50">{content.description}</p>
            <a
              href={content.ctaHref}
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-brand-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-600"
            >
              {content.ctaText}
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
      </div>
    </section>
  );
}
