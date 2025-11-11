import { NextResponse } from "next/server";
import emailjs from "@emailjs/nodejs";

// Retry function with exponential backoff
async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  initialDelay: number = 1000
): Promise<T> {
  let lastError: any;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error: any) {
      lastError = error;

      // Check if error is retryable (network errors, timeouts, etc.)
      const isRetryable =
        error?.message?.includes("ECONNRESET") ||
        error?.message?.includes("socket disconnected") ||
        error?.message?.includes("ETIMEDOUT") ||
        error?.message?.includes("ENOTFOUND") ||
        error?.code === "ECONNRESET" ||
        error?.code === "ETIMEDOUT";

      if (!isRetryable || attempt === maxRetries - 1) {
        throw error;
      }

      // Exponential backoff: wait longer between each retry
      const delay = initialDelay * Math.pow(2, attempt);
      console.log(
        `EmailJS attempt ${attempt + 1} failed, retrying in ${delay}ms...`,
        error?.message
      );
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  throw lastError;
}

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
        // Build full address string
        const addressParts = [
          customer?.address,
          customer?.apartment,
          customer?.city,
          customer?.province,
          customer?.postalCode,
          customer?.country,
        ].filter(Boolean);
        const fullAddress = addressParts.join(", ");

        // Build customer name
        const customerName = [customer?.firstName, customer?.lastName]
          .filter(Boolean)
          .join(" ");

        const templateParams = {
          to_email: toEmail,
          customer_name: customerName || customer?.name || "",
          customer_first_name: customer?.firstName || "",
          customer_last_name: customer?.lastName || "",
          customer_email: customer?.email || "",
          customer_phone: customer?.phone || "",
          customer_address: customer?.address || "",
          customer_apartment: customer?.apartment || "",
          customer_city: customer?.city || "",
          customer_province: province || customer?.province || "Not specified",
          customer_postal_code: customer?.postalCode || "",
          customer_country: customer?.country || "Canada",
          customer_full_address: fullAddress || customer?.address || "",
          order_subtotal: `$${String(subtotal ?? 0)}`,
          order_tax: `$${String(tax ?? 0)}`,
          order_shipping: `$${String(shipping ?? 0)}`,
          order_total: `$${String(total ?? subtotal ?? 0)}`,
          order_province: province || customer?.province || "Not specified",
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

        // Retry email sending with exponential backoff
        const response = await retryWithBackoff(
          async () => {
            return await emailjs.send(serviceId, templateId, templateParams, {
              publicKey,
              privateKey,
            });
          },
          3, // max 3 retries
          1500 // initial delay 1.5 seconds
        );

        console.log("EmailJS email sent successfully:", response);
        emailSent = true;
      } catch (err: any) {
        console.error("EmailJS order email failed after retries:", {
          error: err?.message || err,
          status: err?.status,
          text: err?.text,
          code: err?.code,
          details: err,
        });

        // Provide user-friendly error messages
        let errorMessage = "Failed to send order confirmation email";
        if (
          err?.message?.includes("ECONNRESET") ||
          err?.message?.includes("socket disconnected")
        ) {
          errorMessage =
            "Network connection error. Please check your internet connection and try again.";
        } else if (err?.message?.includes("ETIMEDOUT")) {
          errorMessage = "Request timed out. Please try again.";
        } else if (err?.message) {
          errorMessage = err.message;
        } else if (err?.text) {
          errorMessage = err.text;
        }

        emailError = {
          message: errorMessage,
          originalError: err,
        };
      }
    }

    // Return error if email failed
    if (!emailSent) {
      return NextResponse.json(
        {
          ok: false,
          error:
            emailError?.message || "Failed to send order confirmation email",
          details: emailError?.message || emailError?.text || "Unknown error",
          retryable:
            emailError?.originalError?.message?.includes("ECONNRESET") ||
            emailError?.originalError?.message?.includes(
              "socket disconnected"
            ) ||
            emailError?.originalError?.message?.includes("ETIMEDOUT"),
        },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: "Unexpected error" }, { status: 500 });
  }
}
