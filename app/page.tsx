// src/app/page.tsx
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
// import ThumbnailGallery from '@/components/ThumbnailGallery';
import StatsSection from '@/components/StatsSection';
import FeaturedInventory from '@/components/FeaturedInventory';
import WhyRabiu from '@/components/WhyRabiu';
import FinanceCalculator from '@/components/FinanceCalculator';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <Navbar />
      <Hero />
      <StatsSection/>
      <FeaturedInventory/>
      <WhyRabiu/>
      <FinanceCalculator/>
      <Footer/>
    </main>
  );
}