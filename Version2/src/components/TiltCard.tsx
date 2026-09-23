"use client";

import { useRef, useState, type ReactNode } from "react";

type TiltCardProps = {
  children: ReactNode;
  className?: string;
  intensity?: number;
};

/**
 * Pointer-driven 3-D tilt with a soft moving highlight — gives cards a
 * tactile, premium feel on hover without affecting layout.
 */
export default function TiltCard({
  children,
  className = "",
  intensity = 10,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<React.CSSProperties>({
    transform: "perspective(900px) rotateX(0deg) rotateY(0deg)",
  });
  const [glow, setGlow] = useState({ x: 50, y: 50, o: 0 });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const rotateX = (0.5 - py) * intensity;
    const rotateY = (px - 0.5) * intensity;
    setStyle({
      transform: `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(0)`,
    });
    setGlow({ x: px * 100, y: py * 100, o: 1 });
  };

  const handleLeave = () => {
    setStyle({
      transform: "perspective(900px) rotateX(0deg) rotateY(0deg)",
    });
    setGlow((g) => ({ ...g, o: 0 }));
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`group relative [transform-style:preserve-3d] will-change-transform transition-transform duration-300 ease-out ${className}`}
      style={style}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-30 rounded-[inherit] transition-opacity duration-300"
        style={{
          opacity: glow.o,
          background: `radial-gradient(240px circle at ${glow.x}% ${glow.y}%, rgba(255,255,255,0.4), transparent 60%)`,
        }}
      />
      {children}
    </div>
  );
}
