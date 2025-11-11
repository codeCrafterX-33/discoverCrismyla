"use client";

import React, { useState, useTransition } from "react";
import axios from "axios";
import { getApiUrl } from "@crismyla/lib/api-config";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState<string | undefined>(undefined);
  const [isPending, startTransition] = useTransition();

  function validateEmail(value: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validateEmail(email)) {
      setStatus("error");
      setMessage("Enter a valid email");
      return;
    }
    setStatus("submitting");
    setMessage(undefined);
    startTransition(async () => {
      try {
        await axios.post(getApiUrl("/api/newsletter"), { email });
        setEmail("");
        setStatus("success");
        setMessage("Thanks for subscribing!");
      } catch {
        setStatus("error");
        setMessage("Something went wrong");
      }
    });
  }

  return (
    <form onSubmit={onSubmit} className="w-full max-w-md">
      <div className="flex items-stretch overflow-hidden rounded-full border border-zinc-200 bg-white ring-1 ring-transparent transition focus-within:ring-zinc-400 dark:border-zinc-700 dark:bg-zinc-950 dark:focus-within:ring-zinc-600">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="w-full bg-transparent px-4 py-3 text-sm outline-none placeholder:text-zinc-400"
          aria-label="Email address"
          required
        />
        <button
          type="submit"
          disabled={status === "submitting" || isPending}
          className="shrink-0 rounded-l-none bg-zinc-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-zinc-50 dark:text-black dark:hover:bg-zinc-200 inline-flex items-center justify-center gap-2"
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
          {status === "submitting" || isPending ? "Subscribing…" : "Subscribe"}
        </button>
      </div>
      {message && (
        <p
          className={
            "mt-2 text-sm " +
            (status === "error"
              ? "text-red-600 dark:text-red-400"
              : "text-emerald-600 dark:text-emerald-400")
          }
          aria-live="polite"
        >
          {message}
        </p>
      )}
    </form>
  );
}
