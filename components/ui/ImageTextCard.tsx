"use client";

// Reusable white card: bold title, description, and a photo inset below
// with a light-green frame — originally built for the "Built for how you
// work" persona grid, but generic enough to reuse anywhere a title/
// description/photo needs this same treatment (e.g. team bios, case studies).
import { useState } from "react";
import Image from "next/image";

export interface ImageTextCardProps {
  title: string;
  description: string;
  image: { src: string; alt: string };
}

export default function ImageTextCard({ title, description, image }: ImageTextCardProps) {
  // Falls back to a plain brand-tinted block instead of a broken image if
  // the source 404s (some callers point at photos that haven't been
  // provided yet — see e.g. the TODO on personaGridContent in mockContent.ts).
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <div className="flex w-full flex-col gap-6 rounded-3xl border border-[#C2DB86] bg-white px-3 pb-3 pt-10 text-left sm:h-[604px] sm:w-[636px]">
      <div>
        <p className="text-3xl font-semibold text-brand-900">{title}</p>
        <p className="mt-2 text-base leading-relaxed text-brand-900/50">{description}</p>
      </div>

      <div className="relative aspect-[3/2] w-full overflow-hidden rounded-2xl bg-brand-500/10 sm:aspect-auto sm:flex-1">
        {!imageFailed && (
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(min-width: 768px) 636px, 100vw"
            className="object-cover"
            onError={() => setImageFailed(true)}
          />
        )}
      </div>
    </div>
  );
}
