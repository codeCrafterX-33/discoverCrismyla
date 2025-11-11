"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function OrderSuccessPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to order page after a short delay
    const timer = setTimeout(() => {
      router.push("/order");
    }, 2000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-white dark:bg-zinc-950">
      <div className="mx-auto max-w-md px-4 text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30 mx-auto">
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
        <h1 className="mb-2 text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
          Order Submitted Successfully!
        </h1>
        <p className="mb-6 text-zinc-600 dark:text-zinc-400">
          Redirecting to order page...
        </p>
        <Link
          href="/order"
          className="text-sm text-[#4A322A] hover:underline dark:text-[#7A5844]"
        >
          Go to order page
        </Link>
      </div>
    </div>
  );
}
