"use client";

import SafeImage from "@/components/SafeImage";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Reveal from "@/components/Reveal";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-stone-50 pt-20">
      {/* Hero */}
      <section className="aurora relative overflow-hidden bg-stone-950 px-6 py-32 text-white lg:px-12">
        <div className="relative mx-auto max-w-screen-xl">
          <Reveal>
            <p className="eyebrow eyebrow-dot text-amber-400">Our Story</p>
            <h1 className="mt-6 max-w-3xl text-6xl font-light leading-none tracking-tight md:text-8xl">
              Design That
              <br />
              <span className="italic text-stone-400">Endures</span>
            </h1>
            <p className="mt-8 max-w-xl text-lg font-light leading-relaxed text-stone-400">
              BATHAE was built on a straightforward conviction: that the bathroom deserves the same
              level of considered design as any other room in the home.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Philosophy */}
      <section className="px-6 py-24 lg:px-12">
        <div className="mx-auto grid max-w-screen-xl items-center gap-16 md:grid-cols-2">
          <Reveal x={-24}>
            <p className="eyebrow eyebrow-dot text-amber-600">Philosophy</p>
            <h2 className="mt-5 text-4xl font-light text-stone-900">Less, but</h2>
            <h2 className="text-4xl font-light italic text-stone-500">Better</h2>
            <p className="mt-6 leading-relaxed text-stone-500">
              We do not believe in offering hundreds of SKUs for the sake of range. BATHAE focuses on
              a curated set of products done exceptionally well. Each design goes through a rigorous
              process of refinement before it reaches you.
            </p>
            <p className="mt-4 leading-relaxed text-stone-500">
              Our concealed shower systems are the product of that approach — complete sets where
              every component is considered, matched, and finished to the same standard.
            </p>
          </Reveal>
          <Reveal x={24} delay={0.1}>
            <div className="relative aspect-square overflow-hidden rounded-[2rem] bg-stone-100 shadow-[0_30px_70px_rgba(40,32,19,.12)]">
              <SafeImage
                src="/products/product2.png"
                alt="BATHAE Chrome Shower Set"
                fill
                sizes="(max-width: 768px) 100vw, 45vw"
                className="object-contain p-12 mix-blend-multiply transition-transform duration-700 hover:scale-105"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section className="bg-stone-900 py-24">
        <div className="mx-auto max-w-screen-xl px-6 lg:px-12">
          <Reveal className="mb-16 text-center">
            <h2 className="text-4xl font-light text-white">What We Stand For</h2>
          </Reveal>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                number: "01",
                title: "Honest Materials",
                body: "Solid brass. Stainless steel. PVD finishes. We use materials that are genuinely appropriate for wet environments and daily use.",
              },
              {
                number: "02",
                title: "Complete Solutions",
                body: "Every BATHAE shower set includes all components required for installation. No hidden extras, no missing pieces.",
              },
              {
                number: "03",
                title: "Accessible Premium",
                body: "Premium design should not be a luxury reserved for a few. We work to make genuinely refined bathroom products accessible in Pakistan.",
              },
            ].map((v, i) => (
              <Reveal key={v.number} delay={i * 0.1}>
                <div className="group h-full border-t border-stone-700 pt-8 transition-colors duration-300 hover:border-amber-400">
                  <p className="mb-4 text-4xl font-light text-amber-400 transition-transform duration-300 group-hover:-translate-y-1">
                    {v.number}
                  </p>
                  <h3 className="mb-3 font-semibold text-white">{v.title}</h3>
                  <p className="text-sm leading-relaxed text-stone-400">{v.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-24 text-center lg:px-12">
        <Reveal className="mx-auto max-w-xl">
          <h2 className="text-5xl font-light text-stone-900">
            Experience
            <br />
            <span className="italic text-stone-500">BATHAE</span>
          </h2>
          <p className="mx-auto mb-10 mt-4 max-w-md leading-relaxed text-stone-500">
            Browse our complete collection of premium concealed shower sets. Available across
            Pakistan.
          </p>
          <Link href="/shop" className="button-luxe button-dark mx-auto">
            Shop Now <ArrowRight size={15} />
          </Link>
        </Reveal>
      </section>
    </main>
  );
}
