import type { Metadata } from "next";
import { Suspense } from "react";
import BookingForm from "@/components/BookingForm";

export const metadata: Metadata = {
  title: "Book an Appointment | Dr. Adelyn Pereira",
  description:
    "Request an in-person or virtual physiotherapy consultation with Dr. Adelyn Pereira.",
};

function BookingFormFallback() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16">
      <div className="h-9 w-64 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
      <div className="mt-4 h-6 w-full max-w-lg animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
      <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-[minmax(0,1fr)_20rem] lg:grid-cols-[minmax(0,1fr)_24rem]">
        <div className="h-[36rem] animate-pulse rounded-2xl bg-zinc-100 dark:bg-zinc-900" />
        <div className="h-72 animate-pulse rounded-2xl bg-zinc-100 dark:bg-zinc-900" />
      </div>
    </div>
  );
}

export default function BookPage() {
  return (
    <main className="relative flex flex-1 flex-col overflow-hidden bg-zinc-50/60 dark:bg-zinc-950">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-teal-50/50 via-transparent to-transparent dark:from-teal-950/20" />
      <Suspense fallback={<BookingFormFallback />}>
        <BookingForm />
      </Suspense>
    </main>
  );
}
