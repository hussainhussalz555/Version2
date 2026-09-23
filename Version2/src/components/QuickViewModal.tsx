"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { X, Plus, Minus, ShoppingBag } from "lucide-react";
import type { Product } from "@/lib/products";
import { formatPrice, getStockLabel } from "@/lib/products";
import { useCartStore } from "@/store/cart";

interface QuickViewModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export default function QuickViewModal({ product, isOpen, onClose }: QuickViewModalProps) {
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);
  const addItem = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.openCart);
  const stockInfo = getStockLabel(product.stock);

  const handleAddToCart = () => {
    addItem(product, qty);
    openCart();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[90] bg-stone-950/60 backdrop-blur-sm"
          />
          <div className="fixed inset-0 z-[91] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25 }}
              className="bg-white w-full max-w-3xl relative overflow-hidden shadow-2xl"
            >
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 text-stone-400 hover:text-stone-700 transition-colors"
              >
                <X size={22} />
              </button>

              <div className="grid md:grid-cols-2">
                {/* Images */}
                <div className="bg-stone-50">
                  <div className="relative aspect-square">
                    <Image
                      src={product.images[activeImg]}
                      alt={product.name}
                      fill
                      className="object-contain p-10"
                    />
                  </div>
                  {product.images.length > 1 && (
                    <div className="flex gap-2 p-3 border-t border-stone-100">
                      {product.images.map((img, i) => (
                        <button
                          key={i}
                          onClick={() => setActiveImg(i)}
                          className={`relative w-12 h-12 border-2 transition-colors ${
                            activeImg === i ? "border-stone-900" : "border-stone-100"
                          }`}
                        >
                          <Image
                            src={img}
                            alt=""
                            fill
                            className="object-contain p-1"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="p-8 flex flex-col justify-between">
                  <div>
                    <p className="text-[11px] text-stone-400 tracking-widest uppercase mb-2">
                      {product.category.replace("-", " ")}
                    </p>
                    <h2 className="text-2xl font-light text-stone-900 leading-tight mb-1">
                      {product.name}
                    </h2>
                    <p className="text-stone-500 text-sm mb-4">{product.subtitle}</p>

                    <div className="flex items-center gap-4 mb-4">
                      <p className="text-2xl font-semibold text-stone-900">
                        {formatPrice(product.price)}
                      </p>
                      <span className={`text-sm font-medium ${stockInfo.color}`}>
                        {stockInfo.label}
                      </span>
                    </div>

                    <p className="text-stone-500 text-sm leading-relaxed line-clamp-3 mb-6">
                      {product.description}
                    </p>

                    {/* Qty */}
                    <div className="flex items-center gap-4 mb-6">
                      <div className="flex items-center border border-stone-200">
                        <button
                          onClick={() => setQty(Math.max(1, qty - 1))}
                          className="w-10 h-10 flex items-center justify-center text-stone-500 hover:text-stone-900"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-10 text-center text-sm">{qty}</span>
                        <button
                          onClick={() => setQty(Math.min(product.stock, qty + 1))}
                          disabled={qty >= product.stock}
                          className="w-10 h-10 flex items-center justify-center text-stone-500 hover:text-stone-900 disabled:opacity-30"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={handleAddToCart}
                      disabled={product.stock === 0}
                      className="w-full bg-stone-900 text-white py-4 text-sm font-medium tracking-widest uppercase flex items-center justify-center gap-2 hover:bg-stone-700 transition-colors disabled:opacity-40"
                    >
                      <ShoppingBag size={16} />
                      Add to Cart
                    </button>
                  </div>

                  <Link
                    href={`/products/${product.slug}`}
                    onClick={onClose}
                    className="text-center text-sm text-stone-400 hover:text-stone-700 underline underline-offset-4 transition-colors mt-4 block"
                  >
                    View Full Details
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
