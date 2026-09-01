"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogoutButton() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function handleLogout() {
    setBusy(true);
    try {
      await fetch("/api/admin/logout", { method: "POST" });
    } catch {
      // ignore — clear-cookie best effort
    }
    router.replace("/admin/login");
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={busy}
      className="inline-flex shrink-0 items-center justify-center rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:border-teal-600 hover:text-teal-700 disabled:cursor-not-allowed disabled:opacity-60 dark:border-zinc-700 dark:text-zinc-200"
    >
      {busy ? "Logging out…" : "Log out"}
    </button>
  );
}
