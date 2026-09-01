"use client";

import { useState } from "react";

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export default function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openIds, setOpenIds] = useState<string[]>(
    items.length > 0 ? [items[0].id] : [],
  );

  function toggle(id: string) {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((value) => value !== id) : [...prev, id],
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {items.map((item) => {
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
                aria-controls={`faq-panel-${item.id}`}
                className="flex w-full items-center justify-between gap-3 bg-white px-4 py-3.5 text-left text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-50 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800"
              >
                <span>{item.question}</span>
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
                id={`faq-panel-${item.id}`}
                className="border-t border-zinc-200 bg-white px-4 py-3.5 text-sm leading-6 text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300"
              >
                {item.answer}
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
