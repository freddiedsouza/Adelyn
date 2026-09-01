import Link from "next/link";
import { services } from "@/data/services";
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
      className="w-full border-t border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950"
    >
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-20">
        <div className="max-w-2xl">
          <span className="inline-flex items-center rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-teal-700 dark:border-teal-800 dark:bg-teal-950 dark:text-teal-300">
            Clinical Services
          </span>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
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
              className="flex flex-col rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900"
            >
              <div className="flex items-start justify-between gap-3">
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-50 dark:bg-teal-950">
                  <ServiceIcon id={service.icon} />
                </span>
                <span className="inline-flex items-center rounded-full bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
                  {service.sessionDuration}
                </span>
              </div>

              <h3 className="mt-4 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                {service.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                {service.description}
              </p>

              <div className="mt-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
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

              <div className="mt-6 flex flex-1 flex-col justify-end">
                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                  {service.rateIndicator}
                </p>
                <Link
                  href={`/book?service=${service.id}`}
                  className="mt-3 inline-flex items-center justify-center rounded-full bg-teal-700 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-teal-800"
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
