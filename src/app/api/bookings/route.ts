import { NextResponse } from "next/server";
import {
  BookingValidationError,
  createAppointment,
  getAllAppointments,
  type BookingInput,
} from "@/lib/bookingStore";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({ appointments: getAllAppointments() });
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Request body must be valid JSON." },
      { status: 400 },
    );
  }

  try {
    const appointment = createAppointment(body as BookingInput);
    return NextResponse.json({ appointment }, { status: 201 });
  } catch (error) {
    if (error instanceof BookingValidationError) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json(
      { error: "Could not create the appointment." },
      { status: 500 },
    );
  }
}
