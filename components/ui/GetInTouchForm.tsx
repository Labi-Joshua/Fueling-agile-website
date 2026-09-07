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

// A required-field label sitting inside its own bordered box, e.g. "Full name *".
function Field({
  value,
  onChange,
  placeholder,
  required = true,
  type = "text",
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  required?: boolean;
  type?: string;
}) {
  return (
    <label className="flex flex-col gap-1 rounded-lg border border-brand-900/10 bg-white px-4 py-2.5">
      <span className="text-xs text-brand-900/50">
        {placeholder}
        {required && <span className="text-orange-500"> *</span>}
      </span>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full text-sm text-brand-900 focus:outline-none"
      />
    </label>
  );
}

export default function GetInTouchForm({ content }: GetInTouchFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyAddress, setCompanyAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
  }

  return (
    <section className="mx-auto grid max-w-[1536px] grid-cols-1 items-center gap-16 px-4 pt-20 sm:px-8 sm:pt-28 lg:grid-cols-[620px_1fr] lg:px-24">
      <div className="flex w-full flex-col items-start text-left">
        <span className="text-xs font-semibold uppercase tracking-wide text-orange-500">
          {content.eyebrow}
        </span>
        <h1 className="mt-2 font-heading text-4xl font-normal leading-[110%] tracking-[-2px] text-brand-900 sm:text-[44px]">
          {content.heading}
        </h1>
        <p className="mt-4 text-sm text-brand-900/50">{content.subheading}</p>

        <form onSubmit={handleSubmit} className="mt-8 flex w-full flex-col gap-3">
          <Field value={name} onChange={setName} placeholder={content.namePlaceholder} />
          <Field value={email} onChange={setEmail} placeholder={content.emailPlaceholder} type="email" />
          <Field value={phone} onChange={setPhone} placeholder={content.phonePlaceholder} type="tel" />
          <Field value={companyName} onChange={setCompanyName} placeholder={content.companyNamePlaceholder} />
          <Field value={companyAddress} onChange={setCompanyAddress} placeholder={content.companyAddressPlaceholder} />

          <div className="grid grid-cols-2 gap-3">
            <Field value={city} onChange={setCity} placeholder={content.cityPlaceholder} />
            <Field value={state} onChange={setState} placeholder={content.statePlaceholder} />
          </div>

          <label className="flex flex-col gap-1 rounded-lg border border-brand-900/10 bg-white px-4 py-2.5">
            <textarea
              rows={3}
              placeholder={content.messagePlaceholder}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full resize-none text-sm text-brand-900 placeholder:text-brand-900/50 focus:outline-none"
            />
          </label>

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
