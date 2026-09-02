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
    <header className="sticky top-0 z-50 border-b border-zinc-200/70 bg-white/80 shadow-[0_1px_20px_-8px_rgba(0,0,0,0.15)] backdrop-blur-xl dark:border-zinc-800/70 dark:bg-zinc-950/80">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        {/* Branding */}
        <Link
          href="/"
          className="group flex min-w-0 items-center gap-2.5 leading-tight"
          onClick={() => setMobileOpen(false)}
        >
          <span
            aria-hidden="true"
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-teal-700 text-sm font-bold text-white shadow-[0_4px_14px_-4px_rgba(13,148,136,0.5)] transition-transform duration-150 group-hover:scale-105"
          >
            AP
          </span>
          <span className="flex min-w-0 flex-col">
            <span className="truncate text-base font-semibold tracking-tight text-teal-700 sm:text-lg dark:text-teal-400">
              Dr. Adelyn Pereira
            </span>
            <span className="truncate text-[0.65rem] font-medium uppercase tracking-wider text-zinc-500 sm:text-xs dark:text-zinc-400">
              Physiotherapy &amp; Rehabilitation
            </span>
          </span>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-100/70 hover:text-teal-700 dark:text-zinc-300 dark:hover:bg-zinc-800/60 dark:hover:text-teal-400"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/book"
            className="ml-2 whitespace-nowrap rounded-full bg-teal-700 px-4 py-2 text-sm font-semibold text-white shadow-[0_4px_18px_-4px_rgba(13,148,136,0.5)] transition-all duration-150 hover:-translate-y-0.5 hover:bg-teal-800 hover:shadow-[0_10px_26px_-6px_rgba(13,148,136,0.55)] active:translate-y-0 active:scale-[0.98]"
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
          className="inline-flex shrink-0 items-center justify-center rounded-lg border border-zinc-200/80 p-2 text-zinc-700 transition-colors hover:border-teal-500/40 hover:bg-zinc-100 lg:hidden dark:border-zinc-800/80 dark:text-zinc-200 dark:hover:bg-zinc-800"
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
        <nav className="border-t border-zinc-200/70 bg-white/95 px-4 py-4 backdrop-blur-xl lg:hidden dark:border-zinc-800/70 dark:bg-zinc-950/95">
          <ul className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-lg px-3 py-2.5 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 hover:text-teal-700 dark:text-zinc-200 dark:hover:bg-zinc-800 dark:hover:text-teal-400"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="mt-2">
              <Link
                href="/book"
                onClick={() => setMobileOpen(false)}
                className="block rounded-full bg-teal-700 px-4 py-2.5 text-center text-sm font-semibold text-white shadow-[0_4px_18px_-4px_rgba(13,148,136,0.5)] transition-colors hover:bg-teal-800"
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
