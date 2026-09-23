"use client";

import SafeImage from "@/components/SafeImage";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { BRAND_CONFIG } from "@/lib/config";

export default function AboutPage() {
  return (
    <main className="pt-20 min-h-screen bg-stone-50">
      {/* Hero */}
      <section className="bg-stone-950 py-32 px-6 lg:px-12">
        <div className="max-w-screen-xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-amber-400 text-[11px] tracking-[0.3em] uppercase font-medium mb-4">
              Our Story
            </p>
            <h1 className="text-white text-6xl md:text-8xl font-light leading-none tracking-tight mb-8 max-w-3xl">
              Design That
              <br />
              <span className="italic text-stone-400">Endures</span>
            </h1>
            <p className="text-stone-400 max-w-xl leading-relaxed text-lg font-light">
              BATHAE was built on a straightforward conviction: that the bathroom deserves the same
              level of considered design as any other room in the home.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-24 px-6 lg:px-12 max-w-screen-xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-[11px] text-amber-500 tracking-[0.3em] uppercase font-medium mb-4">
              Philosophy
            </p>
            <h2 className="text-stone-900 text-4xl font-light mb-6">
              Less, but
              <br />
              <span className="italic text-stone-500">Better</span>
            </h2>
            <p className="text-stone-500 leading-relaxed mb-6">
              We do not believe in offering hundreds of SKUs for the sake of range. BATHAE focuses
              on a curated set of products done exceptionally well. Each design goes through a
              rigorous process of refinement before it reaches you.
            </p>
            <p className="text-stone-500 leading-relaxed">
              Our concealed shower systems are the product of that approach — complete sets where
              every component is considered, matched, and finished to the same standard.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative aspect-square bg-stone-100"
          >
            <SafeImage
              src="/products/product2.png"
              alt="BATHAE Chrome Shower Set"
              fill
              className="object-contain p-12 mix-blend-multiply"
            />
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-stone-900">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-white text-4xl font-light">What We Stand For</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
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
              <motion.div
                key={v.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="border-t border-stone-700 pt-8"
              >
                <p className="text-amber-400 text-4xl font-light mb-4">{v.number}</p>
                <h3 className="text-white font-semibold mb-3">{v.title}</h3>
                <p className="text-stone-400 text-sm leading-relaxed">{v.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 lg:px-12 max-w-screen-xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-stone-900 text-5xl font-light mb-6">
            Experience
            <br />
            <span className="italic text-stone-500">BATHAE</span>
          </h2>
          <p className="text-stone-500 max-w-md mx-auto mb-10 leading-relaxed">
            Browse our complete collection of premium concealed shower sets. Available across
            Pakistan.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 bg-stone-900 text-white px-10 py-4 text-sm font-medium tracking-widest uppercase hover:bg-stone-700 transition-colors"
          >
            Shop Now <ArrowRight size={15} />
          </Link>
        </motion.div>
      </section>
    </main>
  );
}
