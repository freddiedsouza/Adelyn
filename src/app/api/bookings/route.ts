import { NextResponse } from "next/server";
import {
  BookingValidationError,
  createAppointment,
  getAllAppointments,
  type BookingInput,
} from "@/lib/bookingStore";
import { sendEmail } from "@/lib/notify";

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

    // Stop-gap notification until bookings are stored in a database.
    await sendEmail({
      subject: `New booking ${appointment.id} — ${appointment.patientName}`,
      replyTo: appointment.email,
      text: [
        `Reference:  ${appointment.id}`,
        `Patient:    ${appointment.patientName}`,
        `Phone:      ${appointment.phone}`,
        `Email:      ${appointment.email}`,
        `Service:    ${appointment.serviceTitle}`,
        `Date:       ${appointment.date}`,
        `Time:       ${appointment.time}`,
        `Mode:       ${appointment.mode}`,
        "",
        `Chief complaint: ${appointment.chiefComplaint}`,
        `Medical history: ${appointment.medicalHistory || "None provided"}`,
      ].join("\n"),
    });

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
