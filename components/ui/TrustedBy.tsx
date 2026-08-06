import Image from "next/image";
import type { TrustedByContent } from "@/data/mockContent";

export interface TrustedByProps {
  content: TrustedByContent;
  logosImageSrc: string;
}

export default function TrustedBy({ content, logosImageSrc }: TrustedByProps) {
  return (
    <section className="bg-[#262626] py-24 text-center">
      <div className="mx-auto max-w-4xl px-4 sm:px-8">
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
