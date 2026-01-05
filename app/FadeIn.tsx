"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  delay?: number; // Optional delay for staggered effects
  className?: string; // Allow passing styles
}

export default function FadeIn({ children, delay = 0, className = "" }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }} // Start: Invisible and 40px down
      whileInView={{ opacity: 1, y: 0 }} // End: Visible and in place
      viewport={{ once: true, margin: "-50px" }} // Trigger: When element is slightly on screen
      transition={{ duration: 0.8, delay: delay, ease: "easeOut" }} // Smooth speed
      className={className}
    >
      {children}
    </motion.div>
  );
}