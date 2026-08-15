// Simple full-width "Powered by ProvidusBank" partner logo banner, used between
// the platform cards and the support section on the Access Client Portal page.
import Image from "next/image";

export interface PartnerBannerProps {
  imageSrc: string;
  imageAlt: string;
}

export default function PartnerBanner({ imageSrc, imageAlt }: PartnerBannerProps) {
  return (
    <section className="mx-auto max-w-5xl px-4 py-16 sm:px-8">
      <div className="relative aspect-[2000/538] w-full">
        <Image src={imageSrc} alt={imageAlt} fill className="object-contain" />
      </div>
    </section>
  );
}
