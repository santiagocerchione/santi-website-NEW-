"use client";

import { useState } from "react";

const polaroids = [
  { src: "/gallery/theata-london-01.webp", alt: "Polaroid 1", rotation: -7 },
  { src: "/gallery/how-matcha-2026.webp", alt: "Polaroid 2", rotation: 3 },
  { src: "/gallery/city-winery-2025-01.webp", alt: "Polaroid 3", rotation: -2 },
  { src: "/gallery/theata-london-02.webp", alt: "Polaroid 4", rotation: 5 },
  { src: "/gallery/jivan-calderone-ibiza-2025.webp", alt: "Polaroid 5", rotation: -4 },
  { src: "/gallery/city-winery-2025-02.webp", alt: "Polaroid 6", rotation: 2 },
  { src: "/gallery/bitter-end-2023.webp", alt: "Polaroid 7", rotation: -5 },
  { src: "/gallery/school-of-rock-2018.webp", alt: "Polaroid 8", rotation: 4 },
  { src: "/gallery/archive-01.webp", alt: "Polaroid 9", rotation: -3 },
];

const links = [
  { label: "SOUNDCLOUD", href: "https://soundcloud.com/scerchione?utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing" },
  { label: "INSTAGRAM", href: "https://www.instagram.com/santiagocerchione/" },
  { label: "TIKTOK", href: "https://www.tiktok.com/@santiagocerchione?_r=1&_t=ZN-958Ln33zWC6" },
  { label: "YOUTUBE", href: "https://www.youtube.com/@Knossosmusic" },
  { label: "EMAIL", href: "mailto:knossosevents@gmail.com" },
];

export default function Contact() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handlePolaroidTap = (i: number) => {
    setHoveredIndex((prev) => (prev === i ? null : i));
  };

  return (
    <section id="contact" className="relative min-h-[80vh] lg:h-screen overflow-hidden bg-background">
      {/* Section label */}
      <div className="absolute top-8 left-0 right-0 z-10 flex justify-center">
        <span className="text-xs font-medium uppercase tracking-widest leading-none text-foreground-secondary">
          CONTACT ME
        </span>
      </div>

      {/* Social links */}
      <div className="absolute inset-0 z-10 flex items-center justify-center -translate-y-[15%] pointer-events-none">
        <div className="flex flex-col gap-2 text-sm lg:flex-row lg:gap-8 lg:text-sm font-medium tracking-widest leading-none text-foreground pointer-events-auto text-center">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              {...(link.href !== "#" ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="py-1 lg:py-0 underline-offset-4 decoration-foreground/0 hover:decoration-foreground underline transition-[text-decoration-color] duration-300 ease-out"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>

      {/* Polaroid row */}
      <div className="absolute bottom-0 left-0 right-0 z-20 translate-y-8">
        <div className="flex justify-center -mx-4 lg:-mx-16">
          {polaroids.map((p, i) => {
            const isHovered = hoveredIndex === i;
            return (
              <div
                key={i}
                className={`relative -mx-4 lg:-mx-10 cursor-pointer ${i >= 4 ? "hidden lg:block" : ""}`}
                style={{
                  transform: `rotate(${p.rotation}deg) translateY(${isHovered ? "-24px" : "0px"})`,
                  zIndex: polaroids.length - Math.abs(i - polaroids.length / 2),
                  transition: "transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                }}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => handlePolaroidTap(i)}
              >
                <div
                  className="bg-white p-2 pb-8 lg:p-3 lg:pb-14"
                  style={{
                    boxShadow: isHovered
                      ? "0 20px 40px rgba(0,0,0,0.3), 0 8px 16px rgba(0,0,0,0.2)"
                      : "0 4px 12px rgba(0,0,0,0.15), 0 2px 4px rgba(0,0,0,0.1)",
                    transition: "box-shadow 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.src}
                    alt={p.alt}
                    className="h-48 w-36 lg:h-80 lg:w-64 object-cover"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
