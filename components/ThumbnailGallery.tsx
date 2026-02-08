// src/components/ThumbnailGallery.tsx
"use client";
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const CAR_PREVIEWS = [
  { id: 1, label: "Interior View", img: "/hero-car-blue.png" },
  { id: 2, label: "See More", img: "https://placehold.co/300x200/1a1a1a/ffffff?text=Side+Profile" },
];

export default function ThumbnailGallery() {
  const root = useRef(null);

  useEffect(() => {
    gsap.from(".thumb-card", {
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      delay: 1, // Let the main hero finish first
      ease: "back.out(1.7)"
    });
  }, []);

  return (
    <div ref={root} className="absolute bottom-12 left-12 z-20 flex gap-4 border-2 border-black">
      {CAR_PREVIEWS.map((car) => (
        <div 
          key={car.id} 
          className="thumb-card group relative w-48 h-28 overflow-hidden cursor-pointer border border-white/10"
        >
          <img 
            src={car.img} 
            alt={car.label} 
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500" 
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-100 group-hover:bg-black/20 transition-colors">
            <span className="text-white text-xs font-bold uppercase tracking-widest">{car.label}</span>
          </div>
        </div>
      ))}
    </div>
  );
}