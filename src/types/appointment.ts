export type ConsultationMode = "in-person" | "virtual";

export type AppointmentStatus =
  | "Confirmed"
  | "Completed"
  | "Rescheduled"
  | "Cancelled";

export interface Appointment {
  /** Booking reference, e.g. "AP-7F3K". */
  id: string;
  patientName: string;
  phone: string;
  email: string;
  /** Matches an id in the clinical services catalogue. */
  serviceId: string;
  serviceTitle: string;
  /** ISO date, YYYY-MM-DD. */
  date: string;
  /** Display time, e.g. "09:00 AM". */
  time: string;
  mode: ConsultationMode;
  status: AppointmentStatus;
  /** Patient-submitted chief complaint / pain area from the booking intake. */
  chiefComplaint: string;
  /** Patient-submitted medical history / previous surgery notes. */
  medicalHistory: string;
}
