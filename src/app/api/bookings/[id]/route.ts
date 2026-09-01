import { NextResponse } from "next/server";
import {
  BookingValidationError,
  updateAppointmentStatus,
} from "@/lib/bookingStore";
import type { AppointmentStatus } from "@/types/appointment";

export const dynamic = "force-dynamic";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Request body must be valid JSON." },
      { status: 400 },
    );
  }

  const status = (body as { status?: string }).status;
  if (typeof status !== "string") {
    return NextResponse.json(
      { error: "A 'status' field is required." },
      { status: 400 },
    );
  }

  try {
    const appointment = updateAppointmentStatus(id, status as AppointmentStatus);
    if (!appointment) {
      return NextResponse.json(
        { error: "No appointment found for that reference." },
        { status: 404 },
      );
    }
    return NextResponse.json({ appointment });
  } catch (error) {
    if (error instanceof BookingValidationError) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json(
      { error: "Could not update the appointment." },
      { status: 500 },
    );
  }
}
