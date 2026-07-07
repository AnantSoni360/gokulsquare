"use client";

import Image from "next/image";

export function BrandWall() {
  const brands = [
    { name: "HDFC Bank", logo: "https://upload.wikimedia.org/wikipedia/commons/2/28/HDFC_Bank_Logo.svg" },
    { name: "Starbucks", logo: "https://upload.wikimedia.org/wikipedia/en/d/d3/Starbucks_Corporation_Logo_2011.svg" },
    { name: "Tata Croma", logo: "https://upload.wikimedia.org/wikipedia/commons/b/b2/Croma_Logo.svg" },
    { name: "KFC", logo: "https://upload.wikimedia.org/wikipedia/en/b/bf/KFC_logo.svg" },
    { name: "Reliance Digital", logo: "https://upload.wikimedia.org/wikipedia/commons/6/63/Reliance_Digital_Logo.svg" },
    { name: "PVR Cinemas", logo: "https://upload.wikimedia.org/wikipedia/commons/0/05/PVR_Cinemas_logo.svg" },
  ];

  // Duplicate the array to create a seamless loop
  const seamlessBrands = [...brands, ...brands];

  return (
    <section className="py-24 bg-pure-white border-y border-soft-gray overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 mb-12">
        <h3 className="text-center text-[16px] font-bold text-slate-gray tracking-[0.2em] uppercase">
          Trusted By Industry Leaders
        </h3>
      </div>
      
      <div className="relative w-full overflow-hidden">
        {/* Gradient Masks for smooth fade at edges */}
        <div className="absolute top-0 left-0 bottom-0 w-32 bg-gradient-to-r from-pure-white to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 right-0 bottom-0 w-32 bg-gradient-to-l from-pure-white to-transparent z-10 pointer-events-none" />

        {/* Pure CSS Marquee Track */}
        <div className="flex w-max animate-marquee hover:[animation-play-state:paused] items-center gap-16 md:gap-32 pl-16 md:pl-32">
          {seamlessBrands.map((brand, idx) => (
            <div 
              key={`${brand.name}-${idx}`} 
              className="relative w-[140px] h-[60px] opacity-40 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0 shrink-0"
            >
              {/* Note: Using standard img since these are external SVG logos where Next Image optimization is less critical, 
                  but we'll use unoptimized or raw img for SVGs */}
              <img 
                src={brand.logo} 
                alt={brand.name}
                className="w-full h-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
