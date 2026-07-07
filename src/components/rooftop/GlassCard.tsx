"use client";

import { motion, HTMLMotionProps } from "framer-motion";

export function GlassCard({
  className,
  children,
  hoverGlow = true,
  ...props
}: HTMLMotionProps<"div"> & { hoverGlow?: boolean }) {
  return (
    <motion.div
      className={`
        bg-white/80 backdrop-blur-md border border-white/40 
        rounded-[24px] shadow-[0_8px_32px_rgba(0,0,0,0.04)]
        ${hoverGlow ? "hover:shadow-[0_8px_40px_rgba(255,138,0,0.15)] hover:border-[#FF8A00]/30 transition-all duration-300" : ""}
        ${className || ""}
      `}
      whileHover={hoverGlow ? { y: -5 } : {}}
      {...props}
    >
      {children}
    </motion.div>
  );
}
