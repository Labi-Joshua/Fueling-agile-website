"use client";

// "Request fuel cards" modal, opened from every "Request fuel cards" CTA
// button site-wide (see RequestFuelCardModalProvider). No backend wired up
// yet — submitting just prevents the native page reload until one is
// connected. Renders via a portal to document.body so it always sits above
// whatever page/section happened to open it.
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { RequestFuelCardModalContent } from "@/data/mockContent";
import { useLenis } from "@/components/providers/SmoothScrollProvider";

export interface RequestFuelCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  content: RequestFuelCardModalContent;
}

const inputClassName =
  "w-full rounded-full border border-brand-900/10 bg-white px-5 py-3 text-sm text-brand-900 placeholder:text-brand-900/40 focus:border-brand-500/50 focus:outline-none";

const labelClassName = "flex items-center gap-1 text-sm font-medium text-brand-900";

function RequiredMark() {
  return <span className="text-red-500">*</span>;
}

export default function RequestFuelCardModal({ isOpen, onClose, content }: RequestFuelCardModalProps) {
  const lenis = useLenis();
  const bodyRef = useRef<HTMLDivElement>(null);
  // Drives the custom scroll-position indicator below (a plain styled div,
  // not native scrollbar theming — iOS Safari never renders
  // ::-webkit-scrollbar, and it's not guaranteed to render as a persistent
  // element in other browsers either, so a real element is the only way to
  // reliably show "this form scrolls" everywhere).
  const [scrollThumb, setScrollThumb] = useState({ canScroll: false, heightPct: 100, topPct: 0 });

  // Locks background scroll (both native and Lenis-driven) while the modal is
  // open, and closes it on Escape.
  useEffect(() => {
    if (!isOpen) return;

    lenis?.stop();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      lenis?.start();
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, lenis, onClose]);

  // Measures the form body once it's mounted (and on resize) to size/hide
  // the scroll indicator, then keeps its position in sync while scrolling.
  useEffect(() => {
    if (!isOpen) return;

    function measure() {
      const el = bodyRef.current;
      if (!el) return;
      const { scrollTop, scrollHeight, clientHeight } = el;
      const canScroll = scrollHeight > clientHeight + 1;
      const heightPct = canScroll ? Math.max((clientHeight / scrollHeight) * 100, 10) : 100;
      const maxScroll = scrollHeight - clientHeight;
      const topPct = canScroll && maxScroll > 0 ? (scrollTop / maxScroll) * (100 - heightPct) : 0;
      setScrollThumb({ canScroll, heightPct, topPct });
    }

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [isOpen]);

  function handleBodyScroll() {
    const el = bodyRef.current;
    if (!el) return;
    const { scrollTop, scrollHeight, clientHeight } = el;
    const maxScroll = scrollHeight - clientHeight;
    setScrollThumb((prev) => ({
      ...prev,
      topPct: maxScroll > 0 ? (scrollTop / maxScroll) * (100 - prev.heightPct) : 0,
    }));
  }

  // isOpen only ever becomes true from a client-side click (see
  // RequestFuelCardModalProvider's useState(false) default), never from SSR'd
  // state, so this alone is enough to keep createPortal off the server render
  // without a separate "has mounted" flag.
  if (!isOpen) return null;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
  }

  return createPortal(
    // Mobile: the backdrop is just a plain fixed layer — the dialog itself is
    // fixed full-screen on top of it (see below), so no centering/scrolling
    // is needed here. Desktop (sm+): restores the original centered,
    // scrollable-backdrop layout.
    <div className="fixed inset-0 z-50 bg-brand-900/50 sm:flex sm:items-center sm:justify-center sm:overflow-y-auto sm:px-4 sm:py-16">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="request-fuel-card-heading"
        // Mobile: fills the viewport as a full-screen sheet, its own flex
        // column so the header stays put (below) while only the body
        // scrolls. Desktop (sm+): unchanged centered card.
        className="fixed inset-0 flex flex-col bg-white sm:relative sm:inset-auto sm:w-full sm:max-w-3xl sm:rounded-3xl sm:border-2 sm:border-brand-500 sm:shadow-xl"
      >
        {/* Header: eyebrow/heading/subheading + close button. Kept out of the
            scrollable body below so the close button is always reachable on
            mobile, no matter how far the form is scrolled. */}
        <div className="relative shrink-0 border-b border-brand-900/10 px-6 pb-4 pt-6 text-center sm:border-0 sm:px-10 sm:pb-0 sm:pt-10">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full text-brand-900/40 transition-colors hover:bg-brand-900/5 hover:text-brand-900"
          >
            <svg width="16" height="16" viewBox="0 0 12 12" fill="none">
              <path d="M1.5 1.5L10.5 10.5M10.5 1.5L1.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>

          <span className="text-xs font-medium uppercase tracking-wide text-orange-500">
            {content.eyebrow}
          </span>
          <h2 id="request-fuel-card-heading" className="mt-3 text-2xl font-semibold text-brand-900 sm:text-3xl">
            {content.heading}
          </h2>
          <p className="mx-auto mt-2 max-w-sm text-sm text-brand-900/50">{content.subheading}</p>
        </div>

        {/* Body: the only part that scrolls on mobile (overscroll-contain
            keeps that scroll from rubber-banding into the page behind it).
            data-lenis-prevent stops Lenis's global wheel/touch hijacking from
            swallowing scroll gestures inside this nested scroll container —
            without it, Lenis intercepts them for the page's own (stopped)
            scroll instead of letting them scroll this div natively.
            On desktop the backdrop itself scrolls instead, as before. */}
        <div className="relative min-h-0 flex-1 sm:flex-none">
          <div
            ref={bodyRef}
            onScroll={handleBodyScroll}
            data-lenis-prevent
            className="h-full overflow-y-auto overscroll-contain px-6 pb-6 text-center sm:h-auto sm:overflow-visible sm:px-10 sm:pb-10"
          >
            <form onSubmit={handleSubmit} className="mt-6 text-left sm:mt-8">
            <div className="flex flex-col gap-5 rounded-2xl bg-[#EEF3DE] p-5 sm:p-8">
              <div>
                <label className={labelClassName}>{content.companyNameLabel}</label>
                <input type="text" required placeholder={content.companyNamePlaceholder} className={`mt-2 ${inputClassName}`} />
              </div>

              <div>
                <label className={labelClassName}>{content.representativeNameLabel}</label>
                <div className="mt-2 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <input type="text" required placeholder={content.firstNamePlaceholder} className={inputClassName} />
                  <input type="text" required placeholder={content.lastNamePlaceholder} className={inputClassName} />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label className={labelClassName}>
                    {content.emailLabel} <RequiredMark />
                  </label>
                  <input type="email" required placeholder={content.emailPlaceholder} className={`mt-2 ${inputClassName}`} />
                </div>
                <div>
                  <label className={labelClassName}>
                    {content.phoneLabel} <RequiredMark />
                  </label>
                  <input type="tel" required placeholder={content.phonePlaceholder} className={`mt-2 ${inputClassName}`} />
                </div>
              </div>

              <div>
                <label className={labelClassName}>
                  {content.cardTypeLabel} <RequiredMark />
                </label>
                <select required defaultValue="" className={`mt-2 appearance-none text-brand-900/40 valid:text-brand-900 ${inputClassName}`}>
                  <option value="" disabled>
                    {content.cardTypePlaceholder}
                  </option>
                  {content.cardTypeOptions.map((option) => (
                    <option key={option} value={option} className="text-brand-900">
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className={labelClassName}>
                  {content.vehicleCountLabel} <RequiredMark />
                </label>
                <select required defaultValue={content.vehicleCountOptions[0]} className={`mt-2 appearance-none ${inputClassName}`}>
                  {content.vehicleCountOptions.map((option) => (
                    <option key={option} value={option} className="text-brand-900">
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className={labelClassName}>{content.vehicleInfoLabel}</label>
                <div className="mt-2 grid grid-cols-1 gap-3 sm:grid-cols-3">
                  <input type="text" placeholder={content.vehicleMakePlaceholder} className={inputClassName} />
                  <input type="text" placeholder={content.vehicleModelPlaceholder} className={inputClassName} />
                  <input type="text" placeholder={content.registrationPlaceholder} className={inputClassName} />
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-8 py-4 text-sm font-semibold text-white transition-colors hover:bg-brand-900"
              >
                {content.submitText}
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
            </div>
          </form>
          </div>

          {/* Scroll-position indicator, mobile only — a plain track+thumb
              rather than native scrollbar theming (see the note above), so
              it renders identically on iOS, Android, and desktop browsers. */}
          {scrollThumb.canScroll && (
            <div className="pointer-events-none absolute bottom-2 right-1.5 top-2 w-1 rounded-full bg-brand-900/10 sm:hidden">
              <div
                className="absolute inset-x-0 rounded-full bg-brand-900/30"
                style={{ height: `${scrollThumb.heightPct}%`, top: `${scrollThumb.topPct}%` }}
              />
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}
