"use client";

// Dark "Certified by the bodies that regulate this industry" strip. The logos
// themselves are a single pre-composed image (logosImageSrc) rather than separate
// <Image> elements per logo.
import Image from "next/image";
import type { TrustedByContent } from "@/data/mockContent";
import { useFadeInOnScroll } from "@/hooks/useFadeInOnScroll";

export interface TrustedByProps {
  content: TrustedByContent;
  logosImageSrc: string;
}

export default function TrustedBy({ content, logosImageSrc }: TrustedByProps) {
  const sectionRef = useFadeInOnScroll<HTMLElement>();

  return (
    <section ref={sectionRef} className="bg-[#262626] py-24 text-center">
      <div className="mx-auto max-w-5xl px-4 sm:px-8">
        <h2 className="text-2xl font-semibold text-white sm:text-3xl">
          {content.heading}
        </h2>

        <div className="relative mx-auto mt-10 max-w-2xl">
          <Image
            src={logosImageSrc}
            alt={content.logos.map((logo) => logo.name).join(" and ")}
            width={1800}
            height={243}
            className="h-auto w-full"
          />
        </div>
      </div>
    </section>
  );
}
