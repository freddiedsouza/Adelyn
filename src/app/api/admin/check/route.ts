import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ADMIN_COOKIE, isValidSessionToken } from "@/lib/adminAuth";

export const dynamic = "force-dynamic";

export async function GET() {
  const cookieStore = await cookies();
  const authenticated = await isValidSessionToken(
    cookieStore.get(ADMIN_COOKIE)?.value,
  );
  return NextResponse.json({ authenticated });
}
