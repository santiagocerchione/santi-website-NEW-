"use client";

import { useEffect, useRef, useState } from "react";
import GalleryImage from "./GalleryImage";

const galleryItems: { src: string; label: string; type: "image" | "video"; poster?: string }[] = [
  { src: "/gallery/soho-live-2026-01.webp", label: "Something Blue @ Soho Live, August 2026", type: "image" },
  { src: "/gallery/theata-london-01.webp", label: "Live at 'THEATA' London", type: "image" },
  { src: "/gallery/knossos-polis-2025.mp4", label: "Knossos 'POLIS' @ B London 2025", type: "video", poster: "/gallery/knossos-polis-2025-poster.webp" },
  { src: "/gallery/rendezvous-club77-01.webp", label: "Live Guitar & DJ Set @ 77 London w/ Rendezvous", type: "image" },
  { src: "/gallery/laurie-beechman-2026-01.webp", label: "Something Blue @ Laurie Beechman Theatre, April 2026", type: "image" },
  { src: "/gallery/how-matcha-2026.webp", label: "Live @ How Matcha 2026", type: "image" },
  { src: "/gallery/ziggys-2026-colour.webp", label: "Something Blue @ Ziggy's Roman Cafe, July 2026", type: "image" },
  { src: "/gallery/canvas-guitar-solo.mp4", label: "Canvas Guitar Solo", type: "video", poster: "/gallery/canvas-guitar-solo-poster.webp" },
  { src: "/gallery/bob-and-barbs-2026-01.webp", label: "Something Blue @ Bob & Barbs, March 2026", type: "image" },
  { src: "/gallery/city-winery-2025-02.webp", label: "Something Blue @ City Winery 2025", type: "image" },
  { src: "/gallery/soho-live-2026-02.webp", label: "Something Blue @ Soho Live, August 2026", type: "image" },
  { src: "/gallery/rendezvous-club77-02.webp", label: "Live Guitar & DJ Set @ 77 London w/ Rendezvous", type: "image" },
  { src: "/gallery/philadelphia-2026.webp", label: "Something Blue @ Philadelphia, April 2026", type: "image" },
  { src: "/gallery/rendezvous-club77-clip-01.mp4", label: "Live Guitar & DJ Set @ 77 London w/ Rendezvous", type: "video", poster: "/gallery/rendezvous-club77-clip-01-poster.webp" },
  { src: "/gallery/jivan-calderone-ibiza-2025.webp", label: "Santiago & Jivan Calderone, Ibiza 2025", type: "image" },
  { src: "/gallery/theata-london-02.webp", label: "Live at 'THEATA' London", type: "image" },
  { src: "/gallery/knossos-aphrodite-2025.mp4", label: "Knossos 'APHRODITE' @ Gallery 2025", type: "video", poster: "/gallery/knossos-aphrodite-2025-poster.webp" },
  { src: "/gallery/archive-01.webp", label: "", type: "image" },
  { src: "/gallery/ziggys-2026-bw.webp", label: "Something Blue @ Ziggy's Roman Cafe, July 2026", type: "image" },
  { src: "/gallery/school-of-rock-2018.webp", label: "School of Rock the Musical, 2018", type: "image" },
  { src: "/gallery/laurie-beechman-2026-02.webp", label: "Something Blue @ Laurie Beechman Theatre, April 2026", type: "image" },
  { src: "/gallery/rendezvous-club77-03.webp", label: "Live Guitar & DJ Set @ 77 London w/ Rendezvous", type: "image" },
  { src: "/gallery/bob-and-barbs-2026-02.webp", label: "Something Blue @ Bob & Barbs, March 2026", type: "image" },
  { src: "/gallery/rendezvous-club77-clip-02.mp4", label: "Live Guitar & DJ Set @ 77 London w/ Rendezvous", type: "video", poster: "/gallery/rendezvous-club77-clip-02-poster.webp" },
  { src: "/gallery/soho-live-2026-03.webp", label: "Something Blue @ Soho Live, August 2026", type: "image" },
  { src: "/gallery/bitter-end-2023.webp", label: "Live @ The Bitter End w/ Richie Cannata 2023", type: "image" },
  { src: "/gallery/city-winery-2025-01.webp", label: "Something Blue @ City Winery 2025", type: "image" },
];

export default function Gallery() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let animationId: number;
    let scrollPos = el.scrollLeft;
    const speed = 0.5;

    const scroll = () => {
      scrollPos += speed;
      if (scrollPos >= el.scrollWidth / 2) {
        scrollPos = 0;
      }
      el.scrollLeft = scrollPos;
      animationId = requestAnimationFrame(scroll);
    };

    animationId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationId);
  }, []);

  const allItems = [...galleryItems, ...galleryItems];

  return (
    <div className="relative">
      {/* Left fade */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-12 lg:w-24 bg-gradient-to-r from-white to-transparent" />
      {/* Right fade */}
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-12 lg:w-24 bg-gradient-to-l from-white to-transparent" />

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-hidden"
        onTouchStart={() => setHoveredIndex(null)}
        onTouchEnd={() => setHoveredIndex(null)}
      >
        {allItems.map((item, i) => (
          <GalleryImage
            key={i}
            src={item.src}
            label={item.label}
            type={item.type}
            poster={item.poster}
            isHovered={hoveredIndex === i}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
          />
        ))}
      </div>
    </div>
  );
}
