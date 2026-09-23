"use client";

import Link from "next/link";
import { useId } from "react";

type LogoProps = {
  className?: string;
  onClick?: () => void;
  tone?: "light" | "dark";
  mark?: boolean;
  size?: "sm" | "md" | "lg";
};

/**
 * BATHAE wordmark. Rendered as a transparent, color-correct mark so it sits
 * cleanly on both the dark header and the dark footer (no blend-mode hacks).
 */
export default function Logo({
  className = "",
  onClick,
  tone = "light",
  mark = true,
  size = "md",
}: LogoProps) {
  const raw = useId();
  const gradId = `logoGrad-${raw.replace(/[:]/g, "")}`;
  const word = tone === "light" ? "text-stone-50" : "text-stone-900";
  const dim = size === "sm" ? "text-xl" : size === "lg" ? "text-3xl" : "text-2xl";
  const markSize = size === "sm" ? 22 : size === "lg" ? 32 : 26;

  return (
    <Link
      href="/"
      onClick={onClick}
      aria-label="BATHAE — home"
      className={`group inline-flex items-center gap-2.5 ${className}`}
    >
      {mark && (
        <span
          className="relative inline-flex items-center justify-center transition-transform duration-500 ease-out group-hover:rotate-[10deg] group-hover:scale-110"
          aria-hidden="true"
        >
          <svg width={markSize} height={markSize} viewBox="0 0 28 32" fill="none">
            <defs>
              <linearGradient
                id={gradId}
                x1="3"
                y1="1"
                x2="25"
                y2="31"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#f8eccb" />
                <stop offset="0.5" stopColor="#dcbb7c" />
                <stop offset="1" stopColor="#a9783f" />
              </linearGradient>
            </defs>
            <path d="M14 1 L27 12 L14 31 L1 12 Z" fill={`url(#${gradId})`} />
            <path
              d="M14 1 L27 12 L14 31 L1 12 Z"
              fill="none"
              stroke="rgba(255,255,255,0.4)"
              strokeWidth="0.6"
            />
            <path d="M14 7 L21 12 L14 25 L7 12 Z" fill="rgba(255,255,255,0.18)" />
          </svg>
        </span>
      )}
      <span
        className={`font-display font-semibold tracking-[0.2em] ${word} ${dim}`}
      >
        BATHAE
      </span>
    </Link>
  );
}
