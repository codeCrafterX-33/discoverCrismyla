import "dotenv/config";
import express from "express";
import cors from "cors";
import emailjs from "@emailjs/nodejs";

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Validation helpers
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidWhatsApp(whatsapp) {
  const cleaned = whatsapp.replace(/[\s\-()]/g, "");
  return /^\+?[1-9]\d{1,14}$/.test(cleaned) || /^[0-9]{10,15}$/.test(cleaned);
}

// Retry function with exponential backoff
async function retryWithBackoff(fn, maxRetries = 3, initialDelay = 1000) {
  let lastError;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;

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

// Newsletter endpoint
app.post("/api/newsletter", async (req, res) => {
  try {
    const { email } = req.body;

    if (typeof email !== "string" || !isValidEmail(email)) {
      return res.status(400).json({ error: "Invalid email" });
    }

    const privateKey = process.env.EMAILJS_PRIVATE_KEY;
    const serviceId = process.env.EMAILJS_SERVICE_ID;
    const templateId = process.env.EMAILJS_TEMPLATE_ID;
    const toEmail = process.env.NEWSLETTER_TO_EMAIL;
    const publicKey = process.env.EMAILJS_PUBLIC_KEY;

    if (!privateKey || !serviceId || !templateId || !toEmail || !publicKey) {
      return res.status(500).json({ error: "EmailJS is not configured" });
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
        publicKey,
        privateKey,
      }
    );

    return res.json({ ok: true });
  } catch (error) {
    console.error("Newsletter error:", error);
    return res.status(500).json({ error: "Unexpected error" });
  }
});

// Customer info endpoint
app.post("/api/customer-info", async (req, res) => {
  try {
    const { name, email, whatsapp } = req.body;

    if (typeof name !== "string" || !name.trim()) {
      return res.status(400).json({ error: "Invalid name" });
    }

    if (typeof email !== "string" || !isValidEmail(email)) {
      return res.status(400).json({ error: "Invalid email" });
    }

    if (typeof whatsapp !== "string" || !isValidWhatsApp(whatsapp)) {
      return res.status(400).json({ error: "Invalid WhatsApp number" });
    }

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
      return res.status(500).json({
        error:
          "EmailJS customer info is not configured. Please set CUSTOMER_INFO_EMAILJS_PRIVATE_KEY, CUSTOMER_INFO_EMAILJS_PUBLIC_KEY, CUSTOMER_INFO_EMAILJS_SERVICE_ID, CUSTOMER_INFO_EMAILJS_TEMPLATE_ID, and CUSTOMER_INFO_TO_EMAIL environment variables.",
      });
    }

    const currentTime = new Date().toLocaleString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZoneName: "short",
    });

    const formattedMessage = `New Lead - Community Member Signup

Contact Information:
Name: ${name}
Email: ${email}
WhatsApp: ${whatsapp}

This customer has joined the Crismyla community to receive exclusive coupons, discounts, and product updates. Great opportunity for marketing campaigns and promotional offers.`;

    const templateParams = {
      customer_name: name,
      name: name,
      time: currentTime,
      message: formattedMessage,
      to_email: toEmail,
      reply_to: email,
      customer_email: email,
      customer_whatsapp: whatsapp,
      subject: `New Member: ${name} signed up for coupons & discounts`,
    };

    console.log("📧 Sending customer info email:", {
      serviceId,
      templateId,
      toEmail,
      customerName: name,
      customerEmail: email,
      customerWhatsApp: whatsapp,
    });

    const response = await emailjs.send(serviceId, templateId, templateParams, {
      publicKey,
      privateKey,
    });

    console.log("EmailJS response:", {
      status: response.status,
      text: response.text,
    });

    if (response.status !== 200) {
      throw new Error(
        `EmailJS returned status ${response.status}: ${response.text}`
      );
    }

    return res.json({ ok: true, message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending customer info:", error);
    return res.status(500).json({
      error: "Failed to send email",
      details: error?.message || "Unknown error",
    });
  }
});

// Order endpoint
app.post("/api/order", async (req, res) => {
  try {
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
    } = req.body || {};

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

    const province = customer?.province || "";

    const privateKey = process.env.EMAILJS_PRIVATE_KEY;
    const serviceId = process.env.EMAILJS_SERVICE_ID;
    const templateId = process.env.EMAILJS_ORDER_TEMPLATE_ID;
    const toEmail = process.env.NEWSLETTER_TO_EMAIL;
    const publicKey = process.env.EMAILJS_PUBLIC_KEY;

    let emailSent = false;
    let emailError = null;

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
        const addressParts = [
          customer?.address,
          customer?.apartment,
          customer?.city,
          customer?.province,
          customer?.postalCode,
          customer?.country,
        ].filter(Boolean);
        const fullAddress = addressParts.join(", ");

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
            .map((i) => `${i.name} x ${i.quantity} = $${i.price * i.quantity}`)
            .join("\n"),
        };

        console.log("Sending email via EmailJS with params:", {
          serviceId,
          templateId,
          toEmail,
        });

        const response = await retryWithBackoff(
          async () => {
            return await emailjs.send(serviceId, templateId, templateParams, {
              publicKey,
              privateKey,
            });
          },
          3,
          1500
        );

        console.log("EmailJS email sent successfully:", response);
        emailSent = true;
      } catch (err) {
        console.error("EmailJS order email failed after retries:", {
          error: err?.message || err,
          status: err?.status,
          text: err?.text,
          code: err?.code,
        });

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

    if (!emailSent) {
      return res.status(500).json({
        ok: false,
        error: emailError?.message || "Failed to send order confirmation email",
        details: emailError?.message || emailError?.text || "Unknown error",
        retryable:
          emailError?.originalError?.message?.includes("ECONNRESET") ||
          emailError?.originalError?.message?.includes("socket disconnected") ||
          emailError?.originalError?.message?.includes("ETIMEDOUT"),
      });
    }

    return res.json({ ok: true });
  } catch (e) {
    console.error("Order error:", e);
    return res.status(500).json({ error: "Unexpected error" });
  }
});

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`🚀 Backend server running on port ${PORT}`);
});
