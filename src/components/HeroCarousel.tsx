"use client";

import { useEffect, useCallback, useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

const carouselItems = [
  {
    id: 1,
    image: "/images/hero/hero1.png", // Mobile/Tablet default
    imageLg: "/images/hero/glow.jpeg", // Large & Extra-Large screens
    alt: "Beauty product showcase 1",
  },
  {
    id: 2,
    image: "/images/hero/hero2.jpg",
    imageLg: "/images/hero/empower.jpeg", // Large & Extra-Large screens
    alt: "Beauty product showcase 2",
  },
  {
    id: 3,
    image: "/images/hero/hero4.jpeg",
    imageLg: "/images/hero/elevate.png", // Large & Extra-Large screens
    alt: "Beauty product showcase 4",
  },
];

export function HeroCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 20 }, [
    Autoplay({ delay: 5000, stopOnInteraction: false }),
  ]);

  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="h-full w-full overflow-hidden" ref={emblaRef}>
        <div className="flex h-full">
          {carouselItems.map((item) => (
            <div key={item.id} className="relative min-w-full flex-shrink-0">
              {/* Background Image - Mobile/Tablet */}
              <div className="absolute inset-0 lg:hidden">
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  className="object-cover object-top"
                  priority={item.id === 1}
                  sizes="100vw"
                  unoptimized
                />
              </div>
              {/* Background Image - Large & Extra-Large Screens */}
              <div className="absolute inset-0 hidden lg:block">
                <Image
                  src={item.imageLg || item.image}
                  alt={item.alt}
                  fill
                  className="object-cover object-top"
                  priority={item.id === 1}
                  sizes="100vw"
                  unoptimized
                />
              </div>
              {/* Overlay for better text readability */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/40" />
              {/* Optional decorative overlays - can be removed if not needed */}
              <div className="absolute inset-0 opacity-30">
                <div className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-gradient-to-br from-[#7A5844]/20 to-[#4A322A]/15 blur-3xl" />
                <div className="absolute -bottom-20 -left-20 h-96 w-96 rounded-full bg-gradient-to-br from-[#4A322A]/20 to-[#7A5844]/15 blur-3xl" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Carousel indicators */}
      <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-2">
        {carouselItems.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === selectedIndex
                ? "w-8 bg-[#4A322A] dark:bg-[#7A5844]"
                : "w-2 bg-[#4A322A]/40 dark:bg-[#7A5844]/40 hover:bg-[#4A322A]/60"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
