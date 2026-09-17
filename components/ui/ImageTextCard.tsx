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
  // Full Tailwind aspect-ratio class (e.g. "aspect-[11/10]"), applied to the
  // whole card so every card sharing this class — and the same width — ends
  // up the same height, regardless of how long each title/description runs.
  // The image fills whatever height that leaves via flex-1.
  aspectClassName?: string;
}

export default function ImageTextCard({
  title,
  description,
  image,
  aspectClassName = "aspect-[11/10]",
}: ImageTextCardProps) {
  // Falls back to a plain brand-tinted block instead of a broken image if
  // the source 404s (some callers point at photos that haven't been
  // provided yet — see e.g. the TODO on personaGridContent in mockContent.ts).
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <div className={`flex w-full flex-col gap-4 rounded-3xl border border-[#C2DB86] bg-white pb-3 pt-10 text-left ${aspectClassName}`}>
      <div className="px-4">
        <p className="text-xl font-semibold text-brand-900">{title}</p>
        <p className="mt-1 text-sm leading-relaxed text-brand-900/50">{description}</p>
      </div>

      <div className="relative mx-3 mt-auto flex-1 overflow-hidden rounded-2xl border border-[#C2DB86] bg-brand-500/10">
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
