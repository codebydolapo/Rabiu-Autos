"use client";
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Image from 'next/image';
import { CARS } from '@/data/CARS';
import Link from 'next/link';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function FeaturedInventory() {
  const container = useRef(null);

  useGSAP(() => {
    // The "Batch" method animates groups of elements as they scroll into view
    ScrollTrigger.batch(".car-card", {
      onEnter: (elements) => {
        gsap.fromTo(elements,
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.15, duration: 0.8, ease: "power3.out", overwrite: true }
        );
      },
      once: true // Only animate once
    });
  }, { scope: container });

  return (
    <section ref={container} className="py-24 bg-white">
      <div className="container mx-auto px-6 lg:px-20">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-4">
            <h2 className="text-4xl lg:text-5xl font-black text-zinc-900 tracking-tighter uppercase">
              Featured <span className="text-zinc-400">Inventory</span>
            </h2>
            <p className="text-zinc-500 max-w-md">
              Hand-picked premium vehicles inspected for quality and performance.
            </p>
          </div>
          {/* <Link href="/shop"> */}
            <button className="px-8 py-4 border-2 border-zinc-900 font-bold uppercase tracking-widest hover:bg-zinc-900 hover:text-white transition-all active:scale-95">
              View All Stock
            </button>
          {/* </Link> */}
        </div>

        {/* Inventory Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CARS.map((car) => (
            // <Link href={`/shop/${car.id}`}>
              <div key={car.id} className="car-card opacity-0 group cursor-pointer">
                <div className="relative aspect-[16/10] bg-zinc-100 overflow-hidden mb-6">
                  <Image
                    src={car.image}
                    alt={car.name}
                    fill
                    className="object-contain group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-6 left-6 bg-white px-3 py-1 text-xs font-bold uppercase tracking-widest shadow-sm rounded-full">
                    {car.brand}
                  </div>
                </div>

                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-zinc-900 group-hover:text-blue-600 transition-colors">
                      {car.name}
                    </h3>
                    <p className="text-zinc-400 font-medium">{car.mileage} • Automatic</p>
                  </div>
                  <p className="text-xl font-black text-zinc-900">₦{car.price}M</p>
                </div>
              </div>
            // </Link>
          ))}
        </div>
      </div>
    </section >
  );
}