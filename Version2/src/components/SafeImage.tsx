"use client";

import { useState } from "react";
import Image, { type ImageProps } from "next/image";

interface SafeImageProps extends Omit<ImageProps, "onError"> {
  fallbackKind?: "product" | "logo" | "logo-light";
}

/** Keeps the storefront intentional while an optional customer-supplied image is missing. */
export default function SafeImage({
  src,
  alt,
  fallbackKind = "product",
  className = "",
  ...imageProps
}: SafeImageProps) {
  const [failedSource, setFailedSource] = useState<ImageProps["src"] | null>(null);
  const [loaded, setLoaded] = useState(false);

  if (failedSource === src) {
    return fallbackKind === "logo" || fallbackKind === "logo-light" ? (
      <span
        aria-label={alt}
        className={`absolute inset-0 flex items-center justify-start font-display text-2xl font-semibold tracking-[0.22em] ${fallbackKind === "logo-light" ? "text-white" : "text-stone-900"}`}
      >
        BATHAE
      </span>
    ) : (
      <span
        aria-label={`${alt} image coming soon`}
        className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-stone-100 via-stone-50 to-amber-50/70 text-center"
      >
        <span className="font-display text-2xl tracking-[0.18em] text-stone-400">BATHAE</span>
        <span className="mt-2 text-[10px] font-medium uppercase tracking-[0.2em] text-stone-400">
          Product photography coming soon
        </span>
      </span>
    );
  }

  return (
    <>
      <Image
        {...imageProps}
        src={src}
        alt={alt}
        onError={() => setFailedSource(src)}
        onLoad={() => setLoaded(true)}
        className={className}
      />
      {!loaded && (
        <div
          aria-hidden="true"
          className="shimmer pointer-events-none absolute inset-0 rounded-[inherit]"
        />
      )}
    </>
  );
}
