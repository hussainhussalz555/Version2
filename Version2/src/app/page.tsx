"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowRight, MoveUpRight, Sparkles } from "lucide-react";
import SafeImage from "@/components/SafeImage";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";
import TiltCard from "@/components/TiltCard";
import Marquee from "@/components/Marquee";
import { products } from "@/lib/products";

const finishes = [
  { name: "Brushed Gold", detail: "A warmer expression of luxury", image: "/products/product1.png", href: "/shop?finish=gold", number: "01" },
  { name: "Polished Chrome", detail: "Brilliance in every reflection", image: "/products/product2.png", href: "/shop?finish=chrome", number: "02" },
  { name: "Matte Black", detail: "An architectural statement", image: "/products/product3.png", href: "/shop?finish=matte-black", number: "03" },
];

export default function HomePage() {
  const { scrollY } = useScroll();
  const orbitY = useTransform(scrollY, [0, 600], [0, 80]);
  const glowY = useTransform(scrollY, [0, 600], [0, 50]);

  return (
    <main className="home-page">
      {/* ── Hero (intentionally compact so the site never reads as "all dark") ── */}
      <section className="home-hero relative isolate flex min-h-[min(620px,82svh)] items-center overflow-hidden bg-[#0d0e0d] pt-20 text-white">
        <motion.div
          className="pointer-events-none absolute inset-0"
          style={{ y: orbitY }}
          aria-hidden="true"
        >
          <div className="hero-orbit" />
        </motion.div>
        <motion.div className="hero-glow" style={{ y: glowY }} aria-hidden="true" />
        <div className="relative z-10 mx-auto w-full max-w-screen-xl px-6 pb-16 pt-16 sm:pb-20 lg:px-12 lg:pt-24">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75 }}
            className="max-w-4xl"
          >
            <p className="eyebrow mb-7 text-[#d9bb82]">
              BATHAE <span className="mx-3 text-white/25">/</span> The art of living well
            </p>
            <h1 className="text-balance text-[clamp(3.1rem,10vw,9.5rem)] leading-[0.88] tracking-[-0.065em]">
              Elevate <br />
              <span className="italic font-normal text-[#c8b399]">the</span> everyday
              <span className="text-[#b99968]">.</span>
            </h1>
            <div className="mt-9 flex max-w-2xl flex-col gap-8 sm:mt-12 sm:flex-row sm:items-end sm:justify-between">
              <p className="max-w-sm text-base leading-relaxed text-white/60 sm:text-lg">
                Considered fixtures for spaces that feel extraordinary, every day.
              </p>
              <Link href="/shop" className="button-luxe button-gold shrink-0">
                Explore collection <ArrowRight size={17} aria-hidden="true" />
              </Link>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-16 flex items-center justify-between border-t border-white/15 pt-6 text-[10px] uppercase tracking-[0.2em] text-white/45 sm:mt-20"
          >
            <span>Precision in every detail</span>
            <a href="#signature" className="flex items-center gap-2 transition-colors hover:text-white">
              Discover more <ArrowDown size={14} />
            </a>
          </motion.div>
        </div>
      </section>

      <Marquee
        items={[
          "Concealed Shower Sets",
          "Brushed Gold",
          "Polished Chrome",
          "Matte Black",
          "PVD Finishes",
          "Solid Brass",
          "Made for Modern Homes",
        ]}
      />

      {/* ── Signature collection ── */}
      <section id="signature" className="studio-section overflow-hidden bg-[#ebe9e3]">
        <div className="mx-auto grid max-w-screen-xl items-center gap-8 px-6 py-14 md:grid-cols-[0.85fr_1.15fr] md:gap-8 md:py-20 lg:px-12">
          <Reveal className="relative z-10 md:py-10">
            <p className="eyebrow eyebrow-dot text-[#9e7844]">The signature collection / 01</p>
            <h2 className="mt-6 text-[clamp(3.2rem,6vw,6.6rem)] leading-[0.95] tracking-[-0.05em] text-[#292823]">
              A new <br />
              <span className="italic text-[#8d7b65]">standard.</span>
            </h2>
            <p className="mt-7 max-w-sm leading-relaxed text-stone-600">
              A complete concealed shower system. Uncompromising in form, quietly remarkable in
              function. Discover the finish that feels like you.
            </p>
            <Link href="/products/concealed-shower-set-brushed-gold" className="button-luxe button-dark mt-9">
              Discover the set <ArrowRight size={17} />
            </Link>
          </Reveal>
          <Reveal x={24} delay={0.1}>
            <div
              className="studio-stage relative min-h-[340px] overflow-hidden rounded-[2rem] sm:min-h-[480px] lg:min-h-[650px]"
              aria-label="Brushed Gold concealed shower set"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_48%,#fff_0%,#f5f2eb_70%)]" />
              <div className="absolute inset-x-[12%] bottom-[7%] h-8 rounded-full bg-stone-500/15 blur-2xl" />
              <SafeImage
                src="/products/product1.png"
                alt="Brushed Gold concealed shower set"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 55vw"
                className="object-contain p-5 mix-blend-multiply drop-shadow-[0_25px_28px_rgba(80,60,35,0.13)] transition-transform duration-700 hover:scale-105 sm:p-10"
              />
              <div className="absolute bottom-5 left-5 rounded-full border border-stone-300/80 bg-white/75 px-4 py-2 text-[10px] uppercase tracking-[0.16em] text-stone-700 backdrop-blur-xl sm:bottom-8 sm:left-8">
                Brushed Gold · No. 01
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Finishes ── */}
      <section className="bg-[#f7f5f0] py-20 sm:py-28">
        <div className="mx-auto max-w-screen-xl px-6 lg:px-12">
          <Reveal className="mb-10 flex flex-col justify-between gap-6 sm:mb-14 sm:flex-row sm:items-end">
            <div>
              <p className="eyebrow eyebrow-dot text-[#9e7844]">Explore the palette</p>
              <h2 className="mt-4 text-5xl tracking-[-0.04em] text-stone-900 sm:text-6xl">
                One vision. <span className="italic text-stone-500">Three finishes.</span>
              </h2>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-stone-500">
              Each finish tells a different story. Every detail is unmistakably BATHAE.
            </p>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-3">
            {finishes.map((finish, i) => (
              <Reveal key={finish.name} delay={i * 0.1}>
                <TiltCard className="rounded-[1.75rem]" intensity={8}>
                  <Link
                    href={finish.href}
                    className="finish-card group relative block overflow-hidden rounded-[1.75rem] border border-stone-200/70 bg-[#eeece6] p-5 sm:p-7"
                  >
                    <div className="flex items-center justify-between text-[11px] tracking-widest text-stone-500">
                      <span>{finish.number} / 03</span>
                      <MoveUpRight
                        size={17}
                        className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                      />
                    </div>
                    <div className="relative my-2 aspect-square overflow-hidden rounded-2xl bg-[#f5f3ee]">
                      <SafeImage
                        src={finish.image}
                        alt={`${finish.name} shower set`}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-contain p-4 mix-blend-multiply transition-transform duration-700 group-hover:scale-[1.07]"
                      />
                    </div>
                    <h3 className="text-3xl tracking-tight text-stone-900">{finish.name}</h3>
                    <p className="mt-1 text-sm text-stone-500">{finish.detail}</p>
                  </Link>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Philosophy ── */}
      <section className="aurora relative overflow-hidden bg-[#151714] py-24 text-white sm:py-36">
        <div
          className="pointer-events-none absolute -right-36 top-0 h-[500px] w-[500px] rounded-full bg-[#997445]/10 blur-[100px]"
          aria-hidden="true"
        />
        <div className="relative mx-auto grid max-w-screen-xl gap-14 px-6 md:grid-cols-2 md:items-center lg:px-12">
          <Reveal>
            <p className="eyebrow eyebrow-dot text-[#d9bb82]">The BATHAE philosophy</p>
            <h2 className="mt-6 text-[clamp(2.9rem,6vw,6.5rem)] leading-[0.98] tracking-[-0.05em]">
              Luxury is in <br />
              <span className="italic text-[#bdab92]">the details.</span>
            </h2>
          </Reveal>
          <Reveal x={24} delay={0.1}>
            <div className="max-w-md md:ml-auto">
              <Sparkles size={29} strokeWidth={1} className="mb-7 text-[#c9a76b]" />
              <p className="text-lg leading-relaxed text-white/65">
                We believe a bathroom is more than a functional space. It is a moment of calm, a
                personal ritual, an expression of what matters.
              </p>
              <Link
                href="/about"
                className="mt-8 inline-flex items-center gap-3 border-b border-[#c9a76b] pb-2 text-sm tracking-wide text-white transition-colors hover:text-[#d9bb82]"
              >
                Our story <ArrowRight size={16} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Collection grid ── */}
      <section className="bg-[#f7f5f0] py-20 sm:py-28">
        <div className="mx-auto max-w-screen-xl px-6 lg:px-12">
          <Reveal className="mb-12 flex items-end justify-between gap-4">
            <div>
              <p className="eyebrow eyebrow-dot text-[#9e7844]">Curated for you</p>
              <h2 className="mt-4 text-5xl tracking-tight text-stone-900 sm:text-6xl">
                The collection<span className="text-[#b29369]">.</span>
              </h2>
            </div>
            <Link
              href="/shop"
              className="hidden items-center gap-2 text-sm text-stone-700 hover:text-[#956d3b] sm:flex"
            >
              Shop all <ArrowRight size={16} />
            </Link>
          </Reveal>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {products
              .filter((p) => p.isFeatured)
              .map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
          </div>
          <Link href="/shop" className="button-luxe button-dark mt-10 sm:hidden">
            Shop all <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* ── CTA band ── */}
      <section className="bg-[#ddd8cc] px-6 py-24 text-center sm:py-32 lg:px-12">
        <Reveal className="mx-auto max-w-3xl">
          <p className="eyebrow eyebrow-dot text-[#896943]">Your space, reimagined</p>
          <h2 className="mt-6 text-[clamp(2.9rem,7vw,7rem)] leading-[0.98] tracking-[-0.05em] text-[#292823]">
            Make room for <span className="italic text-[#89765c]">remarkable.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-lg leading-relaxed text-stone-600">
            The right details change everything. Find yours in the BATHAE collection.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Link href="/shop" className="button-luxe button-dark">
              Explore collection <ArrowRight size={17} />
            </Link>
            <Link href="/contact" className="button-luxe button-outline">
              Get in touch <ArrowRight size={17} />
            </Link>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
