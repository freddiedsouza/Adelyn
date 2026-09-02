import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Dr. Adelyn Pereira",
  description:
    "How Dr. Adelyn Pereira's physiotherapy practice collects, uses, and protects your personal and health information.",
};

const lastUpdated = "September 2026";

const sections: { heading: string; body: string[] }[] = [
  {
    heading: "1. Who we are",
    body: [
      "This website is operated by the physiotherapy practice of Dr. Adelyn Pereira, located at Pereira Compound, Near Marve Beach, Marve Road, Malad (West), Mumbai, Maharashtra 400095 (“we”, “us”, “our”). For any privacy question or request, contact us at Adelynpereira@gmail.com or +91 99208 36637.",
    ],
  },
  {
    heading: "2. Information we collect",
    body: [
      "Appointment bookings: your name, phone number, email address, chosen service, preferred date and time, consultation mode, chief complaint or pain area, and any medical history or previous surgery you choose to share.",
      "Contact and enquiry forms: your name, phone number, email address, subject, and message.",
      "Patient portal: the booking reference you enter to look up an appointment.",
      "Technical data: standard server logs (such as IP address and browser type) generated when you visit the site, and a single essential cookie used only to keep clinic staff signed in to the admin area.",
    ],
  },
  {
    heading: "3. How we use your information",
    body: [
      "To schedule, confirm, reschedule, and manage your physiotherapy appointments.",
      "To prepare for your consultation and provide appropriate clinical care.",
      "To respond to your enquiries and communicate with you about your care.",
      "To maintain clinical and business records as required by law and professional standards.",
    ],
  },
  {
    heading: "4. Legal basis",
    body: [
      "We process your information with your consent, which you give when you submit a booking or enquiry, and where processing is necessary to provide the healthcare services you have requested or to meet our legal and record-keeping obligations. Health information is treated as sensitive personal data and handled accordingly.",
    ],
  },
  {
    heading: "5. Sharing your information",
    body: [
      "We do not sell your information. We share it only with service providers that help us operate the website and communicate with you (for example, our email delivery provider), and with other healthcare professionals involved in your care where you have asked us to or where it is clinically necessary. We may disclose information if required by law.",
    ],
  },
  {
    heading: "6. Retention",
    body: [
      "Clinical records are retained for the period required by applicable law and professional guidelines. Enquiry messages are kept only as long as needed to deal with your request and for a reasonable period afterwards.",
    ],
  },
  {
    heading: "7. Security",
    body: [
      "We use reasonable technical and organisational measures to protect your information, including encrypted connections (HTTPS) and access controls on staff systems. No method of transmission or storage is completely secure, so we cannot guarantee absolute security.",
    ],
  },
  {
    heading: "8. Your rights",
    body: [
      "You may ask us to confirm what information we hold about you, to correct inaccurate information, or to delete information where there is no legal or clinical reason to keep it. You may also withdraw consent for non-essential processing. To make a request, or to raise a concern, contact us using the details in section 1.",
    ],
  },
  {
    heading: "9. Cookies",
    body: [
      "This site uses one essential cookie (“admin_session”) that is set only when clinic staff sign in to the admin dashboard. It carries no tracking or advertising data. We do not use analytics or advertising cookies.",
    ],
  },
  {
    heading: "10. Changes to this policy",
    body: [
      "We may update this policy from time to time. The date below shows when it was last revised. Material changes will be reflected on this page.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <main className="flex flex-1 flex-col bg-white dark:bg-zinc-950">
      <div className="mx-auto w-full max-w-3xl px-6 py-12 lg:px-8 lg:py-16">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
          Privacy Policy
        </h1>
        <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-400">
          Last updated: {lastUpdated}
        </p>

        <p className="mt-6 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-200">
          This policy is a working template. Please have it reviewed against your
          practice&apos;s actual data handling and current Indian data-protection
          law before relying on it.
        </p>

        <div className="mt-8 flex flex-col gap-8">
          {sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                {section.heading}
              </h2>
              <div className="mt-2 flex flex-col gap-2">
                {section.body.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="text-sm leading-6 text-zinc-600 dark:text-zinc-300"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
