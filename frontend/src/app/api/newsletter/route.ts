import { NextResponse } from "next/server";
import emailjs from "@emailjs/nodejs";

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (typeof email !== "string" || !isValidEmail(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const privateKey = process.env.EMAILJS_PRIVATE_KEY;
    const serviceId = process.env.EMAILJS_SERVICE_ID;
    const templateId = process.env.EMAILJS_TEMPLATE_ID;
    const toEmail = process.env.NEWSLETTER_TO_EMAIL;

    if (!privateKey || !serviceId || !templateId || !toEmail) {
      return NextResponse.json(
        { error: "EmailJS is not configured" },
        { status: 500 }
      );
    }

    await emailjs.send(
      serviceId,
      templateId,
      {
        to_email: toEmail,
        subscriber_email: email,
        subject: "New newsletter subscriber",
      },
      {
        publicKey: process.env.EMAILJS_PUBLIC_KEY,
        privateKey,
      }
    );

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: "Unexpected error" }, { status: 500 });
  }
}
