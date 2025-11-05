"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { formatCurrency } from "@crismyla/lib/format";
import { useCart } from "@crismyla/context/cart-context";
import type { Product } from "@crismyla/data/products";

export function ProductCard({
  product,
  index = 0,
}: {
  product: Product;
  index?: number;
}) {
  const { addItem, items } = useCart();
  const [isLoading, setIsLoading] = useState(false);

  const isInCart = items.some((item) => item.id === product.id);

  const handleAddToCart = async () => {
    setIsLoading(true);
    try {
      addItem({ id: product.id, name: product.name, price: product.price }, 1);
      // Small delay to show loading state
      await new Promise((resolve) => setTimeout(resolve, 500));
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <motion.li
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{
        duration: 0.5,
        delay: index * 0.03,
        ease: "easeOut",
      }}
      className="group relative overflow-hidden rounded-2xl border border-zinc-200/60 bg-white/80 p-5 backdrop-blur-sm shadow-sm transition-all duration-300 hover:scale-[1.02] hover:border-[#7A5844]/40 hover:bg-white hover:shadow-lg hover:shadow-[#4A322A]/10 dark:border-zinc-800/60 dark:bg-zinc-900/60 dark:hover:border-[#7A5844]/40 dark:hover:bg-zinc-900/80 dark:hover:shadow-[#4A322A]/10"
    >
      {/* Product Image */}
      <div
        className={
          "relative mb-5 aspect-[3/4] w-full overflow-hidden rounded-xl " +
          product.imageBg
        }
      >
        <div className="h-full w-full bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.6),transparent_50%),radial-gradient(circle_at_70%_70%,rgba(255,255,255,0.3),transparent_60%)] transition-opacity duration-300 group-hover:opacity-80" />
        {product.badge && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute left-3 top-3 rounded-full bg-[#4A322A] px-3 py-1 text-xs font-semibold text-white shadow-lg shadow-[#4A322A]/40"
          >
            {product.badge}
          </motion.span>
        )}
      </div>

      {/* Product Info */}
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <h3 className="font-medium leading-tight text-zinc-900 dark:text-zinc-50">
              {product.name}
            </h3>
            <p className="mt-1 text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              {product.category}
            </p>
          </div>
          <div className="shrink-0 rounded-full bg-[#7A5844]/10 px-3 py-1.5 text-sm font-semibold text-[#4A322A] transition-colors dark:bg-[#7A5844]/20 dark:text-[#7A5844]">
            {formatCurrency(product.price)}
          </div>
        </div>

        <p className="line-clamp-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          {product.description}
        </p>

        {/* Add to Cart / View Cart Button */}
        {isInCart ? (
          <Link
            href="/cart"
            className="group/btn relative flex w-full items-center justify-center overflow-hidden rounded-full bg-[#7A5844] px-5 py-3 text-sm font-semibold text-white shadow-md shadow-[#7A5844]/30 transition-all duration-300 hover:bg-[#8a684c] hover:shadow-lg hover:shadow-[#7A5844]/40"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              View Cart
              <span
                aria-hidden
                className="transition-transform duration-300 group-hover/btn:translate-x-1"
              >
                →
              </span>
            </span>
          </Link>
        ) : (
          <motion.button
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleAddToCart}
            disabled={isLoading}
            className="group/btn relative w-full overflow-hidden rounded-full bg-[#4A322A] px-5 py-3 text-sm font-semibold text-white shadow-md shadow-[#4A322A]/30 transition-all duration-300 hover:bg-[#5a3f35] hover:shadow-lg hover:shadow-[#4A322A]/40 disabled:cursor-not-allowed disabled:opacity-70"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              {isLoading ? (
                <>
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
                  Adding...
                </>
              ) : (
                <>
                  Add to cart
                  <span
                    aria-hidden
                    className="transition-transform duration-300 group-hover/btn:translate-x-1"
                  >
                    →
                  </span>
                </>
              )}
            </span>
            <div className="absolute inset-0 bg-[#7A5844] opacity-0 transition-opacity duration-300 group-hover/btn:opacity-100" />
          </motion.button>
        )}
      </div>
    </motion.li>
  );
}
