"use client";
import { useRef } from 'react';
import { gsap } from "@/lib/gsap";
import { useGSAP } from '@gsap/react';

const STATS = [
  { label: "Cars Sold", value: 1250, suffix: "+" },
  { label: "Customer Rating", value: 4.9, suffix: "/5", decimals: 1 },
  { label: "Service Centers", value: 18, suffix: "" },
];

export default function StatsSection() {
  // Added proper typing to the container ref
  const container = useRef<HTMLElement>(null);
  const numberRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useGSAP(() => {
    STATS.forEach((stat, i) => {
      const target = numberRefs.current[i];
      if (!target) return;

      const obj = { count: 0 };

      gsap.to(obj, {
        count: stat.value,
        duration: 2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: target,
          start: "top 85%",
          toggleActions: "play none none none",
        },
        onUpdate: () => {
          target.innerText = obj.count.toFixed(stat.decimals || 0);
        }
      });
    });
  }, { scope: container });

  return (
    <section ref={container} className="py-24 bg-zinc-900 text-white">
      <div className="container mx-auto px-6 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          {STATS.map((stat, i) => (
            <div key={i} className="space-y-2">
              <div className="text-5xl lg:text-7xl font-black tracking-tighter flex justify-center items-baseline">
                <span ref={(el) => { numberRefs.current[i] = el; }}>0</span>
                <span className="text-blue-500">{stat.suffix}</span>
              </div>
              <p className="text-zinc-400 uppercase tracking-widest text-sm font-bold">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}