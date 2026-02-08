"use client";
import { useState, useRef, useEffect, useCallback } from 'react'; // Added useEffect and useCallback
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Image from 'next/image';
import { CarColor } from '@/types/CarColor';

const CAR_COLORS = [
  { id: 'blue', hex: '#00C2FF', name: 'Cyan Blue', img: '/hero-car-blue.png' },
  { id: 'red', hex: '#E63946', name: 'Sport Red', img: '/hero-car-red.png' },
  { id: 'black', hex: '#1A1A1A', name: 'Night Black', img: '/hero-car-black.png' },
];

export default function Hero() {
  const containerRef = useRef(null);
  const carRef = useRef(null);
  const [activeColor, setActiveColor] = useState(CAR_COLORS[0]);
  const [isAnimating, setIsAnimating] = useState(false);

  // 1. Entrance & Idle Animations
  useGSAP(() => {
    const tl = gsap.timeline();
    
    tl.from(".bg-stripe", { scaleY: 0, transformOrigin: "top", duration: 1.2, stagger: 0.15, ease: "expo.inOut" })
      .from(".reveal-text", { y: 40, opacity: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" }, "-=0.6")
      .from(carRef.current, { x: 200, opacity: 0, duration: 1.2, ease: "power4.out" }, "-=1");

    gsap.to(carRef.current, {
      y: -15,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  }, { scope: containerRef });

  // 2. Enhanced Color Swapping (Wrapped in useCallback to use in useEffect)
  const handleColorChange = useCallback((color: CarColor) => {
  if (color.id === activeColor.id || isAnimating) return;
  setIsAnimating(true);
  
  const tl = gsap.timeline({
    onComplete: () => setIsAnimating(false)
  });

  // Smooth slide out to the left, slide in from the right
  tl.to(carRef.current, { x: -100, opacity: 0, duration: 0.4, ease: "power2.in" })
    .call(() => setActiveColor(color))
    .set(carRef.current, { x: 100 }) 
    .to(carRef.current, { x: 0, opacity: 1, duration: 0.6, ease: "back.out(1.2)" });

  gsap.to(".bg-stripe-dynamic", {
    backgroundColor: color.hex,
    duration: 0.8
  });
}, [activeColor.id, isAnimating]);

  // 3. Automatic Rotation Logic
  useEffect(() => {
    const interval = setInterval(() => {
      // Find the index of the current color and move to the next one
      const currentIndex = CAR_COLORS.findIndex(c => c.id === activeColor.id);
      const nextIndex = (currentIndex + 1) % CAR_COLORS.length;
      
      // Only trigger if we aren't currently mid-animation (prevents queue buildup)
      if (!isAnimating) {
        handleColorChange(CAR_COLORS[nextIndex]);
      }
    }, 5000); // Change color every 5 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [activeColor, isAnimating, handleColorChange]);

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center bg-[#F8F9FA] overflow-hidden pt-15">
      {/* Background Graphic Elements */}
      <div className="absolute right-0 top-0 h-full w-full lg:w-1/3 flex justify-end gap-2 lg:gap-4 px-4 lg:px-12 pointer-events-none opacity-20 lg:opacity-100">
        <div className="bg-stripe w-16 lg:w-24 bg-zinc-900 h-full relative" />
        <div className="bg-stripe bg-stripe-dynamic w-16 lg:w-24 h-full relative" style={{ backgroundColor: activeColor.hex }}>
            <span className="hidden lg:block absolute bottom-20 left-1/2 -translate-x-1/2 rotate-180 [writing-mode:vertical-lr] text-white/20 font-black text-8xl uppercase tracking-[0.2em]">RABIU</span>
        </div>
        <div className="bg-stripe w-16 lg:w-24 bg-zinc-900 h-full relative" />
      </div>

      <div className="container mx-auto px-6 lg:px-20 z-10">
        <div className="grid lg:grid-cols-12 items-center gap-12">
          
          {/* Text Content */}
          <div className="lg:col-span-5 order-2 lg:order-1 space-y-8">
            <div className="space-y-4">
               <div className="overflow-hidden">
                <h1 className="reveal-text text-5xl lg:text-7xl font-black text-zinc-900 leading-[0.9] tracking-tighter">
                  Your <br />
                  <span style={{ color: activeColor.hex }} className="transition-colors duration-700 italic">Next Car </span>
                  Awaits
                </h1>
              </div>
              <p className="reveal-text text-zinc-500 max-w-md text-lg leading-relaxed">
                Why go far to get your next auto, when you can shop with <span style={{ color: activeColor.hex }} className="transition-colors duration-700 italic font-semibold">Rabiu</span>?
              </p>
            </div>

            {/* CTAs */}
            <div className="reveal-text flex flex-wrap items-center gap-6 pt-4">
              <button className="bg-zinc-900 text-white px-10 py-5 font-bold hover:bg-black transition-transform active:scale-95 uppercase tracking-wider shadow-2xl shadow-zinc-400">
                Shop Now
              </button>
            </div>
          </div>

          {/* Car Image Display */}
          <div className="lg:col-span-7 order-1 lg:order-2 relative h-[300px] lg:h-[600px] flex items-center justify-center">
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[80%] h-12 bg-black/20 blur-3xl rounded-[100%] pointer-events-none" />
            
            <div ref={carRef} className="relative z-20 w-full select-none">
              <Image 
                src={activeColor.img} 
                alt="Toyota Raize" 
                width={1000} 
                height={600} 
                className="object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.1)]"
                priority
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}