"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!passcode.trim()) {
      setError("Enter the admin passcode.");
      return;
    }

    setSubmitting(true);
    setError("");
    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passcode }),
      });
      if (response.ok) {
        router.replace("/admin");
        router.refresh();
        return;
      }
      const data = (await response.json()) as { error?: string };
      setError(data.error ?? "Could not sign in. Please try again.");
    } catch {
      setError("Could not reach the server. Check your connection.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="relative flex flex-1 flex-col items-center justify-center overflow-hidden bg-zinc-50/60 px-6 py-16 dark:bg-zinc-950">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-teal-50/60 via-transparent to-transparent dark:from-teal-950/20" />
      <div className="relative w-full max-w-sm rounded-2xl border border-zinc-200/80 bg-white/80 p-6 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] backdrop-blur-xl sm:p-8 dark:border-zinc-800/80 dark:bg-zinc-900/80">
        <p className="text-xs font-semibold uppercase tracking-wide text-teal-700 dark:text-teal-400">
          Staff access
        </p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          Admin sign in
        </h1>
        <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
          Enter the practice passcode to open the appointment dashboard.
        </p>

        <form onSubmit={handleSubmit} noValidate className="mt-6 flex flex-col gap-3">
          <label
            htmlFor="admin-passcode"
            className="text-sm font-medium text-zinc-900 dark:text-zinc-100"
          >
            Passcode
          </label>
          <input
            id="admin-passcode"
            type="password"
            autoComplete="current-password"
            autoFocus
            value={passcode}
            onChange={(event) => {
              setPasscode(event.target.value);
              if (error) setError("");
            }}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? "admin-passcode-error" : undefined}
            className={[
              "w-full rounded-lg border bg-white px-3 py-2.5 text-sm text-zinc-900 outline-none transition-colors focus:ring-2 focus:ring-teal-500/20 dark:bg-zinc-950 dark:text-zinc-100",
              error
                ? "border-red-500 focus:border-red-500 focus:ring-red-500/30"
                : "border-zinc-300 focus:border-teal-600 dark:border-zinc-700",
            ].join(" ")}
          />
          {error ? (
            <p
              id="admin-passcode-error"
              role="alert"
              className="text-sm text-red-600 dark:text-red-400"
            >
              {error}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={submitting}
            className="mt-1 inline-flex w-full items-center justify-center rounded-full bg-teal-700 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_4px_20px_-4px_rgba(13,148,136,0.4)] transition-all duration-150 hover:-translate-y-0.5 hover:bg-teal-800 hover:shadow-[0_12px_30px_-6px_rgba(13,148,136,0.5)] active:translate-y-0 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </main>
  );
}
