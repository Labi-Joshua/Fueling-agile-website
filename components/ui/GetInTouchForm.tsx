"use client";

// "Get in touch" page: a two-column layout — eyebrow/heading/subheading and a
// lead-capture form on the left, the fleet-chat phone mockup on the right in a
// soft gray card. Submits to /api/contact, which relays the message through
// Zoho SMTP (see lib/mailer.ts) — the credentials never reach this component.
import { useState } from "react";
import Image from "next/image";
import type { GetInTouchContent } from "@/data/mockContent";

export interface GetInTouchFormProps {
  content: GetInTouchContent;
}

type SubmitStatus = "idle" | "loading" | "success" | "error";

// A required-field label sitting inside its own bordered box, e.g. "Full name *".
function Field({
  value,
  onChange,
  placeholder,
  required = true,
  type = "text",
  disabled = false,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  required?: boolean;
  type?: string;
  disabled?: boolean;
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
        disabled={disabled}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full text-sm text-brand-900 focus:outline-none disabled:opacity-50"
      />
    </label>
  );
}

function SpinnerIcon() {
  return (
    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
      <path
        className="opacity-80"
        d="M12 2a10 10 0 0 1 10 10"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SuccessIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="11" className="fill-brand-500/10" />
      <path
        d="M7 12.5l3 3 7-7.5"
        stroke="#5D8721"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
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
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const isLoading = status === "loading";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          companyName,
          companyAddress,
          city,
          state,
          message,
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.error || "Something went wrong. Please try again.");
      }

      setStatus("success");
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Something went wrong. Please try again.");
    }
  }

  function resetForm() {
    setName("");
    setEmail("");
    setPhone("");
    setCompanyName("");
    setCompanyAddress("");
    setCity("");
    setState("");
    setMessage("");
    setStatus("idle");
  }

  return (
    <section className="mx-auto grid max-w-[1536px] grid-cols-1 items-center gap-16 px-4 pb-20 pt-20 sm:px-8 lg:grid-cols-[620px_1fr] lg:px-24">
      <div className="flex w-full flex-col items-start text-left">
        <span className="text-xs font-semibold uppercase tracking-wide text-orange-500">
          {content.eyebrow}
        </span>
        <h1 className="mt-2 font-heading text-4xl font-normal leading-[110%] tracking-[-2px] text-brand-900 sm:text-[44px]">
          {content.heading}
        </h1>
        <p className="mt-4 text-sm text-brand-900/50">{content.subheading}</p>

        {status === "success" ? (
          <div className="mt-8 flex w-full flex-col items-start gap-3 rounded-lg border border-brand-500/20 bg-brand-500/5 p-6">
            <SuccessIcon />
            <p className="text-base font-semibold text-brand-900">Thanks for reaching out!</p>
            <p className="text-sm text-brand-900/60">
              We&apos;ve received your message and will get back to you shortly.
            </p>
            <button
              type="button"
              onClick={resetForm}
              className="mt-1 text-sm font-semibold text-brand-500 underline-offset-2 hover:underline"
            >
              Send another message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 flex w-full flex-col gap-3">
            <Field value={name} onChange={setName} placeholder={content.namePlaceholder} disabled={isLoading} />
            <Field
              value={email}
              onChange={setEmail}
              placeholder={content.emailPlaceholder}
              type="email"
              disabled={isLoading}
            />
            <Field
              value={phone}
              onChange={setPhone}
              placeholder={content.phonePlaceholder}
              type="tel"
              disabled={isLoading}
            />
            <Field
              value={companyName}
              onChange={setCompanyName}
              placeholder={content.companyNamePlaceholder}
              disabled={isLoading}
            />
            <Field
              value={companyAddress}
              onChange={setCompanyAddress}
              placeholder={content.companyAddressPlaceholder}
              disabled={isLoading}
            />

            <div className="grid grid-cols-2 gap-3">
              <Field value={city} onChange={setCity} placeholder={content.cityPlaceholder} disabled={isLoading} />
              <Field value={state} onChange={setState} placeholder={content.statePlaceholder} disabled={isLoading} />
            </div>

            <label className="flex flex-col gap-1 rounded-lg border border-brand-900/10 bg-white px-4 py-2.5">
              <textarea
                rows={3}
                placeholder={content.messagePlaceholder}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                disabled={isLoading}
                className="w-full resize-none text-sm text-brand-900 placeholder:text-brand-900/50 focus:outline-none disabled:opacity-50"
              />
            </label>

            {status === "error" && (
              <p role="alert" className="text-sm text-red-600">
                {errorMessage}
              </p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="mt-2 flex w-fit items-center justify-center gap-2 rounded-full bg-brand-500 px-8 py-4 text-sm font-semibold text-white transition-colors hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isLoading ? (
                <>
                  <SpinnerIcon />
                  Sending...
                </>
              ) : (
                <>
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
                </>
              )}
            </button>
          </form>
        )}
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
