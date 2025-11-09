"use client";

import React, { useState, useTransition } from "react";
import axios from "axios";

export function CustomerInfoForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [submittedEmail, setSubmittedEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState<string | undefined>(undefined);
  const [isPending, startTransition] = useTransition();

  function validateEmail(value: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  function validateWhatsApp(value: string) {
    // Allow numbers with optional +, spaces, dashes, and parentheses
    const cleaned = value.replace(/[\s\-()]/g, "");
    return /^\+?[1-9]\d{1,14}$/.test(cleaned) || /^[0-9]{10,15}$/.test(cleaned);
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    
    if (!name.trim()) {
      setStatus("error");
      setMessage("Please enter your name");
      return;
    }
    
    if (!validateEmail(email)) {
      setStatus("error");
      setMessage("Please enter a valid email address");
      return;
    }
    
    if (!validateWhatsApp(whatsapp)) {
      setStatus("error");
      setMessage("Please enter a valid WhatsApp number");
      return;
    }
    
    setStatus("submitting");
    setMessage(undefined);
    startTransition(async () => {
      try {
        const response = await axios.post("/api/customer-info", { name, email, whatsapp });
        setSubmittedEmail(email);
        setName("");
        setEmail("");
        setWhatsapp("");
        setStatus("success");
      } catch (error: any) {
        setStatus("error");
        const errorMessage = error?.response?.data?.error || error?.response?.data?.details || "Something went wrong. Please try again.";
        setMessage(errorMessage);
        console.error("Form submission error:", error?.response?.data || error);
      }
    });
  }

  return (
    <div className="w-full max-w-2xl">
      {status === "success" ? (
        <div className="rounded-xl border border-emerald-200/50 bg-white p-8 shadow-sm dark:border-emerald-800/50 dark:bg-zinc-900 md:p-12">
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30">
              <svg
                className="h-8 w-8 text-emerald-600 dark:text-emerald-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="mb-2 text-2xl font-semibold text-emerald-600 dark:text-emerald-400">
              Welcome to the Crismyla Community!
            </h2>
            <p className="mb-4 text-base text-zinc-600 dark:text-zinc-400">
              Thank you for joining! You're now part of our exclusive community and will receive special offers, discounts, and early access to our latest beauty collections.
            </p>
            <p className="text-sm text-zinc-500 dark:text-zinc-500">
              A confirmation email with exclusive coupons has been sent to{" "}
              <span className="font-medium text-zinc-900 dark:text-zinc-100">
                {submittedEmail}
              </span>
            </p>
            <p className="mt-2 text-xs text-zinc-400 dark:text-zinc-500">
              Check your inbox (and spam folder) for your welcome email with special discounts and beauty tips.
            </p>
          </div>
        </div>
      ) : (
        <>
          <div className="mb-6 rounded-lg border border-[#4A322A]/20 bg-gradient-to-r from-[#4A322A]/5 to-[#7A5844]/5 p-4 text-center dark:border-[#7A5844]/30 dark:from-[#4A322A]/10 dark:to-[#7A5844]/10">
            <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
              🎁 Exclusive Offer: Get instant access to coupons and special discounts!
            </p>
            <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
              Limited time offer for new members
            </p>
          </div>
          <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-zinc-900 dark:text-zinc-50 mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your full name"
            className="w-full rounded-sm border border-zinc-200 bg-white px-4 py-3 text-sm outline-none placeholder:text-zinc-400 transition focus:border-zinc-400 focus:ring-2 focus:ring-zinc-400/20 dark:border-zinc-700 dark:bg-zinc-950 dark:placeholder:text-zinc-500 dark:focus:border-zinc-600"
            aria-label="Full name"
            required
            disabled={status === "submitting" || isPending}
          />
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-zinc-900 dark:text-zinc-50 mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="w-full rounded-sm border border-zinc-200 bg-white px-4 py-3 text-sm outline-none placeholder:text-zinc-400 transition focus:border-zinc-400 focus:ring-2 focus:ring-zinc-400/20 dark:border-zinc-700 dark:bg-zinc-950 dark:placeholder:text-zinc-500 dark:focus:border-zinc-600"
            aria-label="Email address"
            required
            disabled={status === "submitting" || isPending}
          />
        </div>
        
        <div>
          <label htmlFor="whatsapp" className="block text-sm font-medium text-zinc-900 dark:text-zinc-50 mb-2">
            WhatsApp Number
          </label>
          <input
            type="tel"
            id="whatsapp"
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
            placeholder="+1234567890 or 1234567890"
            className="w-full rounded-sm border border-zinc-200 bg-white px-4 py-3 text-sm outline-none placeholder:text-zinc-400 transition focus:border-zinc-400 focus:ring-2 focus:ring-zinc-400/20 dark:border-zinc-700 dark:bg-zinc-950 dark:placeholder:text-zinc-500 dark:focus:border-zinc-600"
            aria-label="WhatsApp number"
            required
            disabled={status === "submitting" || isPending}
          />
        </div>
        
        <button
          type="submit"
          disabled={status === "submitting" || isPending}
          className="w-full rounded-sm bg-[#4A322A] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#5a3f35] disabled:cursor-not-allowed disabled:opacity-60 dark:bg-[#7A5844] dark:hover:bg-[#8a6a54] inline-flex items-center justify-center gap-2"
        >
          {(status === "submitting" || isPending) && (
            <svg
              className="h-4 w-4 animate-spin"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          )}
          {status === "submitting" || isPending ? "Joining…" : "Join Now"}
        </button>
        {status === "error" && message && (
          <div className="rounded-lg border border-red-200 bg-red-50/50 p-3 text-sm text-red-600 dark:border-red-800/50 dark:bg-red-900/20 dark:text-red-400">
            <p className="font-medium">Error submitting form</p>
            <p className="mt-1">{message}</p>
          </div>
        )}
      </form>
        </>
      )}
    </div>
  );
}

