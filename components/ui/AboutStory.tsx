import Image from "next/image";
import type { AboutStoryContent } from "@/data/mockContent";

export interface AboutStoryProps {
  content: AboutStoryContent;
}

export default function AboutStory({ content }: AboutStoryProps) {
  return (
    <section className="mx-auto max-w-2xl px-4 pb-16 pt-32 text-left sm:px-8">
      <div className="rounded-2xl border border-brand-900/10 p-10 sm:p-12">
        <span className="text-xs font-medium uppercase tracking-wide text-orange-500">
          {content.eyebrow}
        </span>
        <h2 className="mt-3 text-2xl font-semibold leading-snug text-brand-900 sm:text-3xl">
          {content.heading}
        </h2>

        <div className="mt-6 flex flex-col gap-4">
          {content.paragraphs.map((paragraph, index) => (
            <p key={index} className="text-sm leading-relaxed text-brand-900/60">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="mt-8 flex items-center gap-2">
          <Image
            src="/about-signature-icon.jpg"
            alt=""
            width={136}
            height={142}
            className="h-5 w-auto"
          />
          <span className="text-sm font-medium text-brand-900">{content.signatureName}</span>
        </div>
      </div>
    </section>
  );
}
