import { LodgingHero } from "@/components/lodging/LodgingHero";
import { RoomCategories } from "@/components/lodging/RoomCategories";
import { AmenitiesSection } from "@/components/lodging/AmenitiesSection";
import { HotelOverview } from "@/components/lodging/HotelOverview";
import { LodgingReviews } from "@/components/lodging/LodgingReviews";
import { LodgingGalleries } from "@/components/lodging/LodgingGalleries";
import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: 'Luxury Lodging | Gokul Square',
  description: 'Experience premium comfort and modern hospitality inside Gokul Square.',
};

export default function LodgingPage() {
  return (
    <main className="bg-[#FAFAFA] min-h-screen text-[#1A1A1A]">
      <LodgingHero />
      <RoomCategories />
      <AmenitiesSection />
      <HotelOverview />
      <LodgingGalleries />
      <LodgingReviews />

      {/* Final Call to Action */}
      <section className="relative py-32 px-6 flex items-center justify-center min-h-[700px] overflow-hidden mt-12">
        {/* Cinematic Background Image */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[#1A1A1A]/40 z-10" />
          <Image 
            src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070&auto=format&fit=crop" 
            alt="Luxury Stay"
            fill
            className="object-cover"
          />
        </div>

        {/* Floating Luxury Card */}
        <div className="relative z-20 bg-white/95 backdrop-blur-xl p-12 md:p-20 rounded-[40px] shadow-[0_40px_80px_rgba(0,0,0,0.2)] max-w-4xl w-full text-center border border-white/50">
          <h2 className="text-5xl md:text-7xl font-bold text-[#1A1A1A] mb-6 tracking-tight leading-[1.1]">
            Your Perfect <br className="hidden md:block" /> Stay Awaits
          </h2>
          <p className="text-xl md:text-2xl font-medium text-[#FF8A00] mb-4 uppercase tracking-widest text-sm">
            Relax. Recharge. Experience Comfort.
          </p>
          <p className="text-lg text-[#6B7280] mb-12 max-w-xl mx-auto leading-relaxed">
            Book your stay at Gokul Square Lodging and experience the absolute finest boutique hospitality right in the heart of Toranagallu.
          </p>
          <Link 
            href="#rooms" 
            className="inline-flex items-center justify-center bg-[#1A1A1A] text-white px-12 py-6 rounded-full text-xl font-bold hover:bg-[#FF8A00] shadow-xl hover:shadow-[#FF8A00]/40 hover:-translate-y-1 transition-all duration-300"
          >
            Request Reservation
          </Link>
        </div>
      </section>
    </main>
  );
}
