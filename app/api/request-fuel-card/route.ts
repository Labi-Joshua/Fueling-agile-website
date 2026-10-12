// Handles submissions from RequestFuelCardModal (every "Request fuel cards"
// CTA site-wide). Validates the payload, then sends it — plus any attached
// vehicle sheet — as an email through Zoho SMTP (see lib/mailer.ts) to
// FUEL_CARD_REQUEST_RECIPIENT. Submitted as multipart/form-data rather than
// JSON so the optional file attaches in the same request.
import { NextResponse } from "next/server";
import { getMailTransporter } from "@/lib/mailer";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_ATTACHMENT_BYTES = 4 * 1024 * 1024;

// Renders the submitted fields as an HTML table for the notification email,
// skipping any field the sender left blank.
function renderEmailBody(fields: [string, string][]): string {
  const rowsHtml = fields
    .filter(([, value]) => value)
    .map(
      ([label, value]) =>
        `<tr><td style="padding:4px 12px 4px 0;color:#6b7280;white-space:nowrap;">${label}</td><td style="padding:4px 0;color:#0f172a;">${value}</td></tr>`
    )
    .join("");

  return `<table style="font-family:sans-serif;font-size:14px;">${rowsHtml}</table>`;
}

export async function POST(request: Request) {
  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const getField = (key: string) => formData.get(key)?.toString().trim() ?? "";

  const companyName = getField("companyName");
  const firstName = getField("firstName");
  const lastName = getField("lastName");
  const email = getField("email");
  const phone = getField("phone");
  const cardType = getField("cardType");
  const vehicleCount = getField("vehicleCount");
  const vehicleMake = getField("vehicleMake");
  const vehicleModel = getField("vehicleModel");
  const registrationNumber = getField("registrationNumber");

  if (!email || !EMAIL_PATTERN.test(email)) {
    return NextResponse.json({ error: "A valid email address is required." }, { status: 400 });
  }
  if (!phone) {
    return NextResponse.json({ error: "A phone number is required." }, { status: 400 });
  }
  if (!cardType) {
    return NextResponse.json({ error: "Please choose a fuel card type." }, { status: 400 });
  }
  if (!vehicleCount) {
    return NextResponse.json({ error: "Please enter the number of vehicles." }, { status: 400 });
  }

  const recipient = process.env.FUEL_CARD_REQUEST_RECIPIENT || process.env.CONTACT_FORM_RECIPIENT;
  if (!recipient) {
    console.error(
      "FUEL_CARD_REQUEST_RECIPIENT (or CONTACT_FORM_RECIPIENT) is not set — cannot deliver fuel card requests."
    );
    return NextResponse.json(
      { error: "This form isn't configured yet. Please try again later." },
      { status: 500 }
    );
  }

  const attachments: { filename: string; content: Buffer }[] = [];
  const sheetFile = formData.get("vehicleSheet");
  if (sheetFile instanceof File && sheetFile.size > 0) {
    if (sheetFile.size > MAX_ATTACHMENT_BYTES) {
      return NextResponse.json({ error: "The attached file is too large (4MB max)." }, { status: 400 });
    }
    attachments.push({
      filename: sheetFile.name,
      content: Buffer.from(await sheetFile.arrayBuffer()),
    });
  }

  try {
    const transporter = getMailTransporter();
    await transporter.sendMail({
      from: process.env.ZOHO_SMTP_USER,
      to: recipient,
      replyTo: email,
      subject: `New fuel card request from ${companyName || `${firstName} ${lastName}`.trim() || email}`,
      html: renderEmailBody([
        ["Company", companyName],
        ["Representative", `${firstName} ${lastName}`.trim()],
        ["Email", email],
        ["Phone", phone],
        ["Card type", cardType],
        ["Number of vehicles", vehicleCount],
        ["Vehicle make", vehicleMake],
        ["Vehicle model", vehicleModel],
        ["Registration number", registrationNumber],
      ]),
      attachments,
    });
  } catch (error) {
    console.error("Failed to send fuel card request email:", error);
    return NextResponse.json(
      { error: "We couldn't send your request right now. Please try again shortly." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
