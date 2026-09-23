"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/** Thin gold progress bar that fills as the visitor scrolls the page. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    mass: 0.3,
  });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[100] h-[3px] origin-left bg-gradient-to-r from-amber-200 via-[#d9b878] to-amber-500 shadow-[0_0_12px_rgba(217,184,120,0.7)]"
    />
  );
}
