"use client";

// Floating "back to top" button, fixed to the bottom-right corner of the
// viewport. Hidden until the page has been scrolled down a bit, then fades/
// slides in. Scrolls back up through Lenis (see SmoothScrollProvider) so the
// motion matches the rest of the site's scrolling, falling back to native
// smooth-scroll if Lenis hasn't mounted yet.
import { useEffect, useState } from "react";
import { useLenis } from "@/components/providers/SmoothScrollProvider";

const SHOW_AFTER_PX = 600;

export default function BackToTopButton() {
  const lenis = useLenis();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setVisible(window.scrollY > SHOW_AFTER_PX);
    }
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function scrollToTop() {
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Back to top"
      className={`fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-brand-500 text-white shadow-lg transition-all duration-300 hover:bg-brand-600 sm:bottom-8 sm:right-8 ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <svg width="16" height="16" viewBox="0 0 12 12" fill="none">
        <path
          d="M1.5 7.5L6 3L10.5 7.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
