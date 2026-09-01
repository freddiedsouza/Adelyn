import type { Metadata } from "next";
import Link from "next/link";
import { services } from "@/data/services";
import { priceFrom } from "@/lib/pricing";
import type { ServiceMode } from "@/types/service";

export const metadata: Metadata = {
  title: "Clinical Services & Rehabilitation | Dr. Adelyn Pereira",
  description:
    "Detailed breakdown of Dr. Adelyn Pereira's physiotherapy services — clinical descriptions, treated conditions, treatment methodology, session length, rates, and in-person or virtual availability.",
};

function modeLabel(mode: ServiceMode): string {
  return mode === "in-person" ? "In-Person" : "Virtual";
}

export default function ServicesPage() {
  return (
    <main className="flex flex-1 flex-col">
      {/* Header */}
      <section className="w-full border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16">
          <span className="inline-flex items-center rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-teal-700 dark:border-teal-800 dark:bg-teal-950 dark:text-teal-300">
            Clinical Services
          </span>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl lg:text-5xl dark:text-zinc-50">
            Clinical Services &amp; Rehabilitation
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Every programme begins with an evidence-based assessment and is built
            into a tailored recovery protocol — with clear goals, hands-on
            treatment, and progress you can measure.
          </p>

          {/* Quick-jump anchor bar */}
          <nav
            aria-label="Jump to a service"
            className="-mx-6 mt-8 overflow-x-auto px-6 md:mx-0 md:px-0"
          >
            <ul className="flex w-max gap-2 md:w-auto md:flex-wrap">
              {services.map((service) => (
                <li key={service.id}>
                  <a
                    href={`#${service.id}`}
                    className="inline-block whitespace-nowrap rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:border-teal-600 hover:text-teal-700 dark:border-zinc-700 dark:text-zinc-200 dark:hover:text-teal-400"
                  >
                    {service.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>

      {/* Service sections */}
      <div className="w-full bg-zinc-50 dark:bg-zinc-950">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-12 lg:gap-12 lg:px-8 lg:py-16">
          {services.map((service, index) => (
            <section
              key={service.id}
              id={service.id}
              className="scroll-mt-24 rounded-2xl border border-zinc-200 bg-white p-6 sm:p-8 dark:border-zinc-800 dark:bg-zinc-900"
            >
              <div
                className={`flex flex-col gap-8 md:gap-12 lg:flex-row ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Clinical description + conditions */}
                <div className="lg:flex-1">
                  <p className="text-sm font-semibold text-teal-700 dark:text-teal-400">
                    Service {String(index + 1).padStart(2, "0")}
                  </p>
                  <h2 className="mt-1 text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl dark:text-zinc-50">
                    {service.title}
                  </h2>
                  <p className="mt-4 text-base leading-7 text-zinc-600 dark:text-zinc-300">
                    {service.description}
                  </p>

                  <div className="mt-6">
                    <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                      Commonly treats
                    </p>
                    <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                      {service.targetConditions.map((condition) => (
                        <li
                          key={condition}
                          className="flex gap-2 text-sm text-zinc-600 dark:text-zinc-300"
                        >
                          <svg
                            className="mt-1 h-3.5 w-3.5 shrink-0 text-teal-600 dark:text-teal-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m4.5 12.75 6 6 9-13.5"
                            />
                          </svg>
                          <span>{condition}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Methodology + meta + CTA */}
                <div className="lg:w-80 lg:shrink-0">
                  <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-5 dark:border-zinc-800 dark:bg-zinc-950">
                    <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                      Treatment approach
                    </p>
                    <ol className="mt-3 flex flex-col gap-3">
                      {service.methodology.map((step, stepIndex) => (
                        <li key={step} className="flex gap-3 text-sm">
                          <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-teal-700 text-[0.7rem] font-semibold text-white">
                            {stepIndex + 1}
                          </span>
                          <span className="text-zinc-600 dark:text-zinc-300">
                            {step}
                          </span>
                        </li>
                      ))}
                    </ol>

                    <dl className="mt-5 flex flex-col gap-3 border-t border-zinc-200 pt-5 text-sm dark:border-zinc-800">
                      <div className="flex justify-between gap-3">
                        <dt className="text-zinc-500 dark:text-zinc-400">
                          Session
                        </dt>
                        <dd className="text-right font-medium text-zinc-900 dark:text-zinc-100">
                          {service.sessionDuration}
                        </dd>
                      </div>
                      <div className="flex justify-between gap-3">
                        <dt className="text-zinc-500 dark:text-zinc-400">Rate</dt>
                        <dd className="text-right font-medium text-zinc-900 dark:text-zinc-100">
                          {priceFrom(service.id)}
                        </dd>
                      </div>
                      <div className="flex items-start justify-between gap-3">
                        <dt className="text-zinc-500 dark:text-zinc-400">
                          Available as
                        </dt>
                        <dd className="flex flex-wrap justify-end gap-1.5">
                          {service.modes.map((mode) => (
                            <span
                              key={mode}
                              className="inline-flex items-center rounded-full bg-teal-100 px-2 py-0.5 text-xs font-medium text-teal-800 dark:bg-teal-950 dark:text-teal-300"
                            >
                              {modeLabel(mode)}
                            </span>
                          ))}
                        </dd>
                      </div>
                    </dl>

                    <Link
                      href={`/book?service=${service.id}`}
                      className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-teal-700 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-teal-800"
                    >
                      Book This Treatment
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          ))}
        </div>
      </div>

      {/* Bottom CTA banner */}
      <section className="w-full border-t border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16">
          <div className="rounded-2xl border border-teal-200 bg-teal-50 p-6 sm:p-10 dark:border-teal-900 dark:bg-teal-950">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl dark:text-zinc-50">
                  Not sure which treatment you need?
                </h2>
                <p className="mt-3 text-base leading-7 text-zinc-700 dark:text-zinc-300">
                  Start with an initial assessment or a virtual consultation. Dr.
                  Adelyn will examine your symptoms, explain the likely cause, and
                  recommend the right programme. You can also ask a quick
                  pre-visit question through the patient portal.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:shrink-0">
                <Link
                  href="/book"
                  className="inline-flex items-center justify-center rounded-full bg-teal-700 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-teal-800"
                >
                  Book an initial consultation
                </Link>
                <Link
                  href="/portal"
                  className="inline-flex items-center justify-center rounded-full border border-teal-600 px-6 py-3 text-sm font-semibold text-teal-700 transition-colors hover:bg-white dark:border-teal-500 dark:text-teal-300 dark:hover:bg-teal-900"
                >
                  Ask a pre-visit question
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
