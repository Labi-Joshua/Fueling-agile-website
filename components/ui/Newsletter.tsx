"use client";

// Homepage newsletter signup: a white card (with a decorative swirl behind it,
// matching the accent used elsewhere on the page) holding an email capture form,
// a consent checkbox, and the same active-cards trust badge used in the hero.
// The form has no backend wired up yet — submitting just prevents the page reload.
import { useState } from "react";
import Image from "next/image";
import type { NewsletterContent } from "@/data/mockContent";
import { useFadeInOnScroll } from "@/hooks/useFadeInOnScroll";
import ActiveCardsBadge from "@/components/ui/ActiveCardsBadge";

export interface NewsletterProps {
  content: NewsletterContent;
}

export default function Newsletter({ content }: NewsletterProps) {
  const sectionRef = useFadeInOnScroll<HTMLElement>();
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);

  // No email provider wired up yet — this just stops the native form
  // submission/page reload until one is connected.
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
  }

  return (
    <section
      ref={sectionRef}
      className="mx-auto max-w-[1536px] px-4 pb-40 pt-36 sm:px-8 sm:pb-48 sm:pt-44"
    >
      <div className="relative mx-auto max-w-2xl overflow-visible">
        {/* Decorative interlocking rings, matching the accent color/style used
            behind other homepage graphics — purely background flourish, sits
            behind the card. */}
        <div className="pointer-events-none absolute -inset-x-40 -inset-y-16 -z-10 h-[calc(100%+8rem)] w-[calc(100%+20rem)]">
          <Image
            src="/newsletter-rings.png"
            alt=""
            fill
            loading="eager"
            sizes="(min-width: 672px) 992px, 100vw"
            className="object-contain"
          />
        </div>

        <div className="relative rounded-3xl border border-brand-900/10 bg-white px-6 py-12 text-center shadow-sm sm:px-16">
          <span className="text-xs font-medium uppercase tracking-wide text-orange-500">
            {content.eyebrow}
          </span>
          <h2 className="mx-auto mt-3 max-w-md font-heading text-2xl font-normal leading-[110%] tracking-[-1px] text-brand-900 sm:text-[36px]">
            {content.heading}
          </h2>
          <p className="mx-auto mt-3 max-w-sm text-sm text-brand-900/50">
            {content.subheading}
          </p>

          <form
            onSubmit={handleSubmit}
            className="mx-auto mt-6 flex max-w-md items-center gap-1.5 rounded-full border border-brand-900/10 bg-white p-1.5 pl-5"
          >
            <input
              type="email"
              required
              placeholder={content.placeholder}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="min-w-0 flex-1 bg-transparent text-sm text-brand-900 placeholder:text-brand-900/40 focus:outline-none"
            />
            <button
              type="submit"
              className="flex shrink-0 items-center justify-center gap-2 rounded-full bg-brand-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-600"
            >
              {content.buttonText}
              <svg width="14" height="14" viewBox="0 0 12 12" fill="none">
                <path
                  d="M3 1.5L8.5 6L3 10.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </form>

          <label className="mx-auto mt-4 flex max-w-sm items-start justify-center gap-2 text-center text-xs text-brand-900/50">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="mt-0.5 shrink-0"
            />
            {content.consentText}
          </label>

          <div className="mt-6 flex justify-center">
            <ActiveCardsBadge />
          </div>
        </div>
      </div>
    </section>
  );
}
