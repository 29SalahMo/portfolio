import { NextResponse } from "next/server";
import { Resend } from "resend";
import { profile } from "@/data/profile";

type ContactBody = {
  name?: string;
  email?: string;
  message?: string;
  website?: string;
};

const TO_EMAIL = process.env.CONTACT_TO_EMAIL ?? profile.contactEmail;

async function sendWithWeb3Forms(payload: {
  name: string;
  email: string;
  message: string;
}) {
  const accessKey = process.env.WEB3FORMS_ACCESS_KEY;
  if (!accessKey) return false;

  const res = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      access_key: accessKey,
      name: payload.name,
      email: payload.email,
      message: payload.message,
      subject: `Portfolio contact from ${payload.name}`,
      from_name: "Salahaldin Portfolio",
    }),
  });

  const data = (await res.json()) as { success?: boolean };
  return res.ok && data.success === true;
}

async function sendWithResend(payload: {
  name: string;
  email: string;
  message: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return false;

  const from =
    process.env.RESEND_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>";

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from,
    to: [TO_EMAIL],
    replyTo: payload.email,
    subject: `Portfolio contact from ${payload.name}`,
    text: [
      `Name: ${payload.name}`,
      `Email: ${payload.email}`,
      "",
      payload.message,
    ].join("\n"),
  });

  return !error;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactBody;

    if (body.website) {
      return NextResponse.json({ ok: true });
    }

    const name = body.name?.trim();
    const email = body.email?.trim();
    const message = body.message?.trim();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 },
      );
    }

    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailOk) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 },
      );
    }

    const payload = { name, email, message };

    let sent = false;
    if (process.env.RESEND_API_KEY) {
      sent = await sendWithResend(payload);
    }
    if (!sent && process.env.WEB3FORMS_ACCESS_KEY) {
      sent = await sendWithWeb3Forms(payload);
    }

    if (!sent) {
      return NextResponse.json(
        {
          error:
            "Email service is not configured. Use WhatsApp or email links below.",
        },
        { status: 503 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
