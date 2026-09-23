"use client";

import { useEffect, useState } from "react";
import { Clock } from "lucide-react";

type MarqueeProps = {
  items: string[];
  className?: string;
};

/**
 * Live news-bulletin style ticker — brushed gold, polished finish.
 * Continuously running headlines with a LIVE badge and a running PKT clock.
 */
export default function Marquee({ items, className = "" }: MarqueeProps) {
  const [time, setTime] = useState("");

  useEffect(() => {
    const format = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      timeZone: "Asia/Karachi",
    });
    const tick = () => setTime(format.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className={`news-ticker flex items-stretch text-stone-900 ${className}`}
      role="region"
      aria-label="BATHAE live updates"
    >
      {/* Headlines exposed to assistive tech (the animated strip below is aria-hidden) */}
      <ul className="sr-only">
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>

      {/* LIVE badge */}
      <div
        className="relative z-10 flex flex-shrink-0 items-center gap-2.5 bg-[#151714] px-4 sm:px-6"
        aria-hidden="true"
      >
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-300 opacity-70" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-amber-400" />
        </span>
        <span className="text-[10px] font-bold uppercase tracking-[0.32em] text-[#ecd29a]">
          Live
        </span>
      </div>

      {/* Scrolling headlines — two identical halves for a seamless loop */}
      <div className="ticker-viewport relative flex-1 overflow-hidden" aria-hidden="true">
        <div className="ticker-track flex w-max items-center whitespace-nowrap py-3.5">
          {[0, 1].map((half) => (
            <div key={half} className="flex items-center">
              {items.map((item, i) => (
                <span key={i} className="flex items-center">
                  <span className="px-7 text-[11px] font-semibold uppercase tracking-[0.3em]">
                    {item}
                  </span>
                  <span className="h-1.5 w-1.5 rotate-45 bg-stone-900/40" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Running clock (Asia/Karachi) */}
      <div
        className="relative z-10 hidden flex-shrink-0 items-center gap-2 border-l border-stone-900/15 px-5 md:flex"
        aria-hidden="true"
      >
        <Clock size={13} strokeWidth={2} className="text-stone-900/70" aria-hidden="true" />
        <span className="text-[11px] font-semibold tabular-nums tracking-[0.22em]">
          {time || "--:--:--"} <span className="text-stone-900/50">PKT</span>
        </span>
      </div>
    </div>
  );
}
