// Handles submissions from GetInTouchForm (the /request "Get in touch" page).
// Validates the payload, then sends it as an email through Zoho SMTP
// (see lib/mailer.ts) to CONTACT_FORM_RECIPIENT — the actual SMTP credentials
// stay server-side and never reach the browser.
import { NextResponse } from "next/server";
import { getMailTransporter } from "@/lib/mailer";

interface ContactPayload {
  name?: string;
  email?: string;
  phone?: string;
  companyName?: string;
  companyAddress?: string;
  city?: string;
  state?: string;
  message?: string;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Renders the submitted fields as an HTML table for the notification email,
// skipping any optional field the sender left blank.
function renderEmailBody(payload: ContactPayload): string {
  const rows: [string, string | undefined][] = [
    ["Name", payload.name],
    ["Email", payload.email],
    ["Phone", payload.phone],
    ["Company", payload.companyName],
    ["Company address", payload.companyAddress],
    ["City", payload.city],
    ["State", payload.state],
  ];

  const rowsHtml = rows
    .filter(([, value]) => value)
    .map(
      ([label, value]) =>
        `<tr><td style="padding:4px 12px 4px 0;color:#6b7280;white-space:nowrap;">${label}</td><td style="padding:4px 0;color:#0f172a;">${value}</td></tr>`
    )
    .join("");

  const messageHtml = payload.message
    ? `<p style="margin-top:16px;white-space:pre-wrap;color:#0f172a;">${payload.message}</p>`
    : "";

  return `<table style="font-family:sans-serif;font-size:14px;">${rowsHtml}</table>${messageHtml}`;
}

export async function POST(request: Request) {
  let payload: ContactPayload;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const name = payload.name?.trim();
  const email = payload.email?.trim();

  if (!name) {
    return NextResponse.json({ error: "Name is required." }, { status: 400 });
  }
  if (!email || !EMAIL_PATTERN.test(email)) {
    return NextResponse.json({ error: "A valid email address is required." }, { status: 400 });
  }

  const recipient = process.env.CONTACT_FORM_RECIPIENT;
  if (!recipient) {
    console.error("CONTACT_FORM_RECIPIENT is not set — cannot deliver contact form submissions.");
    return NextResponse.json(
      { error: "The contact form isn't configured yet. Please try again later." },
      { status: 500 }
    );
  }

  try {
    const transporter = getMailTransporter();
    await transporter.sendMail({
      from: process.env.ZOHO_SMTP_USER,
      to: recipient,
      replyTo: email,
      subject: `New contact form submission from ${name}`,
      html: renderEmailBody({ ...payload, name, email }),
    });
  } catch (error) {
    console.error("Failed to send contact form email:", error);
    return NextResponse.json(
      { error: "We couldn't send your message right now. Please try again shortly." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
