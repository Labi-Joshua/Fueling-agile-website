// Stacked-card icon + "Over 2,000+ active cards" stat — a small decorative trust
// signal reused on both the homepage hero and the newsletter signup section.
import Image from "next/image";

export default function ActiveCardsBadge() {
  return (
    <div className="flex items-center gap-3">
      <Image
        src="/active-cards-icon.png"
        alt=""
        width={156}
        height={118}
        className="h-9 w-auto shrink-0"
      />
      <p className="text-sm text-brand-900/40">
        <span className="font-semibold text-brand-900">Over 2,000+</span> active cards.
      </p>
    </div>
  );
}
