"use client";

import Link from "next/link";
import { useCart } from "@crismyla/context/cart-context";
import { formatCurrency } from "@crismyla/lib/format";

export default function CartPage() {
  const { items, subtotal, updateQuantity, removeItem, count } = useCart();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="mb-6 text-3xl font-semibold tracking-tight">Your cart</h1>
      {items.length === 0 ? (
        <div className="rounded-xl border border-dashed border-zinc-300 p-10 text-center text-zinc-600 dark:border-zinc-800 dark:text-zinc-400">
          Your cart is empty.{" "}
          <Link href="/" className="underline">
            Continue shopping
          </Link>
          .
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <ul className="md:col-span-2">
            {items.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between gap-4 border-b border-zinc-200 py-4 last:border-0 dark:border-zinc-800"
              >
                <div>
                  <div className="font-medium">{item.name}</div>
                  <div className="mt-1 text-sm text-zinc-500">
                    {formatCurrency(item.price)}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    min={1}
                    value={item.quantity}
                    onChange={(e) =>
                      updateQuantity(item.id, Number(e.target.value || 1))
                    }
                    className="w-16 rounded-md border border-zinc-300 bg-white px-2 py-1 text-sm dark:border-zinc-700 dark:bg-zinc-900"
                    aria-label={`Quantity for ${item.name}`}
                  />
                  <button
                    onClick={() => removeItem(item.id)}
                    className="rounded-md border border-zinc-300 px-3 py-1 text-sm hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <aside className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
            <div className="flex items-center justify-between text-sm">
              <span>Items</span>
              <span>{count}</span>
            </div>
            <div className="mt-3 flex items-center justify-between text-base font-medium">
              <span>Subtotal</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
            <Link
              href="/order"
              className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-zinc-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-zinc-800 dark:bg-zinc-50 dark:text-black dark:hover:bg-zinc-200"
            >
              Complete order
            </Link>
          </aside>
        </div>
      )}
    </div>
  );
}
