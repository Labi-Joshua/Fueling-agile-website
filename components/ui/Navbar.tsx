"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { NavLink } from "@/data/mockContent";

export interface NavbarProps {
  brand: string;
  links: NavLink[];
  loginText: string;
  loginHref: string;
  ctaText: string;
  ctaHref: string;
}

export default function Navbar({
  brand,
  links,
  loginText,
  loginHref,
  ctaText,
  ctaHref,
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-brand-900/10 bg-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-8 px-4 py-4 sm:px-8">
        <Link href="/" className="flex items-center">
          <Image
            src="/fan-logo.png"
            alt={brand}
            width={220}
            height={64}
            priority
            className="h-10 w-auto sm:h-12"
          />
        </Link>

        <ul className="hidden items-center gap-2 rounded-full bg-brand-900/5 px-2 py-2 lg:flex">
          {links.map((link) => (
            <li
              key={link.href}
              className="relative"
              onMouseEnter={() => link.children && setOpenDropdown(link.label)}
              onMouseLeave={() => link.children && setOpenDropdown(null)}
            >
              <Link
                href={link.href}
                className="flex items-center gap-1 rounded-full px-4 py-2 text-sm font-normal text-brand-900/80 transition-colors hover:text-brand-500"
              >
                {link.label}
                {link.children && (
                  <svg width="14" height="14" viewBox="0 0 12 12" fill="none">
                    <path
                      d="M3 4.5L6 7.5L9 4.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </Link>

              {link.children && openDropdown === link.label && (
                <ul className="absolute left-0 top-full flex w-56 flex-col gap-1 rounded-xl border border-brand-900/10 bg-white p-2 shadow-lg">
                  {link.children.map((child) => (
                    <li key={child.href}>
                      <Link
                        href={child.href}
                        className="block rounded-lg px-4 py-2 text-sm text-brand-900/80 hover:bg-brand-500/10 hover:text-brand-900"
                      >
                        {child.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-2 rounded-full bg-brand-900/5 py-2 pl-6 pr-2 lg:flex">
          <Link
            href={loginHref}
            className="text-sm font-normal text-brand-900/80 hover:text-brand-900"
          >
            {loginText}
          </Link>
          <Link
            href={ctaHref}
            className="rounded-full bg-brand-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-600"
          >
            {ctaText}
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
          className="flex h-8 w-8 flex-col items-center justify-center gap-1 lg:hidden"
        >
          <span className="h-0.5 w-6 bg-brand-900" />
          <span className="h-0.5 w-6 bg-brand-900" />
          <span className="h-0.5 w-6 bg-brand-900" />
        </button>
      </nav>

      {isOpen && (
        <div className="flex flex-col gap-4 px-4 pb-8 lg:hidden">
          <ul className="flex flex-col gap-4">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block text-sm font-normal text-brand-900 hover:text-brand-500"
                >
                  {link.label}
                </Link>
                {link.children && (
                  <ul className="mt-2 flex flex-col gap-2 pl-4">
                    {link.children.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          onClick={() => setIsOpen(false)}
                          className="block text-sm text-brand-900/70 hover:text-brand-500"
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>

          <div className="flex flex-col gap-3 pt-4">
            <Link
              href={loginHref}
              className="text-center text-sm font-normal text-brand-900"
              onClick={() => setIsOpen(false)}
            >
              {loginText}
            </Link>
            <Link
              href={ctaHref}
              className="rounded-full bg-brand-500 px-6 py-3 text-center text-sm font-semibold text-white"
              onClick={() => setIsOpen(false)}
            >
              {ctaText}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
