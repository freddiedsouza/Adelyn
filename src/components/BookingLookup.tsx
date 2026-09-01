"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { services } from "@/data/services";

const REFERENCE_RE = /^AP-[A-Za-z0-9]{4}$/;
const STATUSES = ["Confirmed", "Upcoming", "Past"] as const;
type LookupStatus = (typeof STATUSES)[number];

interface LookupResult {
  reference: string;
  status: LookupStatus;
  serviceTitle: string;
  mode: string;
  slot: string;
  dateLabel: string;
}

const SLOTS = ["09:00 AM", "10:30 AM", "02:00 PM", "03:30 PM"];

function simulateLookup(rawReference: string): LookupResult {
  const reference = rawReference.toUpperCase();
  const key = reference.replace("AP-", "");
  const sum = [...key].reduce((acc, char) => acc + char.charCodeAt(0), 0);

  const status = STATUSES[sum % STATUSES.length];
  const service = services[sum % services.length];
  const mode =
    sum % 2 === 0 ? "In-Person Clinic Visit" : "Virtual Consultation";
  const slot = SLOTS[sum % SLOTS.length];

  const dayOffset = status === "Past" ? -(3 + (sum % 20)) : 2 + (sum % 14);
  const appointmentDate = new Date();
  appointmentDate.setDate(appointmentDate.getDate() + dayOffset);
  const dateLabel = appointmentDate.toLocaleDateString("en-GB", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return {
    reference,
    status,
    serviceTitle: service.title,
    mode,
    slot,
    dateLabel,
  };
}

function statusBadgeClass(status: LookupStatus): string {
  switch (status) {
    case "Confirmed":
      return "bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300";
    case "Upcoming":
      return "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300";
    default:
      return "bg-zinc-200 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300";
  }
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <dt className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
        {label}
      </dt>
      <dd className="text-sm text-zinc-900 dark:text-zinc-100">{value}</dd>
    </div>
  );
}

export default function BookingLookup() {
  const [reference, setReference] = useState("");
  const [error, setError] = useState("");
  const [result, setResult] = useState<LookupResult | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = reference.trim();

    if (!trimmed) {
      setError("Enter your booking reference.");
      setResult(null);
      return;
    }
    if (!REFERENCE_RE.test(trimmed)) {
      setError("Use the format AP-XXXX (e.g. AP-7F3K).");
      setResult(null);
      return;
    }

    setError("");
    setResult(simulateLookup(trimmed));
  }

  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-5 sm:p-6 dark:border-zinc-800 dark:bg-zinc-900">
      <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
        Quick booking lookup
      </h2>
      <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
        Check the status of an appointment using its booking reference.
      </p>

      <form onSubmit={handleSubmit} noValidate className="mt-4 flex flex-col gap-3 sm:flex-row">
        <div className="flex-1">
          <label htmlFor="lookup-reference" className="sr-only">
            Booking reference
          </label>
          <input
            id="lookup-reference"
            type="text"
            value={reference}
            onChange={(event) => {
              setReference(event.target.value);
              if (error) setError("");
            }}
            placeholder="AP-XXXX"
            autoComplete="off"
            aria-invalid={Boolean(error)}
            aria-describedby={error ? "lookup-error" : undefined}
            className={[
              "w-full rounded-lg border bg-white px-3 py-2.5 text-sm uppercase tracking-wide text-zinc-900 outline-none transition-colors placeholder:normal-case placeholder:tracking-normal focus:ring-2 focus:ring-teal-600/30 dark:bg-zinc-950 dark:text-zinc-100",
              error
                ? "border-red-500 focus:border-red-500 focus:ring-red-500/30"
                : "border-zinc-300 focus:border-teal-600 dark:border-zinc-700",
            ].join(" ")}
          />
        </div>
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-full bg-teal-700 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-teal-800"
        >
          Look up
        </button>
      </form>

      {error ? (
        <p id="lookup-error" className="mt-2 text-sm text-red-600 dark:text-red-400">
          {error}
        </p>
      ) : (
        <p className="mt-2 text-xs text-zinc-400 dark:text-zinc-500">
          Demo lookup — any reference in the form AP-XXXX will return a sample
          status.
        </p>
      )}

      {result ? (
        <div className="mt-4 rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-950">
          <div className="flex items-center justify-between gap-3">
            <span className="font-semibold tracking-wide text-zinc-900 dark:text-zinc-100">
              {result.reference}
            </span>
            <span
              className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${statusBadgeClass(
                result.status,
              )}`}
            >
              {result.status}
            </span>
          </div>
          <dl className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <DetailRow label="Practitioner" value="Dr. Adelyn Pereira" />
            <DetailRow label="Service" value={result.serviceTitle} />
            <DetailRow label="Date" value={result.dateLabel} />
            <DetailRow label="Time slot" value={result.slot} />
            <DetailRow label="Consultation type" value={result.mode} />
          </dl>
        </div>
      ) : null}
    </section>
  );
}
