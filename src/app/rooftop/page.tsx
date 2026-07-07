import { HeroSection } from "@/components/rooftop/HeroSection";
import { ExperienceSection } from "@/components/rooftop/ExperienceSection";
import { GallerySection } from "@/components/rooftop/GallerySection";
import { FloorPlanSection } from "@/components/rooftop/FloorPlanSection";
import { ReservationSection } from "@/components/rooftop/ReservationSection";
import { MenuSection } from "@/components/rooftop/MenuSection";
import { ReviewsSection } from "@/components/rooftop/ReviewsSection";
import { StatsSection } from "@/components/rooftop/StatsSection";
import { EventsSection } from "@/components/rooftop/EventsSection";
import { FAQSection } from "@/components/rooftop/FAQSection";

import { SidebarNav } from "@/components/rooftop/SidebarNav";

export const metadata = {
  title: 'Rooftop Dining | Gokul Square',
  description: 'Elevate your dining experience. Reserve your table beneath the city lights at Gokul Square.',
};

export default function RooftopDiningPage() {
  return (
    <div className="flex bg-[#FFFFFF] min-h-screen text-[#1A1A1A] relative">
      <SidebarNav />
      <main className="flex-1 overflow-x-hidden">
        <HeroSection />
        <ExperienceSection />
        <GallerySection />
        <FloorPlanSection />
        <ReservationSection />
        <MenuSection />
        <ReviewsSection />
        <StatsSection />
        <EventsSection />
        <FAQSection />
        
        {/* Footer CTA */}
        <section className="py-24 bg-gradient-to-br from-[#FF8A00] to-[#FFC857] text-white text-center px-6">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">Ready for an unforgettable evening?</h2>
          <p className="text-xl md:text-2xl mb-10 text-white/90">Reserve Your Rooftop Table Today</p>
          <a href="#reserve" className="inline-block bg-white text-[#FF8A00] px-10 py-4 rounded-full text-lg font-bold shadow-xl hover:scale-105 transition-transform duration-300">
            Reserve Now
          </a>
        </section>

        {/* Sticky Reservation Button */}
        <a 
          href="#reserve" 
          className="fixed bottom-8 right-8 z-50 bg-[#FF8A00] text-white px-6 py-4 rounded-full font-bold shadow-2xl hover:scale-105 transition-transform duration-300 flex items-center gap-2 animate-pulse"
          style={{ boxShadow: '0 0 20px rgba(255,138,0,0.5)' }}
        >
          <span>Reserve Table</span>
        </a>
      </main>
    </div>
  );
}
