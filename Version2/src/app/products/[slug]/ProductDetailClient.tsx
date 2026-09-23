"use client";

import { useState } from "react";
import SafeImage from "@/components/SafeImage";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Minus,
  ShoppingBag,
  ChevronRight,
  ZoomIn,
  X,
  MessageCircle,
} from "lucide-react";
import type { Product } from "@/lib/products";
import { formatPrice, getStockLabel } from "@/lib/products";
import { useCartStore } from "@/store/cart";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";
import { BRAND_CONFIG } from "@/lib/config";

interface Props {
  product: Product;
  related: Product[];
}

export default function ProductDetailClient({ product, related }: Props) {
  const router = useRouter();
  const [activeImage, setActiveImage] = useState(0);
  const [qty, setQty] = useState(1);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"description" | "specs" | "shipping">("description");

  const addItem = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.openCart);
  const stockInfo = getStockLabel(product.stock);

  const handleAddToCart = () => {
    addItem(product, qty);
    openCart();
  };

  const handleBuyNow = () => {
    addItem(product, qty);
    router.push("/checkout");
  };

  const whatsappUrl = `https://wa.me/${BRAND_CONFIG.whatsappNumber}?text=${encodeURIComponent(
    `Hi, I'm interested in ${product.name} — ${product.subtitle}. Can you provide more details?`
  )}`;

  return (
    <main className="pt-20 min-h-screen bg-stone-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-stone-100">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12 py-4">
          <nav className="flex items-center gap-2 text-xs text-stone-400">
            <Link href="/" className="hover:text-stone-700 transition-colors">Home</Link>
            <ChevronRight size={12} />
            <Link href="/shop" className="hover:text-stone-700 transition-colors">Shop</Link>
            <ChevronRight size={12} />
            <span className="text-stone-700">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Product Grid */}
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* ── Image Gallery ── */}
          <div>
            {/* Main Image */}
            <div
              className="relative aspect-square bg-white border border-stone-100 overflow-hidden mb-4 cursor-zoom-in group"
              onClick={() => setLightboxOpen(true)}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="absolute inset-0"
                >
                  <SafeImage
                    src={product.images[activeImage]}
                    alt={product.name}
                    fill
                    className="object-contain p-12 transition-transform duration-500 group-hover:scale-105"
                    priority
                  />
                </motion.div>
              </AnimatePresence>
              <div className="absolute bottom-4 right-4 bg-white/80 backdrop-blur-sm border border-stone-200 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <ZoomIn size={16} className="text-stone-600" />
              </div>
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`relative w-20 h-20 bg-white border-2 transition-all duration-200 flex-shrink-0 ${
                      activeImage === i
                        ? "border-stone-900"
                        : "border-stone-100 hover:border-stone-300"
                    }`}
                  >
                    <SafeImage
                      src={img}
                      alt=""
                      fill
                      className="object-contain p-2"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── Product Info ── */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            {/* SKU & Category */}
            <div className="flex items-center gap-4 mb-4">
              <span className="text-[11px] text-stone-400 tracking-[0.25em] uppercase">
                SKU: {product.sku}
              </span>
              <span className="w-1 h-1 bg-stone-300 rounded-full" />
              <span className="text-[11px] text-stone-400 tracking-[0.25em] uppercase">
                {product.category.replace("-", " ")}
              </span>
            </div>

            {/* Name */}
            <h1 className="text-stone-900 text-4xl font-light leading-tight mb-2">
              {product.name}
            </h1>
            <p className="text-stone-500 text-lg mb-6">{product.subtitle}</p>

            {/* Price & Stock */}
            <div className="flex items-center gap-6 mb-8 pb-8 border-b border-stone-100">
              <div>
                <p className="text-3xl font-semibold text-stone-900">{formatPrice(product.price)}</p>
                <p className="text-xs text-stone-400 mt-1">Inclusive of all components</p>
              </div>
              <span className={`text-sm font-medium px-3 py-1 border ${
                product.stock === 0
                  ? "border-red-200 text-red-500 bg-red-50"
                  : product.stock <= 3
                  ? "border-amber-200 text-amber-600 bg-amber-50"
                  : "border-emerald-200 text-emerald-600 bg-emerald-50"
              }`}>
                {stockInfo.label}
              </span>
            </div>

            {/* Qty Selector */}
            <div className="mb-6">
              <p className="text-xs text-stone-500 tracking-widest uppercase mb-3">Quantity</p>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-stone-200">
                  <button
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    className="w-12 h-12 flex items-center justify-center text-stone-500 hover:text-stone-900 hover:bg-stone-50 transition-colors"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-12 text-center font-medium text-stone-800">{qty}</span>
                  <button
                    onClick={() => setQty(Math.min(product.stock, qty + 1))}
                    disabled={qty >= product.stock}
                    className="w-12 h-12 flex items-center justify-center text-stone-500 hover:text-stone-900 hover:bg-stone-50 transition-colors disabled:opacity-30"
                  >
                    <Plus size={16} />
                  </button>
                </div>
                <p className="text-xs text-stone-400">{product.stock} available</p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col gap-3 mb-8">
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="button-luxe button-dark w-full justify-center disabled:opacity-40"
              >
                <ShoppingBag size={16} />
                Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                disabled={product.stock === 0}
                className="button-luxe button-gold w-full justify-center disabled:opacity-40"
              >
                Buy Now
              </button>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="button-luxe button-outline w-full justify-center"
              >
                <MessageCircle size={16} />
                Enquire on WhatsApp
              </a>
            </div>

            {/* Quick specs */}
            <div className="grid grid-cols-2 gap-3 mb-8 pb-8 border-b border-stone-100">
              {product.specifications.slice(0, 4).map((spec) => (
                <div key={spec.label} className="bg-white border border-stone-100 p-3">
                  <p className="text-[10px] text-stone-400 tracking-widest uppercase mb-1">{spec.label}</p>
                  <p className="text-sm text-stone-700 font-medium">{spec.value}</p>
                </div>
              ))}
            </div>

            {/* Shipping info */}
            <div className="text-xs text-stone-400 space-y-1">
              <p>🚚 {BRAND_CONFIG.shippingStatement}</p>
            </div>
          </div>
        </div>

        {/* ── Product Details Tabs ── */}
        <div className="mt-20 border-t border-stone-200 pt-16">
          <div className="flex gap-8 border-b border-stone-200 mb-8">
            {(["description", "specs", "shipping"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 text-sm font-medium tracking-wider uppercase transition-colors border-b-2 -mb-px ${
                  activeTab === tab
                    ? "border-stone-900 text-stone-900"
                    : "border-transparent text-stone-400 hover:text-stone-700"
                }`}
              >
                {tab === "description"
                  ? "Description"
                  : tab === "specs"
                  ? "Specifications"
                  : "Shipping & Warranty"}
              </button>
            ))}
          </div>

          <div className="max-w-3xl">
            {activeTab === "description" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <p className="text-stone-600 leading-relaxed">{product.description}</p>
                <div>
                  <h3 className="text-stone-900 font-semibold mb-4">Included in Set</h3>
                  <ul className="space-y-2">
                    {product.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-3 text-stone-600 text-sm">
                        <span className="text-amber-500 mt-0.5 flex-shrink-0">▸</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-stone-900 font-semibold mb-3">Material</h3>
                  <p className="text-stone-600 text-sm leading-relaxed">{product.material}</p>
                </div>
              </motion.div>
            )}

            {activeTab === "specs" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                <div>
                  <h3 className="text-stone-900 font-semibold mb-4">Specifications</h3>
                  <div className="divide-y divide-stone-100">
                    {product.specifications.map((spec) => (
                      <div key={spec.label} className="flex py-3">
                        <span className="w-40 text-sm text-stone-400 flex-shrink-0">{spec.label}</span>
                        <span className="text-sm text-stone-700">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-stone-900 font-semibold mb-4">Dimensions</h3>
                  <div className="divide-y divide-stone-100">
                    {product.dimensions.map((dim) => (
                      <div key={dim.label} className="flex py-3">
                        <span className="w-40 text-sm text-stone-400 flex-shrink-0">{dim.label}</span>
                        <span className="text-sm text-stone-700">{dim.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "shipping" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="bg-white border border-stone-100 p-6">
                  <h3 className="text-stone-900 font-semibold mb-3">Shipping</h3>
                  <p className="text-stone-600 text-sm leading-relaxed">{BRAND_CONFIG.shippingStatement}</p>
                </div>
                <div className="bg-white border border-stone-100 p-6">
                  <h3 className="text-stone-900 font-semibold mb-3">Warranty</h3>
                  <p className="text-stone-600 text-sm leading-relaxed">{BRAND_CONFIG.warrantyStatement}</p>
                </div>
                <div className="bg-white border border-stone-100 p-6">
                  <h3 className="text-stone-900 font-semibold mb-3">Returns</h3>
                  <p className="text-stone-600 text-sm leading-relaxed">{BRAND_CONFIG.returnStatement}</p>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* ── Related Products ── */}
        {related.length > 0 && (
          <Reveal>
            <div className="mt-20 border-t border-stone-200 pt-16">
              <h2 className="text-3xl font-light text-stone-900 mb-12">
                You May Also Like
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {related.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          </Reveal>
        )}
      </div>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightboxOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLightboxOpen(false)}
              className="fixed inset-0 z-[100] bg-stone-950/95 backdrop-blur-md"
            />
            <div className="fixed inset-0 z-[101] flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="relative w-full max-w-3xl aspect-square"
              >
                <SafeImage
                  src={product.images[activeImage]}
                  alt={product.name}
                  fill
                  className="object-contain"
                />
              </motion.div>

              {/* Thumbnail strip */}
              {product.images.length > 1 && (
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
                  {product.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveImage(i);
                      }}
                      className={`relative w-14 h-14 border-2 transition-colors ${
                        activeImage === i ? "border-amber-400" : "border-white/20"
                      }`}
                    >
                      <SafeImage src={img} alt="" fill className="object-contain p-1" />
                    </button>
                  ))}
                </div>
              )}

              <button
                onClick={() => setLightboxOpen(false)}
                className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors bg-black/30 p-2"
              >
                <X size={24} />
              </button>
            </div>
          </>
        )}
      </AnimatePresence>
    </main>
  );
}
