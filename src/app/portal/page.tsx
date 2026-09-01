import type { Metadata } from "next";
import BookingLookup from "@/components/BookingLookup";
import PrepGuide from "@/components/PrepGuide";
import TriageChat from "@/components/TriageChat";

export const metadata: Metadata = {
  title: "Patient Portal | Dr. Adelyn Pereira",
  description:
    "Look up your appointment status and ask pre-consultation questions before your physiotherapy visit with Dr. Adelyn Pereira.",
};

export default function PortalPage() {
  return (
    <main className="flex flex-1 flex-col bg-zinc-50 dark:bg-zinc-950">
      <div className="mx-auto w-full max-w-7xl px-6 py-12 lg:px-8 lg:py-16">
        <div className="max-w-2xl">
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
            Patient portal
          </h1>
          <p className="mt-3 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Check an appointment, review preparation guides, and ask the
            pre-consultation assistant anything before your visit.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="flex flex-col gap-8">
            <BookingLookup />
            <PrepGuide />
          </div>
          <TriageChat />
        </div>
      </div>
    </main>
  );
}
