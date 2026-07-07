import Link from "next/link";
import { ArrowLeft, Clock } from "lucide-react";

export function ComingSoon({ title, description }: { title: string, description?: string }) {
  return (
    <div className="min-h-screen bg-light-gray flex flex-col items-center justify-center p-6 text-center pt-24">
      <div className="w-20 h-20 bg-pure-white rounded-full flex items-center justify-center mb-8 shadow-sm border border-soft-gray">
        <Clock className="w-8 h-8 text-premium-orange" />
      </div>
      <h1 className="text-[48px] md:text-[64px] font-bold text-almost-black tracking-tight leading-[1.1] mb-6">
        {title}
      </h1>
      <p className="text-[18px] text-slate-gray max-w-xl mx-auto mb-12 leading-relaxed">
        {description || "We are currently crafting this experience. Please check back soon as we finalize the details."}
      </p>
      <Link 
        href="/"
        className="inline-flex items-center justify-center px-8 py-4 text-[16px] font-bold rounded-full border border-soft-gray bg-pure-white text-almost-black hover:border-premium-orange hover:text-premium-orange transition-colors duration-300 shadow-sm group"
      >
        <ArrowLeft size={18} className="mr-3 group-hover:-translate-x-1 transition-transform" /> 
        Return Home
      </Link>
    </div>
  );
}
