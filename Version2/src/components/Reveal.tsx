"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  x?: number;
  duration?: number;
  amount?: number;
  once?: boolean;
};

/**
 * Scroll-triggered reveal — content fades and rises into view as it enters
 * the viewport. Used across the site for "loading on scroll" motion.
 */
export default function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
  x = 0,
  duration = 0.7,
  amount = 0.2,
  once = true,
}: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
