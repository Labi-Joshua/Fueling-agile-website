import Image from "next/image";
import type { AboutHeroContent } from "@/data/mockContent";
import VideoPlayer from "@/components/ui/VideoPlayer";

export interface AboutHeroProps {
  content: AboutHeroContent;
  strokeImageSrc: string;
}

export default function AboutHero({ content, strokeImageSrc }: AboutHeroProps) {
  return (
    <section className="mx-auto max-w-4xl px-4 pt-20 text-center sm:px-8 sm:pt-28">
      <span className="text-xs font-medium uppercase tracking-wide text-orange-500">
        {content.eyebrow}
      </span>
      <h1 className="mx-auto mt-3 font-heading text-2xl font-normal leading-[110%] tracking-[-2px] text-brand-900 sm:text-[56px]">
        {content.heading}
      </h1>
      <p className="mx-auto mt-4 max-w-md text-sm text-brand-900/50">{content.subheading}</p>

      <div className="relative mt-16">
        <div className="pointer-events-none absolute left-1/2 top-1/2 w-[150%] max-w-none -translate-x-1/2 -translate-y-1/2">
          <Image
            src={strokeImageSrc}
            alt=""
            width={1800}
            height={951}
            className="h-auto w-full"
          />
        </div>

        <div className="relative">
          <VideoPlayer
            videoSrc={content.video.videoSrc}
            posterSrc={content.video.posterSrc}
            title={content.video.thumbnailAlt}
          />
        </div>
      </div>
    </section>
  );
}
