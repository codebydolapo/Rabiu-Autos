"use client";
import { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

export default function Navbar() {
  const navRef = useRef(null);

  useGSAP(() => {
    // Create a trigger that changes the nav style after 100px of scroll
    ScrollTrigger.create({
      start: "top -100",
      onEnter: () => {
        gsap.to(navRef.current, {
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          backdropFilter: "blur(12px)",
          paddingTop: "1.25rem",
          paddingBottom: "1.25rem",
          borderBottom: "1px solid rgba(0,0,0,0.1)",
          duration: 0.4,
        });
      },
      onLeaveBack: () => {
        gsap.to(navRef.current, {
          backgroundColor: "transparent",
          backdropFilter: "blur(0px)",
          paddingTop: "2rem",
          paddingBottom: "2rem",
          borderBottom: "1px solid rgba(0,0,0,0)",
          duration: 0.4,
        });
      }
    });
  }, { scope: navRef });

  return (
    <nav ref={navRef} className="fixed top-0 w-full z-50 flex justify-between items-center px-6 lg:px-12 py-8 transition-all duration-300">
      <div className="text-2xl font-black tracking-tighter">RABIU<span className="text-blue-600">AUTOS</span></div>
      
      <ul className="hidden md:flex gap-12 font-bold text-xs uppercase tracking-[0.2em]">
        <li className="cursor-pointer hover:text-blue-600 transition-colors">Home</li>
        <li className="cursor-pointer hover:text-blue-600 transition-colors">Shop</li>
        <li className="cursor-pointer hover:text-blue-600 transition-colors">Blog</li>
      </ul>

      <button className="text-xs font-black uppercase tracking-widest bg-0 text-white px-6 py-3 hover:bg-blue-600 transition-colors">
        {/* Account */}
      </button>
    </nav>
  );
}