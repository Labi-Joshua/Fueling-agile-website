// Renders a product screenshot "floating" over a full-width background image,
// cropped at the top like a browser window peeking into view.
// Not currently used on any page — Hero.tsx moved to a two-column layout with
// the dashboard graphic rendered directly — but kept available for reuse.
import Image from "next/image";

export interface DashboardMockupProps {
  imageSrc: string;
  imageAlt: string;
}

export default function DashboardMockup({ imageSrc, imageAlt }: DashboardMockupProps) {
  return (
    <div className="relative w-full overflow-hidden">
      {/* Full-bleed background image with a subtle dark overlay */}
      <Image
        src="/hero-background.jpg"
        alt=""
        fill
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-brand-900/10" />

      {/* The actual dashboard screenshot, rounded at the top and drop-shadowed */}
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
