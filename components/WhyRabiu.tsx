"use client";
import { useRef } from 'react';
import { gsap } from "@/lib/gsap";
import { useGSAP } from '@gsap/react';

export default function WhyRabiu() {
  const container = useRef(null);
  const revealOverlay = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top 70%",
      }
    });

    tl.to(revealOverlay.current, { xPercent: 101, duration: 1, ease: "expo.inOut" })
      .from(".advantage-item", { opacity: 0, x: 30, stagger: 0.2, duration: 0.8 }, "-=0.5");
  }, { scope: container });

  return (
    <section ref={container} className="py-24 bg-[#F8F9FA] overflow-hidden">
      <div className="container mx-auto px-6 lg:px-20 grid lg:grid-cols-2 gap-16 items-center">
        {/* Left: Animated Image */}
        <div className="relative h-[500px] w-full bg-zinc-200">
          <div ref={revealOverlay} className="absolute inset-0 bg-zinc-900 z-10" />
          <img 
            src="/mechanic-check.webp" 
            alt="Quality Check" 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right: Content */}
        <div className="space-y-10">
          <h2 className="text-4xl lg:text-6xl font-black tracking-tighter uppercase">
            The Rabiu <span className="block text-blue-600">Standard</span>
          </h2>
          
          <div className="space-y-8">
            {[
              { title: "200-Point Inspection", desc: "Every vehicle undergoes a rigorous mechanical and safety check." },
              { title: "7-Day Buy Back", desc: "Not in love? Bring it back within a week, no questions asked." },
              { title: "Transparent Pricing", desc: "The price you see is the price you pay. No hidden dealer fees." }
            ].map((item, i) => (
              <div key={i} className="advantage-item border-l-4 border-zinc-900 pl-6">
                <h3 className="text-xl font-bold uppercase">{item.title}</h3>
                <p className="text-zinc-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}