import { NextResponse } from "next/server";
import emailjs from "@emailjs/nodejs";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      customer,
      items,
      subtotal,
      tax,
      gst,
      pst,
      qst,
      hst,
      shipping,
      total,
    } = body || {};

    // Log for development visibility
    console.log("Order received", {
      customer,
      items,
      subtotal,
      tax,
      gst,
      pst,
      qst,
      hst,
      shipping,
      total,
    });

    // Extract province from customer address or form data
    const province = customer?.province || "";

    const privateKey = process.env.EMAILJS_PRIVATE_KEY;
    const serviceId = process.env.EMAILJS_SERVICE_ID;
    const templateId = process.env.EMAILJS_ORDER_TEMPLATE_ID;
    const toEmail = process.env.NEWSLETTER_TO_EMAIL;
    const publicKey = process.env.EMAILJS_PUBLIC_KEY;

    let emailSent = false;
    let emailError: any = null;

    // Check if all required environment variables are set
    if (!privateKey || !serviceId || !templateId || !toEmail || !publicKey) {
      console.error("EmailJS configuration missing:", {
        hasPrivateKey: !!privateKey,
        hasServiceId: !!serviceId,
        hasTemplateId: !!templateId,
        hasToEmail: !!toEmail,
        hasPublicKey: !!publicKey,
      });
      emailError = "EmailJS configuration is incomplete";
    } else {
      try {
        const templateParams = {
          to_email: toEmail,
          customer_name: customer?.name || "",
          customer_email: customer?.email || "",
          customer_phone: customer?.phone || "",
          customer_address: customer?.address || "",
          order_subtotal: `$${String(subtotal ?? 0)}`,
          order_tax: `$${String(tax ?? 0)}`,
          order_shipping: `$${String(shipping ?? 0)}`,
          order_total: `$${String(total ?? subtotal ?? 0)}`,
          order_province: province || "Not specified",
          order_lines: (items || [])
            .map(
              (i: any) => `${i.name} x ${i.quantity} = $${i.price * i.quantity}`
            )
            .join("\n"),
        };

        console.log("Sending email via EmailJS with params:", {
          serviceId,
          templateId,
          toEmail,
          templateParams,
        });

        const response = await emailjs.send(
          serviceId,
          templateId,
          templateParams,
          {
            publicKey,
            privateKey,
          }
        );

        console.log("EmailJS email sent successfully:", response);
        emailSent = true;
      } catch (err: any) {
        console.error("EmailJS order email failed:", {
          error: err?.message || err,
          status: err?.status,
          text: err?.text,
          details: err,
        });
        emailError = err;
      }
    }

    // Return error if email failed
    if (!emailSent) {
      return NextResponse.json(
        {
          ok: false,
          error: "Failed to send order confirmation email",
          details: emailError?.message || emailError?.text || "Unknown error",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: "Unexpected error" }, { status: 500 });
  }
}
