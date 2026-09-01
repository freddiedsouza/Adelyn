"use client";

import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/book", label: "Book Appointment" },
  { href: "/portal", label: "Patient Portal" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/90 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/90">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        {/* Branding */}
        <Link
          href="/"
          className="flex min-w-0 flex-col leading-tight"
          onClick={() => setMobileOpen(false)}
        >
          <span className="truncate text-base font-semibold tracking-tight text-teal-700 sm:text-lg dark:text-teal-400">
            Dr. Adelyn Pereira
          </span>
          <span className="truncate text-[0.65rem] font-medium uppercase tracking-wide text-zinc-500 sm:text-xs dark:text-zinc-400">
            Physiotherapy &amp; Rehabilitation
          </span>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-5 lg:flex xl:gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="whitespace-nowrap text-sm font-medium text-zinc-600 transition-colors hover:text-teal-700 dark:text-zinc-300 dark:hover:text-teal-400"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/book"
            className="whitespace-nowrap rounded-full bg-teal-700 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-teal-800"
          >
            Book Consultation
          </Link>
        </nav>

        {/* Mobile / tablet menu toggle */}
        <button
          type="button"
          aria-label="Toggle navigation menu"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((open) => !open)}
          className="inline-flex shrink-0 items-center justify-center rounded-md p-2 text-zinc-700 hover:bg-zinc-100 lg:hidden dark:text-zinc-200 dark:hover:bg-zinc-800"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            {mobileOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile / tablet menu panel */}
      {mobileOpen && (
        <nav className="border-t border-zinc-200 bg-white px-4 py-4 lg:hidden dark:border-zinc-800 dark:bg-zinc-950">
          <ul className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-md px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100 hover:text-teal-700 dark:text-zinc-200 dark:hover:bg-zinc-800 dark:hover:text-teal-400"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="mt-2">
              <Link
                href="/book"
                onClick={() => setMobileOpen(false)}
                className="block rounded-full bg-teal-700 px-4 py-2 text-center text-sm font-semibold text-white transition-colors hover:bg-teal-800"
              >
                Book Consultation
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
