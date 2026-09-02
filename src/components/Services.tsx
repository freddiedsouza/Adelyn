import Link from "next/link";
import { services } from "@/data/services";
import { priceFrom } from "@/lib/pricing";
import type { ServiceIconId } from "@/types/service";

const iconPaths: Record<ServiceIconId, string> = {
  joint:
    "M12 6v12m6-6H6m9.75 0a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z",
  recovery:
    "M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",
  sports:
    "M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3",
  spine:
    "M12 3v18M8.25 6.75h7.5M8.25 12h7.5M8.25 17.25h7.5",
  posture:
    "M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.5 20.25a7.5 7.5 0 0 1 15 0v.75H4.5v-.75Z",
};

function ServiceIcon({ id }: { id: ServiceIconId }) {
  return (
    <svg
      className="h-6 w-6 text-teal-600 dark:text-teal-400"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d={iconPaths[id]} />
    </svg>
  );
}

export default function Services() {
  return (
    <section
      id="services"
      className="relative w-full overflow-hidden border-t border-zinc-200 bg-zinc-50/60 dark:border-zinc-800 dark:bg-zinc-950"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-teal-50/50 via-transparent to-transparent dark:from-teal-950/20"
      />

      <div className="relative mx-auto max-w-7xl px-6 py-16 md:py-24 lg:px-8">
        <div className="max-w-2xl">
          <span className="inline-flex items-center rounded-full border border-teal-200/80 bg-teal-50/80 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-teal-700 ring-1 ring-teal-600/10 backdrop-blur-sm dark:border-teal-800/80 dark:bg-teal-950/60 dark:text-teal-300">
            Clinical Services
          </span>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-balance text-zinc-900 sm:text-4xl dark:text-zinc-50">
            Focused physiotherapy programmes
          </h2>
          <p className="mt-4 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Each service is a structured, one-on-one programme built around your
            diagnosis and recovery goals.
          </p>
        </div>

        <ul className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <li
              key={service.id}
              className="group flex flex-col rounded-2xl border border-zinc-200/80 bg-white/70 p-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] backdrop-blur-md transition-all duration-200 hover:-translate-y-1 hover:border-teal-500/40 hover:shadow-[0_12px_30px_-6px_rgba(0,0,0,0.1)] dark:border-zinc-800/80 dark:bg-zinc-900/70"
            >
              <div className="flex items-start justify-between gap-3">
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-50 ring-1 ring-teal-600/10 transition-transform duration-200 group-hover:scale-105 dark:bg-teal-950/40">
                  <ServiceIcon id={service.icon} />
                </span>
                <span className="inline-flex items-center rounded-full bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
                  {service.sessionDuration}
                </span>
              </div>

              <h3 className="mt-4 text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
                {service.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                {service.description}
              </p>

              <div className="mt-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                  Commonly treats
                </p>
                <ul className="mt-2 space-y-1.5">
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

              <div className="mt-6 flex flex-1 flex-col justify-end border-t border-zinc-200/70 pt-4 dark:border-zinc-800/70">
                <p className="text-base font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
                  {priceFrom(service.id)}
                </p>
                <Link
                  href={`/book?service=${service.id}`}
                  className="mt-3 inline-flex items-center justify-center rounded-full bg-teal-700 px-4 py-2.5 text-sm font-semibold text-white shadow-[0_4px_20px_-4px_rgba(13,148,136,0.4)] transition-all duration-150 hover:-translate-y-0.5 hover:bg-teal-800 hover:shadow-[0_12px_30px_-6px_rgba(13,148,136,0.5)] active:translate-y-0 active:scale-[0.98]"
                >
                  Book This Service
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
