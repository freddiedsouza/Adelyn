"use client";

import type { FormEvent } from "react";
import { useEffect, useRef, useState } from "react";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Field = "name" | "phone" | "email" | "subject" | "message";

function inputClass(hasError: boolean): string {
  return [
    "w-full rounded-lg border bg-white px-3 py-2.5 text-sm text-zinc-900 outline-none transition-colors",
    "focus:ring-2 focus:ring-teal-600/30 dark:bg-zinc-950 dark:text-zinc-100",
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

export default function ContactForm() {
  const [values, setValues] = useState<Record<Field, string>>({
    name: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [toastVisible, setToastVisible] = useState(false);
  const toastTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (toastTimeout.current) clearTimeout(toastTimeout.current);
    },
    [],
  );

  function setField(field: Field, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  }

  function validate(): Partial<Record<Field, string>> {
    const next: Partial<Record<Field, string>> = {};
    if (!values.name.trim()) next.name = "Your name is required.";
    const digits = values.phone.replace(/\D/g, "");
    if (!values.phone.trim()) next.phone = "A phone number is required.";
    else if (digits.length < 8 || digits.length > 15)
      next.phone = "Enter a valid phone number.";
    if (!values.email.trim()) next.email = "An email address is required.";
    else if (!EMAIL_RE.test(values.email.trim()))
      next.email = "Enter a valid email address.";
    if (!values.subject.trim()) next.subject = "Add a subject.";
    if (!values.message.trim()) next.message = "Write a short message.";
    return next;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    // Simulated send — no backend. Show a success toast and reset the form.
    setValues({ name: "", phone: "", email: "", subject: "", message: "" });
    setToastVisible(true);
    if (toastTimeout.current) clearTimeout(toastTimeout.current);
    toastTimeout.current = setTimeout(() => setToastVisible(false), 5000);
  }

  return (
    <div className="relative">
      <form
        onSubmit={handleSubmit}
        noValidate
        className="grid grid-cols-1 gap-4 sm:grid-cols-2"
      >
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="contact-name"
            className="text-sm font-medium text-zinc-900 dark:text-zinc-100"
          >
            Name <span className="text-red-600">*</span>
          </label>
          <input
            id="contact-name"
            type="text"
            autoComplete="name"
            value={values.name}
            onChange={(event) => setField("name", event.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "contact-name-error" : undefined}
            className={inputClass(Boolean(errors.name))}
          />
          <FieldError id="contact-name-error" message={errors.name} />
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="contact-phone"
            className="text-sm font-medium text-zinc-900 dark:text-zinc-100"
          >
            Phone <span className="text-red-600">*</span>
          </label>
          <input
            id="contact-phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="+91 98765 43210"
            value={values.phone}
            onChange={(event) => setField("phone", event.target.value)}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "contact-phone-error" : undefined}
            className={inputClass(Boolean(errors.phone))}
          />
          <FieldError id="contact-phone-error" message={errors.phone} />
        </div>

        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <label
            htmlFor="contact-email"
            className="text-sm font-medium text-zinc-900 dark:text-zinc-100"
          >
            Email <span className="text-red-600">*</span>
          </label>
          <input
            id="contact-email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={values.email}
            onChange={(event) => setField("email", event.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "contact-email-error" : undefined}
            className={inputClass(Boolean(errors.email))}
          />
          <FieldError id="contact-email-error" message={errors.email} />
        </div>

        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <label
            htmlFor="contact-subject"
            className="text-sm font-medium text-zinc-900 dark:text-zinc-100"
          >
            Subject <span className="text-red-600">*</span>
          </label>
          <input
            id="contact-subject"
            type="text"
            value={values.subject}
            onChange={(event) => setField("subject", event.target.value)}
            aria-invalid={Boolean(errors.subject)}
            aria-describedby={
              errors.subject ? "contact-subject-error" : undefined
            }
            className={inputClass(Boolean(errors.subject))}
          />
          <FieldError id="contact-subject-error" message={errors.subject} />
        </div>

        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <label
            htmlFor="contact-message"
            className="text-sm font-medium text-zinc-900 dark:text-zinc-100"
          >
            Message <span className="text-red-600">*</span>
          </label>
          <textarea
            id="contact-message"
            rows={4}
            value={values.message}
            onChange={(event) => setField("message", event.target.value)}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={
              errors.message ? "contact-message-error" : undefined
            }
            className={inputClass(Boolean(errors.message))}
          />
          <FieldError id="contact-message-error" message={errors.message} />
        </div>

        <div className="sm:col-span-2">
          <button
            type="submit"
            className="inline-flex w-full items-center justify-center rounded-full bg-teal-700 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-teal-800 sm:w-auto"
          >
            Send message
          </button>
        </div>
      </form>

      {toastVisible ? (
        <div
          role="status"
          className="fixed bottom-4 right-4 z-50 flex items-center gap-2 rounded-xl border border-teal-200 bg-white px-4 py-3 text-sm font-medium text-teal-800 shadow-lg dark:border-teal-800 dark:bg-zinc-900 dark:text-teal-200"
        >
          <svg
            className="h-5 w-5 text-teal-600 dark:text-teal-400"
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
          Message sent — we&apos;ll reply within one business day.
        </div>
      ) : null}
    </div>
  );
}
