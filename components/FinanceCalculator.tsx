"use client";
import { useState, useEffect, useRef } from 'react';
import { gsap } from "@/lib/gsap";

export default function FinanceCalculator() {
  const [price, setPrice] = useState(3000000);
  const [downPayment, setDownPayment] = useState(50000);
  const [term, setTerm] = useState(60); // months
  const [monthly, setMonthly] = useState(0);
  const displayRef = useRef(null);

  const calculatePayment = () => {
    const principal = price - downPayment;
    const interest = 0.05 / 12; // Static 5% APR for example
    const payment = (principal * interest) / (1 - Math.pow(1 + interest, -term));
    
    // Animate the number change
    const obj = { val: monthly };
    gsap.to(obj, {
      val: payment,
      duration: 0.5,
      onUpdate: () => setMonthly(obj.val)
    });
  };

  useEffect(calculatePayment, [price, downPayment, term]);

  return (
    <section className="py-24 bg-zinc-900 text-white">
      <div className="container mx-auto px-6 lg:px-20">
        <div className="bg-white/5 p-8 lg:p-16 border border-white/10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            <div className="space-y-8">
              <h2 className="text-4xl font-black uppercase tracking-tighter">Finance <br/> Calculator</h2>
              
              {/* Sliders */}
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs uppercase font-bold text-zinc-400">Vehicle Price (₦{price.toLocaleString()})</label>
                  <input type="range" min="10000" max="150000" step="1000" value={price} onChange={(e) => setPrice(Number(e.target.value))} className="w-full accent-blue-600" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase font-bold text-zinc-400">Down Payment (₦{downPayment.toLocaleString()})</label>
                  <input type="range" min="0" max="50000" step="500" value={downPayment} onChange={(e) => setDownPayment(Number(e.target.value))} className="w-full accent-blue-600" />
                </div>
              </div>
            </div>

            {/* Result Display */}
            <div className="bg-blue-600 p-12 text-center space-y-4">
              <p className="uppercase font-bold tracking-widest text-sm opacity-80">Estimated Monthly Payment</p>
              <div className="text-6xl lg:text-8xl font-black tracking-tighter">
                ₦{Math.round(monthly)}
              </div>
              <button className="mt-6 w-full py-4 bg-zinc-900 font-bold uppercase hover:bg-black transition-colors">
                Apply for financing
              </button>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}