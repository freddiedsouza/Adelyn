"use client";

import { useState, type ReactNode } from "react";

type ViewportPreset = "mobile" | "tablet" | "laptop" | "desktop";

const PRESETS: { id: ViewportPreset; label: string; width: number | null }[] = [
  { id: "mobile", label: "Mobile", width: 375 },
  { id: "tablet", label: "Tablet", width: 768 },
  { id: "laptop", label: "Laptop", width: 1024 },
  { id: "desktop", label: "Desktop", width: null },
];

export default function DevViewportSwitcher({
  children,
}: {
  children: ReactNode;
}) {
  const [preset, setPreset] = useState<ViewportPreset>("desktop");

  // Compiled out of production bundles by the constant folding of NODE_ENV.
  if (process.env.NODE_ENV !== "development") {
    return <>{children}</>;
  }

  const active =
    PRESETS.find((entry) => entry.id === preset) ?? PRESETS[PRESETS.length - 1];
  const framed = active.width !== null;

  return (
    <>
      <div className="flex w-full justify-center bg-zinc-100 pb-24 dark:bg-zinc-800">
        <div
          className={[
            "min-h-screen w-full bg-[var(--background)] text-[var(--foreground)] transition-[width] duration-300 ease-in-out",
            framed
              ? "my-6 overflow-hidden rounded-xl shadow-2xl ring-1 ring-black/10 dark:ring-white/10"
              : "",
          ].join(" ")}
          style={{
            width: active.width ? `${active.width}px` : "100%",
            maxWidth: "100%",
          }}
        >
          {children}
        </div>
      </div>

      <div className="fixed bottom-4 left-1/2 z-[100] -translate-x-1/2">
        <div className="flex items-center gap-1 rounded-full border border-zinc-300 bg-white/95 p-1 shadow-lg backdrop-blur dark:border-zinc-700 dark:bg-zinc-900/95">
          <span className="px-2 text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
            Dev
          </span>
          {PRESETS.map((entry) => {
            const isActive = preset === entry.id;
            return (
              <button
                key={entry.id}
                type="button"
                onClick={() => setPreset(entry.id)}
                aria-pressed={isActive}
                className={[
                  "rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
                  isActive
                    ? "bg-teal-700 text-white"
                    : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800",
                ].join(" ")}
              >
                {entry.label}
                {entry.width ? (
                  <span className="ml-1 hidden text-[10px] opacity-70 sm:inline">
                    {entry.width}px
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}
