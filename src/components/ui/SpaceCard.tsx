"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Maximize, MapPin } from "lucide-react";
import { Space } from "@/data/spaces";

export function SpaceCard({ space }: { space: Space }) {
  return (
    <div className="bg-pure-white rounded-[24px] border border-soft-gray overflow-hidden group hover:-translate-y-1 transition-transform duration-300 relative premium-shadow h-full flex flex-col">
      {/* Hardware Accelerated Shadow Layer */}
      <div className="absolute inset-0 rounded-[24px] premium-shadow-hover opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      
      {/* Image Section */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-light-gray z-10 shrink-0">
        <Image 
          src={space.image}
          alt={space.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute top-6 left-6 z-20">
          <span className={`inline-flex items-center px-4 py-2 text-[12px] font-bold uppercase tracking-widest rounded-full bg-pure-white text-almost-black shadow-sm ${space.status === 'Leased' ? 'opacity-70' : ''}`}>
            {space.status === 'Available Now' && (
              <span className="w-2 h-2 rounded-full bg-premium-orange mr-2 animate-pulse" />
            )}
            {space.status === 'Coming Soon' && (
              <span className="w-2 h-2 rounded-full bg-emerald mr-2" />
            )}
            {space.status}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-8 md:p-10 flex flex-col flex-1 z-10 bg-pure-white relative">
        <h4 className="text-slate-gray text-[14px] font-bold uppercase tracking-widest mb-2">
          {space.unit}
        </h4>
        <h3 className="text-[28px] md:text-[32px] font-bold text-almost-black tracking-tight mb-6 group-hover:text-premium-orange transition-colors">
          {space.title}
        </h3>
        
        <div className="flex flex-wrap items-center gap-6 text-slate-gray mb-10 border-b border-soft-gray pb-8">
          <div className="flex items-center gap-2">
            <Maximize size={18} />
            <span className="text-[16px]">{space.area}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={18} />
            <span className="text-[16px]">{space.floor}</span>
          </div>
        </div>

        <div className="mt-auto pt-2">
          <Link 
            href={`/spaces/${space.id}`}
            className="inline-flex items-center text-premium-orange font-bold text-[16px]"
          >
            {space.status === 'Leased' ? 'View Layout' : 'View Details'} <ArrowRight size={20} className="ml-2 transform group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
