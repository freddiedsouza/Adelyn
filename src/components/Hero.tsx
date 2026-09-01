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
    <section className="w-full bg-white dark:bg-zinc-950">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 py-12 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-20">
        {/* Text column */}
        <div className="flex flex-col items-start text-left">
          <span className="inline-flex items-center rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-teal-700 dark:border-teal-800 dark:bg-teal-950 dark:text-teal-300">
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
              className="inline-flex items-center justify-center rounded-full bg-teal-700 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-teal-800"
            >
              Book Consultation
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center justify-center rounded-full border border-zinc-300 px-6 py-3 text-sm font-semibold text-zinc-800 transition-colors hover:border-teal-600 hover:text-teal-700 dark:border-zinc-700 dark:text-zinc-100 dark:hover:border-teal-500 dark:hover:text-teal-400"
            >
              View Treatments
            </Link>
          </div>

          <dl className="mt-10 grid w-full grid-cols-1 gap-6 sm:grid-cols-3">
            {trustIndicators.map((item) => (
              <div key={item.title} className="border-l-2 border-teal-200 pl-4 dark:border-teal-800">
                <dt className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
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
          <div className="absolute -inset-3 rounded-3xl border border-teal-100 dark:border-teal-900" aria-hidden="true" />
          <div className="relative flex aspect-[4/5] w-full items-center justify-center rounded-2xl border-2 border-teal-200 bg-zinc-100 ring-1 ring-inset ring-white dark:border-teal-800 dark:bg-zinc-900 dark:ring-zinc-800">
            <div className="flex flex-col items-center gap-2 px-6 text-center">
              <svg
                className="h-12 w-12 text-teal-600 dark:text-teal-400"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.5 20.25a7.5 7.5 0 0 1 15 0v.75H4.5v-.75Z"
                />
              </svg>
              <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                Portrait of Dr. Adelyn Pereira
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
