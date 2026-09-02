import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/notify";

export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

  const {
    name = "",
    phone = "",
    email = "",
    subject = "",
    message = "",
  } = (body ?? {}) as Record<string, string>;

  const digits = String(phone).replace(/\D/g, "");
  if (
    !String(name).trim() ||
    !String(subject).trim() ||
    !String(message).trim() ||
    digits.length < 8 ||
    digits.length > 15 ||
    !EMAIL_RE.test(String(email).trim())
  ) {
    return NextResponse.json(
      { error: "Please complete every field with valid details." },
      { status: 400 },
    );
  }

  const result = await sendEmail({
    subject: `Website enquiry: ${String(subject).trim()}`,
    replyTo: String(email).trim(),
    text: [
      `Name:    ${String(name).trim()}`,
      `Phone:   ${String(phone).trim()}`,
      `Email:   ${String(email).trim()}`,
      `Subject: ${String(subject).trim()}`,
      "",
      String(message).trim(),
    ].join("\n"),
  });

  if (result.ok) {
    return NextResponse.json({ ok: true });
  }

  if (result.reason === "unconfigured") {
    return NextResponse.json(
      {
        error:
          "The message service is not set up yet. Please call or email the clinic directly for now.",
      },
      { status: 503 },
    );
  }

  return NextResponse.json(
    { error: "Could not send your message. Please try again shortly." },
    { status: 502 },
  );
}
