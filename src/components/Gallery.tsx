"use client";

import { useEffect, useRef, useState } from "react";
import GalleryImage from "./GalleryImage";

const galleryItems: { src: string; label: string; type: "image" | "video" }[] = [
  { src: "https://res.cloudinary.com/dxv6sw1ce/image/upload/v1774319369/IMG_0324_bnc6b2.jpg", label: "Live at 'THEATA' London", type: "image" },
  { src: "https://res.cloudinary.com/dxv6sw1ce/image/upload/v1774319369/IMG_0316_fgpenw.jpg", label: "Live at 'THEATA' London", type: "image" },
  { src: "https://res.cloudinary.com/dxv6sw1ce/video/upload/v1774319426/250702_Clip_2_v1_iyvojg.mp4", label: "Knossos 'POLIS' @ B London 2025", type: "video" },
  { src: "https://res.cloudinary.com/dxv6sw1ce/image/upload/v1774319281/IMG_0847_zmimfq.jpg", label: "Live @ How Matcha 2026", type: "image" },
  { src: "https://res.cloudinary.com/dxv6sw1ce/image/upload/v1774319243/IMG_0863_yrjrxe.jpg", label: "Santiago & Jivan Calderone, Ibiza 2025", type: "image" },
  { src: "https://res.cloudinary.com/dxv6sw1ce/video/upload/v1774319312/Santi_Clip_1_v1_puuvs8.mp4", label: "Knossos 'APHRODITE' @ Gallery 2025", type: "video" },
  { src: "https://res.cloudinary.com/dxv6sw1ce/image/upload/v1774319242/_P1A9944_Original_2_flhcmx.jpg", label: "Blueshade @ City Winery 2025", type: "image" },
  { src: "https://res.cloudinary.com/dxv6sw1ce/image/upload/v1774319242/WhatsApp_Image_2026-03-09_at_19.29.59_pufmrm.jpg", label: "Blueshade @ City Winery 2025", type: "image" },
  { src: "https://res.cloudinary.com/dxv6sw1ce/video/upload/v1774319269/CANVAS_GUITAR_SOLO_INSTA_jlsbgz.mp4", label: "Canvas Guitar Solo", type: "video" },
  { src: "https://res.cloudinary.com/dxv6sw1ce/image/upload/v1774319240/WhatsApp_Image_2026-03-09_at_19.31.05_nsj6cx.jpg", label: "Live @ The Bitter End w/ Richie Cannata 2023", type: "image" },
  { src: "https://res.cloudinary.com/dxv6sw1ce/image/upload/v1774319240/IMG_0260_rma2n7.jpg", label: "School of Rock the Musical, 2018", type: "image" },
  { src: "https://res.cloudinary.com/dxv6sw1ce/image/upload/v1774319240/WhatsApp_Image_2026-03-09_at_19.28.37_tbmmot.jpg", label: "", type: "image" },
  { src: "https://res.cloudinary.com/dxv6sw1ce/image/upload/v1776006975/IMG_1614_zoav30.jpg", label: "Blueshade @ Bob & Barbs, March 2026", type: "image" },
  { src: "https://res.cloudinary.com/dxv6sw1ce/image/upload/v1776006975/IMG_1612_ob6izw.jpg", label: "Blueshade @ Bob & Barbs, March 2026", type: "image" },
  { src: "https://res.cloudinary.com/dxv6sw1ce/image/upload/v1776007833/2026_03_14_-_RendezVous_club77_x_visionseven_116_dqwzvu.jpg", label: "Live Guitar & DJ Set @ 77 London w/ Rendezvous", type: "image" },
  { src: "https://res.cloudinary.com/dxv6sw1ce/image/upload/v1776007834/2026_03_14_-_RendezVous_club77_x_visionseven_120_c6ttqd.jpg", label: "Live Guitar & DJ Set @ 77 London w/ Rendezvous", type: "image" },
  { src: "https://res.cloudinary.com/dxv6sw1ce/image/upload/v1776007835/2026_03_14_-_RendezVous_club77_x_visionseven_141_xaync0.jpg", label: "Live Guitar & DJ Set @ 77 London w/ Rendezvous", type: "image" },
  { src: "https://res.cloudinary.com/dxv6sw1ce/video/upload/v1776008150/Tiamo_Mote_Apr_20_2010_g2zzn5.mp4", label: "Live Guitar & DJ Set @ 77 London w/ Rendezvous", type: "video" },
  { src: "https://res.cloudinary.com/dxv6sw1ce/video/upload/v1776008150/Tiamo_Mote_04.01.44_psfmdb.mp4", label: "Live Guitar & DJ Set @ 77 London w/ Rendezvous", type: "video" },
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
            isHovered={hoveredIndex === i}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
          />
        ))}
      </div>
    </div>
  );
}
