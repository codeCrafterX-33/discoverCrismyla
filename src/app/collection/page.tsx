"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { categories, products } from "@crismyla/data/products";
import { ProductCard } from "@crismyla/components/ProductCard";
import { motion, AnimatePresence } from "framer-motion";

type SortOption =
  | "default"
  | "price-asc"
  | "price-desc"
  | "name-asc"
  | "name-desc";

export default function CollectionPage() {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(() => searchParams.get("q") || "");
  const [category, setCategory] = useState<string>("All");
  const [quick, setQuick] = useState<string>("All");
  const [sortBy, setSortBy] = useState<SortOption>("default");
  const [showFilters, setShowFilters] = useState(true);
  const [headerVisible] = useState(true);

  // Check if any filters are active
  const hasActiveFilters = useMemo(() => {
    return query.trim() !== "" || category !== "All" || quick !== "All";
  }, [query, category, quick]);

  // Only sync from URL when it changes externally (e.g., from navbar search)
  useEffect(() => {
    const urlQuery = searchParams.get("q") || "";
    // Only update if different to avoid infinite loops
    setQuery((prev) => {
      if (prev !== urlQuery) {
        return urlQuery;
      }
      return prev;
    });
  }, [searchParams]);

  const handleClearFilters = () => {
    // Remove q from URL if present
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.delete("q");
      window.history.replaceState(null, "", url.toString());
    }
    setQuery("");
    setCategory("All");
    setQuick("All");
  };

  // Removed scroll-based header visibility (no longer needed)

  const filtered = useMemo(() => {
    const normalize = (s: string) =>
      s
        .toLowerCase()
        .normalize("NFD")
        .replace(/\p{Diacritic}/gu, "")
        .trim();
    const q = normalize(query);
    let result = products.filter((p) => {
      const matchesCategory = category === "All" || p.category === category;
      const name = normalize(p.name);
      const desc = normalize(p.description || "");
      const cat = normalize(p.category || "");
      const badge = normalize(p.badge || "");
      const tags = (p.tags || []).map((t) => normalize(t));
      const matchesQuery =
        q.length === 0 ||
        name.includes(q) ||
        desc.includes(q) ||
        cat.includes(q) ||
        badge.includes(q) ||
        tags.some((t) => t.includes(q));
      const matchesQuick =
        quick === "All" ||
        (quick === "Bestsellers" && (p.tags || []).includes("bestseller")) ||
        (quick === "Under $50" && p.price <= 50) ||
        (quick === "New" && (p.tags || []).includes("new"));
      return matchesCategory && matchesQuery && matchesQuick;
    });

    // Apply sorting
    if (sortBy === "price-asc") {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      result = [...result].sort((a, b) => b.price - a.price);
    } else if (sortBy === "name-asc") {
      result = [...result].sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "name-desc") {
      result = [...result].sort((a, b) => b.name.localeCompare(a.name));
    }

    return result;
  }, [query, category, quick, sortBy]);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-neutral-50 via-white to-amber-50/30 text-zinc-950 dark:from-zinc-950 dark:via-zinc-900 dark:to-black dark:text-zinc-50">
      {/* Animated background elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-1/4 -top-1/4 h-[600px] w-[600px] rounded-full bg-[#7A5844]/5 blur-3xl dark:bg-[#7A5844]/10" />
        <div className="absolute -right-1/4 -bottom-1/4 h-[600px] w-[600px] rounded-full bg-amber-500/5 blur-3xl dark:bg-amber-500/10" />
      </div>

      <main className="relative">
        {/* Header with Hero Section (not fixed) - hidden on lg to show in sidebar */}
        <motion.div
          id="filters-top"
          initial={{ y: 0 }}
          animate={{
            y: headerVisible ? 0 : -200,
            opacity: headerVisible ? 1 : 0,
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className={`z-10 mb-8 border-b border-zinc-200/50 bg-white/70 backdrop-blur-xl transition-all dark:border-zinc-800/50 dark:bg-zinc-950/70 lg:hidden scroll-mt-24`}
        >
          <div className="mx-auto max-w-7xl px-4 py-8 md:px-6 lg:px-8">
            {/* Hero Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8 mt-15"
            >
              <h1 className="mb-3 bg-gradient-to-r from-zinc-900 via-zinc-700 to-zinc-900 bg-clip-text text-4xl font-bold tracking-tight text-transparent dark:from-zinc-100 dark:via-zinc-300 dark:to-zinc-100 md:text-5xl lg:text-6xl">
                Our Collection
              </h1>
              <p className="max-w-2xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 md:text-base">
                Discover luxurious fragrances, nourishing skincare, aromatic
                home scents, and premium haircare essentials.
              </p>
            </motion.div>

            {/* Toolbar: Filters & Sort */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-wrap items-center justify-between gap-4"
            >
              {/* Search Input (inline on Collection page) */}
              <div className="flex-1 min-w-[220px] max-w-sm">
                <div className="flex items-center gap-2 rounded-full border border-zinc-200/70 bg-white/80 px-3 py-2 text-sm backdrop-blur-md dark:border-zinc-700/70 dark:bg-zinc-900/70">
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
                    value={query}
                    onChange={(e) => {
                      const v = e.target.value;
                      // Update state immediately for instant filtering
                      setQuery(v);
                      // Update URL asynchronously to avoid blocking
                      setTimeout(() => {
                        if (typeof window !== "undefined") {
                          const url = new URL(window.location.href);
                          if (v.trim()) {
                            url.searchParams.set("q", v);
                          } else {
                            url.searchParams.delete("q");
                          }
                          window.history.replaceState(null, "", url.toString());
                        }
                      }, 0);
                    }}
                    placeholder="Search products..."
                    aria-label="Search products"
                    className="w-full bg-transparent text-base outline-none placeholder:text-zinc-400 dark:placeholder:text-zinc-500"
                  />
                </div>
              </div>

              {/* Quick Filters */}
              <div className="flex flex-wrap items-center gap-2.5">
                {["All", "Bestsellers", "Under $50", "New"].map((f, idx) => (
                  <motion.button
                    key={f}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      delay: idx * 0.05,
                      type: "spring",
                      stiffness: 200,
                    }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setQuick(f)}
                    className={`group relative overflow-hidden rounded-full border px-5 py-2.5 text-xs font-semibold transition-all duration-300 md:px-6 md:py-2.5 md:text-sm ${
                      quick === f
                        ? "border-[#4A322A] bg-gradient-to-r from-[#4A322A] to-[#5a3f35] text-white shadow-lg shadow-[#4A322A]/40 ring-2 ring-[#4A322A]/20"
                        : "border-zinc-200/80 bg-white/90 text-zinc-700 backdrop-blur-md hover:border-[#7A5844]/80 hover:bg-white hover:shadow-lg hover:shadow-[#7A5844]/10 dark:border-zinc-700/80 dark:bg-zinc-900/80 dark:text-zinc-300 dark:hover:border-[#7A5844]/60 dark:hover:bg-zinc-800/90"
                    }`}
                  >
                    {quick === f && (
                      <motion.div
                        layoutId="activeQuickFilter"
                        className="absolute inset-0 rounded-full bg-gradient-to-r from-[#7A5844] via-[#5a3f35] to-[#7A5844]"
                        initial={false}
                        transition={{
                          type: "spring",
                          bounce: 0.2,
                          duration: 0.6,
                        }}
                      />
                    )}
                    <span
                      className={`relative z-10 flex items-center gap-1.5 ${
                        quick === f ? "text-white" : ""
                      }`}
                    >
                      {quick === f && (
                        <motion.svg
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="h-3.5 w-3.5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </motion.svg>
                      )}
                      {f}
                    </span>
                  </motion.button>
                ))}
              </div>

              {/* Sort & Filter Toggle */}
              <div className="flex items-center gap-3">
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortOption)}
                    aria-label="Sort products"
                    className="appearance-none rounded-xl border border-zinc-200/80 bg-white/90 px-5 py-2.5 pr-10 text-xs font-medium text-zinc-700 backdrop-blur-md transition-all hover:border-[#7A5844]/80 hover:shadow-lg hover:shadow-[#7A5844]/10 focus:border-[#7A5844] focus:outline-none focus:ring-2 focus:ring-[#7A5844]/20 dark:border-zinc-700/80 dark:bg-zinc-900/80 dark:text-zinc-300 dark:hover:border-[#7A5844]/60 md:text-sm"
                  >
                    <option value="default">Sort: Featured</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="name-asc">Name: A to Z</option>
                    <option value="name-desc">Name: Z to A</option>
                  </select>
                  <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
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
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowFilters(!showFilters)}
                  className="relative rounded-xl border border-zinc-200/80 bg-white/90 px-5 py-2.5 text-xs font-medium text-zinc-700 backdrop-blur-md transition-all hover:border-[#7A5844]/80 hover:shadow-lg hover:shadow-[#7A5844]/10 dark:border-zinc-700/80 dark:bg-zinc-900/80 dark:text-zinc-300 dark:hover:border-[#7A5844]/60 md:text-sm"
                >
                  {hasActiveFilters && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-[#7A5844] ring-2 ring-white dark:ring-zinc-900"
                    />
                  )}
                  {showFilters ? "Hide" : "Filters"}
                </motion.button>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Filters: simple panel on mobile, sidebar on large screens */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="mx-auto block max-w-7xl px-4 md:px-6 lg:hidden overflow-hidden"
            >
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <label className="mb-4 block text-sm font-bold tracking-wide text-zinc-900 dark:text-zinc-100 uppercase">
                  Categories
                </label>
                <div className="flex flex-wrap gap-2.5">
                  {categories.map((c, idx) => (
                    <motion.button
                      key={c}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        delay: idx * 0.05,
                        type: "spring",
                        stiffness: 200,
                      }}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setCategory(c)}
                      className={`group relative overflow-hidden rounded-full border px-5 py-2.5 text-xs font-semibold transition-all duration-300 md:px-6 ${
                        category === c
                          ? "border-[#4A322A] bg-gradient-to-r from-[#4A322A] to-[#5a3f35] text-white shadow-lg shadow-[#4A322A]/40 ring-2 ring-[#4A322A]/20"
                          : "border-zinc-200/80 bg-white/90 text-zinc-700 backdrop-blur-md hover:border-[#7A5844]/80 hover:bg-white hover:shadow-lg hover:shadow-[#7A5844]/10 dark:border-zinc-700/80 dark:bg-zinc-900/80 dark:text-zinc-300 dark:hover:border-[#7A5844]/60 dark:hover:bg-zinc-800/90"
                      }`}
                    >
                      {category === c && (
                        <motion.div
                          layoutId="activeCategoryMobile"
                          className="absolute inset-0 rounded-full bg-gradient-to-r from-[#7A5844] via-[#5a3f35] to-[#7A5844]"
                          initial={false}
                          transition={{
                            type: "spring",
                            bounce: 0.2,
                            duration: 0.6,
                          }}
                        />
                      )}
                      <span
                        className={`relative z-10 flex items-center gap-1.5 ${
                          category === c ? "text-white" : ""
                        }`}
                      >
                        {category === c && (
                          <motion.svg
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="h-3.5 w-3.5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </motion.svg>
                        )}
                        {c}
                      </span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
              {(query || category !== "All" || quick !== "All") && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleClearFilters}
                  className="mt-4 flex items-center gap-2 rounded-lg border border-zinc-200/80 bg-white/90 px-4 py-2 text-xs font-semibold text-[#7A5844] backdrop-blur-md transition-all hover:border-[#7A5844]/80 hover:bg-white hover:shadow-md dark:border-zinc-700/80 dark:bg-zinc-900/80 dark:text-[#7A5844] dark:hover:border-[#7A5844]/60"
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
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                  Clear all filters
                </motion.button>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Product Grid + Sidebar on large screens */}
        <section className="mx-auto max-w-7xl px-4 pb-20 pt-8 md:px-6 lg:px-8 lg:pt-28">
          <div className="grid gap-8 lg:grid-cols-12">
            {/* Sidebar (large screens) */}
            <aside className="sticky top-28 hidden self-start lg:col-span-3 lg:block">
              <div className="max-h-[calc(100vh-7rem)] overflow-y-auto pr-2">
                <div className="mb-6 rounded-2xl border border-zinc-200/60 bg-white/80 p-4 backdrop-blur-xl dark:border-zinc-800/60 dark:bg-zinc-900/60">
                  <h2 className="mb-2 bg-gradient-to-r from-zinc-900 via-zinc-700 to-zinc-900 bg-clip-text text-2xl font-bold tracking-tight text-transparent dark:from-zinc-100 dark:via-zinc-300 dark:to-zinc-100">
                    Our Collection
                  </h2>
                  <p className="mb-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                    Discover luxurious fragrances, nourishing skincare, aromatic
                    home scents, and premium haircare essentials.
                  </p>
                  {/* Toolbar (Quick filters + Sort) */}
                  <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-2">
                      {["All", "Bestsellers", "Under $50", "New"].map((f) => (
                        <button
                          key={f}
                          onClick={() => setQuick(f)}
                          className={`relative rounded-full border px-3 py-1.5 text-xs font-semibold transition-all ${
                            quick === f
                              ? "border-[#4A322A] bg-[#4A322A] text-white shadow"
                              : "border-zinc-200/60 bg-white/60 text-zinc-700 hover:border-[#7A5844]/60 hover:bg-white dark:border-zinc-800/60 dark:bg-zinc-900/60 dark:text-zinc-300"
                          }`}
                        >
                          {f}
                        </button>
                      ))}
                    </div>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as SortOption)}
                      aria-label="Sort products"
                      className="w-full rounded-xl border border-zinc-200/60 bg-white/80 px-3 py-2 text-xs font-medium text-zinc-700 dark:border-zinc-800/60 dark:bg-zinc-900/80 dark:text-zinc-300"
                    >
                      <option value="default">Sort: Featured</option>
                      <option value="price-asc">Price: Low to High</option>
                      <option value="price-desc">Price: High to Low</option>
                      <option value="name-asc">Name: A to Z</option>
                      <option value="name-desc">Name: Z to A</option>
                    </select>
                  </div>
                </div>
                <div className="rounded-2xl border border-zinc-200/60 bg-white/80 p-4 backdrop-blur-xl dark:border-zinc-800/60 dark:bg-zinc-900/60">
                  <label className="mb-3 block text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                    Categories
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((c) => (
                      <motion.button
                        key={c}
                        whileHover={{ scale: 1.05, y: -1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setCategory(c)}
                        className={`relative overflow-hidden rounded-full border px-4 py-2 text-xs font-semibold transition-all duration-300 md:px-5 md:text-sm ${
                          category === c
                            ? "border-[#4A322A] bg-[#4A322A] text-white shadow-lg shadow-[#4A322A]/30"
                            : "border-zinc-200/60 bg-white/60 text-zinc-700 backdrop-blur-sm hover:border-[#7A5844]/60 hover:bg-white hover:shadow-md dark:border-zinc-800/60 dark:bg-zinc-900/60 dark:text-zinc-300 dark:hover:border-[#7A5844]/60 dark:hover:bg-zinc-900"
                        }`}
                      >
                        {category === c && (
                          <motion.div
                            layoutId="activeCategory"
                            className="absolute inset-0 rounded-full bg-gradient-to-r from-[#7A5844] to-[#5a3f35]"
                            initial={false}
                            transition={{
                              type: "spring",
                              bounce: 0.2,
                              duration: 0.6,
                            }}
                          />
                        )}
                        <span className="relative z-10">{c}</span>
                      </motion.button>
                    ))}
                  </div>
                  {(query || category !== "All" || quick !== "All") && (
                    <button
                      onClick={handleClearFilters}
                      className="mt-4 text-xs font-medium text-[#7A5844] underline underline-offset-4 transition-colors hover:text-[#4A322A] dark:text-[#7A5844] dark:hover:text-[#9a7864]"
                    >
                      Clear all filters
                    </button>
                  )}
                </div>
              </div>
            </aside>

            {/* Main content */}
            <div className="lg:col-span-9">
              {/* Results Count */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mb-6 flex items-center justify-between"
              >
                <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                  Showing{" "}
                  <span className="font-bold text-zinc-900 dark:text-zinc-100">
                    {filtered.length}
                  </span>{" "}
                  {filtered.length === 1 ? "product" : "products"}
                </p>
              </motion.div>

              {/* Products Grid */}
              {filtered.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="rounded-3xl border border-dashed border-zinc-300/60 bg-white/60 p-16 text-center backdrop-blur-sm dark:border-zinc-800/60 dark:bg-zinc-900/60"
                >
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800">
                    <svg
                      className="h-8 w-8 text-zinc-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <p className="mb-2 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                    No products found
                  </p>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    Try adjusting your filters or search terms
                  </p>
                </motion.div>
              ) : (
                <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {filtered.map((p, idx) => (
                    <ProductCard key={p.id} product={p} index={idx} />
                  ))}
                </ul>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* Fixed Filter Toggle Button (mobile/tablet only) */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => {
          const el = document.getElementById("filters-top");
          const nav = document.querySelector("nav");
          if (el) {
            const navHeight = nav
              ? (nav as HTMLElement).getBoundingClientRect().height
              : 0;
            const extra = 16;
            const y =
              el.getBoundingClientRect().top +
              window.scrollY -
              (navHeight + extra);
            window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
            (el as HTMLElement).setAttribute("tabindex", "-1");
            (el as HTMLElement).focus({ preventScroll: true });
          }
        }}
        className={`fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full border px-4 py-3 shadow-lg backdrop-blur-xl transition-all md:bottom-8 md:right-8 lg:hidden border-zinc-200/60 bg-white/90 text-zinc-700 hover:border-[#7A5844] hover:bg-white hover:shadow-xl dark:border-zinc-800/60 dark:bg-zinc-900/90 dark:text-zinc-300 dark:hover:border-[#7A5844]`}
        aria-label="Toggle filters"
      >
        <>
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
            />
          </svg>
          <span className="hidden font-medium md:inline">Filters</span>
          {hasActiveFilters && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#7A5844] text-xs font-bold text-white shadow-lg dark:bg-[#4A322A]"
            >
              !
            </motion.span>
          )}
        </>
      </motion.button>
    </div>
  );
}
