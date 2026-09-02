import Image from "next/image";
import Link from "next/link";

const trustIndicators = [
  {
    title: "Individualized treatment plans",
    description: "Every programme is built around one patient's goals and diagnosis.",
  },
  {
    title: "Evidence-based clinical care",
    description: "Techniques grounded in current physiotherapy research and outcomes.",
  },
  {
    title: "Qatar public healthcare experience",
    description: "Former clinician within the Hamad Medical Corporation / PHCC network.",
  },
];

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-white dark:bg-zinc-950">
      {/* Ambient glow behind the hero */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-teal-50/60 via-transparent to-transparent dark:from-teal-950/30"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-1/3 hidden h-72 w-72 rounded-full bg-teal-200/30 blur-3xl lg:block dark:bg-teal-900/20"
      />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 py-16 md:py-24 lg:grid-cols-2 lg:gap-16 lg:px-8">
        {/* Text column */}
        <div className="flex flex-col items-start text-left">
          <span className="inline-flex items-center gap-2 rounded-full border border-teal-200/80 bg-teal-50/80 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-teal-700 ring-1 ring-teal-600/10 backdrop-blur-sm dark:border-teal-800/80 dark:bg-teal-950/60 dark:text-teal-300">
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-500/70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-teal-600" />
            </span>
            Physiotherapy &amp; Clinical Rehabilitation
          </span>

          <h1 className="mt-6 text-4xl font-semibold leading-tight tracking-tight text-zinc-900 sm:text-5xl lg:text-6xl dark:text-zinc-50">
            Restoring mobility, relieving pain, and delivering evidence-based
            clinical therapy.
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Dr. Adelyn Pereira brings hospital-grade clinical training to focused,
            one-on-one rehabilitation. Each programme is designed around your
            diagnosis, your recovery goals, and measurable progress.
          </p>

          <div className="mt-8 flex w-full flex-col gap-4 sm:w-auto sm:flex-row">
            <Link
              href="/book"
              className="inline-flex items-center justify-center rounded-full bg-teal-700 px-6 py-3 text-sm font-semibold text-white shadow-[0_4px_20px_-4px_rgba(13,148,136,0.4)] transition-all duration-150 hover:-translate-y-0.5 hover:bg-teal-800 hover:shadow-[0_12px_30px_-6px_rgba(13,148,136,0.5)] active:translate-y-0 active:scale-[0.98]"
            >
              Book Consultation
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center justify-center rounded-full border border-zinc-300 bg-white/60 px-6 py-3 text-sm font-semibold text-zinc-800 backdrop-blur-sm transition-all duration-150 hover:-translate-y-0.5 hover:border-teal-600 hover:text-teal-700 active:translate-y-0 active:scale-[0.98] dark:border-zinc-700 dark:bg-zinc-900/60 dark:text-zinc-100 dark:hover:border-teal-500 dark:hover:text-teal-400"
            >
              View Treatments
            </Link>
          </div>

          <dl className="mt-10 grid w-full grid-cols-1 gap-4 sm:grid-cols-3">
            {trustIndicators.map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-zinc-200/80 bg-white/70 p-4 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] backdrop-blur-md transition-all duration-200 hover:-translate-y-1 hover:border-teal-500/40 dark:border-zinc-800/80 dark:bg-zinc-900/70"
              >
                <span className="inline-flex rounded-lg bg-teal-50 p-2 text-teal-700 ring-1 ring-teal-600/10 dark:bg-teal-950/40 dark:text-teal-300">
                  <svg
                    className="h-4 w-4"
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
                </span>
                <dt className="mt-3 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                  {item.title}
                </dt>
                <dd className="mt-1 text-xs leading-5 text-zinc-500 dark:text-zinc-400">
                  {item.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Visual column */}
        <div className="relative w-full">
          <div
            aria-hidden="true"
            className="absolute -inset-4 rounded-[2rem] bg-gradient-to-tr from-teal-200/40 via-transparent to-teal-100/30 blur-2xl dark:from-teal-900/40 dark:to-teal-950/20"
          />
          {/*
            Portrait image. Shared with the About page — replace
            public/clinic-portrait.jpg (4:5 portrait crop) to change it site-wide.
          */}
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-zinc-200/80 bg-zinc-100 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.25)] ring-1 ring-inset ring-white/60 dark:border-zinc-800/80 dark:bg-zinc-900 dark:ring-white/10">
            <Image
              src="/clinic-portrait.jpg"
              alt="Dr. Adelyn Pereira, clinical physiotherapist"
              fill
              priority
              sizes="(min-width: 1024px) 40vw, (min-width: 768px) 60vw, 100vw"
              className="object-cover"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-zinc-950/15 via-transparent to-white/10"
            />
            <div
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-px bg-white/40"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
