import Link from "next/link";
import Image from "next/image";

type LogoProps = {
  className?: string;
  onClick?: () => void;
  /** Kept for API compatibility — the brand mark is now the PNG asset. */
  tone?: "light" | "dark";
  /** Kept for API compatibility — the brand mark is now the PNG asset. */
  mark?: boolean;
  size?: "sm" | "md" | "lg";
};

/**
 * BATHAE logo — the owner's brand mark from public/logo.png, rendered via a
 * transparent derivative (public/logo-transparent.png: identical artwork with
 * the baked-in black background keyed out) so it sits cleanly on the dark
 * header, mobile menu, and footer without a visible black box.
 */
const SIZES = { sm: 30, md: 38, lg: 48 } as const;
const ASPECT = 979 / 215;

export default function Logo({ className = "", onClick, size = "md" }: LogoProps) {
  const height = SIZES[size];
  const width = Math.round(height * ASPECT);

  return (
    <Link
      href="/"
      onClick={onClick}
      aria-label="BATHAE — home"
      className={`group inline-flex flex-shrink-0 items-center ${className}`}
    >
      <Image
        src="/logo-transparent.png"
        alt="BATHAE"
        width={width}
        height={height}
        priority={size === "sm"}
        className="drop-shadow-[0_2px_16px_rgba(201,167,107,0.22)] transition-transform duration-500 ease-out group-hover:scale-[1.04]"
      />
    </Link>
  );
}
