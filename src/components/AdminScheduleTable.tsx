"use client";

import { useEffect, useMemo, useState } from "react";
import { appointments as seedAppointments } from "@/data/appointments";
import type { Appointment, AppointmentStatus } from "@/types/appointment";
import {
  formatAppointmentDate,
  isToday,
  isTodayOrPast,
  modeLabel,
  statusBadgeClass,
} from "@/lib/appointments";
import AdminMetrics from "@/components/AdminMetrics";
import ClinicalNotesDrawer from "@/components/ClinicalNotesDrawer";

const STATUS_OPTIONS: AppointmentStatus[] = [
  "Confirmed",
  "Completed",
  "Rescheduled",
  "Cancelled",
];

const STATUS_ACTIONS: { label: string; status: AppointmentStatus }[] = [
  { label: "Confirm", status: "Confirmed" },
  { label: "Mark Completed", status: "Completed" },
  { label: "Reschedule", status: "Rescheduled" },
  { label: "Cancel", status: "Cancelled" },
];

function StatusBadge({ status }: { status: AppointmentStatus }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${statusBadgeClass(
        status,
      )}`}
    >
      {status}
    </span>
  );
}

export default function AdminScheduleTable() {
  const [appointments, setAppointments] =
    useState<Appointment[]>(seedAppointments);
  const [syncError, setSyncError] = useState("");
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<AppointmentStatus | "all">(
    "all",
  );
  const [dateFilter, setDateFilter] = useState("");
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [notesId, setNotesId] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const response = await fetch("/api/bookings");
        const data = (await response.json()) as {
          appointments?: Appointment[];
        };
        if (!cancelled && response.ok && data.appointments) {
          setAppointments(data.appointments);
        }
      } catch {
        if (!cancelled) {
          setSyncError("Could not load the latest appointments from the server.");
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const metrics = useMemo(() => {
    return {
      total: appointments.length,
      today: appointments.filter((item) => isToday(item.date)).length,
      pending: appointments.filter(
        (item) =>
          (item.status === "Confirmed" || item.status === "Rescheduled") &&
          isTodayOrPast(item.date),
      ).length,
      inPerson: appointments.filter((item) => item.mode === "in-person").length,
      virtual: appointments.filter((item) => item.mode === "virtual").length,
    };
  }, [appointments]);

  const filtered = useMemo(() => {
    const normalisedQuery = query.trim().toLowerCase();
    return appointments.filter((item) => {
      if (statusFilter !== "all" && item.status !== statusFilter) return false;
      if (dateFilter && item.date !== dateFilter) return false;
      if (
        normalisedQuery &&
        !item.patientName.toLowerCase().includes(normalisedQuery) &&
        !item.id.toLowerCase().includes(normalisedQuery)
      ) {
        return false;
      }
      return true;
    });
  }, [appointments, query, statusFilter, dateFilter]);

  async function updateStatus(id: string, status: AppointmentStatus) {
    setOpenMenuId(null);
    setSyncError("");

    const previous = appointments;
    // optimistic update
    setAppointments((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status } : item)),
    );

    try {
      const response = await fetch(`/api/bookings/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      const data = (await response.json()) as {
        appointment?: Appointment;
        error?: string;
      };
      if (!response.ok || !data.appointment) {
        throw new Error(data.error ?? "Update failed.");
      }
      setAppointments((prev) =>
        prev.map((item) => (item.id === id ? data.appointment! : item)),
      );
    } catch {
      setAppointments(previous); // roll back
      setSyncError("Could not save the status change. Please try again.");
    }
  }

  function clearFilters() {
    setQuery("");
    setStatusFilter("all");
    setDateFilter("");
  }

  const activeAppointment =
    appointments.find((item) => item.id === notesId) ?? null;
  const hasFilters =
    query.trim() !== "" || statusFilter !== "all" || dateFilter !== "";

  return (
    <div className="flex flex-col gap-6">
      <AdminMetrics
        total={metrics.total}
        today={metrics.today}
        pending={metrics.pending}
        inPerson={metrics.inPerson}
        virtual={metrics.virtual}
      />

      {syncError ? (
        <p
          role="alert"
          className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700 dark:bg-red-950 dark:text-red-300"
        >
          {syncError}
        </p>
      ) : null}

      {/* Filters */}
      <div className="flex flex-col gap-3 rounded-xl border border-zinc-200 bg-white p-4 sm:flex-row sm:flex-wrap sm:items-end dark:border-zinc-800 dark:bg-zinc-900">
        <div className="flex flex-1 flex-col gap-1.5 sm:min-w-[220px]">
          <label
            htmlFor="admin-search"
            className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400"
          >
            Search
          </label>
          <input
            id="admin-search"
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Patient name or reference"
            className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-600/30 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="admin-status"
            className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400"
          >
            Status
          </label>
          <select
            id="admin-status"
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(event.target.value as AppointmentStatus | "all")
            }
            className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-600/30 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100"
          >
            <option value="all">All statuses</option>
            {STATUS_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="admin-date"
            className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400"
          >
            Date
          </label>
          <input
            id="admin-date"
            type="date"
            value={dateFilter}
            onChange={(event) => setDateFilter(event.target.value)}
            className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-600/30 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100"
          />
        </div>

        {hasFilters ? (
          <button
            type="button"
            onClick={clearFilters}
            className="rounded-lg border border-zinc-300 px-3 py-2 text-sm font-medium text-zinc-700 transition-colors hover:border-teal-600 hover:text-teal-700 dark:border-zinc-700 dark:text-zinc-200"
          >
            Clear
          </button>
        ) : null}
      </div>

      <p className="text-sm text-zinc-500 dark:text-zinc-400">
        Showing {filtered.length} of {appointments.length} appointments
      </p>

      {/* Desktop / tablet table */}
      <div className="hidden max-h-[70vh] overflow-auto rounded-xl border border-zinc-200 md:block dark:border-zinc-800">
        <table className="w-full min-w-[900px] border-collapse text-left text-sm">
          <thead className="sticky top-0 z-10 bg-zinc-50 dark:bg-zinc-900">
            <tr className="border-b border-zinc-200 dark:border-zinc-800">
              <th className="px-4 py-3 font-semibold text-zinc-600 dark:text-zinc-300">
                Reference
              </th>
              <th className="px-4 py-3 font-semibold text-zinc-600 dark:text-zinc-300">
                Patient
              </th>
              <th className="px-4 py-3 font-semibold text-zinc-600 dark:text-zinc-300">
                Contact
              </th>
              <th className="px-4 py-3 font-semibold text-zinc-600 dark:text-zinc-300">
                Service
              </th>
              <th className="px-4 py-3 font-semibold text-zinc-600 dark:text-zinc-300">
                Date / Time
              </th>
              <th className="px-4 py-3 font-semibold text-zinc-600 dark:text-zinc-300">
                Mode
              </th>
              <th className="px-4 py-3 font-semibold text-zinc-600 dark:text-zinc-300">
                Status
              </th>
              <th className="px-4 py-3 text-right font-semibold text-zinc-600 dark:text-zinc-300">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((item) => (
              <tr
                key={item.id}
                className="border-b border-zinc-100 last:border-0 dark:border-zinc-800/70"
              >
                <td className="px-4 py-3 font-medium text-zinc-900 dark:text-zinc-100">
                  {item.id}
                </td>
                <td className="px-4 py-3 text-zinc-800 dark:text-zinc-200">
                  {item.patientName}
                </td>
                <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">
                  <span className="block">{item.phone}</span>
                  <span className="block max-w-[180px] truncate text-xs">
                    {item.email}
                  </span>
                </td>
                <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">
                  {item.serviceTitle}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-zinc-600 dark:text-zinc-400">
                  <span className="block">
                    {formatAppointmentDate(item.date)}
                  </span>
                  <span className="block text-xs">{item.time}</span>
                </td>
                <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">
                  {modeLabel(item.mode)}
                </td>
                <td className="px-4 py-3">
                  <StatusBadge status={item.status} />
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="relative inline-block text-left">
                    <button
                      type="button"
                      onClick={() =>
                        setOpenMenuId((current) =>
                          current === item.id ? null : item.id,
                        )
                      }
                      aria-haspopup="menu"
                      aria-expanded={openMenuId === item.id}
                      className="rounded-lg border border-zinc-300 px-3 py-1.5 text-xs font-medium text-zinc-700 transition-colors hover:border-teal-600 hover:text-teal-700 dark:border-zinc-700 dark:text-zinc-200"
                    >
                      Change status
                    </button>
                    {openMenuId === item.id ? (
                      <>
                        <button
                          type="button"
                          aria-label="Close menu"
                          onClick={() => setOpenMenuId(null)}
                          className="fixed inset-0 z-10 cursor-default"
                        />
                        <div
                          role="menu"
                          className="absolute right-0 z-20 mt-1 w-44 overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-lg dark:border-zinc-700 dark:bg-zinc-900"
                        >
                          {STATUS_ACTIONS.map((action) => (
                            <button
                              key={action.status}
                              type="button"
                              role="menuitem"
                              disabled={item.status === action.status}
                              onClick={() =>
                                updateStatus(item.id, action.status)
                              }
                              className="block w-full px-3 py-2 text-left text-xs font-medium text-zinc-700 transition-colors hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-40 dark:text-zinc-200 dark:hover:bg-zinc-800"
                            >
                              {action.label}
                            </button>
                          ))}
                        </div>
                      </>
                    ) : null}
                  </div>
                  <button
                    type="button"
                    onClick={() => setNotesId(item.id)}
                    className="ml-2 rounded-lg px-3 py-1.5 text-xs font-medium text-teal-700 transition-colors hover:bg-teal-50 dark:text-teal-400 dark:hover:bg-teal-950"
                  >
                    Notes
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 ? (
          <p className="px-4 py-8 text-center text-sm text-zinc-500 dark:text-zinc-400">
            No appointments match the current filters.
          </p>
        ) : null}
      </div>

      {/* Mobile card list */}
      <div className="flex flex-col gap-4 md:hidden">
        {filtered.length === 0 ? (
          <p className="rounded-xl border border-zinc-200 bg-white px-4 py-8 text-center text-sm text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400">
            No appointments match the current filters.
          </p>
        ) : null}
        {filtered.map((item) => (
          <div
            key={item.id}
            className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-semibold text-zinc-900 dark:text-zinc-100">
                  {item.patientName}
                </p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  {item.id} · {modeLabel(item.mode)}
                </p>
              </div>
              <StatusBadge status={item.status} />
            </div>

            <dl className="mt-3 grid grid-cols-1 gap-2 text-sm">
              <div className="flex justify-between gap-3">
                <dt className="text-zinc-500 dark:text-zinc-400">Service</dt>
                <dd className="text-right text-zinc-800 dark:text-zinc-200">
                  {item.serviceTitle}
                </dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-zinc-500 dark:text-zinc-400">Date / time</dt>
                <dd className="text-right text-zinc-800 dark:text-zinc-200">
                  {formatAppointmentDate(item.date)} · {item.time}
                </dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-zinc-500 dark:text-zinc-400">Contact</dt>
                <dd className="text-right text-zinc-800 dark:text-zinc-200">
                  <span className="block">{item.phone}</span>
                  <span className="block break-all text-xs text-zinc-500 dark:text-zinc-400">
                    {item.email}
                  </span>
                </dd>
              </div>
            </dl>

            <div className="mt-4 grid grid-cols-2 gap-2">
              {STATUS_ACTIONS.map((action) => (
                <button
                  key={action.status}
                  type="button"
                  disabled={item.status === action.status}
                  onClick={() => updateStatus(item.id, action.status)}
                  className="rounded-lg border border-zinc-300 px-3 py-2 text-xs font-medium text-zinc-700 transition-colors hover:border-teal-600 hover:text-teal-700 disabled:cursor-not-allowed disabled:opacity-40 dark:border-zinc-700 dark:text-zinc-200"
                >
                  {action.label}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setNotesId(item.id)}
              className="mt-2 w-full rounded-lg bg-teal-700 px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-teal-800"
            >
              View clinical notes
            </button>
          </div>
        ))}
      </div>

      <ClinicalNotesDrawer
        appointment={activeAppointment}
        onClose={() => setNotesId(null)}
      />
    </div>
  );
}
