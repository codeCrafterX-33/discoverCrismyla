"use client";

import Link from "next/link";
import { useCart } from "@crismyla/context/cart-context";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

export function Navbar() {
  const { count } = useCart();
  const searchParams = useSearchParams();
  const currentQuery = searchParams.get("q") || "";

  return (
    <nav className="fixed left-4 right-4 top-5 z-40 rounded-full border border-zinc-200 bg-white/80 px-4 py-2 backdrop-blur-md dark:border-zinc-800 dark:bg-black/60 md:left-6 md:right-6 md:px-6 md:py-1 lg:left-1/2 lg:w-[80%] lg:-translate-x-1/2 lg:right-auto xl:w-[80%]">
      <div className="mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center border-2 rounded-full">
          <Image
            src="/images/hero/Logo_crismyla.png"
            alt="Crismyla"
            width={120}
            height={50}
            className="h-8 w-auto object-contain md:h-10 lg:h-12"
            unoptimized
          />
        </Link>
        <div className="flex items-center gap-3 md:gap-4">
          {/* Search - submits to /collection with ?q=... */}
          <form
            action="/collection"
            method="get"
            className="hidden items-center gap-2 rounded-full border border-zinc-200 bg-white/80 px-3 py-1.5 text-sm backdrop-blur-md transition-colors hover:border-zinc-300 dark:border-zinc-700 dark:bg-black/60 lg:flex"
          >
            <svg
              className="h-4 w-4 text-zinc-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              name="q"
              defaultValue={currentQuery}
              placeholder="Search products..."
              aria-label="Search products"
              className="w-48 bg-transparent text-base outline-none placeholder:text-zinc-400 dark:placeholder:text-zinc-500"
            />
            <button type="submit" className="sr-only">
              Search
            </button>
          </form>
          <Link
            href="/collection"
            className="hidden rounded-full bg-red-600 px-4 py-1.5 text-sm font-medium text-white transition-all duration-300 hover:bg-red-700 hover:shadow-md lg:inline-flex"
          >
            Explore Our Collection
          </Link>
          <Link
            href="/cart"
            className="relative rounded-full border border-zinc-200 px-3 py-1 text-sm dark:border-zinc-700"
          >
            Cart
            {count > 0 && (
              <span className="absolute -right-2 -top-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-zinc-900 px-1 text-xs font-medium text-white dark:bg-zinc-50 dark:text-black">
                {count}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}
