import { NextResponse } from "next/server";
import {
  ADMIN_COOKIE,
  ADMIN_SESSION_MAX_AGE,
  expectedSessionToken,
  verifyPasscode,
} from "@/lib/adminAuth";

export const dynamic = "force-dynamic";

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

  const passcode = (body as { passcode?: unknown }).passcode;
  if (!verifyPasscode(passcode)) {
    return NextResponse.json({ error: "Incorrect passcode." }, { status: 401 });
  }

  const token = await expectedSessionToken();
  const response = NextResponse.json({ authenticated: true });
  response.cookies.set(ADMIN_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: ADMIN_SESSION_MAX_AGE,
  });
  return response;
}
