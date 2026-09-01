"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import type { Appointment, AppointmentStatus } from "@/types/appointment";
import { formatAppointmentDate, modeLabel } from "@/lib/appointments";

const REFERENCE_RE = /^AP-[A-Za-z0-9]{4}$/;

function statusBadgeClass(status: AppointmentStatus): string {
  switch (status) {
    case "Confirmed":
      return "bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300";
    case "Completed":
      return "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300";
    case "Rescheduled":
      return "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300";
    case "Cancelled":
      return "bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300";
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
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Appointment | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = reference.trim().toUpperCase();

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
    setResult(null);
    setLoading(true);

    try {
      const response = await fetch(
        `/api/bookings/lookup?ref=${encodeURIComponent(trimmed)}`,
      );
      const data = (await response.json()) as {
        appointment?: Appointment;
        error?: string;
      };

      if (response.status === 404) {
        setError("No appointment found for that reference.");
        return;
      }
      if (!response.ok || !data.appointment) {
        setError(data.error ?? "Could not complete the lookup. Please retry.");
        return;
      }
      setResult(data.appointment);
    } catch {
      setError("Could not reach the lookup service. Check your connection.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-5 sm:p-6 dark:border-zinc-800 dark:bg-zinc-900">
      <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
        Quick booking lookup
      </h2>
      <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
        Check the status of an appointment using its booking reference.
      </p>

      <form
        onSubmit={handleSubmit}
        noValidate
        className="mt-4 flex flex-col gap-3 sm:flex-row"
      >
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
          disabled={loading}
          className="inline-flex items-center justify-center rounded-full bg-teal-700 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Checking…" : "Look up"}
        </button>
      </form>

      {error ? (
        <p
          id="lookup-error"
          className="mt-2 text-sm text-red-600 dark:text-red-400"
        >
          {error}
        </p>
      ) : (
        <p className="mt-2 text-xs text-zinc-400 dark:text-zinc-500">
          Enter the AP- reference from your booking confirmation.
        </p>
      )}

      {result ? (
        <div className="mt-4 rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-950">
          <div className="flex items-center justify-between gap-3">
            <span className="font-semibold tracking-wide text-zinc-900 dark:text-zinc-100">
              {result.id}
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
            <DetailRow label="Patient" value={result.patientName} />
            <DetailRow label="Service" value={result.serviceTitle} />
            <DetailRow
              label="Date"
              value={formatAppointmentDate(result.date)}
            />
            <DetailRow label="Time slot" value={result.time} />
            <DetailRow
              label="Consultation type"
              value={modeLabel(result.mode)}
            />
          </dl>
        </div>
      ) : null}
    </section>
  );
}
