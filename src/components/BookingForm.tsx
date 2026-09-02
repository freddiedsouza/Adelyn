"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { services } from "@/data/services";
import {
  getPackageRules,
  priceFrom,
  resolveServicePrice,
} from "@/lib/pricing";

type ConsultationMode = "in-person" | "virtual";
type VisitType = "new" | "follow-up";

const MORNING_SLOTS = ["09:00 AM", "09:45 AM", "10:30 AM", "11:15 AM"];
const AFTERNOON_SLOTS = ["02:00 PM", "02:45 PM", "03:30 PM", "04:15 PM"];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface Confirmation {
  reference: string;
  serviceTitle: string;
  mode: ConsultationMode;
  dateLabel: string;
  slot: string;
  priceSummary: string;
  visitTypeLabel: string;
  fullName: string;
  phone: string;
  email: string;
  complaint: string;
  history: string;
}

function todayIso(): string {
  const now = new Date();
  const tzOffset = now.getTimezoneOffset() * 60000;
  return new Date(now.getTime() - tzOffset).toISOString().split("T")[0];
}


/** ISO date (YYYY-MM-DD) -> "DD/MM/YYYY". */
function isoToDmy(iso: string): string {
  const [year, month, day] = iso.split("-");
  if (!year || !month || !day) return "";
  return `${day}/${month}/${year}`;
}

/** "DD/MM/YYYY" -> ISO "YYYY-MM-DD", or "" when it is not a real calendar date. */
function dmyToIso(dmy: string): string {
  const match = dmy.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (!match) return "";
  const [, dd, mm, yyyy] = match;
  const day = Number(dd);
  const month = Number(mm);
  const year = Number(yyyy);
  const probe = new Date(year, month - 1, day);
  if (
    probe.getFullYear() !== year ||
    probe.getMonth() !== month - 1 ||
    probe.getDate() !== day
  ) {
    return "";
  }
  return `${yyyy}-${mm}-${dd}`;
}

/** Progressively formats digits as the user types: 15092026 -> 15/09/2026. */
function maskDmy(input: string): string {
  const digits = input.replace(/\D/g, "").slice(0, 8);
  const parts = [digits.slice(0, 2), digits.slice(2, 4), digits.slice(4, 8)];
  return parts.filter(Boolean).join("/");
}

function modeLabel(mode: ConsultationMode | ""): string {
  if (mode === "in-person") return "In-Person Clinic Visit";
  if (mode === "virtual") return "Virtual Consultation";
  return "";
}

function inputClass(hasError: boolean): string {
  return [
    "w-full rounded-lg border bg-white px-3 py-2.5 text-sm text-zinc-900 outline-none transition-colors",
    "focus:ring-2 focus:ring-teal-500/20 dark:bg-zinc-900 dark:text-zinc-100",
    hasError
      ? "border-red-500 focus:border-red-500 focus:ring-red-500/30"
      : "border-zinc-300 focus:border-teal-600 dark:border-zinc-700",
  ].join(" ");
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1.5 text-sm text-red-600 dark:text-red-400">
      {message}
    </p>
  );
}

function StepHeading({
  step,
  title,
  hint,
}: {
  step: number;
  title: string;
  hint?: string;
}) {
  return (
    <div className="mb-4">
      <div className="flex items-center gap-2.5">
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-teal-700 text-xs font-semibold text-white">
          {step}
        </span>
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          {title}
        </h2>
      </div>
      {hint ? (
        <p className="mt-1 pl-10 text-sm text-zinc-500 dark:text-zinc-400">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <dt className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
        {label}
      </dt>
      <dd className="text-sm text-zinc-900 dark:text-zinc-100">
        {value || <span className="text-zinc-400">Not selected</span>}
      </dd>
    </div>
  );
}

export default function BookingForm() {
  const searchParams = useSearchParams();
  const preselected = searchParams.get("service") ?? "";

  const [serviceId, setServiceId] = useState(
    services.some((service) => service.id === preselected) ? preselected : "",
  );
  const [mode, setMode] = useState<ConsultationMode | "">("");
  const [visitType, setVisitType] = useState<VisitType>("new");
  const [packageId, setPackageId] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [date, setDate] = useState("");
  const [slot, setSlot] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [complaint, setComplaint] = useState("");
  const [history, setHistory] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [confirmation, setConfirmation] = useState<Confirmation | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const minDate = todayIso();
  const selectedService =
    services.find((service) => service.id === serviceId) ?? null;

  const packageOptions = serviceId ? getPackageRules(serviceId) : [];
  const resolvedPrice = serviceId
    ? resolveServicePrice(serviceId, {
        mode: mode || undefined,
        visitType,
        packageId: packageId || undefined,
        promoCode: promoCode.trim() || undefined,
      })
    : null;
  const visitTypeLabel =
    visitType === "follow-up" ? "Follow-up session" : "New patient";

  function clearError(key: string) {
    setErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  }

  function validate(): Record<string, string> {
    const next: Record<string, string> = {};
    if (!serviceId) next.serviceId = "Please choose a service.";
    if (!mode) next.mode = "Please choose a consultation mode.";
    if (!date.trim()) {
      next.date = "Please choose a preferred date.";
    } else {
      const iso = dmyToIso(date);
      if (!iso) next.date = "Enter the date as DD/MM/YYYY.";
      else if (iso < minDate) next.date = "Please choose a date today or later.";
    }
    if (!slot) next.slot = "Please choose a time slot.";
    if (!fullName.trim()) next.fullName = "Full name is required.";
    const digits = phone.replace(/\D/g, "");
    if (!phone.trim()) next.phone = "Phone number is required.";
    else if (digits.length < 8 || digits.length > 15)
      next.phone = "Enter a valid phone number (8–15 digits).";
    if (!email.trim()) next.email = "Email address is required.";
    else if (!EMAIL_RE.test(email.trim()))
      next.email = "Enter a valid email address.";
    if (!complaint.trim())
      next.complaint = "Please describe your chief complaint or pain area.";
    return next;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setSubmitting(true);
    setSubmitError("");

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceId,
          mode,
          date: dmyToIso(date),
          time: slot,
          fullName: fullName.trim(),
          phone: phone.trim(),
          email: email.trim(),
          chiefComplaint: complaint.trim(),
          medicalHistory: history.trim(),
        }),
      });
      const payload = (await response.json()) as {
        appointment?: {
          id: string;
          serviceTitle: string;
          mode: ConsultationMode;
          time: string;
          patientName: string;
          phone: string;
          email: string;
          chiefComplaint: string;
          medicalHistory: string;
        };
        error?: string;
      };

      if (!response.ok || !payload.appointment) {
        setSubmitError(
          payload.error ?? "Something went wrong. Please try again.",
        );
        return;
      }

      const appointment = payload.appointment;
      setConfirmation({
        reference: appointment.id,
        serviceTitle: appointment.serviceTitle,
        mode: appointment.mode,
        dateLabel: date,
        slot: appointment.time,
        fullName: appointment.patientName,
        phone: appointment.phone,
        email: appointment.email,
        complaint: appointment.chiefComplaint,
        history: appointment.medicalHistory,
        priceSummary: resolvedPrice?.summary ?? "",
        visitTypeLabel,
      });

      if (typeof window !== "undefined") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } catch {
      setSubmitError(
        "Could not reach the booking service. Check your connection and try again.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  function handleReset() {
    setServiceId("");
    setMode("");
    setVisitType("new");
    setPackageId("");
    setPromoCode("");
    setDate("");
    setSlot("");
    setFullName("");
    setPhone("");
    setEmail("");
    setComplaint("");
    setHistory("");
    setErrors({});
    setSubmitError("");
    setConfirmation(null);
  }

  if (confirmation) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-12 lg:px-8 lg:py-16">
        <div className="rounded-2xl border border-zinc-200/80 bg-white/70 p-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] backdrop-blur-md sm:p-8 dark:border-zinc-800/80 dark:bg-zinc-900/70">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-teal-50 dark:bg-teal-950">
              <svg
                className="h-6 w-6 text-teal-600 dark:text-teal-400"
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
            <div>
              <h1 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
                Appointment request received
              </h1>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Please keep your booking reference for any follow-up.
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-xl bg-teal-50 px-4 py-3 dark:bg-teal-950">
            <p className="text-xs font-medium uppercase tracking-wide text-teal-700 dark:text-teal-300">
              Booking reference
            </p>
            <p className="mt-1 text-2xl font-semibold tracking-wide text-teal-800 dark:text-teal-200">
              {confirmation.reference}
            </p>
          </div>

          <dl className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <SummaryRow label="Practitioner" value="Dr. Adelyn Pereira" />
            <SummaryRow label="Service" value={confirmation.serviceTitle} />
            <SummaryRow label="Date" value={confirmation.dateLabel} />
            <SummaryRow label="Time slot" value={confirmation.slot} />
            <SummaryRow
              label="Consultation type"
              value={modeLabel(confirmation.mode)}
            />
            <SummaryRow label="Visit type" value={confirmation.visitTypeLabel} />
            <SummaryRow label="Price" value={confirmation.priceSummary} />
          </dl>

          <div className="mt-6 border-t border-zinc-200 pt-6 dark:border-zinc-800">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
              Patient details
            </h2>
            <dl className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <SummaryRow label="Full name" value={confirmation.fullName} />
              <SummaryRow label="Phone" value={confirmation.phone} />
              <SummaryRow label="Email" value={confirmation.email} />
              <SummaryRow
                label="Chief complaint / pain area"
                value={confirmation.complaint}
              />
              <SummaryRow
                label="Medical history / previous surgery"
                value={confirmation.history || "None provided"}
              />
            </dl>
          </div>

          <div className="mt-6 rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-950">
            <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
              Next steps
            </h2>
            <ul className="mt-2 space-y-2 text-sm text-zinc-600 dark:text-zinc-300">
              <li>
                Our team will call you on{" "}
                <span className="font-medium">{confirmation.phone}</span> within
                one business day to confirm this slot.
              </li>
              {confirmation.mode === "in-person" ? (
                <li>
                  Arrive 10 minutes early at the clinic reception. Bring any
                  recent scans, referral letters, and wear comfortable clothing
                  for a movement assessment.
                </li>
              ) : (
                <li>
                  A secure video consultation link will be emailed to{" "}
                  <span className="font-medium">{confirmation.email}</span> before
                  your appointment. Join 5 minutes early from a quiet, well-lit
                  space with a stable connection.
                </li>
              )}
              <li>
                To reschedule or cancel, reply to your confirmation email quoting
                reference{" "}
                <span className="font-medium">{confirmation.reference}</span>.
              </li>
            </ul>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center justify-center rounded-full bg-teal-700 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-teal-800"
            >
              Book Another Appointment
            </button>
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full border border-zinc-300 px-5 py-2.5 text-sm font-semibold text-zinc-800 transition-colors hover:border-teal-600 hover:text-teal-700 dark:border-zinc-700 dark:text-zinc-100"
            >
              Return to homepage
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const hasErrors = Object.keys(errors).length > 0;

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16">
      <div className="max-w-2xl">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
          Book an appointment
        </h1>
        <p className="mt-3 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
          Request an in-person or virtual physiotherapy consultation with Dr.
          Adelyn Pereira. All fields marked required must be completed.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-[minmax(0,1fr)_20rem] lg:grid-cols-[minmax(0,1fr)_24rem]">
        {/* Intake form */}
        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
          {/* Step 1 — Service */}
          <fieldset className="rounded-2xl border border-zinc-200/80 bg-white/70 p-5 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] backdrop-blur-md sm:p-6 dark:border-zinc-800/80 dark:bg-zinc-900/70">
            <StepHeading step={1} title="Select a service" />
            <div
              role="radiogroup"
              aria-label="Clinical service"
              className="flex flex-col gap-3"
            >
              {services.map((service) => {
                const active = serviceId === service.id;
                return (
                  <label
                    key={service.id}
                    className={[
                      "flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition-colors focus-within:ring-2 focus-within:ring-teal-600",
                      active
                        ? "border-teal-600 bg-teal-50 dark:bg-teal-950"
                        : "border-zinc-200 bg-white hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900",
                    ].join(" ")}
                  >
                    <input
                      type="radio"
                      name="service"
                      value={service.id}
                      checked={active}
                      onChange={() => {
                        setServiceId(service.id);
                        clearError("serviceId");
                      }}
                      className="sr-only"
                    />
                    <span
                      className={[
                        "mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border",
                        active ? "border-teal-600" : "border-zinc-400",
                      ].join(" ")}
                      aria-hidden="true"
                    >
                      {active ? (
                        <span className="h-2 w-2 rounded-full bg-teal-600" />
                      ) : null}
                    </span>
                    <span className="flex flex-col">
                      <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                        {service.title}
                      </span>
                      <span className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">
                        {service.sessionDuration} · {priceFrom(service.id)}
                      </span>
                    </span>
                  </label>
                );
              })}
            </div>
            <FieldError id="error-serviceId" message={errors.serviceId} />

            {serviceId ? (
              <div className="mt-5 flex flex-col gap-4 border-t border-zinc-200 pt-5 dark:border-zinc-800">
                <div className="flex flex-col gap-1.5">
                  <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                    Visit type
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {(
                      [
                        { value: "new" as const, label: "New patient" },
                        { value: "follow-up" as const, label: "Follow-up" },
                      ]
                    ).map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        aria-pressed={visitType === option.value}
                        onClick={() => setVisitType(option.value)}
                        className={[
                          "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                          visitType === option.value
                            ? "border-teal-600 bg-teal-700 text-white"
                            : "border-zinc-300 bg-white text-zinc-700 hover:border-teal-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200",
                        ].join(" ")}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>

                {packageOptions.length > 0 ? (
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="booking-package"
                      className="text-sm font-medium text-zinc-900 dark:text-zinc-100"
                    >
                      Session package
                    </label>
                    <select
                      id="booking-package"
                      value={packageId}
                      onChange={(event) => setPackageId(event.target.value)}
                      className={inputClass(false)}
                    >
                      <option value="">Single session</option>
                      {packageOptions.map((option) => (
                        <option key={option.id} value={option.id}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                ) : null}

                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="booking-promo"
                    className="text-sm font-medium text-zinc-900 dark:text-zinc-100"
                  >
                    Promo code{" "}
                    <span className="font-normal text-zinc-400">(optional)</span>
                  </label>
                  <input
                    id="booking-promo"
                    type="text"
                    autoComplete="off"
                    value={promoCode}
                    onChange={(event) => setPromoCode(event.target.value)}
                    placeholder="e.g. WELCOME10"
                    className={`${inputClass(false)} uppercase placeholder:normal-case sm:max-w-xs`}
                  />
                </div>

                {resolvedPrice ? (
                  <div className="rounded-xl bg-teal-50 px-4 py-3 dark:bg-teal-950">
                    <p className="text-xs font-medium uppercase tracking-wide text-teal-700 dark:text-teal-300">
                      Estimated price
                    </p>
                    <p className="mt-1 text-lg font-semibold text-teal-800 dark:text-teal-200">
                      {resolvedPrice.summary}
                    </p>
                    {resolvedPrice.applied.length > 0 ? (
                      <p className="mt-1 text-xs text-teal-700 dark:text-teal-300">
                        Applied: {resolvedPrice.applied.join(", ")}
                      </p>
                    ) : null}
                  </div>
                ) : null}
              </div>
            ) : null}
          </fieldset>

          {/* Step 2 — Consultation mode */}
          <fieldset className="rounded-2xl border border-zinc-200/80 bg-white/70 p-5 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] backdrop-blur-md sm:p-6 dark:border-zinc-800/80 dark:bg-zinc-900/70">
            <StepHeading step={2} title="Choose a consultation mode" />
            <div
              role="radiogroup"
              aria-label="Consultation mode"
              className="grid grid-cols-1 gap-3 sm:grid-cols-2"
            >
              {(
                [
                  {
                    value: "in-person" as const,
                    title: "In-Person Clinic Visit",
                    hint: "Hands-on assessment and treatment at the clinic.",
                  },
                  {
                    value: "virtual" as const,
                    title: "Virtual Consultation",
                    hint: "Secure video assessment and guided exercise plan.",
                  },
                ]
              ).map((option) => {
                const active = mode === option.value;
                return (
                  <label
                    key={option.value}
                    className={[
                      "flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition-colors focus-within:ring-2 focus-within:ring-teal-600",
                      active
                        ? "border-teal-600 bg-teal-50 dark:bg-teal-950"
                        : "border-zinc-200 bg-white hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900",
                    ].join(" ")}
                  >
                    <input
                      type="radio"
                      name="mode"
                      value={option.value}
                      checked={active}
                      onChange={() => {
                        setMode(option.value);
                        clearError("mode");
                      }}
                      className="sr-only"
                    />
                    <span
                      className={[
                        "mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border",
                        active ? "border-teal-600" : "border-zinc-400",
                      ].join(" ")}
                      aria-hidden="true"
                    >
                      {active ? (
                        <span className="h-2 w-2 rounded-full bg-teal-600" />
                      ) : null}
                    </span>
                    <span className="flex flex-col">
                      <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                        {option.title}
                      </span>
                      <span className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">
                        {option.hint}
                      </span>
                    </span>
                  </label>
                );
              })}
            </div>
            <FieldError id="error-mode" message={errors.mode} />
          </fieldset>

          {/* Step 3 — Date & slot */}
          <fieldset className="rounded-2xl border border-zinc-200/80 bg-white/70 p-5 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] backdrop-blur-md sm:p-6 dark:border-zinc-800/80 dark:bg-zinc-900/70">
            <StepHeading step={3} title="Pick a date and time slot" />
            <div className="flex flex-col gap-2">
              <label
                htmlFor="booking-date"
                className="text-sm font-medium text-zinc-900 dark:text-zinc-100"
              >
                Preferred date{" "}
                <span className="font-normal text-zinc-400">(DD/MM/YYYY)</span>{" "}
                <span className="text-red-600">*</span>
              </label>
              <div className="relative sm:max-w-xs">
                <input
                  id="booking-date"
                  type="text"
                  inputMode="numeric"
                  autoComplete="off"
                  placeholder="DD/MM/YYYY"
                  maxLength={10}
                  value={date}
                  onChange={(event) => {
                    setDate(maskDmy(event.target.value));
                    clearError("date");
                  }}
                  aria-invalid={Boolean(errors.date)}
                  aria-describedby={errors.date ? "error-date" : undefined}
                  className={`${inputClass(Boolean(errors.date))} pr-11`}
                />
                <span
                  className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-zinc-500 dark:text-zinc-400"
                  aria-hidden="true"
                >
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0V11.25A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
                    />
                  </svg>
                </span>
                <input
                  type="date"
                  aria-label="Pick a date from the calendar"
                  tabIndex={-1}
                  min={minDate}
                  value={dmyToIso(date)}
                  onClick={(event) => event.currentTarget.showPicker?.()}
                  onChange={(event) => {
                    const iso = event.target.value;
                    setDate(iso ? isoToDmy(iso) : "");
                    clearError("date");
                  }}
                  className="absolute inset-y-0 right-0 w-11 cursor-pointer opacity-0"
                />
              </div>
              <p className="text-xs text-zinc-400 dark:text-zinc-500">
                Earliest date: {isoToDmy(minDate)}
              </p>
              <FieldError id="error-date" message={errors.date} />
            </div>

            <div className="mt-5 flex flex-col gap-4">
              <div>
                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                  Morning
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {MORNING_SLOTS.map((time) => {
                    const active = slot === time;
                    return (
                      <button
                        key={time}
                        type="button"
                        aria-pressed={active}
                        onClick={() => {
                          setSlot(time);
                          clearError("slot");
                        }}
                        className={[
                          "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                          active
                            ? "border-teal-600 bg-teal-700 text-white"
                            : "border-zinc-300 bg-white text-zinc-700 hover:border-teal-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200",
                        ].join(" ")}
                      >
                        {time}
                      </button>
                    );
                  })}
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                  Afternoon
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {AFTERNOON_SLOTS.map((time) => {
                    const active = slot === time;
                    return (
                      <button
                        key={time}
                        type="button"
                        aria-pressed={active}
                        onClick={() => {
                          setSlot(time);
                          clearError("slot");
                        }}
                        className={[
                          "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                          active
                            ? "border-teal-600 bg-teal-700 text-white"
                            : "border-zinc-300 bg-white text-zinc-700 hover:border-teal-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200",
                        ].join(" ")}
                      >
                        {time}
                      </button>
                    );
                  })}
                </div>
              </div>
              <FieldError id="error-slot" message={errors.slot} />
            </div>
          </fieldset>

          {/* Step 4 — Patient details */}
          <fieldset className="rounded-2xl border border-zinc-200/80 bg-white/70 p-5 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] backdrop-blur-md sm:p-6 dark:border-zinc-800/80 dark:bg-zinc-900/70">
            <StepHeading
              step={4}
              title="Patient details & medical intake"
              hint="Shared only with Dr. Adelyn Pereira's clinical team."
            />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="booking-name"
                  className="text-sm font-medium text-zinc-900 dark:text-zinc-100"
                >
                  Full name <span className="text-red-600">*</span>
                </label>
                <input
                  id="booking-name"
                  type="text"
                  autoComplete="name"
                  value={fullName}
                  onChange={(event) => {
                    setFullName(event.target.value);
                    clearError("fullName");
                  }}
                  aria-invalid={Boolean(errors.fullName)}
                  aria-describedby={
                    errors.fullName ? "error-fullName" : undefined
                  }
                  className={inputClass(Boolean(errors.fullName))}
                />
                <FieldError id="error-fullName" message={errors.fullName} />
              </div>

              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="booking-phone"
                  className="text-sm font-medium text-zinc-900 dark:text-zinc-100"
                >
                  Phone number <span className="text-red-600">*</span>
                </label>
                <input
                  id="booking-phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(event) => {
                    setPhone(event.target.value);
                    clearError("phone");
                  }}
                  aria-invalid={Boolean(errors.phone)}
                  aria-describedby={errors.phone ? "error-phone" : undefined}
                  className={inputClass(Boolean(errors.phone))}
                />
                <FieldError id="error-phone" message={errors.phone} />
              </div>

              <div className="flex flex-col gap-1.5 sm:col-span-2">
                <label
                  htmlFor="booking-email"
                  className="text-sm font-medium text-zinc-900 dark:text-zinc-100"
                >
                  Email address <span className="text-red-600">*</span>
                </label>
                <input
                  id="booking-email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                    clearError("email");
                  }}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? "error-email" : undefined}
                  className={inputClass(Boolean(errors.email))}
                />
                <FieldError id="error-email" message={errors.email} />
              </div>

              <div className="flex flex-col gap-1.5 sm:col-span-2">
                <label
                  htmlFor="booking-complaint"
                  className="text-sm font-medium text-zinc-900 dark:text-zinc-100"
                >
                  Chief complaint / pain area{" "}
                  <span className="text-red-600">*</span>
                </label>
                <textarea
                  id="booking-complaint"
                  rows={3}
                  value={complaint}
                  onChange={(event) => {
                    setComplaint(event.target.value);
                    clearError("complaint");
                  }}
                  placeholder="e.g. Right shoulder pain when lifting, ongoing for 6 weeks."
                  aria-invalid={Boolean(errors.complaint)}
                  aria-describedby={
                    errors.complaint ? "error-complaint" : undefined
                  }
                  className={inputClass(Boolean(errors.complaint))}
                />
                <FieldError id="error-complaint" message={errors.complaint} />
              </div>

              <div className="flex flex-col gap-1.5 sm:col-span-2">
                <label
                  htmlFor="booking-history"
                  className="text-sm font-medium text-zinc-900 dark:text-zinc-100"
                >
                  Medical history / previous surgery{" "}
                  <span className="text-zinc-400">(optional)</span>
                </label>
                <textarea
                  id="booking-history"
                  rows={3}
                  value={history}
                  onChange={(event) => setHistory(event.target.value)}
                  placeholder="Previous surgeries, diagnoses, medication, or imaging results."
                  className={inputClass(false)}
                />
              </div>
            </div>
          </fieldset>

          {hasErrors ? (
            <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700 dark:bg-red-950 dark:text-red-300">
              Please correct the highlighted fields and submit again.
            </p>
          ) : null}

          {submitError ? (
            <p
              role="alert"
              className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700 dark:bg-red-950 dark:text-red-300"
            >
              {submitError}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={submitting}
            className="inline-flex w-full items-center justify-center rounded-full bg-teal-700 px-6 py-3 text-sm font-semibold text-white shadow-[0_4px_20px_-4px_rgba(13,148,136,0.4)] transition-all duration-150 hover:-translate-y-0.5 hover:bg-teal-800 hover:shadow-[0_12px_30px_-6px_rgba(13,148,136,0.5)] active:translate-y-0 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
          >
            {submitting ? "Submitting…" : "Request Appointment"}
          </button>
        </form>

        {/* Live appointment summary */}
        <aside className="md:sticky md:top-24 md:h-fit">
          <div className="rounded-2xl border border-zinc-200/80 bg-white/70 p-5 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] backdrop-blur-md sm:p-6 dark:border-zinc-800/80 dark:bg-zinc-900/70">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
              Appointment summary
            </h2>
            <dl className="mt-4 flex flex-col gap-4">
              <SummaryRow label="Practitioner" value="Dr. Adelyn Pereira" />
              <SummaryRow
                label="Service"
                value={selectedService?.title ?? ""}
              />
              <SummaryRow label="Consultation" value={modeLabel(mode)} />
              <SummaryRow
                label="Visit type"
                value={serviceId ? visitTypeLabel : ""}
              />
              <SummaryRow
                label="Date"
                value={dmyToIso(date) ? date : ""}
              />
              <SummaryRow label="Time slot" value={slot} />
              <SummaryRow
                label="Estimated price"
                value={resolvedPrice?.summary ?? ""}
              />
            </dl>
            <p className="mt-4 border-t border-zinc-200 pt-4 text-xs text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
              You&apos;ll receive a booking reference and confirmation details
              after submitting this request.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
