import { NextResponse } from "next/server";
import emailjs from "@emailjs/nodejs";

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidWhatsApp(whatsapp: string): boolean {
  // Allow numbers with optional +, spaces, dashes, and parentheses
  const cleaned = whatsapp.replace(/[\s\-()]/g, "");
  return /^\+?[1-9]\d{1,14}$/.test(cleaned) || /^[0-9]{10,15}$/.test(cleaned);
}

export async function POST(request: Request) {
  try {
    const { name, email, whatsapp } = await request.json();

    if (typeof name !== "string" || !name.trim()) {
      return NextResponse.json({ error: "Invalid name" }, { status: 400 });
    }

    if (typeof email !== "string" || !isValidEmail(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    if (typeof whatsapp !== "string" || !isValidWhatsApp(whatsapp)) {
      return NextResponse.json(
        { error: "Invalid WhatsApp number" },
        { status: 400 }
      );
    }

    // Support separate EmailJS account for customer info form
    // If separate account credentials are provided, use those; otherwise fall back to main account
    const privateKey =
      process.env.CUSTOMER_INFO_EMAILJS_PRIVATE_KEY ||
      process.env.EMAILJS_PRIVATE_KEY;
    const publicKey =
      process.env.CUSTOMER_INFO_EMAILJS_PUBLIC_KEY ||
      process.env.EMAILJS_PUBLIC_KEY;
    const serviceId =
      process.env.CUSTOMER_INFO_EMAILJS_SERVICE_ID ||
      process.env.EMAILJS_SERVICE_ID;
    const templateId =
      process.env.CUSTOMER_INFO_EMAILJS_TEMPLATE_ID ||
      process.env.EMAILJS_CUSTOMER_INFO_TEMPLATE_ID;
    const toEmail = process.env.CUSTOMER_INFO_TO_EMAIL;

    if (!privateKey || !publicKey || !serviceId || !templateId || !toEmail) {
      return NextResponse.json(
        {
          error:
            "EmailJS customer info is not configured. Please set CUSTOMER_INFO_EMAILJS_PRIVATE_KEY, CUSTOMER_INFO_EMAILJS_PUBLIC_KEY, CUSTOMER_INFO_EMAILJS_SERVICE_ID, CUSTOMER_INFO_EMAILJS_TEMPLATE_ID, and CUSTOMER_INFO_TO_EMAIL environment variables. Or use the main EmailJS credentials with CUSTOMER_INFO_EMAILJS_TEMPLATE_ID and CUSTOMER_INFO_TO_EMAIL.",
        },
        { status: 500 }
      );
    }

    // Get current time for the template
    const currentTime = new Date().toLocaleString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZoneName: "short",
    });

    // Format message with all customer information (clean format to avoid spam filters)
    const formattedMessage = `New Lead - Community Member Signup

Contact Information:
Name: ${name}
Email: ${email}
WhatsApp: ${whatsapp}

This customer has joined the Crismyla community to receive exclusive coupons, discounts, and product updates. Great opportunity for marketing campaigns and promotional offers.`;

    // Send customer information using dedicated template
    // Template variables: customer_name, name, time, message, reply_to, subject
    const templateParams = {
      customer_name: name,
      name: name,
      time: currentTime,
      message: formattedMessage,
      to_email: toEmail,
      reply_to: email, // Add reply-to so you can reply directly to customer
      customer_email: email, // Also send email separately for template flexibility
      customer_whatsapp: whatsapp, // Also send WhatsApp separately
      subject: `New Member: ${name} signed up for coupons & discounts`, // Marketing lead subject
    };

    console.log("📧 Sending customer info email:", {
      serviceId,
      templateId,
      toEmail,
      customerName: name,
      customerEmail: email,
      customerWhatsApp: whatsapp,
      templateParams: {
        customer_name: name,
        name: name,
        time: currentTime,
        message: formattedMessage.substring(0, 50) + "...",
        to_email: toEmail,
      },
    });

    const response = await emailjs.send(serviceId, templateId, templateParams, {
      publicKey,
      privateKey,
    });

    console.log("EmailJS response:", {
      status: response.status,
      text: response.text,
    });

    // Log success confirmation
    console.log(`✅ Email sent successfully to ${toEmail} via EmailJS`);

    if (response.status !== 200) {
      throw new Error(
        `EmailJS returned status ${response.status}: ${response.text}`
      );
    }

    return NextResponse.json({ ok: true, message: "Email sent successfully" });
  } catch (error: any) {
    console.error("Error sending customer info:", {
      message: error?.message,
      status: error?.status,
      text: error?.text,
      stack: error?.stack,
    });
    return NextResponse.json(
      {
        error: "Failed to send email",
        details: error?.message || "Unknown error",
      },
      { status: 500 }
    );
  }
}
