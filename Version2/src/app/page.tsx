"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { products } from "@/lib/products";
import { formatPrice, getStockLabel } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import { BRAND_CONFIG } from "@/lib/config";

const QUALITY_PILLARS = [
  {
    icon: "◈",
    title: "Precision Engineering",
    body: "Every BATHAE fitting is manufactured to exacting tolerances. The result is a product that installs cleanly, operates smoothly, and holds up over years of daily use.",
  },
  {
    icon: "◇",
    title: "Material Integrity",
    body: "We select solid brass bodies, stainless steel components, and PVD-applied finishes because quality materials are the foundation of a product that ages well.",
  },
  {
    icon: "○",
    title: "Design Restraint",
    body: "Good design is not about excess. BATHAE products are shaped to be quietly authoritative — elegant without demanding attention, refined without becoming dated.",
  },
  {
    icon: "△",
    title: "Customer Assurance",
    body: BRAND_CONFIG.warrantyStatement,
  },
];

const CATEGORIES = [
  {
    label: "Shower Sets",
    description: "Complete concealed systems",
    href: "/shop?category=shower-sets",
    image: "/products/product3.png",
  },
  {
    label: "Gold Finish",
    description: "Brushed gold collections",
    href: "/shop?finish=gold",
    image: "/products/product2.png",
  },
  {
    label: "Matte Black",
    description: "Contemporary black fixtures",
    href: "/shop?finish=matte-black",
    image: "/products/product1.png",
  },
];

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 600], [0, 120]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);

  const featuredProducts = products.filter((p) => p.isFeatured);

  return (
    <main>
      {/* ── Hero ── */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-stone-950"
      >
        {/* Background texture */}
        <div className="absolute inset-0 bg-gradient-to-br from-stone-900 via-stone-950 to-black" />

        {/* Ambient gold glow */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[600px] h-[600px] rounded-full bg-amber-500/5 blur-[100px]" />
        </div>

        {/* Hero product image */}
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="absolute right-0 top-0 bottom-0 w-full md:w-1/2 flex items-center justify-center opacity-40 md:opacity-60"
        >
          <div className="relative w-full h-full max-w-lg">
            <Image
              src="/products/product2.png"
              alt="BATHAE Shower Set"
              fill
              className="object-contain"
              priority
            />
          </div>
        </motion.div>

        {/* Content */}
        <div className="relative z-10 max-w-screen-xl mx-auto px-6 lg:px-12 w-full pt-20">
          <div className="max-w-2xl">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-amber-400 text-[11px] tracking-[0.3em] uppercase font-medium mb-8"
            >
              Premium Ceramics &amp; Bathroom Fixtures
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="text-white text-6xl md:text-8xl font-light leading-none tracking-tight mb-8"
            >
              Elevate
              <br />
              <span className="italic text-stone-300">the</span>
              <br />
              Everyday.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-stone-400 text-lg font-light leading-relaxed mb-12 max-w-md"
            >
              Where precision engineering meets refined design. Every fitting is a considered act
              of craft.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link
                href="/shop"
                className="inline-flex items-center gap-3 bg-amber-500 text-stone-950 px-8 py-4 text-sm font-semibold tracking-widest uppercase hover:bg-amber-400 transition-colors"
              >
                Explore Collection
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-3 border border-white/20 text-white px-8 py-4 text-sm font-medium tracking-widest uppercase hover:border-white/50 transition-colors"
              >
                Our Story
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30"
        >
          <span className="text-[10px] tracking-[0.3em] uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <ChevronDown size={16} />
          </motion.div>
        </motion.div>
      </section>

      {/* ── Brand Strip ── */}
      <section className="border-y border-stone-200 py-6 bg-white">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
          <div className="flex flex-wrap items-center justify-center gap-x-16 gap-y-4">
            {["Concealed Systems", "PVD Finishes", "Brass Body", "Complete Sets", "Pakistan Delivery"].map(
              (item) => (
                <span
                  key={item}
                  className="text-[11px] text-stone-400 tracking-[0.25em] uppercase font-medium"
                >
                  {item}
                </span>
              )
            )}
          </div>
        </div>
      </section>

      {/* ── Featured Products ── */}
      <section className="py-24 px-6 lg:px-12 max-w-screen-xl mx-auto">
        <div className="flex items-end justify-between mb-16">
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-[11px] text-amber-500 tracking-[0.3em] uppercase font-medium mb-3"
            >
              The Collection
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-stone-900 text-5xl font-light leading-tight"
            >
              Featured
              <br />
              <span className="italic text-stone-500">Products</span>
            </motion.h2>
          </div>
          <Link
            href="/shop"
            className="hidden md:flex items-center gap-2 text-sm text-stone-500 hover:text-stone-900 transition-colors group"
          >
            View All
            <ArrowRight
              size={16}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-12 text-center md:hidden">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-sm text-stone-600 hover:text-stone-900 underline underline-offset-4 transition-colors"
          >
            View All Products
          </Link>
        </div>
      </section>

      {/* ── Editorial Divider ── */}
      <section className="py-20 bg-stone-900">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-amber-400 text-[11px] tracking-[0.3em] uppercase font-medium mb-4">
                Complete Sets
              </p>
              <h2 className="text-white text-5xl font-light leading-tight mb-6">
                One Set.
                <br />
                <span className="italic text-stone-400">Complete.</span>
              </h2>
              <p className="text-stone-400 leading-relaxed mb-8">
                The BATHAE concealed shower set includes everything needed for a seamless
                installation: the concealed mixer valve, the 12-inch overhead rainfall head, a
                handheld unit, wall spout, hose, and holder. Available in Matte Black, Brushed
                Gold, and Polished Chrome.
              </p>
              <div className="flex items-center gap-4">
                <span className="text-white text-3xl font-light">
                  {formatPrice(75000)}
                </span>
                <span className="text-stone-500 text-sm">Full Set</span>
              </div>
              <Link
                href="/products/concealed-shower-set-matte-black"
                className="inline-flex items-center gap-2 mt-8 bg-amber-500 text-stone-950 px-6 py-3.5 text-sm font-semibold tracking-widest uppercase hover:bg-amber-400 transition-colors"
              >
                Shop Now <ArrowRight size={15} />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="relative aspect-square max-w-md mx-auto">
                <div className="absolute inset-0 bg-stone-800" />
                <Image
                  src="/products/product1.png"
                  alt="Concealed Shower Set Matte Black"
                  fill
                  className="object-contain p-8"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Categories ── */}
      <section className="py-24 px-6 lg:px-12 max-w-screen-xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-[11px] text-amber-500 tracking-[0.3em] uppercase font-medium mb-3">
            Browse by
          </p>
          <h2 className="text-stone-900 text-5xl font-light">Collections</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link href={cat.href} className="group block relative">
                <div className="relative aspect-[4/5] bg-stone-100 overflow-hidden">
                  <Image
                    src={cat.image}
                    alt={cat.label}
                    fill
                    className="object-contain p-10 transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-stone-950/0 group-hover:bg-stone-950/10 transition-colors duration-300" />
                </div>
                <div className="mt-4">
                  <h3 className="text-stone-900 font-medium text-lg group-hover:text-stone-600 transition-colors">
                    {cat.label}
                  </h3>
                  <p className="text-stone-400 text-sm mt-0.5 flex items-center gap-1">
                    {cat.description}
                    <ArrowRight
                      size={13}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Quality Pillars ── */}
      <section className="py-24 bg-stone-100">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-[11px] text-amber-500 tracking-[0.3em] uppercase font-medium mb-3">
              Our Standards
            </p>
            <h2 className="text-stone-900 text-5xl font-light">
              Quality at
              <br />
              <span className="italic text-stone-500">Every Detail</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {QUALITY_PILLARS.map((pillar, i) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-8 border border-stone-200"
              >
                <span className="text-3xl text-amber-500 block mb-6">{pillar.icon}</span>
                <h3 className="text-stone-900 font-semibold text-base mb-3">{pillar.title}</h3>
                <p className="text-stone-500 text-sm leading-relaxed">{pillar.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Gold Finish Showcase ── */}
      <section className="py-24 px-6 lg:px-12 max-w-screen-xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative aspect-square bg-amber-50"
          >
            <Image
              src="/products/product2.png"
              alt="BATHAE Brushed Gold"
              fill
              className="object-contain p-12"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-[11px] text-amber-500 tracking-[0.3em] uppercase font-medium mb-4">
              Brushed Gold
            </p>
            <h2 className="text-stone-900 text-5xl font-light leading-tight mb-6">
              A Finish Worth
              <br />
              <span className="italic text-stone-500">Noticing</span>
            </h2>
            <p className="text-stone-500 leading-relaxed mb-8">
              The BATHAE Brushed Gold finish is applied through a PVD process that bonds a
              warm, matte-toned gold layer to the brass substrate. The result is a surface that
              resists tarnish, repels fingerprints, and holds its character for years.
            </p>
            <Link
              href="/shop?finish=gold"
              className="inline-flex items-center gap-2 border-b border-stone-900 text-stone-900 pb-1 text-sm font-medium tracking-widest uppercase hover:border-amber-500 hover:text-amber-600 transition-colors group"
            >
              Shop Gold Finish
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="py-24 bg-stone-950">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-amber-400 text-[11px] tracking-[0.3em] uppercase font-medium mb-6">
              Ready to Elevate Your Bathroom
            </p>
            <h2 className="text-white text-6xl font-light leading-tight mb-6">
              Start with
              <br />
              <span className="italic text-stone-400">the Finest</span>
            </h2>
            <p className="text-stone-400 max-w-lg mx-auto mb-12 leading-relaxed">
              Browse the full BATHAE collection. Every product is available now with delivery across
              Pakistan.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/shop"
                className="inline-flex items-center justify-center gap-2 bg-amber-500 text-stone-950 px-10 py-4 text-sm font-semibold tracking-widest uppercase hover:bg-amber-400 transition-colors"
              >
                Shop the Collection
              </Link>
              <a
                href={`https://wa.me/${BRAND_CONFIG.whatsappNumber}?text=${encodeURIComponent(BRAND_CONFIG.whatsappDefaultMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border border-white/20 text-white px-10 py-4 text-sm font-medium tracking-widest uppercase hover:border-white/50 transition-colors"
              >
                WhatsApp Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
