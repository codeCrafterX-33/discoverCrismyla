"use client";

import { useState, useTransition, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import { useCart } from "@crismyla/context/cart-context";
import { formatCurrency } from "@crismyla/lib/format";
import { PROVINCE_NAMES, type CanadianProvince } from "@crismyla/lib/tax";

export default function OrderPage() {
  const {
    items,
    subtotal,
    tax,
    gst,
    pst,
    qst,
    hst,
    shipping,
    total,
    province,
    setProvince,
    clearCart,
  } = useCart();
  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    province: "" as CanadianProvince | "",
  });

  const disabled = items.length === 0 || status === "submitting" || isPending;

  // Scroll to top when order is successfully submitted
  useEffect(() => {
    if (status === "success") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [status]);

  function onChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    const { name, value } = e.target;
    setForm((f) => {
      const updated = { ...f, [name]: value };
      // Update cart province when province changes
      if (name === "province" && value) {
        setProvince(value as CanadianProvince);
      }
      return updated;
    });
  }

  // Update cart province when form province changes
  useEffect(() => {
    if (form.province) {
      setProvince(form.province);
    }
  }, [form.province, setProvince]);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    startTransition(async () => {
      try {
        const response = await axios.post("/api/order", {
          customer: form,
          items,
          subtotal,
          tax,
          shipping,
          total,
        });
        // Only show success and clear cart if email was sent successfully
        if (response.status === 200 && response.data?.ok === true) {
          setStatus("success");
          clearCart();
        } else {
          setStatus("error");
        }
      } catch (error: any) {
        setStatus("error");
        // Log error for debugging
        if (error?.response?.data?.details) {
          console.error("Order submission error:", error.response.data.details);
        }
      }
    });
  }

  return (
    <div className="relative min-h-screen">
      {/* Background Image */}
      <div className="fixed inset-0 z-0">
        <Image
          src="/images/hero/complete-order.png"
          alt=""
          fill
          className="object-cover"
          priority
          unoptimized
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-6xl px-4 pt-24 pb-20 md:pt-28 lg:pt-32">
        <h1 className="mb-6 text-3xl font-semibold tracking-tight text-white">
          Complete your order
        </h1>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {status === "success" ? (
            <div className="md:col-span-2">
              <div className="rounded-xl border border-emerald-200/50 bg-white/90 p-8 backdrop-blur-sm dark:bg-zinc-900/90 md:p-12">
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
                    Order Submitted Successfully!
                  </h2>
                  <p className="mb-4 text-base text-zinc-600 dark:text-zinc-400">
                    Thank you for your order. We have received your order
                    details and will contact you shortly to complete the payment
                    process.
                  </p>
                  <p className="text-sm text-zinc-500 dark:text-zinc-500">
                    A confirmation email has been sent to{" "}
                    <span className="font-medium text-zinc-900 dark:text-zinc-100">
                      {form.email}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="md:col-span-2">
              <div className="space-y-4 rounded-xl border border-white/20 bg-white/90 p-6 backdrop-blur-sm dark:bg-zinc-900/90">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-1 block text-sm font-medium"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    placeholder="Your full name"
                    value={form.name}
                    onChange={onChange}
                    required
                    disabled={status === "submitting" || isPending}
                    className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-base disabled:cursor-not-allowed disabled:opacity-60 dark:border-zinc-700 dark:bg-zinc-900"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="mb-1 block text-sm font-medium"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={onChange}
                    required
                    disabled={status === "submitting" || isPending}
                    className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-base disabled:cursor-not-allowed disabled:opacity-60 dark:border-zinc-700 dark:bg-zinc-900"
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="mb-1 block text-sm font-medium"
                  >
                    Phone
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    placeholder="Optional"
                    value={form.phone}
                    onChange={onChange}
                    disabled={status === "submitting" || isPending}
                    className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-base disabled:cursor-not-allowed disabled:opacity-60 dark:border-zinc-700 dark:bg-zinc-900"
                  />
                </div>
                <div>
                  <label
                    htmlFor="address"
                    className="mb-1 block text-sm font-medium"
                  >
                    Address
                  </label>
                  <textarea
                    id="address"
                    name="address"
                    placeholder="Street, City"
                    value={form.address}
                    onChange={onChange}
                    rows={3}
                    disabled={status === "submitting" || isPending}
                    className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-base disabled:cursor-not-allowed disabled:opacity-60 dark:border-zinc-700 dark:bg-zinc-900"
                  />
                </div>
                <div>
                  <label
                    htmlFor="province"
                    className="mb-1 block text-sm font-medium"
                  >
                    Province / Territory <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="province"
                    name="province"
                    value={form.province}
                    onChange={onChange}
                    required
                    disabled={status === "submitting" || isPending}
                    className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-base disabled:cursor-not-allowed disabled:opacity-60 dark:border-zinc-700 dark:bg-zinc-900"
                  >
                    <option value="">Select Province/Territory</option>
                    {Object.entries(PROVINCE_NAMES).map(([code, name]) => (
                      <option key={code} value={code}>
                        {name}
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  type="submit"
                  disabled={disabled}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-zinc-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-zinc-50 dark:text-black dark:hover:bg-zinc-200"
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
                  {status === "submitting" || isPending
                    ? "Submitting…"
                    : "Submit order"}
                </button>
                {status === "error" && (
                  <p className="text-sm text-red-600 dark:text-red-400">
                    Something went wrong. Please try again.
                  </p>
                )}
              </div>
            </form>
          )}
          <aside className="rounded-xl border border-white/20 bg-white/90 p-5 backdrop-blur-sm dark:bg-zinc-900/90">
            <h2 className="mb-3 text-base font-semibold">Order summary</h2>
            <ul className="space-y-2 text-sm">
              {items.map((i) => (
                <li key={i.id} className="flex items-center justify-between">
                  <span>
                    {i.name} × {i.quantity}
                  </span>
                  <span>{formatCurrency(i.price * i.quantity)}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex items-center justify-between border-t border-zinc-200 pt-3 text-sm dark:border-zinc-800">
              <span>Subtotal</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
            {/* Tax breakdown */}
            {!province ? (
              <div className="mt-2 flex items-center justify-between text-sm">
                <span>Tax</span>
                <span>{formatCurrency(tax)}</span>
              </div>
            ) : (
              <>
                {hst !== null && (
                  <div className="mt-2 flex items-center justify-between text-sm">
                    <span>Tax (HST)</span>
                    <span>{formatCurrency(hst)}</span>
                  </div>
                )}
                {gst > 0 && (
                  <div className="mt-2 flex items-center justify-between text-sm">
                    <span>GST (5%)</span>
                    <span>{formatCurrency(gst)}</span>
                  </div>
                )}
                {pst !== null && pst > 0 && (
                  <div className="mt-2 flex items-center justify-between text-sm">
                    <span>
                      PST
                      {province === "BC"
                        ? " (7%)"
                        : province === "MB"
                        ? " (7%)"
                        : province === "SK"
                        ? " (6%)"
                        : ""}
                    </span>
                    <span>{formatCurrency(pst)}</span>
                  </div>
                )}
                {qst !== null && qst > 0 && (
                  <div className="mt-2 flex items-center justify-between text-sm">
                    <span>QST</span>
                    <span>{formatCurrency(qst)}</span>
                  </div>
                )}
              </>
            )}
            <div className="mt-2 flex items-center justify-between text-sm">
              <span>Shipping</span>
              <span>{formatCurrency(shipping)}</span>
            </div>
            <div className="mt-3 flex items-center justify-between border-t border-zinc-200 pt-3 text-base font-medium dark:border-zinc-800">
              <span>Total</span>
              <span>{formatCurrency(total)}</span>
            </div>
            <div className="mt-3 rounded-lg border border-blue-200 bg-blue-50/50 p-3 text-xs text-blue-800 dark:border-blue-800/50 dark:bg-blue-900/20 dark:text-blue-200">
              <div className="mb-2 flex items-center gap-1.5 font-medium">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>Payment Notice</span>
              </div>
              <p className="leading-relaxed">
                {province
                  ? "The total above includes applicable taxes based on your selected province and a flat $20 shipping fee."
                  : "Please select your province to see the correct tax calculation. The total includes a flat $20 shipping fee."}
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
