"use client";

import { useEffect } from "react";
import type { Appointment } from "@/types/appointment";
import {
  formatAppointmentDate,
  modeLabel,
  statusBadgeClass,
} from "@/lib/appointments";

interface ClinicalNotesDrawerProps {
  appointment: Appointment | null;
  onClose: () => void;
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
        {label}
      </p>
      <p className="mt-1 text-sm text-zinc-900 dark:text-zinc-100">{value}</p>
    </div>
  );
}

export default function ClinicalNotesDrawer({
  appointment,
  onClose,
}: ClinicalNotesDrawerProps) {
  useEffect(() => {
    if (!appointment) return;
    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [appointment, onClose]);

  if (!appointment) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <button
        type="button"
        aria-label="Close notes"
        onClick={onClose}
        className="absolute inset-0 h-full w-full bg-black/40"
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label={`Clinical notes for ${appointment.patientName}`}
        className="relative flex h-full w-full max-w-md flex-col overflow-y-auto bg-white shadow-xl dark:bg-zinc-900"
      >
        <header className="flex items-start justify-between gap-4 border-b border-zinc-200 px-5 py-4 dark:border-zinc-800">
          <div>
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
              {appointment.patientName}
            </h2>
            <p className="mt-0.5 text-sm text-zinc-500 dark:text-zinc-400">
              {appointment.id} ·{" "}
              <span
                className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold ${statusBadgeClass(
                  appointment.status,
                )}`}
              >
                {appointment.status}
              </span>
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="rounded-md p-1.5 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-800 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
        </header>

        <div className="flex flex-col gap-5 px-5 py-5">
          <div className="grid grid-cols-2 gap-4">
            <Field label="Phone" value={appointment.phone} />
            <Field label="Email" value={appointment.email} />
            <Field label="Service" value={appointment.serviceTitle} />
            <Field
              label="Date & time"
              value={`${formatAppointmentDate(appointment.date)} · ${appointment.time}`}
            />
            <Field label="Mode" value={modeLabel(appointment.mode)} />
          </div>

          <div className="border-t border-zinc-200 pt-5 dark:border-zinc-800">
            <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
              Chief complaint / pain area
            </p>
            <p className="mt-2 text-sm leading-6 text-zinc-800 dark:text-zinc-200">
              {appointment.chiefComplaint || "Not provided"}
            </p>
          </div>

          <div className="border-t border-zinc-200 pt-5 dark:border-zinc-800">
            <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
              Medical history / previous surgery
            </p>
            <p className="mt-2 text-sm leading-6 text-zinc-800 dark:text-zinc-200">
              {appointment.medicalHistory || "None provided"}
            </p>
          </div>
        </div>
      </aside>
    </div>
  );
}
