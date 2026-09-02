import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Dr. Adelyn Pereira | Physiotherapy & Rehabilitation",
  description:
    "Dr. Adelyn Pereira is a clinical physiotherapist with public healthcare experience in Qatar (Hamad Medical Corporation / PHCC), specialising in evidence-based musculoskeletal and post-surgical rehabilitation.",
};

/*
  Credentials, licence numbers, and tenure details below are placeholders and
  must be confirmed against Dr. Adelyn Pereira's actual registration records.
*/
const credentials = [
  "Doctor of Physiotherapy (DPT)",
  "Bachelor of Physiotherapy (BPT)",
  "Registered Physiotherapist — Maharashtra State O.T. & P.T. Council",
  "Certified Dry Needling Practitioner (Level 2)",
  "Member, Indian Association of Physiotherapists (IAP)",
];

const qatarHighlights = [
  "Multi-disciplinary rehabilitation alongside orthopaedic surgeons, rheumatologists, and sports medicine physicians.",
  "Structured post-operative protocols for joint replacement, ligament reconstruction, and spinal surgery.",
  "High-volume musculoskeletal outpatient caseloads across primary care clinics.",
  "Inpatient early mobilisation and discharge planning on post-surgical wards.",
];

const pillars: { title: string; description: string; path: string }[] = [
  {
    title: "Evidence-Based Protocols",
    description:
      "Treatment plans built on current clinical research and measurable outcomes, reviewed as you progress.",
    path: "M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",
  },
  {
    title: "Active Patient Participation",
    description:
      "You are a partner in recovery — every plan includes exercises, education, and self-management you can sustain.",
    path: "M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.5 20.25a7.5 7.5 0 0 1 15 0v.75H4.5v-.75Z",
  },
  {
    title: "Root-Cause Diagnosis",
    description:
      "Thorough assessment to understand why the problem started, so treatment addresses the cause, not only the symptom.",
    path: "m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z",
  },
  {
    title: "Sustainable Long-Term Mobility",
    description:
      "The goal is lasting function and resilience: returning to what matters to you and staying there.",
    path: "M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3",
  },
];

const competencies = [
  "Manual Therapy",
  "Dry Needling",
  "Joint Mobilization",
  "Neuromuscular Re-education",
  "Sports-Specific Functional Training",
  "Soft Tissue & Myofascial Release",
  "Post-Operative Rehabilitation",
  "Exercise Prescription & Load Management",
  "Gait & Movement Re-training",
];

export default function AboutPage() {
  return (
    <main className="flex flex-1 flex-col">
      {/* Clinical profile header */}
      <section className="relative w-full overflow-hidden bg-white dark:bg-zinc-950">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-teal-50/50 via-transparent to-transparent dark:from-teal-950/20"
        />
        <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 py-16 md:grid-cols-2 md:py-24 lg:gap-16 lg:px-8">
          <div className="relative mx-auto w-full max-w-sm md:mx-0">
            <div
              aria-hidden="true"
              className="absolute -inset-4 rounded-[2rem] bg-gradient-to-tr from-teal-200/40 via-transparent to-teal-100/30 blur-2xl dark:from-teal-900/40 dark:to-teal-950/20"
            />
            {/*
              Portrait image. Shared with the homepage hero — replace
              public/clinic-portrait.jpg (4:5 portrait crop) to change it
              site-wide.
            */}
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-zinc-200/80 bg-zinc-100 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.25)] ring-1 ring-inset ring-white/60 dark:border-zinc-800/80 dark:bg-zinc-900 dark:ring-white/10">
              <Image
                src="/clinic-portrait.jpg"
                alt="Dr. Adelyn Pereira, clinical physiotherapist"
                fill
                priority
                sizes="(min-width: 768px) 24rem, 100vw"
                className="object-cover"
              />
            </div>
          </div>

          <div className="text-center md:text-left">
            <span className="inline-flex items-center rounded-full border border-teal-200/80 bg-teal-50/80 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-teal-700 ring-1 ring-teal-600/10 backdrop-blur-sm dark:border-teal-800/80 dark:bg-teal-950/60 dark:text-teal-300">
              Clinical Profile
            </span>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl lg:text-5xl dark:text-zinc-50">
              Dr. Adelyn Pereira
            </h1>
            <p className="mt-2 text-lg text-zinc-600 dark:text-zinc-400">
              Clinical Physiotherapist — Musculoskeletal &amp; Post-Surgical
              Rehabilitation
            </p>

            <p className="mt-5 text-base leading-7 text-zinc-600 dark:text-zinc-300">
              Dr. Adelyn Pereira is a clinical physiotherapist focused on
              restoring movement after injury and surgery. Her practice combines
              hands-on treatment with progressive, individually prescribed
              exercise, and every programme is measured against clear functional
              goals.
            </p>

            <blockquote className="mt-5 border-l-2 border-teal-300 pl-4 text-left text-base italic text-zinc-700 dark:border-teal-700 dark:text-zinc-300">
              &ldquo;Recovery works best when the patient understands the plan and
              owns it. My job is to make the diagnosis clear and the next step
              achievable.&rdquo;
            </blockquote>

            <ul className="mt-6 flex flex-col gap-2 text-left">
              {credentials.map((item) => (
                <li
                  key={item}
                  className="flex gap-2 text-sm text-zinc-600 dark:text-zinc-300"
                >
                  <svg
                    className="mt-1 h-4 w-4 shrink-0 text-teal-600 dark:text-teal-400"
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
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Public healthcare background */}
      <section className="w-full border-t border-zinc-200 bg-zinc-50/60 dark:border-zinc-800 dark:bg-zinc-950">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-16 md:py-24 lg:grid-cols-[1fr_1.2fr] lg:gap-16 lg:px-8">
          <div>
            <span className="inline-flex items-center rounded-full border border-teal-200/80 bg-teal-50/80 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-teal-700 ring-1 ring-teal-600/10 backdrop-blur-sm dark:border-teal-800/80 dark:bg-teal-950/60 dark:text-teal-300">
              Public Healthcare Background
            </span>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl dark:text-zinc-50">
              Trained inside Qatar&apos;s public health system
            </h2>
            <p className="mt-4 text-base leading-7 text-zinc-600 dark:text-zinc-300">
              Before moving into private practice, Dr. Pereira spent several
              years within Qatar&apos;s public healthcare network, working across
              the Hamad Medical Corporation (HMC) and Primary Health Care
              Corporation (PHCC). That setting shaped a structured,
              protocol-driven approach to rehabilitation.
            </p>
          </div>
          <ul className="flex flex-col gap-4">
            {qatarHighlights.map((item) => (
              <li
                key={item}
                className="flex gap-3 rounded-xl border border-zinc-200 bg-white p-4 text-sm leading-6 text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300"
              >
                <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-teal-50 dark:bg-teal-950">
                  <svg
                    className="h-4 w-4 text-teal-600 dark:text-teal-400"
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
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Clinical philosophy */}
      <section className="w-full bg-white dark:bg-zinc-950">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-24 lg:px-8">
          <div className="max-w-2xl">
            <span className="inline-flex items-center rounded-full border border-teal-200/80 bg-teal-50/80 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-teal-700 ring-1 ring-teal-600/10 backdrop-blur-sm dark:border-teal-800/80 dark:bg-teal-950/60 dark:text-teal-300">
              Clinical Philosophy
            </span>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl dark:text-zinc-50">
              Four principles behind every treatment plan
            </h2>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((pillar) => (
              <div
                key={pillar.title}
                className="flex flex-col rounded-2xl border border-zinc-200/80 bg-white/70 p-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] backdrop-blur-md transition-all duration-200 hover:-translate-y-1 hover:border-teal-500/40 hover:shadow-[0_12px_30px_-6px_rgba(0,0,0,0.1)] dark:border-zinc-800/80 dark:bg-zinc-900/70"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-teal-50 ring-1 ring-teal-600/10 dark:bg-teal-950/40">
                  <svg
                    className="h-6 w-6 text-teal-600 dark:text-teal-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d={pillar.path}
                    />
                  </svg>
                </span>
                <h3 className="mt-4 text-base font-semibold text-zinc-900 dark:text-zinc-50">
                  {pillar.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core competencies & techniques */}
      <section className="w-full border-t border-zinc-200 bg-zinc-50/60 dark:border-zinc-800 dark:bg-zinc-950">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-24 lg:px-8">
          <div className="max-w-2xl">
            <span className="inline-flex items-center rounded-full border border-teal-200/80 bg-teal-50/80 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-teal-700 ring-1 ring-teal-600/10 backdrop-blur-sm dark:border-teal-800/80 dark:bg-teal-950/60 dark:text-teal-300">
              Core Competencies &amp; Techniques
            </span>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl dark:text-zinc-50">
              Hands-on skills and clinical techniques
            </h2>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {competencies.map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 rounded-xl border border-zinc-200/80 bg-white/70 px-4 py-3 text-sm font-medium text-zinc-800 backdrop-blur-sm transition-colors hover:border-teal-500/40 dark:border-zinc-800/80 dark:bg-zinc-900/70 dark:text-zinc-100"
              >
                <span className="inline-flex h-2 w-2 shrink-0 rounded-full bg-teal-600" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Direct CTA banner */}
      <section className="w-full bg-gradient-to-br from-teal-700 via-teal-700 to-teal-800">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-6 py-12 text-center lg:flex-row lg:justify-between lg:px-8 lg:py-14 lg:text-left">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              Ready to start your rehabilitation?
            </h2>
            <p className="mt-2 text-teal-50">
              Book an in-person or virtual assessment and get a clear plan for
              recovery.
            </p>
          </div>
          <Link
            href="/book"
            className="inline-flex w-full items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-teal-800 shadow-[0_10px_30px_-8px_rgba(0,0,0,0.3)] transition-all duration-150 hover:-translate-y-0.5 hover:bg-teal-50 active:translate-y-0 active:scale-[0.98] sm:w-auto"
          >
            Schedule a Consultation with Dr. Adelyn
          </Link>
        </div>
      </section>
    </main>
  );
}
