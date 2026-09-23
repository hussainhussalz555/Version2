"use client";

import Link from "next/link";
import SafeImage from "@/components/SafeImage";
import Reveal from "@/components/Reveal";
import TiltCard from "@/components/TiltCard";
import { ArrowRight } from "lucide-react";
import { products, formatPrice } from "@/lib/products";

const COLLECTIONS = [
  {
    id: "matte-black",
    label: "Matte Black",
    subtitle: "Contemporary authority",
    description:
      "The Matte Black collection presents a bold, fingerprint-resistant finish applied over a solid brass body. Architectural in character, these fittings work with any modern interior.",
    href: "/shop?finish=matte-black",
    image: "/products/product3.png",
    bg: "bg-stone-950",
    text: "text-white",
  },
  {
    id: "gold",
    label: "Brushed Gold",
    subtitle: "Warm precision",
    description:
      "The Brushed Gold collection applies a warm, PVD-bonded finish to the same precision-engineered brass components. Enduring in character, never ostentatious.",
    href: "/shop?finish=gold",
    image: "/products/product1.png",
    bg: "bg-amber-50",
    text: "text-stone-900",
  },
  {
    id: "chrome",
    label: "Polished Chrome",
    subtitle: "Classic clarity",
    description:
      "The Polished Chrome collection is the timeless choice — a reflective, clean surface that complements any interior and maintains its appearance with simple care.",
    href: "/shop?finish=chrome",
    image: "/products/product2.png",
    bg: "bg-stone-100",
    text: "text-stone-900",
  },
];

export default function CollectionsPage() {
  return (
    <main className="min-h-screen bg-stone-50 pt-20">
      {/* Header */}
      <div className="border-b border-stone-200 bg-white px-6 py-20 lg:px-12">
        <div className="mx-auto max-w-screen-xl">
          <Reveal>
            <p className="eyebrow eyebrow-dot text-amber-600">Browse</p>
            <h1 className="mt-3 text-5xl font-light text-stone-900">Collections</h1>
          </Reveal>
        </div>
      </div>

      {/* Collection Features */}
      <div className="space-y-0">
        {COLLECTIONS.map((col, i) => (
          <section key={col.id} className={`${col.bg} px-6 py-24 lg:px-12`}>
            <div className="mx-auto max-w-screen-xl">
              <div
                className={`grid items-center gap-16 md:grid-cols-2 ${
                  i % 2 === 1 ? "md:grid-flow-col-dense" : ""
                }`}
              >
                <Reveal x={i % 2 === 1 ? 24 : -24} className={i % 2 === 1 ? "md:order-2" : ""}>
                  <p
                    className={`eyebrow eyebrow-dot ${
                      col.bg === "bg-stone-950" ? "text-amber-400" : "text-amber-600"
                    }`}
                  >
                    {col.subtitle}
                  </p>
                  <h2 className={`mt-4 text-5xl font-light ${col.text}`}>{col.label}</h2>
                  <p
                    className={`mb-8 mt-6 max-w-md leading-relaxed ${
                      col.bg === "bg-stone-950" ? "text-stone-400" : "text-stone-500"
                    }`}
                  >
                    {col.description}
                  </p>
                  <div className={`mb-8 flex items-center gap-4`}>
                    <span className={`text-2xl font-light ${col.text}`}>{formatPrice(75000)}</span>
                    <span
                      className={`text-sm ${
                        col.bg === "bg-stone-950" ? "text-stone-500" : "text-stone-400"
                      }`}
                    >
                      Complete Set
                    </span>
                  </div>
                  <Link
                    href={col.href}
                    className={`button-luxe ${
                      col.bg === "bg-stone-950"
                        ? "button-gold"
                        : "button-dark"
                    }`}
                  >
                    Shop {col.label}
                    <ArrowRight size={15} />
                  </Link>
                </Reveal>

                <Reveal x={i % 2 === 1 ? -24 : 24} delay={0.1} className={i % 2 === 1 ? "md:order-1" : ""}>
                  <TiltCard className="rounded-[2rem]" intensity={8}>
                    <div className="relative aspect-square overflow-hidden rounded-[2rem] bg-[#f5f3ee] shadow-[0_24px_60px_rgba(0,0,0,.12)]">
                      <SafeImage
                        src={col.image}
                        alt={col.label}
                        fill
                        sizes="(max-width: 768px) 100vw, 45vw"
                        className="object-contain p-5 mix-blend-multiply transition-transform duration-700 hover:scale-105 sm:p-12"
                      />
                    </div>
                  </TiltCard>
                </Reveal>
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* All Products Grid */}
      <section className="px-6 py-24 lg:px-12">
        <div className="mx-auto max-w-screen-xl">
          <Reveal className="mb-12">
            <h2 className="text-4xl font-light text-stone-900">
              All
              <span className="italic text-stone-500"> Products</span>
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {products.map((product, i) => (
              <Reveal key={product.id} delay={(i % 3) * 0.1}>
                <Link href={`/products/${product.slug}`} className="group block">
                  <div className="relative aspect-square overflow-hidden rounded-2xl border border-stone-200 bg-[#f5f3ee] shadow-[0_12px_35px_rgba(32,27,19,.06)] transition-all duration-500 group-hover:-translate-y-1 group-hover:shadow-[0_26px_50px_rgba(32,27,19,.16)]">
                    <SafeImage
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-contain p-10 mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <p className="mb-1 mt-4 text-[11px] uppercase tracking-[0.14em] text-stone-400">
                    {product.finish.replace("-", " ")}
                  </p>
                  <h3 className="font-medium text-stone-900 transition-colors group-hover:text-amber-800">
                    {product.name}
                  </h3>
                  <p className="mt-0.5 text-sm text-stone-500">{formatPrice(product.price)}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
