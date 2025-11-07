import { NewsletterForm } from "@crismyla/components/NewsletterForm";

export function Footer() {
  return (
    <footer className="relative z-10 mt-16 border-t border-zinc-200/50 bg-white/80 backdrop-blur-md dark:border-zinc-800/50 dark:bg-zinc-950/80">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <h3 className="text-lg font-semibold">Join our newsletter</h3>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              Get product launches, exclusive offers, and trends.
            </p>
          </div>
          <NewsletterForm />
        </div>
        <div className="mt-10 text-sm text-zinc-500 dark:text-zinc-400">
          © {new Date().getFullYear()} Crismyla
        </div>
      </div>
    </footer>
  );
}
