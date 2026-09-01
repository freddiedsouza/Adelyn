import type {
  AppointmentStatus,
  ConsultationMode,
} from "@/types/appointment";

export function formatAppointmentDate(iso: string): string {
  const parsed = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) return iso;
  return parsed.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function isToday(iso: string): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return iso === today.toISOString().split("T")[0];
}

export function isTodayOrPast(iso: string): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return iso <= today.toISOString().split("T")[0];
}

export function modeLabel(mode: ConsultationMode): string {
  return mode === "in-person" ? "In-Person" : "Virtual";
}

export function statusBadgeClass(status: AppointmentStatus): string {
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
      return "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300";
  }
}
