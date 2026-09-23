"use client";

import Link from "next/link";
import SafeImage from "@/components/SafeImage";
import Reveal from "@/components/Reveal";
import TiltCard from "@/components/TiltCard";
import { ArrowRight } from "lucide-react";
import { BRAND_CONFIG } from "@/lib/config";

const QUALITY_POINTS = [
  {
    icon: "◈",
    title: "Brass Body Construction",
    body: "The structural components of every BATHAE fitting use solid brass — a material chosen for its long-term resistance to corrosion, its dimensional stability, and its compatibility with potable water systems.",
  },
  {
    icon: "◇",
    title: "PVD Surface Finishing",
    body: "Our Matte Black and Brushed Gold finishes are applied through Physical Vapor Deposition (PVD). This process bonds a hard, thin coating to the surface at a molecular level, producing a finish that holds significantly longer than conventional electroplating.",
  },
  {
    icon: "△",
    title: "Stainless Steel Components",
    body: "Hoses, fasteners, and structural elements exposed to water are manufactured in stainless steel. This eliminates the risk of rust and maintains component integrity over the product lifespan.",
  },
  {
    icon: "○",
    title: "Precision Valve Engineering",
    body: "The concealed mixer valve is the heart of the system. BATHAE valves are engineered for smooth, accurate temperature and flow control — without slop, without stiffness.",
  },
  {
    icon: "▲",
    title: "Tested for Pressure",
    body: "Our shower systems are designed to operate across a range of water pressures typical in Pakistani residential and commercial settings. Recommended operating pressure: 0.5–5 Bar.",
  },
  {
    icon: "◉",
    title: "Matched Finish Sets",
    body: "Every component within a BATHAE set is finished to the same standard, from the same batch, ensuring colour and texture consistency across the valve, head, handheld, spout, and fittings.",
  },
];

export default function QualityPage() {
  return (
    <main className="min-h-screen bg-stone-50 pt-20">
      {/* Hero */}
      <section className="aurora relative overflow-hidden bg-stone-950 px-6 py-32 text-white lg:px-12">
        <div className="relative mx-auto max-w-screen-xl">
          <Reveal>
            <p className="eyebrow eyebrow-dot text-amber-400">Quality</p>
            <h1 className="mt-6 max-w-2xl text-6xl font-light leading-none tracking-tight md:text-7xl">
              The Standard
              <br />
              <span className="italic text-stone-400">We Hold</span>
            </h1>
            <p className="mt-8 max-w-lg text-lg font-light leading-relaxed text-stone-400">
              Quality, for BATHAE, is not a marketing claim. It is a specific set of material
              choices, manufacturing decisions, and finishing standards.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Quality Points */}
      <section className="px-6 py-24 lg:px-12">
        <div className="mx-auto grid max-w-screen-xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {QUALITY_POINTS.map((q, i) => (
            <Reveal key={q.title} delay={(i % 3) * 0.08}>
              <TiltCard className="h-full rounded-2xl" intensity={6}>
                <div className="h-full border border-stone-100 bg-white p-8 transition-colors duration-300 hover:border-stone-300">
                  <span className="mb-6 block text-3xl text-amber-500">{q.icon}</span>
                  <h3 className="mb-3 text-base font-semibold text-stone-900">{q.title}</h3>
                  <p className="text-sm leading-relaxed text-stone-500">{q.body}</p>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Warranty & Policies */}
      <section className="bg-stone-100 py-24">
        <div className="mx-auto max-w-screen-xl px-6 lg:px-12">
          <Reveal className="mb-16 text-center">
            <h2 className="text-4xl font-light text-stone-900">
              Policies &amp;
              <br />
              <span className="italic text-stone-500">Assurance</span>
            </h2>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { title: "Warranty", body: BRAND_CONFIG.warrantyStatement },
              { title: "Shipping", body: BRAND_CONFIG.shippingStatement },
              { title: "Returns", body: BRAND_CONFIG.returnStatement },
            ].map((p, i) => (
              <Reveal key={p.title} delay={i * 0.1}>
                <div className="h-full border border-stone-200 bg-white p-8">
                  <h3 className="mb-4 font-semibold text-stone-900">{p.title}</h3>
                  <p className="text-sm leading-relaxed text-stone-500">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Showcase */}
      <section className="px-6 py-24 lg:px-12">
        <div className="mx-auto grid max-w-screen-xl items-center gap-16 md:grid-cols-2">
          <Reveal x={-24}>
            <p className="eyebrow eyebrow-dot text-amber-600">The Collection</p>
            <h2 className="mt-5 text-4xl font-light text-stone-900">
              Quality You
              <br />
              <span className="italic text-stone-500">Can See</span>
            </h2>
            <p className="mb-8 mt-6 leading-relaxed text-stone-500">
              The BATHAE concealed shower set is available in three carefully considered finishes.
              Each finish is applied to the same precision-engineered brass components, giving you the
              same quality of engineering regardless of the aesthetic you choose.
            </p>
            <Link
              href="/shop"
              className="group inline-flex items-center gap-2 border-b border-stone-900 pb-1 text-sm font-medium uppercase tracking-widest text-stone-900 transition-colors hover:border-amber-500 hover:text-amber-600"
            >
              Shop All Finishes
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>

          <Reveal x={24} delay={0.1}>
            <div className="grid grid-cols-3 gap-4">
              {["/products/product1.png", "/products/product2.png", "/products/product3.png"].map(
                (img, i) => (
                  <TiltCard key={i} className="rounded-2xl" intensity={8}>
                    <div className="relative aspect-square overflow-hidden border border-stone-200 bg-stone-100">
                      <SafeImage
                        src={img}
                        alt="Finish"
                        fill
                        sizes="(max-width: 768px) 33vw, 12vw"
                        className="object-contain p-4 mix-blend-multiply transition-transform duration-700 hover:scale-105"
                      />
                    </div>
                  </TiltCard>
                )
              )}
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
