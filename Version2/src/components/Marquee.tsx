"use client";

type MarqueeProps = {
  items: string[];
  className?: string;
};

/** Infinite, pause-on-hover brand strip. */
export default function Marquee({ items, className = "" }: MarqueeProps) {
  const loop = [...items, ...items];
  return (
    <div
      className={`marquee-paused relative overflow-hidden border-y border-white/10 bg-[#151714] py-5 ${className}`}
      aria-hidden="true"
    >
      <div className="flex w-max animate-marquee items-center gap-14 whitespace-nowrap">
        {loop.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-14 text-[11px] font-medium uppercase tracking-[0.32em] text-white/45"
          >
            {item}
            <span className="h-1 w-1 rounded-full bg-[#c9a76b]/60" />
          </span>
        ))}
      </div>
    </div>
  );
}
