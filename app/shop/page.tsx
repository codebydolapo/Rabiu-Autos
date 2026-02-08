// src/app/shop/page.tsx
"use client";
import { useState } from 'react';
import { CARS } from '@/data/CARS';
import Image from 'next/image';

export default function ShopPage() {
  const [filter, setFilter] = useState('All');

  const filteredCars = filter === 'All' 
    ? CARS 
    : CARS.filter(car => car.type === filter);

  return (
    <main className="pt-32 pb-24 bg-white min-h-screen">
      <div className="container mx-auto px-6 lg:px-20">
        <h1 className="text-6xl font-black uppercase tracking-tighter mb-12">
          Explore <span className="text-zinc-400">Stock</span>
        </h1>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar Filter */}
          <aside className="w-full lg:w-64 space-y-8 h-fit lg:sticky lg:top-32">
            <div>
              <h3 className="font-bold uppercase tracking-widest text-sm mb-4">Body Type</h3>
              <div className="flex flex-col gap-3">
                {['All', 'SUV', 'Sedan', 'Luxury', 'Electric'].map((type) => (
                  <button
                    key={type}
                    onClick={() => setFilter(type)}
                    className={`text-left text-sm font-bold uppercase tracking-wider transition-colors ${
                      filter === type ? 'text-blue-600' : 'text-zinc-400 hover:text-zinc-900'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-8 border-t border-zinc-100">
              <h3 className="font-bold uppercase tracking-widest text-sm mb-4">Price Range</h3>
              <input type="range" className="w-full accent-zinc-900" min="10000" max="200000" />
              <div className="flex justify-between text-xs font-bold text-zinc-400 mt-2">
                <span>₦10M</span>
                <span>₦200M+</span>
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
              {filteredCars.map((car) => (
                <div key={car.id} className="group cursor-pointer">
                  <div className="relative aspect-video bg-zinc-100 overflow-hidden mb-4">
                    <Image 
                      src={car.image} 
                      alt={car.name} 
                      fill 
                      className="object-contain p-6 group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="text-lg font-black uppercase tracking-tight">{car.name}</h2>
                      <p className="text-sm text-zinc-500 font-bold uppercase tracking-widest">{car.type} • {car.mileage}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-black text-blue-600">₦{car.price}</p>
                      <p className="text-[10px] font-bold text-zinc-400 uppercase">Available Now</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}