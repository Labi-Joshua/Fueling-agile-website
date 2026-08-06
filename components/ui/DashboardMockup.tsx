import Image from "next/image";

export interface DashboardMockupProps {
  imageSrc: string;
  imageAlt: string;
}

export default function DashboardMockup({ imageSrc, imageAlt }: DashboardMockupProps) {
  return (
    <div className="relative w-full overflow-hidden">
      <Image
        src="/hero-background.jpg"
        alt=""
        fill
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-brand-900/10" />

      <div className="relative flex items-end justify-center px-4 pt-16 sm:px-8 sm:pt-24">
        <div className="w-full max-w-6xl overflow-hidden rounded-t-2xl shadow-2xl">
          <Image
            src={imageSrc}
            alt={imageAlt}
            width={2000}
            height={848}
            className="h-auto w-full"
          />
        </div>
      </div>
    </div>
  );
}
