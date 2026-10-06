// Zoho SMTP transport, used only by server-side code (API routes) — never
// imported by client components, so these credentials never reach the browser.
// See .env.local for the ZOHO_SMTP_* variables this reads.
import nodemailer from "nodemailer";

let transporter: ReturnType<typeof nodemailer.createTransport> | null = null;

// Lazily builds (and caches) the transporter so a missing env var only
// throws when something actually tries to send mail, not at import time.
export function getMailTransporter() {
  if (transporter) return transporter;

  const host = process.env.ZOHO_SMTP_HOST ?? "smtp.zoho.com";
  const port = Number(process.env.ZOHO_SMTP_PORT ?? 465);
  const user = process.env.ZOHO_SMTP_USER;
  const pass = process.env.ZOHO_SMTP_PASSWORD;

  if (!user || !pass) {
    throw new Error(
      "ZOHO_SMTP_USER and ZOHO_SMTP_PASSWORD must be set in .env.local to send email."
    );
  }

  transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465, // true for port 465 (SSL), false for 587 (STARTTLS)
    auth: { user, pass },
  });

  return transporter;
}
