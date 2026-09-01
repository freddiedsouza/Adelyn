import type { Metadata } from "next";
import AdminScheduleTable from "@/components/AdminScheduleTable";

export const metadata: Metadata = {
  title: "Admin Dashboard | Dr. Adelyn Pereira",
  description:
    "Manage appointments, update statuses, and review patient intake notes for Dr. Adelyn Pereira's clinic.",
};

export default function AdminPage() {
  return (
    <main className="flex flex-1 flex-col bg-zinc-50 dark:bg-zinc-950">
      <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="max-w-2xl">
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
            Admin dashboard
          </h1>
          <p className="mt-3 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Review the appointment schedule, change booking statuses, and open
            patient intake notes.
          </p>
        </div>

        <p className="mt-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-200">
          Demo view — not yet behind authentication. New bookings and status
          changes are saved in server memory and persist until the server
          restarts.
        </p>

        <div className="mt-8">
          <AdminScheduleTable />
        </div>
      </div>
    </main>
  );
}
