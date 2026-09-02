/*
  Minimal transactional-email helper (Resend REST API, no SDK dependency).

  Configure with environment variables (set these in .env.local for local dev
  and in the hosting provider's dashboard for production):
    RESEND_API_KEY   – required for email to actually send
    CONTACT_TO       – recipient (default: freddiedsouza@gmail.com)
    CONTACT_FROM     – sender (default: Resend's shared onboarding address)

  Never throws — returns a small result object so callers can decide what to do.
*/

const CONTACT_TO = process.env.CONTACT_TO ?? "freddiedsouza@gmail.com";
const CONTACT_FROM =
  process.env.CONTACT_FROM ?? "Adelyn Physiotherapy <onboarding@resend.dev>";

export interface SendEmailInput {
  subject: string;
  text: string;
  /** Address to set as Reply-To (e.g. the enquirer's email). */
  replyTo?: string;
}

export interface SendEmailResult {
  ok: boolean;
  /** "unconfigured" when RESEND_API_KEY is not set. */
  reason?: "unconfigured" | "failed";
}

export async function sendEmail({
  subject,
  text,
  replyTo,
}: SendEmailInput): Promise<SendEmailResult> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return { ok: false, reason: "unconfigured" };
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: CONTACT_FROM,
        to: [CONTACT_TO],
        subject,
        text,
        ...(replyTo ? { reply_to: replyTo } : {}),
      }),
    });
    return response.ok ? { ok: true } : { ok: false, reason: "failed" };
  } catch {
    return { ok: false, reason: "failed" };
  }
}
