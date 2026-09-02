import type { Metadata } from "next";
import Link from "next/link";
import ContactForm from "@/components/ContactForm";
import FaqAccordion, { type FaqItem } from "@/components/FaqAccordion";

export const metadata: Metadata = {
  title: "Contact & Clinical Practice | Dr. Adelyn Pereira",
  description:
    "Contact Dr. Adelyn Pereira's physiotherapy practice in Malad (West), Mumbai — phone, WhatsApp, email, clinic location, amenities, FAQs, and a direct message form.",
};

const clinic = {
  addressLines: [
    "Pereira Compound, Near Marve Beach",
    "Marve Road, Malad (West)",
    "Mumbai, Maharashtra 400095",
  ],
  phoneDisplay: "+91 99208 36637",
  phoneHref: "tel:+919920836637",
  whatsappHref:
    "https://wa.me/919920836637?text=Hi%2C%20I%27d%20like%20to%20book%20a%20physiotherapy%20appointment.",
  email: "Adelynpereira@gmail.com",
  mapsHref:
    "https://www.google.com/maps/search/?api=1&query=Marve%20Road%2C%20Malad%20West%2C%20Mumbai",
};

const amenities = [
  "On-site parking for patients",
  "Step-free entrance and wheelchair-accessible treatment room",
  "About 10 minutes from Malad station; buses run along Marve Road",
];

const faqs: FaqItem[] = [
  {
    id: "first-session",
    question: "What happens in the first session?",
    answer:
      "Your first appointment runs 45–60 minutes: a detailed history, a physical assessment, a working diagnosis, and the start of your treatment plan. You will leave with initial exercises to begin at home.",
  },
  {
    id: "insurance",
    question: "Do you support insurance or reimbursement claims?",
    answer:
      "Payment is taken after each session. We provide a GST-compliant itemised invoice and a treatment summary you can submit to your insurer for mediclaim reimbursement. We are not on cashless panels yet — check whether your policy covers outpatient physiotherapy.",
  },
  {
    id: "what-to-bring",
    question: "What should I bring?",
    answer:
      "A photo ID, any recent scan or X-ray reports (and the images if you have them), a referral letter or prescription if you have one, and comfortable clothing you can move in.",
  },
  {
    id: "cancellation",
    question: "What is the cancellation policy?",
    answer:
      "Reschedule or cancel free of charge up to 24 hours before your appointment. Within 24 hours a fee of up to 50% of the session rate may apply, and missed appointments without notice are charged in full.",
  },
  {
    id: "home-visits",
    question: "Do you offer home visits?",
    answer:
      "Home visits are available on request within Malad and nearby areas for post-surgical or mobility-limited patients, subject to Dr. Adelyn's schedule and a travel charge. Ask when booking or message the clinic.",
  },
];

function ContactCard({
  href,
  label,
  value,
  external,
  children,
}: {
  href: string;
  label: string;
  value: string;
  external?: boolean;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      {...(external
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
      className="flex flex-col items-start gap-3 rounded-2xl border border-zinc-200/80 bg-white/70 p-5 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] backdrop-blur-md transition-all duration-200 hover:-translate-y-1 hover:border-teal-500/40 hover:shadow-[0_12px_30px_-6px_rgba(0,0,0,0.1)] dark:border-zinc-800/80 dark:bg-zinc-900/70"
    >
      <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50 text-teal-600 ring-1 ring-teal-600/10 dark:bg-teal-950/40 dark:text-teal-400">
        {children}
      </span>
      <span>
        <span className="block text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          {label}
        </span>
        <span className="mt-0.5 block text-sm font-medium text-zinc-900 dark:text-zinc-100">
          {value}
        </span>
      </span>
    </a>
  );
}

export default function ContactPage() {
  return (
    <main className="flex flex-1 flex-col">
      {/* Header */}
      <section className="relative w-full overflow-hidden border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-teal-50/60 via-transparent to-transparent dark:from-teal-950/25"
        />
        <div className="relative mx-auto max-w-7xl px-6 py-16 md:py-24 lg:px-8">
          <span className="inline-flex items-center rounded-full border border-teal-200/80 bg-teal-50/80 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-teal-700 ring-1 ring-teal-600/10 backdrop-blur-sm dark:border-teal-800/80 dark:bg-teal-950/60 dark:text-teal-300">
            Contact
          </span>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl lg:text-5xl dark:text-zinc-50">
            Contact &amp; Clinical Practice
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Book an appointment, ask a question, or plan your visit to the clinic
            in Malad (West).
          </p>
          <p className="mt-4 inline-flex items-center gap-2 rounded-lg bg-zinc-100 px-3 py-2 text-sm font-medium text-zinc-700 dark:bg-zinc-900 dark:text-zinc-200">
            <span className="h-2 w-2 rounded-full bg-teal-600" />
            Open Monday – Saturday, 9:00 AM – 7:00 PM · Sunday closed
          </p>
        </div>
      </section>

      {/* Contact info & location */}
      <section className="w-full bg-zinc-50/60 dark:bg-zinc-950">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-24 lg:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
                Reach the clinic
              </h2>

              <address className="mt-4 flex flex-col gap-0.5 text-sm not-italic text-zinc-600 dark:text-zinc-300">
                {clinic.addressLines.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </address>

              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
                <ContactCard
                  href={clinic.phoneHref}
                  label="Call"
                  value={clinic.phoneDisplay}
                >
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                    />
                  </svg>
                </ContactCard>
                <ContactCard
                  href={clinic.whatsappHref}
                  label="WhatsApp"
                  value="Message to book"
                  external
                >
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z"
                    />
                  </svg>
                </ContactCard>
                <ContactCard
                  href={`mailto:${clinic.email}`}
                  label="Email"
                  value={clinic.email}
                >
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                    />
                  </svg>
                </ContactCard>
              </div>

              <div className="mt-6">
                <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                  Clinic amenities
                </p>
                <ul className="mt-3 flex flex-col gap-2">
                  {amenities.map((item) => (
                    <li
                      key={item}
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
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Map placeholder */}
            <div className="flex flex-col">
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-zinc-200/80 bg-gradient-to-br from-zinc-100 to-white shadow-[0_10px_30px_-12px_rgba(0,0,0,0.15)] dark:border-zinc-800/80 dark:from-zinc-900 dark:to-zinc-950">
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-center">
                  <svg
                    className="h-10 w-10 text-teal-600 dark:text-teal-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                    />
                  </svg>
                  <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                    Marve Road, Malad (West), Mumbai
                  </span>
                </div>
              </div>
              <a
                href={clinic.mapsHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center justify-center rounded-full border border-zinc-300 px-5 py-2.5 text-sm font-semibold text-zinc-800 transition-colors hover:border-teal-600 hover:text-teal-700 dark:border-zinc-700 dark:text-zinc-100"
              >
                Open in Google Maps
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="w-full border-t border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
        <div className="mx-auto max-w-3xl px-6 py-16 md:py-24 lg:px-8">
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl dark:text-zinc-50">
            Frequently asked questions
          </h2>
          <div className="mt-8">
            <FaqAccordion items={faqs} />
          </div>
        </div>
      </section>

      {/* Direct message form */}
      <section className="w-full border-t border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950">
        <div className="mx-auto max-w-3xl px-6 py-16 md:py-24 lg:px-8">
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl dark:text-zinc-50">
            Send a direct message
          </h2>
          <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
            For non-urgent enquiries. For anything clinical or urgent, please
            call the clinic. You can also{" "}
            <Link href="/book" className="font-medium text-teal-700 dark:text-teal-400">
              book an appointment
            </Link>{" "}
            directly.
          </p>
          <div className="mt-6">
            <ContactForm />
          </div>
        </div>
      </section>
    </main>
  );
}
