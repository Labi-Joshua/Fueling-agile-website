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
    <div className="flex w-full flex-col gap-4 rounded-3xl border border-[#C2DB86] bg-white pb-3 pt-10 text-left">
      <div className="px-4">
        <p className="text-xl font-semibold text-brand-900">{title}</p>
        <p className="mt-1 text-sm leading-relaxed text-brand-900/50">{description}</p>
      </div>

      <div className="relative mx-3 aspect-[3/2] overflow-hidden rounded-2xl bg-brand-500/10">
        {!imageFailed && (
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(min-width: 768px) 420px, 100vw"
            className="object-cover"
            onError={() => setImageFailed(true)}
          />
        )}
      </div>
    </div>
  );
}
