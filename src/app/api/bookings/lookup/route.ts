import { NextResponse } from "next/server";
import { getAppointmentByRef } from "@/lib/bookingStore";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const ref = new URL(request.url).searchParams.get("ref");

  if (!ref || !ref.trim()) {
    return NextResponse.json(
      { error: "Provide a booking reference as ?ref=AP-XXXX." },
      { status: 400 },
    );
  }

  const appointment = getAppointmentByRef(ref);
  if (!appointment) {
    return NextResponse.json(
      { error: "No appointment found for that reference." },
      { status: 404 },
    );
  }

  return NextResponse.json({ appointment });
}
