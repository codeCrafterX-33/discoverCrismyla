export function Footer() {
  return (
    <footer className="relative z-10 mt-16 border-t border-zinc-200/50 bg-white/80 backdrop-blur-md dark:border-zinc-800/50 dark:bg-zinc-950/80">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <h3 className="mb-4 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
              Crismyla
            </h3>
            <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              Transforming beauty with timeless elegance. Discover our curated
              collection of premium perfumes, skincare, and expertly formulated products.
            </p>
          </div>
          
          <div>
            <h3 className="mb-4 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="/collection"
                  className="text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
                >
                  Shop Collection
                </a>
              </li>
              <li>
                <a
                  href="/cart"
                  className="text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
                >
                  Shopping Cart
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="mb-4 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
              Contact
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Have questions? We're here to help.
            </p>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              Reach out for product inquiries, support, or custom orders.
            </p>
          </div>
        </div>
        
        <div className="mt-10 border-t border-zinc-200/50 pt-6 dark:border-zinc-800/50">
          <div className="flex flex-col items-center justify-between gap-4 text-sm text-zinc-500 dark:text-zinc-400 md:flex-row">
            <p>© {new Date().getFullYear()} Crismyla. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
