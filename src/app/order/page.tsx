"use client";

import { useState, useTransition } from "react";
import axios from "axios";
import { useCart } from "@crismyla/context/cart-context";
import { formatCurrency } from "@crismyla/lib/format";

export default function OrderPage() {
  const { items, subtotal, clearCart } = useCart();
  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const disabled = items.length === 0 || status === "submitting" || isPending;

  function onChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    startTransition(async () => {
      try {
        await axios.post("/api/order", { customer: form, items, subtotal });
        setStatus("success");
        clearCart();
      } catch {
        setStatus("error");
      }
    });
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="mb-6 text-3xl font-semibold tracking-tight">
        Complete your order
      </h1>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        <form onSubmit={onSubmit} className="space-y-4 md:col-span-2">
          <div>
            <label htmlFor="name" className="mb-1 block text-sm font-medium">
              Name
            </label>
            <input
              id="name"
              name="name"
              placeholder="Your full name"
              value={form.name}
              onChange={onChange}
              required
              className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900"
            />
          </div>
          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium">
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
              className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900"
            />
          </div>
          <div>
            <label htmlFor="phone" className="mb-1 block text-sm font-medium">
              Phone
            </label>
            <input
              id="phone"
              name="phone"
              placeholder="Optional"
              value={form.phone}
              onChange={onChange}
              className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900"
            />
          </div>
          <div>
            <label htmlFor="address" className="mb-1 block text-sm font-medium">
              Address
            </label>
            <textarea
              id="address"
              name="address"
              placeholder="Street, City, Country"
              value={form.address}
              onChange={onChange}
              rows={3}
              className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900"
            />
          </div>
          <button
            type="submit"
            disabled={disabled}
            className="inline-flex items-center justify-center rounded-full bg-zinc-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-zinc-50 dark:text-black dark:hover:bg-zinc-200"
          >
            {status === "submitting" || isPending
              ? "Submitting…"
              : "Submit order"}
          </button>
          {status === "success" && (
            <p className="text-sm text-emerald-600 dark:text-emerald-400">
              Order submitted. We will contact you shortly.
            </p>
          )}
          {status === "error" && (
            <p className="text-sm text-red-600 dark:text-red-400">
              Something went wrong. Please try again.
            </p>
          )}
        </form>
        <aside className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
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
          <div className="mt-4 flex items-center justify-between border-t border-zinc-200 pt-3 text-base font-medium dark:border-zinc-800">
            <span>Total</span>
            <span>{formatCurrency(subtotal)}</span>
          </div>
        </aside>
      </div>
    </div>
  );
}
