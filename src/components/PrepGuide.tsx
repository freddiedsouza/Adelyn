"use client";

import { useState } from "react";

interface GuideItem {
  id: string;
  title: string;
  points: string[];
}

const guideItems: GuideItem[] = [
  {
    id: "clinic-location",
    title: "Finding the clinic & arrival instructions",
    points: [
      "The clinic is on the ground floor with step-free access and on-site parking.",
      "Report to reception 10 minutes before your slot to complete check-in.",
      "Bring a photo ID, your booking reference, and any referral letter or insurance details.",
      "Wear loose clothing you can move in; changing space is available if needed.",
    ],
  },
  {
    id: "telehealth-prep",
    title: "Preparing for a telehealth session",
    points: [
      "Use the secure video link emailed to you; join 5 minutes early to test audio and video.",
      "Pick a quiet, well-lit room with enough floor space to stand and move.",
      "Have a sturdy chair, a resistance band or towel, and water within reach.",
      "Keep any recent scan reports open or nearby in case Dr. Adelyn asks about them.",
    ],
  },
  {
    id: "cancellation-policy",
    title: "Cancellation & rescheduling policy",
    points: [
      "Reschedule or cancel free of charge up to 24 hours before your appointment.",
      "Changes within 24 hours may incur a fee of up to 50% of the session rate.",
      "Missed appointments without notice are charged in full.",
      "To make a change, reply to your confirmation email quoting your AP- reference.",
    ],
  },
];

export default function PrepGuide() {
  const [openIds, setOpenIds] = useState<string[]>([guideItems[0].id]);

  function toggle(id: string) {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((value) => value !== id) : [...prev, id],
    );
  }

  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-5 sm:p-6 dark:border-zinc-800 dark:bg-zinc-900">
      <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
        Resources & prep guide
      </h2>
      <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
        Everything you need to get ready for your consultation.
      </p>

      <div className="mt-4 flex flex-col gap-3">
        {guideItems.map((item) => {
          const isOpen = openIds.includes(item.id);
          return (
            <div
              key={item.id}
              className="overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800"
            >
              <h3>
                <button
                  type="button"
                  onClick={() => toggle(item.id)}
                  aria-expanded={isOpen}
                  aria-controls={`panel-${item.id}`}
                  className="flex w-full items-center justify-between gap-3 bg-zinc-50 px-4 py-3 text-left text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-100 dark:bg-zinc-950 dark:text-zinc-100 dark:hover:bg-zinc-800"
                >
                  <span>{item.title}</span>
                  <svg
                    className={`h-4 w-4 shrink-0 text-zinc-500 transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m19.5 8.25-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </button>
              </h3>
              {isOpen ? (
                <div
                  id={`panel-${item.id}`}
                  className="border-t border-zinc-200 px-4 py-3 dark:border-zinc-800"
                >
                  <ul className="flex flex-col gap-2">
                    {item.points.map((point) => (
                      <li
                        key={point}
                        className="flex gap-2 text-sm text-zinc-600 dark:text-zinc-300"
                      >
                        <svg
                          className="mt-1 h-3.5 w-3.5 shrink-0 text-teal-600 dark:text-teal-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m4.5 12.75 6 6 9-13.5"
                          />
                        </svg>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </section>
  );
}
