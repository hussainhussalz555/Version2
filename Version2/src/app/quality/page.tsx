"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import SafeImage from "@/components/SafeImage";
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
    <main className="pt-20 min-h-screen bg-stone-50">
      {/* Hero */}
      <section className="bg-stone-950 py-32 px-6 lg:px-12">
        <div className="max-w-screen-xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-amber-400 text-[11px] tracking-[0.3em] uppercase font-medium mb-4">
              Quality
            </p>
            <h1 className="text-white text-6xl md:text-7xl font-light leading-none tracking-tight mb-8 max-w-2xl">
              The Standard
              <br />
              <span className="italic text-stone-400">We Hold</span>
            </h1>
            <p className="text-stone-400 max-w-lg leading-relaxed text-lg font-light">
              Quality, for BATHAE, is not a marketing claim. It is a specific set of material
              choices, manufacturing decisions, and finishing standards.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Quality Points */}
      <section className="py-24 px-6 lg:px-12 max-w-screen-xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {QUALITY_POINTS.map((q, i) => (
            <motion.div
              key={q.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-white border border-stone-100 p-8 hover:border-stone-300 transition-colors"
            >
              <span className="text-3xl text-amber-500 block mb-6">{q.icon}</span>
              <h3 className="text-stone-900 font-semibold text-base mb-3">{q.title}</h3>
              <p className="text-stone-500 text-sm leading-relaxed">{q.body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Warranty & Policies */}
      <section className="py-24 bg-stone-100">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-stone-900 text-4xl font-light">
              Policies &amp;
              <br />
              <span className="italic text-stone-500">Assurance</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Warranty", body: BRAND_CONFIG.warrantyStatement },
              { title: "Shipping", body: BRAND_CONFIG.shippingStatement },
              { title: "Returns", body: BRAND_CONFIG.returnStatement },
            ].map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white border border-stone-200 p-8"
              >
                <h3 className="text-stone-900 font-semibold mb-4">{p.title}</h3>
                <p className="text-stone-500 text-sm leading-relaxed">{p.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Showcase */}
      <section className="py-24 px-6 lg:px-12 max-w-screen-xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-[11px] text-amber-500 tracking-[0.3em] uppercase font-medium mb-4">
              The Collection
            </p>
            <h2 className="text-stone-900 text-4xl font-light mb-6">
              Quality You
              <br />
              <span className="italic text-stone-500">Can See</span>
            </h2>
            <p className="text-stone-500 leading-relaxed mb-8">
              The BATHAE concealed shower set is available in three carefully considered finishes.
              Each finish is applied to the same precision-engineered brass components, giving
              you the same quality of engineering regardless of the aesthetic you choose.
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 border-b border-stone-900 text-stone-900 pb-1 text-sm font-medium tracking-widest uppercase hover:border-amber-500 hover:text-amber-600 transition-colors group"
            >
              Shop All Finishes
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-3 gap-4"
          >
            {["/products/product1.png", "/products/product2.png", "/products/product3.png"].map(
              (img, i) => (
                <div key={i} className="relative aspect-square bg-stone-100 border border-stone-200">
                  <SafeImage src={img} alt="Finish" fill className="object-contain p-4 mix-blend-multiply" />
                </div>
              )
            )}
          </motion.div>
        </div>
      </section>
    </main>
  );
}
