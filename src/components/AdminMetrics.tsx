interface AdminMetricsProps {
  total: number;
  today: number;
  pending: number;
  inPerson: number;
  virtual: number;
}

function MetricCard({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
      <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
        {label}
      </p>
      <p className="mt-2 text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
        {value}
      </p>
      {hint ? (
        <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">{hint}</p>
      ) : null}
    </div>
  );
}

export default function AdminMetrics({
  total,
  today,
  pending,
  inPerson,
  virtual,
}: AdminMetricsProps) {
  const modeTotal = inPerson + virtual;
  const inPersonPct = modeTotal === 0 ? 0 : Math.round((inPerson / modeTotal) * 100);

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      <MetricCard label="Total bookings" value={String(total)} />
      <MetricCard label="Today's appointments" value={String(today)} />
      <MetricCard
        label="Pending reviews"
        value={String(pending)}
        hint="Confirmed or rescheduled, today or earlier"
      />
      <div className="col-span-2 rounded-xl border border-zinc-200 bg-white p-4 lg:col-span-1 dark:border-zinc-800 dark:bg-zinc-900">
        <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          In-clinic vs virtual
        </p>
        <p className="mt-2 text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
          {inPerson} <span className="text-zinc-400">/</span> {virtual}
        </p>
        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
          <div
            className="h-full rounded-full bg-teal-600"
            style={{ width: `${inPersonPct}%` }}
          />
        </div>
      </div>
    </div>
  );
}
