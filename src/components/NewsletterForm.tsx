"use client";

import React, { useState, useTransition } from "react";
import axios from "axios";

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
        await axios.post("/api/newsletter", { email });
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
          className="shrink-0 rounded-l-none bg-zinc-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-zinc-50 dark:text-black dark:hover:bg-zinc-200"
        >
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
