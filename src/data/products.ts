export type Product = {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  imageBg: string;
  tags?: string[];
  url?: string;
  badge?: string;
};

export const categories = [
  "All",
  "Skincare",
  "Fragrance",
  "Diffuser & Home Scent",
  "Haircare & Wig",
];

export const products: Product[] = [
  // Fragrance Oils
  {
    id: "fo-001",
    name: "Blush Inferno Fragrance Oil (100ml)",
    price: 30,
    category: "Diffuser & Home Scent",
    description:
      "Intense, seductive fragrance oil with warm notes perfect for creating an alluring atmosphere.",
    imageBg:
      "bg-gradient-to-br from-rose-200 via-rose-100 to-rose-300 dark:from-rose-900 dark:via-rose-800 dark:to-rose-700",
    tags: ["bestseller"],
    badge: "Bestseller",
    url: "/images/products/blush-inferno.png",
  },
  {
    id: "fo-002",
    name: "Étreinte Fragrance Oil (100ml)",
    price: 30,
    category: "Diffuser & Home Scent",
    description:
      "Elegant and sophisticated scent that embraces you with its luxurious fragrance.",
    imageBg:
      "bg-gradient-to-br from-purple-200 via-purple-100 to-purple-300 dark:from-purple-900 dark:via-purple-800 dark:to-purple-700",
    url: "/images/products/Etreinte.png",
  },
  {
    id: "fo-003",
    name: "Lune d'Or Fragrance Oil (100ml)",
    price: 30,
    category: "Diffuser & Home Scent",
    description:
      "Golden moonlight captured in a bottle with enchanting and dreamy aromas.",
    imageBg:
      "bg-gradient-to-br from-amber-200 via-amber-100 to-amber-300 dark:from-amber-900 dark:via-amber-800 dark:to-amber-700",
    url: "/images/products/lune-dor.png",
  },
  {
    id: "fo-004",
    name: "Silken Whisper Fragrance Oil (100ml)",
    price: 30,
    category: "Diffuser & Home Scent",
    description:
      "Soft and delicate fragrance that whispers elegance into any space.",
    imageBg:
      "bg-gradient-to-br from-pink-200 via-pink-100 to-pink-300 dark:from-pink-900 dark:via-pink-800 dark:to-pink-700",
    url: "/images/products/silken-whisper.png",
  },
  {
    id: "fo-005",
    name: "Muse de Minuit Fragrance Oil (100ml)",
    price: 30,
    category: "Diffuser & Home Scent",
    description:
      "Midnight muse with mysterious and captivating notes that inspire.",
    imageBg:
      "bg-gradient-to-br from-indigo-200 via-indigo-100 to-indigo-300 dark:from-indigo-900 dark:via-indigo-800 dark:to-indigo-700",
    url: "/images/products/muse.png",
  },
  {
    id: "fo-006",
    name: "Fleur Obscure Fragrance Oil (100ml)",
    price: 30,
    category: "Diffuser & Home Scent",
    description:
      "Dark floral notes that create an intriguing and sophisticated ambiance.",
    imageBg:
      "bg-gradient-to-br from-violet-200 via-violet-100 to-violet-300 dark:from-violet-900 dark:via-violet-800 dark:to-violet-700",
    url: "/images/products/fleur.png",
  },
  {
    id: "fo-007",
    name: "Nude Aura Fragrance Oil (100ml)",
    price: 30,
    category: "Diffuser & Home Scent",
    description:
      "Clean, natural scent that creates a fresh and inviting atmosphere.",
    imageBg:
      "bg-gradient-to-br from-stone-200 via-stone-100 to-stone-300 dark:from-stone-900 dark:via-stone-800 dark:to-stone-700",
    url: "/images/products/nude.png",
  },
  {
    id: "fo-008",
    name: "Velour Nights Fragrance Oil (100ml)",
    price: 30,
    category: "Diffuser & Home Scent",
    description:
      "Luxurious velvet-like fragrance that transforms evenings into elegant experiences.",
    imageBg:
      "bg-gradient-to-br from-slate-200 via-slate-100 to-slate-300 dark:from-slate-900 dark:via-slate-800 dark:to-slate-700",
    url: "/images/products/velour.png",
  },
  {
    id: "fo-009",
    name: "Noir Seduction Fragrance Oil (100ml)",
    price: 30,
    category: "Diffuser & Home Scent",
    description:
      "Alluring dark fragrance with seductive notes that captivate the senses.",
    imageBg:
      "bg-gradient-to-br from-zinc-200 via-zinc-100 to-zinc-300 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-700",
    tags: ["bestseller"],
    badge: "Bestseller",
    url: "/images/products/noir.png",
  },
  {
    id: "fo-010",
    name: "Velvet Blaze Fragrance Oil (100ml)",
    price: 30,
    category: "Diffuser & Home Scent",
    description: "Bold and fiery fragrance with smooth, luxurious undertones.",
    imageBg:
      "bg-gradient-to-br from-red-200 via-red-100 to-red-300 dark:from-red-900 dark:via-red-800 dark:to-red-700",
    url: "/images/products/velvet.png",
  },
  // Diffusers
  {
    id: "diff-001",
    name: "Crismyla Tabletop Wireless Aroma Diffuser (Gold)",
    price: 230,
    category: "Diffuser & Home Scent",
    description:
      "Elegant gold wireless diffuser that seamlessly blends technology with luxury design.",
    imageBg:
      "bg-gradient-to-br from-yellow-200 via-yellow-100 to-yellow-300 dark:from-yellow-900 dark:via-yellow-800 dark:to-yellow-700",
    tags: ["bestseller", "new"],
    badge: "New",
    url: "/images/products/diffuser-gold.jpg",
  },
  {
    id: "diff-002",
    name: "Crismyla Tabletop Wireless Bluetooth Aroma Diffuser (Silver)",
    price: 230,
    category: "Diffuser & Home Scent",
    description:
      "Premium silver diffuser with Bluetooth connectivity for smart home integration.",
    imageBg:
      "bg-gradient-to-br from-gray-200 via-gray-100 to-gray-300 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700",
    tags: ["bestseller", "new"],
    badge: "New",
    url: "/images/products/diffuser-silver.jpg",
  },
  {
    id: "diff-003",
    name: "Crismyla Tabletop Wireless Aroma Diffuser (Black)",
    price: 230,
    category: "Diffuser & Home Scent",
    description:
      "Sleek black wireless diffuser with modern minimalist design and powerful diffusion.",
    imageBg:
      "bg-gradient-to-br from-gray-200 via-gray-100 to-gray-300 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700",
    tags: ["bestseller"],
    badge: "Bestseller",
    url: "/images/products/diffuser-black.jpg",
  },
  // Fragrance - 10ml
  {
    id: "frag-10-001",
    name: "Heavenly (10ml)",
    price: 20,
    category: "Fragrance",
    description:
      "Divine and ethereal fragrance that captivates with its heavenly essence.",
    imageBg:
      "bg-gradient-to-br from-blue-200 via-blue-100 to-blue-300 dark:from-blue-900 dark:via-blue-800 dark:to-blue-700",
    url: "/images/products/heavenly-10ml.jpg",
  },
  {
    id: "frag-10-002",
    name: "Diamond Woods (10ml)",
    price: 25,
    category: "Fragrance",
    description:
      "Luxurious woody scent with sparkling diamond-like elegance and sophistication.",
    imageBg:
      "bg-gradient-to-br from-amber-200 via-amber-100 to-amber-300 dark:from-amber-900 dark:via-amber-800 dark:to-amber-700",
    url: "/images/products/diamond woods-10ml.jpg",
  },
  {
    id: "frag-10-003",
    name: "Aura Noir (10ml)",
    price: 20,
    category: "Fragrance",
    description:
      "Mysterious dark fragrance with an alluring aura that commands attention.",
    imageBg:
      "bg-gradient-to-br from-gray-200 via-gray-100 to-gray-300 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700",
    url: "/images/products/aura-noir-10ml.jpg",
  },
  {
    id: "frag-10-004",
    name: "Ocean Spritz (10ml)",
    price: 25,
    category: "Fragrance",
    description:
      "Fresh oceanic breeze captured in a bottle, refreshing and invigorating.",
    imageBg:
      "bg-gradient-to-br from-cyan-200 via-cyan-100 to-cyan-300 dark:from-cyan-900 dark:via-cyan-800 dark:to-cyan-700",
    tags: ["bestseller"],
    badge: "Bestseller",
    url: "/images/products/ocean-spritz-10ml.jpg",
  },
  {
    id: "frag-10-005",
    name: "Stick With Me (10ml)",
    price: 25,
    category: "Fragrance",
    description:
      "Memorable and captivating scent that stays with you throughout the day.",
    imageBg:
      "bg-gradient-to-br from-emerald-200 via-emerald-100 to-emerald-300 dark:from-emerald-900 dark:via-emerald-800 dark:to-emerald-700",
    url: "/images/products/stick-with-me-10ml.jpg",
  },
  // Fragrance - 100ml
  {
    id: "frag-100-001",
    name: "Heavenly (100ml)",
    price: 145,
    category: "Fragrance",
    description:
      "Divine and ethereal fragrance in a generous 100ml size for lasting elegance.",
    imageBg:
      "bg-gradient-to-br from-blue-200 via-blue-100 to-blue-300 dark:from-blue-900 dark:via-blue-800 dark:to-blue-700",
    tags: ["bestseller"],
    badge: "Bestseller",
    url: "/images/products/heavenly-100ml.jpg",
  },
  {
    id: "frag-100-002",
    name: "Stick With Me (100ml)",
    price: 165,
    category: "Fragrance",
    description:
      "Memorable and captivating scent in a luxurious 100ml size that lasts.",
    imageBg:
      "bg-gradient-to-br from-emerald-200 via-emerald-100 to-emerald-300 dark:from-emerald-900 dark:via-emerald-800 dark:to-emerald-700",
    url: "/images/products/stick-with-me-100ml.jpg",
  },
  {
    id: "frag-100-003",
    name: "Diamond Woods (100ml)",
    price: 165,
    category: "Fragrance",
    description:
      "Luxurious woody scent with sparkling elegance in a generous 100ml bottle.",
    imageBg:
      "bg-gradient-to-br from-amber-200 via-amber-100 to-amber-300 dark:from-amber-900 dark:via-amber-800 dark:to-amber-700",
    url: "/images/products/diamond woods-100ml.jpeg",
  },
  {
    id: "frag-100-004",
    name: "Aura Noir (100ml)",
    price: 145,
    category: "Fragrance",
    description:
      "Mysterious dark fragrance with an alluring aura in a premium 100ml size.",
    imageBg:
      "bg-gradient-to-br from-gray-200 via-gray-100 to-gray-300 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700",
    url: "/images/products/aura-noir-100ml.jpeg",
  },
  {
    id: "frag-100-005",
    name: "Ocean Spritz (100ml)",
    price: 165,
    category: "Fragrance",
    description:
      "Fresh oceanic breeze in a generous 100ml bottle, refreshing and invigorating.",
    imageBg:
      "bg-gradient-to-br from-cyan-200 via-cyan-100 to-cyan-300 dark:from-cyan-900 dark:via-cyan-800 dark:to-cyan-700",
    url: "/images/products/ocean-spritz-100ml.jpeg",
  },
  // Haircare & Wig
  {
    id: "hair-001",
    name: "Nourishing Leave-In Hair Conditioner (300ml)",
    price: 30,
    category: "Haircare & Wig",
    description:
      "Deeply nourishing leave-in conditioner that restores and protects your hair's natural shine and strength.",
    imageBg:
      "bg-gradient-to-br from-green-200 via-green-100 to-green-300 dark:from-green-900 dark:via-green-800 dark:to-green-700",
    tags: ["bestseller"],
    badge: "Bestseller",
    url: "/images/products/leave-in-conditioner.png",
  },
  {
    id: "hair-002",
    name: "Ayurvedic Revive Hair Growth Oil (60ml)",
    price: 35,
    category: "Haircare & Wig",
    description:
      "Traditional Ayurvedic formula enriched with natural ingredients to promote healthy hair growth and vitality.",
    imageBg:
      "bg-gradient-to-br from-yellow-200 via-yellow-100 to-yellow-300 dark:from-yellow-900 dark:via-yellow-800 dark:to-yellow-700",
    url: "/images/products/ayurvedic.png",
  },
  // Skincare
  {
    id: "skincare-001",
    name: "Lemon Cleansing Body Wash – Enriched with Vitamin C",
    price: 60,
    category: "Skincare",
    description:
      "Refreshing body wash infused with lemon and Vitamin C for bright, clean skin.",
    imageBg:
      "bg-gradient-to-br from-yellow-200 via-yellow-100 to-yellow-300 dark:from-yellow-900 dark:via-yellow-800 dark:to-yellow-700",
    tags: ["bestseller"],
    badge: "Bestseller",
    url: "/images/products/lemon_cleansing.png",
  },
  {
    id: "skincare-002",
    name: "Body Highlighter Oil (100ml)",
    price: 40,
    category: "Skincare",
    description:
      "Luxurious body oil that adds a radiant glow and nourishes your skin.",
    imageBg:
      "bg-gradient-to-br from-amber-200 via-amber-100 to-amber-300 dark:from-amber-900 dark:via-amber-800 dark:to-amber-700",
    url: "/images/products/body_highlighter.png",
  },
  {
    id: "skincare-003",
    name: "Moroccan Black Soap (500g)",
    price: 45,
    category: "Skincare",
    description:
      "Traditional Moroccan black soap deeply cleanses and exfoliates for smooth, glowing skin.",
    imageBg:
      "bg-gradient-to-br from-gray-200 via-gray-100 to-gray-300 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700",
    url: "/images/products/moroccan_black_soap.png",
  },
  {
    id: "skincare-004",
    name: "Advanced Hydrating Facial Mist (100ml)",
    price: 30,
    category: "Skincare",
    description:
      "Advanced formula facial mist that instantly hydrates and refreshes your skin throughout the day.",
    imageBg:
      "bg-gradient-to-br from-blue-200 via-blue-100 to-blue-300 dark:from-blue-900 dark:via-blue-800 dark:to-blue-700",
    url: "/images/products/advanced-hydrating.png",
  },
  {
    id: "skincare-005",
    name: "Silk Glow Moisturizer & Visible glow (300ml)",
    price: 45,
    category: "Skincare",
    description:
      "Silky smooth moisturizer that delivers visible glow and deep hydration for radiant skin.",
    imageBg:
      "bg-gradient-to-br from-pink-200 via-pink-100 to-pink-300 dark:from-pink-900 dark:via-pink-800 dark:to-pink-700",
    tags: ["bestseller", "new"],
    badge: "New",
    url: "/images/products/silk-glow-lotion.png",
  },
  {
    id: "skincare-006",
    name: "Lip Balm",
    price: 25,
    category: "Skincare",
    description:
      "Nourishing lip balm that keeps your lips soft, smooth, and hydrated.",
    imageBg:
      "bg-gradient-to-br from-rose-200 via-rose-100 to-rose-300 dark:from-rose-900 dark:via-rose-800 dark:to-rose-700",
    url: "/images/products/pink-lips.png",
  },
  {
    id: "skincare-007",
    name: "Radiance Renewal Day Cream & Revitalizing Night Cream",
    price: 50,
    category: "Skincare",
    description:
      "Complete skincare duo: day cream for radiance and night cream for deep revitalization.",
    imageBg:
      "bg-gradient-to-br from-purple-200 via-purple-100 to-purple-300 dark:from-purple-900 dark:via-purple-800 dark:to-purple-700",
    tags: ["bestseller", "new"],
    badge: "New",
    url: "/images/products/renewal-day-cream.png",
  },
  {
    id: "skincare-008",
    name: "Glow Guard (50ml)",
    price: 35,
    category: "Skincare",
    description:
      "Protective skincare formula that guards and enhances your natural glow.",
    imageBg:
      "bg-gradient-to-br from-indigo-200 via-indigo-100 to-indigo-300 dark:from-indigo-900 dark:via-indigo-800 dark:to-indigo-700",
    tags: ["new"],
    badge: "New",
    url: "/images/products/glow-guard.png",
  },
  {
    id: "skincare-009",
    name: "Vitamin-C Serum",
    price: 40,
    category: "Skincare",
    description:
      "Potent Vitamin-C serum that brightens, evens tone, and protects against environmental damage.",
    imageBg:
      "bg-gradient-to-br from-orange-200 via-orange-100 to-orange-300 dark:from-orange-900 dark:via-orange-800 dark:to-orange-700",
    tags: ["bestseller"],
    badge: "Bestseller",
    url: "/images/products/c-restore.png",
  },
  {
    id: "skincare-010",
    name: "Silk Glow Exfoliating Soap",
    price: 20,
    category: "Skincare",
    description:
      "Gentle exfoliating soap that reveals silky smooth, glowing skin with each use.",
    imageBg:
      "bg-gradient-to-br from-pink-200 via-pink-100 to-pink-300 dark:from-pink-900 dark:via-pink-800 dark:to-pink-700",
    url: "/images/products/silk-glow-soap.png",
  },
  {
    id: "skincare-011",
    name: "Radiant Glow Exfoliating Soap Savon",
    price: 20,
    category: "Skincare",
    description:
      "Artisanal exfoliating soap that polishes skin to reveal a radiant, luminous glow.",
    imageBg:
      "bg-gradient-to-br from-amber-200 via-amber-100 to-amber-300 dark:from-amber-900 dark:via-amber-800 dark:to-amber-700",
    url: "/images/products/radiant-glow-soap.png",
  },
  {
    id: "skincare-012",
    name: "Pure Glow Exfoliating Soap",
    price: 20,
    category: "Skincare",
    description:
      "Pure, natural exfoliating soap for clean, glowing skin that feels fresh and renewed.",
    imageBg:
      "bg-gradient-to-br from-teal-200 via-teal-100 to-teal-300 dark:from-teal-900 dark:via-teal-800 dark:to-teal-700",
    url: "/images/products/pure-glow-soap.png",
  },
  {
    id: "skincare-013",
    name: "Shine Muse Body Oil (200ml)",
    price: 35,
    category: "Skincare",
    description:
      "Luxurious body oil that leaves your skin shining with a muse-like radiance.",
    imageBg:
      "bg-gradient-to-br from-amber-200 via-amber-100 to-amber-300 dark:from-amber-900 dark:via-amber-800 dark:to-amber-700",
    url: "/images/products/shine-muse.png",
  },
  {
    id: "skincare-014",
    name: "Magic Glass Skin (100ml)",
    price: 40,
    category: "Skincare",
    description:
      "Transform your skin to glass-like perfection with this magical formula for flawless radiance.",
    imageBg:
      "bg-gradient-to-br from-sky-200 via-sky-100 to-sky-300 dark:from-sky-900 dark:via-sky-800 dark:to-sky-700",
    tags: ["bestseller"],
    badge: "Bestseller",
    url: "/images/products/magic-glass.png",
  },
  {
    id: "skincare-015",
    name: "Pure Glow Hydrates & Brightens (300ml)",
    price: 45,
    category: "Skincare",
    description:
      "Intensive moisturizer that hydrates deeply while brightening your skin for a pure glow.",
    imageBg:
      "bg-gradient-to-br from-green-200 via-green-100 to-green-300 dark:from-green-900 dark:via-green-800 dark:to-green-700",
    url: "/images/products/pure-glow-lotion.png",
  },
  {
    id: "skincare-016",
    name: "Radiant Glow Moisturize & Luminate (300ml)",
    price: 45,
    category: "Skincare",
    description:
      "Radiant moisturizer that illuminates and hydrates, leaving your skin glowing and luminous.",
    imageBg:
      "bg-gradient-to-br from-yellow-200 via-yellow-100 to-yellow-300 dark:from-yellow-900 dark:via-yellow-800 dark:to-yellow-700",
    url: "/images/products/radiant-glow-lotion.png",
  },
  {
    id: "skincare-017",
    name: "Derma Restore – foamy Cleanser (100ml)",
    price: 30,
    category: "Skincare",
    description:
      "Gentle foamy cleanser that restores and cleanses your skin without stripping natural oils.",
    imageBg:
      "bg-gradient-to-br from-cyan-200 via-cyan-100 to-cyan-300 dark:from-cyan-900 dark:via-cyan-800 dark:to-cyan-700",
    url: "/images/products/derma-restore.png",
  },
];
