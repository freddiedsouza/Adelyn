import { appointments as seedAppointments } from "@/data/appointments";
import { services } from "@/data/services";
import type {
  Appointment,
  AppointmentStatus,
  ConsultationMode,
} from "@/types/appointment";

/*
  In-memory appointment store.

  Persistence: this lives in the Node process memory. It survives requests and
  dev hot-reloads (via globalThis) but resets when the server restarts, and is
  not shared across serverless instances. Swap the internals for a database
  when one is available — the exported function signatures can stay the same.
*/

const REFERENCE_CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const STATUSES: AppointmentStatus[] = [
  "Confirmed",
  "Completed",
  "Rescheduled",
  "Cancelled",
];

export class BookingValidationError extends Error {}

export interface BookingInput {
  serviceId: string;
  mode: ConsultationMode;
  /** ISO date, YYYY-MM-DD. */
  date: string;
  /** Time-slot label, e.g. "09:00 AM". */
  time: string;
  fullName: string;
  phone: string;
  email: string;
  chiefComplaint: string;
  medicalHistory?: string;
}

interface StoreShape {
  appointments: Appointment[];
}

const globalForStore = globalThis as unknown as {
  __adelynBookingStore?: StoreShape;
};

const store: StoreShape =
  globalForStore.__adelynBookingStore ?? {
    appointments: seedAppointments.map((appointment) => ({ ...appointment })),
  };

if (!globalForStore.__adelynBookingStore) {
  globalForStore.__adelynBookingStore = store;
}

function timeToMinutes(time: string): number {
  const match = time.trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!match) return 0;
  let hours = Number(match[1]) % 12;
  if (/pm/i.test(match[3])) hours += 12;
  return hours * 60 + Number(match[2]);
}

function sortKey(appointment: Appointment): string {
  return `${appointment.date}T${String(timeToMinutes(appointment.time)).padStart(
    4,
    "0",
  )}`;
}

function generateReference(): string {
  let reference = "";
  do {
    let suffix = "";
    for (let i = 0; i < 4; i += 1) {
      suffix +=
        REFERENCE_CHARS[Math.floor(Math.random() * REFERENCE_CHARS.length)];
    }
    reference = `AP-${suffix}`;
  } while (store.appointments.some((appointment) => appointment.id === reference));
  return reference;
}

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new BookingValidationError(message);
}

/** All appointments, ascending by date then time. */
export function getAllAppointments(): Appointment[] {
  return [...store.appointments].sort((a, b) =>
    sortKey(a).localeCompare(sortKey(b)),
  );
}

/** Looks up an appointment by reference code (case-insensitive). */
export function getAppointmentByRef(referenceId: string): Appointment | null {
  const key = String(referenceId ?? "").trim().toUpperCase();
  if (!key) return null;
  return (
    store.appointments.find(
      (appointment) => appointment.id.toUpperCase() === key,
    ) ?? null
  );
}

/** Validates intake, creates a "Confirmed" appointment, stores and returns it. */
export function createAppointment(input: BookingInput): Appointment {
  const data = (input ?? {}) as Partial<BookingInput>;

  assert(
    typeof data.serviceId === "string" &&
      services.some((service) => service.id === data.serviceId),
    "Unknown or missing service.",
  );
  assert(
    data.mode === "in-person" || data.mode === "virtual",
    "Consultation mode must be 'in-person' or 'virtual'.",
  );
  assert(
    typeof data.date === "string" && /^\d{4}-\d{2}-\d{2}$/.test(data.date),
    "Date must be provided as YYYY-MM-DD.",
  );
  assert(
    typeof data.time === "string" && data.time.trim().length > 0,
    "A time slot is required.",
  );
  assert(
    typeof data.fullName === "string" && data.fullName.trim().length > 0,
    "Full name is required.",
  );
  const phoneDigits = String(data.phone ?? "").replace(/\D/g, "");
  assert(
    phoneDigits.length >= 8 && phoneDigits.length <= 15,
    "Enter a valid phone number.",
  );
  assert(
    typeof data.email === "string" && EMAIL_RE.test(data.email.trim()),
    "Enter a valid email address.",
  );
  assert(
    typeof data.chiefComplaint === "string" &&
      data.chiefComplaint.trim().length > 0,
    "A chief complaint / pain area is required.",
  );

  const service = services.find((entry) => entry.id === data.serviceId);
  assert(service, "Unknown or missing service.");

  const appointment: Appointment = {
    id: generateReference(),
    patientName: data.fullName!.trim(),
    phone: data.phone!.trim(),
    email: data.email!.trim(),
    serviceId: service!.id,
    serviceTitle: service!.title,
    date: data.date!,
    time: data.time!.trim(),
    mode: data.mode as ConsultationMode,
    status: "Confirmed",
    chiefComplaint: data.chiefComplaint!.trim(),
    medicalHistory: String(data.medicalHistory ?? "").trim(),
  };

  store.appointments.push(appointment);
  return appointment;
}

/** Updates an appointment's status. Returns the record, or null if not found. */
export function updateAppointmentStatus(
  id: string,
  newStatus: AppointmentStatus,
): Appointment | null {
  assert(
    STATUSES.includes(newStatus),
    "Status must be Confirmed, Completed, Rescheduled, or Cancelled.",
  );
  const key = String(id ?? "").trim().toUpperCase();
  const appointment = store.appointments.find(
    (entry) => entry.id.toUpperCase() === key,
  );
  if (!appointment) return null;
  appointment.status = newStatus;
  return appointment;
}
