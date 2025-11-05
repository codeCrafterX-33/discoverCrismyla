import { NextResponse } from "next/server";
import emailjs from "@emailjs/nodejs";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { customer, items, subtotal } = body || {};

    // Log for development visibility
    console.log("Order received", { customer, items, subtotal });

    const privateKey = process.env.EMAILJS_PRIVATE_KEY;
    const serviceId = process.env.EMAILJS_SERVICE_ID;
    const templateId = process.env.EMAILJS_ORDER_TEMPLATE_ID;
    const toEmail = process.env.NEWSLETTER_TO_EMAIL;

    if (privateKey && serviceId && templateId && toEmail) {
      try {
        await emailjs.send(
          serviceId,
          templateId,
          {
            to_email: toEmail,
            customer_name: customer?.name || "",
            customer_email: customer?.email || "",
            customer_phone: customer?.phone || "",
            customer_address: customer?.address || "",
            order_subtotal: String(subtotal ?? 0),
            order_lines: (items || [])
              .map(
                (i: any) =>
                  `${i.name} x ${i.quantity} = ${i.price * i.quantity}`
              )
              .join("\n"),
          },
          {
            publicKey: process.env.EMAILJS_PUBLIC_KEY,
            privateKey,
          }
        );
      } catch (err) {
        console.error("EmailJS order email failed");
      }
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: "Unexpected error" }, { status: 500 });
  }
}
