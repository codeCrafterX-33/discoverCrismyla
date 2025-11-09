"use client";

import { HeroCarousel } from "@crismyla/components/HeroCarousel";
import { ProductCard } from "@crismyla/components/ProductCard";
import { CustomerInfoForm } from "@crismyla/components/CustomerInfoForm";
import { categories, products } from "@crismyla/data/products";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-zinc-950 dark:bg-zinc-950 dark:text-zinc-50">
      {/* Hero Section - Full Width */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* Background Carousel */}
        <HeroCarousel />

        {/* Subtle Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/40 dark:from-black/50 dark:via-black/20 dark:to-black/60" />

        {/* Text Content - Absolutely Positioned - Mobile Only */}
        <div className="absolute top-1/2 left-1/2 z-10 flex w-[90%] -translate-x-1/2 -translate-y-1/2 flex-col items-center text-center md:hidden">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="space-y-6"
          >
            <h1 className="text-5xl font-bold tracking-tight text-white md:text-6xl">
              Transforming Beauty with
              <br />
              <span className="font-serif italic font-normal">
                Timeless Elegance
              </span>
            </h1>
            <p className="mx-auto max-w-lg text-base leading-relaxed text-white/90 md:text-lg">
              Experience the art of beauty transformation where luxury meets
              authenticity. Our curated collection of perfumes, skincare, and
              artisanal soaps crafts sophisticated, personalized routines that
              tell your story.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 1, delay: 0.2, ease: "easeInOut" }}
            className="mt-8 flex flex-wrap justify-center gap-4"
          >
            <a
              href="/collection"
              className="group relative overflow-hidden rounded-sm bg-[#4A322A] px-8 py-3.5 text-sm font-medium text-white shadow-md transition-all duration-300 hover:bg-[#5a3f35] hover:shadow-lg"
            >
              <span className="relative z-10 flex items-center gap-2">
                Explore Collection
                <svg
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </span>
            </a>
          </motion.div>
        </div>
      </section>

      {/* The Crismyla Difference - Elegant Section */}
      <section
        className="relative py-16 md:py-20"
        style={{ backgroundColor: "#ffffff" }}
      >
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="mb-12 text-center md:mb-16"
          >
            <h2 className="mb-4 font-serif text-3xl font-bold tracking-tight text-black md:text-4xl lg:text-5xl">
              What Makes Us Extraordinary
            </h2>
            <p className="mx-auto max-w-2xl text-base text-black md:text-lg">
              Every product is crafted with intention, blending luxury with
              nature to deliver beauty experiences that transcend the ordinary
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: (
                  <svg
                    className="h-12 w-12"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                    />
                  </svg>
                ),
                title: "Premium Quality",
                description:
                  "Luxury formulations crafted with the finest ingredients for exceptional results.",
              },
              {
                icon: (
                  <svg
                    className="h-12 w-12"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                    />
                  </svg>
                ),
                title: "Natural Ingredients",
                description:
                  "Ethically sourced, nature-inspired ingredients that care for your skin and wellbeing.",
              },
              {
                icon: (
                  <svg
                    className="h-12 w-12"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z"
                    />
                  </svg>
                ),
                title: "Artisanal Craftsmanship",
                description:
                  "Handcrafted with attention to detail, ensuring every product meets our exacting standards.",
              },
              {
                icon: (
                  <svg
                    className="h-12 w-12"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.125-.504 1.125-1.125V14.25m-17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h7.5c.621 0 1.125-.504 1.125-1.125V14.25m-17.25 4.5h17.25M20.25 7.5H3.375c-.621 0-1.125.504-1.125 1.125v9.75c0 .621.504 1.125 1.125 1.125h16.875c.621 0 1.125-.504 1.125-1.125V8.625c0-.621-.504-1.125-1.125-1.125z"
                    />
                  </svg>
                ),
                title: "Free Shipping",
                description:
                  "Complimentary delivery on orders over $100, bringing luxury directly to your door.",
              },
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{
                  duration: 1,
                  delay: idx * 0.1,
                  ease: "easeInOut",
                }}
                className="group relative"
              >
                <div
                  className={`space-y-4 p-6 rounded-md text-center transition-all duration-300 hover:translate-y-[-4px] ${
                    idx === 3
                      ? "bg-gray-200 dark:bg-gray-200"
                      : "bg-[#7A5844] text-white"
                  }`}
                >
                  <div
                    className={`mx-auto mb-4 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 ${
                      idx === 3 ? "text-black" : "text-white"
                    }`}
                  >
                    {feature.icon}
                  </div>
                  <h3
                    className={`text-lg font-bold ${
                      idx === 3 ? "text-black" : "text-white"
                    }`}
                  >
                    {feature.title}
                  </h3>
                  <p
                    className={`text-sm leading-relaxed ${
                      idx === 3 ? "text-black" : "text-white"
                    }`}
                  >
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Comprehensive Beauty Solutions - Services Section */}
      <section className="relative overflow-hidden py-16">
        {/* Background Image - Full Quality */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/images/hero/background1.jpg')",
            zIndex: 0,
          }}
        />
        <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="mb-12 text-center md:mb-16"
          >
            <h2 className="mb-4 font-serif text-3xl font-bold tracking-tight text-black md:text-4xl lg:text-5xl">
              Comprehensive Beauty Solutions
            </h2>
            <p className="mx-auto max-w-2xl text-base text-black md:text-lg">
              From luxurious fragrances to nourishing skincare, discover our
              complete range of beauty essentials designed to elevate your daily
              routine
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                category: "Skincare",
                description:
                  "Nourishing formulations crafted with premium ingredients to enhance and protect your natural radiance.",
                icon: (
                  <svg
                    className="h-16 w-16"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.392 1.391a2.25 2.25 0 010 3.182M5 14.5l-1.392 1.391a2.25 2.25 0 000 3.182"
                    />
                  </svg>
                ),
              },
              {
                category: "Fragrance",
                description:
                  "Luxurious perfumes and scents that capture your essence and leave a lasting impression.",
                icon: (
                  <svg
                    className="h-16 w-16"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
                    />
                  </svg>
                ),
              },
              {
                category: "Diffuser & Home Scent",
                description:
                  "Transform your living space with aromatic diffusers and home scents that create an inviting ambiance.",
                icon: (
                  <svg
                    className="h-16 w-16"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 018.716 6.747M12 3a8.997 8.997 0 00-8.716 6.747m0 0A9.003 9.003 0 0012 21m0 0v-9m0 9H3m9-9V3m0 9h9M3 12h9m9 0h-9m-9 0c2.485 0 4.5 4.03 4.5 9m0-9c0-4.97-2.015-9-4.5-9m4.5 9c0-4.97-2.015-9-4.5-9"
                    />
                  </svg>
                ),
              },
              {
                category: "Haircare & Wig",
                description:
                  "Premium haircare products and quality wigs to enhance your natural beauty and style.",
                icon: (
                  <svg
                    className="h-16 w-16"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z"
                    />
                  </svg>
                ),
              },
            ].map((service, idx) => (
              <motion.figure
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{
                  duration: 1,
                  delay: idx * 0.1,
                  ease: "easeInOut",
                }}
                className="group space-y-4"
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-gradient-to-br from-[#4A322A]/1200 to-[#7A5844]/10 transition-all duration-300 group-hover:from-[#4A322A]/20 group-hover:to-[#7A5844]/20">
                  <div className="absolute inset-0 flex items-center justify-center text-black">
                    {service.icon}
                  </div>
                </div>
                <figcaption className="space-y-3">
                  <h3 className="text-xl font-bold text-black">
                    {service.category}
                  </h3>
                  <p className="text-sm leading-relaxed text-black">
                    {service.description}
                  </p>
                </figcaption>
              </motion.figure>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeInOut" }}
            className="mt-12 text-center"
          >
            <a
              href="/collection"
              className="group inline-flex items-center gap-2 rounded-sm bg-red-600 px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:bg-red-700"
            >
              Explore All Products
              <svg
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="bg-white py-16 dark:bg-zinc-950">
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="mb-12 text-center md:mb-16"
          >
            <h2 className="mb-4 font-serif text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 md:text-4xl lg:text-5xl">
              Featured Collection
            </h2>
            <p className="mx-auto max-w-2xl text-base text-zinc-600 dark:text-zinc-400 md:text-lg">
              Discover our handpicked selection of premium beauty products and
              artisanal creations
            </p>
          </motion.div>

          <ul className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {products
              .filter((p) => p.tags?.includes("bestseller") || p.badge)
              .slice(0, 3)
              .map((product, idx) => (
                <ProductCard key={product.id} product={product} index={idx} />
              ))}
          </ul>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-zinc-50 py-16 lg:py-20 dark:bg-zinc-900">
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="mb-12 text-center md:mb-16"
          >
            <h2 className="mb-4 font-serif text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 md:text-4xl lg:text-5xl">
              What Our Clients Say
            </h2>
            <p className="mx-auto max-w-2xl text-base text-zinc-600 dark:text-zinc-400 md:text-lg">
              Real feedback from satisfied customers who trust us with their
              beauty journey
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeInOut" }}
            className="mx-auto max-w-3xl"
          >
            <blockquote className="space-y-6 rounded-sm border-l-4 border-[#4A322A] bg-white p-8 shadow-sm dark:bg-zinc-800 dark:border-[#7A5844]">
              <p className="text-lg leading-relaxed text-zinc-700 dark:text-zinc-300">
                "Crismyla delivered outstanding results with their premium
                beauty products. The quality is exceptional, with excellent
                attention to detail and a high standard of craftsmanship
                throughout. I was particularly impressed by their responsiveness
                and the personalized care they put into every order.
              </p>
              <p className="text-lg leading-relaxed text-zinc-700 dark:text-zinc-300">
                Their ability to combine luxury quality with reliable customer
                service made the entire experience seamless. I would not
                hesitate to recommend Crismyla to anyone seeking dependable and
                high-quality beauty solutions."
              </p>
              <footer className="pt-4">
                <div className="font-medium text-zinc-900 dark:text-zinc-50">
                  Sarah M.
                </div>
                <div className="text-sm text-zinc-600 dark:text-zinc-400">
                  Satisfied Client
                </div>
              </footer>
            </blockquote>
          </motion.div>
        </div>
      </section>

      {/* Customer Info Form Section */}
      <section className="bg-white py-16 lg:py-20 dark:bg-zinc-950">
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="mb-12 text-center md:mb-16"
          >
            <h2 className="mb-4 font-serif text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 md:text-4xl lg:text-5xl">
              Join the Crismyla Community
            </h2>
            <p className="mx-auto max-w-2xl text-base text-zinc-600 dark:text-zinc-400 md:text-lg">
              Sign up now and receive exclusive coupons, early access to new products, and special discounts. Be the first to know about our latest beauty collections and limited-time offers.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeInOut" }}
            className="mx-auto flex justify-center"
          >
            <CustomerInfoForm />
          </motion.div>
        </div>
      </section>
    </div>
  );
}
