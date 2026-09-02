"use client";

// "Get in touch" page: a two-column layout — eyebrow/heading/subheading and a
// lead-capture form on the left, the fleet-chat phone mockup on the right in a
// soft gray card. No backend wired up yet — submitting just prevents the
// native page reload until a real endpoint is connected.
import { useState } from "react";
import Image from "next/image";
import type { GetInTouchContent } from "@/data/mockContent";

export interface GetInTouchFormProps {
  content: GetInTouchContent;
}

const inputClassName =
  "w-full rounded-lg border border-brand-900/10 bg-white px-4 py-3 text-sm text-brand-900 placeholder:text-brand-900/40 focus:border-brand-500/50 focus:outline-none";

export default function GetInTouchForm({ content }: GetInTouchFormProps) {
  const [name, setName] = useState("");
  const [fleetSize, setFleetSize] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
  }

  return (
    <section className="mx-auto grid max-w-[1536px] grid-cols-1 items-center gap-16 px-24 pt-20 sm:pt-28 lg:grid-cols-[620px_1fr]">
      <div className="flex w-full flex-col items-start text-left">
        <span className="text-xs font-semibold uppercase tracking-wide text-orange-500">
          {content.eyebrow}
        </span>
        <h1 className="mt-2 font-heading text-4xl font-normal leading-[110%] tracking-[-2px] text-brand-900 sm:text-[44px]">
          {content.heading}
        </h1>
        <p className="mt-4 text-sm text-brand-900/50">{content.subheading}</p>

        <form onSubmit={handleSubmit} className="mt-8 flex w-full flex-col gap-3">
          <input
            type="text"
            required
            placeholder={content.namePlaceholder}
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputClassName}
          />

          <div className="relative">
            <select
              required
              value={fleetSize}
              onChange={(e) => setFleetSize(e.target.value)}
              className={`${inputClassName} appearance-none pr-10 ${fleetSize ? "" : "text-brand-900/40"}`}
            >
              <option value="" disabled>
                Fleet size
              </option>
              {content.fleetSizeOptions.map((option) => (
                <option key={option} value={option} className="text-brand-900">
                  {option}
                </option>
              ))}
            </select>
            <svg
              width="14"
              height="14"
              viewBox="0 0 12 12"
              fill="none"
              className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-brand-900/50"
            >
              <path
                d="M3 4.5L6 7.5L9 4.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <input
            type="tel"
            required
            placeholder={content.phonePlaceholder}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={inputClassName}
          />

          <input
            type="email"
            required
            placeholder={content.emailPlaceholder}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClassName}
          />

          <button
            type="submit"
            className="mt-2 flex w-fit items-center justify-center gap-2 rounded-full bg-brand-500 px-8 py-4 text-sm font-semibold text-white transition-colors hover:bg-brand-600"
          >
            {content.ctaText}
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
      </div>

      {/* Image already has its own soft background baked in, so it's rendered
          directly with no extra card wrapper around it. */}
      <div className="flex items-center justify-center">
        <Image
          src={content.image.src}
          alt={content.image.alt}
          width={1200}
          height={1488}
          className="h-auto w-full"
        />
      </div>
    </section>
  );
}
