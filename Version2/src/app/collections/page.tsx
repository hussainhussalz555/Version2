"use client";

import Link from "next/link";
import SafeImage from "@/components/SafeImage";
import { motion } from "framer-motion";
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
    image: "/products/product1.png",
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
    image: "/products/product2.png",
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
    image: "/products/product3.png",
    bg: "bg-stone-100",
    text: "text-stone-900",
  },
];

export default function CollectionsPage() {
  return (
    <main className="pt-20 min-h-screen bg-stone-50">
      {/* Header */}
      <div className="bg-white border-b border-stone-200 py-20 px-6 lg:px-12">
        <div className="max-w-screen-xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-[11px] text-amber-500 tracking-[0.3em] uppercase font-medium mb-3">
              Browse
            </p>
            <h1 className="text-5xl font-light text-stone-900">Collections</h1>
          </motion.div>
        </div>
      </div>

      {/* Collection Features */}
      <div className="space-y-0">
        {COLLECTIONS.map((col, i) => (
          <motion.section
            key={col.id}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className={`${col.bg} py-24 px-6 lg:px-12`}
          >
            <div className="max-w-screen-xl mx-auto">
              <div
                className={`grid md:grid-cols-2 gap-16 items-center ${
                  i % 2 === 1 ? "md:grid-flow-col-dense" : ""
                }`}
              >
                <div className={i % 2 === 1 ? "md:order-2" : ""}>
                  <p
                    className={`text-[11px] tracking-[0.3em] uppercase font-medium mb-4 ${
                      col.bg === "bg-stone-950" ? "text-amber-400" : "text-amber-600"
                    }`}
                  >
                    {col.subtitle}
                  </p>
                  <h2 className={`text-5xl font-light mb-6 ${col.text}`}>{col.label}</h2>
                  <p
                    className={`leading-relaxed mb-8 max-w-md ${
                      col.bg === "bg-stone-950" ? "text-stone-400" : "text-stone-500"
                    }`}
                  >
                    {col.description}
                  </p>
                  <div className="flex items-center gap-4 mb-8">
                    <span className={`text-2xl font-light ${col.text}`}>
                      {formatPrice(75000)}
                    </span>
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
                    className={`inline-flex items-center gap-2 px-8 py-4 text-sm font-semibold tracking-widest uppercase group transition-colors ${
                      col.bg === "bg-stone-950"
                        ? "bg-amber-500 text-stone-950 hover:bg-amber-400"
                        : "bg-stone-900 text-white hover:bg-stone-700"
                    }`}
                  >
                    Shop {col.label}
                    <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>

                <div className={`relative aspect-square ${i % 2 === 1 ? "md:order-1" : ""}`}>
                  <SafeImage
                    src={col.image}
                    alt={col.label}
                    fill
                    className="object-contain p-12"
                  />
                </div>
              </div>
            </div>
          </motion.section>
        ))}
      </div>

      {/* All Products Grid */}
      <section className="py-24 px-6 lg:px-12 max-w-screen-xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-4xl font-light text-stone-900">
            All
            <span className="italic text-stone-500"> Products</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link href={`/products/${product.slug}`} className="group block">
                <div className="relative aspect-square bg-stone-100 border border-stone-200 mb-4 overflow-hidden">
                  <SafeImage
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-contain p-10 transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <p className="text-[11px] text-stone-400 tracking-widest uppercase mb-1">
                  {product.finish.replace("-", " ")}
                </p>
                <h3 className="text-stone-900 font-medium group-hover:text-stone-600 transition-colors">
                  {product.name}
                </h3>
                <p className="text-stone-500 text-sm mt-0.5">{formatPrice(product.price)}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
