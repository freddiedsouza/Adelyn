"use client";

import { useState, type ReactNode } from "react";
import { usePathname, useSearchParams } from "next/navigation";

type ViewportPreset = "mobile" | "tablet" | "laptop" | "desktop";

const PRESETS: { id: ViewportPreset; label: string; width: number | null }[] = [
  { id: "mobile", label: "Mobile", width: 375 },
  { id: "tablet", label: "Tablet", width: 768 },
  { id: "laptop", label: "Laptop", width: 1024 },
  { id: "desktop", label: "Desktop", width: null },
];

/** Marks the request as the inner preview so the chrome is not rendered twice. */
const PREVIEW_FLAG = "__vp";

export default function DevViewportSwitcher({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [preset, setPreset] = useState<ViewportPreset>("desktop");

  // Rendered inside the preview iframe: show the real app with no switcher.
  if (searchParams.get(PREVIEW_FLAG) !== null) {
    return <>{children}</>;
  }

  const active =
    PRESETS.find((entry) => entry.id === preset) ?? PRESETS[PRESETS.length - 1];
  const framed = active.width !== null;

  const passthroughQuery = new URLSearchParams(searchParams.toString());
  passthroughQuery.set(PREVIEW_FLAG, "1");
  const previewSrc = `${pathname}?${passthroughQuery.toString()}`;

  return (
    <div className="flex h-dvh w-full flex-col bg-zinc-200 dark:bg-zinc-800">
      <div className="flex min-h-0 flex-1 justify-center overflow-hidden p-4 pb-24">
        <iframe
          key={previewSrc}
          src={previewSrc}
          title="Responsive preview"
          className={[
            "h-full w-full border-0 bg-[var(--background)] transition-[max-width] duration-300 ease-in-out",
            framed
              ? "rounded-xl shadow-2xl ring-1 ring-black/10 dark:ring-white/10"
              : "",
          ].join(" ")}
          style={{ maxWidth: active.width ? `${active.width}px` : "100%" }}
        />
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
    </div>
  );
}
