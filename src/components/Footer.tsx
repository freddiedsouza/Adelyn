import Link from "next/link";

// Clinic trades under Dr. Adelyn Pereira's name for now — no separate clinic
// name yet. Add a `name` line here when one is confirmed.
const clinic = {
  addressLines: [
    "Pereira Compound, Near Marve Beach",
    "Marve Road, Malad (West)",
    "Mumbai, Maharashtra 400095",
  ],
  phoneDisplay: "+91 99208 36637",
  phoneHref: "tel:+919920836637",
  email: "Adelynpereira@gmail.com",
};

const quickNav = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/book", label: "Book Appointment" },
  { href: "/portal", label: "Patient Portal" },
  { href: "/admin", label: "Admin" },
];

const serviceLinks = [
  {
    href: "/book?service=musculoskeletal-joint-pain",
    label: "Musculoskeletal & Joint Pain",
  },
  {
    href: "/book?service=post-surgical-recovery",
    label: "Post-Surgical Recovery",
  },
  {
    href: "/book?service=sports-injury-management",
    label: "Sports Injury Management",
  },
  {
    href: "/book?service=chronic-back-neck-pain",
    label: "Back & Neck Pain Care",
  },
  {
    href: "/book?service=ergonomic-postural-correction",
    label: "Ergonomic & Postural Correction",
  },
];

const affiliations = [
  "Indian Association of Physiotherapists (IAP)",
  "Maharashtra State O.T. & P.T. Council",
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto bg-zinc-950 text-zinc-400">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Clinical branding */}
          <div>
            <p className="text-lg font-semibold text-teal-400">
              Dr. Adelyn Pereira
            </p>
            <p className="mt-1 text-xs font-medium uppercase tracking-wide text-zinc-500">
              Physiotherapy &amp; Rehabilitation
            </p>
            <p className="mt-4 text-sm leading-6">
              Clinical physiotherapy for musculoskeletal pain, post-surgical
              recovery, and sports injuries — evidence-based, one-on-one care.
            </p>
            <div className="mt-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                Affiliations
              </p>
              <ul className="mt-2 flex flex-col gap-1 text-xs">
                {affiliations.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Quick navigation */}
          <nav aria-label="Footer navigation">
            <p className="text-sm font-semibold text-zinc-100">Navigation</p>
            <ul className="mt-4 flex flex-col gap-2 text-sm">
              {quickNav.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block py-0.5 transition-colors hover:text-teal-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Clinical services quick-links */}
          <div>
            <p className="text-sm font-semibold text-zinc-100">
              Clinical services
            </p>
            <ul className="mt-4 flex flex-col gap-2 text-sm">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block py-0.5 transition-colors hover:text-teal-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & clinic details */}
          <div>
            <p className="text-sm font-semibold text-zinc-100">
              Contact &amp; clinic
            </p>
            <address className="mt-4 flex flex-col gap-3 text-sm not-italic">
              <span className="block space-y-0.5">
                {clinic.addressLines.map((line) => (
                  <span key={line} className="block text-zinc-400">
                    {line}
                  </span>
                ))}
              </span>
              <a
                href={clinic.phoneHref}
                className="block transition-colors hover:text-teal-400"
              >
                {clinic.phoneDisplay}
              </a>
              <a
                href={`mailto:${clinic.email}`}
                className="block break-all transition-colors hover:text-teal-400"
              >
                {clinic.email}
              </a>
            </address>
            <div className="mt-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                Operating hours
              </p>
              <p className="mt-2 text-sm">Monday – Saturday: 9:00 AM – 7:00 PM</p>
              <p className="text-sm">Sunday: Closed</p>
            </div>
          </div>
        </div>

        {/* Legal & medical disclaimer */}
        <p className="mt-10 border-t border-zinc-800 pt-6 text-xs leading-5 text-zinc-500">
          <span className="font-semibold text-zinc-400">
            Medical disclaimer:
          </span>{" "}
          The information on this website is provided for general informational
          purposes only and does not constitute medical advice, diagnosis, or
          treatment. It is not a substitute for a consultation with a qualified
          healthcare professional. Always seek the advice of Dr. Adelyn Pereira
          or another licensed clinician regarding any medical condition and
          before beginning any exercise or rehabilitation programme. In an
          emergency, contact your local emergency services.
        </p>
      </div>

      {/* Bottom legal bar */}
      <div className="border-t border-zinc-800">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-6 py-4 text-xs text-zinc-500 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <p>&copy; {year} Dr. Adelyn Pereira. All rights reserved.</p>
          <p>Clinical physiotherapy &amp; rehabilitation · Mumbai, India</p>
        </div>
      </div>
    </footer>
  );
}
