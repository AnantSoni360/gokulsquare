import { spacesData } from "@/data/spaces";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Maximize, MapPin, Building, Calendar, Phone, CheckCircle2 } from "lucide-react";

export async function generateStaticParams() {
  return spacesData.map((space) => ({
    id: space.id,
  }));
}

export default async function SpaceDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const space = spacesData.find(s => s.id === id);

  if (!space) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-pure-white pb-32">
      
      {/* Hero Image Section */}
      <div className="relative w-full h-[60vh] min-h-[500px] bg-almost-black mt-20">
        <Image 
          src={space.image}
          alt={space.title}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-almost-black via-transparent to-transparent opacity-80" />
        
        {/* Back button & Title over image */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 max-w-[1400px] mx-auto z-10">
          <Link href="/spaces" className="inline-flex items-center text-pure-white/80 hover:text-pure-white mb-6 transition-colors font-medium">
            <ArrowLeft size={18} className="mr-2" /> Back to Inventory
          </Link>
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <span className="px-4 py-1.5 bg-pure-white/20 backdrop-blur-md rounded-full text-pure-white text-[12px] font-bold uppercase tracking-widest border border-pure-white/30">
              {space.unit}
            </span>
            <span className={`px-4 py-1.5 rounded-full text-[12px] font-bold uppercase tracking-widest shadow-sm ${
              space.status === 'Available Now' ? 'bg-premium-orange text-pure-white' : 
              space.status === 'Leased' ? 'bg-pure-white text-almost-black' : 'bg-emerald text-pure-white'
            }`}>
              {space.status}
            </span>
          </div>
          <h1 className="text-[48px] md:text-[64px] font-bold text-pure-white tracking-tight leading-[1.1]">
            {space.title}
          </h1>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Left Column: Description & Details */}
          <div className="lg:col-span-8">
            <h2 className="text-[28px] font-bold text-almost-black mb-6">About this space</h2>
            <p className="text-[18px] text-slate-gray leading-relaxed mb-12">
              {space.description}
            </p>

            <h3 className="text-[20px] font-bold text-almost-black mb-6">Premium Amenities included</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
              {space.amenities.map((amenity, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-gray">
                  <CheckCircle2 size={20} className="text-premium-orange shrink-0" />
                  <span className="text-[16px]">{amenity}</span>
                </li>
              ))}
            </ul>

            <h3 className="text-[20px] font-bold text-almost-black mb-6">Floor Plan (Indicative)</h3>
            <div className="w-full aspect-[4/3] md:aspect-[21/9] bg-light-gray rounded-[24px] border border-soft-gray flex items-center justify-center relative overflow-hidden mb-8">
              {/* This is a placeholder for an actual blueprint image */}
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
              <div className="text-center z-10">
                <Building size={48} className="text-soft-gray mx-auto mb-4" />
                <span className="text-slate-gray font-medium tracking-widest uppercase text-[14px]">Blueprint Not Available Online</span>
                <p className="text-slate-gray/70 text-[12px] mt-2">Request via inquiry to receive full technical drawings.</p>
              </div>
            </div>
          </div>

          {/* Right Column: Sticky Spec Card */}
          <div className="lg:col-span-4">
            <div className="sticky top-32 bg-pure-white rounded-[24px] border border-soft-gray p-8 premium-shadow">
              <h3 className="text-[20px] font-bold text-almost-black mb-6 border-b border-soft-gray pb-6">
                Space Specifications
              </h3>
              
              <div className="flex flex-col gap-6 mb-8">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3 text-slate-gray">
                    <Maximize size={20} /> <span className="font-medium">Carpet Area</span>
                  </div>
                  <span className="font-bold text-almost-black text-[18px]">{space.area}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3 text-slate-gray">
                    <MapPin size={20} /> <span className="font-medium">Floor Level</span>
                  </div>
                  <span className="font-bold text-almost-black text-[18px]">{space.floor}</span>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3 text-slate-gray">
                    <Building size={20} /> <span className="font-medium">Category</span>
                  </div>
                  <span className="font-bold text-almost-black text-[18px]">{space.category}</span>
                </div>

                {space.price && (
                  <div className="flex justify-between items-center mt-2 pt-6 border-t border-soft-gray">
                    <span className="text-slate-gray font-medium">Lease Estimate</span>
                    <span className="font-bold text-premium-orange text-[20px]">{space.price}</span>
                  </div>
                )}
              </div>

              {space.status !== 'Leased' ? (
                <div className="flex flex-col gap-4">
                  <Link 
                    href="/contact" 
                    className="w-full flex items-center justify-center gap-2 py-4 rounded-full bg-premium-orange text-pure-white font-bold text-[16px] hover:bg-almost-black transition-colors"
                  >
                    <Calendar size={18} /> Schedule a Visit
                  </Link>
                  <a 
                    href="tel:+919876543210" 
                    className="w-full flex items-center justify-center gap-2 py-4 rounded-full bg-light-gray text-almost-black font-bold text-[16px] border border-soft-gray hover:border-almost-black transition-colors"
                  >
                    <Phone size={18} /> Call Sales Team
                  </a>
                </div>
              ) : (
                <div className="w-full py-4 rounded-full bg-light-gray text-slate-gray font-bold text-[16px] text-center border border-soft-gray">
                  Currently Occupied
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
