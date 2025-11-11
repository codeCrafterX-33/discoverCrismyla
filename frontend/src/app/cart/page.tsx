"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCart } from "@crismyla/context/cart-context";
import { formatCurrency } from "@crismyla/lib/format";
import { products } from "@crismyla/data/products";

export default function CartPage() {
  const router = useRouter();
  const [isNavigating, setIsNavigating] = useState(false);
  const [removingItemId, setRemovingItemId] = useState<string | null>(null);
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
    updateQuantity,
    removeItem,
    count,
    normalizeQuantities,
  } = useCart();

  // Helper function to get product image URL
  const getProductImageUrl = (itemId: string) => {
    const product = products.find((p) => p.id === itemId);
    if (product?.url && product.url !== "#" && product.url.startsWith("/")) {
      return product.url;
    }
    return null;
  };

  const handleCompleteOrder = () => {
    setIsNavigating(true);
    // Normalize any zero quantities to 1 before navigating
    normalizeQuantities();
    router.push("/order");
  };

  return (
    <>
      <div className="relative min-h-screen">
        {/* Background Image */}
        <div className="fixed inset-0 z-0">
          <Image
            src="/images/hero/cart-background.jpg"
            alt="Cart background"
            fill
            className="object-cover"
            priority
            unoptimized
          />
          <div className="absolute inset-0 bg-black/40 dark:bg-black/60" />
        </div>

        {/* Content */}
        <div className="relative z-10 mx-auto max-w-6xl px-4 pt-24 pb-20 md:pt-28 lg:pt-32">
          <h1 className="mb-6 text-3xl font-semibold tracking-tight text-white">
            Your cart
          </h1>
          {items.length === 0 ? (
            <div className="rounded-xl border border-dashed border-white/30 bg-white/10 backdrop-blur-sm p-10 text-center text-white">
              Your cart is empty.{" "}
              <Link href="/" className="underline hover:text-white/80">
                Continue shopping
              </Link>
              .
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <ul className="md:col-span-2 space-y-4">
                {items.map((item) => (
                  <li
                    key={item.id}
                    className="flex flex-col gap-4 rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm p-4 sm:flex-row sm:items-center"
                  >
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                      {/* Product Image */}
                      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg">
                        {item.imageUrl || getProductImageUrl(item.id) ? (
                          <Image
                            src={
                              item.imageUrl || getProductImageUrl(item.id) || ""
                            }
                            alt={item.name}
                            fill
                            className="object-cover"
                            sizes="80px"
                            unoptimized
                          />
                        ) : (
                          <div className="h-full w-full bg-gradient-to-br from-zinc-300 to-zinc-400 dark:from-zinc-700 dark:to-zinc-800" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-white break-words">
                          {item.name}
                        </div>
                        <div className="mt-1 text-sm text-white/80">
                          {formatCurrency(item.price)}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 sm:shrink-0">
                      <div className="flex items-center rounded-md border border-white/30 bg-white/10 backdrop-blur-sm">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.id,
                              Math.max(0, item.quantity - 1)
                            )
                          }
                          className="px-2 py-1 text-white transition-colors hover:bg-white/20"
                          aria-label={`Decrease quantity for ${item.name}`}
                        >
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
                              d="M20 12H4"
                            />
                          </svg>
                        </button>
                        <input
                          type="number"
                          min={0}
                          value={item.quantity}
                          onChange={(e) => {
                            const value =
                              e.target.value === ""
                                ? 0
                                : Number(e.target.value);
                            updateQuantity(item.id, Math.max(0, value));
                          }}
                          className="w-12 border-0 bg-transparent px-1 py-1 text-center text-base text-white outline-none focus:bg-white/10 lg:w-16 lg:px-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                          aria-label={`Quantity for ${item.name}`}
                        />
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="px-2 py-1 text-white transition-colors hover:bg-white/20"
                          aria-label={`Increase quantity for ${item.name}`}
                        >
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
                              d="M12 4v16m8-8H4"
                            />
                          </svg>
                        </button>
                      </div>
                      <button
                        onClick={() => {
                          setRemovingItemId(item.id);
                          removeItem(item.id);
                          // Reset after a brief delay for visual feedback
                          setTimeout(() => setRemovingItemId(null), 300);
                        }}
                        disabled={removingItemId === item.id}
                        className="inline-flex items-center gap-1.5 rounded-md border border-red-500/50 bg-red-500/20 px-3 py-1 text-sm text-red-100 backdrop-blur-sm transition-colors hover:bg-red-500/30 hover:border-red-500/70 disabled:cursor-not-allowed disabled:opacity-70"
                      >
                        {removingItemId === item.id && (
                          <svg
                            className="h-3.5 w-3.5 animate-spin"
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
                        Remove
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
              <aside className="rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm p-5">
                <div className="flex items-center justify-between text-sm text-white">
                  <span>Items</span>
                  <span>{count}</span>
                </div>
                <div className="mt-3 flex items-center justify-between text-sm text-white">
                  <span>Subtotal</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>
                {/* Tax breakdown */}
                {!province ? (
                  <>
                    <div className="mt-2 flex items-center justify-between text-sm text-white">
                      <span>Tax (estimated)</span>
                      <span>{formatCurrency(tax)}</span>
                    </div>
                    <p className="mt-2 text-xs text-white/70">
                      Select province on checkout for accurate tax
                    </p>
                  </>
                ) : (
                  <>
                    {hst !== null && (
                      <div className="mt-2 flex items-center justify-between text-sm text-white">
                        <span>Tax (HST)</span>
                        <span>{formatCurrency(hst)}</span>
                      </div>
                    )}
                    {gst > 0 && (
                      <div className="mt-2 flex items-center justify-between text-sm text-white">
                        <span>GST (5%)</span>
                        <span>{formatCurrency(gst)}</span>
                      </div>
                    )}
                    {pst !== null && pst > 0 && (
                      <div className="mt-2 flex items-center justify-between text-sm text-white">
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
                      <div className="mt-2 flex items-center justify-between text-sm text-white">
                        <span>QST</span>
                        <span>{formatCurrency(qst)}</span>
                      </div>
                    )}
                  </>
                )}
                <div className="mt-2 flex items-center justify-between text-sm text-white">
                  <span>Shipping</span>
                  <span>{formatCurrency(shipping)}</span>
                </div>
                <div className="mt-3 flex items-center justify-between border-t border-white/20 pt-3 text-base font-medium text-white">
                  <span>Total</span>
                  <span>{formatCurrency(total)}</span>
                </div>
                <button
                  onClick={handleCompleteOrder}
                  disabled={isNavigating}
                  className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-medium text-zinc-900 transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isNavigating && (
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
                  {isNavigating ? "Loading…" : "Complete order"}
                </button>
              </aside>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
